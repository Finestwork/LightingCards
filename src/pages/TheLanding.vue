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
    currentState: 'loading'
  }),
  mounted() {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
    const callbackFn = {
      signedInFn: () => {
        this.currentState = 'user';
      },
      signedOutFn: () => {
        this.currentState = 'landing';
      }
    };
    FirebaseHelper.onAuthStateChanged(callbackFn);
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
