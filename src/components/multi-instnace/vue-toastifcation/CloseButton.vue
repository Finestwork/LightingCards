<template>
  <button type="button" class="close-btn">
    <XMark />
  </button>
</template>

<script>
import XMark from '@/components/icons/XMark.vue';
export default {
  components: {
    XMark
  }
};
</script>

<style lang="scss" scoped>
.close-btn {
  width: 23px;
  height: 23px;
  :deep(svg) {
    display: block;
    width: 100%;
    height: 100%;
    path {
      fill: white;
    }
  }
}
</style>
