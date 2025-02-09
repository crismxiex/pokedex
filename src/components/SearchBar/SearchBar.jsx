import './SearchBar.css';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="clear-button"
            onClick={() => onSearchChange('')}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;