<template>
  <main>
    <router-view />
  </main>
</template>

<script>
import 'nprogress/nprogress.css';
</script>
<style lang="scss">
@use 'sass:map';
@use 'src/assets/scss/1-settings/css-properties/colors/main';
@use 'src/assets/scss/1-settings/css-properties/colors/safety';
@use 'src/assets/scss/1-settings/css-properties/font-size/major-second';
@use 'src/assets/scss/2-tools/functions/convertions/pixels';
@use 'src/assets/scss/3-elements/wildcard.scss';
@use 'src/assets/scss/3-elements/html.scss';
@use 'src/assets/scss/3-elements/body.scss';

// To increase specificity since some libraries are injected in head
body {
  /* NProgress */
  #nprogress .bar {
    background: map.get(main.$primary, 600);
    box-shadow: 0 0 10px map.get(main.$primary, 600);
  }
  #nprogress .peg {
    box-shadow: none;
  }

  /* Floating Vue */
  .v-popper--theme-tooltip {
    .v-popper__inner {
      font-weight: 700;
      font-size: pixels.toRem(map.get(major-second.$scale, 2));
      background-color: map.get(main.$primary, 900);
    }

    .v-popper__arrow-outer {
      border-color: map.get(main.$primary, 900);
    }

    &.v-popper__popper.v-popper__popper--show-from .v-popper__wrapper {
      transform: scale(0.5);
    }
    &.v-popper__popper.v-popper__popper--show-to .v-popper__wrapper {
      transform: scale(1);
    }

    &.v-popper__popper.v-popper__popper--hide-to .v-popper__wrapper {
      transform: scale(0.5);
    }

    &.v-popper__popper.v-popper__popper--hide-from .v-popper__wrapper {
      transform: scale(1);
    }

    &.v-popper__popper.v-popper__popper--show-to .v-popper__wrapper,
    &.v-popper__popper.v-popper__popper--hide-to .v-popper__wrapper {
      transition: transform 0.15s;
    }
  }

  /* Vue Toastification */
  .Vue-Toastification__toast {
    min-width: unset;
    font-family: inherit;
    padding: pixels.toRem(20);
    &--success {
      background-color: map.get(safety.$success, 600);
    }
    .Vue-Toastification {
      &__icon {
        width: 16px;
        margin-right: pixels.toRem(7);
      }
      &__toast-body {
        font-weight: 700;
        font-size: pixels.toRem(map.get(major-second.$scale, 3));
      }
      &__close-button {
        line-height: unset;
        font-size: unset;
        margin-left: pixels.toRem(25);
      }
    }
  }
}
</style>
