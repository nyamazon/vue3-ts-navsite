import useStorage from '@/hooks/useStorage';
import { defineStore } from 'pinia';

interface NewsTypeStore {
  data: string[];
}

const useNewsStore = defineStore({
  id: 'news',
  state: (): NewsTypeStore => ({
    data: [],
  }),
  actions: {
    updateNews(data: string[]) {
      this.$state.data = data;
    },
  },
});

const instance = useNewsStore();
const { setItem, getItem } = useStorage();
instance.$subscribe((_, state) => {
  setItem(instance.$id, { ...state });
});

const initData = getItem<string[]>(instance.$id);
instance.$patch({ ...initData });
export default useNewsStore;
