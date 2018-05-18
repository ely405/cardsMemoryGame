import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap';

import store from './ducks/store/store';
import App from './App';

import { loadOfflinePokemonsAction } from './ducks/dataReducer';

import css from './style.scss';

store.dispatch(loadOfflinePokemonsAction());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);