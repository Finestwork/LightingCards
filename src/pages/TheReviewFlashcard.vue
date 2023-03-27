<template>
  <PlainNavbar />

  <div class="container container--sm">
    <BaseServerError v-if="shouldDisplayServerError">
      <template #title>Server Error</template>
      <template #msg
        >Oops, something went wrong on our end — please try again later or
        contact support for assistance.</template
      >
      <template #addons>
        <BasePlayfulLink class="error-link" :to="{ name: 'Landing' }">
          <template #text>I understand</template>
        </BasePlayfulLink>
      </template>
    </BaseServerError>
    <BaseShapeSwapping v-if="shouldDisplayLoader">
      <template #msg
        >Please wait while we fetch your flashcards - in just a moment, you'll
        be on your way to mastering your chosen topic!</template
      >
    </BaseShapeSwapping>
    <div class="flashcard-wrapper" v-if="shouldDisplayFlashcards">
      <BasePlayfulLink class="edit-link" :to="{ name: 'EditFlashcard' }">
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
import BaseServerError from '@/components/globals/error-states/BaseServerError.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';
import { useFlashCardStore } from '@/stores/flashcard';

// NPM
import toast from 'vue-toastification';
import DocumentTitleHelper from '@/assets/js/helpers/document-title-helper';

export default {
  components: {
    PlainNavbar,
    BaseFlashcardWrapper,
    BasePlayfulLink,
    BaseShapeSwapping,
    BaseServerError
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
      hasServerError: false,
      sets: []
    };
  },
  mounted() {
    DocumentTitleHelper.retrievingSets();
    const STORED_SET = useFlashCardStore().getSetById(this.id);

    // If the item doesn't exist in the store, it needs to be fetched
    if (STORED_SET === null) {
      this.fetchSets();
      return;
    }

    this.isLoading = false;
    this.sets = STORED_SET.sets;
    DocumentTitleHelper.setRetrieved(STORED_SET.title);
  },
  methods: {
    async fetchSets() {
      try {
        const RESULT = await FlashcardHelper.getSetItems(this.id);

        // If set does not exist
        if (RESULT.empty) {
          this.$router.push({ name: 'NotFound' });
          return;
        }

        const DOC = RESULT.docs[0].data();
        const USER = await FirebaseHelper.getCurrentUser();

        if (USER) {
          // If it's not a public set and another user is trying to access it, then redirect to the error page
          if (!DOC.isOpenToPublic && USER.auth.currentUser.uid !== DOC.userId) {
            this.$router.push({ name: 'Landing' });
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
            DocumentTitleHelper.setRetrieved(DOC.title);
          }, 1000);
        }
      } catch (err) {
        this.isLoading = false;
        this.hasServerError = true;
      }
    }
  },
  computed: {
    shouldDisplayFlashcards() {
      return this.sets.length !== 0 && !this.isLoading && !this.hasServerError;
    },
    shouldDisplayLoader() {
      return this.isLoading && this.sets.length === 0 && !this.hasServerError;
    },
    shouldDisplayServerError() {
      return this.hasServerError && !this.isLoading && this.sets.length === 0;
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
  .edit-link {
    margin-left: auto;
    max-width: 80px;
    @include margin.bottom((
      xsm: 100
    ));
  }
  .error-link{
    @include margin.top((
      xsm: 25
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
  .error--server{
    @include margin.top((
      xsm: 100
    ));
    @include margin.bottom((
      xsm: 50
    ));
  }
}
</style>
