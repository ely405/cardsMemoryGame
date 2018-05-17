import pokemonsJson from '../../pokemons.json';


const FETCH_POKEMONS = 'app/pokemonData/FETCH_POKEMONS';

const fetchPokemonsAction = () => (dispatch) => {
	const randomNumber = Math.floor(Math.random() * 800);
	dispatch({
		type: FETCH_POKEMONS,
		pokemons: pokemonsJson.pokemons,
		isLoaded: true,
		// message: 'Uy! no pudimos cargar más pokemones, revisa tu conexión a internet.',
		// error: err,
	});

	return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${randomNumber}`)
		.then(response => response.json())
		.then((data) => {
			console.log('response', data);
			dispatch({
				type: FETCH_POKEMONS,
				pokemons: data.results,
				isLoaded: true,
			});
		})
		.catch((err) => {
			setTimeout(() => {
				console.warn('paso w segundoa');
				dispatch({
					type: FETCH_POKEMONS,
					isLoaded: true,
				});
			}, 6000);
			console.log('pokemons', pokemonsJson);
			dispatch({
				type: FETCH_POKEMONS,
				// pokemons: pokemonsJson.pokemons,
				isLoaded: false,
				message: 'Uy! no pudimos cargar más pokemones, revisa tu conexión a internet.',
				error: err,
			});
		});
};

export { fetchPokemonsAction };

export default function dataReducer(state = { data: [], isLoaded: false, message: null }, action) {
	const { isLoaded } = action;
	switch (action.type) {
	case FETCH_POKEMONS:
		if (isLoaded) {
			return { data: state.data.concat(action.pokemons), isLoaded: true, message: null };
		}

		return { data: state.data.concat(action.pokemons), isLoaded: false, message: action.message };


		// return {
		// 	...state,
		// 	data: state.data.concat([
		// 		{
		// 			url: 'https://pokeapi.co/api/v2/pokemon/697/',
		// 			name: 'tyrantrum',
		// 		},
		// 		{
		// 			url: 'https://pokeapi.co/api/v2/pokemon/698/',
		// 			name: 'amaura',
		// 		},
		// 		{
		// 			url: 'https://pokeapi.co/api/v2/pokemon/699/',
		// 			name: 'aurorus',
		// 		},
		// 		{
		// 			url: 'https://pokeapi.co/api/v2/pokemon/700/',
		// 			name: 'sylveon',
		// 		},
		// 		{
		// 			url: 'https://pokeapi.co/api/v2/pokemon/701/',
		// 			name: 'hawlucha',
		// 		},
		// 		{
		// 			url: 'https://pokeapi.co/api/v2/pokemon/702/',
		// 			name: 'dedenne',
		// 		},
		// 		{
		// 			url: 'https://pokeapi.co/api/v2/pokemon/703/',
		// 			name: 'carbink',
		// 		},
		// 		{
		// 			url: 'https://pokeapi.co/api/v2/pokemon/704/',
		// 			name: 'goomy',
		// 		},
		// 		{
		// 			url: 'https://pokeapi.co/api/v2/pokemon/705/',
		// 			name: 'sliggoo',
		// 		},
		// 		{
		// 			url: 'https://pokeapi.co/api/v2/pokemon/706/',
		// 			name: 'goodra',
		// 		}]),
		// };

	default: return state;
	}
}