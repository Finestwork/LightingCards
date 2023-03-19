<template>
  <div :class="$style.auth" ref="root">
    <BasePatternBackground />
    <div :class="$style['auth__form-wrapper']">
      <BaseGradientLogo />

      <div :class="$style['auth__form']">
        <Transition>
          <TheLogin @mounted="componentMounted" v-if="shouldShowLogin" />
          <TheSignup @mounted="componentMounted" v-else-if="shouldShowSignup" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import BasePatternBackground from '@/components/globals/backgrounds/BasePatternBackground.vue';
import BaseGradientLogo from '@/components/globals/logos/BaseGradientLogo.vue';
import { defineAsyncComponent } from 'vue';

// NPM
import NProgress from 'nprogress';

export default {
  components: {
    BasePatternBackground,
    BaseGradientLogo,
    TheLogin: defineAsyncComponent(() => import('./Partials/TheLogin.vue')),
    TheSignup: defineAsyncComponent(() => import('./Partials/TheSignup.vue'))
  },
  data: () => ({
    shouldRootBeHidden: true
  }),
  mounted() {
    NProgress.configure({ showSpinner: false });
    NProgress.start();
    Object.assign(this.$refs.root.style, {
      display: 'none'
    });
  },
  methods: {
    componentMounted() {
      if (!this.shouldRootBeHidden) return;
      this.shouldRootBeHidden = false;
      Object.assign(this.$refs.root.style, {
        display: null
      });
      NProgress.done();
    }
  },
  computed: {
    shouldShowLogin() {
      const ROUTE = this.$route.name;
      return ROUTE === 'AuthGuardLogin';
    },
    shouldShowSignup() {
      const ROUTE = this.$route.name;
      return ROUTE === 'AuthGuardSignup';
    }
  }
};
</script>

<style lang="scss" module>
@use 'sass:map';
@use '../../assets/scss/1-settings/css-properties/colors/text';
@use '../../assets/scss/2-tools/mixins/css-properties/padding';
@use '../../assets/scss/2-tools/mixins/css-properties/margin';

// prettier-ignore
.auth {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @include padding.vertical((
    xsm: 25
  ));

  &__form-wrapper {
    background-color: white;
    width: 90%;
    max-width: 650px;
    border-radius: 15px;
    border: 2px solid map.get(text.$main, 50);
    @include padding.all-sides((
      xsm: 20
    ));
  }

  &__form {
    @include margin.top((
      xsm: 25
    ));
  }
}
</style>
