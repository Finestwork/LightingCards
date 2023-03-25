<template>
  <section class="loader">
    <span class="loader__anim" ref="lottieWrapper"></span>
    <h2 class="loader__title" v-if="shouldDisplayTitle">
      <slot name="title"></slot>
    </h2>
    <p class="loader__msg" v-if="shouldDisplayMsg">
      <slot name="msg"></slot>
    </p>
  </section>
</template>

<script>
import lottie from 'lottie-web';
import ShapeSwapping from '@/assets/js/lottie/shape-swapping.json';
export default {
  mounted() {
    lottie.loadAnimation({
      container: this.$refs.lottieWrapper,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: ShapeSwapping
    });
  },
  computed: {
    shouldDisplayTitle() {
      return this.$slots.title;
    },
    shouldDisplayMsg() {
      return this.$slots.msg;
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__anim {
    display: flex;
    width: 150px;
  }
  &__title {
    font-weight: 800;
    color: map.get(main.$primary, 900);
    font-size: pixels.toRem(map.get(major-second.$scale, 5));
  }
  &__msg {
    font-weight: 600;
    color: map.get(text.$main, 500);
    font-size: pixels.toRem(map.get(major-second.$scale, 3));
  }
}
</style>
