import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap';
// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';
import store from './ducks/store/store';
import App from './App';
import { fetchPokemonsAction } from './ducks/dataReducer';

import css from './style.scss';

store.dispatch(fetchPokemonsAction());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'),
);