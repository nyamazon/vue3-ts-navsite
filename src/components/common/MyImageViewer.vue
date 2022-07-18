<template>
  <div class="image-viewer-box" @wheel.prevent="handleWheel($event)">
    <div class="image-viewer-mask" @click="hideOnClickModal ? handleClose : ''"></div>
    <div class="image-contain">
      <img class="my-img" :src="src" alt="标题" :style="computedImgStyle" @load="imgLoad" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, toRefs } from 'vue';
  import { IWheelZoomOptions } from '@/components/common/types/imageViewer';

  const props = withDefaults(defineProps<{ src: string; hideOnClickModal: boolean }>(), {
    src: '',
    hideOnClickModal: false,
  });
  const { src, hideOnClickModal } = toRefs(props);

  /* 图片事件处理开始 */
  const loading = ref<boolean>(true);
  const imgLoad = () => {
    loading.value = false;
  };
  /* 图片事件处理结束 */

  /* 遮罩滚轮事件开始 */
  const handleWheel = (event: WheelEvent) => {
    const { deltaY } = event;
    console.log(deltaY);
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
    scale: 1,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    enableTransition: false,
  });
  const computedImgStyle = computed(() => {
    const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
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
    const style: { transform: string; maxHeight: string; transition: string; maxWidth: string } = {
      transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
      transition: 'transform .3s',
      maxWidth: '100%',
      maxHeight: '100%',
    };
    return style;
  });
  /* 滚轮事件结束 */

  const handleClose = () => {};
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
    & > .image-contain {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      & > .my-img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
