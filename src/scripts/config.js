let env = '';
let apiHost = '';
let appHost = '';

export default {
  init(global) {
    env = global.ENV || 'development';
    apiHost = global.API_HOST || 'http://localhost:5000';
    appHost = global.APP_HOST || 'https://';
  },

  get apiHost() {
    return apiHost;
  },

  get appHost() {
    return appHost;
  },

  get isProduction() {
    return env === 'production';
  },

  get isDevelopment() {
    return env === 'development';
  },

  get isMobile() {
    return env === 'mobile';
  }
};
