// Apple Standby Clock Extension - Background Script
let timeUpdateInterval = null;

chrome.runtime.onInstalled.addListener(() => {
    console.log('Apple Standby Clock Extension installed');
    
    // Test badge functionality immediately
    chrome.action.setBadgeText({text: '✓'}, () => {
        if (chrome.runtime.lastError) {
            console.error('Badge test failed:', chrome.runtime.lastError);
        } else {
            console.log('Badge test successful');
            // Clear test badge after 2 seconds
            setTimeout(() => {
                chrome.action.setBadgeText({text: ''});
            }, 2000);
        }
    });
    
    // Set default theme
    chrome.storage.sync.set({
        theme: 'default',
        detachedWindowId: null,
        showTimeInBadge: true
    });
    
    // Start showing time in badge if enabled
    setTimeout(() => {
        checkAndStartTimeDisplay();
    }, 3000); // Wait 3 seconds after installation
});

chrome.runtime.onStartup.addListener(() => {
    // Resume time display when browser starts if enabled
    checkAndStartTimeDisplay();
});

// Function to check if badge should be shown and start if enabled
function checkAndStartTimeDisplay() {
    chrome.storage.sync.get(['showTimeInBadge'], (result) => {
        const showBadge = result.showTimeInBadge !== false; // default to true
        if (showBadge) {
            startTimeDisplay();
        } else {
            stopTimeDisplay();
        }
    });
}

// Function to start displaying time in badge
function startTimeDisplay() {
    // Clear any existing interval
    if (timeUpdateInterval) {
        clearInterval(timeUpdateInterval);
    }
    
    // Update time immediately
    updateTimeBadge();
    
    // Update every second
    timeUpdateInterval = setInterval(updateTimeBadge, 1000);
}

// Function to update the badge text with current time
function updateTimeBadge() {
    // Check if badge should be shown
    chrome.storage.sync.get(['showTimeInBadge'], (result) => {
        const showBadge = result.showTimeInBadge !== false; // default to true
        
        if (!showBadge) {
            // Clear badge if disabled
            chrome.action.setBadgeText({ text: '' });
            return;
        }
        
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes();
        
        // Use larger, more visible text - shorter is better for badge display
        let timeString;
        if (minutes === 0) {
            // At top of hour, just show the hour number for maximum size
            timeString = `${hours}`;
        } else if (minutes < 10) {
            // For single digit minutes, use format like "3:5" instead of "3:05"
            timeString = `${hours}:${minutes}`;
        } else {
            // Full format for double-digit minutes
            timeString = `${hours}:${minutes}`;
        }
        
        // Set badge text to show time
        chrome.action.setBadgeText({
            text: timeString
        }, () => {
            if (chrome.runtime.lastError) {
                console.error('Badge text error:', chrome.runtime.lastError);
            }
        });
        
        // Set badge background color based on theme
        chrome.storage.sync.get(['theme'], (themeResult) => {
            const theme = themeResult.theme || 'default';
            let badgeColor = '#dc2626'; // default bright red for high visibility
            
            switch (theme) {
                case 'dark-blue':
                    badgeColor = '#1d4ed8'; // bright blue
                    break;
                case 'purple':
                    badgeColor = '#7c3aed'; // bright purple
                    break;
                case 'green':
                    badgeColor = '#16a34a'; // bright green
                    break;
                case 'red':
                    badgeColor = '#dc2626'; // bright red
                    break;
                case 'orange':
                    badgeColor = '#ea580c'; // bright orange
                    break;
                case 'pink':
                    badgeColor = '#e11d48'; // bright pink
                    break;
                default:
                    badgeColor = '#dc2626'; // bright red for maximum visibility
            }
            
            chrome.action.setBadgeBackgroundColor({
                color: badgeColor
            }, () => {
                if (chrome.runtime.lastError) {
                    console.error('Badge color error:', chrome.runtime.lastError);
                }
            });
            
            // Set badge text color to white for maximum contrast
            chrome.action.setBadgeTextColor({
                color: '#ffffff'
            }, () => {
                if (chrome.runtime.lastError) {
                    console.error('Badge text color error:', chrome.runtime.lastError);
                }
            });
        });
    });
}

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    // This will open the popup automatically
    // No additional action needed as popup is set in manifest
});

// Handle messages from popup and detached windows
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Background received message:', request); // Debug log
    
    try {
        switch (request.action) {
            case 'openDetachedWindow':
                console.log('Opening detached window with theme:', request.theme); // Debug log
                openDetachedWindow(request.theme);
                sendResponse({success: true, message: 'Detached window opened'}); // Send response back
                break;
                
            case 'openFullsizeWindow':
                openFullsizeWindow();
                sendResponse({success: true, message: 'Fullsize window opened'});
                break;
                
            case 'closeDetachedWindow':
                closeDetachedWindow();
                sendResponse({success: true, message: 'Detached window closed'});
                break;
                
            case 'saveTheme':
                chrome.storage.sync.set({ theme: request.theme });
                // Update badge color when theme changes
                updateTimeBadge();
                sendResponse({success: true, message: 'Theme saved'});
                break;
                
            case 'toggleBadge':
                chrome.storage.sync.set({ showTimeInBadge: request.enabled }, () => {
                    if (request.enabled) {
                        startTimeDisplay();
                    } else {
                        stopTimeDisplay();
                    }
                    sendResponse({success: true, message: 'Badge toggled'});
                });
                return true; // Keep message channel open for async response
                
            case 'getTheme':
                chrome.storage.sync.get(['theme'], (result) => {
                    sendResponse({ theme: result.theme || 'default' });
                });
                return true; // Keep message channel open for async response
                
            default:
                sendResponse({success: false, message: 'Unknown action'});
        }
    } catch (error) {
        console.error('Error handling message:', error);
        sendResponse({success: false, message: error.message});
    }
    
    return false; // Close message channel immediately for sync responses
});

// Function to stop displaying time in badge
function stopTimeDisplay() {
    if (timeUpdateInterval) {
        clearInterval(timeUpdateInterval);
        timeUpdateInterval = null;
    }
    
    // Clear badge text
    chrome.action.setBadgeText({
        text: ''
    }, () => {
        if (chrome.runtime.lastError) {
            console.error('Badge clear error:', chrome.runtime.lastError);
        }
    });
}

// Open detached floating window
function openDetachedWindow(theme = 'default') {
    console.log('openDetachedWindow called with theme:', theme); // Debug log
    
    // Close existing detached window if any
    chrome.storage.sync.get(['detachedWindowId'], (result) => {
        console.log('Current detached window ID:', result.detachedWindowId); // Debug log
        
        if (result.detachedWindowId) {
            chrome.windows.remove(result.detachedWindowId, () => {
                console.log('Removed existing detached window'); // Debug log
                createDetachedWindow(theme);
            });
        } else {
            createDetachedWindow(theme);
        }
    });
}

// Create the detached window
function createDetachedWindow(theme) {
    console.log('createDetachedWindow called with theme:', theme); // Debug log
    
    const windowWidth = 380;
    const windowHeight = 280;

    chrome.system.display.getInfo((displays) => {
        console.log('Display info:', displays); // Debug log
        
        const primaryDisplay = displays.find(d => d.isPrimary) || displays[0];
        const screenWidth = primaryDisplay.bounds.width;
        const screenHeight = primaryDisplay.bounds.height;
        const left = screenWidth - windowWidth - 50;
        const top = 50;

        console.log('Creating window at position:', {left, top, width: windowWidth, height: windowHeight}); // Debug log

        chrome.windows.create({
            url: `detached.html?theme=${theme}`,
            type: 'popup',
            width: windowWidth,
            height: windowHeight,
            left: left,
            top: top,
            focused: true,
            state: 'normal'
        }, (window) => {
            if (chrome.runtime.lastError) {
                console.error('Chrome runtime error:', chrome.runtime.lastError); // Debug log
                return;
            }
            
            if (window) {
                console.log('Detached window created successfully:', window.id); // Debug log
                chrome.storage.sync.set({ detachedWindowId: window.id });
                
                // Try to focus the window after creation
                setTimeout(() => {
                    chrome.windows.update(window.id, { focused: true });
                }, 100);
            } else {
                console.error('Failed to create detached window'); // Debug log
            }
        });
    });
}

// Open full-size window
function openFullsizeWindow() {
    chrome.tabs.create({
        url: 'index.html',
        active: true
    });
}

// Close detached window
function closeDetachedWindow() {
    chrome.storage.sync.get(['detachedWindowId'], (result) => {
        if (result.detachedWindowId) {
            chrome.windows.remove(result.detachedWindowId, () => {
                chrome.storage.sync.set({ detachedWindowId: null });
            });
        }
    });
}

// Clean up when window is closed
chrome.windows.onRemoved.addListener((windowId) => {
    chrome.storage.sync.get(['detachedWindowId'], (result) => {
        if (result.detachedWindowId === windowId) {
            chrome.storage.sync.set({ detachedWindowId: null });
        }
    });
});
