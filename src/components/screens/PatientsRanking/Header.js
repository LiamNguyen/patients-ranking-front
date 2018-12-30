import React, { Component } from 'react';
import moment from 'moment';

import './style.css';
import Locale from './Locale';
import NancyLogo from '../../../assets/images/logo_nancy.png';
import HTGSoftLogo from '../../../assets/images/logo_HTGSoft.png';

const {
  text: { headerTitle }
} = Locale;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format('HH:mm')
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: moment().format('HH:mm')
      });
    }, 1000);
  }

  render() {
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

export default Header;
