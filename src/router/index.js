import { useFlashCardStore } from '@/stores/flashcard';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';

// NPM
import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

const ROUTES = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/pages/TheLanding.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/TheAuthentication.vue'),
    meta: {
      authLock: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/pages/TheAuthentication.vue'),
    meta: {
      authLock: true
    }
  },
  {
    path: '/test/create-card',
    name: 'CardCreationTest',
    component: () => import('@/pages/PageTest/TheCardCreationTest.vue'),
    meta: {
      authLock: true
    }
  },
  {
    path: '/test/play',
    name: 'CardPlayTest',
    component: () => import('@/pages/PageTest/TheFlashcardTest.vue'),
    beforeEnter(to, from, next) {
      const STORE = useFlashCardStore();

      if (!STORE.hasTestItems) {
        next({ name: 'CardCreationTest' });
        return;
      }
      next();
    },
    meta: {
      authLock: true
    }
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: ROUTES
});

router.beforeEach((to, from, next) => {
  // If not the first load, display loader
  if (to.name) {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
  }

  // If user is already authenticated, do not visit the site
  if (to.meta.authLock) {
    FirebaseHelper.getCurrentUser().then((user) => {
      if (user) next({ name: 'Landing' });
    });
    return;
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
