import React from 'react';
import { connect } from 'react-redux';

import { showCardAction, compareCardsInPlayAction } from '../../../ducks/GameZone/gameReducer';

import { timerStartAction } from '../../../ducks/GameZone/timerReducer';

import ImageToBackOfCard from './ImageToBackOfCard';
import Button from '../../common/Button';

import style from '../GameZone.scss';

const CardsForEachLevel = ({
	game, showPlayButton, showCard, timerStart, timerStop,
}) => (
	<ul className={`${style.gameContainer} col-sm-10 row`}>{
		game.cards.map((item, ind) =>
			<li
				key={`card${ind}`}
				onClick={() => showCard(ind)}
				className={`${style.card} col-3 card jumbotron-fluid justify-content-center p-3`}>
				{ item.showCard ? <img src={`https://serebii.net/art/th/${item.pokeId}.png`} className='img-fluid'/> : <ImageToBackOfCard/> }
			</li>)}

	{showPlayButton ? <li className={`${style.gameOverlay} card-img-overlay d-flex align-items-center justify-content-center`}>
		<Button classIcon='icon-play fs-2x'
			handlerClass='btn-success m-1 bo-none p-3'
			handlerClick={() => timerStart()}/>
	</li> : ''}

	</ul>
);

const mapStateToProps = state => ({
	game: state.gameStatus,
	showPlayButton: state.timer.showPlayButton,
});

const mapDispatchToProps = dispatch => ({
	showCard(cardPosition) {
		dispatch(showCardAction(cardPosition));
		dispatch(compareCardsInPlayAction());
	},
	timerStart() {
		const gameTimer = setInterval(() => dispatch(timerStartAction(gameTimer)), 500);
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(CardsForEachLevel);