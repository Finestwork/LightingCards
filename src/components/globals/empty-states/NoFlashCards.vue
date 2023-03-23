<template>
  <section class="empty-state">
    <span class="empty-state__img">
      <img
        src="/assets/images/empty-states/no-flashcards-retrieved.svg"
        alt="Illustration of no flashcards retrieved"
      />
    </span>
    <h3 class="empty-state__title">No Flashcards Yet</h3>
    <p class="empty-state__description">
      To get started, click the "Create Flashcard" button below. Once you have
      created some flashcards, you can study them, organize them, and track your
      progress.
    </p>
    <BasePlayfulLink
      class="empty-state__create-link"
      :to="{ name: 'CardCreationProcess' }"
    >
      <template #leadingIcon>
        <PlusIcon />
      </template>
      <template #text>Create Card</template>
    </BasePlayfulLink>
  </section>
</template>

<script>
import BasePlayfulLink from '@/components/globals/links/BasePlayfulLink.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';

export default {
  components: {
    BasePlayfulLink,
    PlusIcon
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/text';
@use '../../../assets/scss/1-settings/css-properties/colors/main';
@use '../../../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../../../assets/scss/2-tools/functions/convertions/pixels';

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-right: auto;
  margin-left: auto;

  &__img {
    display: flex;
    width: 150px;

    > img {
      width: 100%;
    }
  }

  &__title {
    font-weight: 900;
    margin-top: pixels.toRem(7);
    color: map.get(main.$primary, 900);
    font-size: pixels.toRem(map.get(major-second.$scale, 5));
  }

  &__description {
    font-weight: 600;
    text-align: justify;
    max-width: 450px;
    color: map.get(text.$main, 500);
    font-size: pixels.toRem(map.get(major-second.$scale, 3));
  }

  &__create-link {
    width: 100%;
    max-width: 180px;
    margin-top: pixels.toRem(25);
  }
}
</style>
