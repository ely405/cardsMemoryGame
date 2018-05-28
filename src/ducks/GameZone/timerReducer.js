const START_TIMER = 'gameZone/timer/START_TIMER';
const TIMER_STOP = 'gameZone/timer/TIMER_STOP';
const TIMER_RESTART = 'gameZone/timer/TIMER_RESTART';

const timerStartAction = timerName => ({ type: START_TIMER, timerName });
const timerStopAction = timerName => ({ type: TIMER_STOP, timerName });
const timerRestartAction = timerName => ({ type: TIMER_RESTART, timerName });

export {
	timerStartAction,
	timerStopAction,
	timerRestartAction,
};

export default function timerReducer(state = {
	timerName: null, showPlayButton: false, seconds: 30, minutes: 1, timeFinished: false,
}, action) {
	switch (action.type) {
	case TIMER_RESTART:
		clearInterval(action.timerName);
		return {
			...state, timerName: null, showPlayButton: true,
		};

	case START_TIMER:
		if (state.seconds === 0 && state.minutes === 0) {
			clearInterval(action.timerName);
			return {
				...state, timerName: null, seconds: state.seconds, timeFinished: true,
			};
		} else if (state.seconds === 0) {
			return {
				...state, timerName: null, seconds: 59, minutes: state.minutes - 1,
			};
		}
		return {
			...state, timerName: action.timerName, showPlayButton: false, seconds: state.seconds - 1,
		};

	default: return state;
	}
}


// export default function timerReducer(state = {
// 	timerName: null, showPlayButton: false, seconds: 0, minutes: 0,
// }, action) {
// 	switch (action.type) {
// 	case TIMER_RESTART:
// 		clearInterval(action.timerName);
// 		return {
// 			...state, timerName: null, showPlayButton: true, seconds: 0, minutes: 0,
// 		};

// 	case START_TIMER:
// 		if (state.seconds === 59) {
// 			return {
// 				timerName: action.timerName, showPlayButton: false, seconds: 0, minutes: state.minutes + 1,
// 			};
// 		}

// 		return {
// 			timerName: action.timerName, showPlayButton: false, seconds: state.seconds + 1, minutes: state.minutes,
// 		};

// 	case TIMER_STOP:
// 		clearInterval(action.timerName);
// 		return { ...state, timerName: null };

// 	default: return state;
// 	}
// }