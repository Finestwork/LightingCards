<template>
  <span :class="$style['logo']">
    <span :class="$style['logo__box']">
      <img
        src="/assets/images/logos/logo-large.svg"
        alt="LightningCard's Logo"
      />
    </span>
    <span :class="$style['logo__text']">LightningCard</span>
  </span>
</template>

<style lang="scss" module>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

// prettier-ignore
.logo {
  display: flex;
  align-items: center;
  &__box {
    display: block;
    width: 35px;
    margin-right: pixels.toRem(7);

    > img {
      width: 100%;
    }
  }

  &__text {
    font-weight: 800;
    color: transparent;
    background: linear-gradient(to right, map.get(main.$primary, 900), map.get(main.$primary, 600));
    background-clip: text;
    font-size: pixels.toRem(map.get(major-second.$scale, 5));
  }
}
</style>
