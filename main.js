/**
 * Main JavaScript file
 * Handles core functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initMobileMenu();
    initBackToTop();
    initFormValidation();
    
    // Announce to screen readers that the page has loaded
    announceToScreenReader("Page loaded successfully");
});

/**
 * Initialize header behavior (transparent to solid on scroll)
 */
function initHeader() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileLinks = document.getElementById('mobile-links');
    const screenReaderAnnouncer = document.getElementById('screen-reader-announcer');
    
    if (mobileMenuBtn && mobileLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu visibility
            mobileLinks.classList.add('active');
            
            // Use setTimeout to allow CSS transition to work properly
            setTimeout(function() {
                if (isExpanded) {
                    mobileLinks.classList.remove('menu-visible');
                    announceToScreenReader("Mobile menu closed");
                } else {
                    mobileLinks.classList.add('menu-visible');
                    announceToScreenReader("Mobile menu opened");
                }
            }, 10);
            
            // Update aria-expanded attribute
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            
            // Change icon based on menu state
            if (!isExpanded) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Use setTimeout to hide the menu completely after transition
                setTimeout(function() {
                    if (!mobileLinks.classList.contains('menu-visible')) {
                        mobileLinks.classList.remove('active');
                    }
                }, 300);
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isMenuButton = event.target === mobileMenuBtn || mobileMenuBtn.contains(event.target);
            const isInsideMenu = mobileLinks.contains(event.target);
            
            if (!isMenuButton && !isInsideMenu && mobileLinks.classList.contains('menu-visible')) {
                mobileMenuBtn.click();
            }
        });
    }
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const formStatus = document.getElementById('form-status');
        
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');
        
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Reset error messages
            nameError.textContent = '';
            emailError.textContent = '';
            subjectError.textContent = '';
            messageError.textContent = '';
            
            // Reset form status
            formStatus.textContent = '';
            formStatus.className = 'form-status';
            
            // Validate name
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Please enter your name';
                nameInput.focus();
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address';
                emailInput.focus();
                return;
            }
            
            // Validate subject
            if (subjectInput.value.trim() === '') {
                subjectError.textContent = 'Please enter a subject';
                subjectInput.focus();
                return;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Please enter your message';
                messageInput.focus();
                return;
            }
            
            // If all validation passes, show success message
            formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
            formStatus.className = 'form-status success';
            announceToScreenReader("Form submitted successfully. Thank you for your message!");
            
            // Reset form
            contactForm.reset();
        });
    }
}

/**
 * Announce message to screen reader
 * @param {string} message - The message to announce
 */
function announceToScreenReader(message) {
    const announcer = document.getElementById('screen-reader-announcer');
    
    if (announcer) {
        announcer.textContent = message;
    }
}
