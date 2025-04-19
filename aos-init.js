/**
 * AOS (Animate On Scroll) Initialization
 * Configures and initializes the AOS library for scroll animations
 */

// Initialize AOS with custom settings when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if AOS is available
    if (typeof AOS !== 'undefined') {
        // Initialize AOS with options
        AOS.init({
            // Global settings:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 800, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
            
            // Disable animations if user prefers reduced motion
            disable: function() {
                return window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
                       document.body.classList.contains('reduce-motion');
            }
        });
        
        // Refresh AOS when window is resized to recalculate positions
        window.addEventListener('resize', function() {
            AOS.refresh();
        });
    } else {
        console.warn('AOS library not loaded. Animations will not work.');
    }
});
