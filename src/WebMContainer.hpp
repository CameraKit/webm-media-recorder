#ifndef WEBMCONTAINER_H_
#define WEBMCONTAINER_H_

#include <cstdint>
#include <cstddef>
#include "lib/webm/mkvmuxer.hpp"
#include "ContainerInterface.hpp"
#include "vpxenc.h"
#include "vpx/vp8cx.h"
#include "libyuv.h"

int vpx_img_plane_width(const vpx_image_t *img, int plane);
int vpx_img_plane_height(const vpx_image_t *img, int plane);
void clear_image(vpx_image_t *img) ;

class Container
  : protected ContainerInterface,
    public mkvmuxer::IMkvWriter
{
  public:
    /**
     * @brief Construct a new Ogg Container object
     *
     * @param sample_rate     Sampling rate of the stream
     * @param channel_count   The number of channels of the stream the maxium is 2.
     * @param serial          Uniqute number of the stream. Usually a random number.
     */
    Container();
    ~Container();

    void initAudio(uint32_t sample_rate, uint8_t channel_count, int serial) override;
    void initVideo(int timebase_num, int timebase_den, unsigned int width, unsigned int height, unsigned int bitrate) override;

    bool writeAudioFrame(void *data, std::size_t size, int num_samples) override;
    bool writeVideoFrame(unsigned int frame_number, void *rgba) override;

    // IMkvWriter interface.
    mkvmuxer::int32 Write(const void *buf, mkvmuxer::uint32 len) override;
    mkvmuxer::int64 Position() const override;
    mkvmuxer::int32 Position(mkvmuxer::int64 position) override;
    bool Seekable() const override;
    void ElementStartNotify(mkvmuxer::uint64 element_id,
                            mkvmuxer::int64 position) override;

  private:
    void addAudioTrack(void);
    void addVideoTrack(void);

    bool initImageBuffer(void);
    bool RGBAtoVPXImage(const uint8_t *rgba);

    // Rolling counter of the position in bytes of the written goo.
    mkvmuxer::int64 position_;
    // The MkvMuxer active element.
    mkvmuxer::Segment segment_;
    uint64_t timestamp_;
    uint64_t audio_track_number_;
    uint64_t video_track_number_;

    vpx_codec_ctx_t ctx;
    vpx_codec_enc_cfg_t cfg;
    vpx_codec_iface_t* iface = vpx_codec_vp8_cx();
    vpx_image_t *img;
};

#endif /* WEBMCONTAINER_H_ */
