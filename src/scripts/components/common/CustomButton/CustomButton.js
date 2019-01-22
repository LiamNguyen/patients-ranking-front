import React from 'react';
import { func, string } from 'prop-types';

import './style.css';

const CustomButton = ({ text, onClick, ...props }) => (
  <button className="custom-button" onClick={onClick} {...props}>
    {text}
  </button>
);

CustomButton.defaultProps = {
  text: 'Button'
};

CustomButton.propTypes = {
  onClick: func.isRequired,
  text: string
};

export default CustomButton;
