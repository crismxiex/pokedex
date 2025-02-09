const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async (limit = 20) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error('Failed to fetch Pokemon');
  }
};

export const getPokemonDetails = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch Pokemon details');
  }
};