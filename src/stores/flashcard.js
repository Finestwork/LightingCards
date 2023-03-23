import { defineStore } from 'pinia';
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';

const useFlashCardStore = defineStore('flashcard', {
  state: () => ({
    // An array of objects: {id: String, term: String, definition: String}
    testItems: []
  }),
  actions: {
    // Overwrite all existing items in state.testItems
    changeTestItems(items) {
      this.testItems = items;
    }
  },
  getters: {
    hasTestItems(state) {
      return FlashcardHelper.areAllItemsValid(state.testItems);
    }
  }
});

export { useFlashCardStore };
