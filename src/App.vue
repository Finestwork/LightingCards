<template>
  <main>
    <router-view/>
  </main>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    TheLanding: defineAsyncComponent(() => import('@/pages/TheLanding.vue'))
  }
};
</script>

<style lang="scss">
@use 'src/assets/scss/3-elements/wildcard.scss';
@use 'src/assets/scss/3-elements/html.scss';
@use 'src/assets/scss/3-elements/body.scss';
</style>
