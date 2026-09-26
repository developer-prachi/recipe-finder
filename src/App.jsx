import { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import { SiteBar, SiteFooter } from './components/SiteChrome';
import { searchMealsByName, getMealById, getRandomMeal } from './utils/mealApi';

// status: 'idle' | 'loading' | 'success' | 'empty' | 'error'
export default function App() {
  const [status, setStatus] = useState('idle');
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Derived on every render instead of stored as its own state - it's just
  // "are we waiting on something," which we can always work out from the
  // state we already have.
  const busy = status === 'loading' || detailLoading;

  async function handleSearch(query) {
    setSelectedMeal(null);
    setStatus('loading');
    try {
      const results = await searchMealsByName(query);
      if (!results) {
        setMeals([]);
        setStatus('empty');
      } else {
        setMeals(results);
        setStatus('success');
      }
    } catch (err) {
      setErrorMessage('Could not reach the recipe service. Check your connection and try again.');
      setStatus('error');
    }
  }

  async function handleSelectMeal(id) {
    setDetailLoading(true);
    try {
      const meal = await getMealById(id);
      setSelectedMeal(meal);
    } catch (err) {
      setErrorMessage('Could not load that recipe. Try again.');
      setStatus('error');
    } finally {
      setDetailLoading(false);
    }
  }

  async function handleRandom() {
    setStatus('loading');
    try {
      const meal = await getRandomMeal();
      setSelectedMeal(meal);
      setStatus('idle');
    } catch (err) {
      setErrorMessage('Could not reach the recipe service. Check your connection and try again.');
      setStatus('error');
    }
  }

  function handleBack() {
    setSelectedMeal(null);
  }

  return (
    <>
      <SiteBar title="Recipe Finder" />
      <main className="container page">
        <header className="mb-4">
          <p className="eyebrow">Powered by TheMealDB</p>
          <h1 className="page-title">
            Recipe <em className="accent-em">Finder</em>
          </h1>
          <p className="lede mb-0">Search thousands of meals by name, or let &ldquo;Surprise me&rdquo; pick dinner for you.</p>
        </header>

        {!selectedMeal && <SearchBar onSearch={handleSearch} onRandom={handleRandom} disabled={busy} />}

        {busy && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading…</span>
            </div>
          </div>
        )}

        {selectedMeal && !busy && <RecipeDetail meal={selectedMeal} onBack={handleBack} />}

        {!selectedMeal && !busy && status === 'error' && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        {!selectedMeal && !busy && status === 'empty' && (
          <div className="alert alert-warning">No recipes found. Try a different search.</div>
        )}

        {!selectedMeal && !busy && status === 'idle' && meals.length === 0 && (
          <div className="hint">
            <span className="hint__icon" aria-hidden="true">&#127859;</span>
            <span>Search for a dish above, or hit &ldquo;Surprise me&rdquo; for a random recipe.</span>
          </div>
        )}

        {!selectedMeal && !busy && status === 'success' && (
          <div className="row row-cols-2 row-cols-md-3 g-3 g-md-4">
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} onSelect={handleSelectMeal} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter repo="recipe-finder" />
    </>
  );
}
