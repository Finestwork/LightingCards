<template>
  <div class="create-card">
    <PlainNavbar @successfully-logged-out="redirectToLandingPage" />

    <div class="create-card__container container--sm">
      <BasePlainBreadcrumbs :links="breadcrumbs" />
      <TheFlashCardCreation
        @create-card="setCreatedSuccessfully"
        :items="sets"
      />
    </div>
  </div>
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import BasePlainBreadcrumbs from '@/components/globals/breadcrumbs/BasePlainBreadcrumbs.vue';
import TheFlashCardCreation from '@/components/single-instance/TheFlashCardCreation.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';

// NPM
import { useToast } from 'vue-toastification';

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
      sets: FlashcardHelper.createDefaultCards(2)
    };
  },
  methods: {
    setCreatedSuccessfully() {
      useToast().success('Successfully created', {
        timeout: 6000
      });
      this.$router.push({ name: 'Landing' });
    },
    redirectToLandingPage() {
      this.$router.push({ name: 'Landing' });
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../assets/scss/2-tools/mixins/css-properties/margin';
@use '../assets/scss/2-tools/mixins/css-properties/width-and-height';
@use '../assets/scss/2-tools/mixins/css-properties/font-size';
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
      .breadcrumb__link{
        @include font-size.responsive((
          lg: map.get(major-second.$scale, 3)
        ));
      }
      .breadcrumb__icon{
        @include margin.horizontal((
          lg: 7
        ));
      }
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
