import React from 'react';
import { connect } from 'react-redux';

import { fetchPokemonsAction } from '../../../ducks/dataReducer';

import pokebola from '../../../assets/img/pokebola.png';

const btnLoadMore = ({ fetchPokemons }) => (<button onClick={() => fetchPokemons()}>Quiero cargar más pokemones</button>);

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
	fetchPokemons() {
		dispatch(fetchPokemonsAction());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(btnLoadMore);