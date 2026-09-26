import { getIngredientsList } from '../utils/mealApi';

export default function RecipeDetail({ meal, onBack }) {
  const ingredients = getIngredientsList(meal);

  return (
    <div>
      <button className="btn btn-outline-secondary mb-3" onClick={onBack}>
        &larr; Back to results
      </button>

      <div className="card shadow-sm overflow-hidden">
        <img src={meal.strMealThumb} className="recipe-hero" alt={meal.strMeal} />
        <div className="recipe-detail__body">
          <div className="d-flex flex-wrap gap-2 mb-2">
            {meal.strCategory && <span className="tag">{meal.strCategory}</span>}
            {meal.strArea && <span className="tag">{meal.strArea} cuisine</span>}
          </div>
          <h2 className="recipe-detail__title mb-4">{meal.strMeal}</h2>

          <div className="row g-4">
            <div className="col-md-5">
              <h3 className="section-label">Ingredients</h3>
              <ul className="ingredients">
                {ingredients.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-7">
              <h3 className="section-label">Instructions</h3>
              <p className="instructions">{meal.strInstructions}</p>

              {meal.strYoutube && (
                <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="btn btn-video">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5L8 5.5Z" /></svg>
                  Watch on YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
