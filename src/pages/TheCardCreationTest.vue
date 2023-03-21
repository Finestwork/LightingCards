<template>
  <div class="test">
    <div :class="`${$style['container--sm']} ${$style['test__container']}`">
      <!-- Alert -->
      <TheRequiredLoginAlert :class="$style['test__alert']" />

      <!-- Logo -->
      <div :class="$style['test__logo-wrapper']">
        <router-link to="/" :class="$style['test__logo-link']">
          <BaseGradientLogo />
        </router-link>
        <span :class="$style['test__guest-lbl']">Hello, guest!</span>
      </div>

      <TheFlashCardCreation :class="$style['test__card-creation-wrapper']" />
    </div>
  </div>
</template>

<script>
import BaseGradientLogo from '@/components/globals/logos/BaseGradientLogo.vue';
import TheFlashCardCreation from '@/components/single-instance/TheFlashCardCreation.vue';
import TheRequiredLoginAlert from '@/components/single-instance/TheRequiredLoginAlert.vue';

export default {
  components: {
    BaseGradientLogo,
    TheFlashCardCreation,
    TheRequiredLoginAlert
  }
};
</script>

<style lang="scss" module>
@use 'sass:map';
@use '../assets/scss/1-settings/css-properties/colors/text';
@use '../assets/scss/1-settings/css-properties/colors/safety';
@use '../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../assets/scss/2-tools/mixins/css-properties/padding';
@use '../assets/scss/2-tools/mixins/css-properties/font-size';
@use '../assets/scss/2-tools/mixins/css-properties/display';
@use '../assets/scss/2-tools/mixins/css-properties/margin';
@use '../assets/scss/4-layouts/containers';

// prettier-ignore
.test {
  &__container {
    width: 90%;
  }

  &__alert{
    @include margin.vertical((
        xsm: 25
    ));
  }

  &__logo-wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid map.get(text.$main, 100);
    @include padding.bottom((
        xsm: 8
    ));
  }

  &__logo-link {
    text-decoration: none;
  }

  &__guest-lbl {
    font-weight: 700;
    color: map.get(text.$main, 700);
    @include display.set((
        xsm: none,
        320: block
    ));
    @include font-size.responsive((
        xsm: map.get(major-second.$scale, 4)
    ));
  }

  &__card-creation-wrapper{
    @include margin.top((
      xsm: 50
    ));
  }
}
</style>
