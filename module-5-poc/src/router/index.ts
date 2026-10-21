import { createRouter, createWebHistory } from 'vue-router'
// () => import(...) makes each page its own chunk, loaded only when visited
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/orders', name: 'orders', component: () => import('@/views/OrdersView.vue') },
  ],
})
export default router
