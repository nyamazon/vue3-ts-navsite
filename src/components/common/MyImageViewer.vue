<template>
  <div class="image-viewer-box" @wheel.prevent="handleWheel($event)">
    <div class="image-viewer-mask" @click="hideOnClickModal && handleClose()"></div>
    <div class="image-viewer-loading" v-show="downloadLoading">
      <img src="../../assets/image/loading.gif" alt="" />
      <p>发起下载中……</p>
    </div>

    <!-- 右上角关闭按钮开始 -->
    <div class="close-button">
      <el-icon @click="handleClose()"><CloseBold /></el-icon>
    </div>
    <!-- 右上角关闭按钮结束 -->

    <!-- 功能区按钮开始 预计按钮:放大缩小 下载 顺时针旋转 逆时针旋转-->
    <div class="ribbon-buttons-box">
      <div class="ribbon-buttons">
        <el-icon @click="wheelZoom('zoomIn')"><ZoomIn /></el-icon>
        <el-icon @click="wheelZoom('zoomOut')"><ZoomOut /></el-icon>
        <el-icon class="button-download" @click="downloadImg">
          <Download />
        </el-icon>
        <el-icon @click="wheelZoom('clockwise')"><RefreshRight /></el-icon>
        <el-icon @click="wheelZoom('anticlockwise')"><RefreshLeft /></el-icon>
      </div>
    </div>
    <!-- 功能区按钮结束 -->

    <!-- 图片预览主体开始 -->
    <div class="image-contain">
      <img
        class="my-img"
        id="downloadImg"
        :src="src"
        alt="标题"
        :style="computedImgStyle"
        @load="imgLoad"
      />
    </div>
    <!-- 图片预览主体结束 -->
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, toRefs } from 'vue';
  import {
    CloseBold,
    ZoomIn,
    ZoomOut,
    Download,
    RefreshLeft,
    RefreshRight,
  } from '@element-plus/icons';
  import axios from 'axios';
  import { IWheelZoomOptions } from '@/components/common/types/imageViewer';
  import { jumpUrl } from '@/utils/url';

  const props = withDefaults(defineProps<{ src: string; hideOnClickModal: boolean }>(), {
    src: '',
    hideOnClickModal: false,
  });
  const emits = defineEmits<{
    (e: 'close'): void;
  }>();

  const { src, hideOnClickModal } = toRefs(props);

  /* 图片事件处理开始 */
  const loading = ref<boolean>(true);
  const downloadLoading = ref<boolean>(false);
  const imgLoad = () => {
    loading.value = false;
  };
  const downloadImg = async () => {
    downloadLoading.value = true;
    const imgURL = src.value;
    const fileName = new Date().getTime() + '.jpg';
    await axios.get(imgURL, { responseType: 'arraybuffer' }).then((res) => {
      const blob = new Blob([res.data]);
      const url = URL.createObjectURL(blob);
      const a: HTMLAnchorElement = document.createElement('a');
      a.download = fileName;
      a.href = url;
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
    downloadLoading.value = false;
  };
  /* 图片事件处理结束 */

  /* 遮罩滚轮事件开始 */
  const handleWheel = (event: WheelEvent) => {
    const { deltaY } = event;
    // console.log(deltaY);
    if (deltaY > 0) {
      wheelZoom('zoomOut');
    } else if (deltaY < 0) {
      wheelZoom('zoomIn');
    }
  };
  const wheelZoom = (
    action: 'zoomOut' | 'zoomIn' | 'clockwise' | 'anticlockwise',
    options: IWheelZoomOptions = {}
  ) => {
    if (loading.value) return;
    // 默认值，如果有zoomRate传入就会被...options写入覆盖，没有的话默认1.2
    const { zoomRate, rotateDeg, enableTransition } = {
      zoomRate: 1.2,
      rotateDeg: 90,
      enableTransition: true,
      ...options,
    };
    switch (action) {
      case 'zoomOut':
        if (transform.value.scale > 0.2) {
          transform.value.scale = Number.parseFloat((transform.value.scale / zoomRate).toFixed(3));
        }
        break;
      case 'zoomIn':
        if (transform.value.scale < 7) {
          transform.value.scale = Number.parseFloat((transform.value.scale * zoomRate).toFixed(3));
        }
        break;
      case 'clockwise':
        transform.value.deg += rotateDeg;
        break;
      case 'anticlockwise':
        transform.value.deg -= rotateDeg;
        break;
    }
    transform.value.enableTransition = enableTransition;
  };
  const transform = ref({
    scale: 0.95,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    enableTransition: false,
  });
  const computedImgStyle = computed(() => {
    const { scale, deg, offsetX, offsetY } = transform.value;
    let translateX = offsetX / scale;
    let translateY = offsetY / scale;
    switch (deg % 360) {
      case 90:
      case -270:
        [translateX, translateY] = [translateY, -translateX];
        break;
      case 180:
      case -180:
        [translateX, translateY] = [-translateX, -translateY];
        break;
      case 270:
      case -90:
        [translateX, translateY] = [-translateY, translateX];
        break;
    }
    const style: { transform: string; maxHeight?: string; transition: string; maxWidth: string } = {
      transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
      transition: 'transform .3s',
      maxWidth: '100%',
    };
    return style;
  });
  /* 滚轮事件结束 */

  const handleClose = () => {
    emits('close');
  };
</script>

<style lang="scss" scoped>
  .image-viewer-box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    & > .image-viewer-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0.5;
      background: #000;
    }
    & > .image-viewer-loading {
      @apply flex justify-center items-center flex-col text-white text-2xl space-y-6;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 100;
    }
    & > .close-button {
      @apply text-4xl cursor-pointer flex justify-center items-center;
      position: absolute;
      right: 5%;
      top: 20px;
      width: 44px;
      height: 44px;
      color: #fff;
      border-radius: 50%;
      transition: all 0.3s ease-in-out;
      transform-origin: center;
      z-index: 10;
      &:hover {
        transform: rotate(180deg);
      }
    }
    & > .ribbon-buttons-box {
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      z-index: 10;
      user-select: none;
      & > .ribbon-buttons {
        @apply flex justify-center items-center text-3xl;
        color: #ffffff;
        & > .el-icon {
          @apply cursor-pointer;
          height: 44px;
          width: 44px;
          transition: all 0.2s ease-in;
          &:hover {
            transform: scale(1.3);
            margin-bottom: 10px;
          }
        }
      }
    }
    & > .image-contain {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      & > .my-img {
        width: 100%;
      }
    }
  }
</style>
