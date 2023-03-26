export default class AvatarHelper {
  static #DEFAULT_AVATARS = {
    'default-1':
      'https://firebasestorage.googleapis.com/v0/b/lightningcards-dev.appspot.com/o/avatars%2Favatar-1.svg?alt=media&token=4a1f3c2e-eaaf-4654-9300-11afa02b446f',
    'default-2':
      'https://firebasestorage.googleapis.com/v0/b/lightningcards-dev.appspot.com/o/avatars%2Favatar-2.svg?alt=media&token=728a1987-5133-4a08-af5d-5d2e2fc7fbbc',
    'default-3':
      'https://firebasestorage.googleapis.com/v0/b/lightningcards-dev.appspot.com/o/avatars%2Favatar-3.svg?alt=media&token=146001d5-4c8f-45a4-a429-aad6de57f318'
  };

  // Get random avatar
  static getRandom() {
    const DEFAULT_AVATARS = AvatarHelper.#DEFAULT_AVATARS;
    const AVATARS = Object.keys(DEFAULT_AVATARS).map(
      (props) => DEFAULT_AVATARS[props]
    );
    const RANDOM_IND = Math.floor(Math.random() * AVATARS.length); // 0 - 2
    return AVATARS[RANDOM_IND];
  }

  /*
   * =========================
   * Getters & Setters
   * =========================
   */

  static get getDefaultAvatars() {
    return AvatarHelper.#DEFAULT_AVATARS;
  }
}
