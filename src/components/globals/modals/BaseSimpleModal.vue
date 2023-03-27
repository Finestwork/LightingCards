<template>
  <div class="modal" ref="root">
    <span class="modal__bg" ref="bg"></span>
    <div class="modal__content-wrapper">
      <div class="modal__content" ref="content">
        <button
          class="modal__close-btn"
          type="button"
          @click="closeModal"
          v-if="hasCloseBtn"
        >
          <XMark />
        </button>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import XMark from '@/components/icons/XMark.vue';

// NPM
import anime from 'animejs';

export default {
  components: {
    XMark
  },
  props: {
    hasCloseBtn: {
      type: Boolean,
      default: false
    },
    isShown: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:isShown', 'onClose'],
  methods: {
    closeModal() {
      this.$emit('update:isShown', false);
      this.$emit('onClose');
    }
  },
  watch: {
    isShown(isShown) {
      // If modal is shown
      if (isShown) {
        Object.assign(this.$refs.root.style, {
          display: 'block'
        });
        Object.assign(this.$refs.content.style, {
          transform: 'translateY(30px)'
        });
        anime({
          targets: this.$refs.bg,
          opacity: 0.8,
          easing: 'easeOutCirc',
          duration: 350
        });
        anime({
          targets: this.$refs.content,
          easing: 'easeOutCirc',
          duration: 350,
          opacity: 1,
          translateY: 0
        });
        return;
      }
      anime({
        targets: this.$refs.bg,
        opacity: 0,
        easing: 'easeOutCirc',
        duration: 350,
        delay: 150,
        complete: () => {
          this.$refs.root.style = null;
        }
      });
      anime({
        targets: this.$refs.content,
        easing: 'easeOutCirc',
        duration: 350,
        opacity: 0,
        translateY: '30px'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  &__bg {
    display: block;
    width: 100%;
    height: 100vh;
    opacity: 0;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    background-color: map.get(main.$primary, 900);
  }
  &__content-wrapper {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
    padding-top: pixels.toRem(20);
    padding-bottom: pixels.toRem(20);
  }
  &__content {
    background-color: white;
    border-radius: 7px;
    margin: auto;
    opacity: 0;
    padding: pixels.toRem(10);
  }
  &__close-btn {
    width: 20px;
    height: 20px;
    display: flex;
    cursor: pointer;
    border: none;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: white;
    margin-left: auto;
    &:hover,
    &:focus {
      background-color: map.get(main.$primary, 100);
      :deep(svg path) {
        fill: map.get(main.$primary, 600);
      }
    }

    :deep(svg) {
      display: block;
      width: 100%;
      height: 100%;
      path {
        fill: map.get(text.$main, 500);
      }
    }
  }
}
</style>
