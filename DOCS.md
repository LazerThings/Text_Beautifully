# Text Beautifully Documentation

Complete guide to building beautiful text-focused websites with Text Beautifully.

## Getting Started

### Basic Setup

Create these three files in your project:

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Site</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome</h1>
    <p>Your content goes here.</p>
    <script src="script.js"></script>
</body>
</html>
```

Include `styles.css` and `script.js` from this project.

### Typography System

Text Beautifully uses Oxanium font with carefully chosen weights:

- **H1**: 600 weight, 2.5rem - Main titles
- **H2**: 500 weight, 2rem - Section headings
- **H3**: 450 weight, 1.5rem - Subsections
- **H4-H6**: 400 weight, 1.25rem - Minor headings
- **Body**: 300 weight, 18px - Reading text
- **Links**: 400 weight, underlined - Interactive elements

All spacing follows book-like proportions with more space between elements than within them.

## Core Features

### Reading Progress System

The progress bar appears at the top of the page, showing reading percentage and providing navigation access.

**Basic progress bar:**

```html
<!-- Progress bar automatically appears -->
```

**With navigation menu:**

```html
<body>
    <div id="progress-menu">
        <h2>Navigation</h2>
        <ul>
            <li><a href="#section1">Section 1</a></li>
            <li><a href="#section2">Section 2</a></li>
        </ul>
    </div>
    <!-- Your content -->
</body>
```

Click the progress bar to toggle the menu. The menu slides down as a full-screen overlay.

### Font Size Controls

A sidebar on the right provides three size options:

- **Small**: 80% of default size
- **Regular**: 100% default size
- **Large**: 120% of default size

All elements scale proportionally, maintaining perfect typography hierarchy.

### Auto-Generated Table of Contents

Use the `<contents>` tag to automatically generate navigation from your headings.

**Default behavior (shows h2 only):**

```html
<contents></contents>
```

**Custom selection:**

```html
<contents include="h1,h2,h3"></contents>
<contents include="h1,h3"></contents>
<contents include="h2,h4,h6"></contents>
```

The include attribute completely overrides the default - only specified heading levels will appear.

## Custom Elements

### Dividers

Create elegant section breaks with optional text:

```html
<divider>Chapter One</divider>
<divider></divider> <!-- Just a line -->
```

Renders as: `——— Chapter One ———————————————————`

### Invisible Headings

Add content to table of contents without changing text appearance:

```html
<p>This paragraph has <h>Important Concept</h> that appears in TOC.</p>
```

Include in TOC with: `<contents include="h2,h"></contents>`

### Text Highlighting

Highlight text with preset or custom colors:

**Preset colors:**

```html
<light color="1">Green highlighting</light>
<light color="2">Blue highlighting</light>  
<light color="3">Yellow highlighting</light>
<light color="4">Pink highlighting</light>
```

**Custom colors:**

```html
<light color="#ff6b6b">Hex colors</light>
<light color="rgb(100,200,255)">RGB values</light>
<light color="rgba(255,0,0,0.3)">Full RGBA control</light>
<light color="purple">Named CSS colors</light>
```

## Configuration Options

Control features through body attributes:

### Progress Bar Control

**Hide progress bar:**

```html
<body no-progress>
```

When `no-progress` is set and a progress menu exists, a small tab appears in the top-right corner instead.

### Font Size Control

**Hide font size sidebar:**

```html
<body no-size>
```

**Set default text size:**

```html
<body default-txt-small>
<body default-txt-regular>
<body default-txt-large>
```

### Combined Configurations

```html
<!-- Minimal interface -->
<body no-progress no-size>

<!-- Large text with tab menu -->
<body no-progress default-txt-large>

<!-- Clean reading mode -->
<body no-size default-txt-regular>
```

## Content Guidelines

### Writing Structure

Use semantic HTML with proper heading hierarchy:

```html
<h1>Main Title</h1>
<h2>Chapter</h2>
<h3>Section</h3>
<p>Content paragraphs...</p>
```

### Line Breaks in Paragraphs

You can use natural line breaks within paragraphs:

```html
<p>First line here
Second line after break
Third line continues</p>
```

### Navigation Setup

For best results, include anchor IDs for major sections:

```html
<h1 id="introduction">Introduction</h1>
<h2 id="getting-started">Getting Started</h2>
```

Auto-generated IDs are created when missing, but manual IDs give you control.

## Design Philosophy

Text Beautifully prioritizes:

1. **Readability** - Optimal line length, spacing, and contrast
2. **Elegance** - Book-inspired aesthetics with warm colors
3. **Simplicity** - Minimal interface that doesn’t distract from content
4. **Functionality** - Useful features that enhance the reading experience
5. **Accessibility** - Responsive design and user control over text size

The framework assumes your primary goal is delivering excellent reading experiences for text-heavy content like articles, documentation, stories, or blogs.

## Browser Support

Works in all modern browsers that support:

- CSS Custom Properties
- Flexbox
- IntersectionObserver
- ES6+ JavaScript

## Performance

Text Beautifully is lightweight and fast:

- ~8KB total framework size
- Vanilla JavaScript with no dependencies
- Smooth 60fps animations
- Minimal DOM manipulation

Focus on your content - the framework handles the presentation beautifully.