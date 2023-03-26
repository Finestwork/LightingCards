<template>
  <div class="card">
    <ButtonEditSet
      class="card__edit-btn"
      :is-create-card-loading="isEditSetBtnLoading"
      @on-click="createCard"
    />

    <BaseSingleLineAlert
      class="card__error-alert"
      v-if="shouldDisplayErrorAlert"
    >
      <template #text>{{ errorAlertText }}</template>
    </BaseSingleLineAlert>

    <!-- Set Controls -->
    <div class="card__set-controls">
      <div class="set-control__form-fields">
        <BaseTextInput
          class="set-control__title-txt"
          label="Title:"
          type="text"
          placeholder="What's the title?"
          id="titleTxtInput"
          v-model="titleText"
        />
        <BaseTextArea
          class="set-control__description-txt"
          label="Description:"
          placeholder="Give your future self why you created it this set"
          id="descriptionTxtInput"
          v-model="descriptionText"
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
      </div>
    </div>

    <!-- Flashcards -->
    <div class="card__items">
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
import ButtonEditSet from '@/components/multi-instnace/buttons/ButtonEditSet.vue';
import BaseCardItem from '@/components/globals/draggables/BaseCardItem.vue';
import BaseSingleLineAlert from '@/components/globals/alerts/BaseSingleLine.vue';
import BaseTextArea from '@/components/globals/forms/BaseTextArea.vue';
import BaseSwitch from '@/components/globals/forms/BaseSwitch.vue';
import ButtonAddFlashcard from '@/components/multi-instnace/buttons/ButtonAddFlashcard.vue';
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';
import FormValidationHelper from '@/assets/js/helpers/form-validation-helper';

// NPM
import { SlickItem, SlickList } from 'vue-slicksort';
import { useToast } from 'vue-toastification';

export default {
  components: {
    ButtonEditSet,
    BaseSingleLineAlert,
    BaseTextArea,
    BaseTextInput,
    BaseCardItem,
    BaseSwitch,
    ButtonAddFlashcard,
    SlickList,
    SlickItem
  },
  props: {
    setId: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isPublic: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      flashCardItems: this.items,
      titleText: this.title,
      descriptionText: this.description,
      isOpenToPublic: this.isPublic,
      errorAlertText: '',
      isEditSetBtnLoading: false
    };
  },
  emits: ['update:items', 'createCard'],
  methods: {
    createCard(e) {
      this.isEditSetBtnLoading = true;
      this.errorAlertText = '';
      const createErrorAlert = (alertTxt) => {
        this.isEditSetBtnLoading = false;
        e.currentTarget.blur();
        this.errorAlertText = alertTxt;
      };

      if (!FlashcardHelper.isArrayLengthValid(this.flashCardItems)) {
        createErrorAlert('• Flash cards should not be less than 2.');
        return;
      }

      if (!FlashcardHelper.areAllItemsValid(this.flashCardItems)) {
        createErrorAlert(
          '• There are items that are left blank, please check it.'
        );
        return;
      }

      if (FormValidationHelper.isEmpty(this.titleText)) {
        createErrorAlert('• Title field is empty.');
        return;
      }

      if (FormValidationHelper.isEmpty(this.descriptionText)) {
        createErrorAlert('• Description field is empty.');
        return;
      }

      const DATA = {
        title: this.titleText,
        description: this.descriptionText,
        isOpenToPublic: this.isOpenToPublic,
        sets: this.flashCardItems
      };
      FlashcardHelper.updateStoredSet(this.setId, DATA)
        .then(() => {
          this.isEditSetBtnLoading = false;
          useToast().success('You have successfully updated your set!');
        })
        .catch(() => {
          this.isEditSetBtnLoading = false;
          useToast().error(
            'unfortunately, something went wrong, please try again later.'
          );
        });
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
    }
  },
  computed: {
    shouldDisplayErrorAlert() {
      return this.errorAlertText.trim() !== '';
    },
    shouldHideDeleteBtn() {
      return this.flashCardItems.length === 2;
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
  &__edit-btn {
    margin-left: auto;
  }

  &__items {
    margin-top: pixels.toRem(35);
    padding-bottom: pixels.toRem(50);

    .item {
      margin-bottom: pixels.toRem(35);

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  &__error-alert {
    max-width: 450px;
    margin: pixels.toRem(50) auto pixels.toRem(40) auto;
  }

  &__add-flashcard-btn {
    width: 100%;
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
    padding-top: pixels.toRem(20);
    padding-bottom: pixels.toRem(20);
    margin-top: pixels.toRem(35);
  }

  &__set-controls {
    margin-bottom: pixels.toRem(50);

    .set-control {
      &__title-txt {
        margin-bottom: pixels.toRem(15);
      }

      &__description-txt {
        :deep(textarea) {
          height: 150px;
        }
      }

      &__form-switches {
        margin-top: pixels.toRem(35);

        :deep(.switch) {
          margin-bottom: pixels.toRem(25);

          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
