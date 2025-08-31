<!-- 
SEARCH INTEGRATION UPDATES
Replace the existing search implementation in both hub pages with this unified approach
-->

<!-- 1. UPDATE THE SEARCH SECTION HTML (same for both hubs) -->
<div class="search-section" id="searchSection">
    <div class="search-container">
        <div class="search-header">
            <h2 class="section-title">
                <span class="search-icon">🔍</span>
                Search Biblical Characters
            </h2>
            <p class="section-subtitle">Find characters by name, Hebrew meaning, book, or description</p>
            <div class="search-shortcuts">
                <kbd>Ctrl</kbd> + <kbd>K</kbd> to focus search
            </div>
        </div>
        
        <div class="search-box">
            <div class="search-input-wrapper">
                <input 
                    type="text" 
                    id="searchInput" 
                    class="search-input"
                    placeholder="Try 'David', 'prophet', 'Genesis', or 'מֹשֶׁה'..."
                    aria-label="Search characters"
                    autocomplete="off"
                    spellcheck="false"
                >
                <button 
                    type="button" 
                    id="clearSearch" 
                    class="clear-search"
                    aria-label="Clear search"
                    style="display: none;"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                </button>
            </div>
            <button class="search-button" id="searchButton" aria-label="Search">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                          stroke="currentColor" 
                          stroke-width="2" 
                          fill="none" 
                          stroke-linecap="round" 
                          stroke-linejoin="round"/>
                </svg>
                <span>Search</span>
            </button>
        </div>
        
        <!-- Results count (hidden by default) -->
        <div id="searchResultsCount" class="search-results-count" style="display: none;">
            <span class="results-number">0</span> results found
        </div>
        
        <!-- Search Results Container -->
        <div id="searchResults" class="search-results"></div>
    </div>
</div>

<!-- 2. ADD THESE STYLES TO YOUR CSS -->
<style>
/* Search Enhancements */
.search-shortcuts {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: var(--text-gray);
}

.search-shortcuts kbd {
    background: var(--gray-100);
    border: 1px solid var(--gray-300);
    border-radius: 3px;
    padding: 2px 6px;
    font-family: monospace;
    font-size: 0.85em;
}

.search-loading {
    text-align: center;
    padding: 3rem;
}

.loading-spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: var(--accent-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.search-message {
    padding: 2rem;
    text-align: center;
    color: var(--text-gray);
    background: var(--gray-50);
    border-radius: 8px;
    margin: 1rem 0;
}

.search-result {
    animation: fadeInUp 0.3s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Search History */
.search-history {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-light);
}

.history-title {
    font-size: 0.9rem;
    color: var(--text-gray);
    margin-bottom: 1rem;
    font-weight: 600;
}

.history-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.history-item {
    background: var(--gray-50);
    border: 1px solid var(--border-light);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.history-item:hover {
    background: var(--gray-100);
    border-color: var(--accent-primary);
}

.history-count {
    font-size: 0.8rem;
    color: var(--text-gray);
    background: white;
    padding: 2px 6px;
    border-radius: 10px;
}

/* Focus styles for accessibility */
.search-input:focus {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
}

.search-button:focus,
.clear-search:focus {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
}

/* Women hub specific styles */
.women-hub .loading-spinner {
    border-top-color: var(--accent-purple);
}

.women-hub .history-item:hover {
    border-color: var(--accent-purple);
}

.women-hub .search-input:focus,
.women-hub .search-button:focus {
    outline-color: var(--accent-purple);
}
</style>

<!-- 3. JAVASCRIPT INTEGRATION -->
<!-- Remove all the old inline search scripts and replace with this single integration -->
<script type="module">
// Import the unified search module
import UnifiedSearch from '/assets/js/search-module.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize search with custom options
    const searchOptions = {
        enableLiveSearch: true,
        enableHistory: true,
        debounceDelay: 300,
        maxResults: 50
    };
    
    // Create search instance
    window.searchModule = new UnifiedSearch(searchOptions);
    
    // Listen for history item clicks (event delegation)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.history-item')) {
            const searchTerm = e.target.closest('.history-item').dataset.search;
            if (searchTerm) {
                document.getElementById('searchInput').value = searchTerm;
                window.searchModule.performSearch(searchTerm);
            }
        }
    });
    
    console.log('✓ Search module integrated');
});
</script>

<!-- 4. UPDATE hub-init.js to not conflict -->
<!-- In hub-init.js, remove or comment out the search initialization code -->
<!-- The search module will work independently and access window.hub.loader when available -->

<!-- 5. OPTIONAL: Add search stats to footer -->
<div class="search-stats" style="display: none;">
    <p>Popular searches: 
        <span class="popular-term">Abraham</span>,
        <span class="popular-term">Moses</span>,
        <span class="popular-term">David</span>,
        <span class="popular-term">Deborah</span>,
        <span class="popular-term">Ruth</span>
    </p>
</div>