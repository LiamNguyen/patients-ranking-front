import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Router, Route } from 'react-router-dom';
import Alert from 'react-s-alert';

import history from '../history';
import CustomAlertContent from '../components/common/CustomAlertContent';
import RoutePathConstants from '../constants/RoutePathConstants';
import LoadingOverlayContainer from '../containers/LoadingOverlayContainer';

const { ranking } = RoutePathConstants;

class App extends Component {
  componentDidMount() {
    // Sample action to be sent
    // this.props.sendSampleAction();
    if (history.location.pathname === '/') {
      history.push(`/${ranking}`);
    }
  }

  render() {
    return (
      <Router history={history}>
        <div className="app">
          <LoadingOverlayContainer />
          <Alert
            stack={false}
            position="top"
            effect="genie"
            timeout={5000}
            html={true}
            contentTemplate={CustomAlertContent}
          />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  sendSampleAction: PropTypes.func
};

export default App;
