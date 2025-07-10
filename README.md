# Apple Standby Clock - Complete Project

A beautiful, professional clock application inspired by Apple's standby mode, available as both a responsive web application and a Chrome browser extension.

## 🚀 Project Overview

This repository contains two related but separate applications:

### 📱 [Web Application](./web-app/)
- **Responsive web app** that works on all devices
- **Progressive Web App (PWA)** - installable on mobile and desktop
- **18 beautiful themes** with unique typography and colors
- **Enhanced accessibility** with keyboard navigation and ARIA support
- **Modern glassmorphic UI** with smooth animations

### 🔌 [Browser Extension](./browser-extension/)
- **Chrome extension** with compact popup interface
- **Dynamic height popup** that expands only when needed
- **Detached floating window** for always-visible clock
- **Toolbar badge** showing live time
- **Same 18 themes** as web app with sync support

## ✨ Key Features

### Universal Features (Both Apps)
- **18 Stunning Themes**: Classic, Dark Blue, Purple, Green, Red, Orange, Pink, Midnight, Aqua, Sunset, Forest, Ocean, Neon, Retro, Cyber, Minimal, Vintage, Aurora
- **Typography Variety**: Each theme has carefully selected fonts
- **Keyboard Navigation**: Arrow keys, spacebar, number keys, and shortcuts
- **Theme Persistence**: Remembers your preferred theme
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: ARIA labels, screen reader support, motor accessibility

## 🎯 Quick Start

### Web Application
```bash
cd web-app
# Open index.html in browser or use local server
npx http-server . -p 3000
```

### Browser Extension
1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" → select `browser-extension` folder
4. Pin extension to toolbar

## 📁 Project Structure

```
apple-standby-clock/
├── web-app/                 # Web application
│   ├── index.html          # Main page
│   ├── css/styles.css      # All themes and styles
│   ├── js/app.js           # Application logic
│   ├── assets/             # Images and icons
│   ├── manifest.json       # PWA manifest
│   ├── sw.js              # Service worker
│   └── README.md          # Web app documentation
│
├── browser-extension/       # Chrome extension
│   ├── manifest.json       # Extension manifest
│   ├── popup.html          # Popup interface
│   ├── detached.html       # Floating window
│   ├── background.js       # Service worker
│   ├── css/               # Extension styles
│   ├── js/                # Extension logic
│   ├── icons/             # Extension icons
│   └── README.md          # Extension documentation
│
├── documentation/          # Project guides
│   ├── DEPLOYMENT.md      # Deployment instructions
│   ├── TESTING_INSTRUCTIONS.md
│   └── FINAL_FIX_GUIDE.md
│
└── README.md              # This file
```

## 🚀 Deployment

### Web Application
- **Netlify**: Connect GitHub → Deploy automatically
- **Vercel**: Import project → Deploy
- **GitHub Pages**: Enable in settings
- **Any static hosting**: Upload `web-app` folder contents

### Browser Extension
- **Chrome Web Store**: Package and submit for review
- **Enterprise**: Distribute .crx file
- **Development**: Load unpacked in Chrome

## 🤝 Contributing

We welcome contributions! Whether it's:
- 🎨 New themes or visual improvements
- 🐛 Bug fixes and optimizations
- 📱 New platform support
- 📚 Documentation improvements
- 💡 Feature suggestions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repository if you find it useful!**

Made with ❤️ by [Your Name]