import React from 'react';
import Spiner from 'react-spinkit';

const textStyle = {
  color: 'white',
  fontSize: 25,
  marginTop: 30
};
const LoadingOverlay = ({
  text = "Just a moment... :D",
  loading
}) => {
  let visibleStyle = {};

  if (loading)
    visibleStyle = {
      opacity: 1,
      visibility: 'visible'
    };

  return (
    <div className="overlay" style={visibleStyle}>
      <Spiner name="pacman" color="white" fadeIn="none" />
      <p style={textStyle}>{text}</p>
    </div>
  );
};

export default LoadingOverlay;