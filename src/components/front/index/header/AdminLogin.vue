<template>
  <el-dialog width="400px" title="登录" v-model="myVisible" @close="handleClose">
    <el-row class="login-box">
      <el-form :model="userForm" label-width="20%" ref="formRef" :rules="rules">
        <el-form-item label="用户账号" prop="username">
          <el-col :span="24">
            <el-input v-model="userForm.username" />
          </el-col>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-col>
            <el-input v-model="userForm.password" />
          </el-col>
        </el-form-item>
        <el-form-item label="验证码" prop="verify">
          <el-row :gutter="10">
            <el-col :span="14" class="flex justify-center items-center">
              <el-input v-model="userForm.verify.value" placeholder="请输入验证码" clearable />
            </el-col>
            <el-col :span="10">
              <img :src="verify.verify_img" alt="" @click="verifyRefresh" class="cursor-pointer" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-row>

    <div class="flex justify-end">
      <el-button type="primary" size="large" @click="handleLogin" :loading="loading">
        登录
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref, reactive, toRef, watch } from 'vue';
  import type { IUserForm } from '@/api/loginApi';
  import useVerify from '@/hooks/api/useVerify';
  import useUserLogin from '@/hooks/api/useUserLogin';
  import type { FormInstance, FormRules } from 'element-plus';
  import { resetForm } from '@/utils/form';
  import { useRouter } from 'vue-router';
  import { OK_CODE } from '@/app/keys';
  import { ElMessageBox } from 'element-plus';

  type Props = {
    visible: boolean;
  };
  const props = withDefaults(defineProps<Props>(), {
    visible: true,
  });
  const emits = defineEmits<{
    (e: 'close', status: boolean): void;
  }>();

  watch(toRef(props, 'visible'), (value: boolean) => {
    myVisible.value = value;
  });
  const myVisible = ref<boolean>(false);

  const { verify, refresh: verifyRefresh } = useVerify();
  const userForm = ref<IUserForm>({
    username: '',
    password: '',
    verify: {
      id: '',
      value: '',
    },
  });
  const loading = ref<boolean>(false);
  const formRef = ref<FormInstance>();
  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '( ^ ^) _U~~请输入用户名!', trigger: 'blur' },
      { min: 3, max: 10, message: '用户名长度应该在3-10个字符之间!', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '（╬￣皿￣）请输入密码!', trigger: 'blur' },
      { min: 3, max: 16, message: '密码长度不符合规范,请修改!', trigger: 'blur' },
    ],
    verify: [{ required: true, message: '∑(⊙▽⊙"请认真的输入验证码!', trigger: 'blur' }],
  });

  const handleClose = () => {
    emits('close', false);
    resetForm(formRef.value);
  };
  const router = useRouter();
  const handleLogin = () => {
    // 装填数据
    userForm.value.verify.id = verify.value.verify_id;
    const { returnUserMessage } = useUserLogin(userForm, loading);
    if (returnUserMessage.value.code === OK_CODE) {
      router.push('/admin');
    } else {
      ElMessageBox.alert(returnUserMessage.value.msg, '登录失败!', {
        confirmButtonText: 'OK',
        callback: () => {
          userForm.value.password = '';
          verifyRefresh();
        },
      });
    }
  };
</script>

<style lang="scss" scoped>
  .el-col {
    width: 100%;
  }
</style>
