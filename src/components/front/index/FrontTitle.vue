<template>
  <div class="title text-center mt-8">
    <h3 class="site_name font-bold text-5xl">{{ site_name }}</h3>
    <div class="desc mt-6 text-sm">{{ site_desc }}</div>
  </div>
</template>

<script lang="ts" setup>
  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
  import { storeToRefs } from 'pinia';

  const siteSetting = useSiteSettingsStore();
  const { site_name, site_desc } = storeToRefs(siteSetting);
  // console.log('头部名称', siteSetting);
</script>

<style lang="scss" scoped>
  .title {
    color: var(--site-name-color);
    .site_name {
      color: var(--site-name-color);
    }
    .desc {
      color: var(--desc-name-color);
    }
  }
</style>
