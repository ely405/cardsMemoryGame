const FETCH_POKEMONS = 'app/pokemonData/FETCH_POKEMONS';

const fetchPokemonsAction = () => ({ type: FETCH_POKEMONS });

export { fetchPokemonsAction };

export default function dataReducer(state = [], action) {
	let arr = [];
	let randomNumber;
	switch (action.type) {
	case FETCH_POKEMONS:
		randomNumber = Math.floor(Math.random() * 800);
		fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${randomNumber}`)
			.then(response => response.json())
			.then((data) => {
				console.log('fetch data	', data);
				arr = data.results;
			})
			.catch((err) => {
				// alert('No se pudo cargar los pokemones');
				console.log(err);
			});

		return state.concat(arr);
	default: return state;
	}
}