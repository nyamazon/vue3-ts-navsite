import { IWeatherData } from '@/api/commonApi';
import useStorage from '@/hooks/useStorage';
import { defineStore } from 'pinia';

interface WeatherStoreType {
  city: string;
  data: Partial<IWeatherData>;
}

const useWeatherStore = defineStore({
  id: 'weather',
  state: (): WeatherStoreType => ({
    city: '佛山',
    data: {},
  }),
  actions: {
    changeCity(city: string) {
      this.$state.city = city;
    },
  },
});

const instance = useWeatherStore();
const { setItem, getItem } = useStorage();
instance.$subscribe((_, state) => {
  setItem(instance.$id, { ...state });
});

const initData = getItem<Partial<WeatherStoreType>>(instance.$id);
instance.$patch({ ...initData });
export default useWeatherStore;
