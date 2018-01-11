import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from '../components/App';
import SampleActions from '../actions/SampleActions';

function mapStateToProps(state) {
  return _.pick(state, ['Sample']);
}

function mapDispatchToProps(dispatch) {
  const actions = { ...SampleActions };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
