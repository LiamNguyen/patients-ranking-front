import React, { Component } from 'react';
import moment from 'moment';
import { string } from 'prop-types';

import './style.css';
import Locale from './Locale';
import NancyLogo from '../../../assets/images/logo_nancy.png';
import HTGSoftLogo from '../../../assets/images/logo_HTGSoft.png';

const {
  text: { headerTitleDefault }
} = Locale;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format('HH:mm:ss')
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: moment().format('HH:mm:ss')
      });
    }, 1000);
  }

  render() {
    const { headerTitle } = this.props;

    return (
      <div className="header-container">
        <div className="header-title">
          <img className="nancy-logo" src={NancyLogo} alt="" />
          <span>{headerTitle}</span>
          <img className="htgsoft-logo" src={HTGSoftLogo} alt="" />
        </div>
        <div className="current-time">{this.state.time}</div>
      </div>
    );
  }
}

Header.propTypes = {
  headerTitle: string
};

Header.defaultProps = {
  headerTitle: headerTitleDefault
};

export default Header;
