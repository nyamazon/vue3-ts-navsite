<template>
  <div class="header-menu-click" @click.prevent="newsVisible = true">
    <el-icon><Tickets /></el-icon>
    <a href="#">新闻</a>
  </div>

  <el-dialog
    custom-class="my-dialog"
    width="600px"
    v-model="newsVisible"
    title="每天读懂世界60s"
    top="1vh"
    @open="handleOpen"
  >
    <div class="news-box" v-loading="newsLoading">
      <div class="content">
        <ul>
          <li class="content-item" v-for="(item, index) in news" :key="'link' + index">
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
  import { Tickets } from '@element-plus/icons';

  const newsVisible = ref<Boolean>(false);
  const { news, loading: newsLoading } = useNews();

  const jumpBaidu = (text: string) => {
    return 'https://www.baidu.com/s?ie=UTF-8&wd=' + encodeURIComponent(text);
  };
  const handleOpen = () => {};
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
          @apply border-b border-gray-500 break-all cursor-pointer text-lg;
          &:hover {
            color: steelblue;
          }
        }
      }
    }
  }
  :deep(.my-dialog) {
    .el-dialog__body {
      padding: 2vh 20px;
    }
  }
</style>
