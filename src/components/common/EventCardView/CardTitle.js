import React from 'react';

const titleStyle = {
  fontFamily: 'TitilliumWeb-Light',
  fontSize: 29,
  textAlign: 'center',
  fontWeight: 'bold'
};

const CardTitle = ({ title }) => <p style={titleStyle}>{title}</p>;

export default CardTitle;
