let env = '';
let apiHost = '';
let appHost = '';

export default {
  init(global) {
    env = global.ENV || 'production';
    apiHost = global.API_HOST || 'https://';
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
