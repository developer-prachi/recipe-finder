export default function RecipeCard({ meal, onSelect }) {
  return (
    <div className="col">
      <div className="card recipe-card h-100 shadow-sm" role="button" onClick={() => onSelect(meal.idMeal)}>
        <div className="recipe-card__img">
          <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
        </div>
        <div className="card-body">
          <h5 className="card-title recipe-card__title mb-0">{meal.strMeal}</h5>
        </div>
      </div>
    </div>
  );
}
