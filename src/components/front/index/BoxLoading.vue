<template>
  <div class="loading flex justify-center my-3">
    <el-icon class="is-loading"><Loading /></el-icon>
    <span class="text-xl ml-3"><slot /></span>
  </div>
</template>

<script lang="ts" setup>
  import { Loading } from '@element-plus/icons';
</script>

<style lang="scss" scoped>
  .loading {
    color: var(--site-name-color);
  }
  .is-loading {
    @apply text-2xl;
  }
</style>
