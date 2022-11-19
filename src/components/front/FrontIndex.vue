<template>
  <FrontHeader class="test" />
  <FrontTitle />
  <FrontSearchBox />

  <BoxLoading v-show="loadingBoxes">加载中...</BoxLoading>
  <FrontBoxes :boxes="boxes" />
  <FrontFooter />
</template>

<script lang="ts" setup>
  import FrontSearchBox from '@/components/front/index/FrontSearchBox.vue';
  import FrontBoxes from '@/components/front/index/FrontBoxes.vue';
  import FrontFooter from '@/components/front/index/FrontFooter.vue';
  import FrontTitle from '@/components/front/index/FrontTitle.vue';
  import FrontHeader from '@/components/front/index/FrontHeader.vue';
  import BoxLoading from '@/components/front/index/BoxLoading.vue';

  import { ref, watch } from 'vue';
  import useSiteData from '@/hooks/app/useSiteData';

  // const { siteConfig } = useSiteConfig();
  const { boxes, siteConfig, loadingBoxes } = useSiteData();

  const userID = ref(-1);
  watch(
    () => siteConfig.value.id,
    (id) => (userID.value = id || -1)
  );
  // const { boxes } = useSiteBoxes(userID);
  console.log(userID);
</script>

<style lang="scss" scoped></style>
