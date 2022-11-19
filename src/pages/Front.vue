<template>
  <div
    class="front"
    v-loading="tempLoading"
    element-loading-text="Loading..."
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.8)"
  >
    <div class="bg-wrapper"></div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
  import useStorage from '@/hooks/useStorage';

  const siteSettings = useSiteSettingsStore();
  const tempLoading = computed(() => {
    console.log(siteSettings, 'asdasdsadsad');
    return !siteSettings;
  });
  const bgImg = computed(() => {
    return `url('${siteSettings.background_image}')`;
  });
  const boxTitleColor = computed(() => siteSettings.box_title_color || '#fff');
  const boxLinkColor = computed(() => siteSettings.box_link_color || '#fff');
  const boxBackgroundColor = computed(() => siteSettings.box_background_color || '#fff');
  const boxBackHoverColor = computed(() => siteSettings.box_background_hover_color || '#fff');
  const boxLinkHoverColor = computed(() => siteSettings.box_link_hover_color || '#fff');
  const bgColor = computed(() => siteSettings.background_color || '#fff');
  const siteColorName = computed(() => siteSettings.site_name_color || '#fff');
  const descColorName = computed(() => siteSettings.site_desc_color || '#fff');

  /**
   * 实时更新用
   */
  const { getItem } = useStorage();
  const updateStorage = () => {
    const val = getItem(siteSettings.$id);
    // console.log('valllllllll,', val);
    siteSettings.load({ ...val });
  };
  window.addEventListener('storage', updateStorage);
</script>

<style lang="scss" scoped>
  @import '../assets/styles/mixin';

  :global(.front) {
    --bg-color: v-bind(bgColor);
    --site-name-color: v-bind(siteColorName);
    --desc-name-color: v-bind(descColorName);
    --box-title-color: v-bind(boxTitleColor);
    --box-link-color: v-bind(boxLinkColor);
    --box-background-color: v-bind(boxBackgroundColor);
    --box-back-hover-color: v-bind(boxBackHoverColor);
    --box-link-hover-color: v-bind(boxLinkHoverColor);
  }

  .front {
    @apply h-full w-full;
    @include hide-scroll;
    .bg-wrapper {
      opacity: 0.8;
      z-index: -10;
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-attachment: fixed;
      background-size: cover;
      background-position: 50%;
      min-height: 100vh;
      background-image: v-bind(bgImg);
      filter: brightness(0.7);

      :before {
        content: ' ';
        position: fixed;
        z-index: -10;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-position: center 0;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }

    .headers {
      color: var(--site-name-color);
    }

    .title {
      color: var(--site-name-color);
    }
  }
</style>
