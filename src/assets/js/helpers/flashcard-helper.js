import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';

import objectHash from 'object-hash';

export default class FlashcardHelper {
  static #VALID_LENGTH = 2;

  static createDefaultCards(numOfCards) {
    let CARDS = [];
    for (let i = 0; i < numOfCards; i++) {
      CARDS.push({
        id: objectHash(Date.now() + i),
        term: '',
        definition: ''
      });
    }

    return CARDS;
  }

  static createCard() {
    return {
      id: objectHash(Date.now()),
      term: '',
      definition: ''
    };
  }

  static areAllItemsValid(items) {
    const BLANK_ITEMS = items.filter(
      (item) => item.term.trim() === '' || item.definition.trim() === ''
    );
    return BLANK_ITEMS.length === 0;
  }

  static isArrayLengthValid(items) {
    return items.length >= FlashcardHelper.#VALID_LENGTH;
  }

  // Stores in the database
  static createSet(set) {
    return new Promise((resolve, reject) => {
      const COLLECTION = collection(getFirestore(), 'sets');
      const DATA = {
        userId: getAuth().currentUser.uid,
        set: set
      };

      addDoc(COLLECTION, DATA).then(resolve).catch(reject);
    });
  }

  // Get saved sets from database
  static getStoredSets() {
    return new Promise((resolve, reject) => {
      const COLLECTION = collection(getFirestore(), 'sets');
      const CURRENT_USER = getAuth().currentUser.uid;
      const QUERY = query(COLLECTION, where('userId', '==', CURRENT_USER));
      getDocs(QUERY).then(resolve).catch(reject);
    });
  }
}
