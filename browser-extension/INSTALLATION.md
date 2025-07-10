# Apple Standby Clock Extension - Installation & Troubleshooting Guide

## Quick Installation (Chrome/Edge/Brave)

### Step 1: Enable Developer Mode
1. Open your browser
2. Go to `chrome://extensions/` (or `edge://extensions/` for Edge)
3. Toggle **"Developer mode"** in the top-right corner

### Step 2: Install Extension
1. Click **"Load unpacked"**
2. Select the `extension` folder from this project
3. The extension should appear in your extensions list

### Step 3: Pin Extension (CRITICAL!)
1. Click the **puzzle piece icon** 🧩 in your browser toolbar
2. Find **"Apple Standby Clock"** in the dropdown
3. Click the **pin icon** 📌 next to it
4. The extension icon should now be visible in your toolbar

### Step 4: Verify Badge
- You should see a **time badge** (like "3:45") next to the extension icon
- The time should **update every second**
- If you don't see it, follow the troubleshooting steps below

## Troubleshooting Badge Issues

### The time badge is not showing:

#### Solution 1: Check Extension Pinning
- Make sure the extension is **pinned** to the toolbar (see Step 3 above)
- Unpinned extensions may not show badges

#### Solution 2: Check Badge Toggle
1. Click the extension icon to open the popup
2. Look for the "Show time in toolbar" toggle switch
3. Make sure it's **enabled** (switched to the right)

#### Solution 3: Refresh Extension
1. Go to `chrome://extensions/`
2. Find "Apple Standby Clock"
3. Click the **refresh/reload** button 🔄
4. Check if the badge appears

#### Solution 4: Check Console for Errors
1. Right-click anywhere on a webpage
2. Select **"Inspect"** or press **F12**
3. Go to the **Console** tab
4. Look for any red error messages related to the extension
5. Take a screenshot if you see errors

#### Solution 5: Reinstall Extension
1. Go to `chrome://extensions/`
2. Click **"Remove"** on the Apple Standby Clock extension
3. Follow Steps 1-4 above to reinstall

### The badge shows but doesn't update:

#### Solution 1: Check Browser Background
- Make sure your browser is allowed to run in the background
- In Chrome: Settings → Advanced → System → "Continue running background apps when Chrome is closed"

#### Solution 2: Reset Extension
1. Open the popup
2. Toggle the "Show time in toolbar" **off** and **on** again
3. Check if the badge starts updating

### Testing Badge Functionality

#### Manual Test:
1. Open the popup by clicking the extension icon
2. Toggle "Show time in toolbar" **off** - badge should disappear
3. Toggle it **on** - badge should reappear with current time
4. Wait 1 minute - time should update

#### Debug Test:
1. Right-click on a webpage and select "Inspect" (F12)
2. Go to the "Console" tab
3. Copy and paste this code:
```javascript
chrome.runtime.sendMessage({action: 'toggleBadge', enabled: false});
setTimeout(() => {
    chrome.runtime.sendMessage({action: 'toggleBadge', enabled: true});
}, 3000);
```
4. Press Enter - the badge should disappear for 3 seconds then reappear

## Other Features

### Popup Clock
- Click the extension icon to see a mini clock
- Shows current time and date
- Access to theme selector and controls

### Detached Window
- Click the 📱 button in the popup
- Opens a floating clock window
- Can be moved anywhere on your screen

### Themes
- Click the 🎨 button in the popup
- Choose from 7 color themes
- Badge color changes to match the theme

### Full Website
- Click the 🖥️ button in the popup
- Opens the complete clock website
- Full-screen Apple Standby-style clock

## Still Having Issues?

If the badge still doesn't work:

1. **Check browser version**: Make sure you're using a recent version of Chrome/Edge/Brave
2. **Try a different browser**: Test with Chrome if using Edge, or vice versa
3. **Check permissions**: Make sure the browser allows extensions to modify the interface
4. **Restart browser**: Close completely and reopen
5. **Check antivirus**: Some antivirus software blocks extension badges

## Contact & Support

If none of these solutions work, please:
1. Note your browser name and version
2. Take screenshots of any error messages
3. Describe exactly what you see vs. what you expect
4. Share this information for further assistance

The extension should work perfectly once properly installed and pinned!
