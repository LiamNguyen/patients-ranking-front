import SampleConstants from '../constants/SampleConstants';

const { SEND_SAMPLE_ACTION_REQUEST } = SampleConstants;

export const sendSampleAction = () => ({
  type: SEND_SAMPLE_ACTION_REQUEST
});

export default {
  sendSampleAction
};
