import { removeSpaceFromString } from '../lib/ConversionHelper';

export function isDataForFirstRoom(query, room) {
  const { firstRoom } = query;

  return firstRoom === removeSpaceFromString(room);
}
