import React from 'react';
import { connect } from 'react-redux';

import Welcome from './Components/Welcome';
import MessageInfo from '../MessageInfo';
import CardsForEachLevel from './Components/CardsForEachLevel';

import style from './GameZone.scss';
import messageCSS from '../MessageInfo.scss';

const GameZone = ({
	cards, pokeData,
}) => (
	<div>
		{pokeData.isLoad ? <MessageInfo message={pokeData.message} handlerClass={`${messageCSS.messageContainer} fixed-top text-center badge-success`}/> :
			pokeData.isLoad === false ?	 <MessageInfo message={pokeData.message} handlerClass={`${messageCSS.messageContainer} fixed-top text-center badge-danger`}/> : '' }
		{cards.length > 0 ? <div className='d-flex flex-column align-items-center' ><Welcome/><CardsForEachLevel/></div> : <Welcome/>}
	</div>
);

const mapStateToProps = state => ({
	cards: state.gameStatus.cards,
	pokeData: state.pokeData,
});

export default connect(mapStateToProps)(GameZone);