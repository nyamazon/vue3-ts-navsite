<template>
  <a href="#" @click.prevent="newsVisible = true">新闻</a>
  <el-dialog width="600px" v-model="newsVisible" title="每天读懂世界60s">
    <div class="news-box" v-loading="newsLoading">
      <div class="content">
        <ul>
          <li class="content-item" v-for="(item, index) in news" :key="index">
            <a :href="jumpBaidu(item)" target="_blank">
              {{ item }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useNews from '@/hooks/api/useNews';
  const newsVisible = ref<Boolean>(false);
  const { news, loading: newsLoading } = useNews();

  const jumpBaidu = (text: string) => {
    return 'https://www.baidu.com/s?ie=UTF-8&wd=' + encodeURIComponent(text);
  };
</script>

<style lang="scss" scoped>
  .news-box {
    .title {
      @apply flex justify-end;
      & > .title-text {
        @apply font-bold text-2xl;
      }
    }
    .content {
      .content-item {
        @apply my-4;
        text-indent: 2em;
        & > a {
          @apply border-b border-gray-500 break-all cursor-pointer;
          &:hover {
            color: steelblue;
          }
        }
      }
    }
  }
</style>
