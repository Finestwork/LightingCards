<template>
  <aside class="sidebar" ref="root">
    <span class="sidebar__bg" ref="bg" @click="closeSidebar"></span>
    <span class="sidebar__content" ref="content">
      <slot></slot>
    </span>
  </aside>
</template>

<script>
import anime from 'animejs';

export default {
  props: {
    shown: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bgAnimId: null,
      contentAnimId: null
    };
  },
  emits: ['update:shown'],
  methods: {
    closeSidebar() {
      this.$emit('update:shown', false);
    },

    showSidebar() {
      this.$refs.root.style.display = 'block';

      // if there's an ongoing animation
      if (this.bgAnimId !== null) this.bgAnimId.pause();
      if (this.contentAnimId !== null) this.contentAnimId.pause();

      this.bgAnimId = anime({
        targets: this.$refs.bg,
        opacity: 0.9,
        easing: 'linear',
        duration: 350,
        complete() {
          this.bgAnimId = null;
        }
      });
      this.contentAnimId = anime({
        targets: this.$refs.content,
        left: 0,
        easing: 'easeOutCubic',
        duration: 350,
        complete: () => {
          this.contentAnimId = null;
          this.$emit('update:shown', true);
        }
      });
    },
    hideSidebar() {
      this.bgAnimId = anime({
        targets: this.$refs.bg,
        opacity: 0,
        duration: 350,
        easing: 'linear',
        complete() {
          this.bgAnimId = null;
        }
      });
      this.contentAnimId = anime({
        targets: this.$refs.content,
        left: '-100%',
        easing: 'easeOutCubic',
        duration: 350,
        complete: () => {
          if (this.$refs.root) this.$refs.root.style.display = null;
          this.contentAnimId = null;
          this.$emit('update:shown', false);
        }
      });
    }
  },
  watch: {
    shown: {
      handler(isShown) {
        this.$nextTick(() => {
          if (isShown) this.showSidebar();
          else this.hideSidebar();
        });
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/colors/main';

.sidebar {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: darken(map.get(main.$primary, 900), 10%);
    opacity: 0;
  }
  &__content {
    height: 100vh;
    width: 70%;
    max-width: 350px;
    background-color: white;
    position: absolute;
    top: 0;
    left: -100%;
  }
}
</style>
