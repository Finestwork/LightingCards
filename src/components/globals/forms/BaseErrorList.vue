<template>
  <TransitionGroup name="list" tag="ul" class="error-list">
    <li v-for="(error, ind) in errors" :key="`w-${ind}`">
      {{ Object.values(error)[0] }}
    </li>
  </TransitionGroup>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/1-settings/css-properties/colors/safety';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.error-list {
  list-style: none;
  font-weight: 600;
  margin-top: pixels.toRem(8);
  font-size: pixels.toRem(map.get(major-second.$scale, 2));
  color: map.get(safety.$danger, 500);

  > * {
    margin-bottom: pixels.toRem(5);

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.15s ease-in-out;
}

.list-enter-to,
.list-leave-from {
  opacity: 1;
}

.list-enter-from {
  transform: translateY(3px);
}

.list-leave-to {
  transform: translateY(-3px) translateX(0);
}

.list-leave-active {
  position: absolute;
}
</style>
