<template>
  <PlainNavbar />
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
export default {
  components: {
    PlainNavbar
  },
  emits: ['onMounted'],
  mounted() {
    this.$emit('onMounted');
  }
};
</script>

<style lang="scss" scoped></style>
