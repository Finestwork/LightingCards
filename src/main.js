import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

// Your web app's Firebase configuration
import FirebaseConfig from '../firebase.config.json';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// Initialize Firebase
initializeApp(FirebaseConfig);

createApp(App).use(createPinia()).use(router).use(FloatingVue).mount('body');
