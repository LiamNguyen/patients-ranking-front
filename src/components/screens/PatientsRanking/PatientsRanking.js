import React, { Component } from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SocketIOClient from 'socket.io-client';
import queryString from 'query-string';

import './style.css';
import Locale from './Locale';
import Header from './Header';
import Panel from './Panel';
import RankingActions from '../../../actions/RankingActions';
import { refreshRankingDisplay } from '../../../constants/SocketIOListenerConstants';
import config from '../../../config';
import { changeForm } from '../../../lib/ComponentHelper';
import { removeSpaceFromString } from '../../../lib/ConversionHelper';

class PatientsRanking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: queryString.parse(props.location.search),
      ranking: {
        inTreatment: {},
        waitingList: []
      }
    };
    this.socket = SocketIOClient(config.apiHost);
  }

  componentDidMount() {
    this.socket.on(refreshRankingDisplay, newRanking => {
      const {
        query: { firstRoom, secondRoom }
      } = this.state;
      const { room } = newRanking;
      const spaceRemovedRoom = removeSpaceFromString(room);

      if ([firstRoom, secondRoom].includes(spaceRemovedRoom)) {
        this.setInTreatmentData(newRanking, spaceRemovedRoom);
      }
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  setInTreatmentData(newRanking, spaceRemovedRoom) {
    const { room, inTreatment } = newRanking;
    const {
      query: { firstRoom }
    } = this.state;
    const { ranking } = this.state;
    const fieldToModify =
      firstRoom === spaceRemovedRoom
        ? 'inTreatment.firstRoom'
        : 'inTreatment.secondRoom';

    inTreatment['roomName'] = room;
    changeForm(ranking, fieldToModify, inTreatment, ranking => {
      this.setState({ ranking });
    });
  }

  render() {
    const {
      ranking: {
        inTreatment: { firstRoom, secondRoom },
        waitingList
      }
    } = this.state;

    return (
      <div className="ranking-screen">
        <Header />
        <hr />
        {
          <div className="panel-container">
            <Panel
              className="left-panel-sub-container"
              inTreatment={firstRoom}
              waitingList={_.chunk(waitingList, 3)[0]}
            />
            <div className="vertical-separator" />
            <Panel
              className="right-panel-sub-container"
              inTreatment={secondRoom}
              waitingList={_.chunk(waitingList, 3)[1]}
            />
          </div>
        }
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
