<template>
  <nav class="nav">
    <div class="container--sm nav__container">
      <BaseGradientLogo class="logo" />
      <VDropdown popper-class="nav-dropdown" v-if="shouldDisplayNavDropdown">
        <button class="nav__dropdown-btn">
          <BaseOutlined class="dropdown__img" :src="getPhotoURL" />
          <span class="dropdown__username">{{ getUsername }}</span>
          <span class="dropdown__icon"><AngleDown /></span>
        </button>

        <template #popper>
          <div class="dropdown__btn-wrapper">
            <router-link
              :to="{ name: 'ProfileSettings' }"
              type="button"
              class="dropdown__link"
              v-close-popper
            >
              Profile Settings
            </router-link>
            <button
              type="button"
              class="dropdown__btn"
              @click="logoutUser"
              v-close-popper
            >
              Logout
            </button>
          </div>
        </template>
      </VDropdown>

      <ContentLoader
        class="nav__dropdown-loader"
        viewBox="0 0 150 40"
        :speed="2"
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
        v-if="!shouldDisplayNavDropdown"
      >
        <rect x="0" y="0" rx="8" ry="8" width="150" height="40" />
      </ContentLoader>

      <button type="button" class="nav__hamburger-btn" @click="toggleSidebar">
        <span class="hamburger-btn__line-1"></span>
        <span class="hamburger-btn__line-2"></span>
        <span class="hamburger-btn__line-3"></span>
      </button>
    </div>
  </nav>

  <Teleport to="body">
    <TheUserSidebar
      :img-src="getPhotoURL"
      :username="getUsername"
      v-model:shown="isSidebarShown"
    />
    <PageBlocker v-if="shouldShowPageBlocker" />
  </Teleport>
</template>

<script>
import BaseGradientLogo from '@/components/globals/logos/BaseGradientLogo.vue';
import AngleDown from '@/components/icons/AngleDown.vue';
import TheUserSidebar from '@/components/single-instance/TheUserSidebar.vue';
import BaseOutlined from '@/components/globals/user-profile-pictures/BaseOutlined.vue';
import PageBlocker from '@/components/globals/page-loaders/PageBlocker.vue';

import { ContentLoader } from 'vue-content-loader';

// Helpers
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';
import { useUserDetails } from '@/stores/user-details';

export default {
  components: {
    BaseGradientLogo,
    AngleDown,
    TheUserSidebar,
    BaseOutlined,
    PageBlocker,
    ContentLoader
  },
  data: () => ({
    isSidebarShown: false,
    shouldShowPageBlocker: false
  }),
  emits: ['successfullyLoggedOut'],
  mounted() {
    window.addEventListener('resize', this.hideSidebarOnLargerViewport);

    // If no user details found in store, get it
    if (useUserDetails().isUserDetailEmpty) {
      const USER = FirebaseHelper.getUserDetails();

      if (USER === null) {
        FirebaseHelper.getCurrentUser().then((user) => {
          useUserDetails().setUsername(user.displayName);
          useUserDetails().setPhotoURL(user.photoURL);
        });
        return;
      }

      useUserDetails().setUsername(USER.displayName);
      useUserDetails().setPhotoURL(USER.photoURL);
    }
  },
  unmounted() {
    window.removeEventListener('resize', this.hideSidebarOnLargerViewport);
  },
  methods: {
    hideSidebarOnLargerViewport() {
      if (window.innerWidth >= 400) {
        this.isSidebarShown = false;
      }
    },
    toggleSidebar() {
      this.isSidebarShown = !this.isSidebarShown;
    },
    logoutUser() {
      this.shouldShowPageBlocker = true;
      FirebaseHelper.signout()
        .then(() => this.$router.push({ name: 'Landing' }))
        .catch(() => {
          this.shouldShowPageBlocker = false;
        });
    }
  },
  computed: {
    shouldDisplayNavDropdown() {
      return this.getUsername.trim() !== '' && this.getPhotoURL.trim() !== '';
    },
    getUsername() {
      return useUserDetails().getUsername;
    },
    getPhotoURL() {
      return useUserDetails().getPhotoURL;
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';
@use '../../../assets/scss/2-tools/mixins/css-properties/display';
@use '../../../assets/scss/4-layouts/containers';

// prettier-ignore
.nav {
  display: flex;
  align-items: center;
  padding-top: pixels.toRem(25);
  padding-bottom: pixels.toRem(18);
  border-bottom: 2px solid map.get(text.$main, 100);

  &__container {
    width: 90%;
    display: flex;
    justify-content: space-between;
  }

  &__dropdown-btn {
    align-items: center;
    border: none;
    font-family: inherit;
    background-color: white;
    cursor: pointer;
    border-radius: 7px;
    outline: none;
    padding: pixels.toRem(10);
    @include display.set((
        xsm: none,
        400: none
    ));

    &:focus,
    &:hover {
      background-color: map.get(main.$primary, 100);
    }

    .dropdown {
      &__img {
        margin-right: pixels.toRem(15);
      }
      &__username {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-weight: 800;
        margin-right: pixels.toRem(7);
        color: map.get(text.$main, 700);
        font-size: pixels.toRem(map.get(major-second.$scale, 3));
      }
      &__icon {
        width: 13px;
        display: flex;

        :deep(svg) {
          display: block;
          width: 100%;
          height: 100%;

          path {
            fill: map.get(text.$main, 700);
          }
        }
      }

      &__img,
      &__icon{
        flex-shrink: 0;
      }
    }
  }

  &__dropdown-btn,
  &__dropdown-loader{
    max-width: 200px;
    @include display.set((
        xsm: none,
        400: flex
    ));
  }

  &__hamburger-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40px;
    height: 33px;
    border-radius: 7px;
    border: none;
    cursor: pointer;
    outline: none;
    background-color: white;
    padding: pixels.toRem(7);
    @include display.set((
        xsm: flex,
        400: none
    ));

    &:focus,
    &:hover {
      background-color: map.get(main.$primary, 100);

      .hamburger-btn__line-1,
      .hamburger-btn__line-2,
      .hamburger-btn__line-3 {
        background-color: map.get(main.$primary, 600);
      }
    }

    .hamburger-btn__line-1,
    .hamburger-btn__line-2,
    .hamburger-btn__line-3 {
      display: flex;
      width: 100%;
      height: 4px;
      border-radius: 99rem;
      background-color: map.get(text.$main, 500);
    }
  }
}

.nav-dropdown {
  .dropdown {
    &__btn-wrapper {
      display: flex;
      flex-direction: column;
    }

    &__link {
      text-decoration: none;
    }

    &__link,
    &__btn {
      background-color: white;
      cursor: pointer;
      font-weight: 800;
      outline: none;
      border: none;
      font-family: inherit;
      padding: pixels.toRem(7) pixels.toRem(15);
      color: map.get(text.$main, 400);
      font-size: pixels.toRem(map.get(major-second.$scale, 3));

      &:focus,
      &:hover {
        background-color: map.get(main.$primary, 100);
        color: map.get(main.$primary, 600);
      }
    }
  }
}
</style>
