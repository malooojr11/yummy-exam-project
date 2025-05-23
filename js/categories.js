// Import helper functions from main.js
import { display, openCard } from './main.js';


export async function getCategories() {
    // Get the container element where categories will be displayed
    const container = document.getElementById('categoryElem');
    if (!container) return; // Exit if container not found

    try {
        // Fetch categories from TheMealDB API
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        if (!response.ok) throw new Error('Network response was not ok');
        
        // Parse response and extract categories array
        const data = await response.json();
        const categories = data.categories || []; // Use empty array as fallback
        
        // Display the categories in the container
        displayCategories(categories, container);
    } catch (error) {
        // Handle any errors that occur during fetching
        console.error('Error fetching categories:', error);
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3 class="text-danger">Error loading categories</h3>
                <p>Please try again later</p>
            </div>`;
    }
}

function displayCategories(categories, container) {
    // Show message if no categories available
    if (!categories.length) {
        container.innerHTML = `<p class="text-center text-muted">No categories found</p>`;
        return;
    }

    // Start building HTML for category grid
    let html = `<div class="row g-4">`;
    
    // Generate HTML for each category card
    categories.forEach(category => {
        html += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="item h-100" data-id="${category.idCategory}">
                    <div class="item-img overflow-hidden rounded-top">
                        <img src="${category.strCategoryThumb}" 
                             alt="${category.strCategory}" 
                             class="img-fluid w-100"
                             loading="lazy">
                    </div>
                    <div class="overlay p-3">
                        <h4 class="text-dark">${category.strCategory}</h4>
                        <p class="small text-muted">${category.strCategoryDescription.slice(0, 100)}...</p>
                        <button class="btn btn-sm btn-primary mt-2">View Meals</button>
                    </div>
                </div>
            </div>`;
    });
    
    html += `</div>`;
    container.innerHTML = html;

    // Add click handlers to each category card
    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('h4').textContent.trim();
            window.location.href = `category.html?category=${(categoryName)}`;
        });
    });
}

async function getMealsByCategory(category) {
    // Get container for category meals
    const container = document.getElementById('categoryMealsContainer');
    if (!container) return;

    try {
        // Fetch meals for the specified category
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        // Display meals and initialize card functionality
        const data = await response.json();
        display(data.meals || [], container);
        openCard();
    } catch (error) {
        // Handle any errors that occur during fetching
        console.error('Error fetching meals:', error);
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3 class="text-danger">Error loading meals</h3>
                <p>Please try again later</p>
            </div>`;
    }
}

// Initialize page based on URL parameters
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('category');

// Either show category meals or all categories based on URL parameter
if (categoryParam) {
    getMealsByCategory(categoryParam);
} else {
    getCategories();
}