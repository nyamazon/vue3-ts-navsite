import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/styles/app.scss';
import 'element-plus/dist/index.css';
import router from '@/router';
import { createPinia } from 'pinia';
import '@purge-icons/generated';

import lazyLoad from '@/directive/lazyload';
// import { initSysStore } from '@/core/init'; // <-- This
const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$ELEMENT = {
  size: 'small',
};
app.use(lazyLoad).use(router).use(pinia).mount('#app');
// initSysStore();
