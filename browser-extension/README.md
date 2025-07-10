# Apple Standby Clock - Browser Extension

A Chrome browser extension that brings Apple's standby clock aesthetic to your browser with floating window support and toolbar time display.

## ✨ Features

- **Compact Popup** - Beautiful mini clock in browser toolbar
- **Dynamic Height** - Popup expands only when needed (320px → 420px)
- **18 Themes** - Same beautiful themes as the web app
- **Detached Window** - Floating always-on-top clock window
- **Toolbar Badge** - Live time display in extension icon
- **Smooth Animations** - Glassmorphic UI with elegant transitions
- **Keyboard Navigation** - Full keyboard support with arrow keys

## 🚀 Installation

### From Chrome Web Store (Recommended)
*[Link will be added when published]*

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top right toggle)
4. Click "Load unpacked" and select the `browser-extension` folder
5. The extension will appear in your toolbar

### Pre-built Package
If you have the `.crx` file:
1. Download `extension.crx`
2. Drag and drop it into Chrome extensions page
3. Click "Add extension" when prompted

## 🎯 Usage

### Popup Interface
- **Click extension icon** - Opens compact popup with mini clock
- **Theme button (🎨)** - Expands popup to show theme selector
- **Detached button (📱)** - Opens floating window
- **Fullsize button (🖥️)** - Opens full web application
- **Toolbar toggle** - Enable/disable time in extension badge

### Keyboard Shortcuts
- `Left/Right Arrow` - Previous/Next theme in popup
- `Space` - Cycle through themes
- `Escape` - Reset to default theme
- `1-9, 0` - Jump to specific themes

### Detached Window
- **Floating clock** - Always visible on screen
- **Auto-positioning** - Opens in top-right corner
- **Theme sync** - Matches your selected theme
- **Compact size** - 380x280px, perfect for corner placement

## 🎨 Theme System

All 18 themes from the web application:
- Classic Black, Dark Blue, Purple, Green, Red, Orange, Pink
- Midnight, Aqua, Sunset, Forest, Ocean, Neon, Retro
- Cyber, Minimal, Vintage, Aurora

Themes sync across:
- Popup interface
- Detached window
- Toolbar badge color
- Full web application (if opened)

## 📱 Interface States

### Compact Mode (Default)
- **Height**: 320px
- **Content**: Mini clock + controls + badge toggle
- **Perfect for**: Quick time check and basic controls

### Expanded Mode (Theme Selection)
- **Height**: 420px (smooth transition)
- **Content**: All compact mode + theme grid
- **Perfect for**: Choosing and previewing themes
4. Look for the time badge next to the extension icon

### Detailed Installation & Troubleshooting:
See **[INSTALLATION.md](INSTALLATION.md)** for complete step-by-step instructions and troubleshooting guide if the time badge doesn't appear.

## How to Use

### Popup Clock
- Click the clock icon in your browser toolbar
- See current time and date in a compact view
- Access theme selector by clicking the 🎨 button

### Detached Floating Window
- Click the 📱 button in the popup
- A separate window opens that can float anywhere on your screen
- Drag the window to position it wherever you want
- Use the 🎨 button to cycle through themes
- Click ✕ to close the window

### Full Website
- Click the 🖥️ button in the popup
- Opens the complete clock website in a new tab

### Keyboard Shortcuts (in detached window)
- **Spacebar**: Cycle through themes
- **Escape**: Close the detached window

## File Structure

```
extension/
├── manifest.json          # Extension configuration
├── popup.html             # Mini clock popup
├── detached.html          # Floating window
├── background.js          # Extension background script
├── css/
│   ├── popup.css         # Popup styles
│   └── detached.css      # Detached window styles
├── js/
│   ├── popup.js          # Popup functionality
│   └── detached.js       # Detached window functionality
└── icons/
    ├── icon-16.png       # Toolbar icon (16x16)
    ├── icon-32.png       # Toolbar icon (32x32)
    ├── icon-48.png       # Extension page icon (48x48)
    └── icon-128.png      # Chrome Web Store icon (128x128)
```

## Permissions

The extension requires minimal permissions:
- **activeTab**: To open the full website in a new tab
- **storage**: To save your theme preferences

## Themes Available

1. **Classic Black** - Traditional black background with white text
2. **Dark Blue** - Deep blue with bright blue accents
3. **Purple** - Dark purple with violet highlights
4. **Green** - Dark green with bright green text
5. **Red** - Dark red with coral accents
6. **Orange** - Dark amber with orange highlights
7. **Pink** - Dark magenta with hot pink text

## Development

To modify the extension:

1. Edit the relevant files in the `extension` folder
2. Go to `chrome://extensions/`
3. Click the refresh icon on the "Apple Standby Clock" extension
4. Test your changes

## Troubleshooting

**Extension doesn't load:**
- Make sure Developer mode is enabled
- Check that all files are in the correct locations
- Look for errors in the browser console

**Detached window doesn't open:**
- Check if popup blockers are disabled
- Ensure the extension has proper permissions

**Icons not showing:**
- Add proper icon files to the `icons` folder
- Update the manifest.json paths if needed

## Icon Requirements

You'll need to add these icon files to the `icons` folder:
- `icon-16.png` (16x16 pixels)
- `icon-32.png` (32x32 pixels)  
- `icon-48.png` (48x48 pixels)
- `icon-128.png` (128x128 pixels)

Create these as simple clock icons with transparent backgrounds.

## License

This extension is part of the Apple Standby Clock project.
