/**
 * Auto-rotating Project Carousel
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

// Start automatic rotation when page loads
startRotation();

// Optional: Pause rotation when user hovers over the project area
const projectCarousel = document.querySelector('.project-carousel');

projectCarousel.addEventListener('mouseenter', stopRotation);
projectCarousel.addEventListener('mouseleave', startRotation);

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
