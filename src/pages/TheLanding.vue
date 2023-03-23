<template>
  <TheUserHome @on-mounted="onComponentMounted" v-if="shouldDisplayUserHome" />
  <TheLanding @on-mounted="onComponentMounted" v-if="shouldDisplayLanding" />
</template>

<script>
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';

// NPM
import { defineAsyncComponent } from 'vue';
import NProgress from 'nprogress';

export default {
  components: {
    TheUserHome: defineAsyncComponent(() =>
      import('@/components/single-instance/TheUserHome.vue')
    ),
    TheLanding: defineAsyncComponent(() =>
      import('@/components/single-instance/TheLanding.vue')
    )
  },
  data: () => ({
    // loading, user, landing
    currentState: 'loading',
    authSubscribe: null
  }),
  mounted() {
    NProgress.configure({ showSpinner: false });
    const callbackFn = {
      signedInFn: () => {
        NProgress.start();
        this.currentState = 'user';
      },
      signedOutFn: () => {
        NProgress.start();
        this.currentState = 'landing';
      }
    };
    this.authSubscribe = FirebaseHelper.onAuthStateChanged(callbackFn);
  },
  unmounted() {
    if (this.authSubscribe !== null) this.authSubscribe();
  },
  methods: {
    onComponentMounted() {
      NProgress.done();
    }
  },
  computed: {
    shouldDisplayUserHome() {
      return this.currentState === 'user';
    },
    shouldDisplayLanding() {
      return this.currentState === 'landing';
    }
  }
};
</script>
