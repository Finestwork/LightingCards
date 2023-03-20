<template>
  <div :class="$style['card']">
    <BasePlayfulButton
      type="button"
      :class="$style['card__create-btn']"
      @click="createCard"
    >
      <template #leadingIcon>
        <PlusIcon />
      </template>
      <template #text>Create Card</template>
    </BasePlayfulButton>

    <div :class="$style['card__settings']">
      <div :class="$style['settings__left-wrapper']">
        <BaseTextInput
          :class="$style['settings__title']"
          id="titleTxt"
          label="Title:"
          placeholder="Place flash card's title here"
          type="text"
          :validation-rules="{ required: true }"
          v-model="titleTxt"
        />
        <BaseTextArea
          :class="$style['settings__description']"
          id="descriptionTxt"
          label="Description:"
          placeholder="What's your flashcard all about?"
          :counter="255"
          strict-mode
          v-model="descriptionTxt"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';
import BaseTextArea from '@/components/globals/forms/BaseTextArea.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';

export default {
  components: {
    BasePlayfulButton,
    BaseTextInput,
    BaseTextArea,
    PlusIcon
  },
  data: () => ({
    titleTxt: '',
    descriptionTxt: ''
  }),
  methods: {
    createCard(e) {
      e.currentTarget.blur();
    }
  }
};
</script>

<style lang="scss" module>
@use '../../assets/scss/2-tools/mixins/css-properties/margin';

// prettier-ignore
.card {
  &__create-btn {
    margin-left: auto;
  }
  &__settings {
    display: flex;
    .settings {
      &__left-wrapper {
        width: 40%;
      }
      &__title{
        @include margin.bottom((
          xsm: 35
        ));
      }
      &__description{
        height: 150px;
      }
    }
  }
}
</style>
