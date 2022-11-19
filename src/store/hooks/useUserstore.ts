import { defineStore } from 'pinia';
import type { ReturnUserFrom } from '@/api/loginApi';

export type IUserTypeStore =  {
  data:ReturnUserFrom
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserTypeStore => ({
    data: {
      user_id:1,
      username:"null",
    },
  }),
  actions: {
    updateUserData(data: ReturnUserFrom) {
      this.$state.data = data;
    },
  },
});
