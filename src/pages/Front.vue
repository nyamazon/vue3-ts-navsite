<template>
  <div
    class="front"
    v-loading="loadingSiteConfig"
    element-loading-text="Loading..."
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.8)"
  >
    <div class="bg-wrapper"></div>
    <FrontHeader />
    <FrontTitle />
    <FrontSearchBox />

    <BoxLoading v-show="loadingBoxes">加载中...</BoxLoading>
    <FrontBoxes :boxes="boxes" />
    <FrontFooter />
  </div>
</template>

<script lang="ts" setup>
  // import useSiteConfig, { useSiteBoxes } from '@/hooks/api/useSiteConfig';
  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
  import { computed, ref, watch } from 'vue';
  import FrontSearchBox from '../components/front/FrontSearchBox.vue';
  import FrontBoxes from '@/components/front/FrontBoxes.vue';
  import FrontFooter from '@/components/front/FrontFooter.vue';
  import useSiteData from '@/hooks/app/useSiteData';
  import FrontTitle from '@/components/front/FrontTitle.vue';
  import FrontHeader from '@/components/front/FrontHeader.vue';
  import BoxLoading from '@/components/front/BoxLoading.vue';

  // const { siteConfig } = useSiteConfig();
  const { boxes, siteConfig, loadingSiteConfig, loadingBoxes } = useSiteData();

  const siteSettings = useSiteSettingsStore();
  const bgImg = computed(() => {
    return `url('${siteSettings.background_image}')`;
  });
  const boxTitleColor = computed(() => siteSettings.box_title_color || '#fff');
  const boxLinkColor = computed(() => siteSettings.box_link_color || '#fff');
  const boxBackgroundColor = computed(() => siteSettings.box_background_color || '#fff');
  const boxBackHoverColor = computed(() => siteSettings.box_back_hover_color || '#fff');
  const boxLinkHoverColor = computed(() => siteSettings.box_link_hover_color || '#fff');
  const siteColorName = computed(() => siteSettings.site_name_color || 'fff');
  const userID = ref(-1);
  watch(
    () => siteConfig.value.id,
    (id) => (userID.value = id || -1)
  );
  // const { boxes } = useSiteBoxes(userID);
  console.log(userID);
</script>

<style lang="scss" scoped>
  @import '../assets/styles/mixin';

  :global(.front) {
    --site-name-color: v-bind(siteColorName);
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
