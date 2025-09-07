// search-module.js
// Enhanced Search Module for Biblical Characters and Women's Hub
// Version: 2.0.0 - Fixed scrolling issues

(function() {
    'use strict';
    
    // Search configuration
    const CONFIG = {
        MIN_SEARCH_LENGTH: 2,
        DEBOUNCE_DELAY: 300,
        MAX_RESULTS: 50,
        SEARCH_FIELDS: ['name', 'hebrew', 'meaning', 'summary', 'tags', 'book'],
        HIGHLIGHT_CLASS: 'search-highlight'
    };
    
    // Search data cache
    let searchIndex = [];
    let indexLoaded = false;
    let loadingPromise = null;
    
    // Determine which hub we're on
    const isWomenHub = window.location.pathname.includes('women');
    const isCharacterHub = window.location.pathname.includes('characters');
    
    // Initialize search when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSearch);
    } else {
        initializeSearch();
    }
    
    function initializeSearch() {
        console.log('🔍 Initializing Enhanced Search Module...');
        
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const clearButton = document.getElementById('clearSearch');
        const searchResults = document.getElementById('searchResults');
        const resultsCount = document.getElementById('searchResultsCount');
        
        if (!searchInput || !searchResults) {
            console.warn('Search elements not found on this page');
            return;
        }
        
        // Load search index
        loadSearchIndex();
        
        // Event listeners with prevention of scrolling
        searchInput.addEventListener('input', debounce(handleSearch, CONFIG.DEBOUNCE_DELAY));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                handleSearch();
                return false;
            }
        });
        
        if (searchButton) {
            searchButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSearch();
                return false;
            });
        }
        
        if (clearButton) {
            clearButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                clearSearch();
                return false;
            });
        }
        
        // Handle URL parameters for direct search
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery) {
            searchInput.value = searchQuery;
            handleSearch();
        }
        
        console.log('✅ Search module initialized');
    }
    
    async function loadSearchIndex() {
        if (indexLoaded || loadingPromise) {
            return loadingPromise;
        }
        
        loadingPromise = buildSearchIndex();
        
        try {
            await loadingPromise;
            indexLoaded = true;
            console.log(`✅ Search index loaded with ${searchIndex.length} entries`);
        } catch (error) {
            console.error('Failed to load search index:', error);
        }
        
        return loadingPromise;
    }
    
    async function buildSearchIndex() {
        searchIndex = [];
        
        // Try to load from a pre-built index first (if you create one later)
        try {
            const indexPath = isWomenHub ? 
                '/assets/data/women-search-index.json' : 
                '/assets/data/characters-search-index.json';
            
            const response = await fetch(indexPath);
            if (response.ok) {
                searchIndex = await response.json();
                return;
            }
        } catch (e) {
            console.log('No pre-built index found, building from available data...');
        }
        
        // Build index from available sources
        await buildIndexFromSources();
    }
    
    async function buildIndexFromSources() {
        const entries = [];
        
        // 1. Try to load from book JSON files (for books that exist)
        const books = getBooksList();
        for (const book of books) {
            try {
                const response = await fetch(`/assets/data/books/${book.id}.json`);
                if (response.ok) {
                    const bookData = await response.json();
                    const characters = isWomenHub ? 
                        bookData.characters.filter(c => c.gender === 'female') :
                        bookData.characters;
                    
                    characters.forEach(char => {
                        entries.push({
                            ...char,
                            book: bookData.book.name,
                            bookId: book.id,
                            source: 'book-json'
                        });
                    });
                }
            } catch (e) {
                // Book JSON doesn't exist yet, skip silently
            }
        }
        
        // 2. Parse from featured sections if they exist
        const featuredGrid = document.getElementById('featured-grid');
        if (featuredGrid) {
            const featuredCards = featuredGrid.querySelectorAll('.study-card, .woman-card');
            featuredCards.forEach(card => {
                const entry = parseCardElement(card);
                if (entry && !entries.find(e => e.name === entry.name)) {
                    entries.push({ ...entry, source: 'featured' });
                }
            });
        }
        
        // 3. Add hardcoded popular characters as fallback
        const fallbackCharacters = getFallbackCharacters();
        fallbackCharacters.forEach(char => {
            if (!entries.find(e => e.name === char.name)) {
                entries.push({ ...char, source: 'fallback' });
            }
        });
        
        searchIndex = entries;
        console.log(`Built search index with ${searchIndex.length} entries`);
    }
    
    function parseCardElement(card) {
        try {
            const link = card.querySelector('a');
            const title = card.querySelector('.study-card-title, .woman-card-name');
            const hebrew = card.querySelector('.hebrew');
            const meta = card.querySelector('.study-card-meta, .woman-card-meta');
            const desc = card.querySelector('.study-card-desc, .woman-card-desc');
            const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.trim());
            
            if (!title) return null;
            
            return {
                name: title.textContent.replace(/[^\w\s'-]/g, '').trim(),
                hebrew: hebrew?.textContent.trim(),
                profilePath: link?.href,
                meaning: meta?.textContent.split('•')[0]?.trim(),
                references: meta?.textContent.split('•')[1]?.trim(),
                summary: desc?.textContent.trim(),
                tags: tags.length > 0 ? tags : undefined
            };
        } catch (e) {
            console.warn('Error parsing card element:', e);
            return null;
        }
    }
    
    function getBooksList() {
        // List of all biblical books with their IDs
        return [
            // Torah
            { id: 'genesis', name: 'Genesis' },
            { id: 'exodus', name: 'Exodus' },
            { id: 'leviticus', name: 'Leviticus' },
            { id: 'numbers', name: 'Numbers' },
            { id: 'deuteronomy', name: 'Deuteronomy' },
            // Former Prophets
            { id: 'joshua', name: 'Joshua' },
            { id: 'judges', name: 'Judges' },
            { id: 'samuel', name: '1-2 Samuel' },
            { id: 'kings', name: '1-2 Kings' },
            // Add more books as needed
            { id: 'ruth', name: 'Ruth' },
            { id: 'esther', name: 'Esther' },
            // ... etc
        ];
    }
    
    function getFallbackCharacters() {
        // Hardcoded popular characters as fallback
        const characters = [
            {
                name: 'Boaz',
                hebrew: 'בֹּעַז',
                meaning: 'In Him is Strength',
                book: 'Ruth',
                references: 'Ruth 2-4',
                summary: 'Kinsman-redeemer who married Ruth, ancestor of David and Jesus',
                profilePath: '/studies/characters/ruth/boaz.html',
                tags: ['Redeemer', 'Ancestor of David'],
                gender: 'male'
            },
            {
                name: 'Ruth',
                hebrew: 'רוּת',
                meaning: 'Friend, Companion',
                book: 'Ruth',
                references: 'Ruth 1-4',
                summary: 'Moabite woman who showed loyalty to Naomi and became ancestor of David',
                profilePath: '/studies/women/ruth/ruth.html',
                tags: ['Moabite', 'Ancestor of David'],
                gender: 'female'
            },
            {
                name: 'David',
                hebrew: 'דָּוִד',
                meaning: 'Beloved',
                book: '1-2 Samuel',
                references: '1 Samuel 16 - 1 Kings 2',
                summary: 'Second king of Israel, "man after God\'s own heart", ancestor of Jesus',
                profilePath: '/studies/characters/samuel/david.html',
                tags: ['King', 'Psalmist', 'Warrior'],
                gender: 'male'
            },
            {
                name: 'Deborah',
                hebrew: 'דְּבוֹרָה',
                meaning: 'Bee',
                book: 'Judges',
                references: 'Judges 4-5',
                summary: 'Prophet and judge who led Israel to victory over Canaanites',
                profilePath: '/studies/women/judges/deborah.html',
                tags: ['Prophet', 'Judge', 'Warrior'],
                gender: 'female'
            },
            {
                name: 'Esther',
                hebrew: 'אֶסְתֵּר',
                meaning: 'Star',
                book: 'Esther',
                references: 'Esther 1-10',
                summary: 'Jewish queen of Persia who saved her people from destruction',
                profilePath: '/studies/women/esther/esther.html',
                tags: ['Queen', 'Heroine'],
                gender: 'female'
            },
            {
                name: 'Abraham',
                hebrew: 'אַבְרָהָם',
                meaning: 'Father of Many Nations',
                book: 'Genesis',
                references: 'Genesis 11-25',
                summary: 'Father of faith and patriarch of Israel, received God\'s covenant promises',
                profilePath: '/studies/characters/genesis/abraham.html',
                tags: ['Patriarch', 'Father of Faith'],
                gender: 'male'
            },
            {
                name: 'Moses',
                hebrew: 'מֹשֶׁה',
                meaning: 'Drawn Out',
                book: 'Exodus',
                references: 'Exodus 2 - Deuteronomy 34',
                summary: 'Prophet and lawgiver who led Israel out of Egypt and received the Ten Commandments',
                profilePath: '/studies/characters/exodus/moses.html',
                tags: ['Prophet', 'Lawgiver', 'Leader'],
                gender: 'male'
            },
            {
                name: 'Sarah',
                hebrew: 'שָׂרָה',
                meaning: 'Princess',
                book: 'Genesis',
                references: 'Genesis 11-23',
                summary: 'Wife of Abraham and mother of Isaac, matriarch of Israel',
                profilePath: '/studies/women/genesis/sarah.html',
                tags: ['Matriarch', 'Mother of Nations'],
                gender: 'female'
            }
        ];
        
        // Filter based on which hub we're on
        return isWomenHub ? 
            characters.filter(c => c.gender === 'female') :
            characters;
    }
    
    async function handleSearch() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();
        
        if (query.length < CONFIG.MIN_SEARCH_LENGTH) {
            clearSearchResults();
            return;
        }
        
        console.log('🔍 Searching for:', query);
        
        // Show clear button
        const clearButton = document.getElementById('clearSearch');
        if (clearButton) {
            clearButton.style.display = 'block';
        }
        
        // Hide any open book data section to prevent interference
        const bookSection = document.getElementById('book-data-section');
        if (bookSection) {
            bookSection.style.display = 'none';
        }
        
        // Ensure index is loaded
        await loadSearchIndex();
        
        // Perform search
        const results = performSearch(query);
        console.log('📊 Found', results.length, 'results');
        
        // Display results
        displayResults(results, query);
        
        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('search', query);
        window.history.replaceState({}, '', url);
        
        // Prevent any default scrolling behavior
        return false;
    }
    
    function performSearch(query) {
        const searchTerms = query.toLowerCase().split(/\s+/);
        const results = [];
        
        searchIndex.forEach(entry => {
            let score = 0;
            const matchedTerms = new Set();
            
            searchTerms.forEach(term => {
                // Check each search field
                CONFIG.SEARCH_FIELDS.forEach(field => {
                    const value = entry[field];
                    if (!value) return;
                    
                    const fieldValue = Array.isArray(value) ? 
                        value.join(' ').toLowerCase() : 
                        value.toString().toLowerCase();
                    
                    if (fieldValue.includes(term)) {
                        matchedTerms.add(term);
                        
                        // Score based on field importance
                        if (field === 'name') {
                            score += fieldValue === term ? 100 : 50;
                        } else if (field === 'hebrew') {
                            score += 40;
                        } else if (field === 'meaning') {
                            score += 30;
                        } else if (field === 'tags') {
                            score += 25;
                        } else {
                            score += 10;
                        }
                    }
                });
            });
            
            // Only include if all terms matched
            if (matchedTerms.size === searchTerms.length) {
                results.push({ ...entry, searchScore: score });
            }
        });
        
        // Sort by score
        results.sort((a, b) => b.searchScore - a.searchScore);
        
        // Limit results
        return results.slice(0, CONFIG.MAX_RESULTS);
    }
    
    function displayResults(results, query) {
        const searchResults = document.getElementById('searchResults');
        const resultsCount = document.getElementById('searchResultsCount');
        
        if (!searchResults) {
            console.error('Search results container not found');
            return;
        }
        
        // Prevent any automatic focus or scroll
        const currentScrollY = window.scrollY;
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <div class="no-results-text">No results found for "${escapeHtml(query)}"</div>
                    <div class="no-results-suggestions">
                        Try different keywords or check the spelling
                    </div>
                </div>
            `;
            
            if (resultsCount) {
                resultsCount.style.display = 'none';
            }
        } else {
            // Update count
            if (resultsCount) {
                resultsCount.querySelector('.results-number').textContent = results.length;
                resultsCount.style.display = 'block';
            }
            
            // Build results HTML
            const resultsHTML = results.map(result => createResultCard(result, query)).join('');
            searchResults.innerHTML = `
                <div class="search-results-grid">
                    ${resultsHTML}
                </div>
            `;
        }
        
        // Restore scroll position if it changed
        if (window.scrollY !== currentScrollY) {
            window.scrollTo(0, currentScrollY);
        }
        
        // Display results - no automatic scrolling
        console.log('✅ Results displayed, no scrolling');
    }
    
    function createResultCard(result, query) {
        const highlightedName = highlightText(result.name, query);
        const highlightedSummary = result.summary ? 
            highlightText(truncateText(result.summary, 150), query) : '';
        
        const tags = (result.tags || []).map(tag => 
            `<span class="tag">${escapeHtml(tag)}</span>`
        ).join(' ');
        
        const hebrew = result.hebrew ? 
            `<span class="hebrew">${escapeHtml(result.hebrew)}</span>` : '';
        
        const meta = [
            result.meaning,
            result.book,
            result.references
        ].filter(Boolean).join(' • ');
        
        const profilePath = result.profilePath || '#';
        
        return `
            <article class="search-result-card">
                <a href="${escapeHtml(profilePath)}" class="result-link">
                    <div class="result-header">
                        <h4 class="result-title">${highlightedName} ${hebrew}</h4>
                        ${tags ? `<div class="result-tags">${tags}</div>` : ''}
                    </div>
                    <div class="result-body">
                        ${meta ? `<div class="result-meta">${escapeHtml(meta)}</div>` : ''}
                        ${highlightedSummary ? `<div class="result-summary">${highlightedSummary}</div>` : ''}
                    </div>
                    <div class="result-source">
                        <span class="source-label">${result.source === 'book-json' ? '📖' : 
                                                     result.source === 'featured' ? '⭐' : '📚'}</span>
                    </div>
                </a>
            </article>
        `;
    }
    
    function clearSearch() {
        const searchInput = document.getElementById('searchInput');
        const clearButton = document.getElementById('clearSearch');
        
        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
        }
        
        if (clearButton) {
            clearButton.style.display = 'none';
        }
        
        clearSearchResults();
        
        // Clear URL parameter
        const url = new URL(window.location);
        url.searchParams.delete('search');
        window.history.replaceState({}, '', url);
    }
    
    function clearSearchResults() {
        const searchResults = document.getElementById('searchResults');
        const resultsCount = document.getElementById('searchResultsCount');
        
        if (searchResults) {
            searchResults.innerHTML = '';
        }
        
        if (resultsCount) {
            resultsCount.style.display = 'none';
        }
    }
    
    // Utility functions
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
    
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
    
    function highlightText(text, query) {
        if (!text || !query) return escapeHtml(text || '');
        
        const escaped = escapeHtml(text);
        const terms = query.split(/\s+/).filter(t => t.length > 0);
        let highlighted = escaped;
        
        terms.forEach(term => {
            const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
            highlighted = highlighted.replace(regex, `<mark class="${CONFIG.HIGHLIGHT_CLASS}">$1</mark>`);
        });
        
        return highlighted;
    }
    
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }
    
    // Export for use in other modules if needed
    window.BiblicalSearch = {
        search: performSearch,
        loadIndex: loadSearchIndex,
        clearSearch: clearSearch
    };
    
})();