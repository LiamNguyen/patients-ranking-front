import React from 'react';

import { glueOrange, glueBlue } from '../../../constants/ThemeConstants';

const iconContainerStyle = {
  width: 70,
  height: 70,
  borderRadius: 35,
  backgroundColor: glueBlue,
  margin: '30px auto 0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const SuccessIcon = ({
  style,
  innerCheckSize = 40
}) => (
  <div style={{
    ...iconContainerStyle,
    ...style
  }}>
    <svg xmlns="http://www.w3.org/2000/svg" width={innerCheckSize} height={innerCheckSize} viewBox="0 0 18 18">
      <path d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z" style={{ fill: glueOrange }} />
    </svg>
  </div>
);

export default SuccessIcon;