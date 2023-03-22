<template>
  <form class="signup" @submit.prevent="registerUser">
    <BaseList
      class="signup__error-alert"
      :items="errorList"
      v-if="shouldDisplayErrorAlert"
    />

    <BaseTextInput
      class="signup__username"
      type="text"
      placeholder="Place your username here"
      id="signupUsernameTxt"
      label="Username:"
      :validation-rules="{ required: true, min: 4 }"
      v-model="username"
    />

    <BaseTextInput
      class="signup__email"
      type="email"
      placeholder="Place your email here"
      id="signupEmailTxt"
      label="Email:"
      :validation-rules="{ required: true, isEmail: true }"
      v-model="email"
    />

    <BaseTextInput
      class="signup__password"
      type="password"
      placeholder="Place your password here"
      id="signupPasswordTxt"
      label="Password:"
      toggle-password
      :validation-rules="{ required: true, min: 6 }"
      v-model="password"
    />

    <BaseTextInput
      class="signup__confirm-password"
      type="password"
      placeholder="Confirm your password here"
      id="signupConfirmPasswordTxt"
      label="Confirm Password:"
      toggle-password
      :validation-rules="{
        required: true,
        min: 6
      }"
      v-model="confirmPassword"
    />

    <BasePlayfulButton
      ref="submitBtn"
      type="submit"
      class="signup__register"
      :is-loading="isSubmitBtnLoading"
    >
      <template #text>Register</template>
    </BasePlayfulButton>

    <p class="signup__has-account">
      Already have an account?
      <router-link class="link" :to="{ name: 'AuthGuardLogin' }"
        >Login here
      </router-link>
    </p>
  </form>
</template>

<script>
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';
import BaseList from '@/components/globals/alerts/BaseList.vue';

// Helpers
import FormValidationHelper from '@/assets/js/helpers/form-validation-helper';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';

export default {
  components: {
    BasePlayfulButton,
    BaseTextInput,
    BaseList
  },
  data: () => ({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errorList: [],
    isSubmitBtnLoading: false
  }),
  emits: ['mounted', 'registerFailed'],
  mounted() {
    // Since this is an async component, parent needs to know if component is mounted
    this.$emit('mounted');
  },
  methods: {
    registerUser() {
      this.isSubmitBtnLoading = true;
      this.errorList = [];

      // Username must not be empty
      if (FormValidationHelper.isEmpty(this.username)) {
        this.errorList.push('• Username is empty.');
      }

      // Email must not be empty and valid
      if (FormValidationHelper.isEmpty(this.email)) {
        this.errorList.push('• Email is empty.');
      } else {
        if (!FormValidationHelper.isEmail(this.email)) {
          this.errorList.push('• Invalid email.');
        }
      }

      // Password should be the same with confirm password and greater than 5
      if (FormValidationHelper.isEmpty(this.password)) {
        this.errorList.push('• Password field is empty.');
      }

      if (FormValidationHelper.isEmpty(this.password)) {
        this.errorList.push('• Confirm password field is empty.');
      }

      if (
        !FormValidationHelper.isEmpty(this.password) &&
        !FormValidationHelper.isEmpty(this.confirmPassword) &&
        !FormValidationHelper.sameWith(this.password, this.confirmPassword)
      ) {
        this.errorList.push('• Password fields are not the same.');
      }

      if (this.shouldDisplayErrorAlert) {
        this.$refs.submitBtn.$el.blur();
        this.isSubmitBtnLoading = false;
        this.$emit('registerFailed');
        return;
      }

      // Handle firebase authentication
      const handleResult = () => {
        const redirectToHomePage = () => {
          // Redirect user to homepage
          this.isSubmitBtnLoading = false;
        };
        const handleErr = () => {
          // If user can't update display name, they can do it on profile settings
          // Still redirect user to homepage
          this.isSubmitBtnLoading = false;
        };

        FirebaseHelper.updateDisplayName({ displayName: this.username })
          .then(redirectToHomePage)
          .catch(handleErr);
      };
      const handleErr = (err) => {
        if (!err.code) {
          this.errorList.push(
            "• Can't create an account, please try again later."
          );
          return;
        }

        const GOOGLE_ERROR = FirebaseHelper.getErrors[err.code];
        this.errorList.push(`• ${GOOGLE_ERROR}`);
        this.isSubmitBtnLoading = false;
      };
      FirebaseHelper.registerUser(this.email, this.password)
        .then(handleResult)
        .catch(handleErr);
    }
  },
  computed: {
    shouldDisplayErrorAlert() {
      return this.errorList.length !== 0;
    }
  }
};
</script>

<style lang="scss" scoped>
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

  &__error-alert {
    @include margin.bottom((
        xsm: 20
    ));
  }

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

  &__has-account {
    font-weight: 600;
    color: map.get(text.$main, 900);
    @include font-size.responsive((
        xsm: map.get(major-second.$scale, 2)
    ));
    @include margin.top((
        xsm: 45
    ));

    .link {
      text-decoration: underline;
      transition: box-shadow-transition.$transition-linear;
      color: map.get(main.$primary, 600);
      outline: none;

      &:focus {
        @include box-shadow-primary.lightness(light, sm);
      }

      &:focus,
      &:hover {
        color: darken(map.get(main.$primary, 600), 5%);
      }
    }
  }
}
</style>
