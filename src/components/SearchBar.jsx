import { useState } from 'react';

export default function SearchBar({ onSearch, onRandom, disabled }) {
  const [query, setQuery] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  }

  return (
    <form className="d-flex gap-2 mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Search for a recipe (e.g. chicken, pasta, cake)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" className="btn btn-primary" disabled={disabled}>
        Search
      </button>
      <button type="button" className="btn btn-outline-secondary" disabled={disabled} onClick={onRandom}>
        Surprise me
      </button>
    </form>
  );
}
