<template>
  <router-link :class="$style['playful-link']" :to="to">
    <span :class="$style['link__leading-icon']" v-if="shouldShowLeadingIcon">
      <slot name="leadingIcon"></slot>
    </span>

    <slot name="text"></slot>

    <span :class="$style['link__trailing-icon']" v-if="shouldShowTrailingIcon">
      <slot name="trailingIcon"></slot>
    </span>
  </router-link>
</template>

<script>
export default {
  props: {
    // Same thing with router-link "to" property
    to: {
      type: Object,
      required: true
    }
  },
  computed: {
    shouldShowLeadingIcon() {
      return this.$slots.leadingIcon;
    },
    shouldShowTrailingIcon() {
      return this.$slots.trailingIcon;
    },
    shouldShowText() {
      return this.$slots.text;
    }
  }
};
</script>

<style lang="scss" module>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.playful-link {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  text-decoration: none;
  font-weight: 700;
  color: white;
  font-size: pixels.toRem(map.get(major-second.$scale, 3));
  transition: box-shadow 0.15s ease-in-out, transform 0.15s ease-in-out;
  padding: pixels.toRem(15);
  box-shadow: inset 0 -6px 0 rgba(map.get(main.$primary, 900), 0.16);
  background-color: map.get(main.$primary, 500);

  &:focus {
    outline: none;
    transform: translateY(3px);
    box-shadow: inset 0 -3px 0 rgba(map.get(main.$primary, 900), 0.16);
  }

  &:focus,
  &:hover {
    background-color: darken(map.get(main.$primary, 500), 3%);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: lighten(map.get(main.$primary, 500), 10%);
    background-color: lighten(map.get(main.$primary, 500), 10%);
  }

  .link {
    &__leading-icon,
    &__trailing-icon {
      width: 13px;
      height: 13px;
      svg {
        display: block;
        width: 100%;
        height: 100%;
        path {
          fill: white;
        }
      }
    }
    &__leading-icon {
      margin-right: pixels.toRem(4);
    }
    &__trailing-icon {
      margin-left: pixels.toRem(4);
    }
  }
}
</style>
