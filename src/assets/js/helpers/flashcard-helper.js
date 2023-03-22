export default class FlashcardHelper {
  static #VALID_LENGTH = 2;
  static areAllItemsValid(items) {
    const BLANK_ITEMS = items.filter(
      (item) => item.term.trim() === '' || item.definition.trim() === ''
    );

    return BLANK_ITEMS.length === 0;
  }

  static isArrayLengthValid(items) {
    return items.length >= FlashcardHelper.#VALID_LENGTH;
  }
}
