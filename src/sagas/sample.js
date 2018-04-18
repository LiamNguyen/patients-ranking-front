import { takeEvery, put, call } from 'redux-saga/effects';

import SampleConstants from '../constants/SampleConstants';
import SampleRepository from '../repositories/SampleRepository';

const {
  SEND_SAMPLE_ACTION_REQUEST,
  SEND_SAMPLE_ACTION_SUCCESS,
  SEND_SAMPLE_ACTION_FAILURE
} = SampleConstants;

export function* receiveSample() {
  yield takeEvery(SEND_SAMPLE_ACTION_REQUEST, function*() {
    try {
      const sampleJson = yield call(SampleRepository.getSampleJson);
      console.log(sampleJson);
      yield put({
        type: SEND_SAMPLE_ACTION_SUCCESS
      });
    } catch (error) {
      yield put({
        type: SEND_SAMPLE_ACTION_FAILURE,
        payload: error
      });
      throw error;
    }
  });
}
