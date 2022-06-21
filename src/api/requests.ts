import axios from 'axios';
// import { KEY_USER_ID, UserInfo } from '@/store/modules/useUserStore';
import router from '@/router';
import { NO_PERMISSION, OK_CODE } from '@/app/keys';
// import { USER_KEY } from '@/store/hooks/useUserStore';

const requests = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api/v1/',
  timeout: 90000,
});

//拦截器
requests.interceptors.request.use((config) => {
  config = config || {};
  //pinia
  // try {
  //   const user = JSON.parse(localStorage.getItem(USER_KEY) || '');
  //   if (user.token) {
  //     config.headers!['Authorization'] = `Bearer ${user.token}`;
  //   }
  // } catch (e) {}
  return config;
});

requests.interceptors.response.use(
  (resp) => {
    const { code, msg } = resp.data || {};
    if (code !== OK_CODE) {
      return Promise.resolve(resp);
      // return Promise.reject(msg);
    }
    if (code === NO_PERMISSION) {
      router.push({ name: 'Login' }).then();
      return Promise.reject(msg);
    }
    return Promise.resolve(resp);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default requests;
