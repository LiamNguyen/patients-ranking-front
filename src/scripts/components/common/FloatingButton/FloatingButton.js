import React, { Component } from 'react';
import { func, string } from 'prop-types';
import SettingsIcon from 'mdi-react/SettingsIcon';

import './style.css';

const descriptionStyle = {
  visible: {
    visibility: 'visible',
    opacity: 1
  },
  hidden: {
    visibility: 'hidden',
    opacity: 0
  }
};

class FloatingButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptionStyle: descriptionStyle.hidden
    };
  }

  handleMouseEnter = () => {
    this.setState({ descriptionStyle: descriptionStyle.visible });
  };

  handleMouseLeave = () => {
    this.setState({ descriptionStyle: descriptionStyle.hidden });
  };

  render() {
    return (
      <div>
        <div
          className="floating-button"
          onClick={this.props.onClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <SettingsIcon style={{ fill: 'white' }} />
        </div>
        <span
          className="floating-description"
          style={this.state.descriptionStyle}
        >
          {this.props.description}
        </span>
      </div>
    );
  }
}

FloatingButton.propTypes = {
  onClick: func,
  description: string
};

export default FloatingButton;
