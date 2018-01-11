import _isEmpty from 'lodash/isEmpty';
import LocalStorage from '../lib/LocalStorage';
import SessionStorage from '../lib/SessionStorage';

const KEY_TOKEN = 'token';
let username;

export default {
  reset() {
    LocalStorage.remove(KEY_TOKEN);
    SessionStorage.remove(KEY_TOKEN);
  },

  setToken(t, remember) {
    const storage = remember ? LocalStorage : SessionStorage;
    storage.set(KEY_TOKEN, t);
  },

  getToken() {
    return LocalStorage.get(KEY_TOKEN) || SessionStorage.get(KEY_TOKEN);
  },

  setUser(user) {
    username = user;
  },

  getUser() {
    return username;
  },

  isAuthorized() {
    return !_isEmpty(this.getToken());
  }
};
