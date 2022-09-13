import { ref } from 'vue';
import { reqVerify } from '@/api/verifyApi';
import type { IVerify } from '@/api/verifyApi';
import { OK_CODE } from '@/app/keys';

const useVerify = () => {
  const verify = ref<IVerify>({
    verify_id:'',
    verify_img:''
  });

  const refresh = () => {
    reqVerify().then(({ data, code }) => {
      if (code === OK_CODE) {
        verify.value.verify_id = data.verify_id;
        // 新版chrome 对 # 解释有点问题，直接放入img解析会失败，需要转成 %23
        verify.value.verify_img = data.verify_img.replaceAll(/\#/g, '%23');
      }
    });
  };
  refresh();

  return {
    refresh,
    verify,
  };
};

export default useVerify;
