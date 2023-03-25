<template>
  <div class="card">
    <ButtonCreateCard
      class="card__create-btn"
      :is-create-card-loading="isCreateCardLoading"
      @on-click="createCard"
    />

    <!-- Set Controls -->
    <div class="card__set-controls">
      <div class="set-control__form-fields">
        <BaseTextInput
          class="set-control__title-txt"
          label="Title:"
          type="text"
          placeholder="What's the title?"
          id="titleTxtInput"
        />
        <BaseTextArea
          class="set-control__description-txt"
          label="Description:"
          placeholder="Give your future self why you created it this set"
          id="descriptionTxtInput"
        />
      </div>

      <div class="set-control__form-switches">
        <BaseSwitch
          label="Open to public"
          type="checkbox"
          name="openToPublicRadBtn"
          id="openToPublicRadBtn"
          helper-text="This means that even if people have the link, they can't join because your flashcard has a password."
          v-model="isOpenToPublic"
        />
        <BaseSwitch
          label="Anyone can edit"
          type="checkbox"
          name="canAnyoneEditRadBtn"
          id="canAnyoneEditRadBtn"
          :helper-text="switchAnyoneCanEditTxt"
          :disabled="!isOpenToPublic"
          v-model="canAnyoneEdit"
        />
      </div>
    </div>

    <!-- Flashcards -->
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
import BaseTextArea from '@/components/globals/forms/BaseTextArea.vue';
import BaseSwitch from '@/components/globals/forms/BaseSwitch.vue';
import ButtonCreateCard from '@/components/multi-instnace/buttons/ButtonCreateSet.vue';
import ButtonAddFlashcard from '@/components/multi-instnace/buttons/ButtonAddFlashcard.vue';
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';

// NPM
import { SlickItem, SlickList } from 'vue-slicksort';

export default {
  components: {
    BaseSingleLineAlert,
    BaseTextArea,
    BaseTextInput,
    BaseCardItem,
    BaseSwitch,
    ButtonCreateCard,
    ButtonAddFlashcard,
    SlickList,
    SlickItem
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
      flashCardItems: this.items,
      isOpenToPublic: false,
      canAnyoneEdit: false,
      shouldGeneratePassword: false,
      switchAnyoneCanEditTxt: 'Disabled because your set is not open to public.'
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
    },
    isOpenToPublic(isOpenToPublic) {
      if (isOpenToPublic) {
        this.switchAnyoneCanEditTxt =
          'When your set is publicly published, anyone who joined will have an access and able to edit the set.';
      } else {
        this.canAnyoneEdit = false;
        this.switchAnyoneCanEditTxt =
          'Disabled because your set is not open to public.';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../assets/scss/1-settings/css-properties/colors/main';
@use '../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../assets/scss/2-tools/functions/convertions/pixels';

// prettier-ignore
.card {
  &__create-btn {
    margin-left: auto;
  }
  &__items{
    margin-top: pixels.toRem(35);
    padding-bottom: pixels.toRem(50);
    .item{
      margin-bottom: pixels.toRem(35);
      &:last-of-type{
        margin-bottom: 0;
      }
    }
  }
  &__error-alert{
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: pixels.toRem(50);
  }
  &__add-flashcard-btn{
    width: 100%;
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
    padding-top: pixels.toRem(20);
    padding-bottom: pixels.toRem(20);
    margin-top: pixels.toRem(35);
  }
  &__set-controls{
    margin-top: pixels.toRem(25);
    margin-bottom: pixels.toRem(50);

    .set-control{
      &__title-txt{
        margin-bottom: pixels.toRem(15);
      }
      &__description-txt{
        :deep(textarea){
          height: 150px;
        }
      }
      &__form-switches{
        margin-top: pixels.toRem(35);
        :deep(.switch){
          margin-bottom: pixels.toRem(25);
          &:last-of-type{
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
