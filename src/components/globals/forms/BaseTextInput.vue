<template>
  <div class="text-input">
    <label :for="id">{{ label }}</label>
    <div :class="inputWrapperClass">
      <input
        ref="input"
        :placeholder="placeholder"
        :type="this.shouldTogglePassword ? 'text' : type"
        :id="id"
        :value="modelValue"
        @input="onInput"
        @keyup="onKeyup"
        @keydown="onKeydown"
        @blur="onBlur"
        autocomplete="off"
      />
      <span class="text-input__leading-icon" v-if="canShowLeadingIcon">
        <slot name="leadingIcon"></slot>
      </span>
      <span class="text-input__trailing-icon" v-if="canShowTrailingIcon">
        <slot name="trailingIcon"></slot>
      </span>
      <button
        class="text-input__clear-btn"
        type="button"
        @click="clearField"
        v-if="canShowClearBtn"
      >
        <XMarkIcon />
      </button>
      <button
        class="text-input__toggle-btn"
        type="button"
        @click="shouldTogglePassword = !shouldTogglePassword"
        v-if="togglePassword"
      >
        <Eye v-if="shouldTogglePassword" />
        <EyeSlash v-if="!shouldTogglePassword" />
      </button>
    </div>
    <BaseErrorList :errors="errors" />
  </div>
</template>

<script>
import BaseErrorList from '@/components/globals/forms/BaseErrorList.vue';
import XMarkIcon from '@/components/icons/XMark.vue';
import Eye from '@/components/icons/EyeIcon.vue';
import EyeSlash from '@/components/icons/EyeSlash.vue';

// Helpers
import LanguageHelper from '@/assets/js/lang/en';
import ArrayHelper from '@/assets/js/helpers/array-helper';

// NPM
import isEmpty from 'validator/es/lib/isEmpty';
import isEmail from 'validator/es/lib/isEmail';

export default {
  components: { BaseErrorList, XMarkIcon, Eye, EyeSlash },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      required: true
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
      default: ''
    },
    clearErrors: {
      type: Boolean
    },
    clearForm: {
      type: Boolean,
      required: false
    },

    // Show clear button
    clearable: {
      type: Boolean,
      default: false
    },

    // Show toggle button password/text
    togglePassword: {
      type: Boolean,
      default: false
    },

    // Programmatically run the validation functions
    runValidation: {
      type: Boolean,
      default: false
    },

    /**
     * @validations: {
     *   required: Boolean,
     *   min: Number,
     *   max: Number,
     *   isEmail: Boolean,
     *   sameWith: {element: String <css valid selector>, fieldName: String}
     * }
     */
    validationRules: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      errors: [],
      validationFns: [],
      sameWithElement: null,
      shouldTogglePassword: false
    };
  },
  emits: ['update:modelValue', 'onKeyup', 'onKeydown', 'onBlur'],
  mounted() {
    this.getPossibleValidation();
  },
  methods: {
    getPossibleValidation() {
      if (this.validationRules === null) return;

      // Check if conditions are met
      const IS_REQUIRED =
        'required' in this.validationRules && this.validationRules.required;
      const HAS_MAX = 'max' in this.validationRules;
      const HAS_MIN = 'min' in this.validationRules;
      const IS_EMAIL =
        'isEmail' in this.validationRules && this.validationRules.isEmail;
      const HAS_SAME_WITH =
        'sameWith' in this.validationRules &&
        Object.keys(this.validationRules.sameWith).length !== 0;

      // Gather all validation functions
      if (IS_REQUIRED) {
        this.validationFns.push(this.isRequired);
      }
      if (HAS_MAX) {
        this.validationFns.push(this.max);
      }
      if (HAS_MIN) {
        this.validationFns.push(this.min);
      }
      if (IS_EMAIL) {
        this.validationFns.push(this.email);
      }

      if (HAS_SAME_WITH) {
        this.sameWithElement = document.querySelector(
          this.validationRules.sameWith.element
        );
        ['blur', 'keyup', 'keydown'].forEach((ev) => {
          this.sameWithElement.addEventListener(ev, this.sameWith);
        });

        this.validationFns.push(this.sameWith);
      }
    },

    /*
     * =====================
     * Events
     * =====================
     */
    onInput() {
      this.$emit('update:modelValue', this.$refs.input.value);
    },
    clearField() {
      this.$refs.input.value = '';
      this.$emit('update:modelValue', this.$refs.input.value);
    },
    onKeyup() {
      this.validationFns.forEach((fn) => fn());
      this.$emit('onKeyup', this.modelValue);
    },
    onKeydown() {
      if (!isEmpty(this.modelValue)) this.validationFns.forEach((fn) => fn());
      this.$emit('onKeydown', this.modelValue);
    },
    onBlur() {
      this.validationFns.forEach((fn) => fn());
      this.$emit('onBlur', this.modelValue);
    },

    /*
     * =====================
     * Validation Helpers
     * =====================
     */

    addOrRemoveError(prop, msg) {
      const IND = ArrayHelper.isPropExist(this.errors, prop);
      if (IND === -1 && msg !== null) this.errors.push({ [prop]: msg });
      if (IND !== -1 && msg === null) this.errors.splice(IND, 1);
    },

    isRequired() {
      const ERROR_MSG = isEmpty(this.modelValue)
        ? LanguageHelper.getErrors.required
        : null;
      this.addOrRemoveError('required', ERROR_MSG);
    },

    max() {
      if (isEmpty(this.modelValue)) {
        this.addOrRemoveError('max', null);
        return;
      }
      const MAX = this.validationRules.max;
      const ERROR_MSG =
        this.modelValue.length > MAX ? LanguageHelper.getErrors.max(MAX) : null;
      this.addOrRemoveError('max', ERROR_MSG);
    },

    min() {
      if (isEmpty(this.modelValue)) {
        this.addOrRemoveError('min', null);
        return;
      }
      const MIN = this.validationRules.min;
      const ERROR_MSG =
        this.modelValue.length < MIN ? LanguageHelper.getErrors.min(MIN) : null;
      this.addOrRemoveError('min', ERROR_MSG);
    },

    email() {
      if (isEmpty(this.modelValue)) {
        this.addOrRemoveError('email', null);
        return;
      }
      const ERROR_MSG = !isEmail(this.modelValue)
        ? LanguageHelper.getErrors.email
        : null;
      this.addOrRemoveError('email', ERROR_MSG);
    },

    sameWith() {
      if (isEmpty(this.sameWithElement.value)) return;
      const FIELD_NAME = this.validationRules.sameWith.fieldName;
      const ERROR_MSG =
        this.modelValue !== this.sameWithElement.value
          ? LanguageHelper.getErrors.sameWith(FIELD_NAME)
          : null;
      this.addOrRemoveError('sameWith', ERROR_MSG);
    }
  },
  computed: {
    inputWrapperClass() {
      let base = 'text-input__wrapper';

      if (this.canShowLeadingIcon) base += ' add-leading-icon';
      if (this.canShowTrailingIcon) base += ' add-trailing-icon';
      if (this.togglePassword) base += ' add-toggle-password';
      if (this.clearable) base += ' add-clearable';

      return base;
    },
    canShowLeadingIcon() {
      return !!this.$slots.leadingIcon;
    },
    canShowTrailingIcon() {
      if (this.clearable) return this.modelValue === '';

      return false;
    },
    canShowClearBtn() {
      return this.modelValue !== '' && !this.togglePassword && this.clearable;
    }
  },
  watch: {
    runValidation: {
      handler(shouldRunValidation) {
        if (shouldRunValidation) {
          this.validationFns.forEach((fn) => fn());
        }
      },
      immediate: true
    },
    clearErrors(clearErrors) {
      if (clearErrors) this.errors = [];
    },
    clearForm(clearForm) {
      if (clearForm) {
        this.errors = [];
        this.$refs.input.value = '';
        this.$emit('update:modelValue', this.$refs.input.value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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

.text-input {
  @include text-input-fields.list {
    width: 100%;
    border: none;
    outline: none;
    font-weight: 700;
    border-radius: 7px;
    font-family: inherit;
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

  &__wrapper {
    position: relative;

    &.add-leading-icon {
      @include text-input-fields.list {
        padding-left: pixels.toRem($icon-size + $icon-offset + 5);
      }
    }

    &.add-clearable,
    &.add-toggle-password,
    &.add-trailing-icon {
      @include text-input-fields.list {
        padding-right: pixels.toRem($icon-size + $icon-offset + 15);
      }
    }
  }

  label {
    display: inline-block;
    cursor: pointer;
    font-weight: 700;
    color: map.get(text.$main, 900);
    margin-bottom: pixels.toRem(5);
  }

  &__toggle-btn,
  &__clear-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 50%;
    border: none;
    outline: none;
    transition: box-shadow-transition.$transition-linear;
    background-color: map.get(text.$main, 500);
    padding: pixels.toRem(3);

    &:focus,
    &:hover {
      background-color: map.get(main.$primary, 500);
    }

    &:focus {
      @include box-shadow-primary.lightness(lighter, md);
    }

    :deep(svg) {
      display: block;
      width: 100%;
      height: 100%;

      path {
        fill: white;
      }
    }
  }

  &__leading-icon,
  &__trailing-icon {
    display: flex;
    width: #{$icon-size}px;
    height: #{$icon-size}px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    :deep(svg) {
      display: block;
      width: 100%;
      height: 100%;
      fill: map.get(text.$main, 800);
    }
  }

  &__leading-icon {
    left: #{$icon-offset}px;
  }

  &__trailing-icon {
    right: #{$icon-offset}px;
  }
}
</style>
