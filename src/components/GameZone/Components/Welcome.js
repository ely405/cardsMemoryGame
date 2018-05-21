import React from 'react';
import { connect } from 'react-redux';

import Button from '../../Button';

import { fetchPokemonsAction } from '../../../ducks/dataReducer';
import { randomCardsAction, loadCardsAction } from '../../../ducks/GameZone/gameReducer';

const Welcome = ({ cards, pokeData, fetchPokemons, startGame }) => (
	<div>
			Para iniciar el juego, elige con cuántas cartas quieres jugar.
		<div>
			<Button
				handlerClick={() => startGame(pokeData.data, 4)}
				text={cards.length > 0 ? 'R8' : 'Fácil'}
				handlerClass='btn-success m-1 bo-none p-3'
				classIcon='icon-play'/>
			<Button
				handlerClick={() => startGame(pokeData.data, 6)}
				text={cards.length > 0 ? 'R12' : 'Medio'}
				handlerClass='btn-warning m-1 bo-none p-3'
				classIcon='icon-play'/>
			<Button
				handlerClick={() => startGame(pokeData.data, 8)}
				text={cards.length > 0 ? 'R16' : 'Difícil'}
				handlerClass='btn-danger m-1 bo-none p-3'
				classIcon='icon-play'/>
			<Button
				handlerClick={() => fetchPokemons()}
				text='Más pokemones'
				handlerClass='btn-warning text-white m-1 bo-none p-3'
				classIcon='icon-sync'/>
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