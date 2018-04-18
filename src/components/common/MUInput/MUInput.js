import _ from 'lodash';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import $ from 'jquery';

import './style.css';

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: 10
};

export default class MUInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { focused: false };
  }

  unfocus = () => {
    if (this.state.focused) this.setState({ focused: false });
  };

  componentDidMount() {
    $(window).on('mouseup', this.unfocus);
  }

  componentWillUnmount() {
    $(window).off('mouseup', this.unfocus);
    const el = findDOMNode(this).querySelector('input');
    if (document.activeElement === el) {
      el.blur();
    }
  }

  render() {
    const {
      failReason,
      className,
      onAddonClick,
      addon,
      ...includeProps
    } = this.props;
    let addonContainerClickableStyle = {};

    if (onAddonClick) {
      addonContainerClickableStyle = {
        cursor: 'pointer'
      };
    }

    return (
      <FormGroup
        className={className}
        validationState={failReason ? 'error' : null}
      >
        <div style={containerStyle}>
          {addon && (
            <div
              className="addon-container"
              style={addonContainerClickableStyle}
              onClick={onAddonClick}
            >
              {addon}
            </div>
          )}
          <FormControl
            {...includeProps}
            className="form-control"
            ref="input"
            placeholder={this.placeholder()}
            label={this.label()}
            bsStyle={this.bsStyle()}
            help={this.help()}
            onFocus={this.onFocus}
            onMouseUp={e => e.stopPropagation()}
          />
        </div>
        {this.help() && <HelpBlock>{this.help()}</HelpBlock>}
      </FormGroup>
    );
  }

  label() {
    if (this.props.label) {
      return <span className="bold-text">{this.props.label}</span>;
    }
  }

  placeholder() {
    if (this.props.placeholder) {
      return this.props.placeholder;
    }
  }

  bsStyle() {
    if (this.props.failReason) {
      return 'error';
    }
  }

  help() {
    if (this.props.failReason) {
      return MUInput.getErrors(this.props.failReason);
    }
    if (this.props.help) {
      if (
        (this.props.popupHelp && this.state.focused) ||
        !this.props.popupHelp
      ) {
        return `help.${this.props.help}`;
      }
    }
  }

  static getErrors(failReason) {
    if (_.isArray(failReason)) return failReason[0];
    return failReason;
  }

  onFocus = e => {
    this.setState({ focused: true });
    if (this.props.onFocus) this.props.onFocus(e);
  };
}
