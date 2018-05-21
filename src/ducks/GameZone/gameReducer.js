import { randomArray, filterArrayNonRepeatElements } from '../../utils/arrayUtils';

const LOAD_CARDS_TO_GAME = 'gameZone/game/LOAD_CARDS_TO_GAME';
const RANDOM_CARDS = 'gameZone/startButton/RANDOM_CARDS';
const SHOW_CARD = 'gameZone/card/SHOW_CARD';
const COMPARE_CARDS_IN_PLAY = 'gameZone/card/COMPARE_CARDS_IN_PLAY';
const TIME_RESOLVED = 'gameZone/cards/TIME_RESOLVED';

const loadCardsAction = (allCards, numberOfCardPairs) => ({ type: LOAD_CARDS_TO_GAME, allCards, numberOfCardPairs });
const randomCardsAction = () => ({ type: RANDOM_CARDS });
const showCardAction = cardPosition => ({ type: SHOW_CARD, cardPosition });
const compareCardsInPlayAction = () => ({ type: COMPARE_CARDS_IN_PLAY });
const timeResolvedAction = stateOFCards => ({ type: TIME_RESOLVED, stateOFCards });

export {
	loadCardsAction,
	randomCardsAction,
	showCardAction,
	compareCardsInPlayAction,
	timeResolvedAction,
};

export default function startGameReducer(state = {
	cards: [], backOfCard: 1,
}, action) {
	const { allCards, numberOfCardPairs } = action;
	const { cards, backOfCard } = state;

	switch (action.type) {
	case LOAD_CARDS_TO_GAME: {
		const filteredCards = filterArrayNonRepeatElements(allCards, numberOfCardPairs);

		// id para cargar sus imágenes y precargamos imágenes
		filteredCards.map((card) => {
			if (!card.pokeId) {
				const urlArr = card.url.split('/');
				const idPokemon = urlArr.filter(el => parseInt(el, 10));

				card.pokeId = parseInt(idPokemon[0], 10);
			}
			const img = new Image();
			img.src = `https://serebii.net/art/th/${card.pokeId}.png`;
			return card;
		});

		return {
			...state,
			cards: filteredCards,
		};
	}

	case RANDOM_CARDS: {
		const backNumber = (backOfCard === 1) ? 2 : 1;

		return { ...state, cards: randomArray(state.cards.concat(state.cards)), backOfCard: backNumber };
	}

	case SHOW_CARD: {
		const cardsWithShowAttr = state.cards.map((e, ind) => {
			if (ind === action.cardPosition) {
				return { ...e, showCard: true, toCompare: true };
			}

			if (e.matchedCards) return { ...e, showCard: true };
			return { ...e, showCard: false };
		});
		return { ...state, cards: cardsWithShowAttr };
	}

	case COMPARE_CARDS_IN_PLAY: {
		const cardsToCompare = state.cards.filter(e => e.toCompare);

		if (cardsToCompare.length === 2) {
			cardsToCompare.map((card) => {
				const indInAllCards = state.cards.indexOf(card);
				if (cardsToCompare[0].name === cardsToCompare[1].name) {
					state.cards.splice(indInAllCards, 1, {
						...card, showCard: true, toCompare: false, matchedCards: true,
					});
				} else {
					setTimeout(() => state.cards.splice(indInAllCards, 1, { ...card, showCard: false, toCompare: false }), 500);
				}
			});
		}

		return state;
	}

	case TIME_RESOLVED: {
		let seconds = 0;
		// const x = setInterval(() => { seconds += 1; }, 1000);
		console.warn('secondos', seconds += 1, 'time resolved', action.stateOFCards);
		return state;
	}

	default: return state;
	}
}