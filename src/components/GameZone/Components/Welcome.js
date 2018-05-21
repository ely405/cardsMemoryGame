import React from 'react';
import { connect } from 'react-redux';

import Button from '../../Button';

import { fetchPokemonsAction } from '../../../ducks/dataReducer';
import { randomCardsAction, loadCardsAction } from '../../../ducks/GameZone/gameReducer';

const Welcome = ({
	cards, pokeData, fetchPokemons, startGame,
}) => (
	<div>
		{cards.length > 0 ? '' :
			<p className='col-12'>Haz clic en las cartas y trata de conseguir todas las parejas en el menor número de intentos posible.
			Comienza por el nivel más fácil.</p>}
		<div className='d-flex flex-wrap'>
			<Button
				handlerClick={() => startGame(pokeData.data, 4)}
				text='Fácil'
				classText='d-none d-sm-block'
				handlerClass='btn-success m-1 bo-none p-3'
				classIcon='icon-play fs-2x'/>
			<Button
				handlerClick={() => startGame(pokeData.data, 6)}
				text='Medio'
				classText='d-none d-sm-block'
				handlerClass='btn-warning m-1 bo-none p-3 text-white'
				classIcon='icon-play fs-2x'/>
			<Button
				handlerClick={() => startGame(pokeData.data, 8)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
// export default Welcome;