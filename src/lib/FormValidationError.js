import _snakeCase from 'lodash/snakeCase';

export default class FormValidationError {
  constructor(message) {
    this.name = 'ValidationError';
    const key = message.errorType ? message.message : message;
    const namespace = message.errorType || 'backend_messages';
    this.form = `${namespace}.${_snakeCase(key)}`;
  }
}
