// Enhanced JavaScript for AI Learning Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initFormHandling();
    initAnimationsOnScroll();
    initBackToTop();
    initContactForm();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    let isMenuOpen = false;
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times text-lg"></i>';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-lg"></i>';
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-lg"></i>';
            document.body.style.overflow = '';
            isMenuOpen = false;
        });
    });
    
    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-lg"></i>';
            document.body.style.overflow = '';
            isMenuOpen = false;
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background opacity based on scroll
        if (scrollTop > 50) {
            header.classList.add('bg-slate-900/95');
            header.classList.remove('bg-slate-900/80');
        } else {
            header.classList.add('bg-slate-900/80');
            header.classList.remove('bg-slate-900/95');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form Handling
function initFormHandling() {
    const studentForm = document.getElementById('studentForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!studentForm) return;
    
    studentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(studentForm);
        const studentData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            degree: formData.get('degree'),
            interests: formData.getAll('interests'),
            experience: formData.get('experience'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // Validate form
        if (!validateForm(studentData)) {
            return;
        }
        
        // Show loading state
        const submitBtn = studentForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Store data locally (you can replace this with actual API call)
            storeStudentData(studentData);
            
            // Show success message
            studentForm.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Reset form after delay
            setTimeout(() => {
                studentForm.reset();
                studentForm.style.display = 'block';
                successMessage.classList.add('hidden');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Reset checkboxes
                const checkboxes = studentForm.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                    const customCheckbox = checkbox.nextElementSibling;
                    if (customCheckbox) {
                        customCheckbox.style.background = '';
                        customCheckbox.style.borderColor = '#475569';
                    }
                });
            }, 5000);
            
        }, 2000);
    });
    
    // Handle checkbox styling
    const checkboxes = document.querySelectorAll('.interest-checkbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const customCheckbox = this.nextElementSibling;
            if (this.checked) {
                customCheckbox.style.background = 'linear-gradient(90deg, #facc15, #fb923c)';
                customCheckbox.style.borderColor = '#f59e0b';
            } else {
                customCheckbox.style.background = '';
                customCheckbox.style.borderColor = '#475569';
            }
        });
    });
}

// Form Validation
function validateForm(data) {
    let isValid = true;
    const errors = [];
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
        highlightError('studentName');
        isValid = false;
    } else {
        removeError('studentName');
    }
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!data.phone || !phoneRegex.test(data.phone.replace(/\D/g, ''))) {
        errors.push('Please enter a valid 10-digit phone number');
        highlightError('studentPhone');
        isValid = false;
    } else {
        removeError('studentPhone');
    }
    
    // Degree validation
    if (!data.degree) {
        errors.push('Please select your current degree');
        highlightError('currentDegree');
        isValid = false;
    } else {
        removeError('currentDegree');
    }
    
    // Interests validation
    if (!data.interests || data.interests.length === 0) {
        errors.push('Please select at least one area of interest');
        showInterestError();
        isValid = false;
    } else {
        removeInterestError();
    }
    
    // Show errors if any
    if (!isValid) {
        showFormErrors(errors);
    }
    
    return isValid;
}

// Error handling functions
function highlightError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/20');
        field.classList.remove('border-slate-600', 'focus:border-amber-500', 'focus:ring-amber-500/20');
    }
}

function removeError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/20');
        field.classList.add('border-slate-600', 'focus:border-amber-500', 'focus:ring-amber-500/20');
    }
}

function showInterestError() {
    const interestSection = document.querySelector('.interest-checkbox').parentElement.parentElement;
    if (interestSection) {
        interestSection.classList.add('border-red-500/50', 'bg-red-500/5');
    }
}

function removeInterestError() {
    const interestSection = document.querySelector('.interest-checkbox').parentElement.parentElement;
    if (interestSection) {
        interestSection.classList.remove('border-red-500/50', 'bg-red-500/5');
    }
}

function showFormErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.form-error-message');
    existingErrors.forEach(error => error.remove());
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6';
    errorDiv.innerHTML = `
        <div class="flex items-start">
            <i class="fas fa-exclamation-triangle text-red-400 mr-3 mt-1"></i>
            <div>
                <h4 class="text-red-400 font-semibold mb-2">Please fix the following errors:</h4>
                <ul class="text-red-300 text-sm space-y-1">
                    ${errors.map(error => `<li>• ${error}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Insert before form
    const form = document.getElementById('studentForm');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Scroll to error
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Store student data (replace with actual API call)
function storeStudentData(data) {
    try {
        // Get existing data
        const existingData = JSON.parse(localStorage.getItem('studentSubmissions') || '[]');
        
        // Add new submission
        existingData.push(data);
        
        // Store updated data
        localStorage.setItem('studentSubmissions', JSON.stringify(existingData));
        
        console.log('Student data stored successfully:', data);
        
        // You can replace this with an actual API call:
        // fetch('/api/students', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => console.log('Success:', result))
        // .catch(error => console.error('Error:', error));
        
    } catch (error) {
        console.error('Error storing student data:', error);
    }
}

// Contact Form Enhancement
function initContactForm() {
    // Add click tracking for contact links
    const contactLinks = document.querySelectorAll('a[href^="mailto"], a[href*="whatsapp"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            const type = this.href.includes('mailto') ? 'email' : 'whatsapp';
            console.log(`Contact attempt via ${type}:`, this.href);
            
            // You can add analytics tracking here
            // gtag('event', 'contact_click', {
            //     'contact_method': type,
            //     'contact_url': this.href
            // });
        });
    });
}

// Animations on Scroll
function initAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.step-card, .career-card, .feature-point');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-slide-up');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimized scroll handler
const optimizedScrollHandler = throttle(function() {
    // Handle scroll-based animations and effects here
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg-image');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add CSS animation classes dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.8s ease-out both;
    }
    
    .animate-slide-up {
        animation: slideUp 0.6s ease-out both;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log(`
🚀 AI Learning Website Loaded Successfully!
📊 Form submissions are stored locally for demo purposes.
💡 Ready to help students transform their careers with AI!
`);

// Export functions for potential external use
window.AIWebsite = {
    storeStudentData,
    validateForm,
    initMobileMenu,
    initFormHandling
};