import React from 'react';
import { connect } from 'react-redux';

import Welcome from './Components/Welcome';

import Button from '../Button';
import MessageInfo from '../MessageInfo';
import CardsForEachLevel from './Components/CardsForEachLevel';

import { fetchPokemonsAction } from '../../ducks/dataReducer';
import { randomCardsAction, loadCardsAction } from '../../ducks/GameZone/gameReducer';

import style from './GameZone.scss';
import messageCSS from '../MessageInfo.scss';


const GameZone = ({
	cards, pokeData, fetchPokemons, startGame,
}) => (
	<div className='d-flex flex-column align-items-center'>
		{pokeData.isLoad ? <MessageInfo message={pokeData.message} handlerClass={`${messageCSS.messageContainer} fixed-top text-center badge-success`}/> :
			pokeData.isLoad === undefined ?	'' : <MessageInfo message={pokeData.message} handlerClass={`${messageCSS.messageContainer} fixed-top text-center badge-danger`}/> }
		{cards.length > 0 ? <Welcome/> : ''}
		{cards.length > 0 ? <CardsForEachLevel/> : <Welcome/>}
	</div>
);

const mapStateToProps = state => ({
	cards: state.gameStatus.cards,
	pokeData: state.pokeData,
});

const mapDispatchToProps = dispatch => ({
	fetchPokemons() {
		dispatch(fetchPokemonsAction());
	},
	startGame(allCards, numberOfCardPairs) {
		dispatch(loadCardsAction(allCards, numberOfCardPairs));
		dispatch(randomCardsAction());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(GameZone);