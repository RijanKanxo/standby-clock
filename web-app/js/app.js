/**
 * Apple Standby Clock Application
 * Professional JavaScript Module
 * 
 * Features:
 * - Real-time clock display with 12-hour format
 * - Multiple color themes with smooth transitions
 * - Local storage for theme persistence
 * - Keyboard shortcuts and accessibility
 * - Responsive design support
 */

class AppleStandbyClock {
    constructor() {
        this.themes = [
            'default', 'dark-blue', 'purple', 'green', 'red', 'orange', 'pink',
            'midnight', 'aqua', 'sunset', 'forest', 'ocean', 'neon', 'retro',
            'cyber', 'minimal', 'vintage', 'aurora'
        ];
        this.currentThemeIndex = 0;
        this.clockUpdateInterval = null;
        
        this.init();
    }

    /**
     * Initialize the clock application
     */
    init() {
        this.setupEventListeners();
        this.startClock();
        this.loadSavedTheme();
        this.setupAccessibility();
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Theme toggle button
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown();
            });
        }

        // Theme dropdown items
        document.querySelectorAll('.theme-dropdown-item').forEach(item => {
            const theme = item.dataset.theme;
            if (theme) {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.setTheme(theme);
                    this.hideDropdown();
                });
            }
        });

        // Theme dots
        document.querySelectorAll('.theme-dot').forEach(dot => {
            const theme = Array.from(dot.classList).find(cls => 
                cls !== 'theme-dot' && cls !== 'active'
            );
            if (theme) {
                dot.addEventListener('click', () => this.setTheme(theme));
            }
        });

        // Navigation arrows
        const prevBtn = document.querySelector('.theme-prev');
        const nextBtn = document.querySelector('.theme-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateTheme(-1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateTheme(1));
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const themeToggle = document.querySelector('.theme-toggle');
            const dropdown = document.getElementById('themeDropdown');
            
            // Don't close if clicking on theme toggle button or dropdown
            if (themeToggle && dropdown && 
                !themeToggle.contains(e.target) && 
                !dropdown.contains(e.target)) {
                this.hideDropdown();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Screen wake animation (excluding theme controls)
        document.addEventListener('click', (e) => this.handleScreenWake(e));

        // Visibility change (for battery optimization)
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    }

    /**
     * Start the clock and update every second
     */
    startClock() {
        this.updateClock(); // Initial update
        this.clockUpdateInterval = setInterval(() => this.updateClock(), 1000);
    }

    /**
     * Stop the clock updates
     */
    stopClock() {
        if (this.clockUpdateInterval) {
            clearInterval(this.clockUpdateInterval);
            this.clockUpdateInterval = null;
        }
    }

    /**
     * Update the clock display
     */
    updateClock() {
        const now = new Date();
        const timeString = this.formatTime(now);
        const dateString = this.formatDate(now);

        this.updateTimeDisplay(timeString);
        this.updateDateDisplay(dateString);
    }

    /**
     * Format time to 12-hour format
     * @param {Date} date - Date object to format
     * @returns {Object} Formatted time object
     */
    formatTime(date) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        
        // Convert to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
        
        return {
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            ampm: ampm
        };
    }

    /**
     * Format date for display
     * @param {Date} date - Date object to format
     * @returns {string} Formatted date string
     */
    formatDate(date) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }

    /**
     * Update the time display elements
     * @param {Object} timeObj - Time object with hours and minutes
     */
    updateTimeDisplay(timeObj) {
        const timeParts = document.querySelectorAll('.time-part');
        if (timeParts.length >= 2) {
            timeParts[0].textContent = timeObj.hours;
            timeParts[1].textContent = timeObj.minutes;
        }
    }

    /**
     * Update the date display element
     * @param {string} dateString - Formatted date string
     */
    updateDateDisplay(dateString) {
        const dateElement = document.querySelector('.current-date');
        if (dateElement) {
            dateElement.textContent = dateString;
        }
    }

    /**
     * Set a specific theme
     * @param {string} themeName - Name of the theme to set
     */
    setTheme(themeName) {
        if (!this.themes.includes(themeName)) {
            console.warn(`Theme "${themeName}" not found`);
            return;
        }

        // Remove all theme classes
        document.body.className = '';
        
        // Add new theme class if not default
        if (themeName !== 'default') {
            document.body.classList.add(`theme-${themeName}`);
        }
        
        // Update active indicator
        this.updateThemeIndicator(themeName);
        this.updateDropdownIndicator(themeName);
        
        // Update current theme index
        this.currentThemeIndex = this.themes.indexOf(themeName);
        
        // Save theme to storage
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.set({ theme: themeName });
        } else {
            localStorage.setItem('theme', themeName);
        }
        // Highlight active theme dot
        document.querySelectorAll('.theme-dot').forEach(dot => {
            dot.classList.toggle('active', dot.dataset.theme === theme);
        });
    }

    /**
     * Toggle dropdown menu visibility
     */
    toggleDropdown() {
        const dropdown = document.getElementById('themeDropdown');
        const button = document.querySelector('.theme-toggle');
        
        if (dropdown && button) {
            const isOpen = dropdown.classList.contains('show');
            
            if (isOpen) {
                this.hideDropdown();
            } else {
                this.showDropdown();
            }
        }
    }

    /**
     * Show dropdown menu
     */
    showDropdown() {
        const dropdown = document.getElementById('themeDropdown');
        const button = document.querySelector('.theme-toggle');
        
        if (dropdown && button) {
            dropdown.classList.add('show');
            button.classList.add('active');
            
            // Update dropdown active state
            this.updateDropdownIndicator(this.getCurrentTheme());
        }
    }

    /**
     * Hide dropdown menu
     */
    hideDropdown() {
        const dropdown = document.getElementById('themeDropdown');
        const button = document.querySelector('.theme-toggle');
        
        if (dropdown && button) {
            dropdown.classList.remove('show');
            button.classList.remove('active');
        }
    }

    /**
     * Update dropdown active indicator
     * @param {string} activeTheme - Currently active theme name
     */
    updateDropdownIndicator(activeTheme) {
        document.querySelectorAll('.theme-dropdown-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.theme === activeTheme) {
                item.classList.add('active');
            }
        });
    }

    /**
     * Cycle to the next theme
     */
    cycleTheme() {
        this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
        this.setTheme(this.themes[this.currentThemeIndex]);
    }

    /**
     * Update the theme indicator dots and current theme display
     * @param {string} activeTheme - Currently active theme name
     */
    updateThemeIndicator(activeTheme) {
        // Update theme dots
        document.querySelectorAll('.theme-dot').forEach(dot => {
            dot.classList.remove('active');
        });
        
        const activeDot = document.querySelector(`.theme-dot.${activeTheme}`);
        if (activeDot) {
            activeDot.classList.add('active');
        }
        
        // Update current theme display
        const currentThemeDot = document.getElementById('currentThemeDot');
        const currentThemeName = document.getElementById('currentThemeName');
        
        if (currentThemeDot) {
            // Remove all theme classes
            currentThemeDot.classList.remove(...this.themes);
            // Add the current theme class
            currentThemeDot.classList.add(activeTheme);
        }
        
        if (currentThemeName) {
            currentThemeName.textContent = this.getThemeDisplayName(activeTheme);
        }
    }

    /**
     * Save theme to localStorage
     * @param {string} themeName - Theme name to save
     */
    saveTheme(themeName) {
        try {
            localStorage.setItem('appleStandbyClockTheme', themeName);
        } catch (error) {
            console.warn('Failed to save theme to localStorage:', error);
        }
    }

    /**
     * Load saved theme from localStorage
     */
    loadSavedTheme() {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
            chrome.storage.sync.get(['theme'], (result) => {
                const theme = result.theme || 'default';
                this.setTheme(theme);
            });
        } else {
            const theme = localStorage.getItem('theme') || 'default';
            this.setTheme(theme);
        }
    }

    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeydown(event) {
        switch (event.code) {
            case 'Space':
                event.preventDefault();
                this.cycleTheme();
                this.hideDropdown();
                break;
                
            case 'Escape':
                this.setTheme('default');
                this.hideDropdown();
                break;

            case 'ArrowLeft':
                event.preventDefault();
                this.navigateTheme(-1);
                this.hideDropdown();
                break;
                
            case 'ArrowRight':
                event.preventDefault();
                this.navigateTheme(1);
                this.hideDropdown();
                break;

            case 'KeyT':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    this.toggleDropdown();
                }
                break;
                
            default:
                // Handle number keys (1-9, 0 for 10th theme, etc.)
                if (event.code.startsWith('Digit')) {
                    const digit = parseInt(event.code.replace('Digit', ''));
                    const themeIndex = digit === 0 ? 9 : digit - 1; // 0 key maps to 10th theme
                    if (themeIndex >= 0 && themeIndex < this.themes.length) {
                        event.preventDefault();
                        this.setTheme(this.themes[themeIndex]);
                        this.hideDropdown();
                    }
                }
                break;
        }
    }

    /**
     * Handle screen wake animation
     * @param {Event} event - Click event
     */
    handleScreenWake(event) {
        // Skip animation if clicking on theme controls
        if (event.target.closest('.theme-toggle') || 
            event.target.closest('.theme-indicator') ||
            event.target.closest('.theme-dropdown')) {
            return;
        }

        // Trigger subtle wake animation
        document.body.style.animation = 'none';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 100);
    }

    /**
     * Handle visibility change for battery optimization
     */
    handleVisibilityChange() {
        if (document.hidden) {
            this.stopClock();
        } else {
            this.startClock();
        }
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add ARIA labels
        const clock = document.getElementById('clock');
        if (clock) {
            clock.setAttribute('role', 'timer');
            clock.setAttribute('aria-live', 'polite');
            clock.setAttribute('aria-label', 'Current time');
        }

        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 'Cycle through color themes');
        }

        // Add tooltips to theme dots
        document.querySelectorAll('.theme-dot').forEach(dot => {
            const theme = Array.from(dot.classList).find(cls => 
                cls !== 'theme-dot' && cls !== 'active'
            );
            if (theme) {
                const themeName = this.getThemeDisplayName(theme);
                dot.setAttribute('aria-label', `Switch to ${themeName} theme`);
                dot.setAttribute('role', 'button');
                dot.setAttribute('tabindex', '0');
                
                // Add keyboard support for theme dots
                dot.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.setTheme(theme);
                    }
                });
            }
        });
    }

    /**
     * Navigate to next/previous theme using arrow buttons
     * @param {number} direction - 1 for next, -1 for previous
     */
    navigateTheme(direction) {
        const currentIndex = this.currentThemeIndex;
        let newIndex = currentIndex + direction;
        
        // Wrap around if at beginning or end
        if (newIndex >= this.themes.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = this.themes.length - 1;
        }
        
        const newTheme = this.themes[newIndex];
        this.setTheme(newTheme);
    }

    /**
     * Get theme display name
     * @param {string} themeName - Theme name
     * @returns {string} - Display name for the theme
     */
    getThemeDisplayName(themeName) {
        const themeNames = {
            'default': 'Classic Black',
            'dark-blue': 'Dark Blue',
            'purple': 'Purple',
            'green': 'Green',
            'red': 'Red',
            'orange': 'Orange',
            'pink': 'Pink',
            'midnight': 'Midnight',
            'aqua': 'Aqua',
            'sunset': 'Sunset',
            'forest': 'Forest',
            'ocean': 'Ocean',
            'neon': 'Neon',
            'retro': 'Retro',
            'cyber': 'Cyber',
            'minimal': 'Minimal',
            'vintage': 'Vintage',
            'aurora': 'Aurora'
        };
        return themeNames[themeName] || themeName;
    }

    /**
     * Dispatch custom theme change event
     * @param {string} themeName - New theme name
     */
    dispatchThemeChangeEvent(themeName) {
        const event = new CustomEvent('themechange', {
            detail: { 
                theme: themeName,
                displayName: this.getThemeDisplayName(themeName)
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Get current theme
     * @returns {string} Current theme name
     */
    getCurrentTheme() {
        return this.themes[this.currentThemeIndex];
    }

    /**
     * Destroy the clock instance (cleanup)
     */
    destroy() {
        this.stopClock();
        
        // Remove event listeners
        document.removeEventListener('keydown', this.handleKeydown);
        document.removeEventListener('click', this.handleScreenWake);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
}

// Initialize the clock when DOM is loaded

// Initialize the clock when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    window.appleStandbyClock = new AppleStandbyClock();
    
    // Legacy function support for HTML onclick handlers
    window.setTheme = (themeName) => window.appleStandbyClock.setTheme(themeName);
    window.cycleTheme = () => window.appleStandbyClock.cycleTheme();
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
