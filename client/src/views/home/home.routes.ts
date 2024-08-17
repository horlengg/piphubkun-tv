// src/views/home/home.routes.ts

import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import('@/views/home/home.vue'),
  },
  // Add more routes as needed
];

export default routes;
