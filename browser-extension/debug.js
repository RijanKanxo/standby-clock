// Debug script for Apple Standby Clock Extension
// Run this in the browser console (F12) to check extension status

console.log('=== Apple Standby Clock Extension Debug ===');

// Check if extension context is available
if (typeof chrome !== 'undefined' && chrome.runtime) {
    console.log('✅ Extension context available');
    
    // Check extension ID
    console.log('Extension ID:', chrome.runtime.id);
    
    // Check badge API
    if (chrome.action && chrome.action.setBadgeText) {
        console.log('✅ Badge API available');
        
        // Test badge
        chrome.action.setBadgeText({text: 'TEST'});
        console.log('Test badge set to "TEST"');
        
        setTimeout(() => {
            chrome.action.setBadgeText({text: ''});
            console.log('Test badge cleared');
        }, 2000);
    } else {
        console.log('❌ Badge API not available');
    }
    
    // Check storage
    if (chrome.storage && chrome.storage.sync) {
        console.log('✅ Storage API available');
        
        chrome.storage.sync.get(['showTimeInBadge', 'theme'], (result) => {
            console.log('Storage data:', result);
        });
    } else {
        console.log('❌ Storage API not available');
    }
    
    // Send test message to background
    chrome.runtime.sendMessage({action: 'getTheme'}, (response) => {
        if (response) {
            console.log('✅ Background script responding');
            console.log('Current theme:', response.theme);
        } else {
            console.log('❌ Background script not responding');
        }
    });
    
} else {
    console.log('❌ Extension context not available');
    console.log('This script needs to run in extension context');
}

// Function to test badge toggle
function testBadgeToggle() {
    console.log('Testing badge toggle...');
    
    if (typeof chrome !== 'undefined' && chrome.runtime) {
        // Disable badge
        chrome.runtime.sendMessage({action: 'toggleBadge', enabled: false});
        console.log('Badge disabled');
        
        setTimeout(() => {
            // Enable badge
            chrome.runtime.sendMessage({action: 'toggleBadge', enabled: true});
            console.log('Badge enabled');
        }, 3000);
    }
}

// Function to test theme change
function testThemeChange() {
    console.log('Testing theme change...');
    
    if (typeof chrome !== 'undefined' && chrome.runtime) {
        const themes = ['default', 'dark-blue', 'purple', 'green'];
        let currentIndex = 0;
        
        const cycleThemes = () => {
            const theme = themes[currentIndex];
            chrome.runtime.sendMessage({action: 'saveTheme', theme: theme});
            console.log(`Theme changed to: ${theme}`);
            
            currentIndex = (currentIndex + 1) % themes.length;
            
            if (currentIndex > 0) {
                setTimeout(cycleThemes, 2000);
            }
        };
        
        cycleThemes();
    }
}

// Export test functions
window.testBadgeToggle = testBadgeToggle;
window.testThemeChange = testThemeChange;

console.log('Debug complete. Run testBadgeToggle() or testThemeChange() to test functionality');
