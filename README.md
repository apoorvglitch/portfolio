# Apoorv Nambiar — Portfolio Website

A modern, premium personal portfolio website built with **HTML**, **CSS**, and **JavaScript**. Features a dark glassmorphism theme with smooth animations, scroll interactions, and full responsiveness.

## Features

- Dark theme with glassmorphism UI and blue/purple gradients
- Fully responsive (desktop, tablet, mobile)
- Loading animation on page open
- Custom cursor effect (desktop only)
- Scroll progress indicator
- Active navbar highlight on scroll
- Scroll reveal animations
- Typing effect for job title
- CSS-only animated hero background and floating particles
- Back-to-top floating button
- Hamburger menu for mobile
- Contact form with frontend validation
- Lazy loading for images
- SEO-friendly meta tags
- Accessibility support (semantic HTML, focus styles, reduced motion)

## Sections

1. **Hero** — Name, title, intro, CTA buttons, social links
2. **About** — Professional introduction with image placeholder
3. **Skills** — Animated skill cards (Frontend, Tools, Currently Learning)
4. **Projects** — Three featured project cards with GitHub/Live Demo links
5. **Contact** — Contact info and validated contact form
6. **Footer** — Copyright notice

## Folder Structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── icons/
    │   ├── favicon.svg
    │   ├── html5.svg
    │   ├── css3.svg
    │   ├── javascript.svg
    │   ├── git.svg
    │   ├── github.svg
    │   ├── vscode.svg
    │   ├── react.svg
    │   └── nodejs.svg
    └── images/
        ├── profile-placeholder.svg
        ├── project-luxeglow.svg
        ├── project-taskmanager.svg
        └── project-arunicecream.svg
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

3. Visit `http://localhost:8000` in your browser

## Customization

### Profile Photo
Replace `assets/images/profile-placeholder.svg` with your own photo (JPG, PNG, or WebP). Update the `src` attribute in `index.html` if you change the filename.

### Project Links
Update the `href="#"` placeholders in the Projects section with your actual GitHub and live demo URLs.

### Social Links & Contact
Update GitHub, LinkedIn, and email links in the Hero and Contact sections.

### Projects Images
Replace SVG placeholders in `assets/images/` with screenshots of your actual projects.

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Apoorv Nambiar. All Rights Reserved.
