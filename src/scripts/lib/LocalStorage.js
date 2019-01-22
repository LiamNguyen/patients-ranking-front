import _get from 'lodash/get';
import _set from 'lodash/set';
import _defaultTo from 'lodash/defaultTo';
import md5 from 'md5';
import SessionStorage from './SessionStorage';
import AuthInfoManager from './AuthInfoManager';

let localStorage;
let supported = true;

export default {
  init(window) {
    let testKey = 'Glue';
    try {
      let ls = window.localStorage;
      ls.setItem(testKey, '1');
      ls.removeItem(testKey);
      localStorage = ls;
    } catch (error) {
      supported = false;
      localStorage = SessionStorage.init(window);
    }
  },

  isSupported() {
    return supported;
  },

  initUserObject(name) {
    const key = `storage_${md5(name)}`;
    const storage = _defaultTo(localStorage.getItem(key), {});
    localStorage.setItem(key, JSON.stringify(storage));
  },

  getUserKey() {
    const name = AuthInfoManager.getUser();
    return name ? `storage_${md5(name)}` : null;
  },

  getUserObject() {
    const key = this.getUserKey();
    let result;
    if (key) {
      result = {
        key: key,
        val: _defaultTo(this.get(key), {})
      };
    }
    return result;
  },

  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },

  setToUser(key, val) {
    let userObj = this.getUserObject();
    if (userObj) {
      _set(userObj.val, key, val);
      localStorage.setItem(userObj.key, JSON.stringify(userObj.val));
    } else {
      SessionStorage.set(key, val);
    }
  },

  get(key) {
    return JSON.parse(_defaultTo(localStorage.getItem(key), null));
  },

  getFromUser(key) {
    let result;
    const userObj = this.getUserObject();

    if (userObj) {
      result = _get(userObj, `val[${key}]`);
      if (!result) {
        result = this.backwardsCompatibility(key);
      }
    } else {
      result = SessionStorage.get(key);
    }

    return result;
  },

  backwardsCompatibility(key) {
    let val = this.get(key);
    if (val) {
      this.setToUser(key, val);
    }
    this.remove(key);
    return val;
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};
