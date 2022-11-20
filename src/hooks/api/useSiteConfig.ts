import type { IBoxesData, ISearch_config, ISite_config } from '@/api/siteApi';
import { reqSiteBoxes, reqSiteConfig } from '@/api/siteApi';
import { Ref, toRef } from 'vue';
import { ref, watch } from 'vue';
import { OK_CODE } from '@/app/keys';
import { useRequestBackHook } from '../common/requestHook';

const useSiteConfig = () => {
  const loading = ref(true);
  const siteConfig = ref<Partial<ISite_config>>({});
  const searchConfig = ref<ISearch_config[]>([]);
  // const siteSettings = useSiteSettingsStore();
  reqSiteConfig()
    .then(({ data, code }) => {
      console.log(data, 'data');
      if (code === OK_CODE) {
        siteConfig.value = data.site_config;
        searchConfig.value = data.search_config;
      }
    })
    .finally(() => (loading.value = false));

  // const { data, loading } = useRequestBackHook(reqSiteConfig);
  // const { site_config, search_config } = data.value || {};
  // watch(
  //   () => data,
  //   () => {
  //     siteConfig.value = site_config as ISite_config;
  //     searchConfig.value = search_config as ISearch_config[];
  //   }
  // );
  // console.log(siteConfig)
  // siteConfig.value = site_config as ISite_config;
  // searchConfig.value = search_config as ISearch_config[];
  return {
    siteConfig,
    searchConfig,
    loading,
  };
};
export const useSiteBoxes = (userID: Ref<number | undefined>) => {
  const boxes = ref<IBoxesData[]>([]);
  const loading = ref(false);
  watch(userID, async () => {
    console.log('userID', userID.value);
    await refresh();
  });
  const refresh = async () => {
    loading.value = true;
    if (!userID.value || userID.value <= 0) return;
    let { code, data } = await reqSiteBoxes();
    loading.value = false;
    if (code === OK_CODE) {
      boxes.value = data;
    }
  };
  return {
    loading,
    refresh,
    boxes,
  };
};

export default useSiteConfig;
