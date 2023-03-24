<template>
  <div class="create-card">
    <PlainNavbar />

    <div class="create-card__container container--sm">
      <TheFlashCardCreation v-model:items="sets" />
    </div>
  </div>
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import TheFlashCardCreation from '@/components/single-instance/TheFlashCardCreation.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';

export default {
  components: {
    PlainNavbar,
    TheFlashCardCreation
  },
  data() {
    return {
      sets: FlashcardHelper.createDefaultCards(4)
    };
  }
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/2-tools/mixins/css-properties/margin';
@use '../assets/scss/4-layouts/containers';

// prettier-ignore
.create-card {
  &__container {
    width: 90%;
    @include margin.top((
        xsm: 25
    ));
  }
  &__link-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
