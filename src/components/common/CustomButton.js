import React from 'react';

import userIcon from '../../assets/images/userIcon.svg';

const getButtonStyle = props => ({
  margin: '0 5px 0 5px',
  flex: 0.5,
  height: 44,
  backgroundColor: 'transparent',
  fontFamily: 'TitilliumWeb-Light',
  fontSize: 29,
  border: 'solid 1px',
  borderRadius: 10,
  outline: 'none',
  ...props
});

const iconStyle = {
  width: 22,
  height: 22
};

const numberStyle = {
  marginLeft: 5,
  display: 'inline',
  fontSize: 26
};

const CustomButton = ({
  ...props,
  isIconButton = false,
  text = 'Button',
  onClick,
  displayNumber
}) => (
  <button
    onClick={onClick}
    style={getButtonStyle(props)}
  >
    {isIconButton
      ? <div>
        <img
          style={iconStyle}
          src={userIcon}
          alt=""
        />
        <p style={numberStyle}>{displayNumber}</p>
      </div>
      : text}
  </button>
);

export default CustomButton;
