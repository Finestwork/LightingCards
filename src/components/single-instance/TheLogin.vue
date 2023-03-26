<template>
  <form class="login" @submit.prevent="loginUser">
    <BaseSingleLine class="login__error-alert" v-if="shouldDisplayErrorAlert">
      <template #text>{{ errorAlertTxt }}</template>
    </BaseSingleLine>
    <BaseTextInput
      class="login__email"
      type="email"
      placeholder="Place your email here"
      id="loginEmailTxt"
      label="Email:"
      :validation-rules="{ isEmail: true }"
      v-model="emailTxt"
    />
    <BaseTextInput
      class="login__password"
      type="password"
      placeholder="Place your password here"
      id="loginPasswordTxt"
      label="Password:"
      :validation-rules="{ min: 6, max: 8 }"
      v-model="passwordTxt"
    />

    <BasePlayfulButton
      ref="submitBtn"
      type="submit"
      class="login__submit"
      :is-loading="isSubmitBtnLoading"
    >
      <template #text>Submit</template>
    </BasePlayfulButton>

    <p class="login__no-account">
      Not registered yet?
      <router-link class="link" :to="{ name: 'Signup' }"
        >Register here
      </router-link>
    </p>
  </form>
</template>

<script>
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';
import BaseSingleLine from '@/components/globals/alerts/BaseSingleLine.vue';

// Helpers
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';
import { useFlashCardStore } from '@/stores/flashcard';

// NPM
import isEmail from 'validator/es/lib/isEmail';
import { useToast } from 'vue-toastification';

export default {
  components: {
    BaseTextInput,
    BasePlayfulButton,
    BaseSingleLine
  },
  data: () => ({
    errorAlertTxt: '',
    emailTxt: '',
    passwordTxt: '',
    isSubmitBtnLoading: false
  }),
  emits: ['mounted'],
  mounted() {
    // Since this is an async component, parent needs to know if component is mounted
    this.$emit('mounted');
  },
  methods: {
    loginUser() {
      this.isSubmitBtnLoading = true;
      this.errorAlertTxt = '';
      const validationFn = (text) => {
        this.errorAlertTxt = text;
        this.isSubmitBtnLoading = false;
        this.$refs.submitBtn.$el.blur();
      };

      if (!isEmail(this.emailTxt)) {
        validationFn('Email is not valid.');
        return;
      }
      if (this.passwordTxt.trim() < 6) {
        validationFn('Password should be greater than 5.');
        return;
      }

      const handleResult = () => {
        if (!useFlashCardStore().hasTestItems) {
          this.$router.push({ name: 'Landing' });
          return;
        }

        // Also save previously created work, if it failed then no need to prompt it to user
        const DATA = {
          title: 'Unsaved work',
          description: 'No description',
          sets: useFlashCardStore().testItems,
          isOpenToPublic: false
        };
        FlashcardHelper.createSet(DATA)
          .then(() => {
            this.$router.push({ name: 'Landing' });
            useFlashCardStore().clearTestItems();
          })
          .catch(() => {
            this.$router.push({ name: 'Landing' });
            useToast().error(
              'Unable to store your sets, you may create a new one.',
              {
                timeout: 6000
              }
            );
          });

        this.$router.push({ name: 'Landing' });
      };
      const handleError = (err) => {
        if (!err.code) return;
        this.isSubmitBtnLoading = false;
        this.errorAlertTxt = FirebaseHelper.getErrors[err.code];
      };
      FirebaseHelper.loginUser(this.emailTxt, this.passwordTxt)
        .then(handleResult)
        .catch(handleError);
    }
  },
  computed: {
    shouldDisplayErrorAlert() {
      return this.errorAlertTxt.trim() !== '';
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../assets/scss/1-settings/css-properties/colors/main';
@use '../../assets/scss/1-settings/css-properties/colors/text';
@use '../../assets/scss/1-settings/css-properties/box-shadow/transition' as
  box-shadow-transition;
@use '../../assets/scss/2-tools/mixins/css-properties/margin';
@use '../../assets/scss/2-tools/mixins/css-properties/font-size';
@use '../../assets/scss/2-tools/mixins/css-properties/box-shadow/primary' as
  box-shadow-primary;

// prettier-ignore
.login {
  width: 90%;
  margin-right: auto;
  margin-left: auto;

  &__error-alert {
    @include margin.bottom((
        xsm: 25
    ));
  }

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

  &__no-account {
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
