import React, { Component } from 'react';
import Alert from 'react-s-alert';

class CustomAlertContent extends Component {
  handleConfirm = () => {
    Alert.close(this.props.id);
  }

  render() {
    return (
      <div className={this.props.classNames} id={this.props.id} style={this.props.styles}>
        <div className='s-alert-box-inner'>
            {this.props.message}
        </div>
        <span className='s-alert-close' onClick={this.props.handleClose}></span>
      </div>
    )
  }
}

export default CustomAlertContent;
