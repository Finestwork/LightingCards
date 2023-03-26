<template>
  <PlainNavbar />
  <div class="container container--sm">
    <h1 class="title">Hello, Romeus!</h1>
    <p class="message">
      Welcome to your profile settings! Here, you can edit your email and
      password to keep your account up-to-date. Please note that this page is
      currently under construction and we appreciate your patience as we
      continue to improve and enhance our platform
    </p>

    <div class="btn-group">
      <BasePlayfulButton type="button">
        <template #text>Change Avatar</template>
      </BasePlayfulButton>
      <BasePlayfulButton type="button">
        <template #text>Username</template>
      </BasePlayfulButton>
      <BasePlayfulButton type="button">
        <template #text>Change Email</template>
      </BasePlayfulButton>
      <BasePlayfulButton type="button">
        <template #text>Change Password</template>
      </BasePlayfulButton>
    </div>
  </div>
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';

export default {
  components: {
    PlainNavbar,
    BasePlayfulButton
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../assets/scss/1-settings/css-properties/colors/text';
@use '../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../assets/scss/2-tools/mixins/css-properties/margin';
@use '../assets/scss/2-tools/mixins/css-properties/font-size';
@use '../assets/scss/4-layouts/containers';

// prettier-ignore
.container {
  width: 90%;
  @include margin.top((
    xsm: 50
  ));
  .title{
    font-weight: 900;
    color: map.get(text.$main, 900);
    @include font-size.responsive((
      xsm: map.get(major-second.$scale, 7)
    ));
  }
  .message{
    font-weight: 600;
    color: map.get(text.$main, 500);
  }

  .btn-group{
    display: flex;
    flex-wrap: wrap;
    @include margin.top((
      xsm: 35
    ));
    .playful-btn{
      @include margin.right((
        xsm: 7
      ));
      @include margin.bottom((
        xsm: 10
      ));
    }
  }
}
</style>
