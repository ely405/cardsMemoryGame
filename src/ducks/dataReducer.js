const FETCH_POKEMONS = 'app/pokemonData/FETCH_POKEMONS';

// const fetchPokemonsAction = () => ({ type: FETCH_POKEMONS });

const fetchPokemonsAction = () => (dispatch) => {
	const randomNumber = Math.floor(Math.random() * 800);
	return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${randomNumber}`)
		.then(response => response.json())
		.then((data) => {
			console.log('response', data);
			dispatch({
				type: FETCH_POKEMONS,
				pokemons: data.results,
			});
		});
};

export { fetchPokemonsAction };

export default function dataReducer(state = [], action) {
	switch (action.type) {
	case FETCH_POKEMONS:
		return state.concat(action.pokemons);

		// return state.concat([
		// 	{
		// 		url: 'https://pokeapi.co/api/v2/pokemon/697/',
		// 		name: 'tyrantrum',
		// 	},
		// 	{
		// 		url: 'https://pokeapi.co/api/v2/pokemon/698/',
		// 		name: 'amaura',
		// 	},
		// 	{
		// 		url: 'https://pokeapi.co/api/v2/pokemon/699/',
		// 		name: 'aurorus',
		// 	},
		// 	{
		// 		url: 'https://pokeapi.co/api/v2/pokemon/700/',
		// 		name: 'sylveon',
		// 	},
		// 	{
		// 		url: 'https://pokeapi.co/api/v2/pokemon/701/',
		// 		name: 'hawlucha',
		// 	},
		// 	{
		// 		url: 'https://pokeapi.co/api/v2/pokemon/702/',
		// 		name: 'dedenne',
		// 	},
		// 	{
		// 		url: 'https://pokeapi.co/api/v2/pokemon/703/',
		// 		name: 'carbink',
		// 	},
		// 	{
		// 		url: 'https://pokeapi.co/api/v2/pokemon/704/',
		// 		name: 'goomy',
		// 	},
		// 	{
		// 		url: 'https://pokeapi.co/api/v2/pokemon/705/',
		// 		name: 'sliggoo',
		// 	},
		// 	{
		// 		url: 'https://pokeapi.co/api/v2/pokemon/706/',
		// 		name: 'goodra',
		// 	}]);

	default: return state;
	}
}