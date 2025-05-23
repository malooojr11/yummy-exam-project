// Get reference to the container for meal details
const mealDetails = document.querySelector('.meal-details');
// Parse URL parameters to get meal ID
const params = new URLSearchParams(window.location.search);

// Extract meal ID from URL parameters
const mealId = params.get("id");

// Only fetch meal details if both container and ID exist
if (mealDetails && mealId) {
    getMealDetails(mealId);
}


export async function getMealDetails(id) {
    // Fetch meal details from API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    const meal = data.meals[0];

    // Extract ingredients and measurements
    const recipes = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            recipes.push(`${measure} ${ingredient}`.trim());
        }
    }

    // Generate HTML for recipe badges
    const recipesHTML = recipes.map(item => `<li class="badge bg-info m-2">${item}</li>`).join('');

    // Prepare external links (Source and YouTube)
    const tags = [
        { name: "Source", url: meal.strSource },
        { name: "YouTube", url: meal.strYoutube }
    ];
    // Generate HTML for external link badges
    const tagsHTML = tags
        .filter(tag => tag.url && tag.url.trim() !== "")
        .map(tag => `<li class="badge bg-secondary m-2"><a href="${tag.url}" target="_blank" class="text-white text-decoration-none">${tag.name}</a></li>`)
        .join('');

    // Build complete meal detail template
    const cartona = `
        <div class="col-6">
            <div class="meal-img w-75">
                <img src="${meal.strMealThumb}" alt="Meal Image" class="img-fluid" id="meal-image">
            </div>
            <div class="meal-title mt-2">
                <h2 id="meal-name">${meal.strMeal}</h2>
            </div>
        </div>
        <div class="col-6">
            <div class="meal-info">
                <h3>Meal Information</h3>
                <p id="meal-instructions">${meal.strInstructions}</p>
                <h3 id="meal-area">${meal.strArea}</h3>
            </div>
            <div class="meal-category">
                <p>Category: <span class="category" id="meal-category">${meal.strCategory}</span></p>
            </div>
            <div class="meal-recipes">
                <h3>Recipes :</h3>
                <ul id="meal-recipes" class="list-unstyled d-flex flex-wrap">
                    ${recipesHTML}
                </ul>
            </div>
            <div class="tags">
                <h3>Tags :</h3>
                <ul id="meal-tags" class="list-unstyled d-flex flex-wrap">
                    ${tagsHTML}
                </ul>
            </div>
        </div>`;

    // Insert the generated HTML into the meal details container
    mealDetails.innerHTML = cartona;
}
