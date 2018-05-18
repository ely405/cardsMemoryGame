import {
	createStore,
	applyMiddleware,
	combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import gameReducer from '../GameZone/gameReducer';
import scoreReducer from '../GameZone/scoreOfGameReducer';
import dataReducer from '../dataReducer';

const logger = store => next => (action) => {
	console.log('dispatch action', action);
	const result = next(action);
	console.log('next state', store.getState());
	return result;
};

const reducerCombined = combineReducers({
	gameStatus: gameReducer,
	score: scoreReducer,
	pokeData: dataReducer,
});

export default createStore(reducerCombined, applyMiddleware(logger, thunk));