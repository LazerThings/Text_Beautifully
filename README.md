# Text Beautifully

> ___Disclaimer: This project was made entirely by AI with my guidance. This disclaimer I wrote is probably the only piece of text I wrote in this codebase.___

A minimal, elegant CSS/JS framework for creating beautiful text-focused websites with a book-like aesthetic. Built around the Oxanium font family, Text Beautifully transforms simple HTML into a refined reading experience.

## Features

✨ **Clean Typography** - Beautiful text hierarchy using Oxanium font weights  
📖 **Book-like Aesthetic** - Warm brown tones on cream background  
📊 **Reading Progress** - Visual progress tracking with optional navigation menu  
🔤 **Font Controls** - User-adjustable text sizing  
📑 **Auto-Generated TOC** - Smart table of contents from your headings  
🎨 **Text Highlighting** - Flexible highlighting system with presets and custom colors  
📱 **Responsive Design** - Works beautifully on all screen sizes  
⚡ **Lightweight** - Just CSS and vanilla JavaScript, no dependencies

## Quick Start

1. Include the Oxanium font and framework files:

```html
<link rel="stylesheet" href="styles.css">
<script src="script.js"></script>
```

2. Write your content using standard HTML tags plus our custom elements:

```html
<h1>Your Title</h1>
<p>Your content with <light color="1">highlighting</light></p>
<contents></contents>
<divider>Section Break</divider>
```

3. That’s it! Your text will be beautifully formatted with all the interactive features.

## Custom Elements

- **`<contents>`** - Auto-generates table of contents
- **`<divider>`** - Elegant section dividers with optional text
- **`<h>`** - Invisible headings for TOC without changing appearance
- **`<light>`** - Text highlighting with preset or custom colors

## Configuration

Control features through body attributes:

- `no-progress` - Hide progress bar, show menu tab if menu exists
- `no-size` - Hide font size controls
- `default-txt-small|regular|large` - Set default text size

## License

Mozilla Public License 2.0

## Contributing

Text Beautifully is designed to be simple and focused. When contributing, please maintain the minimalist philosophy and book-like aesthetic that makes this framework special.