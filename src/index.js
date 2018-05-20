import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap';

import store from './ducks/store/store';
import App from './App';

import { loadOfflinePokemonsAction } from './ducks/dataReducer';

import css from './style.scss';

if (process.env.NODE_ENV !== 'production') {
	  console.log('Looks like we are in development mode!');
	 }


store.dispatch(loadOfflinePokemonsAction());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);