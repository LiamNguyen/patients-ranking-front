import _snakeCase from 'lodash/snakeCase';

class BackendBadRequestError {
  constructor(error) {
    this.error_code = _snakeCase(error.errorCode);
  }
}

export default BackendBadRequestError;
