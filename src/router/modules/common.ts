import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/front',
  },
  {
    path: '/front',
    name: 'Front',
    meta: {
      index: 1,
    },
    component: () => import('@/pages/Front.vue'),
    children: [
      {
        path: '',
        component: () => import('@/components/front/FrontIndex.vue'),
      },
      {
        path: 'wallpaper',
        component: () => import('@/components/front/FrontWallPaper.vue'),
      },
    ],
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/pages/Test.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      index: 1,
    },
    component: () => import('@/pages/Admin.vue'),
    children:[
      {
        path:'',
        name:'kongbai',
        redirect:'/admin/settings'
      },
      {
        path:'settings',
        component:() => import('@/components/admin/main/AdminSettings.vue')
      },
      {
        path:'wallpaper',
        component:() => import('@/components/admin/main/AdminWallpaper.vue')
      },
      {
        path:'leaveMsg',
        component:() => import('@/components/admin/main/AdminLeaveMsg.vue')
      },
      {
        path: 'account',
        component:() => import('@/components/admin/main/AdminAccount.vue')
      }
    ]
  },
  // {
  //   path: '/:catchAll(.*)',
  //   meta: {
  //     index: -1,
  //   },
  //   component: () => import('@/pages/NotFound.vue'),
  // },
];

export default routes;
