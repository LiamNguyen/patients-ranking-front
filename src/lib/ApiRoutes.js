import config from '../config';

export default {
  get base() {
    return config.apiHost;
  },

  getEvents() {
    return `${this.base}/events`;
  },

  getUserEvents(userId) {
    return `${this.base}/user/${userId}/events`;
  },

  addUserEvent(userId, eventId) {
    return `${this.base}/user/${userId}/event/${eventId}`;
  },

  removeUserEvent(userId, eventId) {
    return `${this.base}/user/${userId}/event/${eventId}`;
  },

  createEvent(userId) {
    return `${this.base}/event/${userId}`;
  }
}