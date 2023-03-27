<template>
  <div :class="$style.auth" ref="root">
    <BasePatternBackground />
    <div :class="$style['auth__form-wrapper']">
      <router-link to="/" :class="$style['auth__logo-link']">
        <BaseGradientLogo />
      </router-link>
      <div :class="$style['auth__form']">
        <Transition
          @before-leave="beforeLeave"
          @leave="onLeave"
          @beforeEnter="beforeEnter"
          @enter="onEnter"
        >
          <TheLogin
            ref="login"
            @mounted="onLoginMounted"
            @login-failed="recalculateHeight"
            v-if="shouldShowLogin"
          />
          <TheSignup
            ref="signup"
            @mounted="onSignupMounted"
            @register-failed="recalculateHeight"
            v-else-if="shouldShowSignup"
          />
        </Transition>
      </div>
      <span
        ref="formLoader"
        :class="$style['auth__form-loader']"
        v-if="canShowFormLoader"
      ></span>
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
import DocumentTitleHelper from '@/assets/js/helpers/document-title-helper';

export default {
  components: {
    BasePatternBackground,
    BaseGradientLogo,
    TheLogin: defineAsyncComponent(() =>
      import('@/components/single-instance/TheLogin.vue')
    ),
    TheSignup: defineAsyncComponent(() =>
      import('@/components/single-instance/TheSignup.vue')
    )
  },
  data: () => ({
    canRootBeHidden: true,
    animateOnFirstLoad: false,
    canShowFormLoader: false,
    formLoaderAnimId: null
  }),
  mounted() {
    DocumentTitleHelper.auth(this.$route.name);
    // If one of the components are not yet downloaded, start the loading state
    if (this.$refs.signup === undefined && this.$refs.login === undefined) {
      NProgress.configure({ showSpinner: false });
      NProgress.start();
      Object.assign(this.$refs.root.style, {
        display: 'none'
      });
    }
  },
  methods: {
    onLoginMounted() {
      this.onPageFirstLoad();
    },
    onSignupMounted() {
      this.onPageFirstLoad();
    },
    // Alerts will be display so height needs to be recalculated
    recalculateHeight() {
      const EL = this.$refs.signup || this.$refs.login;
      const PARENT = EL.$el.parentElement;
      setTimeout(() => {
        const SCROLL_HEIGHT = EL.$el.getBoundingClientRect().height;
        Object.assign(PARENT.style, {
          height: `${SCROLL_HEIGHT}px`
        });
      }, 150);
    },

    /*
     * ================
     * Helpers
     * ================
     */
    onPageFirstLoad() {
      if (!this.canRootBeHidden) return;
      this.canRootBeHidden = false;
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
    beforeLeave(el) {
      // Only show form loader, if one of the components are missing and needs to be downloaded
      if (this.$refs.login === undefined || this.$refs.signup === undefined) {
        this.canShowFormLoader = true;
      }

      Object.assign(el.style, {
        position: 'absolute',
        left: `${el.offsetLeft}px`
      });
    },
    onLeave(el, done) {
      const animate = () => {
        anime({
          targets: el,
          left: '-100%',
          opacity: 0,
          duration: 350,
          easing: 'easeOutCubic',
          complete: () => {
            done();
          }
        });
      };

      // Don't animate yet, component needs to be checked if its fully downloaded, handled in watchers
      if (this.$refs.signup === undefined || this.$refs.login === undefined) {
        const intId = setInterval(() => {
          if (
            this.$refs.signup !== undefined &&
            this.$refs.login !== undefined
          ) {
            clearInterval(intId);
            animate();
          }
        });
        return;
      }

      // No need to wait longer because all components are already downloaded
      animate();
    },
    beforeEnter(el) {
      if (!this.animateOnFirstLoad) {
        this.animateOnFirstLoad = true;
        return;
      }

      Object.assign(el.style, {
        position: 'absolute',
        left: '100%',
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
          delay: 350
        });
        anime({
          targets: el,
          left: `${TO_LEFT}px`,
          opacity: 1,
          easing: 'easeOutCubic',
          duration: 350,
          delay: 350,
          complete: () => {
            done();
            this.canShowFormLoader = false;
            DocumentTitleHelper.auth(this.$route.name);
          }
        });
      });
    }
  },
  computed: {
    shouldShowLogin() {
      const ROUTE = this.$route.name;
      return ROUTE === 'Login';
    },
    shouldShowSignup() {
      const ROUTE = this.$route.name;
      return ROUTE === 'Signup';
    }
  },
  watch: {
    canShowFormLoader(canShowFormLoader) {
      if (canShowFormLoader) {
        this.$nextTick(() => {
          Object.assign(this.$refs.formLoader.style, {
            opacity: 0.8
          });
          this.formLoaderAnimId = anime({
            targets: this.$refs.formLoader,
            opacity: 0.7,
            duration: 450,
            direction: 'alternate',
            loop: true
          });
        });
        return;
      }

      if (this.formLoaderAnimId === null) return;

      this.formLoaderAnimId.pause();
    }
  }
};
</script>

<style lang="scss" module>
@use 'sass:map';
@use '../assets/scss/1-settings/css-properties/colors/text';
@use '../assets/scss/2-tools/mixins/css-properties/padding';
@use '../assets/scss/2-tools/mixins/css-properties/margin';

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

  &__form-loader {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.8;
  }

  &__logo-link{
    text-decoration: none;
  }

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
