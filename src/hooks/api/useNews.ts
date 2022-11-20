import { reqNews } from '@/api/commonApi';
import { OK_CODE } from '@/app/keys';
import { ref } from 'vue';

import { useRequestBackHook } from '@/hooks/common/requestHook';

const useNews = () => {
  // const news = ref<string[]>([]);
  // const loading = ref(false);
  // const refresh = () => {
  //   loading.value = true;
  //   reqNews()
  //     .then(({ code, data }) => {
  //       if (code === OK_CODE) {
  //         news.value = data;
  //       }
  //     })
  //     .finally(() => {
  //       loading.value = false;
  //     });
  // };
  // refresh();
  // return {
  //   news,
  //   refresh,
  //   loading,
  // };
  const { data: news, refresh, loading } = useRequestBackHook(reqNews);
  return {
    news,
    refresh,
    loading,
  };
};

export default useNews;
