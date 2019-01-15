import { removeSpaceFromString } from '../lib/ConversionHelper';

export function isDataForFirstRoom(query, room) {
  const { firstRoom } = query;

  return firstRoom === removeSpaceFromString(room);
}

export function isOneRoomLayout(secondRoomFromQuery) {
  return typeof secondRoomFromQuery === 'undefined';
}
