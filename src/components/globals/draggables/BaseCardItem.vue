<template>
  <div ref="root">
    <div
      :class="[card.card, parentClass.card]"
      v-for="(list, ind) in list"
      :key="list"
    >
      <span :class="card['card__order-lbl']">{{ ind + 1 }}</span>
      <div :class="card['card__controls']">
        <button type="button" :class="card['control__drag-btn']">
          <BentoIcon />
        </button>
        <button type="button" :class="card['control__delete-btn']">
          <TrashCanIcon />
        </button>
      </div>
      <div :class="card['card__form-wrapper']">
        <div :class="card['form']">
          <BaseTextArea
            ref="termTextInput"
            placeholder="Place the term here"
            :id="`termTextInput${ind}`"
          />
          <span :class="card['form__lbl']">Term</span>
        </div>
        <div :class="card['form']">
          <BaseTextArea
            ref="definitionTextInput"
            placeholder="Place the definition here"
            :id="`definitionTextInput${ind}`"
          />
          <span :class="card['form__lbl']">Definition</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BentoIcon from '@/components/icons/BentoIcon.vue';
import TrashCanIcon from '@/components/icons/TrashCanIcon.vue';
import BaseTextArea from '@/components/globals/forms/BaseTextArea.vue';

// NPM
import Sortable from 'sortablejs';

export default {
  components: {
    BentoIcon,
    TrashCanIcon,
    BaseTextArea
  },
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    parentClass: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      sort: null,
      list: this.modelValue,
      moduleName: 'card'
    };
  },
  mounted() {
    this.sort = new Sortable(this.$refs.root, {
      animation: 250,
      handle: `.${this.card['control__drag-btn']}`,
      ghostClass: this.card['sortable-ghost'],
      chosenClass: this.card['sortable-chosen'],
      dragClass: this.card['sortable-drag'],
      onMove: (e) => {
        console.log(e);
      }
    });
  }
};
</script>
<style lang="scss" module="card">
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
      }

      &__delete-btn {
        width: 35px;
        height: 35px;
        cursor: pointer;

        &:focus,
        &:hover {
          background-color: map.get(safety.$danger, 100);
        }

        svg {
          display: block;
          width: 100%;
          height: 100%;

          path {
            fill: map.get(safety.$danger, 500);
          }
        }
      }

      &__drag-btn {
        cursor: grab;

        &:hover,
        &:focus {
          background-color: map.get(main.$primary, 50);

          svg path {
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

  /* Sortable JS */
  &.sortable-ghost {
    //box-shadow: 0 0 10px 5px rgba(0,0,0,0.1);
  }

  &.sortable-chosen {

  }

  &.sortable-drag{
    opacity: 1;
  }
}
</style>
