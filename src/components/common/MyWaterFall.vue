<template>
  <div ref="waterfallWrapper" class="waterfall-list" :style="{ height: `${wrapperHeight}px` }">
    <div v-for="(item, index) in list" :key="item.pic_id" class="waterfall-item">
      <div class="waterfall-card">
        <slot name="item" :item="item" :index="index" :url="item.pic_thumb_url" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { provide, ref, watch, defineProps } from 'vue';
  import { useDebounceFn } from '@vueuse/core';
  import { useCalculateCols, useLayout } from './hooks';
  import Lazy from './utils/Lazy';
  import { getValue } from './utils/util';
  // import type { ViewCard } from './types/waterfall';
  import type { LazyOptions } from './types/lazy';
  import type { IWallPaperData } from '@/api/wallpaperApi';
  interface ViewCard {
    pic_id: string;
    pic_name: string;
    pic_cate_id: number;
    pic_origin_url: string;
    pic_thumb_url: string;
    pic_create_time: Date;
  }

  interface Point {
    rowPerView: number;
  }

  type Breakpoints = Record<number, Point>;

  interface WaterfallProps {
    breakpoints?: Breakpoints;
    width?: number;
    animationDuration?: number;
    animationDelay?: number;
    animationEffect?: string;
    hasAroundGutter?: boolean;
    gutter?: number;
    list?: IWallPaperData[];
    animationPrefix?: string;
    rowKey?: string;
    imgSelector?: string;
    backgroundColor?: string;
    lazyload?: boolean;
    loadProps?: LazyOptions | {};
    delay?: number;
  }
  const props = withDefaults(defineProps<WaterfallProps>(), {
    list: () => [],
    rowKey: 'pic_id',
    imgSelector: 'src',
    width: 200,
    breakpoints: () => ({
      1200: {
        rowPerView: 3,
      },
      800: {
        rowPerView: 2,
      },
      500: {
        rowPerView: 1,
      },
    }),
    gutter: 10,
    hasAroundGutter: true,
    animationPrefix: 'animate__animated',
    animationEffect: 'fadeIn',
    animationDuration: 1000,
    animationDelay: 300,
    backgroundColor: '#fff',
    lazyload: false,
    loadProps: () => ({}),
    delay: 300,
  });
  console.log('propspropspropspropsprops', props);
  const lazy = new Lazy(props.lazyload, props.loadProps);
  provide('lazy', lazy);
  // 容器块信息
  const { waterfallWrapper, wrapperWidth, colWidth, cols, offsetX } = useCalculateCols(props);
  // 容器高度，块定位
  const { wrapperHeight, layoutHandle } = useLayout(props, colWidth, cols, offsetX);
  // 1s内最多执行一次排版，减少性能开销
  const renderer = useDebounceFn(() => {
    layoutHandle();
  }, props.delay);
  // 列表发生变化直接触发排版
  watch(
    () => [wrapperWidth, colWidth, props.list],
    () => {
      renderer();
    },
    { deep: true }
  );
  // 尺寸宽度变化防抖触发
  const sizeChangeTime = ref(0);
  // watchDebounced(colWidth, () => {
  //   layoutHandle()
  //   sizeChangeTime.value += 1
  // }, { debounce: props.delay })
  provide('sizeChangeTime', sizeChangeTime);
  // 图片加载完成
  provide('imgLoaded', renderer);
  // 根据选择器获取图片地址
  const getRenderURL = (item: ViewCard): string => {
    return getValue(item, props.imgSelector)[0];
  };
  // 获取唯一值
  // const getKey = (item: ViewCard, index: number): string => {
  //   return item[props.rowKey] || index;
  // };
</script>

<style scoped>
  .waterfall-list {
    width: 100%;
    position: relative;
    overflow: hidden;
    /* background-color: v-bind(backgroundColor); */
  }

  .waterfall-item {
    position: absolute;
    left: 0;
    top: 0;
    /* transition: .3s; */
    /* 初始位置设置到屏幕以外，避免懒加载失败 */
    transform: translate3d(0, 3000px, 0);
    visibility: hidden;
  }

  /* 初始的入场效果 */
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }
</style>
