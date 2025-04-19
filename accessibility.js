/**
 * Accessibility Features Script
 * Handles the accessibility menu and related functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    const accessibilityToggle = document.getElementById('accessibility-toggle');
    const accessibilityMenu = document.getElementById('accessibility-menu');
    const closeAccessibilityBtn = document.getElementById('close-accessibility');

    // Toggle buttons
    const reduceMotionToggle = document.getElementById('reduce-motion');
    const colorblindModeToggle = document.getElementById('colorblind-mode');
    const fontSizeOptions = document.querySelectorAll('input[name="font-size"]');

    // Initialize accessibility features
    initAccessibilityMenu();
    loadSavedSettings();

    function initAccessibilityMenu() {
        if (accessibilityToggle && accessibilityMenu && closeAccessibilityBtn) {
            accessibilityToggle.addEventListener('click', function(e) {
                e.preventDefault();
                accessibilityMenu.classList.add('active');
            });

            closeAccessibilityBtn.addEventListener('click', function() {
                accessibilityMenu.classList.remove('active');
            });

            // Close on outside click
            document.addEventListener('click', function(e) {
                if (!accessibilityMenu.contains(e.target) && 
                    !accessibilityToggle.contains(e.target) && 
                    accessibilityMenu.classList.contains('active')) {
                    accessibilityMenu.classList.remove('active');
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && accessibilityMenu.classList.contains('active')) {
                    accessibilityMenu.classList.remove('active');
                }
            });
        }

        // Initialize toggle listeners
        if (reduceMotionToggle) {
            reduceMotionToggle.addEventListener('change', function() {
                document.body.classList.toggle('reduce-motion', this.checked);
                localStorage.setItem('reduce-motion', this.checked);
            });
        }

        if (colorblindModeToggle) {
            colorblindModeToggle.addEventListener('change', function() {
                document.body.classList.toggle('colorblind', this.checked);
                localStorage.setItem('colorblind-mode', this.checked);
            });
        }

        fontSizeOptions.forEach(option => {
            option.addEventListener('change', function() {
                setFontSize(this.value);
            });
        });
    }

    function loadSavedSettings() {
        // Load saved settings from localStorage
        const reduceMotion = localStorage.getItem('reduce-motion') === 'true';
        const colorblind = localStorage.getItem('colorblind-mode') === 'true';
        const fontSize = localStorage.getItem('font-size') || 'normal';

        // Apply saved settings
        if (reduceMotionToggle) {
            reduceMotionToggle.checked = reduceMotion;
            document.body.classList.toggle('reduce-motion', reduceMotion);
        }

        if (colorblindModeToggle) {
            colorblindModeToggle.checked = colorblind;
            document.body.classList.toggle('colorblind', colorblind);
        }

        setFontSize(fontSize);
        const fontSizeInput = document.querySelector(`input[name="font-size"][value="${fontSize}"]`);
        if (fontSizeInput) {
            fontSizeInput.checked = true;
        }
    }

    function setFontSize(size) {
        document.body.classList.remove('font-large', 'font-extra-large');
        if (size !== 'normal') {
            document.body.classList.add(`font-${size}`);
        }
        localStorage.setItem('font-size', size);
    }
});

/**
 * Announce a message to screen readers
 * @param {string} message - The message to announce
 */
function announceToScreenReader(message) {
    const announcer = document.getElementById('screen-reader-announcer');

    if (announcer) {
        announcer.textContent = message;
    }
}