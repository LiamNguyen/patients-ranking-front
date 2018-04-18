import React from 'react';

import './style.css';

import CardTitle from './CardTitle';
import CardSubTitle from './CardSubTitle';
import ButtonGroup from './ButtonGroup';

const cardViewContainerStyle = {
  height: '100%',
  paddingTop: 10,
  boxShadow: 'grey 0 0 6px 0',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderWidth: 5
};

const EventCardView = ({
  title,
  location,
  time,
  isOngoing = false,
  numberOfAttendedPeople,
  onJoinEvent,
  onCancelEvent,
  eventId,
  onRecreateEvent,
  onGoingPeople,
  hasEventFinished,
  justAddedStyle,
  onInviteButtonClick
}) => (
  <div
    style={{
      ...cardViewContainerStyle,
      ...justAddedStyle
    }}
    className="event-cardview-container"
  >
    <CardTitle title={title} />
    <CardSubTitle location={location} time={time} isOngoing={isOngoing} />
    <ButtonGroup
      displayNumber={numberOfAttendedPeople}
      onJoinButtonClick={onJoinEvent}
      onCancelButtonClick={onCancelEvent}
      onRecreateEvent={onRecreateEvent}
      eventId={eventId}
      onGoingPeopleButtonClick={onGoingPeople}
      hasEventFinished={hasEventFinished}
      onInviteButtonClick={onInviteButtonClick}
    />
  </div>
);

export default EventCardView;
