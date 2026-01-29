// ===================================
// Performance Optimization
// ===================================
// Passive event listeners for better scroll performance
const passiveSupported = (() => {
    let passive = false;
    try {
        const options = {
            get passive() {
                passive = true;
                return false;
            }
        };
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passive = false;
    }
    return passive;
})();

const passiveEvent = passiveSupported ? { passive: true } : false;

// ===================================
// Smooth Scroll Navigation
// ===================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        this.classList.add('active');

        // Get target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Scroll to section with smooth animation
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Close mobile menu if open
        document.getElementById('navMenu').classList.remove('active');
    });
});

// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// ===================================
// Navbar Scroll Effect (Optimized)
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;
let navbarTicking = false;

window.addEventListener('scroll', () => {
    if (!navbarTicking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
            navbarTicking = false;
        });
        navbarTicking = true;
    }
}, passiveEvent);

// ===================================
// Active Section Highlighting (Optimized)
// ===================================
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');
let highlightTicking = false;

function highlightNavigation() {
    if (!highlightTicking) {
        window.requestAnimationFrame(() => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;

                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });

            highlightTicking = false;
        });
        highlightTicking = true;
    }
}

window.addEventListener('scroll', highlightNavigation, passiveEvent);

// ===================================
// Intersection Observer for Scroll Animations (Optimized)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Use requestAnimationFrame for smoother animations
            requestAnimationFrame(() => {
                entry.target.classList.add('visible');

                // Trigger skill progress bar animation
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.skill-progress-bar');
                    if (progressBar) {
                        setTimeout(() => {
                            progressBar.style.width = progressBar.style.getPropertyValue('--progress-width');
                        }, 200);
                    }
                }
            });
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===================================
// Typing Effect for Hero Section
// ===================================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < originalText.length) {
            heroSubtitle.textContent = originalText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, 60);
        }
    }

    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            heroSubtitle.textContent = '';
            charIndex = 0;
            typeWriter();
        }, 1200);
    });
}

// ===================================
// Smooth Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Project Card 3D Tilt Effect (Enhanced)
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    let rafId = null;

    card.addEventListener('mousemove', (e) => {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }

        rafId = requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            card.style.transition = 'transform 0.1s ease-out';
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });
    });

    card.addEventListener('mouseleave', () => {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// Cursor Trail Effect (Professional)
// ===================================
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
});

// ===================================
// Add Glow Effect on Hover for Interactive Elements
// ===================================
const interactiveElements = document.querySelectorAll('.btn, .contact-card, .skill-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===================================
// Parallax Effect for Hero Section (Ultra Optimized)
// ===================================
let parallaxTicking = false;
const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                // Only apply parallax when hero is visible
                if (scrolled < window.innerHeight - 100) {
                    const parallax = scrolled * 0.25;
                    hero.style.transform = `translate3d(0, ${parallax}px, 0)`;
                } else {
                    hero.style.transform = 'translate3d(0, 0, 0)';
                }

                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    }, passiveEvent);
}

// ===================================
// Console Output (macOS Terminal Style)
// ===================================
const terminalStyles = {
    banner: 'color: #00ff00; font-size: 14px; font-weight: bold; font-family: "Monaco", "Menlo", monospace; line-height: 1.4;',
    green: 'color: #00ff00; font-size: 12px; font-family: "Monaco", "Menlo", monospace;',
    cyan: 'color: #00d9ff; font-size: 12px; font-family: "Monaco", "Menlo", monospace;',
    white: 'color: #ffffff; font-size: 12px; font-family: "Monaco", "Menlo", monospace;',
    dim: 'color: #6b7280; font-size: 12px; font-family: "Monaco", "Menlo", monospace;'
};

console.log('%c', 'font-size: 1px;'); // Spacing
console.log('%c╔═══════════════════════════════════════════════════════════╗', terminalStyles.green);
console.log('%c║                                                           ║', terminalStyles.green);
console.log('%c║     █████╗ ██████╗ ██╗████████╗██╗   ██╗ █████╗         ║', terminalStyles.green);
console.log('%c║    ██╔══██╗██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝██╔══██╗        ║', terminalStyles.green);
console.log('%c║    ███████║██║  ██║██║   ██║    ╚████╔╝ ███████║        ║', terminalStyles.green);
console.log('%c║    ██╔══██║██║  ██║██║   ██║     ╚██╔╝  ██╔══██║        ║', terminalStyles.green);
console.log('%c║    ██║  ██║██████╔╝██║   ██║      ██║   ██║  ██║        ║', terminalStyles.green);
console.log('%c║    ╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝        ║', terminalStyles.green);
console.log('%c║                                                           ║', terminalStyles.green);
console.log('%c╚═══════════════════════════════════════════════════════════╝', terminalStyles.green);
console.log('%c', 'font-size: 1px;'); // Spacing

console.log('%cLast login: ' + new Date().toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric'
}), terminalStyles.dim);

console.log('%c', 'font-size: 1px;');
console.log('%cadityayadav@portfolio ~ %c$ whoami', terminalStyles.green, terminalStyles.white);
console.log('%c> AI & Software Developer', terminalStyles.cyan);
console.log('%c> BTech IT Student | India', terminalStyles.cyan);
console.log('%c', 'font-size: 1px;');

console.log('%cadityayadav@portfolio ~ %c$ cat skills.txt', terminalStyles.green, terminalStyles.white);
console.log('%c> AI & Machine Learning', terminalStyles.cyan);
console.log('%c> Large Language Models (LLMs)', terminalStyles.cyan);
console.log('%c> Data Structures & Algorithms', terminalStyles.cyan);
console.log('%c> Full-Stack Development', terminalStyles.cyan);
console.log('%c', 'font-size: 1px;');

console.log('%cadityayadav@portfolio ~ %c$ ls -la projects/', terminalStyles.green, terminalStyles.white);
console.log('%cdrwxr-xr-x  5 aditya  staff   160 Jan 29 18:41 %cGlobeStay/', terminalStyles.dim, terminalStyles.cyan);
console.log('%cdrwxr-xr-x  3 aditya  staff    96 Jan 29 18:41 %cPortfolio/', terminalStyles.dim, terminalStyles.cyan);
console.log('%c', 'font-size: 1px;');

console.log('%cadityayadav@portfolio ~ %c$ echo $CONTACT', terminalStyles.green, terminalStyles.white);
console.log('%cGitHub:   %chttps://github.com/adityayadav-dev', terminalStyles.white, terminalStyles.cyan);
console.log('%cLinkedIn: %chttps://linkedin.com/in/adityayadav-dev', terminalStyles.white, terminalStyles.cyan);
console.log('%c', 'font-size: 1px;');

console.log('%cadityayadav@portfolio ~ %c$ █', terminalStyles.green, terminalStyles.white);
console.log('%c', 'font-size: 1px;');
console.log('%c─────────────────────────────────────────────────────────────', terminalStyles.dim);
console.log('%cThanks for inspecting! Feel free to explore the code.', terminalStyles.white);
console.log('%c─────────────────────────────────────────────────────────────', terminalStyles.dim);
console.log('%c', 'font-size: 1px;');

// ===================================
// Performance Monitoring (Development)
// ===================================
if (window.performance) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%c> Page Load Time: ${pageLoadTime}ms`, styles.text);
        }, 0);
    });
}

// ===================================
// Keyboard Navigation Enhancement
// ===================================
document.addEventListener('keydown', (e) => {
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const allSections = Array.from(sections);
        const currentIndex = allSections.indexOf(currentSection);

        let nextIndex;
        if (e.key === 'ArrowDown') {
            nextIndex = Math.min(currentIndex + 1, allSections.length - 1);
        } else {
            nextIndex = Math.max(currentIndex - 1, 0);
        }

        const nextSection = allSections[nextIndex];
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function getCurrentSection() {
    let current = sections[0];
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
            current = section;
        }
    });
    return current;
}

// ===================================
// Smooth Scroll Behavior Enhancement
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});