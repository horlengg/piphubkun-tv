import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'test',
    path: '/test',
    component: () => import('./test.vue'),
    meta : {
        isCleanLayout : true
    }
  },
]

export default routes
