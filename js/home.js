// Import required functions from main.js
import {display, openCard} from './main.js'

// Get reference to the container element with class 'row'
const row = document.querySelector('.row');

/**
 * Fetches and displays meals from TheMealDB API
 * This async function performs the following:
 * 1. Fetches meals data from the API
 * 2. Converts response to JSON
 * 3. Displays meals in the UI
 * 4. Sets up card opening functionality
 */
async function displayMeals() {
    // Fetch meals data from TheMealDB API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    // Parse JSON response
    const data = await response.json();
    // Extract meals array from response
    const meals = data.meals;

    // Display meals in the row container
    display(meals,row)

    // Initialize card opening functionality
    openCard()
}

// Execute the displayMeals function when the script loads
displayMeals()

