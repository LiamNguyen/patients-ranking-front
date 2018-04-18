import createReducer from '../lib/utils/CreateReducer';
import SampleConstants from '../constants/SampleConstants';

const {
  SEND_SAMPLE_ACTION_REQUEST,
  SEND_SAMPLE_ACTION_SUCCESS,
  SEND_SAMPLE_ACTION_FAILURE
} = SampleConstants;

export const getInitialState = () => ({
  loading: false,
  sent: false,
  received: false,
  error: {}
});

export default createReducer(getInitialState, {
  [SEND_SAMPLE_ACTION_REQUEST]: () => ({
    loading: true,
    sent: true
  }),
  [SEND_SAMPLE_ACTION_SUCCESS]: () => ({
    loading: false,
    received: true,
    error: {}
  }),
  [SEND_SAMPLE_ACTION_FAILURE]: (state, { payload: error }) => ({
    loading: false,
    received: true,
    error
  })
});
