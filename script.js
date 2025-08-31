// Text Enhancement Script for Oxanium Website
// Adds subtle interactive enhancements while maintaining minimalist feel

document.addEventListener('DOMContentLoaded', function() {
    
    // Check body attributes for configuration
    const body = document.body;
    const hasNoProgress = body.hasAttribute('no-progress');
    const hasNoSize = body.hasAttribute('no-size');
    
    // Determine default font size
    let defaultFontSize = 'regular';
    if (body.hasAttribute('default-txt-small')) defaultFontSize = 'small';
    else if (body.hasAttribute('default-txt-large')) defaultFontSize = 'large';
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add subtle fade-in animation for paragraphs on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in to text elements
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, divider');
    textElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Enhanced divider functionality
    const dividers = document.querySelectorAll('divider');
    dividers.forEach(divider => {
        // Add hover effect
        divider.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        divider.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Check for progress menu
    const progressMenu = document.getElementById('progress-menu');
    let menuVisible = false;
    
    if (progressMenu) {
        // Hide the progress menu initially
        progressMenu.style.cssText = `
            position: fixed;
            top: ${hasNoProgress ? '0' : '12px'};
            left: 0;
            width: 100%;
            height: ${hasNoProgress ? '100vh' : 'calc(100vh - 12px)'};
            background: #faf6f0;
            border-bottom: 1px solid #a1887f;
            z-index: 9998;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            padding: 2rem;
            box-shadow: 0 4px 12px rgba(62, 39, 35, 0.1);
            overflow-y: auto;
        `;
    }

    // Progress bar or menu tab
    if (!hasNoProgress) {
        // Create normal progress bar
        const progressContainer = document.createElement('div');
        const progressBar = document.createElement('div');
        const progressText = document.createElement('span');
        
        progressContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 12px;
            background: rgba(161, 136, 127, 0.3);
            z-index: 9999;
            ${progressMenu ? 'cursor: pointer;' : ''}
        `;
        
        progressBar.style.cssText = `
            width: 0%;
            height: 100%;
            background: linear-gradient(to right, #5d4037, #3e2723);
            transition: width 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        `;
        
        progressText.style.cssText = `
            color: #faf6f0;
            font-size: 10px;
            font-weight: 500;
            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            opacity: 0;
            transition: opacity 0.3s ease;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        `;
        
        progressBar.appendChild(progressText);
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);

        // Progress bar click functionality
        if (progressMenu) {
            progressContainer.addEventListener('click', function() {
                menuVisible = !menuVisible;
                if (menuVisible) {
                    progressMenu.style.transform = 'translateY(0)';
                } else {
                    progressMenu.style.transform = 'translateY(-100%)';
                }
            });
        }

        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
            progressText.textContent = Math.round(scrolled) + '%';
            
            // Show/hide percentage text based on progress
            if (scrolled > 5) {
                progressText.style.opacity = '1';
            } else {
                progressText.style.opacity = '0';
            }
        });
        
    } else if (progressMenu) {
        // Create menu tab when no-progress is set
        const menuTab = document.createElement('div');
        menuTab.innerHTML = '→';
        menuTab.style.cssText = `
            position: fixed;
            top: 0;
            right: 0;
            width: 32px;
            height: 12px;
            background: linear-gradient(to right, #5d4037, #3e2723);
            z-index: 9999;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #faf6f0;
            font-size: 10px;
            font-weight: 500;
            transition: all 0.3s ease;
        `;
        
        menuTab.addEventListener('click', function() {
            menuVisible = !menuVisible;
            if (menuVisible) {
                progressMenu.style.transform = 'translateY(0)';
                menuTab.innerHTML = '←';
            } else {
                progressMenu.style.transform = 'translateY(-100%)';
                menuTab.innerHTML = '→';
            }
        });
        
        menuTab.addEventListener('mouseenter', function() {
            menuTab.style.width = '48px';
        });
        
        menuTab.addEventListener('mouseleave', function() {
            menuTab.style.width = '32px';
        });
        
        document.body.appendChild(menuTab);
    }

    // Font size controls
    let currentFontSize = defaultFontSize; // Use default from body attribute
    const fontSizes = {
        small: 0.8,
        regular: 1.0,
        large: 1.2
    };

    // Create font size sidebar (only if not disabled)
    if (!hasNoSize) {
        const fontSidebar = document.createElement('div');
        fontSidebar.style.cssText = `
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(250, 246, 240, 0.95);
            border: 1px solid #a1887f;
            border-right: none;
            border-radius: 8px 0 0 8px;
            padding: 1rem 0.75rem;
            z-index: 9997;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            box-shadow: -2px 0 8px rgba(62, 39, 35, 0.1);
        `;

        const sizeButtons = ['small', 'regular', 'large'];
        sizeButtons.forEach(size => {
            const button = document.createElement('button');
            button.textContent = size === 'small' ? 'A' : size === 'regular' ? 'A' : 'A';
            button.style.cssText = `
                background: ${size === currentFontSize ? '#5d4037' : 'transparent'};
                color: ${size === currentFontSize ? '#faf6f0' : '#5d4037'};
                border: 1px solid #5d4037;
                border-radius: 4px;
                padding: 0.5rem;
                cursor: pointer;
                font-family: 'Oxanium', monospace;
                font-size: ${size === 'small' ? '12px' : size === 'regular' ? '14px' : '16px'};
                font-weight: 500;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            `;
            
            button.addEventListener('click', () => {
                currentFontSize = size;
                updateFontSize();
                updateButtonStates();
            });
            
            button.addEventListener('mouseenter', () => {
                if (size !== currentFontSize) {
                    button.style.background = '#a1887f';
                    button.style.color = '#faf6f0';
                }
            });
            
            button.addEventListener('mouseleave', () => {
                if (size !== currentFontSize) {
                    button.style.background = 'transparent';
                    button.style.color = '#5d4037';
                }
            });
            
            fontSidebar.appendChild(button);
        });

        function updateButtonStates() {
            const buttons = fontSidebar.querySelectorAll('button');
            buttons.forEach((button, index) => {
                const size = sizeButtons[index];
                if (size === currentFontSize) {
                    button.style.background = '#5d4037';
                    button.style.color = '#faf6f0';
                } else {
                    button.style.background = 'transparent';
                    button.style.color = '#5d4037';
                }
            });
        }

        document.body.appendChild(fontSidebar);
    }

    function updateFontSize() {
        const multiplier = fontSizes[currentFontSize];
        document.body.style.fontSize = (18 * multiplier) + 'px';
        
        // Update headings proportionally
        const h1s = document.querySelectorAll('h1');
        const h2s = document.querySelectorAll('h2');
        const h3s = document.querySelectorAll('h3');
        const h4s = document.querySelectorAll('h4, h5, h6');
        
        h1s.forEach(h => h.style.fontSize = (2.5 * multiplier) + 'rem');
        h2s.forEach(h => h.style.fontSize = (2.0 * multiplier) + 'rem');
        h3s.forEach(h => h.style.fontSize = (1.5 * multiplier) + 'rem');
        h4s.forEach(h => h.style.fontSize = (1.25 * multiplier) + 'rem');
    }

    // Apply default font size immediately
    updateFontSize();

    // Auto-generated Table of Contents
    function generateTOC() {
        const contentsElements = document.querySelectorAll('contents');
        
        contentsElements.forEach(contentsEl => {
            // Check if this contents element is inside the progress menu
            const isInProgressMenu = progressMenu && progressMenu.contains(contentsEl);
            
            // Determine which headers to include
            let includeHeaders = ['h2']; // default
            const includeAttr = contentsEl.getAttribute('include');
            if (includeAttr) {
                includeHeaders = includeAttr.split(',').map(h => h.trim().toLowerCase());
            }
            
            // Build selector for traditional headers and custom h tags
            const traditionalHeaders = includeHeaders.filter(h => h.match(/^h[1-6]$/));
            const includesCustomH = includeHeaders.includes('h');
            
            let allHeaders = [];
            
            // Determine the search scope - if in progress menu, search entire document; otherwise search outside progress menu
            const searchScope = isInProgressMenu ? document : document.body;
            
            // Get traditional headers
            if (traditionalHeaders.length > 0) {
                const traditionalSelector = traditionalHeaders.join(', ');
                const traditionalHeaderEls = searchScope.querySelectorAll(traditionalSelector);
                traditionalHeaderEls.forEach((header, index) => {
                    // If contents is in progress menu, include all headers
                    // If contents is not in progress menu, exclude headers that are in progress menu
                    const headerInProgressMenu = progressMenu && progressMenu.contains(header);
                    
                    if (isInProgressMenu || !headerInProgressMenu) {
                        allHeaders.push({
                            element: header,
                            level: parseInt(header.tagName.substring(1)),
                            text: header.textContent
                        });
                    }
                });
            }
            
            // Get custom h tags if included
            if (includesCustomH) {
                const customHeaders = searchScope.querySelectorAll('h');
                customHeaders.forEach((header, index) => {
                    // Same logic as traditional headers
                    const headerInProgressMenu = progressMenu && progressMenu.contains(header);
                    
                    if (isInProgressMenu || !headerInProgressMenu) {
                        allHeaders.push({
                            element: header,
                            level: 2, // treat custom h tags as h2 level for indentation
                            text: header.textContent,
                            isCustom: true
                        });
                    }
                });
            }
            
            // Sort headers by document order
            allHeaders.sort((a, b) => {
                const position = a.element.compareDocumentPosition(b.element);
                if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
                if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
                return 0;
            });
            
            // Generate TOC HTML
            let tocHTML = '<nav class="table-of-contents">';
            allHeaders.forEach((header, index) => {
                // Create ID only if it doesn't exist
                if (!header.element.id) {
                    header.element.id = header.isCustom ? 'custom-heading-' + index : 'heading-' + index;
                }
                
                const minLevel = Math.min(...allHeaders.map(h => h.level));
                const indent = (header.level - minLevel) * 1.5;
                
                tocHTML += `
                    <a href="#${header.element.id}" 
                       style="display: block; 
                              margin-left: ${indent}rem; 
                              margin-bottom: 0.5rem;
                              color: #5d4037;
                              text-decoration: none;
                              font-size: 0.9rem;
                              line-height: 1.4;
                              transition: color 0.2s ease;
                              ${header.isCustom ? 'font-style: italic;' : ''}"
                       onmouseover="this.style.color='#3e2723'"
                       onmouseout="this.style.color='#5d4037'">
                        ${header.text}
                    </a>
                `;
            });
            tocHTML += '</nav>';
            
            contentsEl.innerHTML = tocHTML;
            
            // Style the contents element
            contentsEl.style.cssText = `
                display: block;
                background: rgba(161, 136, 127, 0.1);
                border: 1px solid #a1887f;
                border-radius: 8px;
                padding: 1.5rem;
                margin: 2rem 0;
                font-family: 'Oxanium', monospace;
            `;
        });
    }

    // Process light tags with custom colors
    function processLightTags() {
        const lightTags = document.querySelectorAll('light[color]');
        lightTags.forEach(light => {
            const color = light.getAttribute('color');
            
            // If it's not one of the preset numbers, treat as custom color
            if (!['1', '2', '3', '4'].includes(color)) {
                // Handle various color formats
                let backgroundColor;
                
                if (color.startsWith('#')) {
                    // Hex color - convert to rgba with transparency
                    const hex = color.slice(1);
                    const r = parseInt(hex.substr(0, 2), 16);
                    const g = parseInt(hex.substr(2, 2), 16);
                    const b = parseInt(hex.substr(4, 2), 16);
                    backgroundColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
                } else if (color.startsWith('rgb')) {
                    // RGB/RGBA color - modify to add transparency if needed
                    if (color.startsWith('rgba')) {
                        backgroundColor = color;
                    } else {
                        // Convert rgb to rgba
                        const values = color.match(/\d+/g);
                        backgroundColor = `rgba(${values[0]}, ${values[1]}, ${values[2]}, 0.3)`;
                    }
                } else {
                    // Named color - use CSS custom property fallback
                    backgroundColor = color;
                    light.style.opacity = '0.7';
                }
                
                if (backgroundColor) {
                    light.style.backgroundColor = backgroundColor;
                }
            }
        });
    }

    // Generate TOC and process light tags after DOM is ready
    generateTOC();
    processLightTags();
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        const words = p.innerHTML.split(' ');
        if (words.length > 3) {
            words[words.length - 2] += '&nbsp;' + words[words.length - 1];
            words.pop();
            p.innerHTML = words.join(' ');
        }
    });

    // Add subtle link hover animation
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Print-friendly adjustments
    window.addEventListener('beforeprint', function() {
        document.body.style.maxWidth = 'none';
        document.body.style.padding = '1rem';
        document.body.style.fontSize = '12pt';
        document.body.style.lineHeight = '1.5';
    });

    window.addEventListener('afterprint', function() {
        document.body.style.maxWidth = '42rem';
        document.body.style.padding = '3rem 2rem';
        document.body.style.fontSize = '18px';
        document.body.style.lineHeight = '1.7';
    });

});