const LOAD_CARDS_TO_GAME = 'gameZone/game/LOAD_CARDS_TO_GAME';
const RANDOM_CARDS = 'gameZone/startButton/RANDOM_CARDS';
const SHOW_CARD = 'gameZone/card/SHOW_CARD';
const COMPARE_CARDS_IN_PLAY = 'gameZone/card/COMPARE_CARDS_IN_PLAY';

const loadCardsAction = () => ({ type: LOAD_CARDS_TO_GAME });
const randomCardsAction = () => ({ type: RANDOM_CARDS });
const showCardAction = cardPosition => ({ type: SHOW_CARD, cardPosition });
const compareCardsInPlayAction = () => ({ type: COMPARE_CARDS_IN_PLAY });

export {
	loadCardsAction,
	RANDOM_CARDS,
	randomCardsAction,
	showCardAction,
	compareCardsInPlayAction,
};

function randomArray(array) {
	let counter = array.length;
	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		const index = Math.floor(Math.random() * counter);
		// Decrea se counter by 1
		counter -= 1;
		// And swap the last element with it
		const temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}

export default function startGameReducer(state = {
	cards: [], show: false, clicks: 0, cardsToCompare: [],
}, action) {
	switch (action.type) {
	case LOAD_CARDS_TO_GAME:
		return {
			...state,
			cards:
			[
				{ id: 1, backOfCard: 'a', frontOfCard: 'A' },
				{ id: 2, backOfCard: 'b', frontOfCard: 'B' },
				{ id: 3, backOfCard: 'c', frontOfCard: 'C' },
				{ id: 4, backOfCard: 'd', frontOfCard: 'D' },
			],
		};

	case RANDOM_CARDS:
		return { ...state, cards: randomArray(state.cards.concat(state.cards)) };


	case SHOW_CARD:
		state.cards = state.cards.map((e, ind) => {
			if (ind === action.cardPosition) {
				return { ...e, showCard: true, toCompare: true };
			}

			if (e.matchedCards) {
				return { ...e, showCard: true };
			}
			return { ...e, showCard: false };
		});
		return { ...state, cards: state.cards };

	case COMPARE_CARDS_IN_PLAY:
		state.cardsToCompare = state.cards.filter(e => e.toCompare);
		if (state.cardsToCompare.length === 2) {
			state.cardsToCompare.map((card) => {
				const indInAllCards = state.cards.indexOf(card);
				if (state.cardsToCompare[0].id === state.cardsToCompare[1].id) {
					state.cards.splice(indInAllCards, 1, {
						...card, showCard: true, toCompare: false, matchedCards: true,
					});
				} else {
					setTimeout(() => state.cards.splice(indInAllCards, 1, { ...card, showCard: false, toCompare: false }), 500);
				}
			});
		}

		return state;

	default: return state;
	}
}