<template>
  <div class="create-card">
    <PlainNavbar />

    <div class="create-card__container container--sm">
      <div class="create-card__link-wrapper">
        <router-link :to="{ name: 'Landing' }">Go back</router-link>
        <BasePlayfulButton type="button">
          <template #text>Create Card</template>
        </BasePlayfulButton>
      </div>
    </div>
  </div>
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import BasePlayfulButton from '@/components/globals/forms/BasePlayfulButton.vue';

export default {
  components: {
    BasePlayfulButton,
    PlainNavbar
  }
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/2-tools/mixins/css-properties/margin';
@use '../assets/scss/4-layouts/containers';

// prettier-ignore
.create-card {
  &__container {
    width: 90%;
    @include margin.top((
        xsm: 25
    ));
  }
  &__link-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
