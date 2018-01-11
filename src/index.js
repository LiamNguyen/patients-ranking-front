import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';

import './assets/stylesheets/index.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import AppContainer from './containers/AppContainer';
import createStore from './store';
import config from './config';
import LocalStorage from './lib/LocalStorage';
import SessionStorage from './lib/SessionStorage';

config.init(window);
LocalStorage.init(window);
SessionStorage.init(window);

const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

const font = 'TitilliumWeb-Light';

const muiTheme = getMuiTheme({
	fontFamily: font,

	timePicker: {
		pickerHeaderColor: Colors.black,
		selectColor: Colors.black
	},
	datePicker: {
		pickerHeaderColor: Colors.black,
		selectColor: Colors.black,
		}
});

render(
 <Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
     <AppContainer />
		</MuiThemeProvider>
 </Provider>,
 document.getElementById('root'),
 () => {
   delete window.__INITIAL_STATE__;
 }
);