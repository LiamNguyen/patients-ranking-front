import RankingConstants from '../constants/RankingConstants';

const { GET_RANKING } = RankingConstants;

export const getRanking = () => ({
  type: `${GET_RANKING}_REQUEST`
});

export default {
  getRanking
};
