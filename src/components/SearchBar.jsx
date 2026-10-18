import { useId } from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  const searchId = useId();

  return (
    <div className="search-bar">
      <label htmlFor={searchId}>Search bakery items:</label>
      <input
        id={searchId}
        type="search"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;