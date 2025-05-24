// ===== main.js =====
// Handles shared functionality across all pages

/**
 * Toggles the sidebar visibility and updates the toggle button icon
 * Exported for use in other modules
 */
export function toggleSidebar() {
    const sidebar = document.querySelector('.mainSideBar');
    const toggleBtn = document.getElementById('toggleSidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function() {
            // Toggle the 'open' class on sidebar
            sidebar.classList.toggle('open');
            
            // Update the icon based on sidebar state
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('open')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
}

// Initialize sidebar toggle functionality when script loads
toggleSidebar();

/**
 * Adds click handlers to meal cards for navigation to meal details
 * Exported for use in other modules
 */
export function openCard() {
    const allMealItems = document.querySelectorAll('.item');
    
    allMealItems.forEach(mealItem => {
        mealItem.addEventListener('click', function() {
            const mealId = this.getAttribute('data-id');
            if (mealId) {
                window.location.href = `meal.html?id=${(mealId)}`;
            }
        });
    });
}


export function display(meals, containerElement) {
    // Validate container element
    if (!containerElement) {
        console.error('Container element not found');
        return;
    }

    // Show message if no meals found
    if (!meals || meals.length === 0) {
        containerElement.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3 class="text-muted">No meals found</h3>
                <p class="text-light">Please try a different search</p>
            </div>`;
        return;
    }

    // Start building responsive grid layout
    let html = `<div class="row g-4">`;

    // Generate HTML for each meal card
    meals.forEach(meal => {
        html += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="item h-100" data-id="${meal.idMeal}">
                    <div class="item-img overflow-hidden rounded-top">
                        <img src="${meal.strMealThumb}" 
                             alt="${meal.strMeal}" 
                             class="img-fluid w-100"
                             loading="lazy">
                    </div>
                    <div class="overlay p-3">
                        <h4 class="text-dark mb-2">${meal.strMeal}</h4>
                        <button class="btn btn-sm btn-primary">View Details</button>
                    </div>
                </div>
            </div>`;
    });

    // Close grid container and render to DOM
    html += `</div>`;
    containerElement.innerHTML = html;
    
    // Initialize click handlers for new cards
    openCard();
}

// Add fade-in animation to main content when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.querySelector('.mainContent');
    if (mainContent) {
        mainContent.style.animation = 'fadeIn 0.5s ease-out forwards';
    }
});