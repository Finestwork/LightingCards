import { createRouter, createWebHistory } from 'vue-router';

const ROUTES = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/pages/TheLanding.vue')
  },
  {
    path: '/login',
    name: 'AuthGuardLogin',
    component: () => import('@/pages/TheAuthGuard/TheAuthGuard.vue')
  },
  {
    path: '/signup',
    name: 'AuthGuardSignup',
    component: () => import('@/pages/TheAuthGuard/TheAuthGuard.vue')
  },
  {
    path: '/test/create-card',
    name: 'CardCreationTest',
    component: () => import('@/pages/TheCardCreationTest.vue')
  },
  {
    path: '/test/play',
    name: 'CardPlayTest',
    component: () => import('@/pages/TheFlashcardTest.vue')
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: ROUTES
});

export default router;
