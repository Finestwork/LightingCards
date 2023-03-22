export default class TypeHelper {
  static isString(text) {
    return (
      Object.prototype.toString.call(text) === '[object String]' ||
      typeof text === 'string'
    );
  }

  static isNumber(num) {
    return (
      (Object.prototype.toString.call(num) === '[object Number]' ||
        typeof num === 'number') &&
      !isNaN(num)
    );
  }
}
