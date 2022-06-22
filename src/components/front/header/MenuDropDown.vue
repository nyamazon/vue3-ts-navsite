<template>
  <div class="header-menu-click">
    <el-icon>
      <Menu />
    </el-icon>
    <a href="#">菜单</a>
  </div>

  <!-- <el-dropdown ref="dropdown1" trigger="contextmenu" style="margin-right: 30px">
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
</template>

<script lang="ts" setup>
  import { Menu } from '@element-plus/icons';
</script>

<style lang="scss" scoped></style>
