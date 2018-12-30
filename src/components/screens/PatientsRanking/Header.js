import React from 'react';
import moment from 'moment';

import './style.css';
import Locale from './Locale';
import NancyLogo from '../../../assets/images/logo_nancy.png';
import HTGSoftLogo from '../../../assets/images/logo_HTGSoft.png';

const {
  text: { headerTitle }
} = Locale;

const Header = () => (
  <div className="header-container">
    <div className="header-title">
      <img className="nancy-logo" src={NancyLogo} alt="" />
      <span>{headerTitle}</span>
      <img className="htgsoft-logo" src={HTGSoftLogo} alt="" />
    </div>
    <div className="current-time">{moment().format('HH:mm')}</div>
  </div>
);

export default Header;
