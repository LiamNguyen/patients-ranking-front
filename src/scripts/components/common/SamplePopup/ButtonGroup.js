import React from 'react';
import AddToCalendar from 'react-add-to-calendar';
import Radium from 'radium';

import './style.css';
import CustomButton from '../CustomButton';

const buttonGroupStyle = {
  marginTop: 30
};
const Locale = {
  button: {
    addToCalendarButton: 'Add to calendar',
    done: 'Done'
  }
};

const ButtonGroup = ({ calendarEvent: event, onDoneButtonClick }) => (
  <div style={buttonGroupStyle}>
    <div onClick={this.handleAddToCalendarButtonClick}>
      <AddToCalendar
        event={event}
        buttonLabel={Locale.button.addToCalendarButton}
        buttonTemplate={{ 'calendar-plus-o': 'left' }}
      />
    </div>
    <CustomButton
      marginTop={30}
      fontSize={22}
      text={Locale.button.done}
      onClick={onDoneButtonClick}
    />
  </div>
);

export default Radium(ButtonGroup);
