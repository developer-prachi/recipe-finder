import { getIngredientsList } from '../utils/mealApi';

export default function RecipeDetail({ meal, onBack }) {
  const ingredients = getIngredientsList(meal);

  return (
    <div>
      <button className="btn btn-outline-secondary mb-3" onClick={onBack}>
        &larr; Back to results
      </button>

      <div className="card shadow-sm">
        <img
          src={meal.strMealThumb}
          className="card-img-top"
          alt={meal.strMeal}
          style={{ maxHeight: '320px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h2 className="h4">{meal.strMeal}</h2>
          <p className="text-muted mb-3">
            {meal.strCategory}
            {meal.strArea ? ` — ${meal.strArea} cuisine` : ''}
          </p>

          <h3 className="h6">Ingredients</h3>
          <ul>
            {ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="h6">Instructions</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{meal.strInstructions}</p>

          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="btn btn-danger">
              Watch on YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
