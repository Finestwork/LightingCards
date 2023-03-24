<template>
  <div class="sets">
    <div class="sets__search-wrapper">
      <BaseTextInput
        class="sets__search-input-wrapper"
        type="text"
        placeholder="Search flashcard's title here"
        id="searchSetTxtInput"
      />
      <ButtonCreateSet class="sets__create-set-btn" />
    </div>

    <div class="sets__set-wrapper row">
      <div class="col-xsm-12 col-sm-6 col-md-4" v-for="set in sets" :key="set">
        <BasePlainCardSet :title="set.title" :description="set.description" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';
import ButtonCreateSet from '@/components/multi-instnace/buttons/ButtonCreateSet.vue';
import BasePlainCardSet from '@/components/globals/flashcard-sets/BasePlainCardSet.vue';
import { useFlashCardStore } from '@/stores/flashcard';

export default {
  components: {
    BaseTextInput,
    ButtonCreateSet,
    BasePlainCardSet
  },
  data() {
    return {
      sets: useFlashCardStore().sets
    };
  }
};
</script>

<style lang="scss" scoped>
@use '../../assets/scss/2-tools/mixins/css-properties/margin';
@use '../../assets/scss/2-tools/mixins/css-properties/width-and-height';
@use '../../assets/scss/2-tools/mixins/css-properties/all-properties';
@use '../../assets/scss/4-layouts/columns';

// prettier-ignore
.sets {
  &__search-wrapper {
    @include all-properties.init((
        xsm: (
            display: flex,
            flex-direction: column
        ),
        400: (
            flex-direction: row,
            align-items: center,
            justify-content: space-between
        )
    ))
  }
  &__search-input-wrapper {
    @include width-and-height.set((
      400: (width: 90%, maxWidth: 450px)
    ));
    @include margin.right((
        400: 15
    ));
    @include margin.bottom((
        xsm: 15,
        400: 0
    ));
  }
  &__create-set-btn {
    @include width-and-height.set((
        400: (width: 100%, maxWidth: 160px)
    ))
  }
  &__set-wrapper{
    @include margin.top((
      xsm: 50
    ));

    :deep(.plain-set-flashcard){
      @include margin.bottom((
        xsm: 45
      ));
    }
  }
}
</style>
