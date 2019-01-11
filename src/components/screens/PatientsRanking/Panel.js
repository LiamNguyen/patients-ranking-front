import React from 'react';
import { object, array } from 'prop-types';
import _ from 'lodash';

import './style.css';
import Locale from './Locale';

const {
  text: { welcomingState, number }
} = Locale;

const Panel = ({
  className,
  inTreatment: { roomName, patient: inTreatmentPatient, rank: inTreatmentRank },
  waitingList
}) => (
  <div className={`panel-sub-container ${className}`}>
    <div className="panel-title">
      <div>
        <p className="room-number">{roomName}</p>
        <p className="welcoming">{welcomingState}</p>
        <p className="patient-name">{inTreatmentPatient}</p>
      </div>
      <div className="vertical-separator" />
      <div>
        <p className="number">{number}</p>
        <p className="patient-number">{inTreatmentRank}</p>
      </div>
    </div>
    <hr />
    <div className="patients">
      {!_.isEmpty(waitingList) &&
        waitingList.map((item, index) => {
          const {
            patients: { rank, patient }
          } = item;
          return <p key={index}>{`${rank}. ${patient}`}</p>;
        })}
    </div>
  </div>
);

Panel.propTypes = {
  inTreatment: object.isRequired,
  waitingList: array
};

Panel.defaultProps = {
  inTreatment: {
    roomName: '...',
    patient: '...',
    rank: '...'
  }
};

export default Panel;
