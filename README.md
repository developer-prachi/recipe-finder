# Recipe Finder

Search for recipes by name, or hit "Surprise me" for a random one - built in
React, pulling live data from [TheMealDB](https://www.themealdb.com), a free
public recipe API that needs no sign-up or API key.

**[Live demo](https://developer-prachi.github.io/recipe-finder/)** · **[Code](https://github.com/developer-prachi/recipe-finder)**

## Features

- Live search against a public API (not a hardcoded list of recipes)
- Random recipe button, using a different API endpoint
- Full recipe detail view - ingredients, instructions, a YouTube link when
  the API has one
- Loading, empty ("no results"), and error states, not just the happy path

## The trickiest part

TheMealDB doesn't give you ingredients as a clean array. Instead, each
recipe has up to 20 separate fields: `strIngredient1`, `strIngredient2`, …
`strIngredient20`, and a matching `strMeasure1`...`strMeasure20` - most of
them empty. `getIngredientsList()` in `src/utils/mealApi.js` loops through
all 20, pairs each ingredient with its measure, and skips the empty ones,
turning that mess into a normal list you can `.map()` over.

## Stack

React 18, Vite, Bootstrap 5 (via CDN link in `index.html`).

## Project structure

```
src/
  App.jsx                 all the state: search results, selected recipe, loading/error
  index.css                a couple of hover-effect lines, Bootstrap does the rest
  components/
    SearchBar.jsx           the search input + Search/Surprise me buttons
    RecipeCard.jsx           one recipe thumbnail in the results grid
    RecipeDetail.jsx         full recipe view - ingredients, instructions, video link
  utils/
    mealApi.js               all the fetch calls + the ingredient-list helper
```

## Running it locally

```bash
npm install
npm run dev
```

## Deploying

```bash
npm run deploy
```

Builds the app and pushes `dist/` to a `gh-pages` branch - enable GitHub
Pages on that branch in your repo settings. Or drag the `dist/` folder
(after `npm run build`) onto [app.netlify.com/drop](https://app.netlify.com/drop).
