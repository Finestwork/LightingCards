import { defineStore } from 'pinia';
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';

const useFlashCardStore = defineStore('flashcard', {
  state: () => ({
    testItems: [
      { id: 'card1', term: '', definition: '' },
      { id: 'card2', term: '', definition: '' }
    ]
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
