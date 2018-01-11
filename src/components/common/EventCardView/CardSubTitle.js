import React from 'react';

import ongoingIcon from '../../../assets/images/ongoingIcon.svg';
import clockIcon from '../../../assets/images/clockIcon.svg';
import locationIcon from '../../../assets/images/locationIcon.svg';

const subTitleContainerStyle = {
  display: 'flex',
  flexDirection: 'row', 
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20
}

const subTitleBoxStyle = {
  flex: 0.5,
  textAlign: 'center',
  fontFamily: 'TitilliumWeb-ExtraLight',
  fontSize: 20
}

const iconStyle = {
  width: 33,
  height: 33,
  display: 'inline-block',
  marginRight: 7
}

const subTitleTextStyle = {
  display: 'inline'
}

const getSubTitleIcon = isOngoing => {
  return isOngoing ? ongoingIcon : clockIcon;
};

const CardSubTitle = ({
  isOngoing = false,
  location,
  time
}) => (
  <div style={subTitleContainerStyle}>
    <div style={subTitleBoxStyle}>
      <img
        style={iconStyle}
        src={getSubTitleIcon(isOngoing)}
        alt=""
      />
      <p style={subTitleTextStyle}>{time}</p>
    </div>
    <div style={subTitleBoxStyle}>
      <img
        style={iconStyle}
        src={locationIcon}
        alt=""
      />
      <p style={subTitleTextStyle}>{location}</p>
    </div>
  </div>
);

export default CardSubTitle;