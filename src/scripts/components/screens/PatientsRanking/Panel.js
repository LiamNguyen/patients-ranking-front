import React from 'react';
import { object, array, string, bool } from 'prop-types';
import _ from 'lodash';
import { TiArrowDownOutline } from 'react-icons/ti';

import './style.css';
import Locale from './Locale';

const {
  text: { welcomingState, number }
} = Locale;

const WaitingList = ({ list }) => (
  <div>
    {!_.isEmpty(list) &&
      list.map((item, index) => {
        const { rank, patient } = item;
        return <p key={index}>{`${rank}. ${patient}`}</p>;
      })}
  </div>
);

const Panel = ({
  className,
  inTreatment: {
    roomName,
    patient: inTreatmentPatient,
    rank: inTreatmentRank,
    oldRoom,
    oldRank
  },
  waitingList,
  isOneRoomLayout
}) => (
  <div
    className={`panel-sub-container ${
      isOneRoomLayout ? 'one-room-layout' : ''
    } ${className}`}
  >
    <div className="panel-title">
      <div>
        <p className="room-name">{roomName}</p>
        {oldRoom && (
          <div>
            <TiArrowDownOutline className="icon" fill="#ff1e82" />
            <p className="room-name">{oldRoom}</p>
          </div>
        )}
        <p className="welcoming">{welcomingState}</p>
        <p className="patient-name">{inTreatmentPatient}</p>
      </div>
      <div className="vertical-separator half-height" />
      <div>
        <p className="number">{number}</p>
        <p className="patient-number">{inTreatmentRank}</p>
        {oldRank && (
          <div>
            <TiArrowDownOutline className="icon" fill="#faff47" />
            <p className="patient-number">{oldRank}</p>
          </div>
        )}
      </div>
    </div>
    <hr />
    <div className={`patients ${isOneRoomLayout ? 'one-room-layout' : ''}`}>
      <WaitingList list={_.chunk(waitingList, 3)[0]} />
      <WaitingList list={_.chunk(waitingList, 3)[1]} />
    </div>
  </div>
);

Panel.propTypes = {
  inTreatment: object.isRequired,
  waitingList: array,
  className: string,
  isOneRoomLayout: bool
};

Panel.defaultProps = {
  inTreatment: {
    roomName: '...',
    patient: '...',
    rank: '...'
  },
  waitingList: [],
  className: ''
};

WaitingList.propTypes = {
  list: array
};

export default Panel;
