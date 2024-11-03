import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/manager/home'},
    {
      path: '/manager', component: () => import('@/views/Manager.vue'),
      children: [
        {path: 'home', meta: {name: '系统首页'}, component: () => import('@/views/manager/Home.vue')},
      ]
    },
    {
      path: '/front',
      component: () => import('@/views/Front.vue'),
      children: [
        {path: 'home', component: () => import('@/views/front/Home.vue')},
      ]
    },
    {path:'/404', component: () => import('@/views/404.vue')},
    {path: '/:pathMatch(.*)', redirect: '/404'}
  ]
})

export default router
