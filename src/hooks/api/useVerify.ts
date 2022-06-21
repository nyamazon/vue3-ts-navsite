import { ref } from 'vue';
import { reqVerify } from '@/api/verifyApi';
import { OK_CODE } from '@/app/keys';

const useVerify = () => {
  const image = ref('');

  const refresh = () => {
    reqVerify().then(({ data, code }) => {
      if (code === OK_CODE) {
        // 新版chrome 对 # 解释有点问题，直接放入img解析会失败，需要转成 %23
        image.value = data.img_url.replaceAll(/\#/g, '%23');
      }
    });
  };
  refresh();

  return {
    refresh,
    image,
  };
};

export default useVerify;
