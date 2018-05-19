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
			<Button handlerClick={() => startGame(pokeData.data)}
				text={cards.length > 0 ? 'Quiero reinciar la partida' : 'Quiero empezar el juego'}
				handlerClass='btn-success col-12'/>
			<Button handlerClick={() => fetchPokemons()}
				text='Cargar más pokemones'
				handlerClass='btn-warning text-white col-12'/>
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
	startGame(allCards) {
		dispatch(loadCardsAction(allCards));
		dispatch(randomCardsAction());
	},
});
export default connect(mapStateToProps, mapDispatchToProps)(GameZone);