import React from 'react';
import _ from 'lodash';
import { string, array, object } from 'prop-types';

import Locale from './Locale';

const {
  text: { footerTitleDefault, footerTitleMissedTurn, call }
} = Locale;

const FooterItem = ({ room, missedTurnRoom }) =>
  !_.isEmpty(missedTurnRoom) && room
    ? missedTurnRoom.map((item, index) => (
        <div key={index} style={{ display: 'inline' }}>
          &nbsp;&nbsp;-&nbsp;&nbsp;
          <span className="room-name-in-footer">{room.roomName}</span>
          &nbsp;{call}&nbsp;
          <span className="patient-number-in-footer">{item.rank}</span>
          .
          <span className="patient-name-in-footer">{item.patient}</span>
        </div>
      ))
    : null;

const Footer = ({
  footerTitle,
  firstRoom,
  firstMissedTurnRoom,
  secondRoom,
  secondMissedTurnRoom
}) => (
  <div className="footer">
    <div className="marquee">
      <span>
        {!_.isEmpty(firstMissedTurnRoom) || !_.isEmpty(secondMissedTurnRoom)
          ? footerTitleMissedTurn
          : footerTitle}
      </span>
      <FooterItem room={firstRoom} missedTurnRoom={firstMissedTurnRoom} />
      <FooterItem room={secondRoom} missedTurnRoom={secondMissedTurnRoom} />
    </div>
  </div>
);

Footer.propTypes = {
  footerTitle: string,
  firstRoom: object,
  firstMissedTurnRoom: array.isRequired,
  secondRoom: object,
  secondMissedTurnRoom: array.isRequired
};

Footer.defaultProps = {
  footerTitle: footerTitleDefault
};

FooterItem.propTypes = {
  room: object,
  missedTurnRoom: array.isRequired
};

export default Footer;
