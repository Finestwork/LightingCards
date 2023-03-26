import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  limit,
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
  static createSet({ title, description, sets, isOpenToPublic }) {
    return new Promise((resolve, reject) => {
      const COLLECTION = collection(getFirestore(), 'sets');
      const DATA = {
        id: objectHash(Date.now() + title, {
          algorithm: 'md5',
          encoding: 'base64'
        }),
        userId: getAuth().currentUser.uid,
        title: title,
        description: description,
        sets: sets,
        isOpenToPublic: isOpenToPublic
      };

      addDoc(COLLECTION, DATA).then(resolve).catch(reject);
    });
  }

  // Update stored sets in the database
  static updateStoredSet(setId, data) {
    return new Promise((resolve, reject) => {
      const COLLECTION = collection(getFirestore(), 'sets');
      const QUERY = query(COLLECTION, where('id', '==', setId));
      getDocs(QUERY)
        .then((docs) => {
          const DOC_ID = docs.docs[0].id;
          const DOC_REF = doc(getFirestore(), 'sets', DOC_ID);
          updateDoc(DOC_REF, data).then(resolve).catch(reject);
        })
        .catch(reject);
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

  // Get set items from database
  static getSetItems(setId) {
    return new Promise((resolve, reject) => {
      const COLLECTION = collection(getFirestore(), 'sets');
      const QUERY = query(COLLECTION, where('id', '==', setId), limit(1));
      getDocs(QUERY).then(resolve).catch(reject);
    });
  }
}
