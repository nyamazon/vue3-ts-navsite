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
  import { IBoxesData } from '@/api/siteApi';

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
  @import '../../../assets/styles/mixin';

  .boxes {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-5;

    .box {
      @apply bg-gray-800 bg-opacity-40 rounded-lg p-3 m-1  border-gray-300;
      color: var(--box-background-color);
      position: relative;
      overflow: hidden;
      -webkit-transition: all 0.4s ease-in-out;
      transition: all 0.4s ease-in-out;
      &:hover {
      }
      &:hover:after {
        -webkit-transform: rotate(-45deg) scale(1.5) translate(0%, 0%);
        transform: rotate(-45deg) scale(1.5) translate(0%, 0%);
      }
      &::after {
        -webkit-transition: all 0.4s ease-in-out;
        transition: all 0.4s ease-in-out;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #2ecc71;
        content: '';
        z-index: -1;
        display: inline-block;
        -webkit-transform: rotate(-45deg) scale(1.5) translate(0%, -100%);
        transform: rotate(-45deg) scale(1.5) translate(0%, -100%);
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
            color: #e74c3c;
          }
        }
      }
    }
  }
</style>
