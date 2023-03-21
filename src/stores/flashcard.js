import { defineStore } from 'pinia';

const useFlashCardStore = defineStore('flashcard', {
  state: () => ({
    items: []
  })
});

export { useFlashCardStore };
