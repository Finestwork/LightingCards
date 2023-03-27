export default class DocumentTitleHelper {
  static intro() {
    document.title = 'Welcome to LightningCards!';
  }

  static pageNotFound() {
    document.title = 'Page Not Found';
  }

  static createSet() {
    document.title = 'Creating A Set';
  }

  static auth(path) {
    document.title =
      path === 'Login' ? 'Login to LightningCards' : 'Signup to LightningCards';
  }

  static testFeature() {
    document.title = 'Creating Test Sets';
  }

  static playingTestFeature() {
    document.title = 'Playing Test Sets';
  }

  static profileSettings() {
    document.title = 'Profile Settings';
  }

  static retrievingSets() {
    document.title = 'Retrieving a set, please wait.';
  }

  static setRetrieved(setTitle) {
    document.title = `Reviewing: ${setTitle}`;
  }

  static editSet(setTitle) {
    document.title = `Editing: ${setTitle}`;
  }
}
