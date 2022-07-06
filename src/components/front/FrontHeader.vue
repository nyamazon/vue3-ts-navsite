<template>
  <div class="headers flex justify-between px-2">
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
      <ul class="flex space-x-4 text-base">
        <li>
          <NewsDialog />
        </li>
        <li>
          <MsgDialog />
        </li>
        <li>壁纸</li>
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

    // 因为在hooks 里 useWeather 对weatherStore.city属性做了监听，我一但用了action的方法改变了$state的属性，hooks坚挺到后就会重新发起请求返回数据。
  };
  const showPoper = ref<Boolean>(false);
</script>

<style lang="scss" scoped></style>
