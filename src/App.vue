<template>
  <main>
    <router-view />
  </main>
</template>

<script>
import 'nprogress/nprogress.css';
</script>
<style lang="scss">
@use 'src/assets/scss/3-elements/wildcard.scss';
@use 'src/assets/scss/3-elements/html.scss';
@use 'src/assets/scss/3-elements/body.scss';
@use 'src/assets/scss/5-components/third-party-libraries/n-progress.scss';
</style>
