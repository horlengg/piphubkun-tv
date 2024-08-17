// src/views/home/home.routes.ts

import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/explore',
    name: 'Explore',
    component: ()=> import('@/views/explore/explore.vue'),
  },
  // Add more routes as needed
];

export default routes;
