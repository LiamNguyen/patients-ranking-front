import 'babel-polyfill';
import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import config from './config';
import LocalStorage from './lib/LocalStorage';
import SessionStorage from './lib/SessionStorage';
import createStore from './store';

import '../assets/stylesheets/style.css';

config.init(window);
LocalStorage.init(window);
SessionStorage.init(window);

const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
