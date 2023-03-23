<template>
  <BasePlayfulButton class="add-flashcard" type="button" @click="onClick">
    <template #leadingIcon>
      <PlusIcon />
    </template>
    <template #text>Add Cards</template>
  </BasePlayfulButton>
</template>

<script>
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
export default {
  components: {
    BasePlayfulButton,
    PlusIcon
  },
  emits: ['onClick'],
  methods: {
    onClick(e) {
      this.$emit('onClick', e);
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../../assets/scss/1-settings/css-properties/colors/main';

.add-flashcard {
  background-color: map.get(main.$primary, 100);
  box-shadow: inset 0 -6px 0 rgba(map.get(main.$primary, 500), 0.16);

  &:focus,
  &:hover {
    background-color: darken(map.get(main.$primary, 100), 3%);
  }

  &:focus {
    box-shadow: inset 0 -3px 0 rgba(map.get(main.$primary, 500), 0.16);
  }

  :deep(.btn__text) {
    color: map.get(main.$primary, 600);
  }

  :deep(.btn__leading-icon svg path) {
    fill: map.get(main.$primary, 600);
  }
}
</style>
