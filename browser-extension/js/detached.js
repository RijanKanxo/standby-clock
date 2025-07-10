// Apple Standby Clock Extension - Detached Window Script
class DetachedClock {
    constructor() {
        this.themes = [
            'default', 'dark-blue', 'purple', 'green', 'red', 'orange', 'pink',
            'midnight', 'aqua', 'sunset', 'forest', 'ocean', 'neon', 'retro',
            'cyber', 'minimal', 'vintage', 'aurora'
        ];
        this.currentTheme = 'default';
        this.currentThemeIndex = 0;
        this.init();
    }

    init() {
        this.loadThemeFromURL();
        this.setupEventListeners();
        this.startClock();
    }

    setupEventListeners() {
        // Theme cycle button
        document.getElementById('themeCycle').addEventListener('click', () => {
            this.cycleTheme();
        });

        // Close button
        document.getElementById('closeBtn').addEventListener('click', () => {
            this.closeWindow();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case ' ':
                    e.preventDefault();
                    this.cycleTheme();
                    break;
                case 'Escape':
                    this.closeWindow();
                    break;
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
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        };
        const dateString = now.toLocaleDateString('en-US', options);
        document.getElementById('dateDisplay').textContent = dateString + ' ' + ampm;
    }

    loadThemeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const theme = urlParams.get('theme') || 'default';
        this.setTheme(theme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        this.currentThemeIndex = this.themes.indexOf(theme);
        document.body.className = theme !== 'default' ? `theme-${theme}` : '';
        
        // Save theme
        chrome.runtime.sendMessage({ action: 'saveTheme', theme: theme });
    }

    cycleTheme() {
        this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
        const newTheme = this.themes[this.currentThemeIndex];
        this.setTheme(newTheme);
    }

    closeWindow() {
        chrome.runtime.sendMessage({ action: 'closeDetachedWindow' });
        window.close();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DetachedClock();
});
