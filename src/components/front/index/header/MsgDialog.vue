<template>
  <div class="header-menu-click" @click.prevent="visible = true">
    <el-icon><ChatDotSquare /></el-icon>
    <span href="#">留言板</span>
  </div>
  <el-dialog width="400px" title="用户留言" v-model="visible" :modal="false">
    <div class="header space-y-4">
      <div class="box">
        <el-input placeholder="请输入留言" type="textarea" :autosize="{ minRows: 2 }"></el-input>
      </div>
      <div class="verify flex space-x-2 justify-center">
        <el-input class="flex-1" placeholder="昵称"></el-input>
        <el-input class="flex-1" placeholder="验证码"></el-input>
        <img :src="image" alt="" class="w-20 cursor-pointer rounded" @click="refresh()" />
      </div>
    </div>
    <div class="border-t my-4 bg-gray-500"></div>
    <div class="main"></div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import useVerify from '@/hooks/api/useVerify';
  import { ChatDotSquare } from '@element-plus/icons';

  import { ref } from 'vue';

  const visible = ref<Boolean>(false);
  const { image, refresh } = useVerify();
</script>

<style lang="scss" scoped>
  .header-menu-click {
    @apply flex items-center;
  }
</style>
