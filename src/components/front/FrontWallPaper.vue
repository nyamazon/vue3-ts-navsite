<template>
  <div class="wallpaper">
    <MyWaterFall :list="wallpaper">
      <template #item="{ item, url, index }">
        <div class="card">
          <MyLazyLoadImg :url="url" />
          <p class="text">这是内容</p>
        </div>
      </template>
    </MyWaterFall>
  </div>
</template>

<script lang="ts" setup>
  // import { ref } from 'vue'
  // import MyWaterFall from '@/components/common/MyWaterFall.vue'
  // import MyLazyLoadImg from '@/components/common/MyLazyLoadImg.vue'
  import useWallPaper from '@/hooks/api/useWallPaper';

  const { wallpaper, refresh } = useWallPaper();
  console.log(wallpaper);
</script>

<style lang="scss" scoped></style>
