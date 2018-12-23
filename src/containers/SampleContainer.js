import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SampleScreen from '../components/screens/SampleScreen';
import SampleActions from '../actions/SampleActions';

function mapStateToProps(state) {
  return _.pick(state, ['Sample']);
}

function mapDispatchToProps(dispatch) {
  const actions = { ...SampleActions };
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleScreen);
