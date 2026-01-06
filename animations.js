/**
 * ═══════════════════════════════════════════════════════════════════
 * ANIMATIONS.JS - Subtle, Professional Animations System
 * ═══════════════════════════════════════════════════════════════════
 *
 * Built with Motion One (https://motion.dev) - 12kb vanilla JS library
 * Provides smooth, performant animations for your portfolio
 *
 * FEATURES:
 * - Scroll-triggered fade-in animations
 * - Text reveal effects for hero sections
 * - Subtle hover micro-interactions
 * - Respects prefers-reduced-motion accessibility setting
 * - Lazy-loads animations only when needed (performance)
 *
 * HOW TO DISABLE ALL ANIMATIONS:
 * Set ANIMATIONS_ENABLED = false at the top of this file
 *
 * HOW TO ADJUST ANIMATION SPEEDS:
 * Change the duration values in the ANIMATION_CONFIG object
 */

// ═══════════════════════════════════════
// GLOBAL ANIMATION TOGGLE
// ═══════════════════════════════════════
const ANIMATIONS_ENABLED = true; // Set to false to disable all animations

// ═══════════════════════════════════════
// ANIMATION CONFIGURATION
// ═══════════════════════════════════════
const ANIMATION_CONFIG = {
    // Duration in seconds (lower = faster)
    duration: {
        fast: 0.3,      // Quick interactions (hover, etc.)
        normal: 0.6,    // Standard animations (fade-in, etc.)
        slow: 0.9       // Emphasis animations (hero text, etc.)
    },

    // Easing functions (controls motion feel)
    easing: {
        smooth: [0.25, 0.1, 0.25, 1],           // Smooth, elegant
        snappy: [0.4, 0.0, 0.2, 1],             // Quick and responsive
        bounce: [0.68, -0.55, 0.265, 1.55]      // Subtle bounce (use sparingly)
    },

    // Distance for slide animations (in pixels)
    distance: {
        small: 20,      // Subtle movement
        medium: 40,     // Standard movement
        large: 60       // Dramatic movement
    }
};

// ═══════════════════════════════════════
// ACCESSIBILITY CHECK
// ═══════════════════════════════════════
/**
 * Check if user prefers reduced motion (accessibility)
 * Returns true if animations should be disabled
 */
function shouldReduceMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ═══════════════════════════════════════
// ANIMATION FUNCTIONS
// ═══════════════════════════════════════

/**
 * Fade Up Animation
 * Element fades in and slides up gently
 * Perfect for: Hero text, section headings, cards
 */
function fadeUpAnimation(element, delay = 0) {
    if (!ANIMATIONS_ENABLED || shouldReduceMotion()) {
        element.style.opacity = '1';
        return;
    }

    // Set initial state
    element.style.opacity = '0';
    element.style.transform = `translateY(${ANIMATION_CONFIG.distance.small}px)`;

    // Animate to final state
    Motion.animate(
        element,
        {
            opacity: [0, 1],
            transform: [`translateY(${ANIMATION_CONFIG.distance.small}px)`, 'translateY(0px)']
        },
        {
            duration: ANIMATION_CONFIG.duration.normal,
            easing: ANIMATION_CONFIG.easing.smooth,
            delay: delay
        }
    );
}

/**
 * Scale In Animation
 * Element scales up from 95% to 100% while fading in
 * Perfect for: Cards, images, highlight boxes
 */
function scaleInAnimation(element, delay = 0) {
    if (!ANIMATIONS_ENABLED || shouldReduceMotion()) {
        element.style.opacity = '1';
        return;
    }

    element.style.opacity = '0';
    element.style.transform = 'scale(0.95)';

    Motion.animate(
        element,
        {
            opacity: [0, 1],
            transform: ['scale(0.95)', 'scale(1)']
        },
        {
            duration: ANIMATION_CONFIG.duration.normal,
            easing: ANIMATION_CONFIG.easing.smooth,
            delay: delay
        }
    );
}

/**
 * Text Reveal Animation
 * Words appear one by one with a subtle fade
 * Perfect for: Hero titles, important headings
 */
function textRevealAnimation(element, delay = 0) {
    if (!ANIMATIONS_ENABLED || shouldReduceMotion()) {
        element.style.opacity = '1';
        return;
    }

    // Split text into words
    const text = element.textContent;
    const words = text.split(' ');

    // Clear element and wrap each word in a span
    element.innerHTML = words.map(word =>
        `<span class="word-reveal" style="display: inline-block; opacity: 0;">${word}</span>`
    ).join(' ');

    // Animate each word with staggered delay
    const wordElements = element.querySelectorAll('.word-reveal');
    wordElements.forEach((word, index) => {
        Motion.animate(
            word,
            {
                opacity: [0, 1],
                transform: ['translateY(10px)', 'translateY(0px)']
            },
            {
                duration: ANIMATION_CONFIG.duration.fast,
                easing: ANIMATION_CONFIG.easing.smooth,
                delay: delay + (index * 0.05) // 50ms between each word
            }
        );
    });
}

// ═══════════════════════════════════════
// SCROLL-TRIGGERED ANIMATIONS
// ═══════════════════════════════════════

/**
 * Initialize scroll animations using Intersection Observer
 * Animations trigger when elements enter viewport
 */
function initScrollAnimations() {
    if (!ANIMATIONS_ENABLED || shouldReduceMotion()) return;

    // Create observer to watch for elements entering viewport
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animate;
                    const delay = parseFloat(element.dataset.animateDelay || 0);

                    // Trigger appropriate animation
                    switch (animationType) {
                        case 'fade-up':
                            fadeUpAnimation(element, delay);
                            break;
                        case 'scale-in':
                            scaleInAnimation(element, delay);
                            break;
                        case 'text-reveal':
                            textRevealAnimation(element, delay);
                            break;
                    }

                    // Stop observing this element (animate only once)
                    observer.unobserve(element);
                }
            });
        },
        {
            threshold: 0.1,  // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px'  // Trigger slightly before element enters view
        }
    );

    // Find all elements with data-animate attribute
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => observer.observe(element));
}

// ═══════════════════════════════════════
// HOVER ANIMATIONS (CSS-based for performance)
// ═══════════════════════════════════════

/**
 * Add enhanced hover effects to interactive elements
 * These are CSS-based for better performance
 */
function initHoverAnimations() {
    if (!ANIMATIONS_ENABLED || shouldReduceMotion()) return;

    // Add hover class to cards for enhanced effects
    const cards = document.querySelectorAll('.experience-item, .highlight-item, .project');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });
}

// ═══════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════

/**
 * Initialize all animations when DOM is ready
 */
function initAnimations() {
    // Wait for Motion library to load
    if (typeof Motion === 'undefined') {
        console.warn('Motion library not loaded. Animations disabled.');
        return;
    }

    // Initialize different animation systems
    initScrollAnimations();
    initHoverAnimations();

    console.log('✨ Animations initialized');
}

// Run when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// ═══════════════════════════════════════
// USAGE GUIDE
// ═══════════════════════════════════════

/*

HOW TO ADD ANIMATIONS TO YOUR HTML:

1. FADE UP (gentle upward slide + fade in):
   <div data-animate="fade-up">Your content</div>

2. SCALE IN (zoom in + fade in):
   <div data-animate="scale-in">Your content</div>

3. TEXT REVEAL (words appear one by one):
   <h1 data-animate="text-reveal">Your Heading</h1>

4. ADD DELAY (in seconds):
   <div data-animate="fade-up" data-animate-delay="0.2">Delayed content</div>

EXAMPLES:

<!-- Hero title with word-by-word reveal -->
<h1 data-animate="text-reveal">Welcome to My Portfolio</h1>

<!-- Section header with gentle fade -->
<h2 data-animate="fade-up">About Me</h2>

<!-- Cards that scale in with staggered timing -->
<div data-animate="scale-in" data-animate-delay="0.1">Card 1</div>
<div data-animate="scale-in" data-animate-delay="0.2">Card 2</div>
<div data-animate="scale-in" data-animate-delay="0.3">Card 3</div>

CUSTOMIZATION:

1. To change animation speed:
   Edit ANIMATION_CONFIG.duration values (lines 31-35)

2. To change animation style:
   Edit ANIMATION_CONFIG.easing values (lines 38-42)

3. To change movement distance:
   Edit ANIMATION_CONFIG.distance values (lines 45-49)

4. To disable all animations:
   Set ANIMATIONS_ENABLED = false (line 26)

PERFORMANCE TIPS:

- Don't animate more than 5-7 elements per section
- Use delays to create rhythm (0.1s, 0.2s, 0.3s)
- Hover effects are CSS-based (already optimized)
- Animations run only once when scrolling into view

*/
