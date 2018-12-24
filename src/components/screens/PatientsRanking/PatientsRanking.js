import React, { Component } from 'react';

import './style.css';
import Locale from './Locale';
import Header from './Header';
import Panel from './Panel';

class PatientsRanking extends Component {
  render() {
    return (
      <div className="rankingScreen">
        <Header />
        <hr />
        <div className="panelContainer">
          <Panel />
          <Panel />
        </div>
        <hr />
        <div className="footer">{Locale.text.footerTitle}</div>
      </div>
    );
  }
}

export default PatientsRanking;
