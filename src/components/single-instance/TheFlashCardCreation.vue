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

    <div :class="$style['card__forms']">
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
        :counter="5"
        strict-mode
        v-model="descriptionTxt"
      />
    </div>

    <div :class="$style['card__items']">
      <SlickList axis="y" :useDragHandle="true" v-model:list="flashCardItems">
        <SlickItem
          v-for="(list, ind) in flashCardItems"
          :key="list.id"
          :index="ind"
          :class="$style['item']"
        >
          <BaseCardItem :order="ind + 1" />
        </SlickItem>
      </SlickList>
    </div>
  </div>
</template>

<script>
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';
import BaseTextInput from '@/components/globals/forms/BaseTextInput.vue';
import BaseTextArea from '@/components/globals/forms/BaseTextArea.vue';
import BaseCardItem from '@/components/globals/draggables/BaseCardItem.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';

// NPM
import { SlickItem, SlickList } from 'vue-slicksort';

export default {
  components: {
    BasePlayfulButton,
    BaseTextInput,
    BaseTextArea,
    BaseCardItem,
    PlusIcon,
    SlickList,
    SlickItem
  },
  data: () => ({
    titleTxt: '',
    descriptionTxt: '',
    isPublic: true,
    flashCardItems: [
      { id: 'default1', term: '', description: '' },
      { id: 'default2', term: '', description: '' },
      { id: 'default3', term: '', description: '' },
      { id: 'default4', term: '', description: '' },
      { id: 'default5', term: '', description: '' }
    ]
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
@use '../../assets/scss/2-tools/mixins/css-properties/padding';

// prettier-ignore
.card {
  &__create-btn {
    margin-left: auto;
  }
  &__forms {
    max-width: 450px;
    .settings {
      &__title{
        @include margin.bottom((
          xsm: 35
        ));
      }
      &__description{
        textarea{
          height: 150px;
        }
      }
    }
  }
  &__items{
    @include margin.top((
      xsm: 50
    ));
    .item{
      @include margin.bottom((
          xsm: 35
      ));
      &:last-of-type{
        margin-bottom: 0;
      }

    }
  }

}
</style>
