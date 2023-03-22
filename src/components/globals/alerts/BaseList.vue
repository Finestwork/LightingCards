<template>
  <ul :class="getRootClass">
    <li class="alert__list-item" v-for="item in items" :key="item">
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    // danger, warning, success
    colorState: {
      type: String,
      default: 'danger'
    }
  },
  computed: {
    getRootClass() {
      return `alert ${this.colorState}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/safety';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.alert {
  list-style: none;
  color: white;
  font-weight: 700;
  border-radius: 7px;
  font-size: pixels.toRem(map.get(major-second.$scale, 3));
  padding: pixels.toRem(8);
  &__list-item {
    margin-bottom: pixels.toRem(4);
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &.danger {
    background-color: lighten(map.get(safety.$danger, 500), 8%);
  }
  &.warning {
    background-color: lighten(map.get(safety.$warning, 600), 15%);
  }
  &.success {
    background-color: darken(map.get(safety.$success, 500), 5%);
  }
}
</style>
