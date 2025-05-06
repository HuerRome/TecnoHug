/**
 * TECNOHUG Website - Vanilla JavaScript Implementation
 * 
 * This script handles all interactive functionality including:
 * - Mobile navigation
 * - Smooth scrolling
 * - Scroll animations
 * - Form validation
 * - Parallax effects
 * - Counter animation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Update aria-expanded attribute
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Parallax effect for hero image
    const parallaxImage = document.querySelector('.parallax-image');
    
    function updateParallax() {
        if (parallaxImage) {
            const scrollPosition = window.pageYOffset;
            const speed = parseFloat(parallaxImage.getAttribute('data-speed'));
            const translateY = scrollPosition * speed;
            parallaxImage.style.transform = `translateY(${translateY}px)`;
        }
    }
    
    window.addEventListener('scroll', updateParallax);
    window.addEventListener('resize', updateParallax);
    
    // Scroll reveal animations
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal, .fade-in');
    
    function checkScroll() {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // If element is in viewport
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('scroll-reveal');
                
                // Animate stats counters
                if (element.classList.contains('stat-item')) {
                    animateCounter(element.querySelector('.stat-number'));
                }
            }
        });
    }
    
    // Counter animation for stats
    function animateCounter(element) {
        if (element.getAttribute('data-animated') === 'true') return;
        
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // Animation duration in ms
        const step = Math.ceil(duration / target);
        let current = 0;
        
        const timer = setInterval(() => {
            current += Math.ceil(target / (duration / step));
            if (current >= target) {
                clearInterval(timer);
                current = target;
                element.setAttribute('data-animated', 'true');
            }
            element.textContent = current;
        }, step);
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formData = {};
            
            // Validate name
            const nameInput = document.getElementById('name');
            const nameError = nameInput.nextElementSibling.nextElementSibling;
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Name is required';
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
                formData.name = nameInput.value.trim();
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailError = emailInput.nextElementSibling.nextElementSibling;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email is required';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email';
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
                formData.email = emailInput.value.trim();
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            const messageError = messageInput.nextElementSibling.nextElementSibling;
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Message is required';
                messageError.style.display = 'block';
                isValid = false;
            } else {
                messageError.style.display = 'none';
                formData.message = messageInput.value.trim();
            }
            
            // If form is valid, show success message
            if (isValid) {
                // In a real application, you would send the form data to a server here
                console.log('Form data:', formData);
                
                // Show success message
                const successMessage = document.getElementById('form-success');
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                successMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});