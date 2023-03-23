<template>
  <OverlayScrollbarsComponent class="scrollbar">
    <slot></slot>
  </OverlayScrollbarsComponent>
</template>

<script>
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import 'overlayscrollbars/overlayscrollbars.css';

export default {
  components: {
    OverlayScrollbarsComponent
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/text';

.scrollbar {
  width: 100%;
  height: 100%;
  :deep(.os-scrollbar-track) {
    background-color: map.get(text.$main, 100);
  }
  :deep(.os-scrollbar-handle) {
    background-color: map.get(text.$main, 300);
  }
}
</style>
