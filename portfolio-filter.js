/**
 * Portfolio Filter Script
 * Handles filtering functionality for the portfolio grid
 */

document.addEventListener('DOMContentLoaded', function() {
    initPortfolioFilter();
});

/**
 * Initialize portfolio filtering functionality
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Only run if we have filter buttons and portfolio items
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        // Add click event to each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Announce filter change to screen readers
                announceFilterChange(filterValue);
                
                // Filter the portfolio items
                filterPortfolioItems(filterValue);
            });
        });
        
        // Initially show all items
        filterPortfolioItems('all');
    }
}

/**
 * Filter portfolio items based on category
 * @param {string} category - The category to filter by
 */
function filterPortfolioItems(category) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        // Check if we're showing all items or if the item matches the category
        if (category === 'all' || item.classList.contains(category)) {
            // Show the item with a fade-in effect
            item.style.opacity = '0';
            item.style.display = 'block';
            
            // Use setTimeout to create a smoother transition
            setTimeout(() => {
                item.style.opacity = '1';
            }, 50);
        } else {
            // Hide the item
            item.style.opacity = '0';
            
            // Wait for the fade-out transition before removing from the layout
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

/**
 * Announce filter change to screen readers
 * @param {string} category - The selected category
 */
function announceFilterChange(category) {
    const announcer = document.getElementById('screen-reader-announcer');
    
    if (announcer) {
        let message = '';
        
        switch(category) {
            case 'all':
                message = 'Showing all portfolio projects';
                break;
            case 'network-security':
                message = 'Filtered to show only Network Security projects';
                break;
            case 'web-security':
                message = 'Filtered to show only Web Security projects';
                break;
            case 'tools':
                message = 'Filtered to show only Security Tools projects';
                break;
            default:
                message = `Filtered to show ${category} projects`;
        }
        
        announcer.textContent = message;
    }
}
