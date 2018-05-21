import React from 'react';
import { connect } from 'react-redux';

import { showCardAction, compareCardsInPlayAction } from '../../../ducks/GameZone/gameReducer';
import { addScoreAction } from '../../../ducks/GameZone/scoreOfGameReducer';

import Welcome from './Welcome';
import ImageToBackOfCard from './ImageToBackOfCard';

import store from '../../../ducks/store/store';

import style from '../GameZone.scss';

const CardsForEachLevel = ({ game, showCard }) => (
	(game.cards.length > 0) ? <ul className={`${style.gameContainer} col-sm-10 row`}>{
		game.cards.map((item, ind) => <li
			key={`card${ind}`}
			onClick={() => showCard(ind)}
			className={`${style.card} col-3 card jumbotron-fluid justify-content-center p-3`}>
			{ item.showCard ? <img src={`https://serebii.net/art/th/${item.pokeId}.png`} className='img-fluid'/> : <ImageToBackOfCard/> }
		</li>)}
	</ul> : <Welcome/>
);

const mapStateToProps = state => ({
	game: state.gameStatus,
});

const mapDispatchToProps = dispatch => ({
	showCard(cardPosition) {
		dispatch(showCardAction(cardPosition));
		dispatch(compareCardsInPlayAction());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsForEachLevel);