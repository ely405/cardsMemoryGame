import pokemonsJson from '../../pokemons.json';

const FETCH_POKEMONS = 'app/pokemonData/FETCH_POKEMONS';
const LOAD_OFFLINE_POKEMONS = 'app/pokemonData/LOAD_OFFLINE_POKEMONS';

const fetchPokemonsAction = () => (dispatch) => {
	const randomNumber = Math.floor(Math.random() * 800);

	return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=15&offset=${randomNumber}`)
		.then(response => response.json())
		.then((data) => {
			dispatch({
				type: FETCH_POKEMONS,
				pokemons: data.results,
				isLoaded: true,
				message: 'Ahora puedes jugar con los nuevos pokemones :)',
			});
			setTimeout(() => {
				dispatch({
					type: FETCH_POKEMONS,
					pokemons: [],
				});
			}, 5000);
		})
		.catch((err) => {
			setTimeout(() => {
				dispatch({
					type: FETCH_POKEMONS,
					pokemons: [],
				});
			}, 5000);
			dispatch({
				type: FETCH_POKEMONS,
				pokemons: [],
				isLoaded: false,
				message: 'Uy! no pudimos cargar más pokemones, revisa tu conexión a internet.',
				error: err,
			});
		});
};

const loadOfflinePokemonsAction = () => ({ type: LOAD_OFFLINE_POKEMONS });

export { fetchPokemonsAction, loadOfflinePokemonsAction };

export default function dataReducer(state = { data: [], isLoad: null, message: null }, action) {
	const { isLoaded, pokemons } = action;
	const { data } = state;

	switch (action.type) {
	case FETCH_POKEMONS:
		if (isLoaded) {
			if (pokemons.length > 0) data.splice(0, data.length);
			return { data: state.data.concat(action.pokemons), isLoad: true, message: action.message };
		} else if (isLoaded === undefined) {
			return { ...state, isLoad: isLoaded, message: action.message };
		}
		return { ...state, isLoad: false, message: action.message };

	case LOAD_OFFLINE_POKEMONS:
		return { ...state, data: data.concat(pokemonsJson.pokemons) };

	default: return state;
	}
}