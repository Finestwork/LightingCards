import { createRouter, createWebHistory } from 'vue-router';
import { useFlashCardStore } from '@/stores/flashcard';
import NProgress from 'nprogress';

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
    component: () => import('@/pages/TheCardCreationTest.vue'),
    beforeEnter(to, from, next) {
      /*
       * TODO:
       *  If user is logged in do not access this page
       */
      next();
    }
  },
  {
    path: '/test/play',
    name: 'CardPlayTest',
    component: () => import('@/pages/TheFlashcardTest.vue'),
    beforeEnter(to, from, next) {
      /*
       * TODO:
       *  If user is logged in do not access this page
       */
      const STORE = useFlashCardStore();

      if (!STORE.hasTestItems) {
        next({ name: 'CardCreationTest' });
        return;
      }
      next();
    }
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: ROUTES
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
  }

  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
