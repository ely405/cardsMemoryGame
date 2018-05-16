import React from 'react';
import { connect } from 'react-redux';

import { randomCardsAction, loadCardsAction } from '../../../ducks/GameZone/gameReducer';
import { fetchPokemonsAction } from '../../../ducks/dataReducer';

const GameStartButton = props => (
	<button onClick={() => props.startGame(props.pokeData)}>Inicia Juego</button>
);

const mapStateToProps = state => ({
	game: state.gameStatus,
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