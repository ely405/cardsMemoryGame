import React from 'react';
import { connect } from 'react-redux';

import GameStartButton from './Components/GameStartButton';
import BtnLoadMore from './Components/BtnLoadMore';
import CardsForEachLevel from './Components/CardsForEachLevel';
import ScoreOfGame from './Components/ScoreOfGame';
import ErrorMessage from '../ErrorMessage';

import style from './GameZone.scss';

const fun = () => console.warn('hols desde aqui');
const GameZone = ({ cards }) => (
	<div>
		<div className='navbar'>
			<GameStartButton/>
			<BtnLoadMore/>
		</div>
		<div className={`${style.gameContainer} navbar-nav align-items-center justify-content-center flex-md-row align-items-md-start`}>
			<CardsForEachLevel/>
			{(cards.length > 0) ? <ScoreOfGame/> : ''}
		</div>
	</div>
);

const mapStateToProps = state => ({
	cards: state.gameStatus.cards,
});

export default connect(mapStateToProps)(GameZone);