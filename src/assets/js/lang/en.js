export default class LanguageHelper {
  static #errors = {
    required: '• This field is required, do not leave it blank.',
    min: (min) => `• Characters should not be less than ${min}.`,
    max: (max) => `• Characters should not be greater than ${max}. `,
    email: '• Please enter a valid email address.',
    sameWith: (fieldName) =>
      `• This field is not the same with ${fieldName} field.`
  };

  static get getErrors() {
    return LanguageHelper.#errors;
  }
}
