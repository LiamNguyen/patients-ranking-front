import _ from 'lodash';
import { connect } from 'react-redux';

import LoadingOverlay from '../components/common/LoadingOverlay';

function mapStateToProps(state) {
  const reducers = _.pick(state, [
    'User',
    'Event',
    'Slack'
  ]);
  return { loading: _.some(
    reducers,
    reducer =>
      !!reducer.loading ||
      !!reducer.getUserLoading ||
      !!reducer.getUserEventsLoading
  )};
}

export default connect(mapStateToProps)(LoadingOverlay);
