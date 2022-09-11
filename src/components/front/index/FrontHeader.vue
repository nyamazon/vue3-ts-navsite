<template>
  <div class="headers flex justify-center sm:justify-between px-2 flex-wrap">
    <div class="left">
      <el-popover
        :visible="showPoper"
        placement="bottom"
        title="城市选择"
        :width="200"
        trigger="click"
        content="this is content, this is content, this is content"
      >
        <template #default>
          <el-cascader
            placeholder="可搜索城市"
            filterable
            v-model="cityValue"
            :options="cityOptions"
            @change="handleChange"
          />
        </template>
        <template #reference>
          <el-button @click="showPoper = !showPoper" link type="primary">{{ info }}</el-button>
        </template>
      </el-popover>
    </div>
    <div class="right">
      <ul class="flex 2xl:space-x-4 2xl:text-base space-x-2 text-base">
        <li>
          <NewsDialog />
        </li>
        <li>
          <MsgDialog />
        </li>
        <li
          class="flex justify-center items-center space-x-1"
          @click="jumpRouter('/front/wallpaper')"
        >
          <el-icon><Camera /></el-icon>
          <span>壁纸</span>
        </li>
        <li>哈哈</li>
        <li>
          <MenuDropDown />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useWeatherStore from '@/store/hooks/useWeatherStore';
  import { computed, ref } from 'vue';
  import cityOptions from '@/assets/data/city.json';
  import MsgDialog from './header/MsgDialog.vue';
  import NewsDialog from './header/NewsDialog.vue';
  import MenuDropDown from './header/MenuDropDown.vue';
  import { useRouter } from 'vue-router';
  import { Camera } from '@element-plus/icons';

  const router = useRouter();
  const weatherStore = useWeatherStore();
  const info = computed(() => {
    const temp = weatherStore.data.data?.weather.content;
    if (!temp) return '';
    return `[${temp?.city}] ${temp?.today.condition} ${temp?.today.temp}`;
  });
  const cityValue = ref<string[]>([]);
  const handleChange = () => {
    try {
      weatherStore.changeCity(cityValue.value[cityValue.value.length - 1]);
    } catch (error) {
      return;
    } finally {
      showPoper.value = false;
    }
    // 因为在hooks 里 useWeather 对weatherStore.city属性做了监听，我一但用了action的方法改变了$state的属性，hook监听到后就会重新发起请求返回数据。
  };
  const showPoper = ref<Boolean>(false);

  const jumpRouter = (routerPath: string) => {
    router.push(routerPath);
  };
</script>

<style lang="scss" scoped>
  .headers {
    color: var(--site-name-color);
  }
  .right > ul > li {
    @apply cursor-pointer;
  }
</style>
