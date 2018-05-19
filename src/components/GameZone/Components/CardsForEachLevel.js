import React from 'react';
import { connect } from 'react-redux';

import { showCardAction, compareCardsInPlayAction } from '../../../ducks/GameZone/gameReducer';
import { addScoreAction } from '../../../ducks/GameZone/scoreOfGameReducer';

import Welcome from './Welcome';
import ImageToBackOfCard from './ImageToBackOfCard';

import store from '../../../ducks/store/store';

import style from '../GameZone.scss';

const CardsForEachLevel = ({ game, showCard }) => (
	(game.cards.length > 0) ? <ul className='col-sm-10 col-md-8 row'>{
		game.cards.map((item, ind) => <li
			key={`card${ind}`}
			onClick={() => { showCard(ind, game); console.warn('nombre', item.name); }}
			className={`${style.card} col-3 card jumbotron-fluid justify-content-center`}>
			{ item.showCard ? <img src={`https://serebii.net/art/th/${item.pokeId}.png`} className='img-fluid'/> : <ImageToBackOfCard/> }
		</li>)}
	</ul> : <Welcome/>
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