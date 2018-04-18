import React, { Component } from 'react';

import './style.css';
import Locale from './Locale';
import AuthInfoManager from '../../../lib/AuthInfoManager';
import RoutePathConstants from '../../../constants/RoutePathConstants';

const { sampleRoute } = RoutePathConstants;

class SampleScreen extends Component {
  constructor(props) {
    super(props);

    if (AuthInfoManager.isAuthorized())
      this.props.history.push(`/${sampleRoute}`);
  }

  render() {
    return <p>{Locale.text.title}</p>;
  }
}

export default SampleScreen;
