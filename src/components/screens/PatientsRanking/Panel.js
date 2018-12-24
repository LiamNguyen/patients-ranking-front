import React from 'react';
import Locale from './Locale';

const {
  text: {
    roomNumber,
    welcomingState,
    patientName,
    number,
    patientNumber,
    patientOne,
    patientTwo,
    patientThree
  }
} = Locale;

const Panel = () => (
  <div className="panel-sub-container">
    <div className="panel-title">
      <div>
        <p className="room-number">{roomNumber}</p>
        <p className="welcomingState">{welcomingState}</p>
        <p className="patientName">{patientName}</p>
      </div>
      <div>
        <p className="number">{number}</p>
        <p className="patientNumber">{patientNumber}</p>
      </div>
    </div>
    <hr />
    <div className="patients">
      <p>{`003. ${patientOne}`}</p>
      <p>{`004. ${patientTwo}`}</p>
      <p>{`005. ${patientThree}`}</p>
    </div>
  </div>
);

export default Panel;
