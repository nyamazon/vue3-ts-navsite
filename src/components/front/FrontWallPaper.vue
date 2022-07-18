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
  </div>
</template>

<script lang="ts" setup>
  // import { ref } from 'vue'
  // import MyWaterFall from '@/components/common/MyWaterFall.vue'
  // import MyLazyLoadImg from '@/components/common/MyLazyLoadImg.vue'
  import MyWallPaper from '@/components/common/MyWallPaper.vue';
  import useWallPaper from '@/hooks/api/useWallPaper';

  const { wallpaper } = useWallPaper();
  console.log(wallpaper);
</script>

<style lang="scss" scoped></style>
