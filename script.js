// Initialize particles.js
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#7dd3fc"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#7dd3fc",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "top",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
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
            
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Project card flip functionality
document.querySelectorAll('.flip-btn').forEach(button => {
    button.addEventListener('click', function() {
        const projectCard = this.closest('.project-card');
        projectCard.classList.toggle('flipped');
    });
});

// Carousel functionality
const carouselTrack = document.querySelector('.carousel-track');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const indicators = document.querySelectorAll('.carousel-indicator');

let currentIndex = 0;
const slideWidth = carouselSlides[0].offsetWidth;
const totalSlides = carouselSlides.length;

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    // Update active/inactive classes for animations
    carouselSlides.forEach((slide, index) => {
        if (index === currentIndex) {
            slide.classList.remove('inactive');
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
            slide.classList.add('inactive');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
            indicator.classList.remove('bg-opacity-30');
            indicator.classList.add('bg-opacity-100');
        } else {
            indicator.classList.remove('active');
            indicator.classList.add('bg-opacity-30');
            indicator.classList.remove('bg-opacity-100');
        }
    });
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

// Indicator click functionality
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Auto-advance carousel
let carouselInterval = setInterval(() => {
    currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
    updateCarousel();
}, 5000);

// Pause carousel on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000);
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Intersection Observer for skill bars animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Add hover effect to buttons
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-2px)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0)';
    });
});