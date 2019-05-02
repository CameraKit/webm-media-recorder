interface Container {
  void Container();
  void initAudio(long sample_rate, short channel_count, long serial);
  void initVideo(long timebase_num, long timebase_den, unsigned long width, unsigned long height, unsigned long bitrate);
  boolean writeAudioFrame(any data, unsigned long size, long num_samples);
  boolean writeVideoFrame(unsigned long frame_number, any rgba);
};