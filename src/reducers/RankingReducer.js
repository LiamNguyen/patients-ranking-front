import createReducer from '../lib/utils/CreateReducer';
import RankingConstants from '../constants/RankingConstants';

const { GET_RANKING } = RankingConstants;

export const getInitialState = () => ({
  loading: false,
  error: {},
  ranking: {
    inTreatment: [
      {
        roomNumber: '03',
        patient: 'Nguyen Thien Phuc',
        rank: '001'
      },
      {
        roomNumber: '...',
        patient: '...',
        rank: '...'
      }
    ],
    waitingList: [
      {
        rank: '003',
        patient: 'Nguyen Thi Minh Khai'
      },
      {
        rank: '004',
        patient: 'Nam Ky Khoi Nghia'
      },
      {
        rank: '005',
        patient: 'Cach Mang Thang 8'
      },
      {
        rank: '...',
        patient: '...'
      },
      {
        rank: '...',
        patient: '...'
      },
      {
        rank: '...',
        patient: '...'
      }
    ]
  }
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
