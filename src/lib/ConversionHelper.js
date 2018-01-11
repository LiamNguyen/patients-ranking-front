import _ from 'lodash';

export default {
  convertEventsObjectToArray(eventsObject) {
    let eventsArray = [];
    for (var key in eventsObject) {
      if (eventsObject.hasOwnProperty(key)) {
        eventsObject[key]['id'] = key
        eventsArray.push(eventsObject[key]);
      }
    }
    eventsArray = _.sortBy(eventsArray, ['startDate', 'startTime']);
    return eventsArray;
  }
}