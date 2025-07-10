# Testing Instructions for Apple Standby Clock Extension

## Issues Fixed
1. **Popup Height**: Reduced from 500-620px to 420-480px for a more compact appearance
2. **Gap Removal**: Removed extra spacing after badge toggle button
3. **Detached Window**: Added debug logging and error handling for troubleshooting

## How to Test the Extension

### Step 1: Reload the Extension
1. Open Chrome and go to `chrome://extensions/`
2. Find "Apple Standby Clock" extension
3. Click the **Reload** button (circular arrow icon)
4. This is crucial after any code changes!

### Step 2: Test the Popup
1. Click on the extension icon in the Chrome toolbar
2. The popup should now be more compact (shorter height)
3. Check that there's no extra gap after the "Show time in toolbar" toggle

### Step 3: Test the Detached Window
1. Click the 📱 (detach) button in the popup
2. **If it doesn't work:**
   - Right-click on the extension icon → "Inspect popup"
   - Check the Console tab for any error messages
   - Look for debug logs starting with "Opening detached window..."

### Step 4: Check Background Script
1. Go to `chrome://extensions/`
2. Click "service worker" link next to the extension
3. Check the Console for debug messages when clicking the detach button

## Common Issues & Solutions

### Detached Window Not Opening
- **Cause**: Extension might need additional permissions or reload
- **Solution**: 
  1. Reload the extension completely
  2. Check browser console for errors
  3. Ensure popup blockers aren't blocking the window

### Popup Still Too Tall
- **Cause**: CSS cache not updated
- **Solution**: Hard refresh the extension (Ctrl+Shift+R after opening popup)

## What to Look For
✅ **Working correctly:**
- Compact popup (around 420px height)
- No gap after badge toggle
- Detached window opens when clicking 📱 button
- Debug messages in console

❌ **Not working:**
- Popup too tall/short
- Extra spacing
- Detached button does nothing
- Console errors

Let me know what you see in the console logs!
