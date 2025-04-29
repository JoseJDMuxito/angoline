/**
 * App.js - Main application script
 * Handles app-wide functionality like theme toggle, language selection and common UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {

    // Theme management
    initTheme();

    // Language management
    initLanguage();

    // Modal handlers
    initModals();

    // Event listeners
    addEventListeners();

    // Initialize translations
    if (typeof initTranslations === 'function') {
        initTranslations();
    }
});

/**
 * Initialize theme based on user preference or saved setting
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (savedTheme !== 'light' && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcon(false);
    }
}

/**
 * Update theme toggle icon based on current theme
 * @param {boolean} isDark - Whether dark mode is active
 */
function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    if (isDark) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    updateThemeIcon(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

/**
 * Initialize modals and their functionality
 */
function initModals() {
    // Options modal
    const opcoesModal = document.getElementById('opcoes-modal');
    const settingsModal = document.getElementById('settings-modal');

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === opcoesModal) {
            toggleModal('opcoes-modal', false);
        }

        if (settingsModal && event.target === settingsModal) {
            toggleModal('settings-modal', false);
        }
    });
}

/**
 * Add event listeners for various UI elements
 */
function addEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Options link
    const opcoesLink = document.getElementById('opcoes-link');
    if (opcoesLink) {
        opcoesLink.addEventListener('click', function(e) {
            e.preventDefault();
            toggleModal('opcoes-modal', true);
        });
    }

    // Settings button
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            toggleModal('settings-modal', true);
        });
    }

    // Game settings buttons on homepage
    const settingsBtns = document.querySelectorAll('.settings-btn');
    if (settingsBtns.length > 0) {
        settingsBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const game = this.getAttribute('data-game');
                if (game === 'matematica') {
                    window.location.href = 'matematica.html?settings=open';
                } else if (game === 'morse') {
                    window.location.href = 'morse.html?settings=open';
                }
            });
        });
    }

    // Close modal button
    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            toggleModal('opcoes-modal', false);
        });
    }

    // Settings modal (if exists on page)
    const closeSettings = document.getElementById('close-settings');
    if (closeSettings) {
        closeSettings.addEventListener('click', function() {
            toggleModal('settings-modal', false);
        });
    }

    // Theme select in options modal
    const themeSelect = document.getElementById('theme');
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            const selectedTheme = this.value;

            if (selectedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                updateThemeIcon(true);
                localStorage.setItem('theme', 'dark');
            } else if (selectedTheme === 'light') {
                document.body.classList.remove('dark-mode');
                updateThemeIcon(false);
                localStorage.setItem('theme', 'light');
            } else {
                // Auto - use system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                    document.body.classList.add('dark-mode');
                    updateThemeIcon(true);
                } else {
                    document.body.classList.remove('dark-mode');
                    updateThemeIcon(false);
                }
                localStorage.removeItem('theme');
            }
        });
    }
}

/**
 * Toggle modal visibility
 * @param {string} modalId - ID of the modal to toggle
 * @param {boolean} show - Whether to show or hide the modal
 */
function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (show) {
        modal.classList.add('show');
    } else {
        modal.classList.remove('show');
    }
}

/**
 * Initialize language settings
 */
function initLanguage() {
    const savedLanguage = localStorage.getItem('language');
    const languageSelect = document.getElementById('language');

    if (languageSelect) {
        // Set the select value to match saved language (or default to pt-BR)
        languageSelect.value = savedLanguage || 'pt-BR';

        // Add event listener for language change
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            localStorage.setItem('language', selectedLanguage);

            // Apply translations immediately
            if (typeof initTranslations === 'function') {
                initTranslations();
            } else {
                // If translations.js isn't loaded, refresh the page
                window.location.reload();
            }
        });
    }
}

