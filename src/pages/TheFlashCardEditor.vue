<template>
  <div class="create-card">
    <PlainNavbar />

    <div class="create-card__container container--sm" v-if="shouldDisplaySet">
      <BasePlainBreadcrumbs :links="breadcrumbs" />
      <TheFlashcardEditor
        @create-card="setCreatedSuccessfully"
        :set-id="id"
        :title="setObj.title"
        :description="setObj.description"
        :is-public="setObj.isOpenToPublic"
        :items="setObj.sets"
      />
    </div>
  </div>
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';
import BasePlainBreadcrumbs from '@/components/globals/breadcrumbs/BasePlainBreadcrumbs.vue';
import TheFlashcardEditor from '@/components/single-instance/TheFlashcardEditor.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';

// NPM
import toast, { useToast } from 'vue-toastification';
import { useFlashCardStore } from '@/stores/flashcard';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';

export default {
  components: {
    TheFlashcardEditor,
    PlainNavbar,
    BasePlainBreadcrumbs
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          to: { name: 'Landing' }
        },
        {
          text: 'Edit set',
          to: { name: 'EditFlashcard' }
        }
      ],
      setObj: {},
      isLoading: false,
      hasServerError: false
    };
  },
  mounted() {
    const SET = useFlashCardStore().getSetById(this.id);

    // If set is not yet found in store, fetch it to the database
    if (SET === null) {
      this.fetchSetFromDatabase();
      return;
    }
    this.setObj = SET;
  },
  methods: {
    async fetchSetFromDatabase() {
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
            this.setObj = DOC;
          }, 1000);
        }
      } catch (err) {
        this.isLoading = false;
        this.hasServerError = true;
      }
    },
    setCreatedSuccessfully() {
      useToast().success('Successfully created', {
        timeout: 6000
      });
      this.$router.push({ name: 'Landing' });
    }
  },
  computed: {
    shouldDisplaySet() {
      return (
        Object.keys(this.setObj).length !== 0 &&
        !this.hasServerError &&
        !this.isLoading
      );
    },
    shouldDisplayLoader() {
      return (
        Object.keys(this.setObj).length !== 0 &&
        !this.hasServerError &&
        this.isLoading
      );
    },
    shouldDisplayServerError() {
      return (
        Object.keys(this.setObj).length !== 0 &&
        this.hasServerError &&
        !this.isLoading
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../assets/scss/1-settings/css-properties/font-size/major-second';
@use '../assets/scss/2-tools/mixins/css-properties/margin';
@use '../assets/scss/2-tools/mixins/css-properties/width-and-height';
@use '../assets/scss/2-tools/mixins/css-properties/font-size';
@use '../assets/scss/2-tools/mixins/css-properties/all-properties';
@use '../assets/scss/4-layouts/containers';

// prettier-ignore
.create-card {
  &__container {
    width: 90%;
    @include margin.top((
        xsm: 50
    ));
    :deep(.plain-breadcrumbs){
      @include margin.bottom((
          xsm:35
      ));
      .breadcrumb__link{
        @include font-size.responsive((
            lg: map.get(major-second.$scale, 3)
        ));
      }
      .breadcrumb__icon{
        @include margin.horizontal((
            lg: 7
        ));
      }
    }
    :deep(.card__set-controls){
      @include all-properties.init((
          md: (
              display: flex
          )
      ));
      @include margin.top((
          md: 45
      ));

      .set-control__form-fields{
        @include width-and-height.set((
            md: (width: 45% ),
            lg: (width: 40%),
        ));
        @include margin.right((
            md: 35
        ));
      }

      .set-control__form-switches{
        @include width-and-height.set((
            md: (width: 45% ),
            lg: (width: 60%),
        ));
      }
    }
  }
}
</style>
