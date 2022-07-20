<template>
  <div class="wallpaper">
    <!-- <MyWaterFall :list="wallpaper">
      <template #item="{ item, url, index }">
        <div class="card">
          <MyLazyLoadImg :url="url" />
        </div>
      </template>
    </MyWaterFall> -->
    <MyWallPaper :data="wallpaper"></MyWallPaper>
    <div class="wallpaper-pagination flex justify-center items-center py-4">
      <el-pagination
        v-model:currentPage="currentPage"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  // import { ref } from 'vue'
  // import MyWaterFall from '@/components/common/MyWaterFall.vue'
  // import MyLazyLoadImg from '@/components/common/MyLazyLoadImg.vue'
  import MyWallPaper from '@/components/common/MyWallPaper.vue';
  import useWallPaper from '@/hooks/api/useWallPaper';
  import { ref } from 'vue';

  /* 分页逻辑处理开始 */
  const currentPage = ref<number>(1);
  const { wallpaper, loading, wallpaperTotal: total } = useWallPaper(currentPage);
  console.log(wallpaper);
</script>

<style lang="scss" scoped>
  ::v-deep(.el-pager > .el-icon) {
    position: inherit;
  }
  ::v-deep(.el-pager > li) {
    transition: all 0.2s ease-in-out;
    outline: none;
  }
</style>
