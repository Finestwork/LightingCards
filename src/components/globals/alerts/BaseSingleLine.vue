<template>
  <p :class="[alert.alert, alert[colorState]]">
    <span :class="alert['alert__leading-icon']" v-if="shouldDisplayLeadingIcon"
      ><slot name="leadingIcon"></slot
    ></span>
    <span :class="alert['alert__text']" v-if="shouldDisplayText"
      ><slot name="text"></slot
    ></span>
    <span
      :class="alert['alert__trailing-icon']"
      v-if="shouldDisplayTrailingIcon"
      ><slot name="trailingIcon"></slot
    ></span>
  </p>
</template>

<script>
export default {
  props: {
    colorState: {
      type: String,
      default: 'danger'
    }
  },
  computed: {
    shouldDisplayText() {
      return !!this.$slots.text;
    },
    shouldDisplayLeadingIcon() {
      return !!this.$slots.leadingIcon;
    },
    shouldDisplayTrailingIcon() {
      return !!this.$slots.trailingIcon;
    }
  }
};
</script>

<style lang="scss" module="alert">
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/1-settings/css-properties/colors/safety';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.alert {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  padding: pixels.toRem(10);

  &__text {
    font-weight: 700;
    color: white;
    font-size: pixels.toRem(map.get(major-second.$scale, 3));
  }
  &__leading-icon {
    margin-right: pixels.toRem(7);
  }
  &__trailing-icon {
    margin-left: pixels.toRem(7);
  }

  &__leading-icon,
  &__trailing-icon {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
    svg {
      display: block;
      width: 100%;
      height: 100%;
      path {
        fill: white;
      }
    }
  }
  &.danger {
    background-color: lighten(map.get(safety.$danger, 500), 8%);
  }
  &.warning {
    background-color: lighten(map.get(safety.$warning, 600), 15%);
  }
  &.success {
    background-color: darken(map.get(safety.$success, 500), 5%);
  }
}
</style>
