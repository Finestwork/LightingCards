<template>
  <div :class="$style.auth">
    <BasePatternBackground />
    <div :class="$style['auth__form-wrapper']">
      <BaseGradientLogo />

      <div :class="$style['auth__form']">
        <TheLogin />
      </div>
    </div>
  </div>
</template>

<script>
import BasePatternBackground from '@/components/globals/backgrounds/BasePatternBackground.vue';
import BaseGradientLogo from '@/components/globals/logos/BaseGradientLogo.vue';
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    BasePatternBackground,
    BaseGradientLogo,
    TheLogin: defineAsyncComponent(() => import('./Partials/TheLogin.vue'))
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
