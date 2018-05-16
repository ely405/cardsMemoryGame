import React from 'react';
import { connect } from 'react-redux';

import { randomCardsAction, loadCardsAction } from '../../../ducks/GameZone/gameReducer';

const GameStartButton = (props) => {
	console.log('props game start button', props);
	return (
		<button onClick={() => props.startGame()}>Inicia Juego</button>
	);
};

const mapStateToProps = state => ({
	game: state.gameStatus,
});

const mapDispatchToProps = dispatch => ({
	startGame() {
		dispatch(loadCardsAction());
		dispatch(randomCardsAction());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(GameStartButton);