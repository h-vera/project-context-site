/**
 * Character Loader Module
 * Path: /assets/js/character-loader.js
 * Purpose: Loads character data from JSON files for the hub pages
 */

class CharacterLoader {
    constructor(options = {}) {
        this.baseUrl = options.baseUrl || 'https://projectcontext.org';
        this.filterGender = options.filterGender || null; // null, 'male', or 'female'
        this.manifest = null;
        this.cache = new Map(); // Cache loaded book data
        this.initialized = false;
    }

    /**
     * Initialize the loader by fetching the manifest
     */
    async initialize() {
        if (this.initialized) return this.manifest;
        
        try {
            const response = await fetch(`${this.baseUrl}/assets/data/manifest.json`);
            if (!response.ok) {
                throw new Error(`Failed to load manifest: ${response.status}`);
            }
            
            this.manifest = await response.json();
            this.initialized = true;
            return this.manifest;
            
        } catch (error) {
            console.error('Error loading manifest:', error);
            // Return fallback structure if manifest fails
            return this.getFallbackManifest();
        }
    }

    /**
     * Get fallback manifest structure if loading fails
     */
    getFallbackManifest() {
        return {
            version: "1.0",
            lastUpdated: new Date().toISOString(),
            totalCharacters: 300,
            books: {
                tanakh: {
                    torah: ["genesis", "exodus", "leviticus", "numbers", "deuteronomy"],
                    neviim: ["joshua", "judges", "samuel", "kings", "isaiah", "jeremiah", "ezekiel"],
                    ketuvim: ["psalms", "proverbs", "job", "ruth", "esther", "daniel", "chronicles"]
                },
                newTestament: {
                    gospels: ["matthew", "mark", "luke", "john"],
                    history: ["acts"],
                    epistles: ["romans", "corinthians", "galatians"],
                    prophecy: ["revelation"]
                }
            }
        };
    }

    /**
     * Load character data for a specific book
     */
    async loadBook(bookId) {
        // Check cache first
        if (this.cache.has(bookId)) {
            return this.filterData(this.cache.get(bookId));
        }

        try {
            const response = await fetch(`${this.baseUrl}/assets/data/books/${bookId}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load book ${bookId}: ${response.status}`);
            }

            const data = await response.json();
            
            // Cache the raw data
            this.cache.set(bookId, data);
            
            // Return filtered data
            return this.filterData(data);
            
        } catch (error) {
            console.error(`Error loading book ${bookId}:`, error);
            // Return fallback data for specific books
            return this.getFallbackBookData(bookId);
        }
    }

    /**
     * Filter data based on gender if specified
     */
    filterData(data) {
        if (!this.filterGender || !data.characters) {
            return data;
        }

        return {
            ...data,
            characters: data.characters.filter(char => 
                char.gender === this.filterGender
            )
        };
    }

    /**
     * Get all characters across all books (filtered if needed)
     */
    async getAllCharacters() {
        if (!this.manifest) {
            await this.initialize();
        }

        const allCharacters = [];
        const books = this.getAllBookIds();

        for (const bookId of books) {
            try {
                const bookData = await this.loadBook(bookId);
                if (bookData.characters) {
                    allCharacters.push(...bookData.characters.map(char => ({
                        ...char,
                        book: bookData.book
                    })));
                }
            } catch (error) {
                console.error(`Failed to load ${bookId}:`, error);
            }
        }

        return allCharacters;
    }

    /**
     * Get all book IDs from manifest
     */
    getAllBookIds() {
        const ids = [];
        
        if (this.manifest?.books) {
            // Tanakh books
            if (this.manifest.books.tanakh) {
                Object.values(this.manifest.books.tanakh).forEach(category => {
                    if (Array.isArray(category)) {
                        ids.push(...category);
                    }
                });
            }
            
            // New Testament books
            if (this.manifest.books.newTestament) {
                Object.values(this.manifest.books.newTestament).forEach(category => {
                    if (Array.isArray(category)) {
                        ids.push(...category);
                    }
                });
            }
        }
        
        return ids;
    }

    /**
     * Search characters by query
     */
    async searchCharacters(query) {
        const allCharacters = await this.getAllCharacters();
        const lowerQuery = query.toLowerCase();
        
        return allCharacters.filter(char => {
            return char.name?.toLowerCase().includes(lowerQuery) ||
                   char.hebrew?.includes(query) ||
                   char.greek?.includes(query) ||
                   char.meaning?.toLowerCase().includes(lowerQuery) ||
                   char.summary?.toLowerCase().includes(lowerQuery) ||
                   char.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
        });
    }

    /**
     * Get featured characters
     */
    async getFeaturedCharacters(limit = 6) {
        // Define featured character IDs
        const featuredIds = [
            { book: 'genesis', id: 'abraham' },
            { book: 'genesis', id: 'sarah' },
            { book: 'exodus', id: 'moses' },
            { book: 'judges', id: 'deborah' },
            { book: 'genesis', id: 'hagar' },
            { book: 'judges', id: 'delilah' }
        ];

        const featured = [];
        
        for (const item of featuredIds.slice(0, limit)) {
            try {
                const bookData = await this.loadBook(item.book);
                const character = bookData.characters?.find(c => c.id === item.id);
                if (character) {
                    featured.push({
                        ...character,
                        book: bookData.book
                    });
                }
            } catch (error) {
                console.error(`Failed to load featured character ${item.id}:`, error);
            }
        }

        return featured;
    }

    /**
     * Get statistics about the characters
     */
    async getStatistics() {
        if (!this.manifest) {
            await this.initialize();
        }

        const stats = {
            totalCharacters: 0,
            totalBooks: 0,
            byGender: { male: 0, female: 0, unknown: 0 },
            byTestament: { tanakh: 0, newTestament: 0 }
        };

        const books = this.getAllBookIds();
        stats.totalBooks = books.length;

        for (const bookId of books) {
            try {
                const bookData = await this.loadBook(bookId);
                if (bookData.characters) {
                    stats.totalCharacters += bookData.characters.length;
                    
                    bookData.characters.forEach(char => {
                        const gender = char.gender || 'unknown';
                        stats.byGender[gender] = (stats.byGender[gender] || 0) + 1;
                        
                        // Determine testament based on book
                        const testament = this.getTestament(bookId);
                        if (testament) {
                            stats.byTestament[testament]++;
                        }
                    });
                }
            } catch (error) {
                console.error(`Failed to get stats for ${bookId}:`, error);
            }
        }

        return stats;
    }

    /**
     * Determine which testament a book belongs to
     */
    getTestament(bookId) {
        if (!this.manifest?.books) return null;
        
        // Check Tanakh
        if (this.manifest.books.tanakh) {
            for (const category of Object.values(this.manifest.books.tanakh)) {
                if (Array.isArray(category) && category.includes(bookId)) {
                    return 'tanakh';
                }
            }
        }
        
        // Check New Testament
        if (this.manifest.books.newTestament) {
            for (const category of Object.values(this.manifest.books.newTestament)) {
                if (Array.isArray(category) && category.includes(bookId)) {
                    return 'newTestament';
                }
            }
        }
        
        return null;
    }

    /**
     * Get fallback data for a specific book
     */
    getFallbackBookData(bookId) {
        // Provide sample fallback data for key books
        const fallbackData = {
            genesis: {
                book: {
                    id: "genesis",
                    name: "Genesis",
                    hebrew: "בְּרֵאשִׁית",
                    characterCount: 30
                },
                characters: [
                    {
                        id: "abraham",
                        name: "Abraham",
                        hebrew: "אַבְרָהָם",
                        gender: "male",
                        profilePath: "/studies/characters/genesis/abraham.html",
                        references: ["Gen 11-25"],
                        summary: "Father of faith and patriarch of Israel",
                        tags: ["Patriarch", "Covenant"]
                    },
                    {
                        id: "sarah",
                        name: "Sarah",
                        hebrew: "שָׂרָה",
                        gender: "female",
                        profilePath: "/studies/characters/genesis/sarah.html",
                        references: ["Gen 11-25"],
                        summary: "Mother of nations, wife of Abraham",
                        tags: ["Matriarch"]
                    }
                ]
            },
            exodus: {
                book: {
                    id: "exodus",
                    name: "Exodus",
                    hebrew: "שְׁמוֹת",
                    characterCount: 15
                },
                characters: [
                    {
                        id: "moses",
                        name: "Moses",
                        hebrew: "מֹשֶׁה",
                        gender: "male",
                        profilePath: "/studies/characters/exodus/moses.html",
                        references: ["Exodus-Deuteronomy"],
                        summary: "Prophet, lawgiver, and deliverer of Israel",
                        tags: ["Prophet", "Leader"]
                    },
                    {
                        id: "miriam",
                        name: "Miriam",
                        hebrew: "מִרְיָם",
                        gender: "female",
                        profilePath: "/studies/characters/exodus/miriam.html",
                        references: ["Ex 2, 15"],
                        summary: "Prophetess and sister of Moses",
                        tags: ["Prophetess"]
                    }
                ]
            }
        };

        return fallbackData[bookId] || {
            book: {
                id: bookId,
                name: bookId.charAt(0).toUpperCase() + bookId.slice(1),
                characterCount: 0
            },
            characters: []
        };
    }

    /**
     * Clear the cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Preload specific books into cache
     */
    async preloadBooks(bookIds) {
        const promises = bookIds.map(bookId => this.loadBook(bookId));
        await Promise.all(promises);
    }
}

// Export for use as ES6 module
export default CharacterLoader;