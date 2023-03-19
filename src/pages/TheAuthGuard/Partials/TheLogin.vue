<template>
  <div :class="$style['login']">
    <BaseTextInput
      :class="$style['login__email']"
      type="email"
      placeholder="Place your email here"
      id="loginEmailTxt"
      label="Email:"
      :validation-rules="{ isEmail: true }"
      v-model="emailTxt"
    />
    <BaseTextInput
      :class="$style['login__password']"
      type="password"
      placeholder="Place your password here"
      id="loginPasswordTxt"
      label="Password:"
      :validation-rules="{ min: 6, max: 8 }"
      v-model="passwordTxt"
    />

    <BasePlayfulButton type="button" :class="$style['login__submit']">
      <template #text>Submit</template>
    </BasePlayfulButton>

    <p :class="$style['login__no-account']">
      Not registered yet?
      <router-link :class="$style['link']" :to="{ name: 'AuthGuardSignup' }"
        >Register here</router-link
      >
    </p>
  </div>
</template>

<script>
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';

export default {
  components: {
    BaseTextInput,
    BasePlayfulButton
  },
  data: () => ({
    emailTxt: '',
    passwordTxt: ''
  }),
  emits: ['mounted', 'unmounted'],
  mounted() {
    // Since this is an async component, parent needs to know if component is mounted
    this.$emit('mounted');
  },
  unmounted() {
    // Since this is an async component, parent needs to know if component is unmounted
    this.$emit('mounted');
  }
};
</script>

<style lang="scss" module>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/box-shadow/transition' as
  box-shadow-transition;
@use '../../../assets/scss/2-tools/mixins/css-properties/margin';
@use '../../../assets/scss/2-tools/mixins/css-properties/font-size';
@use '../../../assets/scss/2-tools/mixins/css-properties/box-shadow/primary' as
  box-shadow-primary;

// prettier-ignore
.login {
  width: 90%;
  margin-right: auto;
  margin-left: auto;

  &__email {
    @include margin.bottom((
        xsm: 25
    ));
  }

  &__submit {
    width: 100%;
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
    @include margin.top((
        xsm: 25
    ));
  }

  &__no-account{
    font-weight: 600;
    color: map.get(text.$main, 900);
    @include font-size.responsive((
      xsm: map.get(major-second.$scale, 2)
    ));
    @include margin.top((
      xsm: 45
    ));

    .link{
      text-decoration: underline;
      transition: box-shadow-transition.$transition-linear;
      color: map.get(main.$primary, 600);
      outline: none;

      &:focus{
        @include box-shadow-primary.lightness(light, sm);
      }

      &:focus,
      &:hover{
        color: darken(map.get(main.$primary, 600), 5%);
      }
    }
  }
}
</style>
