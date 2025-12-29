/**
 * ========================================
 * INTRO OVERLAY EXPERIENCE
 * ========================================
 * Manages the guided intro cards that appear on first visit
 */

(function() {
    // Check if intro has already been completed in this session
    const introCompleted = sessionStorage.getItem('introCompleted');

    // Get intro elements
    const introOverlay = document.getElementById('intro-overlay');
    const skipButton = document.getElementById('skip-intro');
    const introCards = document.querySelectorAll('.intro-card');

    // Only run intro on homepage and if not completed
    if (!introOverlay) return; // Not on homepage

    if (introCompleted === 'true') {
        // Skip intro - hide overlay immediately
        hideIntro();
        return;
    }

    // Track dismissed cards
    let dismissedCount = 0;
    const totalCards = introCards.length;

    /**
     * Handle card click - flip card, then dismiss it
     */
    function handleCardClick(event) {
        const card = event.currentTarget;

        // Ignore if already flipped or dismissed
        if (card.classList.contains('flipped') || card.classList.contains('dismissed')) {
            return;
        }

        // Flip the card
        card.classList.add('flipped');

        // After flip animation (600ms), dismiss the card
        setTimeout(() => {
            card.classList.add('dismissed');
            dismissedCount++;

            // If all cards dismissed, reveal main site
            if (dismissedCount === totalCards) {
                setTimeout(revealMainSite, 400);
            }
        }, 1200); // Show back of card for 1.2 seconds
    }

    /**
     * Skip intro button handler
     */
    function skipIntro() {
        // Mark all cards as dismissed immediately
        introCards.forEach(card => {
            card.classList.add('dismissed');
        });

        // Reveal main site
        setTimeout(revealMainSite, 400);
    }

    /**
     * Reveal the main website content
     */
    function revealMainSite() {
        // Remove blur from main content
        document.body.classList.remove('intro-active');
        document.body.classList.add('intro-complete');

        // Hide intro overlay
        setTimeout(() => {
            hideIntro();
        }, 600);

        // Mark intro as completed in session storage
        sessionStorage.setItem('introCompleted', 'true');
    }

    /**
     * Hide intro overlay completely
     */
    function hideIntro() {
        if (introOverlay) {
            introOverlay.classList.add('hidden');
            document.body.classList.remove('intro-active');
            document.body.classList.add('intro-complete');
        }
    }

    // Add event listeners to cards
    introCards.forEach(card => {
        card.addEventListener('click', handleCardClick);
    });

    // Add event listener to skip button
    if (skipButton) {
        skipButton.addEventListener('click', skipIntro);
    }

    /**
     * CUSTOMIZATION INSTRUCTIONS:
     *
     * 1. TO CHANGE CARD CONTENT:
     *    - Edit the HTML in index.html
     *    - Update .card-front for the initial card face
     *    - Update .card-back for the flipped card content
     *
     * 2. TO CHANGE TIMING:
     *    - Line 54: Change 1200ms (how long card back shows before dismissing)
     *    - Line 71: Change 400ms (delay before revealing main site)
     *
     * 3. TO CHANGE INTRO FREQUENCY:
     *    - Currently uses sessionStorage (once per browser session)
     *    - Change to localStorage for once ever (survives browser close)
     *    - Change sessionStorage to localStorage on lines 10 and 98
     *
     * 4. TO DISABLE INTRO:
     *    - Remove class="intro-active" from <body> tag in index.html
     *    - Or set sessionStorage.setItem('introCompleted', 'true') in console
     *
     * 5. TO ADD MORE CARDS:
     *    - Add new .intro-card in HTML with sequential data-card number
     *    - Add animation-delay in CSS for stagger effect
     *    - Cards auto-detect and adjust
     */
})();

/**
 * ========================================
 * AUTO-ROTATING PROJECT CAROUSEL
 * ========================================
 * Automatically cycles through projects every 5 seconds with smooth fade transitions
 */

// Configuration
const ROTATION_INTERVAL = 5000; // Time in milliseconds (5000ms = 5 seconds)

// Get all project elements and dots
const projects = document.querySelectorAll('.project');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let rotationTimer;

/**
 * Show a specific project by index
 * @param {number} index - The index of the project to display
 */
function showProject(index) {
    // Remove active class from all projects and dots
    projects.forEach(project => project.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to the target project and corresponding dot
    projects[index].classList.add('active');
    dots[index].classList.add('active');

    // Update current index
    currentIndex = index;
}

/**
 * Move to the next project in the carousel
 */
function nextProject() {
    const nextIndex = (currentIndex + 1) % projects.length;
    showProject(nextIndex);
}

/**
 * Start automatic rotation
 */
function startRotation() {
    rotationTimer = setInterval(nextProject, ROTATION_INTERVAL);
}

/**
 * Stop automatic rotation
 */
function stopRotation() {
    clearInterval(rotationTimer);
}

/**
 * Restart rotation (useful after manual navigation)
 */
function restartRotation() {
    stopRotation();
    startRotation();
}

// Add click event listeners to dots for manual navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showProject(index);
        restartRotation(); // Restart the timer when user manually navigates
    });
});

// Start automatic rotation when page loads (only if on homepage with carousel)
if (projects.length > 0) {
    startRotation();
}

// Optional: Pause rotation when user hovers over the project area
const projectCarousel = document.querySelector('.project-carousel');

if (projectCarousel) {
    projectCarousel.addEventListener('mouseenter', stopRotation);
    projectCarousel.addEventListener('mouseleave', startRotation);
}

/**
 * Mobile Navigation Toggle
 */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

/**
 * Experience Page Sidebar Navigation
 * Updates active state based on scroll position
 */
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sections = document.querySelectorAll('.section-divider');

if (sidebarLinks.length > 0 && sections.length > 0) {
    function updateActiveLink() {
        let currentSection = '';

        // Find which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Offset for sticky nav

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update active class on sidebar links
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Update on page load
    updateActiveLink();

    // Smooth scroll when clicking sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * INSTRUCTIONS FOR MODIFYING PROJECTS:
 *
 * 1. TO CHANGE ROTATION SPEED:
 *    - Modify the ROTATION_INTERVAL constant at the top (in milliseconds)
 *    - Example: 3000 = 3 seconds, 7000 = 7 seconds
 *
 * 2. TO ADD A NEW PROJECT:
 *    - Add a new project div in index.html (see HTML comments)
 *    - Add a new dot in the carousel-dots div
 *    - This script will automatically detect and include it
 *
 * 3. TO REMOVE A PROJECT:
 *    - Delete the project div and corresponding dot in index.html
 *    - This script will automatically adjust
 *
 * 4. TO CHANGE TRANSITION STYLE:
 *    - Modify the 'transition' property in styles.css for .project class
 *    - Current: opacity fade (0.6s ease-in-out)
 *    - Alternative: You can add transform for slide effects
 *
 * 5. TO DISABLE AUTO-ROTATION:
 *    - Comment out the startRotation() call at the bottom
 *    - Keep manual navigation via dots
 */
