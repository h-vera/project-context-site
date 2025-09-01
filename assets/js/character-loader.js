/**
 * Character Loader Module
 * Path: /assets/js/character-loader.js
 * Purpose: Loads and manages biblical character data
 * Version: 1.0.0
 */

class CharacterLoader {
    constructor(options = {}) {
        // Use relative path to work on any domain
        this.baseUrl = options.baseUrl || '';
        this.filterGender = options.filterGender || null;
        this.manifest = null;
        this.cache = new Map();
        this.initialized = false;
    }

    /**
     * Initialize the loader and get manifest
     */
    async initialize() {
        if (this.initialized) return this.manifest;
        
        try {
            // Try to load manifest, but use fallback if it doesn't exist
            const manifestUrl = `${this.baseUrl}/assets/data/manifest.json`;
            console.log('Loading manifest from:', manifestUrl);
            
            const response = await fetch(manifestUrl);
            if (!response.ok) {
                console.warn(`Manifest not found (${response.status}), using fallback`);
                this.manifest = this.getDefaultManifest();
            } else {
                this.manifest = await response.json();
            }
            
            this.initialized = true;
            console.log('✓ CharacterLoader initialized');
            return this.manifest;
            
        } catch (error) {
            console.warn('Error loading manifest, using fallback:', error.message);
            this.manifest = this.getDefaultManifest();
            this.initialized = true;
            return this.manifest;
        }
    }

    /**
     * Get default manifest if loading fails
     */
    getDefaultManifest() {
        return {
            books: [
                { id: 'genesis', file: 'genesis.json', name: 'Genesis' },
                { id: 'exodus', file: 'exodus.json', name: 'Exodus' },
                { id: 'leviticus', file: 'leviticus.json', name: 'Leviticus' },
                { id: 'numbers', file: 'numbers.json', name: 'Numbers' },
                { id: 'deuteronomy', file: 'deuteronomy.json', name: 'Deuteronomy' },
                { id: 'joshua', file: 'joshua.json', name: 'Joshua' },
                { id: 'judges', file: 'judges.json', name: 'Judges' },
                { id: 'ruth', file: 'ruth.json', name: 'Ruth' },
                { id: 'samuel', file: 'samuel.json', name: '1-2 Samuel' },
                { id: 'kings', file: 'kings.json', name: '1-2 Kings' },
                { id: 'chronicles', file: 'chronicles.json', name: '1-2 Chronicles' },
                { id: 'ezra', file: 'ezra.json', name: 'Ezra' },
                { id: 'nehemiah', file: 'nehemiah.json', name: 'Nehemiah' },
                { id: 'esther', file: 'esther.json', name: 'Esther' },
                { id: 'job', file: 'job.json', name: 'Job' },
                { id: 'psalms', file: 'psalms.json', name: 'Psalms' },
                { id: 'proverbs', file: 'proverbs.json', name: 'Proverbs' },
                { id: 'ecclesiastes', file: 'ecclesiastes.json', name: 'Ecclesiastes' },
                { id: 'song-of-songs', file: 'song-of-songs.json', name: 'Song of Songs' },
                { id: 'isaiah', file: 'isaiah.json', name: 'Isaiah' },
                { id: 'jeremiah', file: 'jeremiah.json', name: 'Jeremiah' },
                { id: 'lamentations', file: 'lamentations.json', name: 'Lamentations' },
                { id: 'ezekiel', file: 'ezekiel.json', name: 'Ezekiel' },
                { id: 'daniel', file: 'daniel.json', name: 'Daniel' },
                { id: 'hosea', file: 'hosea.json', name: 'Hosea' },
                { id: 'joel', file: 'joel.json', name: 'Joel' },
                { id: 'amos', file: 'amos.json', name: 'Amos' },
                { id: 'obadiah', file: 'obadiah.json', name: 'Obadiah' },
                { id: 'jonah', file: 'jonah.json', name: 'Jonah' },
                { id: 'micah', file: 'micah.json', name: 'Micah' },
                { id: 'nahum', file: 'nahum.json', name: 'Nahum' },
                { id: 'habakkuk', file: 'habakkuk.json', name: 'Habakkuk' },
                { id: 'zephaniah', file: 'zephaniah.json', name: 'Zephaniah' },
                { id: 'haggai', file: 'haggai.json', name: 'Haggai' },
                { id: 'zechariah', file: 'zechariah.json', name: 'Zechariah' },
                { id: 'malachi', file: 'malachi.json', name: 'Malachi' }
            ]
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
            const url = `${this.baseUrl}/assets/data/books/${bookId}.json`;
            console.log(`Loading book data from: ${url}`);
            
            const response = await fetch(url);
            if (!response.ok) {
                console.warn(`Book ${bookId} not found (${response.status}), using fallback`);
                return this.getFallbackBookData(bookId);
            }

            // Parse JSON
            const data = await response.json();
            
            // Validate the data structure
            if (!data || typeof data !== 'object') {
                console.warn(`Invalid data structure in ${bookId}.json, using fallback`);
                return this.getFallbackBookData(bookId);
            }
            
            // Cache the raw data
            this.cache.set(bookId, data);
            
            console.log(`✓ Loaded ${bookId} with ${data.characters?.length || 0} characters`);
            
            // Return filtered data
            return this.filterData(data);
            
        } catch (error) {
            console.error(`Error loading book ${bookId}:`, error.message);
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
     * Search characters by query
     */
    async searchCharacters(query) {
        const allCharacters = await this.getAllCharacters();
        const lowerQuery = query.toLowerCase();
        
        return allCharacters.filter(char => {
            return char.name?.toLowerCase().includes(lowerQuery) ||
                   char.hebrew?.includes(query) ||
                   char.meaning?.toLowerCase().includes(lowerQuery) ||
                   char.summary?.toLowerCase().includes(lowerQuery) ||
                   char.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
        });
    }

    /**
     * Get all characters across all books
     */
    async getAllCharacters() {
        if (!this.manifest) {
            await this.initialize();
        }

        const allCharacters = [];
        const books = this.manifest.books || [];

        for (const bookInfo of books) {
            try {
                const bookData = await this.loadBook(bookInfo.id);
                if (bookData.characters) {
                    allCharacters.push(...bookData.characters.map(char => ({
                        ...char,
                        book: bookData.book
                    })));
                }
            } catch (error) {
                console.error(`Failed to load ${bookInfo.id}:`, error);
            }
        }

        return allCharacters;
    }

    /**
     * Get fallback data for a specific book
     */
    getFallbackBookData(bookId) {
        const fallbackData = {
            genesis: {
                book: {
                    id: "genesis",
                    name: "Genesis",
                    hebrew: "בְּרֵאשִׁית",
                    hebrewTranslit: "B'reishit",
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
                        meaning: "Father of multitudes",
                        summary: "Father of faith and patriarch of Israel",
                        tags: ["Patriarch", "Covenant", "Faith"]
                    },
                    {
                        id: "sarah",
                        name: "Sarah",
                        hebrew: "שָׂרָה",
                        gender: "female",
                        profilePath: "/studies/characters/genesis/sarah.html",
                        references: ["Gen 11-25"],
                        meaning: "Princess",
                        summary: "Mother of nations, wife of Abraham",
                        tags: ["Matriarch", "Faith", "Mother"]
                    },
                    {
                        id: "isaac",
                        name: "Isaac",
                        hebrew: "יִצְחָק",
                        gender: "male",
                        profilePath: "/studies/characters/genesis/isaac.html",
                        references: ["Gen 21-35"],
                        meaning: "He laughs",
                        summary: "Son of promise, second patriarch",
                        tags: ["Patriarch", "Promise", "Covenant"]
                    },
                    {
                        id: "rebekah",
                        name: "Rebekah",
                        hebrew: "רִבְקָה",
                        gender: "female",
                        profilePath: "/studies/characters/genesis/rebekah.html",
                        references: ["Gen 24-27"],
                        meaning: "To bind",
                        summary: "Wife of Isaac, mother of Jacob and Esau",
                        tags: ["Matriarch", "Mother", "Prophecy"]
                    },
                    {
                        id: "jacob",
                        name: "Jacob",
                        hebrew: "יַעֲקֹב",
                        gender: "male",
                        profilePath: "/studies/characters/genesis/jacob.html",
                        references: ["Gen 25-50"],
                        meaning: "Supplanter",
                        summary: "Father of the twelve tribes of Israel",
                        tags: ["Patriarch", "Israel", "Twelve Tribes"]
                    }
                ]
            },
            kings: {
                book: {
                    id: "kings",
                    name: "1-2 Kings",
                    hebrew: "מְלָכִים",
                    hebrewTranslit: "M'lakhim",
                    characterCount: 28
                },
                characters: [
                    {
                        id: "elijah",
                        name: "Elijah",
                        hebrew: "אֵלִיָּהוּ",
                        gender: "male",
                        profilePath: "/studies/characters/kings/elijah.html",
                        references: ["1 Kings 17-19", "2 Kings 1-2"],
                        meaning: "My God is Yahweh",
                        summary: "Greatest prophet of northern kingdom, confronted Ahab and Jezebel",
                        tags: ["Prophet", "Miracle Worker", "Mount Carmel"],
                        multiPage: true
                    },
                    {
                        id: "jezebel",
                        name: "Jezebel",
                        hebrew: "אִיזֶבֶל",
                        gender: "female",
                        profilePath: "/studies/characters/kings/jezebel.html",
                        references: ["1 Kings 16:31", "1 Kings 21", "2 Kings 9"],
                        meaning: "Where is the prince?",
                        summary: "Ahab's wife, promoted Baal worship, enemy of Elijah",
                        tags: ["Queen", "Idolatry", "Power", "Judgment"],
                        hasProfile: true
                    },
                    {
                        id: "elisha",
                        name: "Elisha",
                        hebrew: "אֱלִישָׁע",
                        gender: "male",
                        profilePath: "/studies/characters/kings/elisha.html",
                        references: ["1 Kings 19:16-21", "2 Kings 2-13"],
                        meaning: "God is salvation",
                        summary: "Elijah's successor, performed many miracles",
                        tags: ["Prophet", "Miracle Worker", "Double Portion"],
                        multiPage: true
                    },
                    {
                        id: "hezekiah",
                        name: "Hezekiah",
                        hebrew: "חִזְקִיָּהוּ",
                        gender: "male",
                        profilePath: "/studies/characters/kings/hezekiah.html",
                        references: ["2 Kings 18-20"],
                        meaning: "Yahweh strengthens",
                        summary: "Righteous king who trusted God against Assyrian invasion",
                        tags: ["King", "Reformer", "Faith"],
                        hasProfile: true
                    },
                    {
                        id: "widow-zarephath",
                        name: "Widow of Zarephath",
                        hebrew: "אַלְמָנָה צָרְפַת",
                        gender: "female",
                        profilePath: "/studies/characters/kings/widow-zarephath.html",
                        references: ["1 Kings 17:7-24"],
                        meaning: "Widow of refining place",
                        summary: "Fed Elijah during famine, son raised from dead",
                        tags: ["Widow", "Faith", "Miracle", "Hospitality"]
                    }
                ]
            },
            samuel: {
                book: {
                    id: "samuel",
                    name: "1-2 Samuel",
                    hebrew: "שְׁמוּאֵל",
                    hebrewTranslit: "Sh'muel",
                    characterCount: 47
                },
                characters: [
                    {
                        id: "samuel",
                        name: "Samuel",
                        hebrew: "שְׁמוּאֵל",
                        gender: "male",
                        profilePath: "/studies/characters/samuel/samuel.html",
                        references: ["1 Sam 1-25"],
                        meaning: "Name of God/Asked of God",
                        summary: "Last judge and first prophet, anointed both Saul and David",
                        tags: ["Prophet", "Judge", "Priest", "Kingmaker"]
                    },
                    {
                        id: "hannah",
                        name: "Hannah",
                        hebrew: "חַנָּה",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/hannah.html",
                        references: ["1 Sam 1-2"],
                        meaning: "Grace, favor",
                        summary: "Barren woman whose fervent prayer led to Samuel's birth",
                        tags: ["Mother", "Prayer Warrior", "Worshipper"],
                        hasSong: true,
                        songPath: "/studies/women/song-of-songs/song-of-hannah.html"
                    },
                    {
                        id: "david",
                        name: "David",
                        hebrew: "דָּוִד",
                        gender: "male",
                        profilePath: "/studies/characters/samuel/david.html",
                        references: ["1 Sam 16 - 2 Sam 24"],
                        meaning: "Beloved",
                        summary: "Shepherd boy anointed as king, giant-killer, man after God's own heart",
                        tags: ["King", "Shepherd", "Musician", "Warrior"]
                    },
                    {
                        id: "bathsheba",
                        name: "Bathsheba",
                        hebrew: "בַּת־שֶׁבַע",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/bathsheba.html",
                        references: ["2 Sam 11-12"],
                        meaning: "Daughter of oath/seven",
                        summary: "Woman David took in adultery, became his wife and mother of Solomon",
                        tags: ["David's Wife", "Solomon's Mother", "Tragedy"]
                    },
                    {
                        id: "abigail",
                        name: "Abigail",
                        hebrew: "אֲבִיגַיִל",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/abigail.html",
                        references: ["1 Sam 25"],
                        meaning: "My father's joy",
                        summary: "Wise woman who prevented David from sinning by interceding for her foolish husband",
                        tags: ["Wise Woman", "Intercessor", "Peacemaker"]
                    }
                ]
            },
            exodus: {
                book: {
                    id: "exodus",
                    name: "Exodus",
                    hebrew: "שְׁמוֹת",
                    hebrewTranslit: "Sh'mot",
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
                        meaning: "Drawn out",
                        summary: "Prophet, lawgiver, and deliverer of Israel from Egypt",
                        tags: ["Prophet", "Leader", "Lawgiver"],
                        multiPage: true
                    },
                    {
                        id: "miriam",
                        name: "Miriam",
                        hebrew: "מִרְיָם",
                        gender: "female",
                        profilePath: "/studies/characters/exodus/miriam.html",
                        references: ["Ex 2, 15"],
                        meaning: "Bitter/Rebellious",
                        summary: "Prophetess and sister of Moses who led women in worship",
                        tags: ["Prophetess", "Worship Leader"]
                    },
                    {
                        id: "aaron",
                        name: "Aaron",
                        hebrew: "אַהֲרֹן",
                        gender: "male",
                        profilePath: "/studies/characters/exodus/aaron.html",
                        references: ["Ex 4-40", "Lev", "Num"],
                        meaning: "Exalted/Mountain of strength",
                        summary: "First high priest and Moses' spokesman",
                        tags: ["High Priest", "Leader"]
                    },
                    {
                        id: "pharaoh-daughter",
                        name: "Pharaoh's Daughter",
                        hebrew: "בַּת־פַּרְעֹה",
                        gender: "female",
                        profilePath: "/studies/characters/exodus/pharaoh-daughter.html",
                        references: ["Ex 2:5-10"],
                        meaning: "Daughter of Pharaoh",
                        summary: "Egyptian princess who rescued and adopted Moses",
                        tags: ["Princess", "Rescuer", "Adoptive Mother"]
                    }
                ]
            },
            judges: {
                book: {
                    id: "judges",
                    name: "Judges",
                    hebrew: "שֹׁפְטִים",
                    hebrewTranslit: "Shoftim",
                    characterCount: 20
                },
                characters: [
                    {
                        id: "deborah",
                        name: "Deborah",
                        hebrew: "דְּבוֹרָה",
                        gender: "female",
                        profilePath: "/studies/characters/judges/deborah.html",
                        references: ["Judges 4-5"],
                        meaning: "Bee",
                        summary: "Prophet, judge, and military leader who led Israel to victory",
                        tags: ["Judge", "Prophetess", "Leader"],
                        multiPage: true,
                        hasSong: true
                    },
                    {
                        id: "gideon",
                        name: "Gideon",
                        hebrew: "גִּדְעוֹן",
                        gender: "male",
                        profilePath: "/studies/characters/judges/gideon.html",
                        references: ["Judges 6-8"],
                        meaning: "Mighty warrior/Hewer",
                        summary: "Reluctant judge who defeated Midianites with 300 men",
                        tags: ["Judge", "Warrior", "Faith"]
                    },
                    {
                        id: "samson",
                        name: "Samson",
                        hebrew: "שִׁמְשׁוֹן",
                        gender: "male",
                        profilePath: "/studies/characters/judges/samson.html",
                        references: ["Judges 13-16"],
                        meaning: "Sun/Service",
                        summary: "Nazirite judge with supernatural strength, betrayed by Delilah",
                        tags: ["Judge", "Nazirite", "Strength"]
                    },
                    {
                        id: "delilah",
                        name: "Delilah",
                        hebrew: "דְּלִילָה",
                        gender: "female",
                        profilePath: "/studies/characters/judges/delilah.html",
                        references: ["Judges 16"],
                        meaning: "Delicate/Weak",
                        summary: "Philistine woman who betrayed Samson for silver",
                        tags: ["Betrayer", "Philistine"]
                    },
                    {
                        id: "jael",
                        name: "Jael",
                        hebrew: "יָעֵל",
                        gender: "female",
                        profilePath: "/studies/characters/judges/jael.html",
                        references: ["Judges 4:17-22", "Judges 5:24-27"],
                        meaning: "Mountain goat",
                        summary: "Kenite woman who killed Sisera and fulfilled Deborah's prophecy",
                        tags: ["Heroine", "Courage", "Prophecy"]
                    }
                ]
            },
            ruth: {
                book: {
                    id: "ruth",
                    name: "Ruth",
                    hebrew: "רוּת",
                    hebrewTranslit: "Rut",
                    characterCount: 5
                },
                characters: [
                    {
                        id: "ruth",
                        name: "Ruth",
                        hebrew: "רוּת",
                        gender: "female",
                        profilePath: "/studies/characters/ruth/ruth.html",
                        references: ["Book of Ruth"],
                        meaning: "Friend/Companion",
                        summary: "Moabite woman whose loyalty led to becoming David's great-grandmother",
                        tags: ["Loyalty", "Faith", "Moabite", "Ancestor"]
                    },
                    {
                        id: "naomi",
                        name: "Naomi",
                        hebrew: "נָעֳמִי",
                        gender: "female",
                        profilePath: "/studies/characters/ruth/naomi.html",
                        references: ["Book of Ruth"],
                        meaning: "Pleasant",
                        summary: "Ruth's mother-in-law who returned to Bethlehem from Moab",
                        tags: ["Mother-in-law", "Survivor", "Wisdom"]
                    },
                    {
                        id: "boaz",
                        name: "Boaz",
                        hebrew: "בֹּעַז",
                        gender: "male",
                        profilePath: "/studies/characters/ruth/boaz.html",
                        references: ["Ruth 2-4"],
                        meaning: "In him is strength",
                        summary: "Kinsman-redeemer who married Ruth",
                        tags: ["Redeemer", "Righteous", "Ancestor"]
                    },
                    {
                        id: "orpah",
                        name: "Orpah",
                        hebrew: "עָרְפָּה",
                        gender: "female",
                        profilePath: "/studies/characters/ruth/orpah.html",
                        references: ["Ruth 1:4-14"],
                        meaning: "Back of the neck",
                        summary: "Naomi's daughter-in-law who returned to Moab",
                        tags: ["Daughter-in-law", "Moabite"]
                    }
                ]
            }
        };

        // Return the specific book if available, otherwise generic fallback
        return fallbackData[bookId] || {
            book: {
                id: bookId,
                name: bookId.charAt(0).toUpperCase() + bookId.slice(1),
                hebrew: "",
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