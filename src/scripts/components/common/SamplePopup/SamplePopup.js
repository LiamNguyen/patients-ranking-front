import React from 'react';

import PopupTitle from './PopupTitle';
import SuccessIcon from './SucessIcon';
import PopupSubtitle from './PopupSubtitle';
import ButtonGroup from './ButtonGroup';

const styles = {
  modalStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  bodyStyle: {
    width: '70%',
    height: 400,
    margin: '100px auto 0 auto',
    paddingTop: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center'
  }
};
const Locale = {
  text: {
    title: 'Perfecto!!!',
    subTitle: 'Not to forget ;)'
  }
};

const SamplePopup = ({ show = false, calendarEvent, onDoneButtonClick }) =>
  show ? (
    <div style={styles.modalStyle}>
      <div style={styles.bodyStyle}>
        <PopupTitle text={Locale.text.title} />
        <SuccessIcon />
        <PopupSubtitle text={Locale.text.subTitle} />
        <ButtonGroup
          calendarEvent={calendarEvent}
          onDoneButtonClick={onDoneButtonClick}
        />
      </div>
    </div>
  ) : null;

export default SamplePopup;
