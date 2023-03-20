export default class TypeHelper {
  static isNumber(num) {
    return (
      (Object.prototype.toString.call(num) === '[object Number]' ||
        typeof num === 'number') &&
      !isNaN(num)
    );
  }
}
