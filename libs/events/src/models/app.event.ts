export abstract class AppEvent {
  toString() {
    return JSON.stringify(this);
  }
}
