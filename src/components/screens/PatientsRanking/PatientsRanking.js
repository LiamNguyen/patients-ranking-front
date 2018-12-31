import React, { Component } from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SocketIOClient from 'socket.io-client';

import './style.css';
import Locale from './Locale';
import Header from './Header';
import Panel from './Panel';
import RankingActions from '../../../actions/RankingActions';
import { refreshRankingDisplay } from '../../../constants/SocketIOListenerConstants';
import config from '../../../config';

class PatientsRanking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: {
        inTreatment: [
          {
            roomNumber: '...',
            patient: '...',
            rank: '...'
          },
          {
            roomNumber: '...',
            patient: '...',
            rank: '...'
          }
        ],
        waitingList: [
          {
            rank: '...',
            patient: '...'
          },
          {
            rank: '...',
            patient: '...'
          },
          {
            rank: '...',
            patient: '...'
          },
          {
            rank: '...',
            patient: '...'
          },
          {
            rank: '...',
            patient: '...'
          },
          {
            rank: '...',
            patient: '...'
          }
        ]
      }
    };
    this.socket = SocketIOClient(config.apiHost);
  }

  componentDidMount() {
    this.socket.on(refreshRankingDisplay, ranking => {
      this.setState({ ranking });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    const {
      ranking: { inTreatment, waitingList }
    } = this.state;

    return (
      <div className="ranking-screen">
        <Header />
        <hr />
        {inTreatment &&
          waitingList && (
            <div className="panel-container">
              <Panel
                className="left-panel-sub-container"
                inTreatment={inTreatment[0]}
                waitingList={_.chunk(waitingList, 3)[0]}
              />
              <div className="vertical-separator" />
              <Panel
                className="right-panel-sub-container"
                inTreatment={inTreatment[1]}
                waitingList={_.chunk(waitingList, 3)[1]}
              />
            </div>
          )}
        <hr />
        <div className="footer">{Locale.text.footerTitle}</div>
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['Ranking']),
  dispatch => bindActionCreators({ ...RankingActions }, dispatch)
)(PatientsRanking);
