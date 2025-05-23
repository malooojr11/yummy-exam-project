// Get reference to the ingredients container element (duplicate reference)
const row = document.getElementById('ingredientsContainer')

// Get reference to the ingredients container element
const container = document.getElementById('ingredientsContainer');

/**
 * Fetches and displays ingredients from TheMealDB API
 * Limits display to first 30 ingredients
 * Creates clickable cards for each ingredient
 */
async function getIngredients() {
    // Fetch list of ingredients from API
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    // Parse JSON response
    const data = await response.json();
    // Get first 30 ingredients only
    const ingredients = data.meals.slice(0, 30); 

    // Initialize HTML string for building ingredient cards
    let cartona = ``;
    // Loop through ingredients to create HTML for each card
    for (let i = 0; i < ingredients.length; i++) {
        const ing = ingredients[i];

        // Build HTML for ingredient card
        // Each card includes:
        // - Ingredient name
        // - Description (truncated to 100 chars or fallback text)
        // - Data attribute for ingredient name
        cartona += `
        <div class="col-3">
            <div class="item position-relative overflow-hidden" data-ing="${ing.strIngredient}">
                <div class="item-img w-100 text-center p-3 border rounded">
                <h4>${ing.strIngredient}</h4>
                <p class="small">${ing.strDescription?.slice(0, 100) || "No description available"}</p>
                </div>
            </div>
        </div>`;
    }

    // Insert all ingredient cards into container
    container.innerHTML = cartona;

    // Add click handlers to each ingredient card
    // Redirects to ingredientMeals.html with selected ingredient as URL parameter
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', function () {
            const ingredient = this.getAttribute('data-ing');
            window.location.href = `ingredientMeals.html?ingredient=${encodeURIComponent(ingredient)}`;
        });
    });
}

// Initialize the page by fetching and displaying ingredients
getIngredients();