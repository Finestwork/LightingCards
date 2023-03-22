import { defineStore } from 'pinia';

const useFlashCardStore = defineStore('flashcard', {
  state: () => ({
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
      return state.testItems.length !== 0;
    }
  }
});

export { useFlashCardStore };
