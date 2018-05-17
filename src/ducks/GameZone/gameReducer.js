const LOAD_CARDS_TO_GAME = 'gameZone/game/LOAD_CARDS_TO_GAME';
const RANDOM_CARDS = 'gameZone/startButton/RANDOM_CARDS';
const SHOW_CARD = 'gameZone/card/SHOW_CARD';
const COMPARE_CARDS_IN_PLAY = 'gameZone/card/COMPARE_CARDS_IN_PLAY';

const loadCardsAction = allCards => ({ type: LOAD_CARDS_TO_GAME, allCards });
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
	while (counter > 0) {
		const index = Math.floor(Math.random() * counter);
		counter -= 1;
		const temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}

export default function startGameReducer(state = {
	cards: [], show: false, clicks: 0, cardsToCompare: [], backOfCard: 1,
}, action) {
	const { allCards } = action;

	switch (action.type) {
	case LOAD_CARDS_TO_GAME:
		while (allCards.length > 4) {
			const random = Math.floor(Math.random() * allCards.length);
			allCards.splice(random, 1);
		}

		console.warn('allcards', allCards);

		allCards.map((card) => {
			const urlString = card.url;
			const urlArr = urlString.split('/');
			const idPokemon = urlArr.filter(el => parseInt(el, 10));

			card.pokeId = parseInt(idPokemon[0], 10);
		});

		state.cards = [];

		return {
			...state,
			cards: state.cards.concat(allCards),
		};

	case RANDOM_CARDS:
		state.backOfCard = (state.backOfCard === 1) ? 2 : 1;

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
				if (state.cardsToCompare[0].name === state.cardsToCompare[1].name) {
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