// const SHOW_CARD = 'gameZone/card/SHOW_CARD';

// const showCardAction = (allCards, cardPosition) => ({ type: SHOW_CARD, allCards, cardPosition });

// export { showCardAction };

// export default function cardReducer(state = { cardToShow: [] }, action) {
// 	switch (action.type) {
// 	case SHOW_CARD:
// 		alert('show card');
// 		state.cardToShow = action.allCards.map((e, ind) => {
// 			if (ind === action.cardPosition) {
// 				console.log('igual a card position', action.cardPosition, e);
// 				return { ...e, showCard: true };
// 			}
// 			return e;
// 		});


// 		console.log('action all cards', state.cardToShow);
// 		return { cardToShow: state.cardToShow };

// 	default: return state;
// 	}
// }