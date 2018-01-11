import WelcomeScreenConstants from '../constants/WelcomeScreenConstants';

const {
  EXCHANGE_CODE_FOR_TOKEN
} = WelcomeScreenConstants;

export const exchangeCodeForToken = code => ({
  type: `${EXCHANGE_CODE_FOR_TOKEN}_REQUEST`,
  payload: { code }
});

export default {
  exchangeCodeForToken
};