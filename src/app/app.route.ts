import { createRouter,createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path : "/:pathMatch(.*)*",
        name : '404',
        component : ()=> import("@/app/components/error/404.vue")
    },
    {
        path : "/500",
        name : '500',
        component : ()=> import("@/app/components/error/500.vue")
    },
    {
      path: '/',
      name: 'Home',
      component: ()=> import('@/views/home/home.vue'),
    },
    {
      path: '/:code',
      name: 'Drama',
      component: ()=> import('@/views/drama/drama.vue'),
    },
];


const router = createRouter({
    history : createWebHistory(),
    routes
});

export default router;

