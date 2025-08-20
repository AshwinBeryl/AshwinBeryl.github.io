// Professional Portfolio JavaScript - Optimized for Mobile & Desktop
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');
    
    // Mobile navigation toggle with better touch handling
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navMenu && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Enhanced smooth scroll navigation
    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = header ? header.offsetHeight : 60;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            // Use requestAnimationFrame for smoother scrolling
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = Math.min(800, Math.abs(distance) * 0.8);
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            // Easing function for smooth animation
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
    }
    
    // Navigation link event listeners with better mobile handling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                scrollToSection(targetId);
                updateActiveNavLink(targetId.substring(1));
            }
        });
    });
    
    // CTA button navigation
    const ctaButtons = document.querySelectorAll('.hero__cta .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href);
                updateActiveNavLink(href.substring(1));
            }
        });
    });
    
    // Active navigation link highlighting with improved detection
    function updateActiveNavLink(activeSection = null) {
        if (activeSection) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav__link[href="#${activeSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
            return;
        }
        
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + (header ? header.offsetHeight : 60) + 50;
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => link.classList.remove('active'));
        if (currentSection) {
            const correspondingLink = document.querySelector(`.nav__link[href="#${currentSection}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    }
    
    // Enhanced header scroll effect with blue theme
    function handleHeaderScroll() {
        if (header) {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                header.style.background = 'rgba(13, 13, 13, 0.98)';
                header.style.borderBottom = '1px solid rgba(0, 102, 255, 0.3)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(13, 13, 13, 0.95)';
                header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
                header.style.boxShadow = 'none';
            }
        }
    }
    
    // Intersection observer for animations with better mobile performance
    const observerOptions = {
        threshold: window.innerWidth <= 768 ? 0.1 : 0.15,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize scroll animations with staggered timing
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(`
            .skill-category, 
            .experience__item, 
            .project-card, 
            .about__info-item,
            .stat
        `);
        
        animatedElements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 100}ms`;
            fadeInObserver.observe(el);
        });
    }
    
    // Enhanced contact form validation with better mobile UX
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        const formStatus = document.getElementById('form-status');
        
        // Enhanced form styles
        const style = document.createElement('style');
        style.textContent = `
            .form-control.error {
                border-color: #ff4757 !important;
                box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.2) !important;
            }
            .error-message {
                display: block !important;
                color: #ff4757 !important;
                font-size: 14px !important;
                margin-top: 4px !important;
            }
            .form-control:focus {
                border-color: #0066ff !important;
                box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.2) !important;
            }
        `;
        document.head.appendChild(style);
        
        // Real-time validation with better mobile feedback
        formInputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', debounce(() => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            }, 300));
        });
        
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
        
        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            const errorElement = document.getElementById(`${fieldName}-error`);
            let isValid = true;
            let errorMessage = '';
            
            if (!errorElement) return true;
            
            // Clear previous errors
            field.classList.remove('error');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            
            // Validation rules
            if (!value) {
                isValid = false;
                errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
            } else {
                // Specific field validation
                switch (fieldName) {
                    case 'email':
                        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        if (!emailRegex.test(value)) {
                            isValid = false;
                            errorMessage = 'Please enter a valid email address';
                        }
                        break;
                    case 'name':
                        if (value.length < 2) {
                            isValid = false;
                            errorMessage = 'Name must be at least 2 characters';
                        }
                        break;
                    case 'subject':
                        if (value.length < 5) {
                            isValid = false;
                            errorMessage = 'Subject must be at least 5 characters';
                        }
                        break;
                    case 'message':
                        if (value.length < 20) {
                            isValid = false;
                            errorMessage = 'Message must be at least 20 characters';
                        }
                        break;
                }
            }
            
            if (!isValid) {
                field.classList.add('error');
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
                
                // Add haptic feedback on mobile
                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            }
            
            return isValid;
        }
        
        // Enhanced form submission with better mobile feedback
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isFormValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Validate all fields
            requiredFields.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });
            
            // Clear previous status
            if (formStatus) {
                formStatus.className = 'form-status';
                formStatus.textContent = '';
                formStatus.style.display = 'none';
            }
            
            if (isFormValid) {
                // Show loading state
                if (submitButton) {
                    submitButton.textContent = 'Sending...';
                    submitButton.disabled = true;
                }
                
                // Simulate form submission
                setTimeout(() => {
                    if (formStatus) {
                        formStatus.className = 'form-status success';
                        formStatus.textContent = 'Thank you for your message! I will respond within 24 hours.';
                        formStatus.style.display = 'block';
                    }
                    
                    // Reset form and button
                    contactForm.reset();
                    if (submitButton) {
                        submitButton.textContent = 'Send Message';
                        submitButton.disabled = false;
                    }
                    
                    // Haptic feedback for success
                    if ('vibrate' in navigator) {
                        navigator.vibrate([50, 100, 50]);
                    }
                    
                    // Auto-hide success message after 5 seconds
                    setTimeout(() => {
                        if (formStatus) {
                            formStatus.style.opacity = '0';
                            setTimeout(() => {
                                formStatus.className = 'form-status';
                                formStatus.textContent = '';
                                formStatus.style.display = 'none';
                                formStatus.style.opacity = '1';
                            }, 300);
                        }
                    }, 5000);
                }, 1000);
            } else {
                // Show error message
                if (formStatus) {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = 'Please correct the errors above and try again.';
                    formStatus.style.display = 'block';
                }
                
                // Focus on first error field with better mobile handling
                const firstErrorField = contactForm.querySelector('.error');
                if (firstErrorField) {
                    setTimeout(() => {
                        firstErrorField.focus();
                        if (window.innerWidth <= 768) {
                            firstErrorField.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'center' 
                            });
                        }
                    }, 100);
                }
                
                // Haptic feedback for error
                if ('vibrate' in navigator) {
                    navigator.vibrate([100, 50, 100]);
                }
            }
        });
    }
    
    // Enhanced skills animation with better mobile performance
    function animateSkillsOnScroll() {
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillTags();
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            skillsObserver.observe(skillsSection);
        }
    }
    
    function animateSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(10px)';
                tag.style.transition = 'all 0.4s ease';
                
                setTimeout(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                }, 50);
            }, index * 30);
        });
    }
    
    // Enhanced typewriter effect for hero subtitle
    function typewriterEffect(element, text, speed = 80) {
        if (!element) return;
        
        let i = 0;
        element.textContent = '';
        element.style.borderRight = '2px solid #0066ff';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(type, 500);
    }
    
    // Enhanced counter animation with better mobile performance
    function animateCounters() {
        const counters = document.querySelectorAll('.stat__number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = counter.textContent;
                    const isPercent = target.includes('%');
                    const isPlus = target.includes('+');
                    const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
                    
                    animateCounter(counter, numericValue, isPercent, isPlus);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    function animateCounter(element, target, isPercent, isPlus) {
        let current = 0;
        const increment = target / (window.innerWidth <= 768 ? 40 : 60);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current * 10) / 10;
            if (target >= 10) displayValue = Math.floor(current);
            
            element.textContent = displayValue + (isPercent ? '%' : '') + (isPlus ? '+' : '');
        }, 16);
    }
    
    // Optimized scroll handler with throttling
    let scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = requestAnimationFrame(() => {
            updateActiveNavLink();
            handleHeaderScroll();
        });
    }
    
    // Enhanced resize handler
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateActiveNavLink();
            
            // Recalculate observer options for mobile
            const newThreshold = window.innerWidth <= 768 ? 0.1 : 0.15;
            
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }, 250);
    }
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                if (navToggle) {
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Add tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    // Remove keyboard nav class on mouse usage
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Enhanced initialization
    function initializePortfolio() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        // Add loading class
        document.body.classList.add('loading');
        
        setTimeout(() => {
            initScrollAnimations();
            animateSkillsOnScroll();
            animateCounters();
            
            const heroSubtitle = document.querySelector('.hero__subtitle');
            if (heroSubtitle) {
                const originalText = heroSubtitle.textContent;
                typewriterEffect(heroSubtitle, originalText, window.innerWidth <= 768 ? 80 : 60);
            }
            
            updateActiveNavLink();
            document.body.style.opacity = '1';
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 100);
    }
    
    // Event listeners with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Enhanced section reveal animation
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: window.innerWidth <= 768 ? 0.05 : 0.1,
        rootMargin: '0px 0px -30px 0px'
    });
    
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `opacity 0.8s ease ${index * 100}ms, transform 0.8s ease ${index * 100}ms`;
        sectionObserver.observe(section);
    });
    
    // Show hero immediately
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
        heroSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    // Performance optimization for touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch-friendly styles
        const touchStyle = document.createElement('style');
        touchStyle.textContent = `
            .touch-device .btn {
                min-height: 44px;
                min-width: 44px;
            }
            .touch-device .nav__link {
                padding: 12px 16px;
            }
            .touch-device .contact__item {
                padding: 16px;
            }
        `;
        document.head.appendChild(touchStyle);
    }
    
    // Initialize everything
    initializePortfolio();
    
    console.log('Professional portfolio initialized successfully with enhanced mobile and desktop optimization');
});

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.warn('Portfolio Error:', e.message);
    // Graceful degradation - ensure basic functionality works
    document.body.style.opacity = '1';
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Portfolio loaded in ${loadTime}ms`);
        }, 0);
    });
}

// Service worker registration for better performance (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Only register if explicitly available
        console.log('Service worker support detected');
    });
}

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    // Cleanup animations and observers
    document.body.style.overflow = '';
});