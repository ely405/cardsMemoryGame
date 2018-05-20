// import { RANDOM_CARDS } from './gameReducer';

// const ADD_SCORE = 'gameZone/score/ADD_SCORE';

// const addScoreAction = gameStatus => ({ type: ADD_SCORE, gameStatus });

// export { addScoreAction };

// export default function scoreOfGameReducer(state = { quantity: 0, message: null }, action) {
// 	switch (action.type) {
// 	case ADD_SCORE: {
// 		console.warn('score', action.gameStatus);
// 		const score = action.gameStatus.cards.filter(card => card.matchedCards).length / 2;

// 		// if (score === action.gameStatus.cards.length / 2) {
// 		// // 	return { quantity: score, message: 'Ganaste! :)' };
// 		// // }
// 		return { ...state, quantity: score };
// 	}

// 	case RANDOM_CARDS:
// 		return { quantity: 0, message: null };

// 	default: return state;
// 	}
// }