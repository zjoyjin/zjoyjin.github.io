# Photo Gallery Guide

## 📸 Overview

Your homepage now features a **personal photo gallery** that displays moments and memories before the Research Highlights section. The gallery creates a warm, personal connection with visitors before they read about your professional work.

---

## ✨ Features Implemented

✅ **Responsive grid layout**
- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns

✅ **Elegant design**
- Subtle rounded corners (12px)
- Light shadow and accent-colored border
- Smooth hover effects (lift + zoom)

✅ **Staggered animations**
- Photos appear one-by-one (50ms between each)
- Soft scale-in effect (95% → 100%)
- Scroll-triggered (plays once)
- Respects `prefers-reduced-motion`

✅ **Performance optimized**
- Lazy loading for images
- Square aspect ratio (1:1) prevents layout shift
- Shimmer loading animation

✅ **Easy to customize**
- Clear HTML comments
- Well-documented CSS
- Simple photo replacement process

---

## 📁 File Structure

```
your-website/
├── images/
│   └── gallery/              ← Your photos go here
│       ├── photo-1.jpg
│       ├── photo-2.jpg
│       └── README.md         ← Instructions
├── index.html                ← Gallery HTML (lines 135-254)
├── styles.css                ← Gallery styles (lines 1467-1602)
└── PHOTO_GALLERY_GUIDE.md    ← This file
```

---

## 🖼️ How to Add Your Photos

### Step 1: Prepare Your Photos

**Recommended specs:**
- **Size:** 800x800px (square)
- **Format:** JPG or PNG
- **File size:** Under 500KB (use [TinyPNG](https://tinypng.com) to compress)
- **Aspect ratio:** 1:1 (crop to square before uploading)

**Tools for cropping to square:**
- macOS: Preview (Tools → Adjust Size)
- Windows: Paint / Photos app
- Online: [Squoosh.app](https://squoosh.app)

---

### Step 2: Add Photos to Your Website

1. **Copy your photos** to the `images/gallery/` folder
2. **Name them clearly:** `hiking-trip.jpg`, `coffee-moment.jpg`, etc.

---

### Step 3: Update the HTML

Open [index.html](index.html#L135-L254) and find the Photo Gallery section.

**To replace a placeholder photo:**

Find a block like this:
```html
<div class="gallery-photo" data-animate="scale-in" data-animate-delay="0">
    <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop"
        alt="Mountain landscape - Replace with your photo"
        loading="lazy"
    />
</div>
```

Change the `src` to your photo:
```html
<div class="gallery-photo" data-animate="scale-in" data-animate-delay="0">
    <img
        src="images/gallery/hiking-trip.jpg"
        alt="Hiking in the mountains"
        loading="lazy"
    />
</div>
```

**Important:** Update the `alt` text to describe your photo (for accessibility).

---

### Step 4: Add More Photos

**To add a new photo**, copy this template:

```html
<div class="gallery-photo" data-animate="scale-in" data-animate-delay="0.4">
    <img
        src="images/gallery/your-photo.jpg"
        alt="Description of your photo"
        loading="lazy"
    />
</div>
```

Paste it inside the `<div class="photo-grid">` container, then:
1. Set `data-animate-delay` to next increment (0.4, 0.45, 0.5, etc.)
2. Update `src` to your image path
3. Update `alt` text

---

### Step 5: Remove Photos

Simply delete the entire `<div class="gallery-photo">...</div>` block you don't want.

---

## 🎨 Customization Options

### Change Number of Columns

Edit [styles.css](styles.css#L1494-L1517):

```css
/* Mobile: 2 columns (currently) */
.photo-grid {
    grid-template-columns: repeat(2, 1fr);
}

/* Tablet: 3 columns (currently) */
@media (min-width: 640px) {
    .photo-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Desktop: 4 columns (currently) */
@media (min-width: 900px) {
    .photo-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

**Example changes:**
- Want 5 columns on desktop? → `repeat(5, 1fr)`
- Want 3 columns on tablet? → `repeat(3, 1fr)`

---

### Change Photo Spacing

Edit the `gap` values in [styles.css](styles.css#L1496):

```css
.photo-grid {
    gap: 16px;  /* Mobile spacing - try 12px for tighter */
}

@media (min-width: 640px) {
    .photo-grid {
        gap: 20px;  /* Desktop spacing - try 24px for more space */
    }
}
```

---

### Change Border Radius (Roundness)

Edit [styles.css](styles.css#L1526):

```css
.gallery-photo {
    border-radius: 12px;  /* Try: 8px (sharper) or 16px (rounder) */
}
```

---

### Change Shadow Intensity

Edit [styles.css](styles.css#L1530):

```css
.gallery-photo {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);  /* Increase 0.06 to 0.12 for stronger */
}

.gallery-photo:hover {
    box-shadow: 0 8px 20px rgba(139, 122, 158, 0.15);  /* Hover shadow */
}
```

---

### Change Accent Border Color

Edit [styles.css](styles.css#L1531):

```css
.gallery-photo {
    border: 1px solid rgba(139, 122, 158, 0.1);
    /* Change 0.1 to 0.2 for more visible border */
}
```

---

### Remove Hover Effects

Comment out or delete these lines in [styles.css](styles.css#L1542-L1559):

```css
/* .gallery-photo:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 20px rgba(139, 122, 158, 0.15);
} */

/* .gallery-photo:hover img {
    transform: scale(1.05);
} */
```

---

### Change Gallery Heading

Edit [index.html](index.html#L158):

```html
<h2 class="gallery-heading" data-animate="fade-up">Moments</h2>
```

**Options:**
- `Moments` (current)
- `Life in Frames`
- `Snapshots`
- `Behind the Code`
- Remove the heading entirely by deleting the line

---

### Remove Gallery Heading

Delete [this line](index.html#L158):

```html
<!-- DELETE THIS LINE: -->
<h2 class="gallery-heading" data-animate="fade-up">Moments</h2>
```

---

## 🎬 Animation Details

### How Animations Work

Each photo has:
```html
data-animate="scale-in" data-animate-delay="0.15"
```

- `data-animate="scale-in"` → Photo scales from 95% to 100% while fading in
- `data-animate-delay="0.15"` → Delay in seconds (creates staggered effect)

**Current delays:** 0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35 (50ms increments)

---

### Change Animation Speed

Edit [animations.js](animations.js#L31-L35):

```javascript
duration: {
    normal: 0.6,    // Photo animation duration (try 0.4 for faster, 0.8 for slower)
}
```

---

### Change Stagger Delay

In [index.html](index.html#L165-L234), adjust `data-animate-delay` values:

**Current (50ms stagger):**
```html
data-animate-delay="0"      <!-- Photo 1 -->
data-animate-delay="0.05"   <!-- Photo 2 -->
data-animate-delay="0.1"    <!-- Photo 3 -->
```

**Faster (25ms stagger):**
```html
data-animate-delay="0"      <!-- Photo 1 -->
data-animate-delay="0.025"  <!-- Photo 2 -->
data-animate-delay="0.05"   <!-- Photo 3 -->
```

**Slower (100ms stagger):**
```html
data-animate-delay="0"      <!-- Photo 1 -->
data-animate-delay="0.1"    <!-- Photo 2 -->
data-animate-delay="0.2"    <!-- Photo 3 -->
```

---

### Disable Gallery Animations

Remove `data-animate` attributes from each photo:

**Before:**
```html
<div class="gallery-photo" data-animate="scale-in" data-animate-delay="0">
```

**After:**
```html
<div class="gallery-photo">
```

Or set `ANIMATIONS_ENABLED = false` in [animations.js](animations.js#L26) to disable all animations globally.

---

## 📱 Mobile Responsiveness

The gallery automatically adapts to screen size:

| Screen Size | Columns | Gap |
|-------------|---------|-----|
| Mobile (< 640px) | 2 | 16px |
| Tablet (640px - 900px) | 3 | 20px |
| Desktop (> 900px) | 4 | 20px |

**Test on mobile:**
1. Open DevTools (F12)
2. Click device toolbar icon
3. Select iPhone or Android device
4. Verify 2 columns display correctly

---

## ♿ Accessibility

### Alt Text (Required!)

Always provide descriptive alt text for screen readers:

```html
<img
    src="images/gallery/hiking.jpg"
    alt="Hiking at sunset in the Rocky Mountains"
    loading="lazy"
/>
```

**Good alt text examples:**
- "Coffee break at a local cafe"
- "Working on a coding project at UofT"
- "Presenting research at conference"

**Bad alt text:**
- "IMG_1234"
- "Photo"
- Leaving alt empty

---

### Reduced Motion

The gallery respects `prefers-reduced-motion`:
- If enabled in user's OS → photos appear instantly (no animation)
- Hover effects are removed automatically

This is handled by [styles.css](styles.css#L1515-L1529) and [animations.js](animations.js#L52).

---

## 🚀 Performance Tips

### Image Optimization

1. **Compress before uploading**
   - Use [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)
   - Target: Under 500KB per image
   - Maintains visual quality while reducing file size

2. **Use correct format**
   - JPG for photos (better compression)
   - PNG for graphics/screenshots (if needed)
   - WebP for modern browsers (optional)

3. **Lazy loading is automatic**
   - `loading="lazy"` attribute delays loading until photo enters viewport
   - Improves initial page load time

---

### How Many Photos?

**Recommendations:**
- **8-12 photos:** Sweet spot (2-3 rows on desktop)
- **12-16 photos:** Maximum (4 rows)
- **More than 16:** Consider a separate gallery page

**Why?** Too many photos can:
- Slow down page load
- Overwhelm visitors
- Distract from professional content below

---

## �� Design Philosophy

The photo gallery follows these principles:

✅ **Personal, not professional**
- Shows who you are as a person
- Creates emotional connection
- Complements (doesn't compete with) work portfolio

✅ **Elegant, not flashy**
- Subtle animations (scale-in only)
- Minimal shadows and borders
- White background maintained

✅ **Intentional, not random**
- Curated selection (not all photos)
- Quality over quantity
- Each photo has purpose

---

## 📋 Quick Checklist Before Publishing

- [ ] All placeholder photos replaced with your own
- [ ] Every image has descriptive alt text
- [ ] Images compressed (< 500KB each)
- [ ] Images are square (1:1 aspect ratio)
- [ ] Gallery heading updated or removed
- [ ] Tested on mobile (2 columns display correctly)
- [ ] Tested on desktop (4 columns display correctly)
- [ ] Animations feel smooth (not too fast/slow)
- [ ] Photos tell a story about who you are

---

## 🐛 Troubleshooting

### Photos Not Displaying?

1. **Check file path** - Is it `images/gallery/photo.jpg`?
2. **Check file exists** - Did you upload the photo to the folder?
3. **Check file extension** - Is it `.jpg` not `.JPG`? (case-sensitive on some servers)
4. **Check browser console** - Look for 404 errors

---

### Photos Different Sizes?

CSS handles this automatically with `object-fit: cover`:
- Non-square photos are center-cropped
- For best results, crop to square (1:1) before uploading

---

### Animations Not Working?

1. **Check animations.js loaded** - Look in browser DevTools > Network
2. **Check data-animate attribute** - Should be `data-animate="scale-in"`
3. **Check JavaScript console** - Look for errors
4. **Verify Motion One loaded** - Type `Motion` in console (should return object)

---

### Gallery Too Wide on Mobile?

Check these CSS values in [styles.css](styles.css#L1494):

```css
.photo-grid {
    max-width: 900px;  /* Keeps gallery centered */
    margin: 0 auto;    /* Centers the grid */
}
```

---

### Photos Loading Slowly?

1. **Compress images** - Use TinyPNG (target < 200KB each)
2. **Reduce number of photos** - Start with 8, not 16
3. **Check internet speed** - Test on slower connection
4. **Verify lazy loading** - Should have `loading="lazy"` attribute

---

## 🎓 Example Photo Selections

### Good Photo Ideas

- ✅ Coffee at your favorite cafe
- ✅ Working on a project
- ✅ Hiking or nature photos
- ✅ Travel moments
- ✅ Reading or studying
- ✅ Conference or events
- ✅ Hobbies (music, art, sports)
- ✅ Campus or city scenes

### Photos to Avoid

- ❌ Blurry or low-quality
- ❌ Overly personal/private
- ❌ Group photos where you're not the focus
- ❌ Screenshots or memes
- ❌ Photos that contradict your professional brand

---

## 📚 Technical Reference

### HTML Structure

```html
<section class="photo-gallery-section">
    <h2 class="gallery-heading">Moments</h2>
    <div class="photo-grid">
        <div class="gallery-photo" data-animate="scale-in" data-animate-delay="0">
            <img src="path/to/photo.jpg" alt="Description" loading="lazy" />
        </div>
        <!-- More photos... -->
    </div>
</section>
```

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.photo-gallery-section` | Wrapper for entire gallery |
| `.gallery-heading` | Optional heading above photos |
| `.photo-grid` | Grid container (responsive columns) |
| `.gallery-photo` | Individual photo wrapper (aspect ratio, borders) |

### Key CSS Properties

- `aspect-ratio: 1 / 1` → Maintains square shape
- `object-fit: cover` → Crops images to fit square
- `loading="lazy"` → Delays loading until photo enters viewport
- `grid-template-columns: repeat(4, 1fr)` → 4 equal columns

---

## 💡 Pro Tips

1. **Tell a story** - Arrange photos to show progression or variety in your life
2. **Maintain consistency** - Similar lighting/quality across photos
3. **Use whitespace** - Don't fill every grid slot; leave breathing room
4. **Update seasonally** - Refresh photos every few months
5. **Test on actual device** - Mobile emulation ≠ real mobile performance

---

## 🔗 Resources

- **Image compression:** [TinyPNG](https://tinypng.com), [Squoosh](https://squoosh.app)
- **Alt text guide:** [WebAIM Alt Text](https://webaim.org/techniques/alttext/)
- **CSS Grid guide:** [CSS-Tricks Complete Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- **Motion One docs:** [motion.dev](https://motion.dev)

---

## 📞 Need Help?

1. Check [ANIMATIONS_GUIDE.md](ANIMATIONS_GUIDE.md) for animation customization
2. Review HTML comments in [index.html](index.html#L135-L254)
3. Check CSS comments in [styles.css](styles.css#L1577-L1602)
4. Test in browser DevTools Console for errors

---

**Last updated:** January 2026
**Photo Gallery Version:** 1.0
