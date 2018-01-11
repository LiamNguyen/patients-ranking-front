import SlackConstants from '../constants/SlackConstants';

const {
  GET_USERS_LIST,
  SEND_INVITATION
} = SlackConstants;

export const getUsersList = () => ({
  type: `${GET_USERS_LIST}_REQUEST`
});

export const sendInvitation = (eventId, userIdsList) => ({
  type: `${SEND_INVITATION}_REQUEST`,
  payload: { eventId, userIdsList }
});

export default {
  getUsersList,
  sendInvitation
};