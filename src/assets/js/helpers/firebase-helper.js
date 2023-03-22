import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

export default class FirebaseHelper {
  static #ERRORS = {
    'auth/internal-error':
      'The server encountered an unexpected error while trying to process the request, please try again later.',
    'auth/email-already-in-use': 'Email already exists.',
    'auth/invalid-email': 'Email is invalid.',
    'auth/configuration-not-found':
      'The server has not setup yet the google authentication, please try again later.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/wrong-password': 'Your email and password do not match our records.',
    'auth/user-mismatch': 'Your email and password do not match our records.',
    'auth/user-not-found': 'Your credential does not exist.',
    'auth/requires-recent-login':
      'User needs to login again to perform security-sensitive actions.',
    'auth/user-token-expired': 'Token expired.'
  };

  /*
   * ========================
   * Getters & Setters
   * ========================
   */
  static get getErrors() {
    return FirebaseHelper.#ERRORS;
  }

  /*
   * =========
   * Methods
   * =========
   */
  static isUserLoggedIn() {
    return getAuth().currentUser !== null;
  }

  static onAuthStateChanged({ signedInFn, signedOutFn }) {
    onAuthStateChanged(getAuth(), (user) => {
      // If user has signed in
      if (user) {
        signedInFn(user);
        return;
      }

      // If user has signed out
      signedOutFn(user);
    });
  }

  static loginUser(email, password) {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(getAuth(), email, password)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  static registerUser(email, password) {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  static updateDisplayName({ displayName, photoURL }) {
    return new Promise((resolve, reject) => {
      updateProfile(getAuth().currentUser, { displayName, photoURL })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}
