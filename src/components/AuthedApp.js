import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Alert from 'react-s-alert';

import RoutePathConstants from '../constants/RoutePathConstants';
import AuthInfoManager from '../lib/AuthInfoManager';

const { sampleRoute } = RoutePathConstants;
const Locale = {
  text: {
    not_authorize: 'Not authorized'
  }
}

class AuthedApp extends Component {
	componentDidMount() {
		const pathname = this.props.location.pathname;

		if (!AuthInfoManager.isAuthorized() && pathname !== '/') {
			this.props.history.push('/');
			Alert.error(Locale.text.not_authorize);
    }
  }

  componentWillReceiveProps(props) {
    const { location: { pathname: oldPath } } = this.props;
    const { location: { pathname: newPath } } = props;
    if (newPath !== '/' && newPath !== oldPath) {
      this.handleNavigate(newPath);
    }
  }

  getCurrentTabKey = pathname => {
    switch(pathname) {
      case `/${sampleRoute}`:
        return 0;
      default:
        return 0;
    }
  }

  handleChangeTab = (tabKey, pathname) => {
    this.setState({ currentTabKey: tabKey });
    this.handleNormalRoute(tabKey);
  };

  handleNormalRoute(tabKey) {
    const { history } = this.props;
    switch(tabKey) {
      case 0:
        history.push(`/${sampleRoute}`);
        break;
      default:
        history.push(`/${sampleRoute}`);
    }
  }

  handleNavigate = pathname => {
    const tabKey = this.getCurrentTabKey(pathname);
    this.handleChangeTab(tabKey, pathname);
  };

  render() {
    return (
      <div className="screen-container">
        <div className="screen-content">
          <Route
            exact
            path={`/${sampleRoute}`}
            render={
              () => <p>This is sampleRoute</p>}
            />
        </div>
      </div>
    );
  }
}

export default AuthedApp;