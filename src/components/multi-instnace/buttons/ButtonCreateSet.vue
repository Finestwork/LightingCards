<template>
  <BasePlayfulButton
    type="button"
    :is-loading="isCreateCardLoading"
    @click="onClick"
  >
    <template #leadingIcon>
      <PlusIcon />
    </template>
    <template #text>Create Set</template>
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
  props: {
    isCreateCardLoading: {
      type: Boolean,
      required: true
    }
  },
  emits: ['onClick'],
  methods: {
    onClick(e) {
      this.$emit('onClick', e);
    }
  }
};
</script>
