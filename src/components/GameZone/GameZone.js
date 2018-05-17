import React from 'react';
import { connect } from 'react-redux';

import GameStartButton from './Components/GameStartButton';
import CardsForEachLevel from './Components/CardsForEachLevel';
import ScoreOfGame from './Components/ScoreOfGame';
import ErrorMessage from '../ErrorMessage';

const GameZone = props => (
	<div>
		<div className='navbar-nav align-items-center justify-content-center flex-md-row align-items-md-start'>
			<CardsForEachLevel/>
			{(props.cards.length > 0) ? <ScoreOfGame/> : ''}
		</div>
		<GameStartButton/>
	</div>
);


const mapStateToProps = state => ({
	cards: state.gameStatus.cards,
});

export default connect(mapStateToProps)(GameZone);

// export default GameZone;