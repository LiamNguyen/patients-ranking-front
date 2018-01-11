import { fork, all } from 'redux-saga/effects';

import { receiveSample } from './sample';

export default function* root() {
  yield all([
    fork(receiveSample)
  ]);
};