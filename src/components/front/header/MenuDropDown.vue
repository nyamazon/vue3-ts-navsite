<template>
  <div>
    <!-- <div class="header-menu-click">
      <el-icon>
        <Menu />
      </el-icon>
      <a href="#">菜单</a>
    </div> -->

    <el-dropdown>
      <div class="header-menu-click">
        <el-icon>
          <Menu />
        </el-icon>
        <a href="#">菜单</a>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="User" @click="handleOpenLogin">
            进入后台管理系统
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <Login :visible="visible" @close="handleClose" />
  </div>
</template>

<script lang="ts" setup>
  import { Menu, User } from '@element-plus/icons';
  import { ref } from 'vue';
  import Login from '@/components/front/FrontLogin.vue';
  const visible = ref<boolean>(false);
  const handleOpenLogin = () => {
    visible.value = true;
    console.log(visible.value);
  };
  const handleClose = (status: boolean) => {
    // console.log(status, 'tetsatdsdtaqstdsadtsadt');
    visible.value = status;
  };
</script>

<style lang="scss" scoped></style>
