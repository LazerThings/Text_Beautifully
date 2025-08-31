# Text Beautifully

A CSS/JS framework for elegant text-focused websites with book-like aesthetics using the Oxanium font family.

## Project Structure

```
/
├── index.html          # Main HTML file with example content
├── styles.css          # Complete CSS framework with typography and custom elements
├── script.js           # JavaScript for interactions and dynamic features
└── README.md           # Human-readable project overview
```

## Setup Commands

- No build process required - pure HTML/CSS/JS
- Serve files from any web server
- For development: `python -m http.server 8000` or any local server

## Code Architecture

### CSS Framework (styles.css)

**Typography System:**

- Uses Oxanium font weights 200-800 from Google Fonts
- Book-inspired color scheme: dark brown (#3e2723) on cream (#faf6f0)
- Responsive typography with proper hierarchy
- 42rem max-width for optimal reading line length

**Custom Elements:**

```css
h { display: inline; } /* Invisible headings for TOC */
light { background highlighting with color attribute support }
divider { Flex-based left-aligned dividers with decorative lines }
```

**Color System:**

- Body text: #3e2723 (dark brown)
- Headers: #2e1207 (deeper brown)
- Links: #5d4037 (medium brown)
- Background: #faf6f0 (cream)
- Accents: #a1887f (light brown)

### JavaScript Framework (script.js)

**Core Functionality:**

1. **Progress System** - Reading progress bar with percentage display
2. **Font Scaling** - 3-tier system (80%, 100%, 120%) with proportional heading scaling
3. **TOC Generation** - Dynamic table of contents from heading elements
4. **Menu System** - Toggleable full-screen navigation overlay
5. **Animation System** - Scroll-based fade-ins and smooth interactions

**Body Attribute Configuration:**

```javascript
// Check for configuration attributes
const hasNoProgress = body.hasAttribute('no-progress');
const hasNoSize = body.hasAttribute('no-size');
const defaultSize = getDefaultFontSize(body); // from default-txt-* attributes
```

**Key Functions:**

- `generateTOC()` - Scans for `<contents>` tags and populates with filtered headings
- `updateFontSize()` - Applies scaling to body and all heading elements
- `processLightTags()` - Handles custom color highlighting
- Progress tracking via scroll event listeners

## Custom Element Implementation

### `<contents>` Tag

**Default:** Shows h2 elements only
**With include attribute:** Override to show specific heading types

```html
<contents include="h1,h2,h3,h"></contents>
```

**Logic:**

1. Parse include attribute or use default [‘h2’]
2. Query traditional headings (h1-h6) and custom h tags separately
3. Filter based on progress menu context (include/exclude menu headings)
4. Generate clickable navigation with proper indentation
5. Auto-assign IDs to elements without existing IDs

### `<light>` Tag

**Preset colors (1-4):** Predefined highlight colors
**Custom colors:** Supports hex, rgb, rgba, and named CSS colors

```html
<light color="1">Green preset</light>
<light color="#ff6b6b">Custom hex</light>
<light color="rgba(255,0,0,0.3)">Full RGBA</light>
```

**Processing:**

- Preset colors use hardcoded CSS selectors
- Custom colors processed via JavaScript with automatic transparency
- RGB values converted to RGBA with 0.3 alpha if no alpha specified

### `<divider>` Tag

**Structure:** Short line + text + extending line
**CSS Implementation:** Flexbox with ::before and ::after pseudo-elements

```css
divider::before { width: 3rem; }
divider::after { flex: 1; }
```

### `<h>` Tag

**Purpose:** Include text in TOC without visual styling changes
**Implementation:** Inherits all parent styles, processed by TOC generator
**Usage:** Inline within paragraphs or other elements

## Interactive Features

### Progress Menu System

**Trigger:** Click progress bar or menu tab (if no-progress mode)
**Implementation:** Fixed position overlay with slide animation
**Scope Logic:** TOC shows all headings if contents tag is in menu, otherwise excludes menu headings

### Font Size Controls

**Location:** Fixed sidebar on right side
**Sizes:** 3 buttons with visual sizing (12px/14px/16px button text)
**Scaling:** Proportional adjustment of body fontSize and all heading font sizes
**State Management:** Visual feedback for current selection

### Scroll Animations

**Fade-in Effect:** IntersectionObserver with staggered timing
**Progress Tracking:** Real-time scroll percentage calculation
**Smooth Scrolling:** For anchor link navigation

## Configuration Attributes

### `no-progress`

- Hides progress bar completely
- If progress menu exists, shows 32px×12px tab with arrow in top-right
- Menu positioning adjusts to full viewport height

### `no-size`

- Hides font size control sidebar
- Font size remains at default or specified default

### `default-txt-small|regular|large`

- Sets initial font size on page load
- Applied immediately via updateFontSize() function

## Development Guidelines

### Code Style

- Vanilla JavaScript ES6+
- CSS custom properties for colors
- Semantic HTML with progressive enhancement
- Mobile-first responsive design

### Browser Compatibility

- Modern browsers supporting IntersectionObserver
- CSS Grid/Flexbox support required
- ES6 JavaScript features used throughout

### Performance Considerations

- Minimal DOM manipulation
- Efficient event listeners with proper cleanup
- CSS transitions for smooth animations
- Debounced scroll events for performance

### Customization Points

- Color scheme easily modified via CSS custom properties
- Font size ratios adjustable in fontSizes object
- Animation timings configurable in CSS transitions
- TOC behavior customizable via include attributes

## Testing Strategy

Test with various content structures:

- Long documents for scroll testing
- Mixed heading hierarchies for TOC testing
- Various highlight color combinations
- Different body attribute configurations
- Mobile and desktop viewports
- Progress menu with different content amounts

## Security Considerations

- No external dependencies beyond Google Fonts
- No localStorage usage (framework is stateless)
- No eval() or innerHTML injection vulnerabilities
- Safe CSS color parsing for custom highlight colors