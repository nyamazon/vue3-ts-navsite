import { Ref, ref, watch } from 'vue';
import { reqWallPaper } from '@/api/wallPaperApi';
import { OK_CODE } from '@/app/keys';
import type { IWallPaperData } from '@/api/wallPaperApi';

const useWallPaper = (currentPage: Ref<number>) => {
  const wallpaper = ref<IWallPaperData[]>([]);
  const loading = ref<boolean>(false);
  const wallpaperTotal = ref<number>(0);

  watch(currentPage, () => refresh());
  const refresh = () => {
    loading.value = true;
    reqWallPaper({ currentPage: currentPage.value })
      .then(({ data, code, total }) => {
        if (code === OK_CODE) {
          wallpaper.value = data;
          wallpaperTotal.value = total;
        }
      })
      .finally(() => (loading.value = false));
  };
  refresh();
  return {
    refresh,
    wallpaper,
    loading,
    wallpaperTotal,
  };
};

export default useWallPaper;
