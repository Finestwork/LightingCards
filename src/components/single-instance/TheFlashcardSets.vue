<template>
  <div class="sets">
    <div class="sets__search-wrapper">
      <BaseTextInput
        class="sets__search-input-wrapper"
        type="text"
        placeholder="Search set's title here"
        id="searchSetTxtInput"
        v-model="searchInput"
        v-if="shouldDisplaySearchInput"
      />
      <LinkCreateSet class="sets__create-set-link" />
    </div>

    <div class="sets__set-wrapper row">
      <div class="col-xsm-12 col-sm-6 col-md-4" v-for="set in sets" :key="set">
        <BasePlainCardSet
          :title="set.title"
          :description="set.description"
          :set-id="set.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';
import BasePlainCardSet from '@/components/globals/flashcard-sets/BasePlainCardSet.vue';
import LinkCreateSet from '@/components/multi-instnace/links/LinkCreateSet.vue';
import { useFlashCardStore } from '@/stores/flashcard';

export default {
  components: {
    BaseTextInput,
    LinkCreateSet,
    BasePlainCardSet
  },
  data() {
    return {
      searchInput: ''
    };
  },
  computed: {
    sets() {
      return useFlashCardStore().sets.filter((set) => {
        return set.title.toLowerCase().includes(this.searchInput.toLowerCase());
      });
    },
    shouldDisplaySearchInput() {
      return useFlashCardStore().sets.length > 6;
    }
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
  &__create-set-link {
    @include margin.left((
      400: auto
    ));
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
