import React from 'react';
import { connect } from 'react-redux';

import { showCardAction, compareCardsInPlayAction } from '../../../ducks/GameZone/gameReducer';
import { addScoreAction } from '../../../ducks/GameZone/scoreOfGameReducer';

import BeforeStartGameCard from './BeforeStartGame';
import ImageToBackOfCard from './ImageToBackOfCard';

const CardsForEachLevel = props => (
	(props.game.cards.length > 0) ? <ul className='col-sm-10 col-md-8 row'>{
		props.game.cards.map((item, ind) => <li key={`card${ind}`} onClick={() => props.showCard(ind, props.game)} className='card-in-game col-3 p-0 card-deck'>
			{ item.showCard ? item.name : <ImageToBackOfCard/> }
		</li>)}
	</ul> : <BeforeStartGameCard/>
);

const mapStateToProps = state => ({
	game: state.gameStatus,
});

const mapDispatchToProps = dispatch => ({
	showCard(cardPosition, gameStatus) {
		dispatch(showCardAction(cardPosition));
		dispatch(compareCardsInPlayAction());
		dispatch(addScoreAction(gameStatus));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsForEachLevel);