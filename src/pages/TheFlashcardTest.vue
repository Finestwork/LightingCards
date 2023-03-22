<template>
  <div class="test">
    <TheRequiredLoginAlert class="test__alert" />

    <div class="test__container container--sm">
      <router-link class="test__go-back-link" :to="{ name: 'CardCreationTest' }"
        >Go back to editing</router-link
      >
      <div class="test__flashcard-wrapper">
        <BasePlainFlashCard
          class="test__flashcard"
          :items="useFlashCardStore.testItems"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TheRequiredLoginAlert from '@/components/single-instance/TheRequiredLoginAlert.vue';
import BasePlainFlashCard from '@/components/globals/FlashCards/BaseFlashcardWrapper.vue';
import { useFlashCardStore } from '@/stores/flashcard';

export default {
  components: {
    TheRequiredLoginAlert,
    BasePlainFlashCard
  },
  data: () => ({
    useFlashCardStore: useFlashCardStore()
  })
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../assets/scss/1-settings/css-properties/colors/main';
@use '../assets/scss/1-settings/css-properties/colors/text';
@use '../assets/scss/2-tools/mixins/css-properties/margin';
@use '../assets/scss/2-tools/mixins/css-properties/padding';
@use '../assets/scss/2-tools/mixins/css-properties/width-and-height';
@use '../assets/scss/4-layouts/containers';

// prettier-ignore
.test {
  min-height: 100vh;

  &__alert {
    border-radius: 0;
  }

  &__container{
    @include margin.top((
        xsm: 50
    ));
  }

  &__go-back-link{
    font-weight: 700;
    outline: none;
    color: map.get(main.$secondary, 500);

    &:hover,
    &:focus{
      color: map.get(main.$primary, 500);
    }
  }

  &__flashcard-wrapper{
    display: flex;
    align-items: center;
    min-height: calc(100vh - 7.5rem); // 50 margin top + 25 padding-bottom
    @include margin.top((
      xsm: 25
    ))
  }
  &__flashcard{
    max-width: 750px;
    @include padding.bottom((
      xsm: 25
    ));
    :deep{
      .flashcard__btn-controls{
        @include margin.top((
          md: 35
        ));
      }

      .flashcard__wrapper{
        @include width-and-height.set((
            md: (minHeight: 350px)
        ))
      }
    }
  }




}
</style>
