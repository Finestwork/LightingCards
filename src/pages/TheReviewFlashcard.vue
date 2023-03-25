<template>
  <PlainNavbar />

  <div class="container container--sm">
    <div v-if="shouldDisplayFlashcards">
      <BasePlayfulLink :to="{ name: 'EditFlashcard' }">
        <template #text>Finish</template>
      </BasePlayfulLink>
      <BaseFlashcardWrapper :items="sets" />
    </div>
  </div>
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import BaseFlashcardWrapper from '@/components/globals/flashcards/BaseFlashcardWrapper.vue';
import BasePlayfulLink from '@/components/globals/links/BasePlayfulLink.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';

export default {
  components: {
    PlainNavbar,
    BaseFlashcardWrapper,
    BasePlayfulLink
  },
  props: {
    // router parameter
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sets: []
    };
  },
  mounted() {
    const handleResult = (res) => {
      // If set does not exist
      if (res.empty) {
        // Redirect to page 404
        return;
      }

      const DOC = res.docs[0].data();
      const CURRENT_USER = FirebaseHelper.getUserStatus();

      // If it's not a public set and another user is trying to access it, then redirect to the error page
      if (!DOC.isOpenToPublic && CURRENT_USER !== DOC.userId) {
        return;
      }

      this.sets = DOC.sets;
      console.table(DOC);
    };
    const handleError = (err) => {
      // Show server error page
      console.dir(err);
    };
    FlashcardHelper.getSetItems(this.id).then(handleResult).catch(handleError);
  },
  computed: {
    shouldDisplayFlashcards() {
      return this.sets.length !== 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@use '../assets/scss/2-tools/mixins/css-properties/margin';
@use '../assets/scss/4-layouts/containers';

// prettier-ignore
.container {
  width: 90%;
  @include margin.top((
    xsm: 50
  ));
  .playful-link {
    margin-left: auto;
    max-width: 80px;
    @include margin.bottom((
      xsm: 100
    ));
  }
  .flashcard{
    max-width: 600px;
  }
}
</style>