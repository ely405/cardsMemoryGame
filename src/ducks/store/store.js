import {
	createStore,
	applyMiddleware,
	combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import gameReducer from '../GameZone/gameReducer';
import dataReducer from '../dataReducer';
import timerReducer from '../GameZone/timerReducer';

const logger = store => next => (action) => {
	console.log('dispatch action', action);
	const result = next(action);
	console.log('next state', store.getState());
	return result;
};

const reducerCombined = combineReducers({
	gameStatus: gameReducer,
	pokeData: dataReducer,
	timer: timerReducer,
});

export default createStore(reducerCombined, applyMiddleware(logger, thunk));