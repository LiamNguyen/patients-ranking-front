import React from 'react';
import Spiner from 'react-spinkit';

const overlayStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

const textStyle = {
  color: 'white',
  fontSize: 25,
  marginTop: 30
}

const LoadingOverlay = ({
  text = "Just a moment... :D",
  loading
}) => {
  return (loading
    ? <div style={overlayStyle}>
      <Spiner name="pacman" color="white" fadeIn="none" />
      <p style={textStyle}>{text}</p>
    </div>
    : null);
};

export default LoadingOverlay;