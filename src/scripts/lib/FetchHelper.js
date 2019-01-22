import Url from 'url';

import AuthInfoManager from './AuthInfoManager';
import FormValidationError from './FormValidationError';
import BackendBadRequestError from './BackendBadRequestError';

function headers() {
  return new Headers({
    Accept: '*/*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AuthInfoManager.getToken()}`
  });
}

export function checkResponse(response) {
  if (response.ok) {
    return response.json().catch(err => {
      throw err;
    });
  } else {
    if (response.status === 401) {
      AuthInfoManager.reset();
      throw new Error(
        `Failed status ${response.status} (${response.statusText}) on request ${
          response.url
        }.`
      );
    } else if (response.status === 422) {
      return response.json().then(e => {
        throw new FormValidationError(e.error);
      });
    } else if (response.status === 400) {
      return response.json().then(e => {
        throw new BackendBadRequestError(e);
      });
    } else {
      throw new Error(
        `Failed status ${response.status} (${response.statusText}) on request ${
          response.url
        }.`
      );
    }
  }
}

export function get(url, options, withHeaders = false) {
  const u = Url.parse(url);
  u.query = options;
  if (withHeaders) {
    return fetch(u.format(), {
      method: 'GET',
      headers: headers()
    });
  } else {
    return fetch(u.format(), {
      method: 'GET'
    });
  }
}

export function post(url, json) {
  return fetch(url, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(json)
  });
}

export function put(url, json) {
  return fetch(url, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(json)
  });
}

export function patch(url, json) {
  return fetch(url, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(json)
  });
}

export function del(url) {
  return fetch(url, {
    method: 'DELETE',
    headers: headers()
  });
}

export default {
  checkResponse,
  post,
  patch,
  get,
  del
};
