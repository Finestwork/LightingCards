<template>
  <div class="card">
    <div class="card__header">
      <span class="card__label">{{ label }}</span>
      <span class="card__counter"
        ><span class="highlight">{{ current }}</span> / {{ max }}</span
      >
    </div>
    <div class="card__scrollbar-wrapper">
      <OverlayScrollbarsComponent
        class="card__scrollbar"
        :options="scrollbarOptions"
      >
        <p class="card__text">
          {{ text }}
        </p>
      </OverlayScrollbarsComponent>
    </div>
  </div>
</template>

<script>
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import 'overlayscrollbars/overlayscrollbars.css';

export default {
  components: {
    OverlayScrollbarsComponent
  },
  props: {
    label: {
      type: String,
      required: true
    },
    current: {
      type: [String, Number],
      required: true
    },
    max: {
      type: [String, Number],
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data: () => ({
    scrollbarOptions: {
      overflow: {
        x: 'hidden'
      }
    }
  })
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.card {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
  padding: pixels.toRem(15);
  position: absolute;
  top: 0;
  left: 0;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__label {
    font-weight: 900;
    text-transform: uppercase;
    color: map.get(text.$main, 300);
    font-size: pixels.toRem(map.get(major-second.$scale, 2));
  }

  &__counter {
    font-weight: 900;
    font-size: pixels.toRem(map.get(major-second.$scale, 2));
    color: map.get(text.$main, 500);
  }

  &__scrollbar-wrapper {
    display: flex;
    align-items: center;
    flex-basis: 100%;
  }

  &__scrollbar {
    width: 100%;
    :deep(.os-scrollbar-track) {
      background-color: map.get(text.$main, 100);
    }
    :deep(.os-scrollbar-handle) {
      background-color: map.get(text.$main, 300);
    }
  }

  &__text {
    text-align: center;
    font-weight: 900;
    height: 100%;
    max-height: 150px;
    padding: pixels.toRem(3);
    color: map.get(text.$main, 700);
  }

  .highlight {
    color: map.get(main.$primary, 500);
  }
}
</style>
