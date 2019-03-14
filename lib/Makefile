BUILD_DIR ?= build
# This can be overritten by ../Makefile
LIB_BUILD_DIR ?= $(BUILD_DIR)/emscripten
OPUS_DIR := opus
OGG_DIR := ogg
SPEEX_DIR := speexdsp
YUV_DIR := yuv
VPX_DIR := vpx
WEBM_DIR := webm

OPUS_OBJ_LIB = $(OPUS_DIR)/.libs/libopus.a
OPUS_OBJ ?= $(LIB_BUILD_DIR)/libopus.a

OGG_OBJ_LIB = $(OGG_DIR)/src/.libs/libogg.a
OGG_OBJ ?= $(LIB_BUILD_DIR)/libogg.a

SPEEX_OBJ_LIB = $(SPEEX_DIR)/libspeexdsp/.libs/libspeexdsp.a
SPEEX_OBJ ?= $(LIB_BUILD_DIR)/libspeexdsp.a

YUV_OBJ_LIB = $(YUV_DIR)/libyuv.a
YUV_OBJ ?= $(LIB_BUILD_DIR)/libyuv.a

VPX_OBJ_LIB = $(VPX_DIR)/libvpx.a
VPX_OBJ ?= $(LIB_BUILD_DIR)/libvpx.a

WEBM_OBJ_LIB = $(WEBM_DIR)/libwebm.a
WEBM_OBJ ?= $(LIB_BUILD_DIR)/libwebm.a

.PHONY: all clean

all: $(OPUS_OBJ) $(OGG_OBJ) $(SPEEX_OBJ) $(YUV_OBJ) $(VPX_OBJ) $(WEBM_OBJ)

$(BUILD_DIR) $(LIB_BUILD_DIR):
	mkdir -p $@

$(addsuffix /autogen.sh, $(OPUS_DIR) $(OGG_DIR) $(SPEEX_DIR) $(YUV_DIR) $(VPX_DIR)) $(WEBM_DIR)/CMakeLists.txt:
	git submodule update --init --recursive

## libopus
$(OPUS_OBJ_LIB): $(OPUS_DIR) $(OPUS_DIR)/autogen.sh
	cd $< && ./autogen.sh
	cd $< && emconfigure ./configure \
							--disable-extra-programs \
							--disable-doc \
							--disable-intrinsics \
							--disable-rtcd \
							--disable-asm
	emmake make -C $<

$(OPUS_OBJ): $(OPUS_OBJ_LIB) $(LIB_BUILD_DIR)
	cp $< $@

## libogg
$(OGG_OBJ_LIB): $(OGG_DIR) $(OGG_DIR)/autogen.sh
	cd $< && ./autogen.sh
	cd $< && emconfigure ./configure
	emmake make -C $<

$(OGG_OBJ): $(OGG_OBJ_LIB) $(LIB_BUILD_DIR)
	cp $< $@

## SpeexDSP
$(SPEEX_OBJ_LIB): $(SPEEX_DIR) $(SPEEX_DIR)/autogen.sh
	cd $< && ./autogen.sh
	cd $< && emconfigure ./configure \
							--disable-examples
	emmake make -C $<

$(SPEEX_OBJ): $(SPEEX_OBJ_LIB) $(LIB_BUILD_DIR)
	cp $< $@

## libyuv
$(YUV_OBJ_LIB): $(YUV_DIR) $(YUV_DIR)/autogen.sh
	cd $< && emcmake cmake . \
							-DCMAKE_BUILD_TYPE=release
	emmake make -C $<

$(YUV_OBJ): $(YUV_OBJ_LIB) $(LIB_BUILD_DIR)
	cp $< $@

## libvpx
$(VPX_OBJ_LIB): $(VPX_DIR) $(VPX_DIR)/autogen.sh
	cd $< && emconfigure ./configure \
							--disable-vp9-decoder \
							--disable-vp9-encoder \
							--disable-vp8-decoder \
							--target=generic-gnu
	emmake make -C $<

$(VPX_OBJ): $(VPX_OBJ_LIB) $(LIB_BUILD_DIR)
	cp $< $@

# libwebm
$(WEBM_OBJ_LIB): $(WEBM_DIR)
	cd $< && emconfigure cmake . \
							-DCMAKE_BUILD_TYPE=release \
							-DCMAKE_CXX_FLAGS="-MMD -MP"
	emmake make -C $<

$(WEBM_OBJ): $(WEBM_OBJ_LIB) $(LIB_BUILD_DIR)
	cp $< $@

## etc.
clean:
	cd $(OPUS_DIR) && git reset --hard HEAD && git clean -fdx
	cd $(OGG_DIR) && git reset --hard HEAD && git clean -fdx
	cd $(SPEEX_DIR) && git reset --hard HEAD && git clean -fdx
	cd $(YUV_DIR) && git reset --hard HEAD && git clean -fdx
	cd $(VPX_DIR) && git reset --hard HEAD && git clean -fdx
	cd $(WEBM_DIR) && git reset --hard HEAD && git clean -fdx
	-rm $(OPUS_OBJ) $(OGG_OBJ) $(SPEEX_OBJ) $(YUV_OBJ) $(VPX_OBJ) $(WEBM_DIR)
