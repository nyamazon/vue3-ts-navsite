<template>
  <!-- search -->
  <div class="search-wrapper">
    <div class="search-site-cate">
      <a
        href="#"
        :class="['search-item', i === itemIndex ? 'active' : '']"
        v-for="(item, i) in searchConfig.data"
        :key="item.id"
        @click.prevent="itemIndex = i"
      >
        <span>{{ item.name }}</span>
        <span class="trigger"></span>
      </a>
    </div>

    <div class="search-sites" v-if="itemLinks">
      <a
        href="#"
        class="search-sites-item"
        :class="{ active: linkIndex === index }"
        @click="linkIndex = index"
        v-for="(item, index) in itemLinks.links"
        :key="index"
      >
        {{ item.name }}
      </a>
    </div>

    <div class="search-box" v-if="linkLists">
      <input
        class="search-input"
        type="text"
        :placeholder="linkLists.placeholder"
        v-model="queryStr"
        @keyup.enter="handleSearch"
      />
      <button class="absolute top-1 right-3 text-2xl outline-none">
        <span class="text-white cursor-pointer" @click="handleSearch">搜索</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useSearchConfigStore from '@/store/hooks/useSearchConfigStore';
  import { jumpUrl } from '@/utils/url';
  import { computed, ref } from 'vue';

  const searchConfig = useSearchConfigStore();
  const itemIndex = ref(0);
  const itemLinks = computed(() => {
    let link = searchConfig.data[itemIndex.value];
    if (link) return link;
    return searchConfig.data[0];
  });
  const linkIndex = ref(0);
  const linkLists = computed(() => {
    return itemLinks.value?.links[linkIndex.value];
  });
  console.log('linkLists', linkLists);
  const queryStr = ref('');
  const handleSearch = () => {
    if (!queryStr.value) return;
    //  地址里有[kw]占位符，替换掉值就可以了
    let aim = linkLists.value?.link.replaceAll('[kw]', encodeURIComponent(queryStr.value));
    jumpUrl(aim);
  };
</script>

<style lang="scss" scoped>
  .search-site-cate {
    @apply flex justify-center space-x-3;
    .search-item {
      &.active {
        .trigger {
          @apply block;
        }
      }
      .trigger {
        @apply text-center hidden mx-auto mt-0.5 w-0 h-0.5;
        border-right: 0.3rem solid transparent;
        border-left: 0.3rem solid transparent;
        border-top: 0.3rem solid var(--site-name-color);
        z-index: 66;
      }
    }
  }
  .search-wrapper {
    @apply text-center mt-5 text-lg;
    color: var(--site-name-color);
  }

  .search-box {
    @apply relative w-full lg:w-128 sm:w-96 mx-auto mt-5;
    .search-input {
      @apply text-black outline-none w-full pl-2 pr-6 py-2 focus:bg-opacity-60 rounded-xl transition;
      color: var(--box-title-color);
      background: var(--box-background-color);
      &::placeholder {
        color: rgba(255, 255, 255, 0.8);
      }
      &:hover {
        background: var(--box-back-hover-color);
      }
    }
  }
  .search-sites {
    @apply flex justify-center space-x-3 mt-3 text-sm;
    .search-sites-item {
      &.active {
        @apply font-bold;
      }
    }
  }
</style>
