import React from 'react';
import { TiArrowDownOutline } from 'react-icons/ti';
import { array, bool, object, string } from 'prop-types';

import './style.css';
import Locale from './Locale';

const {
  text: { welcomingState, number }
} = Locale;

const PatientsNameAndRank = ({
  className,
  inTreatment: {
    roomName,
    patient: inTreatmentPatient,
    rank: inTreatmentRank,
    oldRoom,
    oldRank
  }
}) => (
  <div className={className}>
    <div className="sub-section left">
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
    <div className="sub-section right">
      <p className="number">{number}</p>
      <p className="patient-number">{inTreatmentRank}</p>
      {oldRank && (
        <div>
          <TiArrowDownOutline className="icon" fill="#faff47" />
          <p className="patient-number change-room">{oldRank}</p>
        </div>
      )}
    </div>
  </div>
);

PatientsNameAndRank.propTypes = {
  inTreatment: object.isRequired,
  className: string
};

PatientsNameAndRank.defaultProps = {
  inTreatment: {
    roomName: '...',
    patient: '...',
    rank: '...'
  },
  className: ''
};

export default PatientsNameAndRank;
