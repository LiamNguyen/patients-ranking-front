import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Alert from 'react-s-alert';

import RoutePathConstants from '../constants/RoutePathConstants';
import AuthInfoManager from '../lib/AuthInfoManager';

const { home } = RoutePathConstants;
const Locale = {
  text: {
    not_authorize: 'Not authorized'
  }
};

class AuthedApp extends Component {
  componentDidMount() {
    const pathname = this.props.location.pathname;

    if (!AuthInfoManager.isAuthorized() && pathname !== '/') {
      this.props.history.push('/');
      Alert.error(Locale.text.not_authorize);
    }
  }

  render() {
    return (
      <div className="screen-container">
        <div className="screen-content">
          <Route
            exact
            path={`/${home}`}
            render={() => <p>This is sampleRoute</p>}
          />
        </div>
      </div>
    );
  }
}

export default AuthedApp;
