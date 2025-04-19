/**
 * Contact Form JavaScript
 * Handles form validation and submission with Tokyo-inspired styling for feedback
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        initContactForm();
    }
    
    /**
     * Initialize contact form functionality
     */
    function initContactForm() {
        // Form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const formStatus = document.getElementById('form-status');
        
        // Add input event listeners for real-time validation
        if (nameInput) nameInput.addEventListener('input', function() { validateName(this); });
        if (emailInput) emailInput.addEventListener('input', function() { validateEmail(this); });
        if (subjectInput) subjectInput.addEventListener('input', function() { validateSubject(this); });
        if (messageInput) messageInput.addEventListener('input', function() { validateMessage(this); });
        
        // Form submission handler
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Reset form status
            if (formStatus) {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }
            
            // Validate all fields
            const isNameValid = validateName(nameInput);
            const isEmailValid = validateEmail(emailInput);
            const isSubjectValid = validateSubject(subjectInput);
            const isMessageValid = validateMessage(messageInput);
            
            // Submit if all validations pass
            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                }
                
                // Simulate form submission (would be replaced with actual AJAX in production)
                setTimeout(function() {
                    showSuccessMessage();
                    resetForm();
                    
                    // Reset button
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerHTML = 'Send Message';
                    }
                }, 1500);
            } else {
                // Show error message
                if (formStatus) {
                    formStatus.textContent = 'Please correct the errors in the form.';
                    formStatus.className = 'form-status error';
                }
            }
        });
    }
    
    /**
     * Validate name field
     * @param {HTMLElement} input - The name input element
     * @returns {boolean} Whether the input is valid
     */
    function validateName(input) {
        if (!input) return false;
        
        const errorElement = document.getElementById('name-error');
        
        // Clear error
        if (errorElement) errorElement.textContent = '';
        input.classList.remove('error');
        
        // Validate
        if (!input.value.trim()) {
            input.classList.add('error');
            if (errorElement) errorElement.textContent = 'Please enter your name';
            return false;
        }
        
        return true;
    }
    
    /**
     * Validate email field
     * @param {HTMLElement} input - The email input element
     * @returns {boolean} Whether the input is valid
     */
    function validateEmail(input) {
        if (!input) return false;
        
        const errorElement = document.getElementById('email-error');
        
        // Clear error
        if (errorElement) errorElement.textContent = '';
        input.classList.remove('error');
        
        // Validate empty
        if (!input.value.trim()) {
            input.classList.add('error');
            if (errorElement) errorElement.textContent = 'Please enter your email address';
            return false;
        }
        
        // Validate format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            input.classList.add('error');
            if (errorElement) errorElement.textContent = 'Please enter a valid email address';
            return false;
        }
        
        return true;
    }
    
    /**
     * Validate subject field
     * @param {HTMLElement} input - The subject input element
     * @returns {boolean} Whether the input is valid
     */
    function validateSubject(input) {
        if (!input) return false;
        
        const errorElement = document.getElementById('subject-error');
        
        // Clear error
        if (errorElement) errorElement.textContent = '';
        input.classList.remove('error');
        
        // Validate
        if (!input.value.trim()) {
            input.classList.add('error');
            if (errorElement) errorElement.textContent = 'Please enter a subject';
            return false;
        }
        
        return true;
    }
    
    /**
     * Validate message field
     * @param {HTMLElement} input - The message input element
     * @returns {boolean} Whether the input is valid
     */
    function validateMessage(input) {
        if (!input) return false;
        
        const errorElement = document.getElementById('message-error');
        
        // Clear error
        if (errorElement) errorElement.textContent = '';
        input.classList.remove('error');
        
        // Validate
        if (!input.value.trim()) {
            input.classList.add('error');
            if (errorElement) errorElement.textContent = 'Please enter your message';
            return false;
        }
        
        if (input.value.trim().length < 10) {
            input.classList.add('error');
            if (errorElement) errorElement.textContent = 'Your message is too short (minimum 10 characters)';
            return false;
        }
        
        return true;
    }
    
    /**
     * Show success message with Tokyo-inspired styling
     */
    function showSuccessMessage() {
        const formStatus = document.getElementById('form-status');
        if (formStatus) {
            formStatus.innerHTML = `
                <div class="success-animation">
                    <i class="fas fa-check-circle"></i>
                </div>
                <p>Message sent successfully! I'll get back to you soon.</p>
            `;
            formStatus.className = 'form-status success tokyo-glow';
        }
    }
    
    /**
     * Reset form fields after successful submission
     */
    function resetForm() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (subjectInput) subjectInput.value = '';
        if (messageInput) messageInput.value = '';
    }
});