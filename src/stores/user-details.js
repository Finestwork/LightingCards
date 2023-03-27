import { defineStore } from 'pinia';

const useUserDetails = defineStore('userDetails', {
  state: () => ({
    username: '',
    photoURL: ''
  }),
  actions: {
    setUsername(username) {
      this.username = username;
    },
    setPhotoURL(photoURL) {
      this.photoURL = photoURL;
    }
  },
  getters: {
    isUserDetailEmpty(state) {
      return state.username === '' && state.photoURL === '';
    },
    getUsername(state) {
      return state.username;
    },
    getPhotoURL(state) {
      return state.photoURL;
    }
  }
});

export { useUserDetails };
