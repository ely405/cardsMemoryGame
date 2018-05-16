import {
	createStore,
	applyMiddleware,
	combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import gameReducer from '../GameZone/gameReducer';
import scoreReducer from '../GameZone/scoreOfGameReducer';
// import cardReducer from '../GameZone/cardReducer';

const logger = store => next => (action) => {
	console.log('dispatch action', action);
	const result = next(action);
	console.log('next state', store.getState());
	return result;
};

const reducerCombined = combineReducers({
	gameStatus: gameReducer,
	score: scoreReducer,
	// card: cardReducer,
});

export default createStore(reducerCombined, applyMiddleware(logger, thunk));