// Grand Royale Hotel - Interactive JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Hide loader after page loads
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
    
    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<span class="lightbox-close">&times;</span><img src="" alt="Gallery Image">';
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Testimonial slider
    let currentTestimonial = 0;
    const testimonials = [
        {
            name: 'Sarah Johnson',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
            text: 'Absolutely phenomenal experience! The attention to detail, world-class service, and stunning views made our anniversary celebration unforgettable. We\'re already planning our next visit!',
            rating: 5
        },
        {
            name: 'Michael Chen',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
            text: 'The Presidential Suite exceeded all our expectations. From the private pool to the exceptional butler service, every moment was pure luxury. This is now our preferred destination.',
            rating: 5
        },
        {
            name: 'Emma Williams',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            text: 'As a business traveler, I appreciate the seamless check-in process, high-speed WiFi, and the executive lounge. The staff goes above and beyond to ensure a productive stay.',
            rating: 5
        }
    ];
    
    function updateTestimonial() {
        const testimonialSlide = document.querySelector('.testimonial-slide');
        if (testimonialSlide) {
            const testimonial = testimonials[currentTestimonial];
            const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
            
            testimonialSlide.innerHTML = `
                <div class="flex items-center mb-6">
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="w-16 h-16 rounded-full mr-4">
                    <div>
                        <h4 class="font-semibold text-navy">${testimonial.name}</h4>
                        <div class="flex text-gold">
                            ${stars.split('').map(star => `<i class="fas fa-star"></i>`).join('')}
                        </div>
                    </div>
                </div>
                <p class="text-gray-700 italic">"${testimonial.text}"</p>
            `;
        }
        
        // Update dots
        const dots = document.querySelectorAll('.flex.justify-center.mt-6 button');
        dots.forEach((dot, index) => {
            if (index === currentTestimonial) {
                dot.className = 'w-3 h-3 bg-gold rounded-full';
            } else {
                dot.className = 'w-3 h-3 bg-gray-300 rounded-full';
            }
        });
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    }, 5000);
    
    // Manual testimonial navigation
    const dots = document.querySelectorAll('.flex.justify-center.mt-6 button');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateTestimonial();
        });
    });
    
    // Counter animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }
        
        updateCounter();
    }
    
    // Observe counters for animation
    const counters = document.querySelectorAll('.text-3xl.font-bold.text-gold');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.animated) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number) {
                    animateCounter(entry.target, number);
                    entry.target.animated = true;
                }
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Form validation and submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Remove error after 3 seconds
                    setTimeout(() => {
                        field.classList.remove('border-red-500');
                    }, 3000);
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
                successMessage.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                document.body.appendChild(successMessage);
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                
                // Reset form
                form.reset();
            }
        });
    });
    
    // Booking form handling
    const bookingForm = document.querySelector('#home form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const checkin = this.querySelector('input[type="date"]:nth-of-type(1)').value;
            const checkout = this.querySelector('input[type="date"]:nth-of-type(2)').value;
            const guests = this.querySelector('select').value;
            
            if (checkin && checkout) {
                // Show booking confirmation
                const bookingModal = document.createElement('div');
                bookingModal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
                bookingModal.innerHTML = `
                    <div class="bg-white rounded-2xl p-8 max-w-md mx-4 animate-slide-up">
                        <h3 class="font-serif text-2xl font-bold text-navy mb-4">Booking Inquiry Received!</h3>
                        <p class="text-gray-700 mb-6">Thank you for your interest. Our reservations team will contact you shortly to confirm availability and complete your booking.</p>
                        <div class="bg-beige rounded-lg p-4 mb-6">
                            <p class="text-sm text-gray-600 mb-2">Booking Details:</p>
                            <p class="font-semibold">Check-in: ${new Date(checkin).toLocaleDateString()}</p>
                            <p class="font-semibold">Check-out: ${new Date(checkout).toLocaleDateString()}</p>
                            <p class="font-semibold">Guests: ${guests}</p>
                        </div>
                        <button class="w-full bg-gold text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all duration-300 font-semibold" onclick="this.closest('.fixed').remove()">
                            Close
                        </button>
                    </div>
                `;
                document.body.appendChild(bookingModal);
                
                // Reset form
                this.reset();
            }
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('footer form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
                successMessage.textContent = 'Successfully subscribed to our newsletter!';
                document.body.appendChild(successMessage);
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                
                // Reset form
                this.reset();
            }
        });
    }
    
    // Room booking buttons
    const bookButtons = document.querySelectorAll('.room-card button:last-child');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const roomCard = this.closest('.room-card');
            const roomName = roomCard.querySelector('h3').textContent;
            const roomPrice = roomCard.querySelector('.text-3xl').textContent;
            
            // Show booking modal
            const bookingModal = document.createElement('div');
            bookingModal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
            bookingModal.innerHTML = `
                <div class="bg-white rounded-2xl p-8 max-w-md mx-4 animate-slide-up">
                    <h3 class="font-serif text-2xl font-bold text-navy mb-4">Book ${roomName}</h3>
                    <p class="text-gray-700 mb-6">Starting from ${roomPrice}/night</p>
                    <p class="text-gray-600 mb-6">Please complete the booking form above or call our reservations team for immediate assistance.</p>
                    <div class="flex space-x-3">
                        <button class="flex-1 border border-gold text-gold px-6 py-3 rounded-lg hover:bg-gold hover:text-white transition-all duration-300" onclick="this.closest('.fixed').remove()">
                            Close
                        </button>
                        <button class="flex-1 bg-gold text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all duration-300" onclick="window.location.href='#home'">
                            Book Now
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(bookingModal);
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('#home');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add hover effects to room cards
    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Dynamic date setting for booking form
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const checkinInput = document.querySelector('input[type="date"]:nth-of-type(1)');
    const checkoutInput = document.querySelector('input[type="date"]:nth-of-type(2)');
    
    if (checkinInput) {
        checkinInput.min = today.toISOString().split('T')[0];
        checkinInput.value = today.toISOString().split('T')[0];
    }
    
    if (checkoutInput) {
        checkoutInput.min = tomorrow.toISOString().split('T')[0];
        checkoutInput.value = tomorrow.toISOString().split('T')[0];
    }
    
    // Update checkout min date when checkin changes
    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            const minCheckout = new Date(checkinDate);
            minCheckout.setDate(minCheckout.getDate() + 1);
            checkoutInput.min = minCheckout.toISOString().split('T')[0];
            
            if (new Date(checkoutInput.value) <= checkinDate) {
                checkoutInput.value = minCheckout.toISOString().split('T')[0];
            }
        });
    }
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('no-loading')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    console.log('Grand Royale Hotel website initialized successfully!');
});
