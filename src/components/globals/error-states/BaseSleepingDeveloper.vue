<template>
  <section class="error-state">
    <span class="error-state__img">
      <img
        src="/assets/images/error-states/sleeping-developer.svg"
        alt="Illustration of a sleeping developer"
      />
    </span>
    <h3 class="error-state__title">{{ title }}</h3>
    <p class="error-state__msg">{{ msg }}</p>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    msg: {
      type: String,
      required: true
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

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__img {
    display: flex;
    width: 180px;
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
</style>
