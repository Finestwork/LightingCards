<template>
  <p :class="alert['alert']">
    Your work will not be saved,
    <router-link :class="alert['link']" :to="{ name: 'Signup' }"
      >create an account</router-link
    >
    or
    <router-link :class="alert['link']" :to="{ name: 'Login' }"
      >login here</router-link
    >.
  </p>
</template>

<script>
export default {};
</script>

<style lang="scss" module="alert">
@use 'sass:map';
@use '../../assets/scss/1-settings/css-properties/colors/safety';
@use '../../assets/scss/2-tools/mixins/css-properties/padding';

.alert {
  font-weight: 600;
  text-align: center;
  border-radius: 7px;
  color: white;
  background-color: map.get(safety.$danger, 500);
  @include padding.vertical(
    (
      xsm: 10
    )
  );

  .link {
    color: white;
  }
}
</style>
