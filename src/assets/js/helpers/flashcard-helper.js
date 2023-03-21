export default class FlashcardHelper {
  static #VALID_LENGTH = 3;
  static areAllItemsValid(items) {
    const BLANK_ITEMS = items.filter(
      (item) => item.term.trim() === '' || item.description.trim() === ''
    );

    return BLANK_ITEMS.length === 0;
  }

  static isArrayLengthValid(items) {
    return items.length >= FlashcardHelper.#VALID_LENGTH;
  }
}
