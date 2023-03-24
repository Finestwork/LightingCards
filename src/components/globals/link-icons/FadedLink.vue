<template>
  <VTooltip class="ghost-btn">
    <router-link :to="to" class="btn">
      <slot></slot>
    </router-link>

    <template #popper>
      {{ tooltip }}
    </template>
  </VTooltip>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true
    },
    tooltip: {
      type: String,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/1-settings/css-properties/box-shadow/transition' as
  box-shadow-transition;
@use '../../../assets/scss/2-tools/mixins/css-properties/box-shadow/primary' as
  box-shadow-primary;
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.ghost-btn {
  display: flex;
  width: 35px;
  height: 35px;
  .btn {
    border-radius: 50%;
    border: none;
    cursor: pointer;
    outline: none;
    transition: box-shadow-transition.$transition-linear;
    background-color: darken(map.get(main.$primary, 50), 3%);
    padding: pixels.toRem(10);
    &:hover,
    &:focus {
      background-color: darken(map.get(main.$primary, 50), 6%);
    }
    &:focus {
      @include box-shadow-primary.lightness(lighter, md);
    }
  }
  :deep(svg) {
    display: block;
    width: 100%;
    height: 100%;
    path {
      fill: map.get(main.$primary, 500);
    }
  }
}
</style>
