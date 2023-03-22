import TypeHelper from '@/assets/js/helpers/type-helper';
import isEmail from 'validator/es/lib/isEmail';

export default class FormValidationHelper {
  static isEmpty(text) {
    return TypeHelper.isString(text) && text.trim() === '';
  }

  static isLength(text, min) {
    return !FormValidationHelper.isEmpty(text) && text.length >= min;
  }

  static isEmail(text) {
    return !FormValidationHelper.isEmpty(text) && isEmail(text);
  }

  static sameWith(text1, text2) {
    return (
      !FormValidationHelper.isEmpty(text1) &&
      !FormValidationHelper.isEmpty(text2) &&
      text1.trim() === text2.trim()
    );
  }
}
