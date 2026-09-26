export default function RecipeCard({ meal, onSelect }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm" role="button" onClick={() => onSelect(meal.idMeal)}>
        <img src={meal.strMealThumb} className="card-img-top" alt={meal.strMeal} />
        <div className="card-body">
          <h5 className="card-title h6 mb-0">{meal.strMeal}</h5>
        </div>
      </div>
    </div>
  );
}
