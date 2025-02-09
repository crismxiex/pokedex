import { useState, useEffect } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import SearchBar from '../SearchBar/SearchBar';
import Pagination from '../Pagination/Pagination';
import './PokemonGrid.css';

function PokemonGrid() {
  const [pokemon, setPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]); // New state for search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const ITEMS_PER_PAGE = 20;

  // Fetch all Pokemon for search functionality
  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        const allDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setAllPokemon(allDetails);
      } catch (err) {
        console.error('Failed to fetch all Pokemon:', err);
      }
    };

    fetchAllPokemon();
  }, []);

  // Fetch paginated Pokemon for normal viewing
  useEffect(() => {
    const fetchPaginatedPokemon = async () => {
      if (searchTerm) return; // Don't fetch paginated data when searching
      
      try {
        setLoading(true);
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
        );
        const data = await response.json();
        setTotalPokemon(data.count);

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );

        setPokemon(pokemonDetails);
      } catch (err) {
        setError('Failed to fetch Pokemon');
      } finally {
        setLoading(false);
      }
    };

    fetchPaginatedPokemon();
  }, [currentPage, searchTerm]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching

    if (term) {
      const filtered = allPokemon.filter((poke) =>
        poke.name.toLowerCase().includes(term.toLowerCase())
      );
      setPokemon(filtered);
      setTotalPokemon(filtered.length);
    }
  };

  const currentPokemon = searchTerm
    ? pokemon
    : pokemon.slice(0, ITEMS_PER_PAGE);

  const totalPages = Math.ceil(totalPokemon / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && !searchTerm) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="pokemon-container">
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
      />
      
      <div className="pokemon-grid">
        {currentPokemon.map((poke) => (
          <PokemonCard
            key={poke.id}
            name={poke.name}
            id={poke.id}
            types={poke.types}
            image={poke.sprites.front_default}
          />
        ))}
      </div>

      {!searchTerm && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default PokemonGrid;