import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Router, Route } from 'react-router-dom';
import Alert from 'react-s-alert';

import history from '../history';
import SampleContainer from '../containers/SampleContainer';
import CustomAlertContent from '../components/common/CustomAlertContent';
import AuthedAppContainer from '../containers/AuthedAppContainer';
import RoutePathConstants from '../constants/RoutePathConstants';

const { sampleRoute } = RoutePathConstants;

class App extends Component {
  componentDidMount() {
    // Sample action to be sent
    // this.props.sendSampleAction();
    history.push(`/${sampleRoute}`);
  }

  render() {
    return (
      <Router history={history}>
        <div className="app">
          <Alert
            stack={false}
            position="top"
            effect="genie"
            timeout={5000}
            html={true}
            contentTemplate={CustomAlertContent}
          />
          <Switch>
            <Route
              exact
              path={`/${sampleRoute}`}
              component={SampleContainer}
            />
            <Route component={AuthedAppContainer} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  sendSampleAction: PropTypes.func
};

export default App;
