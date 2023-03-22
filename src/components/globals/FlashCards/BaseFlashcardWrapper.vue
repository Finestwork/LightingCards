<template>
  <div class="flashcard">
    <div class="flashcard__wrapper" ref="flashcardWrapper">
      <BaseFlashCardItem
        class="flashcard__front"
        label="Definition"
        :text="getItem.definition"
        :current="currentInd + 1"
        :max="items.length"
      />
      <BaseFlashCardItem
        class="flashcard__back"
        label="Term"
        :text="getItem.term"
        :current="currentInd + 1"
        :max="items.length"
      />
    </div>

    <div class="flashcard__btn-controls">
      <button
        type="button"
        class="btn__prev-btn"
        @click="prevItem"
        v-if="shouldDisplayPrevBtn"
      >
        <ArrowLeftLong />
      </button>
      <button type="button" class="btn__reveal-btn" @click="toggleAnswer">
        Reveal Answer
      </button>
      <button
        type="button"
        class="btn__next-btn"
        @click="nextItem"
        v-if="shouldDisplayNextBtn"
      >
        <ArrowRightLong />
      </button>
    </div>
  </div>
</template>

<script>
import BaseFlashCardItem from '@/components/globals/FlashCards/BaseFlashCardItem.vue';
import ArrowLeftLong from '@/components/globals/icons/ArrowLeftLong.vue';
import ArrowRightLong from '@/components/globals/icons/ArrowRightLong.vue';

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    currentInd: 0,
    shouldShowAnswer: false
  }),
  components: {
    BaseFlashCardItem,
    ArrowLeftLong,
    ArrowRightLong
  },
  methods: {
    toggleAnswer(e) {
      e.currentTarget.blur();
      this.shouldShowAnswer = !this.shouldShowAnswer;
    },
    nextItem(e) {
      e.currentTarget.blur();
      if (this.currentInd < this.items.length - 1) {
        this.shouldShowAnswer = false;
        this.currentInd++;
      }
    },
    prevItem(e) {
      e.currentTarget.blur();
      if (this.currentInd > 0) {
        this.shouldShowAnswer = false;
        this.currentInd--;
      }
    }
  },
  computed: {
    getItem() {
      return this.items[this.currentInd];
    },
    shouldDisplayPrevBtn() {
      return this.currentInd !== 0;
    },
    shouldDisplayNextBtn() {
      return this.currentInd !== this.items.length - 1;
    }
  },
  watch: {
    shouldShowAnswer(shouldShowAnswer) {
      if (shouldShowAnswer) {
        this.$refs.flashcardWrapper.classList.add('flipped');
        return;
      }

      this.$refs.flashcardWrapper.classList.remove('flipped');
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.flashcard {
  width: 90%;
  max-width: 350px;
  margin-right: auto;
  margin-left: auto;
  &__wrapper {
    position: relative;
    min-height: 250px;
    transform-style: preserve-3d;
    transition: all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &__front,
  &__back {
    backface-visibility: hidden;
  }

  &__front {
    background: map.get(main.$primary, 100);
    box-shadow: inset 0 -10px 0 rgba(map.get(main.$primary, 400), 0.16);
    :deep(.card__label) {
      color: map.get(text.$main, 900);
    }
  }
  &__back {
    background: map.get(main.$primary, 500);
    box-shadow: inset 0 -10px 0 rgba(0, 0, 0, 0.16);
    :deep(.card__label) {
      color: white;
      border-bottom: 2px dashed white;
    }
    :deep(.card__counter) {
      display: none;
    }
    :deep(.card__text) {
      color: white;
    }
  }

  &__back {
    transform: rotateY(180deg);
  }

  &__btn-controls {
    display: flex;
    justify-content: center;
    margin-top: pixels.toRem(25);

    .btn__next-btn,
    .btn__reveal-btn,
    .btn__prev-btn {
      cursor: pointer;
      border-radius: 8px;
      outline: none;
      transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .btn__reveal-btn {
      color: white;
      font-weight: 700;
      font-family: inherit;
      border: none;
      box-shadow: inset 0 -5px 0 rgba(0, 0, 0, 0.1);
      padding: pixels.toRem(10);
      margin-right: pixels.toRem(7);
      margin-left: pixels.toRem(7);
      background-color: map.get(main.$primary, 500);
      &:hover,
      &:focus {
        background-color: darken(map.get(main.$primary, 500), 5%);
      }
      &:focus {
        transform: translateY(3px);
        box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.1);
      }
    }

    .btn__prev-btn,
    .btn__next-btn {
      border: none;
      display: flex;
      justify-content: center;
      box-shadow: inset 0 -5px 0 rgba(map.get(main.$primary, 600), 0.2);
      background-color: map.get(main.$primary, 100);
      width: 75px;
      padding: pixels.toRem(7);
      &:hover,
      &:focus {
        background-color: darken(map.get(main.$primary, 100), 5%);
      }
      &:focus {
        transform: translateY(3px);
        box-shadow: inset 0 -2px 0 rgba(map.get(main.$primary, 600), 0.2);
      }

      :deep(svg) {
        display: block;
        width: 50%;
        path {
          fill: map.get(main.$primary, 500);
        }
      }
    }
  }

  .flipped {
    &.flashcard__wrapper {
      transform: rotateY(180deg);
    }
  }
}
</style>
