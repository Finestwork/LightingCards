import { defineStore } from 'pinia';

const useFlashCardStore = defineStore('flashcard', {
  state: () => ({
    items: []
  }),
  actions: {
    // Overwrite all existing items in state.items
    changeItems(items) {
      this.items = items;
    }
  }
});

export { useFlashCardStore };
