<template>
  <div class="admin-layout h-full">
    <el-container class="h-full">
      <el-header class="flex items-center">
        <div class="aside-header w-[208] h-16 text-lg flex justify-evenly items-center space-x-2">
          <div class="logo flex justify-center items-center">
            <el-icon><MoonNight /></el-icon>
            <span class="font-bold">导航后台管理</span>
          </div>
        </div>
        <div class="main-header">
          <el-icon
            class="header-icon cursor-pointer transition-transform"
            :class="{ 'is-rotate': isCollapse }"
            @click="isCollapse = !isCollapse"
            :size="30"
          >
            <Fold />
          </el-icon>
        </div>
      </el-header>
      <el-container class="flex-1">
        <el-aside class="my-aside">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1">
              <el-icon><location /></el-icon>
              <template #title>
                <span>Navigator One</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><document /></el-icon>
              <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><document /></el-icon>
              <template #title>Navigator Three</template>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><setting /></el-icon>
              <template #title>Navigator Four</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="right-side h-full flex-col">
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            class="demo-tabs bg-white"
            closable
            @tab-remove="removeTab"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            ></el-tab-pane>
          </el-tabs>
          <div class="main-layout bg-gray-200">
            <div class="main-content h-full m-3 bg-white">123</div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Location, Setting, Document, MoonNight, Fold } from '@element-plus/icons';
  const isCollapse = ref<boolean>(false);
  const handleOpen = () => {};
  const handleClose = () => {};
  const editableTabsValue = ref<string>('');
  const removeTab = () => {};
  const editableTabs = ref([
    {
      title: 'Tab 1',
      name: '1',
      content: 'Tab 1 content',
    },
    {
      title: 'Tab 2',
      name: '2',
      content: 'Tab 2 content',
    },
  ]);
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo {
    @apply h-full;
    --bg-color: rgb(255, 255, 255);
    --text-color: #000;
  }
  .right-side {
    @apply flex;
    background: rgb(230, 232, 236);
    padding: 0;
  }
  .my-aside {
    height: calc(100% - 4rem);
    transition: var(--el-transition-all);
    width: auto;
  }
  .el-menu:not(.el-menu--collapse) {
    width: 208px;
  }
  .aside-header {
    width: 208px;
  }
  .el-header {
    @apply h-16;
    --el-header-padding: 0;
  }
  .header-icon {
    @apply text-2xl;
    color: #74b9ff;
  }
  .demo-tabs {
    border: 0;
  }
  .main-layout {
    flex: 1;
  }
  .is-rotate {
    transform: rotate(-180deg);
  }
</style>
