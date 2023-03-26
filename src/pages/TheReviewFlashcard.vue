<template>
  <PlainNavbar />

  <div class="container container--sm">
    <BaseShapeSwapping v-if="shouldDisplayLoader">
      <template #msg
        >Please wait while we fetch your flashcards - in just a moment, you'll
        be on your way to mastering your chosen topic!</template
      >
    </BaseShapeSwapping>
    <div class="flashcard-wrapper" v-if="shouldDisplayFlashcards">
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
import BaseShapeSwapping from '@/components/globals/lottie/BaseShapeSwapping.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';

// NPM
import toast from 'vue-toastification';

export default {
  components: {
    PlainNavbar,
    BaseFlashcardWrapper,
    BasePlayfulLink,
    BaseShapeSwapping
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
      isLoading: true,
      sets: []
    };
  },
  mounted() {
    const handleResult = (res) => {
      // If set does not exist
      if (res.empty) {
        this.$router.push({ name: 'NotFound' });
        return;
      }

      const DOC = res.docs[0].data();
      const CURRENT_USER = FirebaseHelper.getUserStatus();

      // If it's not a public set and another user is trying to access it, then redirect to the error page
      if (!DOC.isOpenToPublic && CURRENT_USER !== DOC.userId) {
        return;
      }

      // Add delay to avoid content-jumping
      setTimeout(() => {
        // If no flashcards, redirect to router page
        if (DOC.sets.length === 0) {
          this.$router.push({ name: 'EditFlashcard' });
          toast().error('No flashcards, please create at least two.', {
            timeout: 6000
          });
          return;
        }
        this.isLoading = false;
        this.sets = DOC.sets;
      }, 1000);
    };
    const handleError = (err) => {
      this.isLoading = false;
      // Show server error page
      console.dir(err);
    };
    FlashcardHelper.getSetItems(this.id).then(handleResult).catch(handleError);
  },
  computed: {
    shouldDisplayFlashcards() {
      return this.sets.length !== 0 && !this.isLoading;
    },
    shouldDisplayLoader() {
      return this.isLoading && this.sets.length === 0;
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
  .loader{
    height: 100vh;
    justify-content: center;
    &__anim{
      width: 125px;
    }
  }
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
  .flashcard-wrapper{
    @include margin.top((
        xsm: 50
    ));
    @include margin.bottom((
      xsm: 100
    ));
  }
}
</style>
