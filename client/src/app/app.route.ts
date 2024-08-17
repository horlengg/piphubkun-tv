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
    }
];

const importAppRoute = async()=>{
    const modules = import.meta.glob('@/views/**/*.routes.ts');
    for (const path in modules) {
        if (Object.prototype.hasOwnProperty.call(modules, path)) {
          const module = await modules[path]() as any;
          if (module && module.default && Array.isArray(module.default)) {
            const moduleRoutes = module.default;
            routes.push(...moduleRoutes);
          } else {
            console.error(`Module at path ${path} does not export routes correctly.`);
          }
        }
    }
}
await importAppRoute();


const router = createRouter({
    history : createWebHistory(),
    routes
});

export default router;