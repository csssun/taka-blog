// Modern Blog JavaScript
// ======================

document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle Functionality
    initThemeToggle();

    // Mobile Navigation
    initMobileNavigation();

    // Search Functionality
    initSearch();

    // Smooth Scrolling for Anchor Links
    initSmoothScrolling();

    // Reading Progress Bar
    initReadingProgress();
});

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Get saved theme or default to system preference
    const currentTheme = localStorage.getItem('theme') ||
        (prefersDarkScheme.matches ? 'dark' : 'light');

    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggleIcon(currentTheme);

    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggleIcon(newTheme);
        });
    }

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeToggleIcon(newTheme);
        }
    });
}

function updateThemeToggleIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
}

// Mobile Navigation
function initMobileNavigation() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.nav');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function () {
            nav.classList.toggle('show');
            const isOpen = nav.classList.contains('show');
            mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            mobileToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
                nav.classList.remove('show');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileToggle.setAttribute('aria-label', 'Open menu');
            }
        });
    }
}

// Search Functionality
function initSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('.search-results');
    let searchIndex = null;

    if (!searchInput || !searchResults) return;

    // Load search index
    fetch('/search_index.en.json')
        .then(response => response.json())
        .then(data => {
            searchIndex = data;
        })
        .catch(error => {
            console.warn('Search index not available:', error);
        });

    let searchTimeout;

    searchInput.addEventListener('input', function (e) {
        const query = e.target.value.trim();

        clearTimeout(searchTimeout);

        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }

        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });

    // Close search results when clicking outside
    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });

    function performSearch(query) {
        if (!searchIndex) return;

        const results = searchIndex.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(query.toLowerCase());
            const bodyMatch = item.body.toLowerCase().includes(query.toLowerCase());
            return titleMatch || bodyMatch;
        }).slice(0, 5); // Limit to 5 results

        displaySearchResults(results, query);
    }

    function displaySearchResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(result => {
                const excerpt = getExcerpt(result.body, query);
                return `
                    <div class="search-result" onclick="window.location.href='${result.permalink}'">
                        <div class="result-title">${highlightText(result.title, query)}</div>
                        <div class="result-excerpt">${highlightText(excerpt, query)}</div>
                    </div>
                `;
            }).join('');
        }

        searchResults.classList.add('show');
    }

    function getExcerpt(text, query, maxLength = 150) {
        const queryIndex = text.toLowerCase().indexOf(query.toLowerCase());
        if (queryIndex === -1) {
            return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
        }

        const start = Math.max(0, queryIndex - 50);
        const end = Math.min(text.length, start + maxLength);
        const excerpt = text.substring(start, end);

        return (start > 0 ? '...' : '') + excerpt + (end < text.length ? '...' : '');
    }

    function highlightText(text, query) {
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Reading Progress Bar
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
        z-index: 1000;
        transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Animation on Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Add staggered animation delay to cards
    document.querySelectorAll('.post-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);
