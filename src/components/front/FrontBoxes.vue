<template>
  <div class="boxes">
    <div class="box" v-for="(item, index) in boxes" :key="index">
      <div class="box-title">{{ item.title }}</div>
      <div class="box-hint">{{ notices[item.id] }}</div>
      <div class="items">
        <a
          @mouseenter="handleEnter(item.id, link.id)"
          class="box-link"
          v-for="(link, m) in item.links"
          :key="index"
          :href="link.link"
          target="_blank"
        >
          {{ link.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
  import { IBoxesData } from '@/api/siteApi';

  const siteSettings = useSiteSettingsStore();

  const props = defineProps<{
    boxes: IBoxesData[];
  }>();
  const notices = ref<{ [boxId: number]: string }>({});
  watch(
    () => props.boxes,
    () => {
      console.log('boxess', props.boxes);
      props.boxes.forEach((item: IBoxesData) => {
        notices.value[item.id] = item.introduction;
      });
    }
  );
  // console.log(boxes, 'boxes');
  const handleEnter = (boxId: number, linkId: number) => {
    const box = props.boxes.find((item: IBoxesData) => item.id === boxId);
    if (box) {
      const link = box.links.find((item) => item.id === linkId);
      if (link) {
        notices.value[box.id] = link.description;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/mixin';

  .boxes {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-5;

    .box {
      @apply bg-gray-600 bg-opacity-50 rounded-lg p-3 m-1 border border-gray-300;
      color: var(--box-background-color);

      &:hover {
        background-color: var(--box-back-hover-color);
      }

      .box-title {
        @apply text-center font-bold text-2xl;
        color: var(--box-title-color);
      }

      .box-hint {
        @apply mt-1 text-xs text-center truncate w-full;
        color: var(--box-title-color);
      }

      .items {
        @apply grid grid-cols-3 h-36 overflow-y-auto mt-2 text-sm text-center;
        // &::-webkit-scrollbar {
        //   width: 0;
        //   height: 0;
        // }
        @include hide-scroll;

        .box-link {
          @apply my-3;
          color: var(--box-link-color);

          &:hover {
            color: var(--box-link-hover-color);
          }
        }
      }
    }
  }
</style>
