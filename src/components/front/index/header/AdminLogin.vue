<template>
  <el-dialog width="400px" title="登录" v-model="myVisible" @close="handleClose">
    <el-row class="login-box">
      <el-form :model="form" label-width="20%" ref="formRef">
        <el-form-item label="用户账号">
          <el-col :span="24">
            <el-input v-model="form.username" />
          </el-col>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-col>
            <el-input v-model="form.password" />
          </el-col>
        </el-form-item>
        <el-form-item label="验证码">
          <el-row :gutter="10">
            <el-col :span="14" class="flex justify-center items-center">
              <el-input v-model="form.verify_str" placeholder="请输入验证码" clearable />
            </el-col>
            <el-col :span="10">
              <img :src="image" alt="" @click="refresh()" class="cursor-pointer" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-row>

    <div class="flex justify-end">
      <el-button type="primary" size="large" @click="handleLogin">登录</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref, toRef, watch } from 'vue';
  import useVerify from '@/hooks/api/useVerify';
  import type { FormInstance } from 'element-plus';
  import { resetForm } from '@/utils/form';
  import { useRouter } from 'vue-router';
  export interface ILoginForm {
    username: string;
    password: string;
    verify_id: string;
    verify_str: string;
  }
  type Props = {
    visible: boolean;
  };
  const props = withDefaults(defineProps<Props>(), {
    visible: true,
  });
  const emits = defineEmits<{
    (e: 'close', status: boolean): void;
  }>();

  watch(toRef(props, 'visible'), (value) => {
    myVisible.value = value;
  });

  const myVisible = ref<boolean>(false);
  const formRef = ref<FormInstance | undefined>(undefined);

  const handleClose = () => {
    emits('close', false);
    resetForm(formRef.value);
  };
  const router = useRouter();
  const handleLogin = () => {
    // const router = useRouter();
    router.push('/admin');
  };

  const { image, refresh } = useVerify();
  const form = ref<ILoginForm>({
    username: '',
    password: '',
    verify_id: '',
    verify_str: '',
  });
</script>

<style lang="scss" scoped>
  .el-col {
    width: 100%;
  }
</style>
