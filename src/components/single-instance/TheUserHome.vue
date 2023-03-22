<template>
  <div>
    <div>Hello! Welcome to the homepage!</div>
    <router-link :to="{ name: 'Login' }">login</router-link>
  </div>
</template>

<script>
export default {
  emits: ['onMounted'],
  mounted() {
    this.$emit('onMounted');
  }
};
</script>
