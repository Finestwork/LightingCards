<template>
  <BaseSimpleModal
    class="avatar-modal"
    has-close-btn
    v-model:is-shown="isAvatarModalShown"
    @on-close="onModalClose"
  >
    <h3 class="avatar__modal-title">Please choose an avatar</h3>
    <div class="avatar__wrapper" ref="avatarWrapper">
      <button
        class="avatar__btn"
        v-for="(src, ind) in avatars"
        :key="src"
        @click="selectAvatar"
      >
        <span class="avatar__img-wrapper">
          <img :src="src" :alt="`Avatar profile ${ind}`" />
        </span>
      </button>
    </div>
  </BaseSimpleModal>
</template>

<script>
import BaseSimpleModal from '@/components/globals/modals/BaseSimpleModal.vue';
import AvatarHelper from '@/assets/js/helpers/avatar-helper';
import { useUserDetails } from '@/stores/user-details';

export default {
  components: {
    BaseSimpleModal
  },
  props: {
    isShown: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isAvatarModalShown: this.isShown,
      activeAvatar: null
    };
  },
  emits: ['update:isShown', 'onModalClose'],
  mounted() {
    const IMGS = this.$refs.avatarWrapper.querySelectorAll('img');

    IMGS.forEach((img) => {
      const SRC = img.src;
      if (SRC === useUserDetails().getPhotoURL) {
        const BTN = img.parentElement.parentElement;
        BTN.classList.add('avatar--active');
        this.activeAvatar = BTN;
      }
    });
  },
  methods: {
    selectAvatar(e) {
      if (this.activeAvatar !== null) {
        this.activeAvatar.classList.remove('avatar--active');
      }

      const BTN = e.currentTarget;
      const IMG_SRC = BTN.querySelector('img').src;
      useUserDetails().setPhotoURL(IMG_SRC);
      BTN.classList.add('avatar--active');
      this.activeAvatar = BTN;
    },
    onModalClose() {
      this.$emit('onModalClose');
    }
  },
  computed: {
    avatars() {
      const AVATARS = AvatarHelper.getDefaultAvatars;
      return Object.keys(AVATARS).map((prop) => AVATARS[prop]);
    }
  },
  watch: {
    isShown(isShown) {
      this.isAvatarModalShown = isShown;
    },
    isAvatarModalShown(isAvatarModalShown) {
      this.$emit('update:isShown', isAvatarModalShown);
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../assets/scss/1-settings/css-properties/colors/main';
@use '../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../assets/scss/2-tools/functions/convertions/pixels';

.avatar-modal {
  .modal__content {
    width: 90%;
    max-width: 450px;
  }
  .avatar {
    &__modal-title {
      font-weight: 800;
      position: relative;
      display: inline-flex;
      margin-top: pixels.toRem(10);
      margin-bottom: pixels.toRem(10);
      color: map.get(main.$primary, 900);
      font-size: map.get(major-second.$scale, 4);
      &::before {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 60%;
        height: 3px;
        border-bottom: 2px dashed map.get(main.$primary, 600);
      }
    }
    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: pixels.toRem(25);
      margin-bottom: pixels.toRem(15);
    }
    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      background-color: map.get(main.$secondary, 100);
      border-radius: 50%;
      height: 75px;
      width: 75px;
      margin-right: pixels.toRem(8);
      &:hover,
      &:focus {
        background: map.get(main.$secondary, 300);
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
    &__img-wrapper {
      width: 80%;
      height: 80%;
      > img {
        width: 100%;
      }
    }

    &--active {
      background-color: map.get(main.$secondary, 500);
      &:hover,
      &:focus {
        background-color: map.get(main.$secondary, 500);
      }
    }
  }
}
</style>
