import _defaultTo from 'lodash/defaultTo';
import StorageFallback from './StorageFallback';

let sessionStorage;

export default {
  init(window) {
    let testKey = 'Glue';
    try {
      let sS = window.sessionStorage;
      sS.setItem(testKey, '1');
      sS.removeItem(testKey);
      sessionStorage = sS;
    } catch (error) {
      sessionStorage = new StorageFallback();
    }

    return sessionStorage;
  },

  set(key, val) {
    sessionStorage.setItem(key, JSON.stringify(val));
  },

  setToUser(key, val) {
    this.set(key, val);
  },

  get(key) {
    return JSON.parse(_defaultTo(sessionStorage.getItem(key), null));
  },

  getFromUser(key) {
    this.get(key);
  },

  remove(key) {
    sessionStorage.removeItem(key);
  },

  clear() {
    sessionStorage.clear();
  }
};
