import React from 'react';

const titleStyle = {
  fontFamily: 'TitilliumWeb-Light',
  fontSize: 32,
  textAlign: 'center',
  fontWeight: 'bold'
};

const PopupTitle = ({ text }) => <p style={titleStyle}>{text}</p>;

export default PopupTitle;
