<template>
  <section class="error--server">
    <span class="error__illustration">
      <img
        src="/assets/images/error-states/server-error.svg"
        alt="Illustration of a server that is being stormed"
      />
    </span>
    <span class="error__title" v-if="shouldDisplayTitle">
      <slot name="title"></slot>
    </span>
    <span class="error__msg" v-if="shouldDisplayMsg">
      <slot name="msg"></slot>
    </span>
    <slot name="addons"></slot>
  </section>
</template>

<script>
export default {
  computed: {
    shouldDisplayTitle() {
      return !!this.$slots.title;
    },
    shouldDisplayMsg() {
      return !!this.$slots.msg;
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.error--server {
  display: flex;
  flex-direction: column;
  align-items: center;
  .error {
    &__illustration {
      display: flex;
      width: 100%;
      max-width: 160px;
      > img {
        width: 100%;
      }
    }
    &__title {
      font-weight: 900;
      margin-top: pixels.toRem(20);
      color: map.get(main.$primary, 900);
      font-size: pixels.toRem(map.get(major-second.$scale, 6));
    }
    &__msg {
      font-weight: 600;
      text-align: justify;
      color: map.get(text.$main, 500);
      font-size: pixels.toRem(map.get(major-second.$scale, 3));
    }
  }
}
</style>
