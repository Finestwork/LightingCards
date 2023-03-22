<template>
  <TheUserHome v-if="shouldDisplayUserHome" />
  <TheLanding v-if="shouldDisplayLanding" />
</template>

<script>
import { defineAsyncComponent } from 'vue';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';

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
