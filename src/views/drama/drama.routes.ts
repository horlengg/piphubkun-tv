// src/views/home/home.routes.ts

import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/drama/:dramaId',
    name: 'Drama',
    component: ()=> import('@/views/drama/drama.vue'),
  },
  // Add more routes as needed
];

export default routes;
