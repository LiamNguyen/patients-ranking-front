import reducer, { getInitialState } from '../../reducers/Sample';
import SampleConstants from '../../constants/SampleConstants';

const {
  SEND_SAMPLE_ACTION_REQUEST,
  SEND_SAMPLE_ACTION_SUCCESS,
  SEND_SAMPLE_ACTION_FAILURE
} = SampleConstants;

describe('Sample reducer', () => {
  const initialState = getInitialState();
  const initialStateWithError = {
    ...initialState,
    error: { error_message: 'some test error' }
  };
  const loadingStateWithError = {
    ...initialStateWithError,
    loading: true
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should handle ${SEND_SAMPLE_ACTION_REQUEST}`, () => {
    const action = {
      type: SEND_SAMPLE_ACTION_REQUEST
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
      sent: true
    });
  });

  it(`should handle ${SEND_SAMPLE_ACTION_SUCCESS}`, () => {
    const action = {
      type: SEND_SAMPLE_ACTION_SUCCESS
    };

    expect(reducer(loadingStateWithError, action)).toEqual({
      ...initialState,
      loading: false,
      received: true,
      error: {}
    });
  });

  it(`should hanlde ${SEND_SAMPLE_ACTION_FAILURE}`, () => {
    const anotherError = { error_message: 'another test error' };
    const action = {
      type: SEND_SAMPLE_ACTION_FAILURE,
      payload: anotherError
    };

    expect(reducer(loadingStateWithError, action)).toEqual({
      ...initialState,
      loading: false,
      received: true,
      error: anotherError
    });
  });
});
