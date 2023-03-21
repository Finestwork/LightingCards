export default class FlashcardHelper {
  static #VALID_LENGTH = 3;
  static areAllItemsValid(items) {
    items.filter(
      (item) => item.term.trim() === '' || item.description.trim() === ''
    );

    return items.length === 0;
  }

  static isArrayLengthValid(items) {
    return items.length >= FlashcardHelper.#VALID_LENGTH;
  }
}
