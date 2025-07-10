// Apple Standby Clock Extension - Popup Script
class ClockPopup {
    constructor() {
        this.themes = [
            'default', 'dark-blue', 'purple', 'green', 'red', 'orange', 'pink',
            'midnight', 'aqua', 'sunset', 'forest', 'ocean', 'neon', 'retro',
            'cyber', 'minimal', 'vintage', 'aurora'
        ];
        this.currentTheme = 'default';
        this.init();
    }

    init() {
        this.startClock(); // Start clock immediately for fast display
        this.setupEventListeners();
        this.loadTheme(); // Load theme after basic functionality
        this.loadBadgeToggleState(); // Load badge toggle state
    }

    setupEventListeners() {
        // Theme button
        document.getElementById('themeBtn').addEventListener('click', () => {
            this.toggleThemeSelector();
        });

        // Detach button
        document.getElementById('detachBtn').addEventListener('click', () => {
            this.openDetachedWindow();
        });

        // Fullsize button
        document.getElementById('fullsizeBtn').addEventListener('click', () => {
            this.openFullsizeWindow();
        });

        // Badge toggle
        document.getElementById('badgeToggle').addEventListener('change', (e) => {
            this.toggleBadgeDisplay(e.target.checked);
        });

        // Theme options
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.setTheme(theme);
                this.hideThemeSelector();
            });
        });

        // Close theme selector when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.theme-selector') && !e.target.closest('.theme-btn')) {
                this.hideThemeSelector();
            }
        });
    }

    startClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes();
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');

        // Update date
        const options = { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateString = now.toLocaleDateString('en-US', options);
        document.getElementById('dateDisplay').textContent = dateString + ' ' + ampm;
    }

    loadTheme() {
        // Load theme directly from storage to prevent flickering
        chrome.storage.sync.get(['theme'], (result) => {
            const savedTheme = result.theme || 'default';
            this.setTheme(savedTheme);
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.body.className = `theme-${theme}`;
        
        // Highlight active theme
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.theme === theme);
        });
        
        // Save theme
        chrome.runtime.sendMessage({ action: 'saveTheme', theme: theme });
    }

    toggleThemeSelector() {
        const selector = document.getElementById('themeSelector');
        const isShowing = selector.classList.toggle('show');
        
        // Toggle body class for height animation
        if (isShowing) {
            document.body.classList.add('theme-selector-expanded');
        } else {
            document.body.classList.remove('theme-selector-expanded');
        }
    }

    hideThemeSelector() {
        const selector = document.getElementById('themeSelector');
        selector.classList.remove('show');
        
        // Remove body class to collapse height
        document.body.classList.remove('theme-selector-expanded');
    }

    openDetachedWindow() {
        console.log('Opening detached window with theme:', this.currentTheme);
        
        try {
            chrome.runtime.sendMessage({ 
                action: 'openDetachedWindow', 
                theme: this.currentTheme 
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Message error:', chrome.runtime.lastError.message);
                    return;
                }
                console.log('Message sent successfully:', response);
                // Close popup after successful response
                window.close();
            });
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }

    openFullsizeWindow() {
        chrome.runtime.sendMessage({ action: 'openFullsizeWindow' });
        window.close();
    }

    toggleBadgeDisplay(enabled) {
        chrome.runtime.sendMessage({ 
            action: 'toggleBadge', 
            enabled: enabled 
        });
        
        chrome.storage.sync.set({ showTimeInBadge: enabled });
    }

    loadBadgeToggleState() {
        chrome.storage.sync.get(['showTimeInBadge'], (result) => {
            const enabled = result.showTimeInBadge !== false; // default to true
            document.getElementById('badgeToggle').checked = enabled;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ClockPopup();
});
