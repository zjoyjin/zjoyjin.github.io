# Animation System Guide

## 📋 Overview

Your website now uses **Motion One** (12kb vanilla JavaScript library) to provide subtle, professional animations that enhance the user experience without being distracting.

### What's Been Implemented

✅ **Motion One library** installed via CDN (all pages)
✅ **Scroll-triggered animations** (fade-up, scale-in, text-reveal)
✅ **Hover micro-interactions** on cards and links
✅ **Accessibility support** (respects `prefers-reduced-motion`)
✅ **Performance optimized** (animations run once, lazy-loaded)

---

## 🎨 Animation Types

### 1. **Fade Up** (`data-animate="fade-up"`)
Element gently slides up while fading in.

**Best for:** Section headings, text blocks, generic content

**Example:**
```html
<h2 data-animate="fade-up">Research Highlights</h2>
```

---

### 2. **Scale In** (`data-animate="scale-in"`)
Element scales from 95% to 100% while fading in.

**Best for:** Cards, boxes, images, highlight sections

**Example:**
```html
<div class="experience-item" data-animate="scale-in">
    <h3>Software Developer</h3>
    <p>University of Toronto, IDELA Lab</p>
</div>
```

---

### 3. **Text Reveal** (`data-animate="text-reveal"`)
Words appear one-by-one with subtle fade and slide.

**Best for:** Hero titles, important headings (use sparingly!)

**Example:**
```html
<h1 data-animate="text-reveal">Joyee Jin</h1>
```

---

## ⏱️ Adding Delays

Use `data-animate-delay` to stagger animations (in seconds):

```html
<div data-animate="scale-in" data-animate-delay="0.1">Card 1</div>
<div data-animate="scale-in" data-animate-delay="0.2">Card 2</div>
<div data-animate="scale-in" data-animate-delay="0.3">Card 3</div>
```

**Recommended delays:** 0.1s, 0.2s, 0.3s increments

---

## 📍 Where Animations Are Currently Applied

### Homepage ([index.html](index.html))

| Element | Animation | Delay | Purpose |
|---------|-----------|-------|---------|
| `<h1>Joyee Jin</h1>` | `fade-up` | 0s | Hero entrance |
| Intro paragraph | `fade-up` | 0.1s | Staggered with title |
| Research section | `fade-up` | 0s | Section reveal |
| Research cards (3) | `fade-up` | 0.1s, 0.2s, 0.3s | Staggered card entrance |
| Experience section | `fade-up` | 0s | Section reveal |
| Experience cards (3) | `scale-in` | 0.1s, 0.2s, 0.3s | Emphasis on cards |

### Other Pages

All pages have the animation system loaded, but **no animations are applied yet**. This gives you full control to add them where they feel right.

**Suggested additions:**
- Page headers: `data-animate="fade-up"`
- Content cards: `data-animate="scale-in"`
- Important headings: `data-animate="text-reveal"` (sparingly!)

---

## 🛠️ Customization

### Change Animation Speed

Edit `ANIMATION_CONFIG` in [animations.js](animations.js#L31-L35):

```javascript
duration: {
    fast: 0.3,      // Quick interactions → change to 0.2 for faster
    normal: 0.6,    // Standard animations → change to 0.8 for slower
    slow: 0.9       // Emphasis animations
}
```

---

### Change Animation Style (Easing)

Edit easing curves in [animations.js](animations.js#L38-L42):

```javascript
easing: {
    smooth: [0.25, 0.1, 0.25, 1],           // Current: elegant
    snappy: [0.4, 0.0, 0.2, 1],             // Quick and responsive
    bounce: [0.68, -0.55, 0.265, 1.55]      // Subtle bounce
}
```

**Recommendation:** Keep `smooth` for professional feel.

---

### Change Movement Distance

Edit slide distances in [animations.js](animations.js#L45-L49):

```javascript
distance: {
    small: 20,      // Current: 20px → try 10px for more subtle
    medium: 40,     // Standard movement
    large: 60       // Dramatic movement
}
```

---

## 🎯 Best Practices

### ✅ DO

- **Use animations sparingly** (5-7 elements per page max)
- **Stagger card animations** with 0.1s-0.3s delays
- **Animate on scroll**, not on page load (already configured)
- **Test on mobile** to ensure animations don't feel janky
- **Respect user preferences** (accessibility is built-in)

### ❌ DON'T

- **Animate everything** (overwhelming)
- **Use text-reveal on multiple headings** (use once per page max)
- **Animate large background elements** (performance issues)
- **Use animations that loop** (distracting)
- **Ignore mobile performance** (test on slower devices)

---

## 🔧 How to Disable Animations

### Disable ALL Animations Globally

Open [animations.js](animations.js#L26) and change:

```javascript
const ANIMATIONS_ENABLED = false; // Set to false
```

All animations will be instantly disabled across the entire site.

---

### Disable Specific Animation

Remove the `data-animate` attribute from the HTML element:

**Before:**
```html
<h2 data-animate="fade-up">Research Highlights</h2>
```

**After:**
```html
<h2>Research Highlights</h2>
```

---

### Disable Hover Effects

Open [animations.js](animations.js#L185-L191) and comment out:

```javascript
function initHoverAnimations() {
    return; // Add this line to disable hover effects

    const cards = document.querySelectorAll('.experience-item, .highlight-item, .project');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });
}
```

---

## ♿ Accessibility

The animation system **automatically respects** user accessibility preferences:

- If a user has **"Reduce Motion"** enabled in their OS settings:
  - All scroll animations are disabled
  - Elements appear immediately (no fade/slide)
  - Hover effects are simplified

This is handled by CSS in [styles.css](styles.css#L1515-L1529):

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

**You don't need to do anything** - accessibility is automatic.

---

## 🚀 Performance

### What's Optimized

- **Intersection Observer** triggers animations only when elements enter viewport
- **Animations run once** (not on every scroll)
- **Motion One is 12kb** (vs 50kb+ for alternatives)
- **CSS-based hover effects** (GPU-accelerated)
- **will-change** hints for smooth transforms

### Performance Checklist

✅ Don't animate more than 5-7 elements per section
✅ Use delays to create rhythm (avoids simultaneous animations)
✅ Avoid animating images over 500px
✅ Test on mobile devices with slower CPUs

---

## 📖 Quick Reference

### Adding Animations to New Elements

```html
<!-- Fade up on scroll -->
<div data-animate="fade-up">Content</div>

<!-- Scale in with delay -->
<div data-animate="scale-in" data-animate-delay="0.2">Content</div>

<!-- Text reveal (use sparingly!) -->
<h1 data-animate="text-reveal">Important Title</h1>
```

### File Structure

```
your-website/
├── index.html              ← Motion One CDN + animations.js loaded
├── experience.html         ← Motion One CDN + animations.js loaded
├── projects.html           ← Motion One CDN + animations.js loaded
├── activities.html         ← Motion One CDN + animations.js loaded
├── contact.html            ← Motion One CDN + animations.js loaded
├── animations.js           ← All animation logic (well-documented)
├── styles.css              ← Hover effects + accessibility
└── ANIMATIONS_GUIDE.md     ← This file
```

---

## 🎓 Examples: Where to Add More Animations

### Experience Page

```html
<!-- Page header -->
<div class="page-header" data-animate="fade-up">
    <h1>Experience</h1>
    <p class="page-subtitle">My professional journey...</p>
</div>

<!-- Experience items (stagger them) -->
<div class="experience-item" data-animate="scale-in" data-animate-delay="0.1">
    <h3>Software Developer</h3>
    <p>University of Toronto, IDELA Lab</p>
</div>
```

### Projects Page

```html
<!-- Project cards -->
<article class="project-detail" data-animate="fade-up" data-animate-delay="0.1">
    <h2>Depression Detection ML Model</h2>
    <p>Research project at Stanford University...</p>
</article>
```

### Contact Page

```html
<!-- Contact info blocks -->
<div class="contact-method" data-animate="scale-in">
    <h3>Email</h3>
    <a href="mailto:...">joyeejin@example.com</a>
</div>
```

---

## 🐛 Troubleshooting

### Animations Not Working?

1. **Check browser console** for errors
2. **Verify Motion One loaded**: Open DevTools Console and type `Motion`
   - Should return object, not `undefined`
3. **Check animations.js loaded**: Look in Network tab
4. **Verify data-animate attribute**: Inspect element HTML

### Animations Too Fast/Slow?

Edit `ANIMATION_CONFIG.duration` in [animations.js](animations.js#L31)

### Animations Feel Janky on Mobile?

- Reduce number of animated elements
- Remove text-reveal (most expensive)
- Test on actual mobile device (not just DevTools)

### Elements Flash Before Animating?

CSS hides `[data-animate]` elements until JS runs. If JS fails to load:
- Check file paths are correct
- Verify animations.js has no syntax errors
- Look for console errors

---

## 💡 Design Philosophy

These animations follow the principle of **subtle enhancement**:

- **You notice the content first**, animations second
- **No constant motion** (animations run once on scroll)
- **Respectful of user preferences** (accessibility built-in)
- **Performance-conscious** (12kb library, optimized triggers)

**Golden Rule:** If you notice the animation before the content, reduce the effect or remove it.

---

## 📚 Resources

- [Motion One Documentation](https://motion.dev)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

---

## 🆘 Need Help?

1. **Read the comments** in [animations.js](animations.js) - extensively documented
2. **Check this guide** for examples and best practices
3. **Test in browser DevTools** to debug issues
4. **Start simple**: Add one animation at a time

---

**Last updated:** January 2026
**Animation System Version:** 1.0
**Motion One Version:** 11.11.13
