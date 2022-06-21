<template>
  <div class="title text-center mt-8">
    <h3 class="font-bold text-5xl">{{ siteSetting.$state.site_name }}</h3>
    <div class="desc mt-6 text-sm">{{ refSettings.site_desc }}</div>
  </div>
</template>

<script lang="ts" setup>
  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
  import { storeToRefs } from 'pinia';

  // const { site_name, site_desc } = useSiteSettingsStore();
  const siteSetting = useSiteSettingsStore();
  const refSettings = storeToRefs(siteSetting);
  console.log(refSettings);
</script>

<style lang="scss" scoped></style>
