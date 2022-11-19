import { ref } from 'vue';
import type { Ref } from 'vue';
import { BasicResp } from '@/api/types';
import { OK_CODE } from '@/app/keys';

type Refresh = () => void;

type IReturnCommonRequestData<T> = {
  data: Ref<T | undefined>,
  refresh: Refresh,
  loading: Ref<Boolean>
}

type IRequestOptions = {
  initData: Boolean;
};

export const useRequestBackHook = <T>(
  request: () => Promise<BasicResp<T>>,
  options: IRequestOptions = { initData: true }
): IReturnCommonRequestData<T> => {
  const data = ref<T>();
  const loading = ref<Boolean>(false);
  const refresh = () => {
    loading.value = true;
    request().then(({ code, data: value }) => {
      if (code === OK_CODE) {
        data.value = value;
      }
      loading.value = false;
    });
  };
  const { initData } = options;
  //初始化
  initData ? refresh() : '';
  return [data, refresh, loading];
};
