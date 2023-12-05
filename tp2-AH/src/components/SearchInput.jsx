import React, { useState } from "react";

function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-container">
    <label className="search-label">Buscar</label>
    <input
      type="text"
      placeholder="Escriba aquí..."
      value={searchTerm}
      onChange={handleSearch}
      className="search-input"
    />
  </div>
  );
}

export default SearchInput;

