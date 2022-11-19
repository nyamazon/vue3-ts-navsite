import { IUserForm, reqUserLogin, ReturnUserFrom } from '@/api/loginApi';
import { BasicResp } from '@/api/types';
import { OK_CODE } from '@/app/keys';
import { Ref, ref } from 'vue';
type ReturnUserResp = BasicResp<ReturnUserFrom>;

const useUserLogin = (userForm: Ref<IUserForm>,loading:Ref<boolean>):Promise<Ref<ReturnUserResp>> => {
  loading.value = true;
  const returnUserMessage = ref<ReturnUserResp>({
    code:500,
    data:{
      user_id:1,
      username:''
    },
    msg:''
  })
  return new Promise((resolve) => {
    reqUserLogin(userForm.value).then((result) => {
      if(result.code === OK_CODE) {
        console.log("result,",result)
        returnUserMessage.value = result;
        resolve(returnUserMessage)
      }
    })
    .finally(() => loading.value = false);
  })

};

export default useUserLogin;
