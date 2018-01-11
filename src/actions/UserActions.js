import UserConstants from '../constants/UserConstants';

const {
  GET_USER,
  GET_USER_EVENTS,
  ADD_USER_EVENT,
  REMOVE_USER_EVENT,
  LOGOUT
} = UserConstants;

export const getUser = () => ({
  type: `${GET_USER}_REQUEST`
});

export const getUserEvents = () => ({
  type: `${GET_USER_EVENTS}_REQUEST`,
  payload: { userId: null }
});

export const userJoinEvent = eventId => ({
  type: `${ADD_USER_EVENT}_REQUEST`,
  payload: { eventId }
});

export const cancelEvent = eventId => ({
  type: `${REMOVE_USER_EVENT}_REQUEST`,
  payload: { eventId }
});

export const logout = () => ({
  type: `${LOGOUT}`
});

export default {
  getUser,
  getUserEvents,
  userJoinEvent,
  cancelEvent,
  logout
};
