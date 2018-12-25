import React from 'react';
import { object, array } from 'prop-types';

import Locale from './Locale';

const {
  text: { welcomingState, number }
} = Locale;

const Panel = ({
  inTreatment: {
    roomNumber,
    patient: inTreatmentPatient,
    rank: inTreatmentRank
  },
  waitingList
}) => (
  <div className="panel-sub-container">
    <div className="panel-title">
      <div>
        <p className="room-number">{roomNumber}</p>
        <p className="welcomingState">{welcomingState}</p>
        <p className="patientName">{inTreatmentPatient}</p>
      </div>
      <div>
        <p className="number">{number}</p>
        <p className="patientNumber">{inTreatmentRank}</p>
      </div>
    </div>
    <hr />
    <div className="patients">
      {waitingList.map(item => {
        const { rank, patient } = item;
        return <p key={rank}>{`${rank}. ${patient}`}</p>;
      })}
    </div>
  </div>
);

Panel.propTypes = {
  inTreatment: object.isRequired,
  waitingList: array.isRequired
};

export default Panel;
