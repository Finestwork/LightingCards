<template>
  <nav class="nav">
    <div class="container--sm nav__container">
      <BaseGradientLogo class="logo" />
      <VDropdown popper-class="nav-dropdown">
        <button class="nav__dropdown-btn">
          <span class="dropdown__img">
            <img :src="testSrc" alt="User's profile" />
          </span>
          <span class="dropdown__username">Kapitan</span>
          <span class="dropdown__icon"><AngleDown /></span>
        </button>

        <template #popper>
          <button type="button" class="dropdown__btn">Logout</button>
        </template>
      </VDropdown>
      <button type="button" class="nav__hamburger-btn" @click="toggleSidebar">
        <span class="hamburger-btn__line-1"></span>
        <span class="hamburger-btn__line-2"></span>
        <span class="hamburger-btn__line-3"></span>
      </button>
    </div>
  </nav>

  <Teleport to="body">
    <BaseSidebar v-model:shown="isSidebarShown">
      <button type="button">Profile Settings</button>
      <button type="button">Logout</button>
    </BaseSidebar>
  </Teleport>
</template>

<script>
import BaseGradientLogo from '@/components/globals/logos/BaseGradientLogo.vue';
import AngleDown from '@/components/icons/AngleDown.vue';
import BaseSidebar from '@/components/globals/layouts/BaseSidebar.vue';

// Helpers
import AvatarHelper from '@/assets/js/helpers/avatar-helper';

export default {
  components: {
    BaseGradientLogo,
    AngleDown,
    BaseSidebar
  },
  data: () => ({
    testSrc: AvatarHelper.getDefaultAvatars['default-1'],
    isSidebarShown: false
  }),
  methods: {
    toggleSidebar() {
      this.isSidebarShown = !this.isSidebarShown;
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
      400: flex
    ));
    &:focus,
    &:hover {
      background-color: map.get(main.$primary, 100);
    }

    .dropdown {
      &__img {
        display: flex;
        width: 35px;
        height: 35px;
        position: relative;
        background-color: #0e2430;
        border-radius: 50%;
        margin-right: pixels.toRem(15);
        &::before {
          content: '';
          width: 127%;
          height: 127%;
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid map.get(main.$primary, 500);
        }
        > img {
          width: 100%;
        }
      }
      &__username {
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
    }
  }
  &__hamburger-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 40px;
    height: 36px;
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
  .dropdown__btn {
    background-color: white;
    cursor: pointer;
    font-weight: 800;
    outline: none;
    border: none;
    font-family: inherit;
    padding: pixels.toRem(7) pixels.toRem(15);
    color: map.get(text.$main, 600);
    font-size: pixels.toRem(map.get(major-second.$scale, 3));

    &:focus,
    &:hover {
      background-color: map.get(main.$primary, 100);
      color: map.get(main.$primary, 600);
    }
  }
}
</style>
