import React from 'react';

import Header from './components/Header/Header';
import GameZone from './components/GameZone/GameZone';
import ErrorMessage from './components/ErrorMessage';

const App = props => (
	<div>
		<ErrorMessage/>
		<Header/>
		<GameZone/>
	</div>
);

export default App;