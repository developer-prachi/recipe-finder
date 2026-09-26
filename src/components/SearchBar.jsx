import { useState } from 'react';

export default function SearchBar({ onSearch, onRandom, disabled }) {
  const [query, setQuery] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  }

  return (
    <form className="search-panel mb-4" onSubmit={handleSubmit}>
      <div className="search-panel__field">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <input
          type="text"
          className="form-control"
          placeholder="Search for a recipe (e.g. chicken, pasta, cake)"
          aria-label="Search for a recipe"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={disabled}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={disabled}>
        Search
      </button>
      <button type="button" className="btn btn-outline-secondary" disabled={disabled} onClick={onRandom}>
        Surprise me
      </button>
    </form>
  );
}
