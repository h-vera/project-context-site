/**
 * Enhanced Search Module with Progress Tracking
 * Path: /assets/js/search-module.js
 * Version: 2.0.0
 * Features: Unified search, progress tracking, advanced filtering, keyboard navigation
 */

class EnhancedSearchModule {
    constructor(options = {}) {
        this.config = {
            maxRetries: 3,
            retryDelay: 1000,
            cacheLimit: 50, // Max cached books
            debounceDelay: 300,
            ...options
        };
        
        // State management
        this.cache = new Map();
        this.searchHistory = [];
        this.currentQuery = '';
        this.isSearching = false;
        this.loader = null;
        
        // Progress tracking
        this.progress = this.loadProgress();
        
        // Initialize
        this.init();
    }

    async init() {
        // Wait for DOM ready
        if (document.readyState === 'loading') {
            await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
        }
        
        // Initialize character loader if available
        if (window.hub?.loader) {
            this.loader = window.hub.loader;
        } else {
            console.warn('Character loader not available, using fallback search');
        }
        
        // Setup UI elements
        this.setupSearchUI();
        this.setupKeyboardShortcuts();
        this.setupProgressUI();
        this.setupFilters();
        
        // Load user preferences
        this.loadUserPreferences();
    }

    /**
     * Setup unified search UI
     */
    setupSearchUI() {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const clearButton = document.getElementById('clearSearch');
        
        if (!searchInput) return;
        
        // Debounced search handler
        const debouncedSearch = this.debounce(() => this.performSearch(), this.config.debounceDelay);
        
        // Input handler for live search
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            // Show/hide clear button
            if (clearButton) {
                clearButton.style.display = query ? 'flex' : 'none';
            }
            
            // Trigger search if 2+ characters
            if (query.length >= 2) {
                debouncedSearch();
            } else if (query.length === 0) {
                this.clearResults();
            }
        });
        
        // Search button click
        if (searchButton) {
            searchButton.addEventListener('click', () => this.performSearch());
        }
        
        // Enter key to search
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch();
            }
        });
        
        // Clear button
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                searchInput.value = '';
                clearButton.style.display = 'none';
                this.clearResults();
                searchInput.focus();
            });
        }
        
        // Search suggestions
        this.setupSearchSuggestions(searchInput);
    }

    /**
     * Enhanced search with retry and error handling
     */
    async performSearch(retryCount = 0) {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput?.value.trim().toLowerCase() || '';
        
        if (!query || query.length < 2) return;
        
        // Prevent duplicate searches
        if (this.isSearching && this.currentQuery === query) return;
        
        this.isSearching = true;
        this.currentQuery = query;
        
        // Update UI
        const resultsDiv = document.getElementById('searchResults');
        const resultsCount = document.getElementById('searchResultsCount');
        
        if (resultsDiv) {
            resultsDiv.innerHTML = '<div class="search-loading"><div class="loading-spinner"></div><p>Searching...</p></div>';
        }
        
        try {
            let results = [];
            
            // Try using the character loader first
            if (this.loader) {
                results = await this.searchWithRetry(query, retryCount);
            } else {
                // Fallback to DOM search
                results = this.searchDOM(query);
            }
            
            // Add to search history
            this.addToSearchHistory(query, results.length);
            
            // Display results
            this.displayResults(results, query, resultsDiv, resultsCount);
            
        } catch (error) {
            console.error('Search error:', error);
            
            // Retry logic
            if (retryCount < this.config.maxRetries) {
                console.log(`Retrying search (${retryCount + 1}/${this.config.maxRetries})...`);
                setTimeout(() => {
                    this.performSearch(retryCount + 1);
                }, this.config.retryDelay * (retryCount + 1));
            } else {
                this.displayError(resultsDiv, 'Search failed. Please try again.');
            }
        } finally {
            this.isSearching = false;
        }
    }

    /**
     * Search with retry mechanism
     */
    async searchWithRetry(query, retryCount) {
        try {
            // Check cache first
            const cacheKey = `search_${query}`;
            if (this.cache.has(cacheKey)) {
                return this.cache.get(cacheKey);
            }
            
            // Perform search
            const results = await this.loader.searchCharacters(query);
            
            // Apply filters
            const filteredResults = this.applyFilters(results);
            
            // Cache results
            this.cacheResults(cacheKey, filteredResults);
            
            return filteredResults;
        } catch (error) {
            if (retryCount < this.config.maxRetries) {
                throw error; // Let performSearch handle retry
            }
            return []; // Return empty on final failure
        }
    }

    /**
     * Apply advanced filters
     */
    applyFilters(results) {
        const filters = this.getActiveFilters();
        
        return results.filter(character => {
            // Gender filter
            if (filters.gender && filters.gender !== 'all') {
                if (character.gender !== filters.gender) return false;
            }
            
            // Role filter
            if (filters.role && filters.role !== 'all') {
                const tags = character.tags || [];
                if (!tags.some(tag => tag.toLowerCase().includes(filters.role))) return false;
            }
            
            // Testament filter
            if (filters.testament && filters.testament !== 'all') {
                const bookTestament = this.getTestament(character.book?.id);
                if (bookTestament !== filters.testament) return false;
            }
            
            // Progress filter
            if (filters.progress === 'unread') {
                if (this.isCharacterRead(character.id)) return false;
            } else if (filters.progress === 'read') {
                if (!this.isCharacterRead(character.id)) return false;
            }
            
            return true;
        });
    }

    /**
     * Display search results with progress indicators
     */
    displayResults(results, query, resultsDiv, resultsCount) {
        if (!resultsDiv) return;
        
        if (results.length === 0) {
            resultsDiv.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <div class="empty-state-text">No Results Found</div>
                    <div class="empty-state-subtext">Try different keywords or adjust filters</div>
                </div>
            `;
            if (resultsCount) resultsCount.style.display = 'none';
            return;
        }
        
        // Update count
        if (resultsCount) {
            const countEl = resultsCount.querySelector('.results-number');
            if (countEl) countEl.textContent = results.length;
            resultsCount.style.display = 'block';
        }
        
        // Build results HTML
        let html = `
            <div class="section-header">
                <h3 class="section-title">Search Results</h3>
                <p class="section-subtitle">${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"</p>
            </div>
            <div class="search-results-grid">
        `;
        
        results.forEach(character => {
            const isRead = this.isCharacterRead(character.id);
            const readClass = isRead ? 'read' : '';
            const progressIcon = isRead ? '✓' : '';
            
            html += this.createResultCard(character, query, readClass, progressIcon);
        });
        
        html += '</div>';
        resultsDiv.innerHTML = html;
        
        // Attach progress tracking events
        this.attachProgressEvents();
        
        // Highlight search terms
        this.highlightSearchTerms(query);
    }

    /**
     * Create a result card with progress tracking
     */
    createResultCard(character, query, readClass, progressIcon) {
        const bookId = character.book?.id || 'unknown';
        const profilePath = character.profilePath || '#';
        const hebrewText = character.hebrew ? `<span class="hebrew">${character.hebrew}</span>` : '';
        const tags = (character.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('');
        const references = Array.isArray(character.references) ? character.references.join(', ') : '';
        
        return `
            <article class="study-card ${readClass}" data-character-id="${character.id}">
                <div class="progress-indicator" title="${readClass ? 'Mark as unread' : 'Mark as read'}">
                    <button class="progress-toggle" data-id="${character.id}">
                        ${progressIcon}
                    </button>
                </div>
                <a href="${profilePath}" class="study-card-link">
                    <div class="study-card-header">
                        <h4 class="study-card-title">
                            ${this.highlightText(character.name, query)} ${hebrewText}
                        </h4>
                        <div class="study-card-tags">${tags}</div>
                    </div>
                    <div class="study-card-body">
                        <p class="study-card-meta">${character.meaning || ''} • ${references}</p>
                        <p class="study-card-desc">${this.highlightText(character.summary || '', query)}</p>
                        <p class="study-card-meta">
                            <strong>Book:</strong> ${character.book?.name || 'Unknown'}
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
    }

    /**
     * Progress Tracking System
     */
    loadProgress() {
        try {
            const saved = localStorage.getItem('biblicalCharacterProgress');
            return saved ? JSON.parse(saved) : { read: [], bookmarks: [], notes: {} };
        } catch (error) {
            console.error('Failed to load progress:', error);
            return { read: [], bookmarks: [], notes: {} };
        }
    }

    saveProgress() {
        try {
            localStorage.setItem('biblicalCharacterProgress', JSON.stringify(this.progress));
        } catch (error) {
            console.error('Failed to save progress:', error);
        }
    }

    isCharacterRead(characterId) {
        return this.progress.read.includes(characterId);
    }

    toggleCharacterRead(characterId) {
        const index = this.progress.read.indexOf(characterId);
        if (index > -1) {
            this.progress.read.splice(index, 1);
        } else {
            this.progress.read.push(characterId);
        }
        this.saveProgress();
        this.updateProgressUI();
    }

    /**
     * Setup progress UI elements
     */
    setupProgressUI() {
        // Add progress stats to page
        const statsContainer = document.querySelector('.hero-stats');
        if (statsContainer && !document.getElementById('progress-stat')) {
            const progressStat = document.createElement('div');
            progressStat.className = 'stat-item';
            progressStat.id = 'progress-stat';
            progressStat.innerHTML = `
                <div class="stat-number" id="progress-count">0</div>
                <div class="stat-label">Characters Read</div>
            `;
            statsContainer.appendChild(progressStat);
        }
        
        this.updateProgressUI();
    }

    updateProgressUI() {
        const countEl = document.getElementById('progress-count');
        if (countEl) {
            countEl.textContent = this.progress.read.length;
        }
    }

    attachProgressEvents() {
        document.querySelectorAll('.progress-toggle').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const characterId = button.dataset.id;
                this.toggleCharacterRead(characterId);
                
                // Update UI
                const card = button.closest('.study-card');
                card.classList.toggle('read');
                button.textContent = card.classList.contains('read') ? '✓' : '';
            });
        });
    }

    /**
     * Keyboard Navigation
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search focus
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
            
            // Escape to clear search
            if (e.key === 'Escape') {
                const searchInput = document.getElementById('searchInput');
                if (document.activeElement === searchInput) {
                    searchInput.value = '';
                    this.clearResults();
                }
            }
            
            // Arrow keys for navigation (when search results are visible)
            if (document.getElementById('searchResults')?.children.length > 0) {
                this.handleArrowNavigation(e);
            }
        });
    }

    handleArrowNavigation(e) {
        const results = document.querySelectorAll('.search-results-grid .study-card');
        if (results.length === 0) return;
        
        const focused = document.activeElement.closest('.study-card');
        let index = Array.from(results).indexOf(focused);
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                index = (index + 1) % results.length;
                results[index].querySelector('.study-card-link').focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                index = index <= 0 ? results.length - 1 : index - 1;
                results[index].querySelector('.study-card-link').focus();
                break;
        }
    }

    /**
     * Advanced Filters Setup
     */
    setupFilters() {
        // Create filter UI if not exists
        if (!document.getElementById('advanced-filters')) {
            this.createFilterUI();
        }
        
        // Attach filter events
        document.querySelectorAll('.filter-option').forEach(filter => {
            filter.addEventListener('change', () => {
                if (this.currentQuery) {
                    this.performSearch();
                }
            });
        });
    }

    createFilterUI() {
        const searchSection = document.querySelector('.search-section');
        if (!searchSection) return;
        
        const filterHTML = `
            <div id="advanced-filters" class="search-filters">
                <span class="filter-label">Filters:</span>
                
                <select class="filter-option" id="filter-gender">
                    <option value="all">All Genders</option>
                    <option value="male">Men</option>
                    <option value="female">Women</option>
                </select>
                
                <select class="filter-option" id="filter-role">
                    <option value="all">All Roles</option>
                    <option value="prophet">Prophets</option>
                    <option value="king">Kings/Rulers</option>
                    <option value="priest">Priests</option>
                    <option value="judge">Judges</option>
                    <option value="warrior">Warriors</option>
                    <option value="patriarch">Patriarchs</option>
                    <option value="matriarch">Matriarchs</option>
                </select>
                
                <select class="filter-option" id="filter-testament">
                    <option value="all">All Books</option>
                    <option value="tanakh">Tanakh</option>
                    <option value="torah">Torah</option>
                    <option value="neviim">Prophets</option>
                    <option value="ketuvim">Writings</option>
                    <option value="newTestament">New Testament</option>
                </select>
                
                <select class="filter-option" id="filter-progress">
                    <option value="all">All Progress</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
                
                <button id="reset-filters" class="filter-reset">Reset Filters</button>
            </div>
        `;
        
        const searchBox = searchSection.querySelector('.search-box');
        searchBox.insertAdjacentHTML('afterend', filterHTML);
        
        // Reset filters button
        document.getElementById('reset-filters')?.addEventListener('click', () => {
            document.querySelectorAll('.filter-option').forEach(filter => {
                filter.value = 'all';
            });
            if (this.currentQuery) {
                this.performSearch();
            }
        });
    }

    getActiveFilters() {
        return {
            gender: document.getElementById('filter-gender')?.value || 'all',
            role: document.getElementById('filter-role')?.value || 'all',
            testament: document.getElementById('filter-testament')?.value || 'all',
            progress: document.getElementById('filter-progress')?.value || 'all'
        };
    }

    /**
     * Memory Management
     */
    cacheResults(key, data) {
        // Implement LRU cache with size limit
        if (this.cache.size >= this.config.cacheLimit) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, data);
    }

    /**
     * User Preferences (including dark mode)
     */
    loadUserPreferences() {
        const prefs = localStorage.getItem('userPreferences');
        if (prefs) {
            const preferences = JSON.parse(prefs);
            if (preferences.darkMode) {
                document.body.classList.add('dark-mode');
            }
        }
    }

    /**
     * Utility Functions
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

    highlightText(text, query) {
        if (!query || !text) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    highlightSearchTerms(query) {
        // Additional highlighting after render
        requestAnimationFrame(() => {
            document.querySelectorAll('.search-results-grid .study-card-desc').forEach(el => {
                if (el.textContent.toLowerCase().includes(query)) {
                    el.innerHTML = this.highlightText(el.textContent, query);
                }
            });
        });
    }

    clearResults() {
        const resultsDiv = document.getElementById('searchResults');
        const resultsCount = document.getElementById('searchResultsCount');
        if (resultsDiv) resultsDiv.innerHTML = '';
        if (resultsCount) resultsCount.style.display = 'none';
        this.currentQuery = '';
    }

    displayError(container, message) {
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">⚠️</div>
                    <div class="empty-state-text">Error</div>
                    <div class="empty-state-subtext">${message}</div>
                </div>
            `;
        }
    }

    addToSearchHistory(query, resultCount) {
        this.searchHistory.unshift({
            query,
            resultCount,
            timestamp: Date.now()
        });
        // Keep only last 20 searches
        this.searchHistory = this.searchHistory.slice(0, 20);
    }

    setupSearchSuggestions(input) {
        // Create datalist for suggestions
        if (!document.getElementById('search-suggestions')) {
            const datalist = document.createElement('datalist');
            datalist.id = 'search-suggestions';
            document.body.appendChild(datalist);
            input.setAttribute('list', 'search-suggestions');
        }
        
        // Update suggestions based on history
        input.addEventListener('focus', () => {
            const datalist = document.getElementById('search-suggestions');
            datalist.innerHTML = this.searchHistory
                .slice(0, 5)
                .map(item => `<option value="${item.query}">${item.resultCount} results</option>`)
                .join('');
        });
    }

    /**
     * DOM Fallback Search
     */
    searchDOM(query) {
        const results = [];
        const elements = document.querySelectorAll('.study-card, .character-card');
        
        elements.forEach(el => {
            const text = el.textContent.toLowerCase();
            if (text.includes(query)) {
                results.push({
                    element: el,
                    relevance: this.calculateRelevance(text, query)
                });
            }
        });
        
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    calculateRelevance(text, query) {
        let score = 0;
        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();
        
        if (lowerText === lowerQuery) score += 100;
        if (lowerText.startsWith(lowerQuery)) score += 50;
        if (lowerText.includes(lowerQuery)) score += 25;
        
        const regex = new RegExp(`\\b${lowerQuery}\\b`, 'i');
        if (regex.test(text)) score += 30;
        
        return score;
    }

    getTestament(bookId) {
        // Helper to determine testament from book ID
        const tanakhBooks = ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 
                           'joshua', 'judges', 'samuel1', 'samuel2', 'kings1', 'kings2',
                           'isaiah', 'jeremiah', 'ezekiel', 'hosea', 'joel', 'amos', 
                           'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk', 'zephaniah',
                           'haggai', 'zechariah', 'malachi', 'psalms', 'proverbs', 'job',
                           'song-of-songs', 'ruth', 'lamentations', 'ecclesiastes', 'esther',
                           'daniel', 'ezra', 'nehemiah', 'chronicles1', 'chronicles2'];
        
        return tanakhBooks.includes(bookId) ? 'tanakh' : 'newTestament';
    }
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        window.enhancedSearch = new EnhancedSearchModule();
        console.log('✓ Enhanced Search Module initialized with progress tracking');
    });
}

// Export for ES6 modules
export default EnhancedSearchModule;