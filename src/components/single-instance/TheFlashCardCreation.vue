<template>
  <div class="card">
    <BasePlayfulButton
      type="button"
      class="card__create-btn"
      :is-loading="isCreateCardLoading"
      @click="createCard"
    >
      <template #leadingIcon>
        <PlusIcon />
      </template>
      <template #text>Create Card</template>
    </BasePlayfulButton>

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

      <!-- Create Button -->
      <button type="button" class="card__add-btn" @click="addCard">
        <span class="btn__leading-icon">
          <PlusIcon />
        </span>
        <span class="btn__text">Add Cards</span>
      </button>
    </div>
  </div>
</template>

<script>
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';
import BaseCardItem from '@/components/globals/draggables/BaseCardItem.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import BaseSingleLineAlert from '@/components/globals/alerts/BaseSingleLine.vue';

// Helpers
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
    flashCardItems(flashCardItems) {
      this.$emit('update:items', flashCardItems);
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
  &__add-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    max-width: 450px;
    margin-right: auto;
    margin-left: auto;
    font-family: inherit;
    border: none;
    outline: none;
    transition: all .15s ease-in-out;
    background-color: map.get(main.$primary, 100);
    box-shadow: inset 0 -6px 0 rgba(map.get(main.$primary, 600),0.16);
    @include margin.top((
      xsm: 45
    ));
    @include padding.vertical((
      xsm: 25
    ));
    &:focus,
    &:hover{
      background-color: darken(map.get(main.$primary, 100),  3%);
    }
    &:focus{
      transform: translateY(4px);
      box-shadow: inset 0 -2px 0 rgba(map.get(main.$primary, 600),0.16);
    }
    .btn{
      &__leading-icon{
        width: 15px;
        height: 15px;
        @include margin.right((
          xsm: 15
        ));
        :deep(svg){
          display: block;
          width: 100%;
          height: 100%;
          path{
            fill: map.get(main.$primary, 600);
          }
        }
      }
      &__text{
        font-weight: 800;
        color: map.get(main.$primary, 600);
        @include font-size.responsive((
          xsm: map.get(major-second.$scale, 4)
        ));
      }
    }
  }
}
</style>
