<template>
  <span class="page-blocker"></span>
</template>

<style lang="scss" scoped>
.page-blocker {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: white;
  opacity: 0.8;
  cursor: progress;
  z-index: 9999;
}
</style>
