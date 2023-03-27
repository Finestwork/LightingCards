<template>
  <BaseSimpleModal
    class="re-auth-modal"
    :is-shown="isModalShown"
    has-close-btn
    @on-close="onClose"
  >
    <BaseSingleLineAlert v-if="shouldDisplayAlertText">
      <template #text>{{ alertText }}</template>
    </BaseSingleLineAlert>
    <form @submit.prevent="authenticateUser">
      <BaseTextInput
        label="Email:"
        type="email"
        name="authEmailTxt"
        id="authEmailTxt"
        placeholder="Place your email here"
        :validation-rules="{
          required: true,
          isEmail: true
        }"
        v-model="emailTxt"
      />
      <BaseTextInput
        label="Password:"
        type="password"
        name="authPasswordTxt"
        id="authPasswordTxt"
        placeholder="Place your password here"
        :validation-rules="{ required: true, min: 6 }"
        v-model="passwordTxt"
      />
      <BasePlayfulButton
        ref="submitBtn"
        type="submit"
        :is-loading="isSubmitBtnLoading"
        @click="authenticateUser"
      >
        <template #text>Submit</template>
      </BasePlayfulButton>
    </form>
  </BaseSimpleModal>
</template>

<script>
import BaseSimpleModal from '@/components/globals/modals/BaseSimpleModal.vue';
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';
import BaseSingleLineAlert from '@/components/globals/alerts/BaseSingleLine.vue';

// NPM
import isEmail from 'validator/es/lib/isEmail';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';

export default {
  components: {
    BaseSimpleModal,
    BaseTextInput,
    BasePlayfulButton,
    BaseSingleLineAlert
  },
  props: {
    isShown: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isModalShown: this.isShown,
      isSubmitBtnLoading: false,
      alertText: '',
      emailTxt: '',
      passwordTxt: ''
    };
  },
  emits: ['update:isShown', 'authenticatedSuccessfully'],
  methods: {
    onClose() {
      this.$emit('update:isShown', false);
    },
    async authenticateUser() {
      this.$refs.submitBtn.$el.blur();
      this.isSubmitBtnLoading = true;
      this.alertText = '';
      const createAlertError = (text) => {
        this.alertText = text;
        this.isSubmitBtnLoading = false;
      };

      // If user decides to sign in with other email
      if (
        !isEmail(this.emailTxt) &&
        FirebaseHelper.isEmailTheSame(this.emailTxt)
      ) {
        createAlertError('• Email is not valid.');
        return;
      }

      if (this.passwordTxt.length < 6) {
        createAlertError('• Password should be at least 6 characters.');
        return;
      }

      try {
        await FirebaseHelper.reAuthenticateUser(
          this.emailTxt,
          this.passwordTxt
        );
        this.$emit('authenticatedSuccessfully');
      } catch (err) {
        this.isSubmitBtnLoading = false;
        if (!err.code) {
          this.alertText = 'Something went wrong, please try again later.';
          return;
        }
        this.alertText = FirebaseHelper.getErrors[err.code];
      }
    }
  },
  computed: {
    shouldDisplayAlertText() {
      return this.alertText.trim() !== '';
    }
  },
  watch: {
    isModalShown(isModalShown) {
      this.$emit('update:isShown', isModalShown);
    },
    isShown(isShown) {
      this.isModalShown = isShown;
    }
  }
};
</script>

<style lang="scss" scoped>
@use '../../assets/scss/2-tools/mixins/css-properties/margin';

// prettier-ignore
.re-auth-modal{
  :deep(.modal__content){
    width: 95%;
    max-width: 400px;
  }
  .alert{
    @include margin.vertical((
      xsm: 15
    ));
  }
  .text-input{
    @include margin.bottom((
        xsm: 25
    ));
  }
  .playful-btn{
    width: 100%;
    @include margin.bottom((
      xsm: 10
    ));
    @include margin.top((
      xsm: 30
    ));
  }
}
</style>
