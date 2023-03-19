<template>
  <form :class="$style['signup']">
    <BaseTextInput
      :class="$style['signup__username']"
      type="text"
      placeholder="Place your username here"
      id="signupUsernameTxt"
      label="Username:"
      :validation-rules="{ required: true, min: 4 }"
      v-model="username"
    />

    <BaseTextInput
      :class="$style['signup__email']"
      type="email"
      placeholder="Place your email here"
      id="signupEmailTxt"
      label="Email:"
      :validation-rules="{ required: true, min: 4 }"
      v-model="email"
    />

    <BaseTextInput
      :class="$style['signup__password']"
      type="text"
      placeholder="Place your password here"
      id="signupPasswordTxt"
      label="Password:"
      :validation-rules="{ required: true, min: 6 }"
      v-model="password"
    />

    <BaseTextInput
      :class="$style['signup__confirm-password']"
      type="text"
      placeholder="Confirm your password here"
      id="signupConfirmPasswordTxt"
      label="Confirm Password:"
      :validation-rules="{
        required: true,
        min: 6,
        sameWith: { element: '#signupPasswordTxt', fieldName: 'password' }
      }"
      v-model="confirmPassword"
    />

    <BasePlayfulButton type="submit" :class="$style['signup__register']">
      <template #text>Register</template>
    </BasePlayfulButton>

    <p :class="$style['signup__has-account']">
      Already have an account?
      <router-link :class="$style['link']" :to="{ name: 'AuthGuardLogin' }"
        >Login here</router-link
      >
    </p>
  </form>
</template>

<script>
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';

export default {
  components: {
    BasePlayfulButton,
    BaseTextInput
  },
  data: () => ({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }),
  emits: ['mounted'],
  mounted() {
    // Since this is an async component, parent needs to know if its mounted already
    this.$emit('mounted');
  }
};
</script>

<style lang="scss" module>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/1-settings/css-properties/box-shadow/transition' as
  box-shadow-transition;
@use '../../../assets/scss/2-tools/mixins/css-properties/margin';
@use '../../../assets/scss/2-tools/mixins/css-properties/font-size';
@use '../../../assets/scss/2-tools/mixins/css-properties/box-shadow/primary' as
  box-shadow-primary;

// prettier-ignore
.signup {
  width: 90%;
  margin-right: auto;
  margin-left: auto;

  &__username,
  &__email,
  &__password {
    @include margin.bottom((
        xsm: 25
    ));
  }

  &__register {
    width: 100%;
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
    @include margin.top((
        xsm: 30
    ));
  }

  &__has-account{
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
