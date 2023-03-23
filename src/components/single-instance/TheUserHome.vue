<template>
  <PlainNavbar />

  <!-- Add Validation here later -->
  <NoFlashCards class="no-flash-cards" />
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import NoFlashCards from '@/components/globals/empty-states/NoFlashCards.vue';

export default {
  components: {
    PlainNavbar,
    NoFlashCards
  },
  emits: ['onMounted'],
  mounted() {
    this.$emit('onMounted');
  }
};
</script>

<style lang="scss" scoped>
@use '../../assets/scss/2-tools/mixins/css-properties/margin';

// prettier-ignore
.no-flash-cards{
  justify-content: center;
  @include margin.top((
      xsm: 75
  ));

  @include margin.bottom((
    xsm: 35
  ));
}
</style>
