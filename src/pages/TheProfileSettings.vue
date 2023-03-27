<template>
  <PlainNavbar />
  <div class="container container--sm">
    <BasePlainBreadcrumbs :links="breadcrumbs" />
    <h1 class="title">Hello, Learner!</h1>
    <p class="message">
      Welcome to your profile settings! Here, you can edit your email and
      password to keep your account up-to-date. Please note that this page is
      currently under construction and we appreciate your patience as we
      continue to improve and enhance our platform
    </p>

    <form class="form">
      <div class="form__btn-controls">
        <BasePlayfulButton
          class="form__reset-btn"
          type="button"
          @click="resetForm"
          v-if="shouldDisplayResetBtn"
        >
          <template #text>Reset</template>
        </BasePlayfulButton>
        <BasePlayfulButton
          class="form__submit-btn"
          type="button"
          :is-loading="isSubmitBtnLoading"
          @click="submitForm"
        >
          <template #text>Update Profile</template>
        </BasePlayfulButton>
      </div>
      <div class="form__wrapper" ref="avatarWrapper">
        <span class="form__label">Choose avatar:</span>
        <div class="form__avatar-wrapper">
          <button
            type="button"
            v-for="(src, ind) in getAvatars"
            :key="src"
            @click="selectAvatar"
          >
            <img :src="src" :alt="`Default avatar ${ind}`" />
          </button>
        </div>
      </div>
      <div class="form__wrapper">
        <BaseTextInput
          label="Username:"
          type="text"
          placeholder="Place your username here"
          id="usernameTxt"
          name="usernameTxt"
          :clear-errors="clearFormErrors"
          :validation-rules="{ min: 4 }"
          v-model="usernameTxt"
        />
      </div>
      <div class="form__wrapper">
        <BaseTextInput
          label="Email:"
          type="email"
          placeholder="Place your email here"
          id="emailTxt"
          name="emailTxt"
          :clear-errors="clearFormErrors"
          :validation-rules="{
            isEmail: true
          }"
          v-model="emailTxt"
        />
      </div>
      <div class="form__wrapper">
        <BaseTextInput
          label="Password:"
          type="password"
          placeholder="Place your password here"
          id="passwordTxt"
          name="passwordTxt"
          :clear-errors="clearFormErrors"
          :validation-rules="{ min: 6 }"
          v-model="passwordTxt"
        />
      </div>
    </form>

    <teleport to="body">
      <TheReAuthenticateModal
        v-model:is-shown="shouldShowAuthModal"
        @authenticatedSuccessfully="authenticatedSuccessfully"
      />
    </teleport>
  </div>
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import BasePlainBreadcrumbs from '@/components/globals/breadcrumbs/BasePlainBreadcrumbs.vue';
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';
import TheReAuthenticateModal from '@/components/single-instance/TheReAuthenticateModal.vue';

// Helpers
import AvatarHelper from '@/assets/js/helpers/avatar-helper';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';

// Store
import { useUserDetails } from '@/stores/user-details';

// NPM
import { useToast } from 'vue-toastification';
import isEmail from 'validator/es/lib/isEmail';
import DocumentTitleHelper from '@/assets/js/helpers/document-title-helper';

export default {
  components: {
    PlainNavbar,
    BasePlainBreadcrumbs,
    BasePlayfulButton,
    BaseTextInput,
    TheReAuthenticateModal
  },
  data() {
    return {
      breadcrumbs: [
        {
          to: { name: 'Landing' },
          text: 'Home'
        },
        {
          to: { name: 'ProfileSettings' },
          text: 'Profile Settings'
        }
      ],
      isSubmitBtnLoading: false,
      clearFormErrors: false,
      shouldShowAuthModal: false,
      currentActiveAvatarBtn: null,
      originalActiveAvatarBtn: null,
      originalUsernameTxt: '',
      originalEmailTxt: '',
      usernameTxt: '',
      emailTxt: '',
      passwordTxt: ''
    };
  },
  mounted() {
    DocumentTitleHelper.profileSettings();
    this.currentActiveAvatarBtn = this.userUploadedAvatarBtn;
    this.currentActiveAvatarBtn.classList.add('avatar--active');
    this.usernameTxt = useUserDetails().getUsername;
    this.emailTxt = FirebaseHelper.getUserDetails().email;

    // Save original values to make it resettable
    this.originalActiveAvatarBtn = this.userUploadedAvatarBtn;
    this.originalUsernameTxt = useUserDetails().getUsername;
    this.originalEmailTxt = FirebaseHelper.getUserDetails().email;
  },
  methods: {
    selectAvatar(e) {
      if (this.currentActiveAvatarBtn !== null) {
        this.currentActiveAvatarBtn.classList.remove('avatar--active');
      }

      const BTN = e.currentTarget;
      BTN.classList.add('avatar--active');
      this.currentActiveAvatarBtn = BTN;
    },
    resetForm() {
      this.currentActiveAvatarBtn.classList.remove('avatar--active');
      this.originalActiveAvatarBtn.classList.add('avatar--active');
      this.currentActiveAvatarBtn = this.originalActiveAvatarBtn;
      this.usernameTxt = this.originalUsernameTxt;
      this.emailTxt = this.originalEmailTxt;
      this.passwordTxt = '';
      this.clearFormErrors = true;
      setTimeout(() => (this.clearFormErrors = false), 250);
    },
    async submitForm() {
      this.isSubmitBtnLoading = true;

      if (this.passwordTxt.trim() !== '' && this.passwordTxt.length < 5) {
        this.isSubmitBtnLoading = false;
        useToast().error('Password should be at least 6 characters.');
        return;
      }
      if (this.emailTxt !== this.originalEmailTxt && !isEmail(this.emailTxt)) {
        this.isSubmitBtnLoading = false;
        useToast().error('Email is invalid.');
        return;
      }

      try {
        const PHOTO_SRC = this.currentActiveAvatarBtn.querySelector('img').src;
        const DATA = {
          displayName: this.usernameTxt,
          photoURL: PHOTO_SRC
        };
        await FirebaseHelper.updateUserDetails(DATA);
        if (this.emailTxt !== this.originalEmailTxt) {
          await FirebaseHelper.updateEmail(this.emailTxt);
        }

        if (this.passwordTxt.trim() !== '') {
          await FirebaseHelper.updatePassword(this.passwordTxt);
        }

        // Assign new values
        this.originalActiveAvatarBtn = this.currentActiveAvatarBtn;
        this.originalUsernameTxt = this.usernameTxt;
        this.originalEmailTxt = this.emailTxt;

        // Update the store
        useUserDetails().setUsername(this.usernameTxt);
        useUserDetails().setPhotoURL(PHOTO_SRC);

        this.isSubmitBtnLoading = false;
        useToast().success('Successfully updated your account.');
      } catch (err) {
        if (!err.code) {
          const ERROR_MSG =
            'Unable to update your profile, please try again later.';
          useToast().error(ERROR_MSG);
          this.isSubmitBtnLoading = false;
          this.resetForm();
          return;
        }

        this.isSubmitBtnLoading = false;
        if (err.code === 'auth/requires-recent-login') {
          this.shouldShowAuthModal = true;
          return;
        }

        const TOAST_MSG = FirebaseHelper.getErrors[err.code];
        useToast().error(TOAST_MSG);
      }
    },
    async authenticatedSuccessfully() {
      this.isSubmitBtnLoading = false;
      this.shouldShowAuthModal = false;
      try {
        if (
          this.emailTxt !== this.originalEmailTxt &&
          this.passwordTxt.trim() !== ''
        ) {
          this.originalEmailTxt = this.emailTxt;
          await FirebaseHelper.updateAccount(this.emailTxt, this.passwordTxt);
          useToast().success('Successfully updated your account.');
          return;
        }

        if (this.emailTxt !== this.originalEmailTxt) {
          this.originalEmailTxt = this.emailTxt;
          await FirebaseHelper.updateEmail(this.emailTxt);
          useToast().success('Successfully updated your email.');
        }

        if (this.passwordTxt.trim() !== '') {
          await FirebaseHelper.updatePassword(this.passwordTxt);
          useToast().success('Successfully updated your password.');
        }
      } catch (err) {
        if (!err.code) {
          useToast().error(
            'Unable to update your account, please try again later.'
          );
          return;
        }

        const ERROR_TEXT = FirebaseHelper.getErrors[err.code];
        useToast().error(ERROR_TEXT);
      }
    }
  },
  computed: {
    userUploadedAvatarBtn() {
      const SRC = useUserDetails().getPhotoURL;
      const IMG = this.$refs.avatarWrapper.querySelector(`img[src="${SRC}"]`);
      return IMG.parentElement;
    },
    getAvatars() {
      return AvatarHelper.getDefaultAvatars;
    },
    shouldDisplayResetBtn() {
      return (
        this.originalActiveAvatarBtn !== this.currentActiveAvatarBtn ||
        this.originalUsernameTxt !== this.usernameTxt ||
        this.originalEmailTxt !== this.emailTxt ||
        this.passwordTxt.trim() !== ''
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../assets/scss/1-settings/css-properties/colors/text';
@use '../assets/scss/1-settings/css-properties/colors/main';
@use '../assets/scss/1-settings/css-properties/colors/safety';
@use '../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../assets/scss/2-tools/mixins/css-properties/margin';
@use '../assets/scss/2-tools/mixins/css-properties/padding';
@use '../assets/scss/2-tools/mixins/css-properties/font-size';
@use '../assets/scss/4-layouts/containers';

// prettier-ignore
.container {
  width: 90%;
  @include margin.top((
      xsm: 50
  ));

  .plain-breadcrumbs {
    @include margin.bottom((
        xsm: 25
    ));
  }

  .title {
    font-weight: 900;
    color: map.get(text.$main, 900);
    @include font-size.responsive((
        xsm: map.get(major-second.$scale, 7)
    ));
  }

  .message {
    font-weight: 600;
    color: map.get(text.$main, 500);
  }

  .form {
    @include margin.top((
        xsm: 80
    ));
    @include padding.bottom((
        xsm: 35
    ));

    &__btn-controls {
      display: flex;
      justify-content: flex-end;
      margin-left: auto;
      @include margin.bottom((
          xsm: 35
      ));
    }

    &__reset-btn {
      background-color: map.get(safety.$danger, 500);
      @include margin.right((
          xsm: 15
      ));
    }

    &__label {
      font-weight: 700;
      display: flex;
      @include margin.bottom((
          xsm: 10
      ));
      @include font-size.responsive((
          xsm: map.get(major-second.$scale, 3)
      ));
    }

    &__avatar-wrapper {
      display: flex;

      button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
        border: none;
        background-color: map.get(main.$secondary, 200);
        @include margin.right((
            xsm: 15
        ));
        @include padding.all-sides((
            xsm: 6
        ));

        &:hover,
        &:focus {
          background-color: map.get(main.$secondary, 500);
        }

        &:last-of-type {
          margin-right: 0;
        }

        > img {
          width: 100%;
          pointer-events: none;
        }
      }

      /* States */
      .avatar--active {
        background-color: map.get(main.$secondary, 500);
      }
    }

    &__wrapper {
      @include margin.bottom((
          xsm: 25
      ));

      .text-input {
        max-width: 350px;
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}
</style>
