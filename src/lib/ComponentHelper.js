import _ from 'lodash';

export function changeForm(form, field, value, callback) {
  let params = _.cloneDeep(form);
  _.set(params, field, value);
  callback(params);
}
