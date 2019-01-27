import React, { Component } from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SocketIOClient from 'socket.io-client';
import queryString from 'query-string';
import moment from 'moment';

import './style.css';
import Header from './Header';
import Footer from './Footer';
import RankingActions from '../../../actions/RankingActions';
import { refreshRankingDisplay } from '../../../constants/SocketIOListenerConstants';
import config from '../../../config';
import { removeSpaceFromString } from '../../../lib/ConversionHelper';
import {
  isDataForFirstRoom,
  isOneRoomLayout
} from '../../../presenters/PatientsRankingPresenter';
import LocalStorage from '../../../lib/LocalStorage';
import PatientsNameAndRank from './PatientsNameAndRank';
import WaitingList from './WaitingList';

const MAX_WAITING_PATIENTS = 6;
const STORAGE_KEY = 'ranking';
const VALIDITY_KEY = 'validity';
const DATE_FORMAT = 'YYYY-MM-DD';
const INITIAL_RANKING_STATE = {
  room: '',
  inTreatment: {},
  missedTurn: { firstRoom: [], secondRoom: [] },
  waitingList: { firstRoom: [], secondRoom: [] }
};

class PatientsRanking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: queryString.parse(props.location.search),
      ...INITIAL_RANKING_STATE
    };
    this.socket = SocketIOClient(config.apiHost);
  }

  componentDidMount() {
    this.handleRefreshRankingDisplay();
    this.retrieveRankingStateFromStoreIfNeeded();
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  handleRefreshRankingDisplay = () => {
    this.socket.on(refreshRankingDisplay, newRanking => {
      const {
        query: { firstRoom, secondRoom },
        query,
        missedTurn
      } = this.state;
      const { room, missedTurn: newMissedTurn } = newRanking;
      const spaceRemovedRoom = removeSpaceFromString(room);

      if ([firstRoom, secondRoom].includes(spaceRemovedRoom)) {
        const storingMissedTurn = _.cloneDeep(missedTurn);

        _.set(
          storingMissedTurn,
          isDataForFirstRoom(query, room) ? 'firstRoom' : 'secondRoom',
          newMissedTurn || []
        );
        this.setState({
          room: spaceRemovedRoom,
          missedTurn: storingMissedTurn
        });

        this.setInTreatmentData(newRanking);
        this.setWaitingListData(newRanking);
      }
      this.storeCurrentRankingState();
    });
  };

  setInTreatmentData(newRanking) {
    const { room, inTreatment: newInTreatment } = newRanking;
    const { query, inTreatment } = this.state;
    const storingInTreatment = _.cloneDeep(inTreatment);

    newInTreatment['roomName'] = room;
    _.set(
      storingInTreatment,
      isDataForFirstRoom(query, room) ? 'firstRoom' : 'secondRoom',
      newInTreatment
    );

    this.setState({ inTreatment: storingInTreatment });
  }

  setWaitingListData(newRanking) {
    const { room, waitingList: newWaitingList } = newRanking;
    const sortedNewWaitingList = _.sortBy(newWaitingList, 'rank');
    const { query, waitingList } = this.state;
    const storingWaitingList = _.cloneDeep(waitingList);

    _.set(
      storingWaitingList,
      isDataForFirstRoom(query, room) ? 'firstRoom' : 'secondRoom',
      sortedNewWaitingList
    );

    this.setState({ waitingList: { ...storingWaitingList } });
  }

  getDisplayWaitingList(currentRoom, theOtherRoom) {
    const {
      query: { secondRoom }
    } = this.state;

    if (isOneRoomLayout(secondRoom)) return currentRoom;
    if (_.isEmpty(currentRoom)) return theOtherRoom;

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

  storeCurrentRankingState() {
    setTimeout(() => {
      const rankingToBeStored = { ...this.state };

      delete rankingToBeStored['query'];
      rankingToBeStored[VALIDITY_KEY] = moment().format(DATE_FORMAT);
      LocalStorage.set(STORAGE_KEY, rankingToBeStored);
    }, 1000);
  }

  retrieveRankingStateFromStoreIfNeeded() {
    const rankingFromStore = LocalStorage.get(STORAGE_KEY);
    const currentRankingState = { ...this.state };

    delete currentRankingState['query'];

    if (rankingFromStore === null) return;
    if (
      moment(rankingFromStore.validity).isAfter(moment().format(DATE_FORMAT))
    ) {
      LocalStorage.remove(STORAGE_KEY);
      return;
    }
    if (_.isEqual(currentRankingState, INITIAL_RANKING_STATE)) {
      const { inTreatment, missedTurn, room, waitingList } = rankingFromStore;
      this.setState({ inTreatment, missedTurn, room, waitingList });
    }
  }

  render() {
    const {
      query,
      query: { headerTitle, footerTitle, secondRoom: secondRoomFromQuery },
      room,
      inTreatment: { firstRoom, secondRoom },
      waitingList: {
        firstRoom: firstRoomWaitingList,
        secondRoom: secondRoomWaitingList
      },
      missedTurn: {
        firstRoom: firstMissedTurnRoom,
        secondRoom: secondMissedTurnRoom
      }
    } = this.state;
    let listToDisplay = _.isEmpty(room)
      ? []
      : isDataForFirstRoom(query, room)
      ? this.getDisplayWaitingList(firstRoomWaitingList, secondRoomWaitingList)
      : this.getDisplayWaitingList(secondRoomWaitingList, firstRoomWaitingList);

    return (
      <div className="ranking-screen">
        <Header headerTitle={headerTitle} />
        <hr />
        <div className="panel-container">
          <div className="patients-name-and-rank">
            <PatientsNameAndRank
              className={`section left ${
                isOneRoomLayout(secondRoomFromQuery) ? 'one-room-layout' : ''
              }`}
              inTreatment={firstRoom}
            />
            {!isOneRoomLayout(secondRoomFromQuery) && (
              <div className="vertical-separator" />
            )}
            {!isOneRoomLayout(secondRoomFromQuery) && (
              <PatientsNameAndRank
                className="section right"
                inTreatment={secondRoom}
              />
            )}
          </div>
          <hr />
          <div className="waiting-list">
            <WaitingList
              className={`section left ${
                listToDisplay.length > 3 ? '' : 'align-center'
              }`}
              list={_.chunk(listToDisplay, 3)[0]}
            />
            {listToDisplay.length > 3 && (
              <WaitingList
                className="section right"
                list={_.chunk(listToDisplay, 3)[1]}
              />
            )}
          </div>
        </div>
        <hr />
        <Footer
          footerTitle={footerTitle}
          firstRoom={firstRoom}
          firstMissedTurnRoom={firstMissedTurnRoom}
          secondRoom={secondRoom}
          secondMissedTurnRoom={secondMissedTurnRoom}
        />
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['Ranking']),
  dispatch => bindActionCreators({ ...RankingActions }, dispatch)
)(PatientsRanking);
