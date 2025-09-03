/**
 * Hub Common JavaScript Module
 * Path: /assets/js/hub-common.js
 * Purpose: Shared functionality for all hub pages
 * Version: 1.0.1 - Updated with working search
 */

class HubCommon {
    constructor(config = {}) {
        this.config = {
            animateStats: true,
            enableSearch: true,
            enableFilters: true,
            enableSmoothScroll: true,
            enableScrollEffects: true,
            ...config
        };
        
        this.init();
    }

    init() {
        // Initialize all features based on config
        if (this.config.enableScrollEffects) this.initScrollEffects();
        if (this.config.enableSmoothScroll) this.initSmoothScroll();
        if (this.config.animateStats) this.initStatsAnimation();
        if (this.config.enableFilters) this.initFilters();
        if (this.config.enableSearch) this.initSearch();
        
        // Always initialize these
        this.initMobileMenu();
        this.initAccessibility();
    }

    /**
     * Initialize scroll effects for navigation
     */
    initScrollEffects() {
        const nav = document.getElementById('main-nav');
        if (!nav) return;

        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    /**
     * Initialize smooth scrolling for anchor links
     */
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = 100; // Account for fixed nav
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Initialize stats animation
     */
    initStatsAnimation() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('[data-target]');
                    statNumbers.forEach(stat => this.animateStat(stat));
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe hero sections with stats
        const heroSections = document.querySelectorAll('.hero-stats');
        heroSections.forEach(section => observer.observe(section));
        
        // Also observe progress sections
        const progressSections = document.querySelectorAll('.progress-section');
        progressSections.forEach(section => observer.observe(section));
    }

    /**
     * Animate a single stat number
     */
    animateStat(element) {
        const target = parseInt(element.dataset.target);
        if (isNaN(target)) return;
        
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;
        
        const timer = setInterval(() => {
            current += increment;
            step++;
            
            if (step >= steps) {
                element.textContent = target + (element.dataset.suffix || '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.dataset.suffix || '');
            }
        }, duration / steps);
    }

    /**
     * Initialize filter functionality
     */
    initFilters() {
        const filterButtons = document.querySelectorAll('.filter-button');
        if (filterButtons.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                this.filterItems(filter);
                
                // Trigger custom event
                document.dispatchEvent(new CustomEvent('hubFilterChange', {
                    detail: { filter }
                }));
            });
        });
    }

    /**
     * Filter items based on category
     */
    filterItems(filter) {
        const items = document.querySelectorAll('[data-category]');
        
        items.forEach(item => {
            if (filter === 'all') {
                item.style.display = '';
                this.fadeIn(item);
            } else {
                const categories = item.dataset.category?.split(' ') || [];
                if (categories.includes(filter)) {
                    item.style.display = '';
                    this.fadeIn(item);
                } else {
                    this.fadeOut(item).then(() => {
                        item.style.display = 'none';
                    });
                }
            }
        });
    }

    /**
     * Initialize search functionality
     */
    initSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.querySelector('.search-button');
        
        if (!searchInput) return;
        
        // Search on button click
        searchButton?.addEventListener('click', () => this.performSearch());
        
        // Search on enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch();
            }
        });
        
        // Live search with debounce
        let debounceTimer;
        searchInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => this.performSearch(), 300);
        });
        
        // Initialize clear button functionality
        this.initSearchClear();
    }

    /**
     * Initialize search clear button
     */
    initSearchClear() {
        const clearButton = document.getElementById('clearSearch');
        const searchInput = document.getElementById('searchInput');
        const resultsDiv = document.getElementById('searchResults');
        const resultsCount = document.getElementById('searchResultsCount');
        
        if (clearButton && searchInput) {
            clearButton.addEventListener('click', () => {
                searchInput.value = '';
                clearButton.style.display = 'none';
                if (resultsDiv) resultsDiv.innerHTML = '';
                if (resultsCount) resultsCount.style.display = 'none';
                searchInput.focus();
            });
        }
    }

    /**
     * Perform search - UPDATED VERSION
     */
    async performSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput?.value.toLowerCase().trim() || '';
        const resultsDiv = document.getElementById('searchResults');
        const resultsCount = document.getElementById('searchResultsCount');
        const clearButton = document.getElementById('clearSearch');
        
        // Show/hide clear button
        if (clearButton) {
            clearButton.style.display = searchTerm ? 'flex' : 'none';
        }
        
        if (!searchTerm) {
            if (resultsDiv) resultsDiv.innerHTML = '';
            if (resultsCount) resultsCount.style.display = 'none';
            return;
        }
        
        // Show loading state
        if (resultsDiv) {
            resultsDiv.innerHTML = '<div class="search-loading"></div>';
        }
        
        try {
            let matches = [];
            
            // Check if we have the hub instance with loader
            if (window.hub && window.hub.loader) {
                // Search through all loaded character data
                const allCharacters = await window.hub.loader.searchCharacters(searchTerm);
                matches = allCharacters;
                
                // Display character results
                this.displayCharacterResults(matches, searchTerm, resultsDiv, resultsCount);
            } else {
                // Fallback: Search DOM elements (current page only)
                const searchableItems = document.querySelectorAll('.study-card, .character-card, .featured-card');
                
                searchableItems.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        matches.push({
                            element: item.cloneNode(true),
                            relevance: this.calculateRelevance(text, searchTerm)
                        });
                    }
                });
                
                // Sort by relevance
                matches.sort((a, b) => b.relevance - a.relevance);
                
                // Display DOM results
                this.displaySearchResults(matches, searchTerm, resultsDiv);
            }
            
        } catch (error) {
            console.error('Search error:', error);
            if (resultsDiv) {
                resultsDiv.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">⚠️</div>
                        <div class="empty-state-text">Search Error</div>
                        <div class="empty-state-subtext">Please try again</div>
                    </div>
                `;
            }
        }
    }

    /**
     * Display character search results
     */
    displayCharacterResults(characters, searchTerm, resultsDiv, resultsCount) {
        if (!resultsDiv) return;
        
        if (characters.length > 0) {
            // Update count
            if (resultsCount) {
                resultsCount.querySelector('.results-number').textContent = characters.length;
                resultsCount.style.display = 'block';
            }
            
            // Build results HTML
            let html = `
                <div class="section-header">
                    <h3 class="section-title">Search Results</h3>
                    <p class="section-subtitle">${characters.length} result${characters.length !== 1 ? 's' : ''} for "${searchTerm}"</p>
                </div>
                <div class="studies-list cards-grid">
            `;
            
            characters.forEach(char => {
                const bookId = char.book?.id || 'unknown';
                const profilePath = char.profilePath || `#`;
                const hebrewText = char.hebrew ? `<span class="hebrew">${char.hebrew}</span>` : '';
                const tags = (char.tags || []).map(tag => {
                    const tagClass = tag.toLowerCase().includes('unnamed') ? 'group' : '';
                    return `<span class="tag ${tagClass}">${tag}</span>`;
                }).join('');
                const references = Array.isArray(char.references) ? char.references.join(', ') : '';
                
                html += `
                    <article class="study-card">
                        <a href="${profilePath}" class="study-card-link">
                            <div class="study-card-header">
                                <h4 class="study-card-title">
                                    ${char.name} ${hebrewText}
                                </h4>
                                <div class="study-card-tags">${tags}</div>
                            </div>
                            <div class="study-card-body">
                                <p class="study-card-meta">${char.meaning || ''} • ${references}</p>
                                <p class="study-card-desc">${char.summary || ''}</p>
                                <p class="study-card-meta" style="margin-top: 0.5rem;">
                                    <strong>Book:</strong> ${char.book?.name || 'Unknown'}
                                </p>
                            </div>
                            <div class="study-card-arrow">
                                <svg viewBox="0 0 24 24">
                                    <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/>
                                </svg>
                            </div>
                        </a>
                    </article>
                `;
            });
            
            html += '</div>';
            resultsDiv.innerHTML = html;
            
        } else {
            // No results
            if (resultsCount) resultsCount.style.display = 'none';
            
            resultsDiv.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <div class="empty-state-text">No Results Found</div>
                    <div class="empty-state-subtext">Try searching for different keywords</div>
                </div>
            `;
        }
    }

    /**
     * Calculate search relevance score
     */
    calculateRelevance(text, searchTerm) {
        let score = 0;
        const lowerText = text.toLowerCase();
        const lowerSearch = searchTerm.toLowerCase();
        
        // Exact match
        if (lowerText === lowerSearch) score += 100;
        
        // Starts with search term
        if (lowerText.startsWith(lowerSearch)) score += 50;
        
        // Contains search term
        if (lowerText.includes(lowerSearch)) score += 25;
        
        // Word boundary match
        const regex = new RegExp(`\\b${lowerSearch}\\b`, 'i');
        if (regex.test(text)) score += 30;
        
        return score;
    }

    /**
     * Display search results (DOM fallback)
     */
    displaySearchResults(matches, searchTerm, resultsDiv) {
        if (!resultsDiv) return;
        
        if (matches.length > 0) {
            resultsDiv.innerHTML = `
                <div class="section-header">
                    <h3 class="section-title">Search Results</h3>
                    <p class="section-subtitle">${matches.length} results found for "${searchTerm}"</p>
                </div>
                <div class="studies-list">
                    ${matches.slice(0, 20).map(match => match.element.outerHTML).join('')}
                </div>
            `;
        } else {
            resultsDiv.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <div class="empty-state-text">No Results Found</div>
                    <div class="empty-state-subtext">Try searching for different keywords</div>
                </div>
            `;
        }
        
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Initialize mobile menu (complement to mobile-menu.js)
     */
    initMobileMenu() {
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const nav = document.getElementById('main-nav');
            const toggle = document.querySelector('.mobile-menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            if (!nav?.contains(e.target) && toggle?.classList.contains('active')) {
                toggle.classList.remove('active');
                navLinks?.classList.remove('active');
            }
        });
    }

    /**
     * Initialize accessibility features
     */
    initAccessibility() {
        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Escape key to close modals/menus
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu
                const toggle = document.querySelector('.mobile-menu-toggle');
                const navLinks = document.querySelector('.nav-links');
                if (toggle?.classList.contains('active')) {
                    toggle.classList.remove('active');
                    navLinks?.classList.remove('active');
                }
                
                // Trigger custom event for other components
                document.dispatchEvent(new CustomEvent('escapePressed'));
            }
        });
        
        // Focus management for dropdowns
        this.initDropdownAccessibility();
    }

    /**
     * Initialize dropdown keyboard navigation
     */
    initDropdownAccessibility() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const content = dropdown.querySelector('.dropdown-content');
            const links = content?.querySelectorAll('a');
            
            if (!toggle || !content || !links) return;
            
            // Keyboard navigation
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const isOpen = content.style.display === 'block';
                    content.style.display = isOpen ? 'none' : 'block';
                    
                    if (!isOpen && links.length > 0) {
                        links[0].focus();
                    }
                }
            });
            
            // Arrow key navigation within dropdown
            links.forEach((link, index) => {
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const nextLink = links[index + 1] || links[0];
                        nextLink.focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prevLink = links[index - 1] || links[links.length - 1];
                        prevLink.focus();
                    } else if (e.key === 'Escape') {
                        content.style.display = 'none';
                        toggle.focus();
                    }
                });
            });
        });
    }

    /**
     * Utility: Fade in element
     */
    fadeIn(element, duration = 300) {
        return new Promise((resolve) => {
            element.style.opacity = '0';
            element.style.transition = `opacity ${duration}ms ease`;
            
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                setTimeout(resolve, duration);
            });
        });
    }

    /**
     * Utility: Fade out element
     */
    fadeOut(element, duration = 300) {
        return new Promise((resolve) => {
            element.style.transition = `opacity ${duration}ms ease`;
            element.style.opacity = '0';
            setTimeout(resolve, duration);
        });
    }

    /**
     * Utility: Debounce function
     */
    debounce(func, wait) {
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

    /**
     * Utility: Throttle function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.hubCommon = new HubCommon();
    });
} else {
    window.hubCommon = new HubCommon();
}

// Export for ES6 modules
export default HubCommon;