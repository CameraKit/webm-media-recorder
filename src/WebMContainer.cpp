#include <cassert>
#include "WebMContainer.hpp"
#include "emscriptenImport.hpp"

int vpx_img_plane_width(const vpx_image_t *img, int plane) {
  if ((plane == 1 || plane == 2) && img->x_chroma_shift > 0 )
    return (img->d_w + 1) >> img->x_chroma_shift;
  else
    return img->d_w;
}

int vpx_img_plane_height(const vpx_image_t *img, int plane) {
  if ((plane == 1 || plane == 2) && img->y_chroma_shift > 0)
    return (img->d_h + 1) >> img->y_chroma_shift;
  else
    return img->d_h;
}

void clear_image(vpx_image_t *img) {
  for(int plane = 0; plane < 4; plane++) {
    auto *row = img->planes[plane];
    if(!row) {
      continue;
    }
    auto plane_width = vpx_img_plane_width(img, plane);
    auto plane_height = vpx_img_plane_height(img, plane);
    uint8_t value = plane == 3 ? 1 : 0;
    for(int y = 0; y < plane_height; y++) {
      memset(row, value, plane_width);
      row += img->stride[plane];
    }
  }
}

Container::Container()
  : ContainerInterface(),
    position_(0),
    timestamp_(0),
    audio_track_number_(0),
    video_track_number_(0)
{
  // Init the segment
  segment_.Init(this);
  segment_.set_mode(mkvmuxer::Segment::kLive);

  // Write segment info
  mkvmuxer::SegmentInfo* const info = segment_.GetSegmentInfo();
  info->set_writing_app("opus-media-recorder");
  info->set_muxing_app("opus-media-recorder");
}

Container::~Container()
{
  segment_.Finalize();
}

void Container::initAudio(uint32_t sample_rate, uint8_t channel_count, int serial)
{
  ContainerInterface::initAudio(sample_rate, channel_count, serial);

  addAudioTrack();
}

void Container::initVideo(int timebase_num, int timebase_den, unsigned int width, unsigned int height, unsigned int bitrate)
{
  ContainerInterface::initVideo(timebase_num, timebase_den, width, height, bitrate);

  vpx_codec_err_t err;
  err = vpx_codec_enc_config_default(iface, &cfg, 0);
  assert(err == VPX_CODEC_OK);

  cfg.g_timebase.num = timebase_num;
  cfg.g_timebase.den = timebase_den;
  cfg.g_w = width;
  cfg.g_h = height;
  cfg.rc_target_bitrate = bitrate;

  err = vpx_codec_enc_init(
    &ctx,
    iface,
    &cfg,
    0
  );
  assert(err == VPX_CODEC_OK);

  initImageBuffer();
  addVideoTrack();
}

bool Container::writeAudioFrame(void *data, std::size_t size, int num_samples)
{
  assert(data);

  // TODO: calculate paused time???
  uint64_t timestamp = ((uint64_t)(num_samples * 1000000ull)) / (uint64_t)sample_rate_;
  // uint64_t timestamp = 20 * 1000;

  bool success = segment_.AddFrame(
    reinterpret_cast<const uint8_t*>(data),
    size,
    audio_track_number_,
    timestamp_ * 1000,
    true /* is_key: -- always true for audio */
  );

  timestamp_ += timestamp;

  return success;
}

bool Container::writeVideoFrame(unsigned int frame_number, void *rgba)
{
  RGBAtoVPXImage((const uint8_t*) rgba);

  vpx_codec_iter_t iter = NULL;
  const vpx_codec_cx_pkt_t *pkt;
  vpx_codec_err_t err;

  err = vpx_codec_encode(
    &ctx,
    img,
    frame_number,
    1, /* length of frame */
    0, /* flags. Use VPX_EFLAG_FORCE_KF to force a keyframe. */
    VPX_DL_REALTIME
  );
  
  if (err != VPX_CODEC_OK) {
    return false;
  }

  while((pkt = vpx_codec_get_cx_data(&ctx, &iter)) != NULL) {
    if(pkt->kind != VPX_CODEC_CX_FRAME_PKT) {
      continue;
    }
    auto frame_size = pkt->data.frame.sz;
    auto is_keyframe = (pkt->data.frame.flags & VPX_FRAME_IS_KEY) != 0;
    auto timebase = 1000000000ULL * cfg.g_timebase.num/cfg.g_timebase.den;
    auto timestamp = pkt->data.frame.pts * timebase;

    mkvmuxer::Frame frame;
    if (!frame.Init((uint8_t*) pkt->data.frame.buf, pkt->data.frame.sz)) {
      return false;
    }
    frame.set_track_number(video_track_number_);
    frame.set_timestamp(timestamp);
    frame.set_is_key(is_keyframe);
    frame.set_duration(timebase);
    if(!segment_.AddGenericFrame(&frame)) {
      return false;
    }
  }

  return true;
}

mkvmuxer::int32 Container::Write(const void* buf, mkvmuxer::uint32 len) {
  emscriptenPushBuffer(buf, len);
  position_ += len;
  return 0;
}

mkvmuxer::int64 Container::Position() const
{
  return position_;
}

mkvmuxer::int32 Container::Position(mkvmuxer::int64 position)
{
  // Is not Seekable() so it always returns fail
  return -1;
}

bool Container::Seekable() const
{
  return false;
}

void Container::ElementStartNotify(mkvmuxer::uint64 element_id,
                                   mkvmuxer::int64 position)
{
  // TODO: Not used in this project, not sure if I should do something here.
  return;
}

void Container::addAudioTrack(void)
{
  audio_track_number_ = segment_.AddAudioTrack(sample_rate_, channel_count_, 2);
  assert(audio_track_number_ == 2); // Init failed

  mkvmuxer::AudioTrack* const audio_track =
      reinterpret_cast<mkvmuxer::AudioTrack*>(
          segment_.GetTrackByNumber(audio_track_number_));

  // Audio data is always pcm_float32le.
  audio_track->set_bit_depth(32u);
  audio_track->set_codec_id(mkvmuxer::Tracks::kOpusCodecId);

  uint8_t opus_header[OpusIdHeaderType::SIZE];
  writeOpusIdHeader(opus_header);

  // Init failed
  assert(audio_track->SetCodecPrivate(opus_header, OpusIdHeaderType::SIZE));

  // Segment's timestamps should be in milliseconds
  // See http://www.webmproject.org/docs/container/#muxer-guidelines
  assert(1000000ull == segment_.GetSegmentInfo()->timecode_scale());
}

void Container::addVideoTrack(void)
{
  video_track_number_ = segment_.AddVideoTrack(cfg.g_w, cfg.g_h, 1);
  assert(video_track_number_ == 1);

  segment_.CuesTrack(video_track_number_);
}

bool Container::initImageBuffer(void)
{
  img = vpx_img_alloc(
    NULL,
    VPX_IMG_FMT_I420,
    cfg.g_w,
    cfg.g_h,
    0
  );
  
  return img != NULL;
}

bool Container::RGBAtoVPXImage(const uint8_t *rgba) {
  clear_image(img);
  // litten endian BGRA means it is ARGB in memory

  int err = libyuv::BGRAToI420(
    // Since we are ignoring opacity anyways (currently), we can use
    // this nasty nasty trick to avoid reshuffling the entire memory
    // from RGBA to ARGB.
    rgba-1,
    cfg.g_w*4,
    img->planes[VPX_PLANE_Y],
    img->stride[VPX_PLANE_Y],
    img->planes[VPX_PLANE_U],
    img->stride[VPX_PLANE_U],
    img->planes[VPX_PLANE_V],
    img->stride[VPX_PLANE_V],
    cfg.g_w,
    cfg.g_h
  );

  if (err != 0) {
    return false;
  }

  return true;
}
