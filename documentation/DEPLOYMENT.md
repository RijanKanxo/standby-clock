# 🚀 Deployment Guide

## Web Application Deployment

### Option 1: Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder to Netlify
3. Your site will be live instantly!

### Option 2: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Deploy automatically

### Option 3: GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source branch (main/master)
4. Your site will be available at `username.github.io/repository-name`

### Option 4: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Browser Extension Deployment

### For Personal Use
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select the `extension` folder
5. The extension is now installed!

### For Chrome Web Store
1. Zip the `extension` folder
2. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
3. Pay one-time $5 developer fee
4. Upload your zip file
5. Fill out store listing information
6. Submit for review

## Pre-Deployment Checklist

- [ ] Test all 18 themes work correctly
- [ ] Verify extension popup functions
- [ ] Test detached window opens properly
- [ ] Check badge display works
- [ ] Ensure theme persistence works
- [ ] Test responsive design on mobile
- [ ] Verify keyboard shortcuts work
- [ ] Check PWA installation works
- [ ] Test offline functionality

## File Structure for Deployment

Make sure your final structure looks like this:

```
apple-standby-clock/
├── index.html
├── css/styles.css
├── js/app.js
├── extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── detached.html
│   ├── background.js
│   ├── css/
│   └── js/
├── assets/
├── sw.js
├── manifest.json
├── package.json
└── README.md
```

## Environment Configuration

No environment variables or build process required - this is a pure static site!

## Performance Tips

- All fonts are loaded from Google Fonts CDN
- CSS and JS are minified in production
- Service worker provides offline caching
- Extension loads instantly with optimized code

---

**Your Apple Standby Clock is ready to deploy! 🚀**
