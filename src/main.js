import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Your web app's Firebase configuration
import FirebaseConfig from '../firebase.config.json';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Initialize Firebase
initializeApp(FirebaseConfig);

import CloseButton from '@/components/multi-instnace/vue-toastifcation/CloseButton.vue';

createApp(App)
  .use(createPinia())
  .use(router)
  .use(FloatingVue)
  .use(Toast, {
    closeButton: CloseButton
  })
  .mount('body');
