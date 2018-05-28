import { randomArray, filterArrayNonRepeatElements } from '../../utils/arrayUtils';

const LOAD_CARDS_TO_GAME = 'gameZone/game/LOAD_CARDS_TO_GAME';
const RANDOM_CARDS = 'gameZone/startButton/RANDOM_CARDS';
const SHOW_CARD = 'gameZone/card/SHOW_CARD';
const COMPARE_CARDS_IN_PLAY = 'gameZone/card/COMPARE_CARDS_IN_PLAY';

const loadCardsAction = (allCards, numberOfCardPairs) => ({ type: LOAD_CARDS_TO_GAME, allCards, numberOfCardPairs });
const randomCardsAction = gameIsReady => ({ type: RANDOM_CARDS, gameIsReady });
const showCardAction = cardPosition => ({ type: SHOW_CARD, cardPosition });
const compareCardsInPlayAction = () => ({ type: COMPARE_CARDS_IN_PLAY });

export {
	loadCardsAction,
	randomCardsAction,
	showCardAction,
	compareCardsInPlayAction,
};

export default function startGameReducer(state = { cards: [], gameIsReady: false }, action) {
	const { allCards, numberOfCardPairs } = action;
	const { cards } = state;

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

	case RANDOM_CARDS:
		return { cards: randomArray(state.cards.concat(state.cards)), gameIsReady: true };

	case SHOW_CARD: {
		const cardsWithShowAttr = state.cards.map((e, ind) => {
			if (ind === action.cardPosition) {
				return { ...e, showCard: true, toCompare: true };
			}

			if (e.matchedCards) return { ...e, showCard: true };
			return { ...e, showCard: false };
		});
		return { cards: cardsWithShowAttr };
	}

	case COMPARE_CARDS_IN_PLAY: {
		const allCard = state.cards;
		const cardsToCompare = state.cards.filter(e => e.toCompare);

		if (cardsToCompare.length === 2) {
			cardsToCompare.map((card) => {
				const indInAllCards = allCard.indexOf(card);
				if (cardsToCompare[0].name === cardsToCompare[1].name) {
					allCard.splice(indInAllCards, 1, {
						...card, showCard: true, toCompare: false, matchedCards: true,
					});
				} else {
					setTimeout(() => allCard.splice(indInAllCards, 1, { ...card, showCard: false, toCompare: false }), 500);
				}
			});
		}

		return { cards: allCard };
	}

	default: return state;
	}
}