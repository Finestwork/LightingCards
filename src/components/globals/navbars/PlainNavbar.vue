<template>
  <nav class="nav">
    <div class="container--sm nav__container">
      <BaseGradientLogo class="logo" />
      <VDropdown popper-class="nav-dropdown">
        <button class="nav__dropdown-btn">
          <BaseOutlined class="dropdown__img" :src="testSrc" />
          <span class="dropdown__username">Kapitan</span>
          <span class="dropdown__icon"><AngleDown /></span>
        </button>

        <template #popper>
          <div class="dropdown__btn-wrapper">
            <button type="button" class="dropdown__btn">
              Profile Settings
            </button>
            <button type="button" class="dropdown__btn">Logout</button>
          </div>
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
    <TheUserSidebar
      :img-src="testSrc"
      username="Kapitan"
      v-model:shown="isSidebarShown"
    />
  </Teleport>
</template>

<script>
import BaseGradientLogo from '@/components/globals/logos/BaseGradientLogo.vue';
import AngleDown from '@/components/icons/AngleDown.vue';
import TheUserSidebar from '@/components/single-instance/TheUserSidebar.vue';
import BaseOutlined from '@/components/globals/user-profile-pictures/BaseOutlined.vue';

// Helpers
import AvatarHelper from '@/assets/js/helpers/avatar-helper';

export default {
  components: {
    BaseGradientLogo,
    AngleDown,
    TheUserSidebar,
    BaseOutlined
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
        margin-right: pixels.toRem(15);
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
  .dropdown {
    &__btn-wrapper {
      display: flex;
      flex-direction: column;
    }
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
