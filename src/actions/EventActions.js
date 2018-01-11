import EventConstants from '../constants/EventConstants';

const {
  GET_EVENTS,
  CREATE_EVENT,
  PUT_RECREATE_EVENT,
  CLEAR_RECREATE_EVENT,
  NEW_EVENT_CREATED,
  RESET_NEW_EVENT_CREATED
} = EventConstants;

export const getEvents = () => ({
  type: `${GET_EVENTS}_REQUEST`,
  payload: { userEventsArray: null }
});

export const createEvent = options => ({
  type: `${CREATE_EVENT}_REQUEST`,
  payload: { options }
});

export const putRecreateEvent = event => ({
  type: PUT_RECREATE_EVENT,
  payload: { event }
});

export const clearRecreateEvent = () => ({
  type: CLEAR_RECREATE_EVENT
});

export const putNewEventCreatedNotification = eventId => ({
  type: NEW_EVENT_CREATED,
  payload: { eventId }
});

export const resetNewEventCreatedNotification = () => ({
  type: RESET_NEW_EVENT_CREATED
});

export default {
  getEvents,
  createEvent,
  putRecreateEvent,
  clearRecreateEvent,
  putNewEventCreatedNotification,
  resetNewEventCreatedNotification
};