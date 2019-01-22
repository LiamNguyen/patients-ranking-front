import { takeEvery, put, call } from 'redux-saga/effects';

import RankingConstants from '../constants/RankingConstants';
import RankingRepository from '../repositories/RankingRepository';

const { GET_RANKING } = RankingConstants;

export function* getRanking() {
  yield takeEvery(`${GET_RANKING}_REQUEST`, function*() {
    try {
      const ranking = yield call(RankingRepository.getRanking);

      yield put({
        type: `${GET_RANKING}_SUCCESS`,
        payload: ranking
      });
    } catch (errors) {
      yield put({
        type: `${GET_RANKING}_FAILURE`,
        payload: errors
      });
    }
  });
}
