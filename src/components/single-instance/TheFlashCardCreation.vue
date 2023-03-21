<template>
  <div :class="$style['card']">
    <BasePlayfulButton
      type="button"
      :class="$style['card__create-btn']"
      @click="createCard"
    >
      <template #leadingIcon>
        <PlusIcon />
      </template>
      <template #text>Create Card</template>
    </BasePlayfulButton>

    <div :class="$style['card__items']">
      <BaseSingleLineAlert
        :class="$style['card__error-alert']"
        v-if="shouldDisplayErrorAlert"
      >
        <template #text>{{ errorAlertText }}</template>
      </BaseSingleLineAlert>
      <SlickList axis="y" :useDragHandle="true" v-model:list="flashCardItems">
        <SlickItem
          v-for="(list, ind) in flashCardItems"
          :key="list.id"
          :index="ind"
          :class="$style['item']"
        >
          <BaseCardItem :order="ind + 1" v-model="flashCardItems[ind]" />
        </SlickItem>
      </SlickList>
    </div>
  </div>
</template>

<script>
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';
import BaseCardItem from '@/components/globals/draggables/BaseCardItem.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import BaseSingleLineAlert from '@/components/globals/alerts/BaseSingleLine.vue';

// Helpers
import { useFlashCardStore } from '@/stores/flashcard';
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';

// NPM
import { SlickItem, SlickList } from 'vue-slicksort';

export default {
  components: {
    BasePlayfulButton,
    BaseCardItem,
    PlusIcon,
    SlickList,
    SlickItem,
    BaseSingleLineAlert
  },
  data: () => ({
    isPublic: true,
    errorAlertText: '',
    flashCardItems: [
      { id: 'card1', term: '', description: '' },
      { id: 'card2', term: '', description: '' },
      { id: 'card3', term: '', description: '' }
    ],
    useFlashCardStore: useFlashCardStore()
  }),
  methods: {
    createCard(e) {
      e.currentTarget.blur();
      this.errorAlertText = '';

      if (!FlashcardHelper.isArrayLengthValid(this.flashCardItems)) {
        this.errorAlertText = '• Flash cards should not be less than 3.';
        return;
      }

      if (!FlashcardHelper.areAllItemsValid(this.flashCardItems)) {
        this.errorAlertText =
          '• There are items that are left blank, please check it.';
        return;
      }

      this.useFlashCardStore.changeItems(this.flashCardItems);
    }
  },
  computed: {
    shouldDisplayErrorAlert() {
      return this.errorAlertText.trim() !== '';
    }
  }
};
</script>

<style lang="scss" module>
@use '../../assets/scss/2-tools/mixins/css-properties/margin';
@use '../../assets/scss/2-tools/mixins/css-properties/padding';

// prettier-ignore
.card {
  &__create-btn {
    margin-left: auto;
  }
  &__items{
    @include margin.top((
      xsm: 35
    ));
    @include padding.bottom((
      xsm: 50
    ));
    .item{
      @include margin.bottom((
          xsm: 35
      ));
      &:last-of-type{
        margin-bottom: 0;
      }

    }
  }
  &__error-alert{
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
    @include margin.bottom((
      xsm: 50
    ));
  }
}
</style>
