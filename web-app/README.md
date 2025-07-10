# Apple Standby Clock - Web Application

A beautiful, responsive clock application inspired by Apple's standby mode with modern glassmorphic design.

## ✨ Features

- **18 Beautiful Themes** - Classic, Dark Blue, Purple, Green, Red, Orange, Pink, Midnight, Aqua, Sunset, Forest, Ocean, Neon, Retro, Cyber, Minimal, Vintage, and Aurora
- **Unique Typography** - Each theme has carefully selected fonts for different aesthetics
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **PWA Support** - Install as a progressive web app for native-like experience
- **Keyboard Navigation** - Full keyboard control with arrow keys and shortcuts
- **Enhanced Accessibility** - ARIA labels, screen reader support, and motor accessibility
- **Modern UI** - Glassmorphic design with smooth animations and transitions

## 🚀 Quick Start

### Online Demo
Visit the live demo: [Your deployed URL here]

### Local Development
1. Clone this repository
2. Open `index.html` in your browser
3. Or use a local server:
   ```bash
   npx http-server . -p 3000
   # or
   python -m http.server 3000
   ```

### PWA Installation
1. Open the web app in Chrome/Edge
2. Click the install button in the address bar
3. Or use "Add to Home Screen" on mobile

## 🎨 Theme System

### Available Themes
- **Classic Black** - Pure minimalist design
- **Dark Blue** - Professional corporate look
- **Purple** - Creative and artistic vibe
- **Green** - Natural and calming
- **Red** - Bold and energetic
- **Orange** - Warm and vibrant
- **Pink** - Playful and modern
- **Midnight** - Deep cosmic feeling
- **Aqua** - Fresh and clean
- **Sunset** - Warm evening tones
- **Forest** - Natural green variations
- **Ocean** - Deep blue serenity
- **Neon** - Electric bright colors
- **Retro** - Nostalgic vintage feel
- **Cyber** - Futuristic digital aesthetic
- **Minimal** - Ultra-clean simplicity
- **Vintage** - Classic golden elegance
- **Aurora** - Mystical purple gradients

### Navigation Methods
- **Theme Dropdown** - Click the 🎨 button
- **Theme Dots** - Click colored dots at bottom
- **Arrow Navigation** - Use ← → buttons for easy switching
- **Keyboard Shortcuts**:
  - `Left/Right Arrow` - Previous/Next theme
  - `Space` - Cycle through themes
  - `Escape` - Reset to default theme
  - `1-9, 0` - Jump to specific themes
  - `Ctrl/Cmd + T` - Open theme dropdown

## 📱 Responsive Breakpoints

- **Desktop (1024px+)** - Full theme dots display
- **Tablet (768px-1023px)** - Arrow navigation only
- **Mobile (480px-767px)** - Compact controls
- **Small Mobile (320px-479px)** - Ultra-compact UI

## 🛠️ Technical Details

- **Framework** - Vanilla JavaScript (no dependencies)
- **CSS** - Modern CSS3 with custom properties
- **Fonts** - Google Fonts integration
- **Storage** - localStorage for theme persistence
- **PWA** - Service Worker for offline support
- **Performance** - Optimized animations and efficient rendering

## 🎯 Browser Support

- Chrome 80+
- Firefox 78+
- Safari 13+
- Edge 80+

## 📂 File Structure

```
web-app/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles and themes
├── js/
│   └── app.js          # Main application logic
├── assets/
│   └── images/         # Icons and images
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
└── package.json       # Project metadata
```

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository
2. Build command: (none needed)
3. Publish directory: `web-app`
4. Deploy!

### Vercel
1. Import project from GitHub
2. Framework preset: Other
3. Build command: (none needed)
4. Output directory: `web-app`

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Set source to `web-app` folder
3. Access via `https://username.github.io/repo-name`

## 🎨 Customization

### Adding New Themes
1. Add theme variables in `css/styles.css`
2. Add theme preview in both dropdown and dot selectors
3. Update themes array in `js/app.js`
4. Add theme name in `getThemeDisplayName()` method

### Custom Fonts
1. Import in `index.html` head section
2. Add font-family to theme CSS variables
3. Update theme definitions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

Made with ❤️ by [Your Name]
