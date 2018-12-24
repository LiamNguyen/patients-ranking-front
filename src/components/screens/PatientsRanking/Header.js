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
  <div className="headerContainer">
    <div className="headerTitle">
      <img className="nancyLogo" src={NancyLogo} alt="" />
      <span>{headerTitle}</span>
      <img className="HTGSoftLogo" src={HTGSoftLogo} alt="" />
    </div>
    <div className="currentTime">{moment().format('HH:mm')}</div>
  </div>
);

export default Header;
