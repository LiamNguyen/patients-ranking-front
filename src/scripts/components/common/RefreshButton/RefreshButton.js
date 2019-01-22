import React from 'react';
import IconButton from 'material-ui/IconButton';
import Refresh from 'material-ui/svg-icons/action/restore';

import './style.css';

const RefreshButton = ({ onClick }) => (
  <IconButton>
    <Refresh className="refresh-icon" onClick={onClick} />
  </IconButton>
);

export default RefreshButton;
