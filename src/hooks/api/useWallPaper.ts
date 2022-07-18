import { ref } from 'vue';
import { reqWallPaper } from '@/api/wallPaperApi';
import { OK_CODE } from '@/app/keys';
import type { IWallPaperData } from '@/api/wallPaperApi';

const useWallPaper = () => {
  const wallpaper = ref<IWallPaperData[]>([]);
  const refresh = () => {
    reqWallPaper().then(({ data, code }) => {
      if (code === OK_CODE) {
        wallpaper.value = data;
      }
    });
  };
  refresh();
  return {
    refresh,
    wallpaper,
  };
};

export default useWallPaper;
