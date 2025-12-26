# Soyoung Park Photography - AI Agent Instructions

## Architecture Overview
This is a static photography portfolio website with no build process. Key components:
- **Static HTML pages**: Main navigation (index.html, about.html, contact.html, store.html)
- **Collection galleries**: Dedicated pages for travel, nature, portraits, urban, seoul categories
- **AI Creations section**: Subpages for graphic design, short films, storybooks, tutorials
- **Asset management**: Images in `assets/images/fullsize/{category}/` with auto-generated thumbnails

## Critical Workflows

### Image Management
**Before adding new photos:**
1. Place full-resolution images in `assets/images/fullsize/{category}/`
2. Run `python generate_thumbnails.py` to create thumbnails and update `assets/js/gallery_data.js`
3. For new categories, run `python rename_images.py` first to standardize naming

**Gallery data structure** (in `assets/js/gallery_data.js`):
```javascript
const galleryData = {
    "category": ["category-1.jpg", "category-2.jpg", ...]
};
```

### Development Setup
- **Local development**: Use Live Server extension or `netlify dev` command
- **No build process**: Edit HTML/CSS/JS directly, changes deploy automatically via Netlify
- **Asset paths**: Use `../assets/` from collection subdirectories, `./assets/` from root

### Page Structure Patterns
**Collection pages** (`collections/*.html`):
- Identical navigation structure with category-specific active states
- Gallery grid with ID `natureGallery`, `urbanGallery`, etc.
- Lightbox functionality handled by `assets/js/gallery.js`

**Navigation consistency**:
- Main nav links: HOME, GALLERY (dropdown), AI CREATIONS (dropdown), STORE, ABOUT, CONTACT
- Dropdown menus must maintain active states across pages
- Mobile hamburger menu with `nav-toggle` class

## Code Patterns & Conventions

### JavaScript Architecture
- **Gallery loading**: `gallery.js` dynamically populates `.gallery-grid` based on page ID
- **Asset path resolution**: Uses `window.ASSET_PATH` or defaults to `'../'`
- **Lightbox system**: Single lightbox instance reused across all galleries

### CSS Organization
- **Custom properties**: Colors, spacing, typography defined in `:root`
- **Component structure**: Navigation, hero, gallery-grid, lightbox, footer
- **Responsive design**: Mobile-first with breakpoints at 576px, 768px, 992px, 1200px

### HTML Patterns
- **Meta tags**: Include Korean descriptions alongside English
- **Image optimization**: Use `loading="lazy"` for gallery images
- **Semantic structure**: Proper heading hierarchy, alt texts for accessibility

## File Dependencies
- `assets/js/gallery_data.js` must be updated when images change
- `assets/css/gallery.css` extends `assets/css/main.css`
- Collection pages share navigation but have unique gallery IDs
- Python scripts modify both filesystem and JavaScript data files

## Deployment Notes
- Netlify serves static files directly from repository root
- All redirects configured in `netlify.toml` to serve `index.html` as SPA fallback
- No environment-specific configurations needed</content>
<parameter name="filePath">c:\soyoungpark-photography\.github\copilot-instructions.md