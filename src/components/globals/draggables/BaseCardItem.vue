<template>
  <div class="card">
    <span class="card__order-lbl">{{ order }}</span>
    <div class="card__controls">
      <DragHandle tag="button" class="control__drag-btn">
        <BentoIcon />
      </DragHandle>
      <button
        type="button"
        class="control__delete-btn"
        @click="onCardDelete"
        v-if="!hideDeleteBtn"
      >
        <TrashCanIcon />
      </button>
    </div>
    <div class="card__form-wrapper">
      <div class="form">
        <BaseTextArea
          ref="termTextInput"
          placeholder="Place the term here"
          :id="`termTextInput${order}`"
          v-model="cardObj.term"
        />
        <span class="form__lbl">Term</span>
      </div>
      <div class="form">
        <BaseTextArea
          ref="definitionTextInput"
          placeholder="Place the definition here"
          :id="`definitionTextInput${order}`"
          v-model="cardObj.definition"
        />
        <span class="form__lbl">Definition</span>
      </div>
    </div>
  </div>
</template>

<script>
import BentoIcon from '@/components/icons/BentoIcon.vue';
import TrashCanIcon from '@/components/icons/TrashCanIcon.vue';
import BaseTextArea from '@/components/globals/forms/BaseTextArea.vue';

// NPM
import { DragHandle } from 'vue-slicksort';

export default {
  components: {
    BentoIcon,
    TrashCanIcon,
    BaseTextArea,
    DragHandle
  },
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    order: {
      type: [String, Number],
      required: true
    },
    hideDeleteBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sort: null,
      list: this.modelValue,
      cardObj: this.modelValue
    };
  },
  emits: ['onCardDelete'],
  methods: {
    onCardDelete(e) {
      this.$emit('onCardDelete', e);
    }
  }
};
</script>
<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/1-settings/css-properties/colors/safety';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';
@use '../../../assets/scss/2-tools/mixins/media-query/media-query';
@use '../../../assets/scss/2-tools/mixins/media-query/custom-media-query';

// prettier-ignore
.card {
  background-color: white;
  border-radius: 10px;
  position: relative;
  border: 2px solid map.get(text.$main, 100);
  padding: pixels.toRem(25) pixels.toRem(10);

  &__order-lbl {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    position: absolute;
    top: 0;
    left: 3px;
    transform: translateY(-50%);
    color: white;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 2px solid white;
    font-size: pixels.toRem(map.get(major-second.$scale, 3));
    background-color: map.get(main.$primary, 500);
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    margin-top: pixels.toRem(10);
    margin-bottom: pixels.toRem(10);

    .control {
      &__delete-btn,
      &__drag-btn {
        display: flex;
        border: none;
        background-color: white;
        outline: none;
        border-radius: 7px;
        padding: pixels.toRem(10);

        svg{
          display: block;
          width: 100%;
          height: 100%;
        }
      }

      &__delete-btn {
        width: 35px;
        height: 35px;
        cursor: pointer;

        &:focus,
        &:hover {
          background-color: map.get(safety.$danger, 100);
        }

        :deep(svg path) {
          fill: map.get(safety.$danger, 500);
        }
      }

      &__drag-btn {
        cursor: grab;

        &:hover,
        &:focus {
          background-color: map.get(main.$primary, 50);

          :deep(svg path)  {
            fill: map.get(main.$primary, 600);
          }
        }
      }
    }

  }

  &__form-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: pixels.toRem(25);
    @include custom-media-query.custom(700) {
      flex-direction: row;
    }

    .form {
      margin-bottom: pixels.toRem(15);

      &:last-of-type {
        margin-bottom: 0;
      }

      @include custom-media-query.custom(700) {
        width: 50%;
        padding-right: pixels.toRem(15);
        &:last-of-type {
          padding-right: 0;
        }
      }

      &__lbl {
        font-weight: 800;
        text-transform: uppercase;
        font-size: pixels.toRem(map.get(major-second.$scale, 3));
        color: map.get(text.$main, 400);
        margin-top: pixels.toRem(6);
        display: flex;
      }
    }
  }
}
</style>
