import React from 'react';
import { connect } from 'react-redux';

import { randomCardsAction, loadCardsAction } from '../../../ducks/GameZone/gameReducer';
import { fetchPokemonsAction } from '../../../ducks/dataReducer';

const GameStartButton = ({ cards, pokeData, startGame }) => (
	<button onClick={() => startGame(pokeData.data)} className='btn-success'>
		{cards.length > 0 ? 'Quiero reinciar la partida' : 'Quiero empezar el juego'}
	</button>
);

const mapStateToProps = state => ({
	cards: state.gameStatus.cards,
	pokeData: state.pokeData,
});

const mapDispatchToProps = dispatch => ({
	startGame(allCards) {
		dispatch(fetchPokemonsAction());
		dispatch(loadCardsAction(allCards));
		dispatch(randomCardsAction());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(GameStartButton);