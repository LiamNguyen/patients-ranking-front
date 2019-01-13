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
import { isDataForFirstRoom } from '../../../presenters/PatientsRankingPresenter';

const MAX_WAITING_PATIENTS = 6;

class PatientsRanking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: queryString.parse(props.location.search),
      ranking: {
        room: '',
        inTreatment: {},
        waitingList: { firstRoom: [], secondRoom: [] }
      }
    };
    this.socket = SocketIOClient(config.apiHost);
  }

  componentDidMount() {
    this.socket.on(refreshRankingDisplay, newRanking => {
      const {
        ranking,
        query: { firstRoom, secondRoom }
      } = this.state;
      const { room } = newRanking;
      const spaceRemovedRoom = removeSpaceFromString(room);

      if ([firstRoom, secondRoom].includes(spaceRemovedRoom)) {
        changeForm(ranking, 'room', spaceRemovedRoom, ranking => {
          this.setState({ ranking });
        });
        this.setInTreatmentData(newRanking);
        this.setWaitingListData(newRanking);
      }
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  setInTreatmentData(newRanking) {
    const { room, inTreatment } = newRanking;
    const { query } = this.state;
    const { ranking } = this.state;
    const fieldToModify = isDataForFirstRoom(query, room)
      ? 'inTreatment.firstRoom'
      : 'inTreatment.secondRoom';

    inTreatment['roomName'] = room;
    changeForm(ranking, fieldToModify, inTreatment, ranking => {
      this.setState({ ranking });
    });
  }

  setWaitingListData(newRanking) {
    const { room, waitingList } = newRanking;
    const sortedNewWaitingList = _.sortBy(waitingList, 'rank');
    const { query, ranking } = this.state;
    const fieldToModify = isDataForFirstRoom(query, room)
      ? 'waitingList.firstRoom'
      : 'waitingList.secondRoom';

    changeForm(ranking, fieldToModify, sortedNewWaitingList, ranking => {
      this.setState({ ranking });
    });
  }

  getDisplayWaitingList(currentRoom, theOtherRoom) {
    if (_.isEmpty(currentRoom)) {
      return theOtherRoom;
    }
    if (theOtherRoom.length > 3) {
      const currentRoomToDisplay = _.chunk(currentRoom, 3)[0];
      const theOtherRoomToDisplay = _.chunk(
        theOtherRoom,
        MAX_WAITING_PATIENTS - currentRoomToDisplay.length
      )[0];

      return _.sortBy(
        _.concat(currentRoomToDisplay, theOtherRoomToDisplay),
        'rank'
      );
    } else {
      const currentRoomToDisplay = _.chunk(
        currentRoom,
        MAX_WAITING_PATIENTS - theOtherRoom.length
      )[0];

      return _.sortBy(_.concat(currentRoomToDisplay, theOtherRoom), 'rank');
    }
  }

  render() {
    const {
      query,
      query: { headerTitle, footerTitle, secondRoom: secondRoomFromQuery },
      ranking: {
        room,
        inTreatment: { firstRoom, secondRoom },
        waitingList: {
          firstRoom: firstRoomWaitingList,
          secondRoom: secondRoomWaitingList
        }
      }
    } = this.state;
    let listToDisplay = _.isEmpty(room)
      ? []
      : isDataForFirstRoom(query, room)
        ? this.getDisplayWaitingList(
            firstRoomWaitingList,
            secondRoomWaitingList
          )
        : this.getDisplayWaitingList(
            secondRoomWaitingList,
            firstRoomWaitingList
          );
    const isOneRoomLayout = typeof secondRoomFromQuery === 'undefined';

    return (
      <div className="ranking-screen">
        <Header headerTitle={headerTitle} />
        <hr />
        <div className="panel-container">
          <Panel
            className="left-panel-sub-container"
            inTreatment={firstRoom}
            waitingList={
              isOneRoomLayout ? listToDisplay : _.chunk(listToDisplay, 3)[0]
            }
            isOneRoomLayout={isOneRoomLayout}
          />
          {!isOneRoomLayout && <div className="vertical-separator" />}
          {!isOneRoomLayout && (
            <Panel
              className="right-panel-sub-container"
              inTreatment={secondRoom}
              waitingList={_.chunk(listToDisplay, 3)[1]}
            />
          )}
        </div>
        <hr />
        <div className="footer">{footerTitle || Locale.text.footerTitle}</div>
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['Ranking']),
  dispatch => bindActionCreators({ ...RankingActions }, dispatch)
)(PatientsRanking);
