<template>
  <div class="flashcard">
    <div class="flashcard__wrapper" ref="flashcardWrapper">
      <BaseFlashCardItem
        class="flashcard__front"
        label="Term"
        text="Sino ang pumatay kay lapu-lapu?"
        :current="1"
        :max="10"
      />
      <BaseFlashCardItem
        class="flashcard__back"
        label="Definition"
        text="Edi tipaklongEdi tipaklongEdi tipaklongEdi tipaklongEdi tipaklongEdi
          tipaklongEdi tipaklongEdi tipaklongEdi tipaklongEdi tipaklongEdi
          tipaklongEdi tipaklongEdi tipaklongEdi tipaklongEdi tipaklongEdi
          tipaklongEdi tipaklongEdi tipaklongEdi tipaklong"
        :current="1"
        :max="10"
      />
    </div>

    <button type="button" @click="toggleAnswer">Show Answer</button>
  </div>
</template>

<script>
import BaseFlashCardItem from '@/components/globals/FlashCards/BaseFlashCardItem.vue';
export default {
  components: {
    BaseFlashCardItem
  },
  methods: {
    calcCardHeight() {},
    toggleAnswer() {
      this.$refs.flashcardWrapper.classList.toggle('flipped');
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
  &__wrapper {
    position: relative;
    min-height: 250px;
    width: 90%;
    max-width: 350px;
    margin-right: auto;
    margin-left: auto;
    transform-style: preserve-3d;
    transition: all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &__front,
  &__back {
    backface-visibility: hidden;
  }

  &__back {
    transform: rotateY(180deg);
  }

  .flipped {
    &.flashcard__wrapper {
      transform: rotateY(180deg);
    }
  }
}
</style>
