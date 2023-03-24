<template>
  <PlainNavbar />

  <!-- Add Validation here later -->

  <div class="container container--sm">
    <TheSetSkeleton v-if="shouldDisplayLoader" />
    <NoFlashCards class="no-flash-cards" v-if="shouldDisplayEmptyState" />
    <BaseSleepingDeveloper
      class="error-state"
      title="Developer is sleeping!"
      msg="Unfortunately, our system can't retrieved your saved sets from the database, don't worry, we are fixing it now."
      v-if="shouldDisplayErrorState"
    />
    <TheFlashcardSets v-if="shouldDisplaySets" />
  </div>
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import NoFlashCards from '@/components/globals/empty-states/NoFlashCards.vue';
import TheSetSkeleton from '@/components/single-instance/TheSetSkeleton.vue';
import BaseSleepingDeveloper from '@/components/globals/error-states/BaseSleepingDeveloper.vue';
import TheFlashcardSets from '@/components/single-instance/TheFlashcardSets.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';
import { useFlashCardStore } from '@/stores/flashcard';

export default {
  components: {
    PlainNavbar,
    NoFlashCards,
    TheSetSkeleton,
    BaseSleepingDeveloper,
    TheFlashcardSets
  },
  data() {
    return {
      isLoading: true,
      isEmpty: false,
      hasError: false,
      sets: useFlashCardStore().sets
    };
  },
  emits: ['onMounted'],
  mounted() {
    this.$emit('onMounted');

    const getStoredSets = (res) => {
      const DOCS = res.docs;

      if (DOCS.length === 0) {
        this.isLoading = false;
        this.isEmpty = true;
        return;
      }

      const SETS = DOCS.map((doc) => doc.data());
      useFlashCardStore().fillSets(SETS);
      this.isLoading = false;
    };
    const handleError = () => {
      this.hasError = false;
    };
    FlashcardHelper.getStoredSets().then(getStoredSets).catch(handleError);
  },
  computed: {
    shouldDisplayLoader() {
      return (
        this.isLoading &&
        !this.isEmpty &&
        !this.hasError &&
        useFlashCardStore().isSetsEmpty
      );
    },
    shouldDisplayEmptyState() {
      return (
        !this.isLoading &&
        this.isEmpty &&
        !this.hasError &&
        useFlashCardStore().isSetsEmpty
      );
    },
    shouldDisplayErrorState() {
      return (
        !this.isLoading &&
        !this.isEmpty &&
        this.hasError &&
        useFlashCardStore().isSetsEmpty
      );
    },
    shouldDisplaySets() {
      return (
        !this.isLoading &&
        !this.isEmpty &&
        !this.hasError &&
        !useFlashCardStore().isSetsEmpty
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@use '../../assets/scss/2-tools/mixins/css-properties/margin';
@use '../../assets/scss/4-layouts/containers';

// prettier-ignore
.container {
  width: 90%;
  height: 60vh;
  min-height: 350px;
  @include margin.top((
      xsm: 35,
      md: 45,
  ));
  @include margin.bottom((
      xsm: 35
  ));
}

.error-state {
  height: 100%;
}

// prettier-ignore
.no-flash-cards {
  justify-content: center;
}
</style>
