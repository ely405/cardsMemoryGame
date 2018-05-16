import React from 'react';

import GameStartButton from './Components/GameStartButton';
import CardsForEachLevel from './Components/CardsForEachLevel';
import ScoreOfGame from './Components/ScoreOfGame';

const GameZone = props => (
	<div>
		<GameStartButton/>
		<CardsForEachLevel/>
		<ScoreOfGame/>
	</div>
);

export default GameZone;