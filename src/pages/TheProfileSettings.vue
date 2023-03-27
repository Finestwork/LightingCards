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

    <div class="btn-group">
      <BasePlayfulButton
        type="button"
        :is-loading="isChangeAvatarLoading"
        @click="showAvatarModal"
      >
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

    <Teleport to="body">
      <TheAvatarModal
        v-model:is-shown="isAvatarModalShown"
        @on-modal-close="onModalCloseUpdateAvatar"
      />
    </Teleport>
  </div>
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';
import BasePlainBreadcrumbs from '@/components/globals/breadcrumbs/BasePlainBreadcrumbs.vue';
import TheAvatarModal from '@/components/single-instance/TheAvatarModal.vue';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';
import { useUserDetails } from '@/stores/user-details';
import NProgress from 'nprogress';
import { useToast } from 'vue-toastification';

export default {
  components: {
    PlainNavbar,
    BasePlayfulButton,
    BasePlainBreadcrumbs,
    TheAvatarModal
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
      isAvatarModalShown: false,
      isChangeAvatarLoading: false
    };
  },
  mounted() {
    document.body.style.overflowY = 'hidden';
  },
  methods: {
    showAvatarModal() {
      this.isAvatarModalShown = !this.isAvatarModalShown;
    },
    async onModalCloseUpdateAvatar() {
      this.isChangeAvatarLoading = true;
      NProgress.configure({ showSpinner: false });
      NProgress.start();
      const displayName = useUserDetails().getUsername;
      const photoURL = useUserDetails().getPhotoURL;

      try {
        await FirebaseHelper.updateUserDetails({ displayName, photoURL });
        NProgress.done();
        useToast().success('Successfully updated your avatar!');
        this.isChangeAvatarLoading = false;
      } catch (e) {
        this.isChangeAvatarLoading = false;
        useToast().error('Uh-oh! Unable to change avatar');
      }
    }
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
  .plain-breadcrumbs{
    @include margin.bottom((
      xsm: 25
    ));
  }
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
