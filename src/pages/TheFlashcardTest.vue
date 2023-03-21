<template>
  <div :class="test.test">
    <TheRequiredLoginAlert :class="test['test__alert']" />

    <div :class="[test['test__flashcard-wrapper'], test['container--sm']]">
      <BasePlainFlashCard
        :class="test['test__flashcard']"
        :parent-class="test"
        max-num="3"
        current-num="1"
      />
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

<style lang="scss" module="test">
@use '../assets/scss/2-tools/mixins/css-properties/margin';
@use '../assets/scss/4-layouts/containers';

// prettier-ignore
.test {
  min-height: 100vh;

  &__alert {
    border-radius: 0;
  }
  &__flashcard-wrapper{
    @include margin.top((
        xsm: 50
    ));
  }



}
</style>
