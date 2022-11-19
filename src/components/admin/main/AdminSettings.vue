<template>
  <div class="admin-settings h-full">
    <div class="settings h-full flex">
      <el-form class="settings-form w-2/3" :model="form" label-width="150px">
        <el-form-item label="用户名">
          <el-input v-model="form.site_name" />
        </el-form-item>
        <el-form-item label="装逼签名">
          <el-input v-model="form.site_desc" />
        </el-form-item>
        <el-form-item label="背景图片地址">
          <div class="flex w-full space-x-6">
            <el-input class="flex-1" v-model="form.background_image" />
            <el-button type="primary" :icon="PictureRounded" @click="randomPicClick">
              随机二次元图片
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="主题颜色取色">
          <div class="flex space-x-3">
            <v3-color-picker v-model:value="form.site_name_color" size="medium"></v3-color-picker>
            <el-input v-model="form.site_name_color" />
          </div>
        </el-form-item>
        <el-form-item label="装逼签名取色">
          <div class="flex space-x-3">
            <v3-color-picker v-model:value="form.site_desc_color" size="medium"></v3-color-picker>
            <el-input v-model="form.site_desc_color" />
          </div>
        </el-form-item>
        <el-form-item label="背景遮罩层取色">
          <div class="flex space-x-3">
            <v3-color-picker
              v-model:value="form.background_mask_color"
              size="medium"
            ></v3-color-picker>
            <el-input v-model="form.background_mask_color" />
          </div>
        </el-form-item>
        <el-form-item label="背景遮罩层取色">
          <div class="flex space-x-3">
            <v3-color-picker
              v-model:value="form.background_mask_color"
              size="medium"
            ></v3-color-picker>
            <el-input v-model="form.background_mask_color" />
          </div>
        </el-form-item>
        <el-form-item label="盒子颜色">
          <div class="flex space-x-3">
            <v3-color-picker
              v-model:value="form.box_background_color"
              size="medium"
            ></v3-color-picker>
            <el-input v-model="form.box_background_color" />
          </div>
        </el-form-item>
        <el-form-item label="盒子经过颜色">
          <div class="flex space-x-3">
            <v3-color-picker
              v-model:value="form.box_background_hover_color"
              size="medium"
            ></v3-color-picker>
            <el-input v-model="form.box_background_hover_color" />
          </div>
        </el-form-item>
        <el-form-item label="盒子内容标题颜色">
          <div class="flex space-x-3">
            <v3-color-picker v-model:value="form.box_title_color" size="medium"></v3-color-picker>
            <el-input v-model="form.box_title_color" />
          </div>
        </el-form-item>
        <el-form-item label="盒子内容提示颜色">
          <div class="flex space-x-3">
            <v3-color-picker v-model:value="form.box_hint_color" size="medium"></v3-color-picker>
            <el-input v-model="form.box_hint_color" />
          </div>
        </el-form-item>
        <el-form-item label="链接颜色">
          <div class="flex space-x-3">
            <v3-color-picker v-model:value="form.box_link_color" size="medium"></v3-color-picker>
            <el-input v-model="form.box_link_color" />
          </div>
        </el-form-item>
        <el-form-item label="链接经过颜色">
          <div class="flex space-x-3">
            <v3-color-picker
              v-model:value="form.box_link_hover_color"
              size="medium"
            ></v3-color-picker>
            <el-input v-model="form.box_link_hover_color" />
          </div>
        </el-form-item>
        <div class="flex justify-center items-center bg-white pb-10">
          <el-button type="primary" size="large" @click="handleUpdate">确定修改</el-button>
        </div>
      </el-form>
      <div class="real-time-review flex-1 block relative">
        <!-- <div
          class="phone w-full h-full bg-no-repeat"
          :style="{ background: 'url(' + phoneImg + ')' }"
        > -->
        <!-- <iframe src="/front" frameborder="0" class="h-full w-full"></iframe> -->
        <!-- <img :src="phoneImg" alt="" class="w2/3 h2/3" />  -->
        <!-- </div> -->
        <div
          class="phone flex justify-center items-center absolute left-1/2 top-1/2"
          style="transform: translate(-50%, -50%)"
        >
          <div style="width: 357px; height: 730px; transform: scale(1.1)" class="fixed">
            <img :src="phoneImg" class="phone-img" alt="" />
            <iframe
              src="/front"
              frameborder="0"
              class="my-iframe"
              width="326px"
              height="570px"
            ></iframe>
            <!-- <div style="width: 326px; height: 570px" class="my-iframe">
              <Front type="index" />
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-center items-center bg-white pb-10">
      <el-button type="primary" size="large" @click="handleUpdate">确定修改</el-button>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
  import phoneImg from '@/assets/image/phone.png';
  // import Front from '@/pages/Front.vue';
  import { reactive, watch } from 'vue';
  import { storeToRefs } from 'pinia';

  import { V3ColorPicker } from 'v3-color-picker';
  import { ElNotification } from 'element-plus';
  import { PictureRounded } from '@element-plus/icons-vue';

  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
  import { updateSettingsApi } from '@/api/backend/indexSettingsApi';
  import { ElNotificationMessageModel } from '@/model/message/ElNotificationMessageModel';
  import { useRandomAnimePic } from '@/hooks/api/useRandomAnimePic';
  import { useUserStore } from '@/store/hooks/useUserstore';
  import { getNowDate } from '@/utils/date';

  const siteSettingStore = useSiteSettingsStore();
  const userStore = useUserStore();
  const form = reactive({
    ...storeToRefs(siteSettingStore),
  });
  watch(form, () => {
    siteSettingStore.load({ ...form });
  });
  const handleUpdate = () => {
    updateSettingsApi({ ...form, ...userStore.$state.data, update_time: getNowDate() }).then(
      (res) => {
        const message = ElNotificationMessageModel(res) as Partial<NotificationOptions>;
        ElNotification(message);
      }
    );
  };

  const randomPicClick = async () => {
    const imgurl = await useRandomAnimePic();
    form.background_image = imgurl;
  };
</script>

<style lang="scss" scoped>
  .settings-form {
    @apply py-6 px-3;
  }
  ::v-deep(.el-input__inner) {
    @apply w-52;
  }
  .phone-img {
    position: fixed;
    z-index: 3;
  }
  .my-iframe {
    position: absolute;
    left: 15px;
    top: 80px;
    z-index: 6;
  }
</style>
