<template>
  <BasePlayfulLink
    type="button"
    :to="{ name: 'CardCreationProcess' }"
    @click="onClick"
  >
    <template #leadingIcon>
      <PlusIcon />
    </template>
    <template #text>Create Set</template>
  </BasePlayfulLink>
</template>

<script>
import BasePlayfulLink from '@/components/globals/links/BasePlayfulLink.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';

export default {
  components: {
    BasePlayfulLink,
    PlusIcon
  },
  props: {
    isCreateCardLoading: {
      type: Boolean,
      default: false
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
