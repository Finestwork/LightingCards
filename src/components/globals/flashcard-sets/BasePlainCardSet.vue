<template>
  <article class="plain-set-flashcard">
    <h2 class="flashcard__title">{{ title }}</h2>
    <p class="flashcard__description">
      {{ description }}
    </p>

    <div class="flashcard__controls">
      <FadedLink
        tooltip="Start reviewing"
        :to="{ name: 'ReviewFlashcard', params: { id: setId } }"
      >
        <BrainIcon />
      </FadedLink>
      <FadedLink tooltip="Edit set" :to="{ name: 'Landing' }">
        <PenIcon />
      </FadedLink>
    </div>
  </article>
</template>

<script>
import FadedLink from '@/components/globals/link-icons/FadedLink.vue';
import BrainIcon from '@/components/icons/BrainIcon.vue';
import PenIcon from '@/components/icons/PenIcon.vue';

export default {
  components: {
    FadedLink,
    BrainIcon,
    PenIcon
  },
  props: {
    setId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.plain-set-flashcard {
  border-radius: 7px;
  position: relative;
  background-color: white;
  border: 2px solid map.get(text.$main, 50);
  padding: pixels.toRem(14);

  &:hover {
    &::before {
      top: 13px;
    }

    &::after {
      top: 19px;
    }
  }
  &::after,
  &::before {
    content: '';
    position: absolute;
    height: 100%;
    border-radius: 7px;
    transform: translateX(-50%);
    background-color: white;
    left: 50%;
    transition: top 0.35s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    box-shadow: inset 0 -1px 5px rgba(0, 0, 0, 0.06);
    border: 2px solid map.get(text.$main, 50);
  }
  &::before {
    width: 95%;
    top: 7px;
    z-index: -1;
  }
  &::after {
    width: 90%;
    top: 13px;
    z-index: -2;
  }
  .flashcard {
    &__title {
      font-weight: 800;
      color: map.get(text.$main, 500);
      font-size: pixels.toRem(map.get(major-second.$scale, 4));
    }
    &__description {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
      font-weight: 600;
      text-align: justify;
      color: map.get(text.$main, 400);
      font-size: pixels.toRem(map.get(major-second.$scale, 3));
    }
    &__controls {
      display: flex;
      justify-content: flex-end;
      margin-top: pixels.toRem(25);
      .ghost-btn {
        margin-right: pixels.toRem(7);
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
