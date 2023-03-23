<template>
  <BaseSidebar class="user-sidebar" v-model:shown="isShown">
    <BaseScrollbar class="user__scrollbar">
      <BaseOutlined class="user__img" :src="imgSrc" />
      <span class="user__username">{{ username }}</span>

      <div class="user__btn-wrapper">
        <button class="user__action-btn" type="button">Profile Settings</button>
        <button class="user__action-btn" type="button">Logout</button>
      </div>
    </BaseScrollbar>
  </BaseSidebar>
</template>

<script>
import BaseSidebar from '@/components/globals/layouts/BaseSidebar.vue';
import BaseOutlined from '@/components/globals/user-profile-pictures/BaseOutlined.vue';
import BaseScrollbar from '@/components/globals/layouts/BaseScrollbar.vue';

export default {
  components: {
    BaseSidebar,
    BaseOutlined,
    BaseScrollbar
  },
  props: {
    shown: {
      type: Boolean,
      default: false
    },
    imgSrc: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isShown: this.shown
    };
  },
  watch: {
    shown(isShown) {
      this.isShown = isShown;
    },
    isShown(isShown) {
      this.$emit('update:shown', isShown);
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../assets/scss/1-settings/css-properties/colors/text';
@use '../../assets/scss/1-settings/css-properties/colors/main';
@use '../../assets/scss/2-tools/functions/convertions/pixels';

.user-sidebar {
  .user {
    &__scrollbar {
      padding-top: pixels.toRem(25);
      padding-bottom: pixels.toRem(25);
    }
    &__img {
      display: flex;
      width: 100px;
      height: 100px;
      margin-left: auto;
      margin-right: auto;
      &::before {
        border-width: 4px;
        width: 117px;
        height: 117px;
      }
    }
    &__username {
      display: flex;
      justify-content: center;
      font-weight: 800;
      margin-top: pixels.toRem(20);
      margin-bottom: pixels.toRem(40);
      color: map.get(main.$primary, 900);
    }
    &__btn-wrapper {
      display: flex;
      flex-direction: column;
    }
    &__action-btn {
      border: none;
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      border-radius: 7px;
      font-family: inherit;
      cursor: pointer;
      font-weight: 800;
      margin-bottom: pixels.toRem(10);
      padding: pixels.toRem(10);
      background-color: map.get(text.$main, 50);
      color: map.get(text.$main, 500);
      font-size: pixels.toRem(map.get(major-second.$scale, 3));
      &:hover,
      &:focus {
        background-color: map.get(main.$primary, 100);
        color: map.get(main.$primary, 500);
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}
</style>
