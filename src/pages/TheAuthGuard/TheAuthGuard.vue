<template>
  <div :class="$style.auth" ref="root">
    <BasePatternBackground />
    <div :class="$style['auth__form-wrapper']">
      <BaseGradientLogo />

      <div :class="$style['auth__form']">
        <Transition @beforeEnter="beforeEnter" @enter="onEnter">
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

// NPM
import { defineAsyncComponent } from 'vue';
import NProgress from 'nprogress';
import anime from 'animejs/lib/anime.es.js';

export default {
  components: {
    BasePatternBackground,
    BaseGradientLogo,
    TheLogin: defineAsyncComponent(() => import('./Partials/TheLogin.vue')),
    TheSignup: defineAsyncComponent(() => import('./Partials/TheSignup.vue'))
  },
  data: () => ({
    shouldRootBeHidden: true,
    animateOnFirstLoad: false
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
    },

    /*
     * ================
     * Transitions
     * ================
     */
    beforeEnter(el) {
      if (!this.animateOnFirstLoad) {
        this.animateOnFirstLoad = true;
        return;
      }
      Object.assign(el.style, {
        position: 'absolute',
        left: '150%',
        opacity: 0
      });
    },
    onEnter(el, done) {
      this.$nextTick(() => {
        const PARENT = el.parentElement;
        const TO_LEFT = (PARENT.offsetWidth - el.offsetWidth) / 2;

        anime({
          targets: PARENT,
          height: `${el.offsetHeight}px`,
          complete: () => {
            anime({
              targets: el,
              left: `${TO_LEFT}px`,
              opacity: 1,
              easing: 'easeOutQuint',
              duration: 350,
              complete: () => {
                done();
                PARENT.style = null;
                el.style = null;
              }
            });
          }
        });
      });
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
    overflow: hidden;
    border-radius: 15px;
    border: 2px solid map.get(text.$main, 50);
    @include padding.all-sides((
      xsm: 20
    ));
  }

  &__form {
    position: relative;
    @include margin.top((
      xsm: 25
    ));
  }
}
</style>
