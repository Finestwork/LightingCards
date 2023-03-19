<template>
  <span :class="$style.bg"></span>
</template>

<style lang="scss" module>
.bg {
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
  background: url('/assets/images/bg/grid.svg') no-repeat;
  background-size: cover;
  z-index: -1;
  opacity: 0.04;
}
</style>
