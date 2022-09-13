import { IUserForm, reqUserLogin, ReturnUserFrom } from '@/api/loginApi';
import { BasicResp } from '@/api/types';
import { OK_CODE } from '@/app/keys';
import { Ref, ref } from 'vue';

const useUserLogin = (userForm: Ref<IUserForm>,loading:Ref<boolean>) => {
  loading.value = true;
  const returnUserMessage = ref<Partial<BasicResp<ReturnUserFrom>>>({})
  reqUserLogin(userForm.value).then((result) => {
    if(result.code === OK_CODE) {
      returnUserMessage.value = result;
    }
  })
  .finally(() => loading.value = false);

  return {
    loading,
    returnUserMessage
  }
};

export default useUserLogin;
