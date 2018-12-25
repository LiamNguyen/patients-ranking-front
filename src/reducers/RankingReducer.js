import createReducer from '../lib/utils/CreateReducer';
import RankingConstants from '../constants/RankingConstants';

const { GET_RANKING } = RankingConstants;

export const getInitialState = () => ({
  loading: false,
  error: {},
  ranking: {}
});

export default createReducer(getInitialState, {
  [`${GET_RANKING}_REQUEST`]: () => ({
    loading: true,
    error: {}
  }),
  [`${GET_RANKING}_SUCCESS`]: (state, { payload: ranking }) => ({
    loading: false,
    ranking
  }),
  [`${GET_RANKING}_FAILURE`]: (state, { payload: error }) => ({
    loading: false,
    error
  })
});
