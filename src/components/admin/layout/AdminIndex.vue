<template>
  <div class="admin-layout h-full">
    <el-container class="h-full">
      <el-header class="flex items-center">
        <div class="aside-header w-[208] h-16 text-lg flex justify-evenly items-center space-x-2">
          <div class="logo flex justify-center items-center">
            <el-icon>
              <MoonNight />
            </el-icon>
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
      <el-container class="my-el-container">
        <el-aside class="my-aside">
          <el-menu
            default-active="settings"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
            router
          >
            <el-menu-item index="settings">
              <el-icon>
                <location />
              </el-icon>
              <template #title>
                <span>首页配置</span>
              </template>
            </el-menu-item>
            <el-menu-item index="wallpaper">
              <el-icon>
                <document />
              </el-icon>
              <template #title>壁纸管理</template>
            </el-menu-item>
            <el-menu-item index="leaveMsg">
              <el-icon>
                <document />
              </el-icon>
              <template #title>留言板管理</template>
            </el-menu-item>
            <el-menu-item index="account">
              <el-icon>
                <setting />
              </el-icon>
              <template #title>账号管理</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="right-side h-full flex-col overflow-scroll">
          <!-- <el-tabs
            v-model="editableTabsValue"
            type="card"
            class="demo-tabs bg-white fixed"
            closable
            @tab-remove="removeTab"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            ></el-tab-pane>
          </el-tabs> -->
          <div class="main-layout bg-gray-200">
            <div class="main-content h-full bg-white">
              <router-view />
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Location, Setting, Document, MoonNight, Fold } from '@element-plus/icons';
  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
  import { backendSettingsModel } from '@/model/backendSettingsModel';
  import { ISite_config } from '@/api/siteApi';
  import { updateSettingsApi } from '@/api/backend/indexSettingsApi';

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
  const siteSettingsStore = useSiteSettingsStore();
  const updateSettings = ref<any>({});
  backendSettingsModel.forEach((ele: keyof ISite_config) => {
    updateSettings.value[ele] = siteSettingsStore[ele];
  });
  onMounted(async () => {
    // for(let i of updateSettings.value) {
    //   console.log(i)
    // }
    // const ary:string[] = Object.values(updateSettings.value);
    // const result =  updateSettingsApi(ary);
    // console.log(result)
  });
</script>

<style lang="scss" scoped>
  .my-el-container {
    height: calc(100vh - 4rem);
  }
  .el-menu-vertical-demo {
    @apply h-full;
    --bg-color: rgb(255, 255, 255);
    --text-color: #000;
  }

  .el-menu-item {
    position: relative;
  }

  .el-menu-item.is-active {
    @apply transition-all;
    background: var(--el-menu-hover-bg-color);

    &::before {
      transition: all 0.5s ease-in-out;
      content: '';
      width: 4px;
      height: 56px;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgb(0, 138, 255);
    }
  }

  ::v-deep(.el-tabs__header) {
    margin: 0;
  }

  ::v-deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
    border-bottom: 0;
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
