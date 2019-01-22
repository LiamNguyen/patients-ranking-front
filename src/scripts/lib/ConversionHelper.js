import _ from 'lodash';

export function convertEventsObjectToArray(eventsObject) {
  let eventsArray = [];
  for (let key in eventsObject) {
    if (eventsObject.hasOwnProperty(key)) {
      eventsObject[key]['id'] = key;
      eventsArray.push(eventsObject[key]);
    }
  }
  eventsArray = _.sortBy(eventsArray, ['startDate', 'startTime']);
  return eventsArray;
}

export function removeSpaceFromString(string) {
  const split = string.split(' ');
  return split.join('');
}
