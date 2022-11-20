<template>
  <div class="wallpaper">
    <div class="wallpaper-boxes">
      <div class="wallpaper-item" v-for="(item, index) in data" :key="getKey(item, index)">
        <img v-lazyload="item.pic_thumb_url" :alt="item.pic_name" @click="onPreview(item.pic_id)" />
        <!--<img-->
        <!--  :src="item.pic_thumb_url"-->
        <!--  :alt="item.pic_name"-->
        <!--  loading="lazy"-->
        <!--  @click="onPreview(item.pic_id)"-->
        <!--/>-->
      </div>
    </div>
    <MyImageViewer
      v-if="viewerVisible"
      :src="originPicList[0]"
      hide-on-click-modal
      @close="handleViewerClose"
    />
  </div>
</template>

<script lang="ts" setup>
  import { toRefs, ref } from 'vue';
  import MyImageViewer from './MyImageViewer.vue';
  // import type { IWallPaperData } from '@/api/wallpaperApi';
  interface IWallPaperData {
    pic_id: string;
    pic_name: string;
    pic_cate_id: number;
    pic_origin_url: string;
    pic_thumb_url: string;
    pic_create_time: Date;
  }
  interface wallProps {
    data: IWallPaperData[] | [];
  }
  const props = withDefaults(defineProps<wallProps>(), {
    data: () => [],
  });
  const { data } = toRefs(props);

  const getKey = (item: IWallPaperData, index: number) => {
    return item['pic_id'] || index;
  };

  const originPicList = ref<string[]>([]);
  const viewerVisible = ref<boolean>(false);
  const onPreview = (picId: string) => {
    let clickImg = data.value.find((item) => item.pic_id === picId);
    // console.log(clickImg);
    originPicList.value = [clickImg?.pic_origin_url || ''];
    viewerVisible.value = true;
  };
  const handleViewerClose = () => {
    // console.log('enter');
    viewerVisible.value = false;
  };
</script>

<style lang="scss" scoped>
  .wallpaper {
    @apply h-full w-full flex justify-center items-center;
    .wallpaper-boxes {
      @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 py-3 max-w-screen-2xl;
      .wallpaper-item {
        @apply h-64 bg-gray-400 shadow-sm m-2 rounded;
        & > img {
          @apply h-full w-full rounded shadow-sm object-cover transition-all cursor-pointer;
          &:hover {
            box-shadow: 0 20px 25px 0 rgba(255, 255, 255, 0.2);
          }
        }
      }
    }
  }
</style>
