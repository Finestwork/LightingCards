import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
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

  // Checks if input email is the same with the current email
  static isEmailTheSame(email) {
    return getAuth().currentUser.email === email;
  }

  // Get user details
  static getUserDetails() {
    const USER = getAuth().currentUser;

    // If user is null (probably when user visits the site using the address bar)
    if (USER === null) {
      return null;
    }

    return {
      displayName: USER.displayName,
      photoURL: USER.photoURL,
      email: USER.email
    };
  }

  // Get live status of current user
  static getCurrentUser() {
    return new Promise((resolve, reject) => {
      const subscribe = onAuthStateChanged(
        getAuth(),
        (user) => {
          subscribe();
          resolve(user);
        },
        reject
      );
    });
  }

  static onAuthStateChanged({ signedInFn, signedOutFn }) {
    return onAuthStateChanged(getAuth(), (user) => {
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

  static updateUserDetails({ displayName, photoURL }) {
    return new Promise((resolve, reject) => {
      updateProfile(getAuth().currentUser, { displayName, photoURL })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  static updateEmail(email) {
    return new Promise((resolve, reject) => {
      updateEmail(getAuth().currentUser, email).then(resolve).catch(reject);
    });
  }

  static updatePassword(password) {
    return new Promise((resolve, reject) => {
      updatePassword(getAuth().currentUser, password)
        .then(resolve)
        .catch(reject);
    });
  }

  static updateAccount(email, password) {
    return new Promise((resolve, reject) => {
      Promise.all([
        updateEmail(getAuth().currentUser, email),
        updatePassword(getAuth().currentUser, password)
      ])
        .then(resolve)
        .catch(reject);
    });
  }

  static reAuthenticateUser(email, password) {
    const credential = EmailAuthProvider.credential(email, password);
    return new Promise((resolve, reject) => {
      reauthenticateWithCredential(getAuth().currentUser, credential)
        .then(resolve)
        .catch(reject);
    });
  }

  static signout() {
    return new Promise((resolve, reject) => {
      signOut(getAuth()).then(resolve).catch(reject);
    });
  }
}
