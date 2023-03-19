export default class ArrayHelper {
  // Checks if a property exists in an array of object
  static isPropExist(arr, prop) {
    return arr.findIndex((obj) => prop in obj);
  }
}
