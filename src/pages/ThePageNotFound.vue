<template>
  <PlainNavbar />
  <div class="container container--sm">
    <BasePageNotFound>
      <template #title>Page Not Found</template>
      <template #msg>
        Oops, it looks like the page you're looking for isn't here - let's get
        you back on track!
      </template>
      <template #addons>
        <BasePlayfulLink :to="{ name: 'Landing' }">
          <template #text>Take me back to earth</template>
        </BasePlayfulLink>
      </template>
    </BasePageNotFound>
  </div>
</template>

<script>
import BasePageNotFound from '@/components/globals/error-states/BasePageNotFound.vue';
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import BasePlayfulLink from '@/components/globals/links/BasePlayfulLink.vue';
import DocumentTitleHelper from '@/assets/js/helpers/document-title-helper';

export default {
  components: {
    PlainNavbar,
    BasePageNotFound,
    BasePlayfulLink
  },
  mounted() {
    DocumentTitleHelper.pageNotFound();
  }
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/2-tools/mixins/css-properties/margin';
@use '../assets/scss/4-layouts/containers';

// prettier-ignore
.container {
  width: 90%;
  .error--page-not-found {
    @include margin.top((
      xsm: 100
    ));
    @include margin.bottom((
      xsm: 35
    ));
    :deep(.error__msg){
      @include margin.bottom((
          xsm: 25
      ));
    }
  }
}
</style>
