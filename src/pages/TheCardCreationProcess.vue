<template>
  <div class="create-card">
    <PlainNavbar />

    <div class="create-card__container container--sm">
      <BasePlainBreadcrumbs :links="breadcrumbs" />
      <TheFlashCardCreation v-model:items="sets" />
    </div>
  </div>
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import BasePlainBreadcrumbs from '@/components/globals/breadcrumbs/BasePlainBreadcrumbs.vue';
import TheFlashCardCreation from '@/components/single-instance/TheFlashCardCreation.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';

export default {
  components: {
    PlainNavbar,
    TheFlashCardCreation,
    BasePlainBreadcrumbs
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          to: { name: 'Landing' }
        },
        {
          text: 'Create Card',
          to: { name: 'CardCreationProcess' }
        }
      ],
      sets: FlashcardHelper.createDefaultCards(4)
    };
  }
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/2-tools/mixins/css-properties/margin';
@use '../assets/scss/2-tools/mixins/css-properties/width-and-height';
@use '../assets/scss/2-tools/mixins/css-properties/all-properties';
@use '../assets/scss/4-layouts/containers';

// prettier-ignore
.create-card {
  &__container {
    width: 90%;
    @include margin.top((
        xsm: 50
    ));
    :deep(.plain-breadcrumbs){
      @include margin.bottom((
        xsm:35
      ));
    }
    :deep(.card__set-controls){
      @include all-properties.init((
        md: (
          display: flex
        )
      ));
      @include margin.top((
        md: 45
      ));

      .set-control__form-fields{
        @include width-and-height.set((
            md: (width: 45% ),
            lg: (width: 40%),
        ));
        @include margin.right((
          md: 35
        ));
      }

      .set-control__form-switches{
        @include width-and-height.set((
            md: (width: 45% ),
            lg: (width: 60%),
        ));
      }
    }
  }
}
</style>
