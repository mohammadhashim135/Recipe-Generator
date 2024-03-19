const recipeContainer = document.getElementById('recipe-container');
const generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', generateRandomIndianRecipe);

async function generateRandomIndianRecipe() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=indian');
        const data = await response.json();
        const recipes = data.meals;
        const randomIndex = Math.floor(Math.random() * recipes.length);
        const randomRecipeId = recipes[randomIndex].idMeal;
        const recipeResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomRecipeId}`);
        const recipeData = await recipeResponse.json();
        const recipe = recipeData.meals[0];
        displayRecipe(recipe);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        recipeContainer.textContent = 'Failed to fetch recipe. Please try again later.';
    }
}

function displayRecipe(recipe) {
    recipeContainer.innerHTML = `
        <h2>${recipe.strMeal}</h2>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" style="max-width: 100%;">
        <h3>Ingredients</h3>
        <ul>
            ${getIngredients(recipe).join('')}
        </ul>
        <h3>Instructions</h3>
        <p>${recipe.strInstructions}</p>
    `;
}

function getIngredients(recipe) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredients.push(`<li>${measure} ${ingredient}</li>`);
        }
    }
    return ingredients;
}
