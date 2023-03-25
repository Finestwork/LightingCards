<template>
  <div class="switch">
    <div class="switch__wrapper">
      <input
        ref="input"
        :id="id"
        :type="type"
        :name="name"
        :value="value"
        :checked="checked"
        :disabled="disabled"
        @input="onChange"
      />
      <button
        type="button"
        class="switch__indicator"
        @click="toggleInput"
      ></button>
      <label :for="id">{{ label }}</label>
    </div>
    <p class="switch__helper-text" v-if="shouldDisplayHelperText">
      {{ helperText }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      default: ''
    },
    modelValue: {
      type: Boolean
    },
    helperText: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: this.modelValue
    };
  },
  emits: ['update:modelValue'],
  methods: {
    toggleInput() {
      this.checked = !this.checked;
      this.$emit('update:modelValue', this.checked);
    },
    onChange() {
      this.checked = !this.checked;
      this.$emit('update:modelValue', this.checked);
    }
  },
  computed: {
    shouldDisplayHelperText() {
      const TEXT = this.helperText.trim();
      return TEXT !== '' && TEXT.length !== 0;
    }
  },
  watch: {
    modelValue: {
      handler(modelValue) {
        this.checked = modelValue;
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.switch {
  &__wrapper {
    display: flex;
    align-items: center;
  }
  input[type='radio'],
  input[type='checkbox'] {
    display: inline;
    appearance: none;

    &:focus {
      ~ .switch__indicator {
        background-color: darken(map.get(main.$primary, 200), 5%);
      }
    }
    &:checked {
      ~ .switch__indicator {
        background-color: map.get(main.$primary, 600);
        &::before {
          background-color: white;
          left: calc(100% - 3px);
          transform: translate(-100%, -50%);
        }
      }
    }
    &:active {
      ~ .switch__indicator::before {
        width: 60%;
      }
    }
    &:disabled {
      ~ .switch__indicator {
        background-color: map.get(text.$main, 100);
        &::before {
          background-color: darken(map.get(text.$main, 100), 15%);
        }
      }
    }
  }

  label {
    font-weight: 700;
    cursor: pointer;
    user-select: none;
    color: map.get(text.$main, 900);
    font-size: pixels.toRem(map.get(major-second.$scale, 3));
    &:focus,
    &:hover {
      color: map.get(main.$primary, 600);
    }
  }

  &__indicator {
    display: flex;
    width: 45px;
    height: 25px;
    border-radius: 99rem;
    position: relative;
    border: none;
    cursor: pointer;
    background-color: map.get(main.$primary, 200);
    margin-right: pixels.toRem(5);
    outline: none;

    &:focus,
    &:hover {
      background-color: darken(map.get(main.$primary, 200), 5%);
    }
    &::before {
      content: '';
      border-radius: 99rem;
      position: absolute;
      top: 50%;
      left: 3px;
      height: 18px;
      width: 18px;
      transition: all 0.35s ease-in-out;
      background-color: map.get(main.$primary, 600);
      transform: translateY(-50%);
    }
  }

  &__helper-text {
    font-weight: 600;
    margin-top: pixels.toRem(3);
    color: map.get(text.$main, 600);
    font-size: pixels.toRem(map.get(major-second.$scale, 2));
  }
}
</style>
