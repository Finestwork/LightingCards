<template>
  <div :class="$style['text-area']">
    <label :for="id">{{ label }}</label>
    <textarea
      ref="input"
      :placeholder="placeholder"
      :id="id"
      @input="onInput"
      @keyup="onKeyup"
      @keydown="onKeydown"
      @blur="onBlur"
      autocomplete="off"
      v-model="inputValue"
    ></textarea>
    <span :class="$style['text-area__ctr']" v-if="hasCounter">
      {{ getTextLength }} / {{ counter }}
    </span>
  </div>
</template>

<script>
import TypeHelper from '@/assets/js/helpers/type-helper';

export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    clearForm: {
      type: Boolean
    },
    counter: {
      type: Number
    },
    // This will stop user to add more value in textarea if it reaches the value specified in 'counter' props
    strictMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: this.modelValue // Implement this after you take a bath
    };
  },
  emits: ['update:modelValue', 'onKeyup', 'onKeydown', 'onBlur'],
  methods: {
    clearField() {
      this.$refs.input.value = '';
      this.$emit('update:modelValue', this.inputValue);
    },
    onInput() {
      this.$emit('update:modelValue', this.inputValue);
    },
    onKeyup() {
      this.$emit('onKeyup', this.inputValue);
    },
    onKeydown(e) {
      const SINGLE_KEY = [
        'ArrowLeft',
        'ArrowUp',
        'ArrowRight',
        'ArrowDown',
        'Backspace'
      ];
      const CTR_KEYS = ['a', 'c'];
      // Ctr+A, Ctr+C, backspace, Command+A
      const ALLOWED_KEYS =
        SINGLE_KEY.includes(e.key) ||
        (CTR_KEYS.includes(e.key) && (e.ctrlKey || e.metaKey));
      const IN_STRICT_MODE =
        this.strictMode &&
        this.hasCounter &&
        this.counter <= this.$refs.input.value.length &&
        !ALLOWED_KEYS;

      if (IN_STRICT_MODE) {
        const LENGTH = this.inputValue.length;
        if (LENGTH > this.counter) {
          this.inputValue = this.inputValue.substring(0, this.counter);
        }
        e.preventDefault(); // prevent browser's default behavior
        return; // prevent code from the bottom to be executed
      }

      this.$emit('onKeydown', this.inputValue);
    },
    onBlur() {
      this.$emit('onBlur', this.inputValue);
    }
  },
  computed: {
    hasCounter() {
      return TypeHelper.isNumber(this.counter);
    },
    getTextLength() {
      return this.inputValue.length;
    }
  },
  watch: {
    clearForm(clearForm) {
      if (clearForm) {
        this.$refs.input.value = '';
        this.$emit('update:modelValue', this.$refs.input.value);
      }
    }
  }
};
</script>

<style lang="scss" module>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/colors/safety';
@use '../../../assets/scss/1-settings/css-properties/box-shadow/transition' as
  box-shadow-transition;
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';
@use '../../../assets/scss/2-tools/mixins/forms/text-input-fields';
@use '../../../assets/scss/2-tools/mixins/css-properties/box-shadow/primary' as
  box-shadow-primary;
@use '../../../assets/scss/2-tools/mixins/css-properties/box-shadow/secondary'
  as box-shadow-secondary;
@use '../../../assets/scss/2-tools/mixins/css-properties/box-shadow/tertiary' as
  box-shadow-tertiary;

$icon-offset: 12;
$icon-size: 12;
$default-padding: 10;

.text-area {
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-weight: 700;
    border-radius: 7px;
    font-family: inherit;
    resize: none;
    transition: box-shadow-transition.$transition-linear;
    color: map.get(text.$main, 900);
    font-size: pixels.toRem(map.get(major-second.$scale, 3));
    padding: pixels.toRem(14) pixels.toRem($default-padding);
    background-color: map.get(text.$main, 50);

    &:focus,
    &:hover {
      background-color: map.get(main.$primary, 100);
    }
    &:focus {
      @include box-shadow-primary.lightness(light, md);
    }
  }
  label {
    display: inline-block;
    cursor: pointer;
    font-weight: 700;
    color: map.get(text.$main, 900);
    margin-bottom: pixels.toRem(5);
  }
  &__ctr {
    display: block;
    font-weight: 600;
    text-align: right;
    color: map.get(text.$main, 900);
    font-size: pixels.toRem(map.get(major-second.$scale, 2));
    margin-top: pixels.toRem(4);
  }
}
</style>
