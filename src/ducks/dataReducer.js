import pokemonsJson from '../../pokemons.json';


const FETCH_POKEMONS = 'app/pokemonData/FETCH_POKEMONS';

const fetchPokemonsAction = () => (dispatch) => {
	const randomNumber = Math.floor(Math.random() * 800);
	dispatch({
		type: FETCH_POKEMONS,
		pokemons: pokemonsJson.pokemons,
		isLoaded: true,
	});

	// console.warn('pokemons json', pokemonsJson.pokemons.concat('hola'));


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
					pokemons: [],
				});
			}, 6000);
			console.log('pokemons', pokemonsJson);
			dispatch({
				type: FETCH_POKEMONS,
				pokemons: [],
				isLoaded: false,
				message: 'Uy! no pudimos cargar más pokemones, revisa tu conexión a internet.',
				error: err,
			});
		});
};

export { fetchPokemonsAction };

export default function dataReducer(state = { data: [], isLoaded: false, message: null }, action) {
	const { isLoaded, pokemons } = action;
	const { data } = state;
	switch (action.type) {
	case FETCH_POKEMONS:
		console.warn('action data', action.pokemons, action.type);
		if (isLoaded) {
			if (pokemons.length > 0) data.splice(0, data.length);
			return { data: state.data.concat(action.pokemons), isLoaded: true, message: null };
		}

		return { ...state, isLoaded: false, message: action.message };

	default: return state;
	}
}