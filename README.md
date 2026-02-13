# Portfolio Website - Hanzallah Hasam

A modern, single-page portfolio website for a FullStack AI Engineer, featuring an interactive particle-based neural network background with physics-based mouse repulsion, smooth animations, and a minimalistic light theme with cyan/gradient accents.

## 🌟 Features

### Interactive Particle Background
- Custom-built particle system using vanilla JavaScript and Canvas API
- Neural network aesthetic with connected nodes
- Mouse repulsion physics with velocity-based force
- Radial gradient glow following cursor
- Optimized for performance with RequestAnimationFrame
- Responsive particle count based on device size

### Responsive Design
- Fully responsive layout (mobile, tablet, desktop)
- Mobile-first approach using Tailwind CSS
- Hamburger menu for mobile navigation
- Smooth transitions between breakpoints

### Sections
1. **Hero Section** - Eye-catching introduction with gradient text and CTAs
2. **About Section** - Profile photo, bio, tech stack badges, and animated statistics
3. **Projects Section** - Filterable project grid (6 projects across 5 categories)
4. **Testimonials Section** - Client testimonials with optional video modals
5. **Contact Section** - Contact form with validation and social links
6. **Footer** - Quick links and social media connections

### Interactive Features
- **Project Filtering** - Filter projects by category with smooth transitions
- **Project Modal** - Detailed project view with navigation arrows
- **Video Testimonials** - Play video testimonials in modal overlay
- **Contact Form** - Client-side validation with success feedback
- **Smooth Scrolling** - Anchor-based navigation with smooth scroll
- **Active Nav Highlighting** - Auto-highlights current section in navigation
- **Scroll to Top** - Appears after scrolling down
- **Animated Counters** - Stats count up when scrolled into view
- **Scroll Animations** - Elements fade in as you scroll

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup |
| Tailwind CSS v3 | Utility-first styling (CDN) |
| Custom CSS | Animations, gradients, particle canvas |
| Vanilla JavaScript | All interactivity and physics |
| Canvas API | Particle system rendering |
| Font Awesome | Icons |
| Google Fonts | Inter font family |

## 📂 Project Structure

```
Django-Blog/
├── index.html                 # Main single-page portfolio
├── css/
│   └── styles.css             # Custom styles, animations, gradients
├── js/
│   ├── particles.js           # Canvas particle system with mouse repulsion
│   ├── projects.js            # Project data, filtering, modal logic
│   └── main.js                # Navigation, scroll, testimonials, form
├── assets/
│   └── images/
│       ├── profile.jpg        # Profile photo
│       ├── project-1.jpg      # Project thumbnails
│       ├── project-2.jpg
│       ├── project-3.jpg
│       ├── project-4.jpg
│       ├── project-5.jpg
│       ├── project-6.jpg
│       ├── client-1.jpg       # Client avatars
│       ├── client-2.jpg
│       ├── client-3.jpg
│       └── client-4.jpg
├── Blog Site/                 # Previous Django blog (archived)
└── README.md                  # This file
```

## 🚀 Deployment

This is a **static website** with no build process required. Deploy directly to:

### GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Select branch and root folder
4. Site will be live at `https://username.github.io/repo-name`

### Netlify
1. Drag and drop the project folder to Netlify
2. Or connect your GitHub repository
3. No build command needed - just deploy

### Vercel
```bash
vercel --prod
```

### Any Static Host
Simply upload all files to any web server or CDN.

## 🎨 Design System

### Color Palette
- **Primary**: Cyan (#22D3EE, #06B6D4, #0891B2)
- **Secondary**: Blue (#3B82F6) and Purple (#A855F7)
- **Background**: Light gray (#FAFBFC)
- **Text**: Gray-800 (#1F2937) and Gray-500 (#6B7280)

### Typography
- **Headings**: Inter (600-700 weight)
- **Body**: Inter (400 weight)
- **Code**: Monospace

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640-1024px
- Desktop: > 1024px

## ⚙️ Customization

### Update Personal Information

**1. Edit [`index.html`](index.html):**
- Change name in navigation and hero section
- Update bio in About section
- Modify contact information
- Update social media links

**2. Edit [`js/projects.js`](js/projects.js):**
- Replace project data with your own projects
- Update categories, descriptions, tech stacks
- Change project images and links

**3. Replace Images:**
- Add your profile photo as [`assets/images/profile.jpg`](assets/images/profile.jpg)
- Replace project thumbnails [`project-1.jpg`](assets/images/project-1.jpg) through [`project-6.jpg`](assets/images/project-6.jpg)
- Update client testimonial avatars

### Customize Colors

Edit [`css/styles.css`](css/styles.css) CSS variables:

```css
:root {
    --cyan-400: #22D3EE;    /* Change primary color */
    --cyan-500: #06B6D4;
    --cyan-600: #0891B2;
    --blue-500: #3B82F6;
    --purple-500: #A855F7;
}
```

### Adjust Particle System

Edit [`js/particles.js`](js/particles.js) configuration:

```javascript
const config = {
    particleCount: 80,           // Number of particles
    connectionDistance: 150,      // Max distance for connections
    repulsionRadius: 120,         // Mouse repulsion radius
    repulsionStrength: 2,         // Repulsion force strength
    baseSpeed: 0.5,               // Particle drift speed
    damping: 0.95                 // Velocity damping
};
```

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible outlines
- `prefers-reduced-motion` support
- WCAG AA color contrast compliance
- Alt text on all images

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Performance

- No external dependencies (all CDN resources)
- Optimized particle rendering with RequestAnimationFrame
- Lazy loading for images (Intersection Observer)
- Reduced particle count on mobile devices
- Efficient DOM manipulation

## 🔧 Development

### Local Development

Simply open [`index.html`](index.html) in a web browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Testing

Test across different:
- Screen sizes (mobile, tablet, desktop)
- Browsers (Chrome, Firefox, Safari, Edge)
- Devices (iOS, Android)

## 📝 License

This project is open source and available for personal and commercial use.

## 👤 Author

**Hanzallah Hasam**
- FullStack AI Engineer
- GitHub: [@Hanzallah-Hassam](https://github.com/Hanzallah-Hassam)
- Portfolio: [Live Site](#)

## 🙏 Acknowledgments

- Tailwind CSS for the utility-first CSS framework
- Font Awesome for the icon library
- Google Fonts for Inter typeface

---

**Note**: Replace placeholder images and content with your actual information before deploying to production.
