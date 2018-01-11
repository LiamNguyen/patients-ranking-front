export default class StorageFallback {
  constructor() {
    this.data = {};
  }

  get fallback() {
    return true;
  }

  setItem(key, value) {
    this.data[key] = value;
  }

  getItem(key) {
    return this.data[key];
  }

  removeItem(key) {
    this.data[key] = null;
  }

  clear() {
    this.data = {};
  }
}
