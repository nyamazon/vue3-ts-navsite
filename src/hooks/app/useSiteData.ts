import useSiteConfig, { useSiteBoxes } from '@/hooks/api/useSiteConfig';
import { ref, watch } from 'vue';
import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore';
import useSearchConfigStore from '@/store/hooks/useSearchConfigStore';
import useWeather from '@/hooks/api/useWeather';
import useWeatherStore from '@/store/hooks/useWeatherStore';
import useHeadLink from '@/hooks/useHeadLink';
import useNewsStore from '@/store/hooks/useNewsStore';
import useNews from '@/hooks/api/useNews';

//hooks
const useSiteData = () => {
  const { siteConfig, loading: loadingSiteConfig, searchConfig } = useSiteConfig();
  const userID = ref(-1);

  const siteSettings = useSiteSettingsStore();
  const searchConfigStore = useSearchConfigStore();
  const weatherStore = useWeatherStore();
  const newsStore = useNewsStore();
  watch(
    () => {
      return siteConfig.value.id;
    },
    (id) => {
      if (!id || id <= 0) return;
      userID.value = id!;
      siteSettings.load(siteConfig.value);
      searchConfigStore.load(searchConfig.value);
      //iconfont
      useHeadLink('iconfont', 'link', siteConfig.value.icon_url || '');
    }
  );
  const { boxes, loading: loadingBoxes } = useSiteBoxes(userID);
  const { weather } = useWeather();
  const { news } = useNews();
  watch(weather, () => {
    weatherStore.$patch({ data: weather.value });
  });
  watch(news, () => {
    newsStore.$patch({ data: news.value });
  });

  return {
    siteConfig,
    boxes,
    loadingSiteConfig,
    loadingBoxes,
  };
};

export default useSiteData;
