// src/views/home/home.routes.ts

import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/favourite',
    name: 'Favourite',
    component: ()=> import('@/views/favourite/favourite.vue'),
  },
  // Add more routes as needed
];

export default routes;
