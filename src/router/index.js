import { useFlashCardStore } from '@/stores/flashcard';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';

// NPM
import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

const ERROR_ROUTES = [
  {
    path: '/page-not-found',
    name: 'NotFound',
    component: () => import('@/pages/ThePageNotFound.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PathNotFound',
    component: () => import('@/pages/ThePageNotFound.vue')
  }
];
const PUBLIC_ROUTES = [
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
      public: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/pages/TheAuthentication.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/test/create-card',
    name: 'CardCreationTest',
    component: () => import('@/pages/TheCardCreationTest.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/test/play',
    name: 'CardPlayTest',
    component: () => import('@/pages/TheFlashcardTest.vue'),
    beforeEnter(to, from, next) {
      const STORE = useFlashCardStore();

      if (!STORE.hasTestItems) {
        next({ name: 'CardCreationTest' });
        return;
      }
      next();
    },
    meta: {
      public: true
    }
  }
];
const MAIN_ROUTES = [
  {
    path: '/create-card',
    name: 'CardCreationProcess',
    component: () => import('@/pages/TheCardCreationProcess.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/review/:id',
    name: 'ReviewFlashcard',
    component: () => import('@/pages/TheReviewFlashcard.vue'),
    props: true,
    meta: {
      auth: true
    }
  },
  {
    path: '/edit/:id',
    name: 'EditFlashcard',
    component: () => import('@/pages/TheFlashCardEditor.vue'),
    props: true,
    meta: {
      auth: true
    }
  },
  {
    path: '/profile-settings',
    name: 'ProfileSettings',
    component: () => import('@/pages/TheProfileSettings.vue'),
    meta: {
      auth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...PUBLIC_ROUTES, ...MAIN_ROUTES, ...ERROR_ROUTES]
});

router.beforeEach((to, from, next) => {
  // If not the first load, display loader
  if (to.name) {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
  }

  // If user is already authenticated, do not visit the site
  if (to.meta.public) {
    FirebaseHelper.getCurrentUser()
      .then((user) => {
        if (user) next({ name: 'Landing' });
        else next();
      })
      .catch(() => next({ name: 'Landing' }));
    return;
  }

  // User needs to be signed in visit a particular site
  if (to.meta.auth) {
    FirebaseHelper.getCurrentUser()
      .then((user) => {
        if (user) next();
        else next({ name: 'Login' });
      })
      .catch(() => next({ name: 'Login' }));

    return;
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
