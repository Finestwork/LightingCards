<template>
  <div class="card">
    <ButtonCreateCard
      class="card__create-btn"
      :is-create-card-loading="isCreateCardLoading"
      @on-click="createCard"
    />

    <BaseSingleLineAlert
      class="card__error-alert"
      v-if="shouldDisplayErrorAlert"
    >
      <template #text>{{ errorAlertText }}</template>
    </BaseSingleLineAlert>

    <!-- Set Controls -->
    <div class="card__set-controls" v-if="areSettingsAllowed">
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
import BaseCardItem from '@/components/globals/draggables/BaseCardItem.vue';
import BaseSingleLineAlert from '@/components/globals/alerts/BaseSingleLine.vue';
import BaseTextArea from '@/components/globals/forms/BaseTextArea.vue';
import BaseSwitch from '@/components/globals/forms/BaseSwitch.vue';
import ButtonCreateCard from '@/components/multi-instnace/buttons/ButtonCreateSet.vue';
import ButtonAddFlashcard from '@/components/multi-instnace/buttons/ButtonAddFlashcard.vue';
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';
import FormValidationHelper from '@/assets/js/helpers/form-validation-helper';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';

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
    },
    areSettingsAllowed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isPublic: true,
      errorAlertText: '',
      titleText: '',
      descriptionText: '',
      isOpenToPublic: false,
      isCreateCardLoading: false,
      flashCardItems: this.items
    };
  },
  emits: ['update:items', 'createCard'],
  methods: {
    createCard(e) {
      this.isCreateCardLoading = true;
      this.errorAlertText = '';
      const createErrorAlert = (alertTxt) => {
        this.isCreateCardLoading = false;
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

      // If settings are not allowed then emit without validating the settings
      if (!this.areSettingsAllowed) {
        this.$emit('createCard');
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

      FlashcardHelper.createSet({
        title: this.titleText,
        description: this.descriptionText,
        isOpenToPublic: this.isOpenToPublic,
        sets: this.flashCardItems
      })
        .then((res) => {
          this.$emit('createCard', res);
        })
        .catch((err) => {
          if (!err.code) {
            createErrorAlert("• Uh-oh! Can't create set, please try again.");
            return;
          }
          const ERR_CODE = FirebaseHelper.getErrors[err.code];
          createErrorAlert(`• ${ERR_CODE}`);
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
  &__create-btn {
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
