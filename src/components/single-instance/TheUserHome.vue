<template>
  <PlainNavbar />

  <!-- Add Validation here later -->
  <!--  <NoFlashCards class="no-flash-cards" />-->
  <div class="container container--sm">
    <TheSetSkeleton />
  </div>
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import NoFlashCards from '@/components/globals/empty-states/NoFlashCards.vue';
import TheSetSkeleton from '@/components/single-instance/TheSetSkeleton.vue';

export default {
  components: {
    PlainNavbar,
    TheSetSkeleton
  },
  emits: ['onMounted'],
  mounted() {
    this.$emit('onMounted');
  }
};
</script>

<style lang="scss" scoped>
@use '../../assets/scss/2-tools/mixins/css-properties/margin';
@use '../../assets/scss/4-layouts/containers';

// prettier-ignore
.container {
  width: 90%;
  @include margin.top((
      xsm: 35,
      md: 45,
  ));
  @include margin.bottom((
      xsm: 35
  ));
}

// prettier-ignore
.no-flash-cards{
  justify-content: center;
}
</style>
