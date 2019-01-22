import { fork, all } from 'redux-saga/effects';

import { getRanking } from './ranking';

export default function* root() {
  yield all([fork(getRanking)]);
}
