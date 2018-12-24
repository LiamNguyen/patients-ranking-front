import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Router, Route } from 'react-router-dom';
import Alert from 'react-s-alert';

import history from '../history';
import CustomAlertContent from '../components/common/CustomAlertContent';
import RoutePathConstants from '../constants/RoutePathConstants';
import PatientsRanking from './screens/PatientsRanking';

const { ranking } = RoutePathConstants;

class App extends Component {
  componentDidMount() {
    // Sample action to be sent
    // this.props.sendSampleAction();
    history.push(`/${ranking}`);
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
            <Route exact path={`/${ranking}`} component={PatientsRanking} />
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
