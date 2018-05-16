import React from 'react';
import { connect } from 'react-redux';

import { showCardAction, compareCardsInPlayAction } from '../../../ducks/GameZone/gameReducer';
import { addScoreAction } from '../../../ducks/GameZone/scoreOfGameReducer';

import store from '../../../ducks/store/store';


const CardsForEachLevel = (props) => {
	console.log('props cards ', props);
	// console.warn('STORE', store.getState());

	return (
		(props.game.cards.length > 0) ? <ul>{
			props.game.cards.map((item, ind) => <li key={`card${ind}`} onClick={() => props.showCard(ind, props.game)}>{ item.showCard ? item.name : 'girar' }</li>)}
		</ul> : ''
	);
};

const mapStateToProps = state => ({
	game: state.gameStatus,
	// game: store.getState().gameStatus,
});

const mapDispatchToProps = dispatch => ({
	showCard(cardPosition, gameStatus) {
		dispatch(showCardAction(cardPosition));
		dispatch(compareCardsInPlayAction());
		dispatch(addScoreAction(gameStatus));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsForEachLevel);