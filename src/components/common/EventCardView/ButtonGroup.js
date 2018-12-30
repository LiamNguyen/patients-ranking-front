import React from 'react';

import CustomButton from '../CustomButton';

const buttonGroupStyle = {
  marginBottom: 20,
  padding: '0 15px 0 15px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
};
const Locale = {
  button: {
    join: 'Join',
    invite: 'Invite',
    cancel: 'Not going',
    recreate: 'Recreate'
  }
};

const ButtonGroup = ({
  onJoinButtonClick,
  onCancelButtonClick,
  onRecreateEvent,
  displayNumber,
  onGoingPeopleButtonClick,
  eventId,
  hasEventFinished,
  onInviteButtonClick
}) => {
  const isYourEventsScreen = !!onCancelButtonClick && !onJoinButtonClick;

  const handleGoingPeopleButtonClick = () => {
    onGoingPeopleButtonClick(eventId);
  };

  const handleInviteButtonClick = () => {
    onInviteButtonClick(eventId);
  };

  const getMiddleButtonText = () => {
    if (hasEventFinished) return Locale.button.recreate;
    else if (isYourEventsScreen) return Locale.button.cancel;
    else return Locale.button.join;
  };

  const getMiddleButtonHandler = () => {
    if (hasEventFinished) onRecreateEvent(eventId);
    else if (isYourEventsScreen) onCancelButtonClick(eventId);
    else onJoinButtonClick(eventId);
  };

  return (
    <div style={buttonGroupStyle}>
      <CustomButton
        flex={0.25}
        isIconButton={true}
        displayNumber={displayNumber}
        onClick={handleGoingPeopleButtonClick}
      />
      <CustomButton
        text={getMiddleButtonText()}
        onClick={getMiddleButtonHandler}
      />
      <CustomButton
        flex={0.25}
        text={Locale.button.invite}
        onClick={handleInviteButtonClick}
      />
    </div>
  );
};

export default ButtonGroup;
