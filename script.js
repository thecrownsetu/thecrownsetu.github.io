/**
 * The Crown Setu - Business Platform Scripts
 * Architected with modularity, scalability, and zero framework dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNavigation();
    initAnimatedBackground();
    initIntersectionObservers();
    initFAQAccordions();
    initStatsCounter();
    initBackToTop();
    initRippleEffect();
});

/**
 * Sticky Header Transition Logic
 */
function initHeader() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile Navigation Drawer Toggle and Accessibility
 */
function initMobileNavigation() {
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.primary-navigation');

    if (!navToggle || !primaryNav) return;

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        primaryNav.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close menu on nav link clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            primaryNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Futuristic Animated Technology Background (Canvas Network Particles)
 * Parallax scroll calculation integrated.
 */
function initAnimatedBackground() {
    const canvas = document.getElementById('tech-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Responsive Particle Density Configuration
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Screen boundary check
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#d4af37';
            ctx.fill();
            ctx.shadowBlur = 0; // Reset blur for speed
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Soft navy gradient background
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
        gradient.addColorStop(0, '#0a1128');
        gradient.addColorStop(1, '#030712');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Render network constellation connections
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 140) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - distance / 140)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    // Parallax Scrolling Effect
    window.addEventListener('scroll', () => {
        const offset = window.scrollY * 0.15;
        canvas.style.transform = `translateY(${offset}px)`;
    });

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        init();
    });

    init();
    animate();
}

/**
 * Premium Page Transitions and Scroll Reveal System
 */
function initIntersectionObservers() {
    const reveals = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        reveals.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        reveals.forEach(el => el.classList.add('revealed'));
    }
}

/**
 * Premium Accordion (FAQ System)
 */
function initFAQAccordions() {
    const accordionQuestions = document.querySelectorAll('.faq-question');

    accordionQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/**
 * Dynamic High-Performance Counter Animation
 */
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const countOptions = {
        threshold: 0.8
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetVal = parseInt(counter.getAttribute('data-target'), 10);
                let currentVal = 0;
                const duration = 2000; // Count duration in milliseconds
                const increment = Math.ceil(targetVal / (duration / 16));

                const updateCount = () => {
                    currentVal += increment;
                    if (currentVal >= targetVal) {
                        counter.textContent = targetVal;
                    } else {
                        counter.textContent = currentVal;
                        requestAnimationFrame(updateCount);
                    }
                };

                updateCount();
                observer.unobserve(counter);
            }
        });
    }, countOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

/**
 * Back to Top Button Routing
 */
function initBackToTop() {
    const backBtn = document.getElementById('back-to-top');
    if (!backBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backBtn.style.opacity = '1';
            backBtn.style.pointerEvents = 'auto';
        } else {
            backBtn.style.opacity = '0';
            backBtn.style.pointerEvents = 'none';
        }
    });

    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Classic Ripple Interaction (Button Wave effect)
 */
function initRippleEffect() {
    const ripples = document.querySelectorAll('.ripple');

    ripples.forEach(button => {
        button.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - (this.offsetLeft + radius)}px`;
            circle.style.top = `${e.clientY - (this.offsetTop + radius)}px`;
            circle.classList.add('ripple-wave');

            const prevWave = this.querySelector('.ripple-wave');
            if (prevWave) {
                prevWave.remove();
            }

            this.appendChild(circle);
        });
    });
}
