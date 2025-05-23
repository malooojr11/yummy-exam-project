// Import the display function from main.js for rendering meals
import { display } from './main.js'; 

// Get reference to the container where meals will be displayed
const container = document.getElementById('mealsByIngredientContainer');
// Parse URL parameters to get query string data
const urlParams = new URLSearchParams(window.location.search);
// Extract the 'ingredient' parameter from the URL
const ingredient = urlParams.get('ingredient');


async function getMealsByIngredient(ing) {
    // Fetch meals from TheMealDB API that contain the specified ingredient
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
    // Parse the JSON response
    const data = await response.json();
    // Display the meals in the container
    display(data.meals, container);
}

// If an ingredient parameter exists in the URL, fetch and display related meals
if (ingredient) {
    getMealsByIngredient(ingredient);
}
