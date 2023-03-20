<template>
  <div class="test">
    <!-- Header -->
    <div :class="`${$style['container--sm']} ${$style['test__container']}`">
      <!-- Logo -->
      <div :class="$style['test__logo-wrapper']">
        <router-link to="/" :class="$style['test__logo-link']">
          <BaseGradientLogo />
        </router-link>
        <span :class="$style['test__guest-lbl']">Hello, guest!</span>
      </div>

      <!-- Alert -->
      <p :class="$style['test__alert']">
        Your work will not be saved,
        <router-link :class="$style['link']" :to="{ name: 'AuthGuardSignup' }"
          >create an account</router-link
        >
        or
        <router-link :class="$style['link']" :to="{ name: 'AuthGuardLogin' }"
          >login here</router-link
        >.
      </p>

      <TheFlashCardCreation :class="$style['test__card-creation-wrapper']" />
    </div>
  </div>
</template>

<script>
import BaseGradientLogo from '@/components/globals/logos/BaseGradientLogo.vue';
import TheFlashCardCreation from '@/components/single-instance/TheFlashCardCreation.vue';

export default {
  components: {
    BaseGradientLogo,
    TheFlashCardCreation
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
  &__logo-wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid map.get(text.$main, 100);
    @include padding.top((
        xsm: 25
    ));
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

  &__alert{
    font-weight: 600;
    text-align: center;
    border-radius: 7px;
    color: white;
    background-color: map.get(safety.$danger, 500);
    @include margin.top((
      xsm: 25
    ));
    @include padding.vertical((
      xsm: 10
    ));

    .link{
      color: white;
    }
  }

  &__card-creation-wrapper{
    @include margin.top((
      xsm: 70
    ));
  }
}
</style>
