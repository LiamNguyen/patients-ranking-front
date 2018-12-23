import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthedApp from '../components/AuthedApp';
import SampleActions from '../actions/SampleActions';

function mapStateToProps(state) {
  return _.pick(state, ['User']);
}

function mapDispatchToProps(dispatch) {
  const actions = { ...SampleActions };
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthedApp);
