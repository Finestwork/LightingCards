<template>
  <div class="card">
    <ButtonCreateCard
      class="card__create-btn"
      :is-create-card-loading="isCreateCardLoading"
      @on-click="createCard"
    />

    <div class="card__items">
      <BaseSingleLineAlert
        class="card__error-alert"
        v-if="shouldDisplayErrorAlert"
      >
        <template #text>{{ errorAlertText }}</template>
      </BaseSingleLineAlert>
      <SlickList axis="y" :useDragHandle="true" v-model:list="flashCardItems">
        <SlickItem
          v-for="(list, ind) in flashCardItems"
          :key="list.id"
          :index="ind"
          class="item"
        >
          <BaseCardItem
            :order="ind + 1"
            :data-index="ind"
            :hide-delete-btn="shouldHideDeleteBtn"
            @on-card-delete="onCardDelete"
            v-model="flashCardItems[ind]"
          />
        </SlickItem>
      </SlickList>
      <ButtonAddFlashcard class="card__add-flashcard-btn" @on-click="addCard" />
    </div>
  </div>
</template>

<script>
import BaseCardItem from '@/components/globals/draggables/BaseCardItem.vue';
import BaseSingleLineAlert from '@/components/globals/alerts/BaseSingleLine.vue';
import ButtonCreateCard from '@/components/multi-instnace/buttons/ButtonCreateSet.vue';
import ButtonAddFlashcard from '@/components/multi-instnace/buttons/ButtonAddFlashcard.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';

// NPM
import { SlickItem, SlickList } from 'vue-slicksort';

export default {
  components: {
    ButtonCreateCard,
    ButtonAddFlashcard,
    BaseCardItem,
    SlickList,
    SlickItem,
    BaseSingleLineAlert
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isPublic: true,
      errorAlertText: '',
      isCreateCardLoading: false,
      flashCardItems: this.items
    };
  },
  emits: ['update:items', 'createCard'],
  methods: {
    createCard(e) {
      this.isCreateCardLoading = true;
      this.errorAlertText = '';

      if (!FlashcardHelper.isArrayLengthValid(this.flashCardItems)) {
        this.isCreateCardLoading = false;
        e.currentTarget.blur();
        this.errorAlertText = '• Flash cards should not be less than 2.';
        return;
      }

      if (!FlashcardHelper.areAllItemsValid(this.flashCardItems)) {
        this.isCreateCardLoading = false;
        e.currentTarget.blur();
        this.errorAlertText =
          '• There are items that are left blank, please check it.';
        return;
      }

      this.$emit('createCard');
    },
    addCard(e) {
      e.currentTarget.blur(); // For bouncy effect

      // For reactive state .push() will not trigger watchers
      this.flashCardItems = [
        ...this.flashCardItems,
        FlashcardHelper.createCard()
      ];
    },
    onCardDelete(e) {
      const BTN = e.currentTarget;
      const PARENT = BTN.closest('.card');
      const IND = PARENT.dataset.index;

      this.flashCardItems.splice(parseInt(IND), 1);

      this.$emit('update:items', this.flashCardItems);
    }
  },
  computed: {
    shouldDisplayErrorAlert() {
      return this.errorAlertText.trim() !== '';
    },
    shouldHideDeleteBtn() {
      return this.flashCardItems.length === 2;
    }
  },
  watch: {
    flashCardItems: {
      handler(flashCardItems) {
        this.$emit('update:items', flashCardItems);
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../assets/scss/1-settings/css-properties/colors/main';
@use '../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../assets/scss/2-tools/mixins/css-properties/margin';
@use '../../assets/scss/2-tools/mixins/css-properties/padding';
@use '../../assets/scss/2-tools/mixins/css-properties/font-size';

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
  &__add-flashcard-btn{
    width: 100%;
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
    @include padding.vertical((
      xsm: 20
    ));
    @include margin.top((
      xsm: 35
    ));
  }
}
</style>
