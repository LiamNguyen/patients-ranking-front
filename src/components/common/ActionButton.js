import React from 'react';
import { func, string, object } from 'prop-types';

const actionButtonStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 80,
  height: 80,
  backgroundColor: '#00dcff',
  borderRadius: 8,
  boxShadow: 'grey 0 0 5px 5px',
  cursor: 'pointer'
};

const ActionButton = ({
  onClick,
  imageSource,
  style = {}
}) => (
  <div
    onClick={onClick}
    style={{ ...actionButtonStyle, ...style }}
  >
    {imageSource &&
      <img src={imageSource} alt="" width="50" height="50" />}
  </div>
);

ActionButton.propTypes = {
  onClick: func,
  imageSource: string,
  style: object
};

export default ActionButton;