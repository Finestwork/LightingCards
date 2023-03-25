<template>
  <PlainNavbar />
</template>

<script>
import PlainNavbar from '@/components/globals/navbars/PlainNavbar.vue';

// Helpers
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';
import FirebaseHelper from '@/assets/js/helpers/firebase-helper';

export default {
  components: {
    PlainNavbar
  },
  props: {
    // router parameter
    id: {
      type: String,
      required: true
    }
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

      console.table(DOC);
    };
    const handleError = (err) => {
      // Show server error page
      console.dir(err);
    };
    FlashcardHelper.getSetItems(this.id).then(handleResult).catch(handleError);
  }
};
</script>
