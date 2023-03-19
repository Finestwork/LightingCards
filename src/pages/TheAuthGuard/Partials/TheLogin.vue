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
  data() {
    return {
      emailTxt: '',
      passwordTxt: ''
    };
  }
};
</script>

<style lang="scss" module>
@use '../../../assets/scss/2-tools/mixins/css-properties/margin';

// prettier-ignore
.login {
  width: 90%;
  margin-right: auto;
  margin-left: auto;

  &__email{
    @include margin.bottom((
      xsm: 25
    ));
  }
  &__submit{
    width: 100%;
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
    @include margin.top((
      xsm: 25
    ));
  }
}
</style>
