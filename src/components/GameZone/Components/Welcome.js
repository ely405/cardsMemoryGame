import React from 'react';
import { connect } from 'react-redux';

import Button from '../../common/Button';

import { fetchPokemonsAction } from '../../../ducks/dataReducer';
import { randomCardsAction, loadCardsAction } from '../../../ducks/GameZone/gameReducer';

import { timerRestartAction, timerStopAction } from '../../../ducks/GameZone/timerReducer';

const Welcome = ({
	cards, timer, pokeData, fetchPokemons, startGame, timerRestart,
}) => (
	<div className='col-12 d-flex flex-column align-items-center'>
		{cards.length > 0 ? '' :
			<div className='col-sm-8'><p>Haz clic en las cartas y trata de conseguir todas las parejas en el menor tiempo posible.
				Al finalizar para el tiempo y ve qué tan rápido eres.</p>
			<b>TIP: Comienza por el nivel más fácil :D</b></div>}
		<div className='d-flex justify-content-center col-sm-10'>
			<Button
				handlerClick={() => startGame(pokeData.data, 4, timer.timerName)}
				text='Fácil'
				classText='d-none d-sm-block'
				handlerClass='btn-success m-1 bo-none p-3'
				classIcon='icon-play fs-2x'/>
			<Button
				handlerClick={() => startGame(pokeData.data, 6, timer.timerName)}
				text='Medio'
				classText='d-none d-sm-block'
				handlerClass='btn-warning m-1 bo-none p-3 text-white'
				classIcon='icon-play fs-2x'/>
			<Button
				handlerClick={() => startGame(pokeData.data, 8, timer.timerName)}
				text='Difícil'
				classText='d-none d-sm-block'
				handlerClass='btn-danger m-1 bo-none p-3'
				classIcon='icon-play fs-2x'/>
			<Button
				handlerClick={() => fetchPokemons()}
				text='Más pokemones'
				classText='d-none d-sm-block'
				handlerClass='btn-warning text-white m-1 bo-none p-3'
				classIcon='icon-sync fs-2x'/>
					<Button
				handlerClick={() => timerRestart()}
				text='2'
				handlerClass='btn-danger m-1 bo-none p-3'/>
		</div>
		<h5>{timer.minutes}:{ timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds }</h5>
	</div>
);

const mapStateToProps = state => ({
	cards: state.gameStatus.cards,
	timer: state.timer,
	pokeData: state.pokeData,
});

const mapDispatchToProps = dispatch => ({
	fetchPokemons() {
		dispatch(fetchPokemonsAction());
	},
	startGame(allCards, numberOfCardPairs, timerName) {
		dispatch(loadCardsAction(allCards, numberOfCardPairs));
		dispatch(randomCardsAction());
	},
	timerRestart() {
		dispatch(timerRestartAction());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);