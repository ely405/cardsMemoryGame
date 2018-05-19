import React from 'react';
import { connect } from 'react-redux';

import Button from '../Button';
import ErrorMessage from '../ErrorMessage';
import CardsForEachLevel from './Components/CardsForEachLevel';
import ScoreOfGame from './Components/ScoreOfGame';


import { fetchPokemonsAction } from '../../ducks/dataReducer';
import { randomCardsAction, loadCardsAction } from '../../ducks/GameZone/gameReducer';


import style from './GameZone.scss';

const GameZone = ({
	cards, pokeData, fetchPokemons, startGame,
}) => (
	<div>
		{pokeData.message ? <ErrorMessage message={pokeData.message} handlerClass='fixed-top text-center badge-danger'/> : ''}
		<div className='navbar'>
			<Button
				handlerClick={() => startGame(pokeData.data, 4)}
				text={cards.length > 0 ? 'R8' : '8'}
				handlerClass='btn-success'/>
			<Button
				handlerClick={() => startGame(pokeData.data, 6)}
				text={cards.length > 0 ? 'R12' : '12'}
				handlerClass='btn-success'/>
			<Button
				handlerClick={() => startGame(pokeData.data, 8)}
				text={cards.length > 0 ? 'R16' : '16'}
				handlerClass='btn-success'/>
			<Button
				handlerClick={() => fetchPokemons()}
				text='Recarga pokemones'
				handlerClass='btn-warning text-white'/>
		</div>
		<div className={`${style.gameContainer} navbar-nav align-items-center justify-content-center flex-md-row align-items-md-start`}>
			<CardsForEachLevel/>
			{(cards.length > 0) ? <ScoreOfGame/> : ''}
		</div>
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