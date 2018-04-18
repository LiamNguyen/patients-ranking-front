import React from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import './style.css';

const BackButton = ({ onClick }) => (
  <IconButton onClick={onClick}>
    <ArrowBack className="arrow-back-icon" />
  </IconButton>
);

export default BackButton;
