import { ISearch_config } from '@/api/siteApi';
import { defineStore } from 'pinia';

const useSearchConfigStore = defineStore({
  id: 'search-config',
  state: (): { data: ISearch_config[] } => ({ data: [] }),
  actions: {
    load(val: ISearch_config[]) {
      this.$patch({
        data: val,
      });
    },
  },
});

export default useSearchConfigStore;
