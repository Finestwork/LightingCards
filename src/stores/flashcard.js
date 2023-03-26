import { defineStore } from 'pinia';
import FlashcardHelper from '@/assets/js/helpers/flashcard-helper';

const useFlashCardStore = defineStore('flashcard', {
  state: () => ({
    // An array of objects: {id: String, term: String, definition: String}
    testItems: [],

    // same with testItems prop but stored in database
    sets: []
  }),
  actions: {
    // Overwrite all existing items in state.testItems
    changeTestItems(items) {
      this.testItems = items;
    },
    // Clear all array items in testItems
    clearTestItems() {
      this.testItems = [];
    },
    // Assign a new whole value to sets, will overwrite existing items
    fillSets(newSets) {
      this.sets = newSets;
    },

    // Checks if a set exists in the store
    isSetExists(setId) {
      const SET = this.sets.filter((set) => set.id === setId);
      return SET.length !== 0;
    },

    // Checks if a set exists in the store
    getSetById(setId) {
      const SET = this.sets.filter((set) => set.id === setId);
      return SET.length === 0 ? null : SET[0];
    }
  },
  getters: {
    hasTestItems(state) {
      return (
        state.testItems.length !== 0 &&
        FlashcardHelper.areAllItemsValid(state.testItems)
      );
    },
    isSetsEmpty(state) {
      return state.sets.length === 0;
    }
  }
});

export { useFlashCardStore };
