<template>
  <button class="ghost-btn" :type="type" :disabled="isLoading">
    <!-- Main Content -->
    <span class="btn__main-content" v-if="!isLoading">
      <span class="btn__leading-icon" v-if="canDisplayLeadingIcon">
        <slot name="leadingIcon"></slot>
      </span>
      <span class="btn__text" v-if="canDisplayText">
        <slot name="text"></slot>
      </span>
      <span class="btn__trailing-icon" v-if="canDisplayTrailingIcon">
        <slot name="trailingIcon"></slot>
      </span>
    </span>

    <!-- Loader -->
    <span class="btn__loader-content" v-if="isLoading">
      <span class="loader__animation-wrapper" ref="lottieWrapper"></span>
      <span class="loader__text">{{ loaderText }}</span>
    </span>
  </button>
</template>

<script>
import lottie from 'lottie-web';
import CircleAnimation from '@/assets/js/lottie/circle.json';

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean
    },
    loaderText: {
      type: String,
      default: 'Loading'
    }
  },
  data() {
    return {
      lottie: null
    };
  },
  watch: {
    isLoading: {
      handler(isLoading) {
        if (isLoading) {
          this.$nextTick(() => {
            this.lottie = lottie.loadAnimation({
              container: this.$refs.lottieWrapper,
              renderer: 'svg',
              loop: true,
              autoplay: true,
              animationData: CircleAnimation
            });
          });
        } else {
          if (this.lottie !== null) {
            this.lottie.destroy();
            this.lottie = null;
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    canDisplayLeadingIcon() {
      return !!this.$slots.leadingIcon;
    },
    canDisplayTrailingIcon() {
      return !!this.$slots.trailingIcon;
    },
    canDisplayText() {
      return !!this.$slots.text;
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.ghost-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-family: inherit;
  padding: pixels.toRem(7) pixels.toRem(15);
  background-color: lighten(map.get(main.$primary, 200), 5%);
  outline: none;

  &:focus,
  &:hover {
    background-color: lighten(map.get(main.$primary, 200), 2%);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: lighten(map.get(main.$primary, 500), 10%);
  }

  .btn {
    &__main-content {
      display: flex;
      align-items: center;
    }
    &__text {
      font-weight: 700;
      color: map.get(main.$primary, 500);
      font-size: pixels.toRem(map.get(major-second.$scale, 3));
    }
    &__leading-icon,
    &__trailing-icon {
      width: 13px;
      height: 13px;
      :global(svg) {
        display: block;
        width: 100%;
        height: 100%;
        path {
          fill: white;
        }
      }
    }
    &__leading-icon {
      margin-right: pixels.toRem(7);
    }
    &__trailing-icon {
      margin-left: pixels.toRem(7);
    }

    &__loader-content {
      display: flex;
      .loader {
        &__animation-wrapper {
          display: flex;
          width: 15px;
          height: 15px;
          margin-right: pixels.toRem(7);
          svg {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        &__text {
          font-weight: 700;
          color: white;
          font-size: pixels.toRem(map.get(major-second.$scale, 3));
        }
      }
    }
  }
}
</style>
