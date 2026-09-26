// TheMealDB's free public test API - "1" is the official demo key, no
// sign-up needed. https://www.themealdb.com/api.php
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchMealsByName(query) {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.meals; // this API returns null (not an empty array) when nothing matches
}

export async function getMealById(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export async function getRandomMeal() {
  const res = await fetch(`${BASE_URL}/random.php`);
  const data = await res.json();
  return data.meals[0];
}

// TheMealDB stores ingredients as separate strIngredient1..20 and
// strMeasure1..20 fields instead of a proper array, and most of them are
// empty. This loops through all 20, pairs each ingredient with its measure,
// and skips any empty slots - turning a messy flat object into a clean list.
export function getIngredientsList(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim());
    }
  }
  return ingredients;
}
