/**
 * Character Loader Module
 * Path: /assets/js/character-loader.js
 * Purpose: Loads and manages biblical character data
 * Version: 2.0.0 - Using embedded data with external fetch fallback
 */

class CharacterLoader {
    constructor(options = {}) {
        this.baseUrl = options.baseUrl || '';
        this.filterGender = options.filterGender || null;
        this.manifest = null;
        this.cache = new Map();
        this.initialized = false;
        // Embed the actual data directly
        this.embeddedData = this.getEmbeddedData();
    }

    /**
     * Initialize the loader and get manifest
     */
    async initialize() {
        if (this.initialized) return this.manifest;
        
        try {
            // Try to load manifest
            const manifestUrl = `${this.baseUrl}/assets/data/manifest.json`;
            const response = await fetch(manifestUrl);
            
            if (response.ok) {
                this.manifest = await response.json();
                console.log('✓ Loaded manifest from server');
            } else {
                this.manifest = this.getDefaultManifest();
                console.log('✓ Using default manifest');
            }
            
            this.initialized = true;
            return this.manifest;
            
        } catch (error) {
            console.warn('Error loading manifest, using default:', error.message);
            this.manifest = this.getDefaultManifest();
            this.initialized = true;
            return this.manifest;
        }
    }

    /**
     * Get default manifest structure
     */
    getDefaultManifest() {
        return {
            version: "1.0",
            books: {
                tanakh: {
                    torah: ["genesis", "exodus", "leviticus", "numbers", "deuteronomy"],
                    neviimFormer: ["joshua", "judges", "samuel", "kings"],
                    neviimLatter: ["isaiah", "jeremiah", "ezekiel"],
                    ketuvim: ["psalms", "proverbs", "job", "ruth", "esther"]
                }
            }
        };
    }

    /**
     * Load character data for a specific book
     */
    async loadBook(bookId) {
        // Normalize book IDs (e.g., "samuel1" -> "samuel", "kings1" -> "kings")
        const normalizedId = bookId.replace(/[12]$/, '');
        
        console.log(`LoadBook called for: ${bookId}, normalized to: ${normalizedId}`);
        
        // Check cache first
        if (this.cache.has(normalizedId)) {
            console.log(`Returning ${normalizedId} from cache`);
            const data = this.filterData(this.cache.get(normalizedId));
            
            // Force display update
            this.forceDisplayUpdate();
            return data;
        }

        // First check embedded data
        if (this.embeddedData[normalizedId]) {
            const data = this.embeddedData[normalizedId];
            this.cache.set(normalizedId, data);
            console.log(`✓ Loaded ${normalizedId} from embedded data with ${data.characters?.length || 0} characters`);
            
            // Force display update
            this.forceDisplayUpdate();
            return this.filterData(data);
        }

        // If not in embedded data, try to fetch
        try {
            const url = `${this.baseUrl}/assets/data/books/${normalizedId}.json`;
            console.log(`Attempting to fetch: ${url}`);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            this.cache.set(normalizedId, data);
            console.log(`✓ Loaded ${normalizedId} from server with ${data.characters?.length || 0} characters`);
            return this.filterData(data);
            
        } catch (error) {
            console.warn(`Could not load ${normalizedId} from server: ${error.message}`);
            // Return empty structure
            return {
                book: {
                    id: normalizedId,
                    name: this.getBookName(normalizedId),
                    characterCount: 0
                },
                characters: []
            };
        }
    }

    /**
     * Get friendly book name
     */
    getBookName(bookId) {
        const names = {
            'genesis': 'Genesis',
            'exodus': 'Exodus',
            'leviticus': 'Leviticus',
            'numbers': 'Numbers',
            'deuteronomy': 'Deuteronomy',
            'joshua': 'Joshua',
            'judges': 'Judges',
            'ruth': 'Ruth',
            'samuel': '1-2 Samuel',
            'kings': '1-2 Kings',
            'chronicles': '1-2 Chronicles',
            'ezra': 'Ezra',
            'nehemiah': 'Nehemiah',
            'esther': 'Esther',
            'job': 'Job',
            'psalms': 'Psalms',
            'proverbs': 'Proverbs',
            'ecclesiastes': 'Ecclesiastes',
            'song-of-songs': 'Song of Songs',
            'isaiah': 'Isaiah',
            'jeremiah': 'Jeremiah',
            'lamentations': 'Lamentations',
            'ezekiel': 'Ezekiel',
            'daniel': 'Daniel'
        };
        return names[bookId] || bookId.charAt(0).toUpperCase() + bookId.slice(1);
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
        const allCharacters = [];
        
        // Get all book IDs from embedded data
        const bookIds = Object.keys(this.embeddedData);
        
        for (const bookId of bookIds) {
            const bookData = await this.loadBook(bookId);
            if (bookData.characters) {
                allCharacters.push(...bookData.characters.map(char => ({
                    ...char,
                    book: bookData.book
                })));
            }
        }
        
        return allCharacters;
    }

    /**
     * Get embedded character data
     * This is the actual data from your JSON files
     */
    getEmbeddedData() {
        return {
            // 1-2 Kings data (matching expected structure)
            kings: {
                book: {
                    id: "kings",
                    name: "1-2 Kings",
                    hebrew: "מְלָכִים",
                    hebrewTranslit: "M'lakhim"
                },
                characters: [
                    {
                        id: "bathsheba-kings",
                        name: "Bathsheba",
                        hebrew: "בַּת־שֶׁבַע",
                        gender: "female",
                        profilePath: "/studies/characters/kings/bathsheba.html",
                        references: ["1 Kings 1:11-31", "1 Kings 2:13-25"],
                        meaning: "Daughter of oath/seven",
                        summary: "David's wife, Solomon's mother, secures throne for her son",
                        tags: ["Queen Mother", "Influence", "Succession"],
                        hasProfile: false
                    },
                    {
                        id: "jezebel",
                        name: "Jezebel",
                        hebrew: "אִיזֶבֶל",
                        gender: "female",
                        profilePath: "/studies/characters/kings/jezebel.html",
                        references: ["1 Kings 16:31", "1 Kings 18:4-19", "1 Kings 19:1-2", "1 Kings 21:1-25", "2 Kings 9:7-37"],
                        meaning: "Where is the prince?",
                        summary: "Ahab's wife, promoted Baal worship, enemy of Elijah, killed by Jehu's command",
                        tags: ["Queen", "Idolatry", "Persecution", "Power", "Judgment"],
                        hasProfile: true,
                        multiPage: true
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
                        tags: ["Widow", "Faith", "Miracle", "Hospitality", "Resurrection"],
                        hasProfile: false
                    },
                    {
                        id: "athaliah",
                        name: "Athaliah",
                        hebrew: "עֲתַלְיָה",
                        gender: "female",
                        profilePath: "/studies/characters/kings/athaliah.html",
                        references: ["2 Kings 8:18, 26", "2 Kings 11:1-20"],
                        meaning: "Yahweh has shown his might",
                        summary: "Daughter of Ahab/Jezebel, usurper queen of Judah, killed royal seed",
                        tags: ["Queen", "Usurper", "Violence", "Judgment"],
                        hasProfile: true
                    },
                    {
                        id: "jehosheba",
                        name: "Jehosheba",
                        hebrew: "יְהוֹשֶׁבַע",
                        gender: "female",
                        profilePath: "/studies/characters/kings/jehosheba.html",
                        references: ["2 Kings 11:2-3"],
                        meaning: "Yahweh is an oath",
                        summary: "Daughter of King Joram, saved baby Joash from Athaliah",
                        tags: ["Princess", "Rescuer", "Courage", "Covenant keeper"],
                        hasProfile: true
                    },
                    {
                        id: "shunammite-woman",
                        name: "Shunammite Woman",
                        hebrew: "הַשּׁוּנַמִּית",
                        gender: "female",
                        profilePath: "/studies/characters/kings/shunammite-woman.html",
                        references: ["2 Kings 4:8-37", "2 Kings 8:1-6"],
                        meaning: "Woman from Shunem",
                        summary: "Wealthy patron of Elisha, son raised from dead",
                        tags: ["Patron", "Faith", "Hospitality", "Resurrection", "Mother"],
                        hasProfile: true,
                        hasChiasm: true
                    },
                    {
                        id: "servant-girl-naaman",
                        name: "Naaman's Wife's Servant Girl",
                        hebrew: "נַעֲרָה קְטַנָּה",
                        gender: "female",
                        profilePath: "/studies/characters/kings/servant-girl-naaman.html",
                        references: ["2 Kings 5:2-4"],
                        meaning: "Young girl/little maiden",
                        summary: "Israelite captive who directed Naaman to Elisha for healing",
                        tags: ["Captive", "Child", "Faith", "Witness", "Forgiveness"],
                        hasProfile: true
                    },
                    {
                        id: "huldah",
                        name: "Huldah",
                        hebrew: "חֻלְדָּה",
                        gender: "female",
                        profilePath: "/studies/characters/kings/huldah.html",
                        references: ["2 Kings 22:14-20"],
                        meaning: "Weasel",
                        summary: "Prophetess consulted by King Josiah about the Book of the Law",
                        tags: ["Prophetess", "Authority", "Reform", "Judgment"],
                        hasProfile: false
                    },
                    {
                        id: "elijah",
                        name: "Elijah",
                        hebrew: "אֵלִיָּהוּ",
                        gender: "male",
                        profilePath: "/studies/characters/kings/elijah.html",
                        references: ["1 Kings 17:1-24", "1 Kings 18:1-46", "1 Kings 19:1-21", "1 Kings 21:17-29", "2 Kings 1:1-18", "2 Kings 2:1-11"],
                        meaning: "My God is Yahweh",
                        summary: "Greatest prophet of northern kingdom, confronted Ahab and Jezebel, taken to heaven in whirlwind",
                        tags: ["Prophet", "Miracle Worker", "Mount Carmel", "Translation"],
                        hasProfile: true,
                        multiPage: true
                    },
                    {
                        id: "elisha",
                        name: "Elisha",
                        hebrew: "אֱלִישָׁע",
                        gender: "male",
                        profilePath: "/studies/characters/kings/elisha.html",
                        references: ["1 Kings 19:16-21", "2 Kings 2:1-25", "2 Kings 4:1-44", "2 Kings 5:1-27", "2 Kings 6:1-33", "2 Kings 13:14-21"],
                        meaning: "God is salvation",
                        summary: "Elijah's successor, performed many miracles and helped common people",
                        tags: ["Prophet", "Miracle Worker", "Successor", "Double Portion"],
                        hasProfile: true,
                        multiPage: true
                    },
                    {
                        id: "jehu",
                        name: "Jehu",
                        hebrew: "יֵהוּא",
                        gender: "male",
                        profilePath: "/studies/characters/kings/jehu.html",
                        references: ["2 Kings 9:1-37", "2 Kings 10:1-36"],
                        meaning: "Yahweh is he",
                        summary: "Anointed king who destroyed Ahab's dynasty and killed Jezebel",
                        tags: ["King", "Reformer", "Divine Agent", "Judgment"],
                        hasProfile: true
                    },
                    {
                        id: "hezekiah",
                        name: "Hezekiah",
                        hebrew: "חִזְקִיָּהוּ",
                        gender: "male",
                        profilePath: "/studies/characters/kings/hezekiah.html",
                        references: ["2 Kings 18:1-37", "2 Kings 19:1-37", "2 Kings 20:1-21"],
                        meaning: "Yahweh strengthens",
                        summary: "Righteous king who trusted God against Assyrian invasion",
                        tags: ["King", "Reformer", "Faith", "Miraculous Deliverance"],
                        hasProfile: true,
                        multiPage: true
                    },
                    {
                        id: "josiah",
                        name: "Josiah",
                        hebrew: "יֹאשִׁיָּהוּ",
                        gender: "male",
                        profilePath: "/studies/characters/kings/josiah.html",
                        references: ["2 Kings 22:1-20", "2 Kings 23:1-30"],
                        meaning: "Yahweh supports",
                        summary: "Great reformer king who discovered the Book of the Law",
                        tags: ["King", "Reformer", "Law Discovery", "Passover Revival"],
                        hasProfile: true,
                        multiPage: true
                    },
                    {
                        id: "naaman",
                        name: "Naaman",
                        hebrew: "נַעֲמָן",
                        gender: "male",
                        profilePath: "/studies/characters/kings/naaman.html",
                        references: ["2 Kings 5:1-27"],
                        meaning: "Pleasant",
                        summary: "Syrian commander healed of leprosy by following Elisha's instructions",
                        tags: ["Syrian", "Military Leader", "Healing", "Conversion"],
                        hasProfile: true
                    }
                ]
            },
            
            // 1-2 Samuel data (matching expected structure)
            samuel: {
                book: {
                    id: "samuel",
                    name: "1-2 Samuel",
                    hebrew: "שְׁמוּאֵל",
                    hebrewTranslit: "Sh'muel"
                },
                characters: [
                    {
                        id: "hannah",
                        name: "Hannah",
                        hebrew: "חַנָּה",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/hannah.html",
                        references: ["1 Sam 1:1-28", "1 Sam 2:1-11", "1 Sam 2:18-21"],
                        meaning: "Grace, favor",
                        summary: "Barren woman whose fervent prayer led to Samuel's birth. Her song of praise became a model for the Magnificat.",
                        tags: ["Mother", "Worshipper", "Prayer Warrior", "Barren Woman", "Prophetess"],
                        hasProfile: true,
                        multiPage: true,
                        hasSong: true,
                        songPath: "/studies/women/song-of-songs/song-of-hannah.html"
                    },
                    {
                        id: "peninnah",
                        name: "Peninnah",
                        hebrew: "פְּנִנָּה",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/peninnah.html",
                        references: ["1 Sam 1:2-7"],
                        meaning: "Pearl, coral",
                        summary: "Elkanah's second wife who had children and provoked Hannah's barrenness",
                        tags: ["Rival Wife", "Mother", "Provocation"],
                        hasProfile: true
                    },
                    {
                        id: "medium-endor",
                        name: "Medium of En-dor",
                        hebrew: "בַּעֲלַת־אוֹב",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/medium-endor.html",
                        references: ["1 Sam 28:3-25"],
                        meaning: "Mistress of the spirit",
                        summary: "Necromancer consulted by Saul who summoned Samuel's spirit before his final battle",
                        tags: ["Occult", "Necromancer", "Forbidden Practice"],
                        hasProfile: true
                    },
                    {
                        id: "abigail",
                        name: "Abigail",
                        hebrew: "אֲבִיגַיִל",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/abigail.html",
                        references: ["1 Sam 25:1-44", "2 Sam 2:2", "2 Sam 3:3"],
                        meaning: "My father's joy",
                        summary: "Wise woman who prevented David from sinning by interceding for her foolish husband Nabal",
                        tags: ["Wise Woman", "Intercessor", "David's Wife", "Peacemaker"],
                        hasProfile: true,
                        multiPage: true
                    },
                    {
                        id: "michal",
                        name: "Michal",
                        hebrew: "מִיכַל",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/michal.html",
                        references: ["1 Sam 14:49", "1 Sam 18:17-29", "1 Sam 19:11-17", "1 Sam 25:44"],
                        meaning: "Who is like God?",
                        summary: "Saul's daughter who loved David, helped him escape, later given to another man",
                        tags: ["Princess", "David's Wife", "Love", "Protector"],
                        hasProfile: true
                    },
                    {
                        id: "bathsheba",
                        name: "Bathsheba",
                        hebrew: "בַּת־שֶׁבַע",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/bathsheba.html",
                        references: ["2 Sam 11:1-27", "2 Sam 12:15-25"],
                        meaning: "Daughter of oath/seven",
                        summary: "Woman David took in adultery, became his wife and mother of Solomon",
                        tags: ["David's Wife", "Adultery", "Solomon's Mother", "Tragedy"],
                        hasProfile: true,
                        multiPage: true
                    },
                    {
                        id: "tamar-david-daughter",
                        name: "Tamar",
                        hebrew: "תָּמָר",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/tamar-daughter-of-david.html",
                        references: ["2 Sam 13:1-22"],
                        meaning: "Palm tree",
                        summary: "David's daughter raped by her half-brother Amnon, avenged by Absalom",
                        tags: ["Princess", "Victim", "Amnon's Sister", "Beautiful"],
                        hasProfile: true
                    },
                    {
                        id: "rizpah",
                        name: "Rizpah",
                        hebrew: "רִצְפָּה",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/rizpah.html",
                        references: ["2 Sam 3:7", "2 Sam 21:8-11"],
                        meaning: "Hot stone",
                        summary: "Saul's concubine who protected her sons' bodies after execution",
                        tags: ["Concubine", "Mother", "Protector"],
                        hasProfile: true
                    },
                    {
                        id: "woman-of-abel-beth-maacah",
                        name: "Woman of Abel Beth-maacah",
                        hebrew: "אִשָּׁה חֲכָמָה",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/woman-of-abel-beth-maacah.html",
                        references: ["2 Sam 20:15-22"],
                        meaning: "Wise woman",
                        summary: "Wise woman who saved her city by handing over Sheba's head to Joab",
                        tags: ["Wise Woman", "City Savior", "Negotiator"],
                        hasProfile: true
                    },
                    {
                        id: "ahinoam-jezreel",
                        name: "Ahinoam of Jezreel",
                        hebrew: "אֲחִינֹעַם",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/ahinoam-jezreel.html",
                        references: ["1 Sam 25:43", "1 Sam 27:3", "1 Sam 30:5"],
                        meaning: "My brother is pleasant",
                        summary: "One of David's wives, taken captive by Amalekites and rescued",
                        tags: ["David's Wife", "Captive", "Jezreel"],
                        hasProfile: false
                    },
                    {
                        id: "merab",
                        name: "Merab",
                        hebrew: "מֵרַב",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/merab.html",
                        references: ["1 Sam 14:49", "1 Sam 18:17-19"],
                        meaning: "Increase",
                        summary: "Saul's eldest daughter, promised to David but given to Adriel",
                        tags: ["Princess", "Saul's Daughter"],
                        hasProfile: true
                    },
                    {
                        id: "tamar-absalom-daughter",
                        name: "Tamar (Absalom's daughter)",
                        hebrew: "תָּמָר",
                        gender: "female",
                        profilePath: "/studies/characters/samuel/tamar-daughter-of-absalom.html",
                        references: ["2 Sam 14:27"],
                        meaning: "Palm tree",
                        summary: "Absalom's beautiful daughter, named after his sister",
                        tags: ["Princess", "Beautiful", "Absalom's Daughter"],
                        hasProfile: true
                    },
                    {
                        id: "samuel",
                        name: "Samuel",
                        hebrew: "שְׁמוּאֵל",
                        gender: "male",
                        profilePath: "/studies/characters/samuel/samuel.html",
                        references: ["1 Sam 1:20", "1 Sam 3:1-21", "1 Sam 7:3-17", "1 Sam 8:1-22", "1 Sam 15:10-35", "1 Sam 16:1-13"],
                        meaning: "Name of God/Asked of God",
                        summary: "Last judge and first prophet, anointed both Saul and David as kings",
                        tags: ["Prophet", "Judge", "Priest", "Kingmaker", "Nazarite"],
                        hasProfile: true,
                        multiPage: true
                    },
                    {
                        id: "saul",
                        name: "Saul",
                        hebrew: "שָׁאוּל",
                        gender: "male",
                        profilePath: "/studies/characters/samuel/saul.html",
                        references: ["1 Sam 9:1-27", "1 Sam 10:1-27", "1 Sam 11:1-15", "1 Sam 13:1-23", "1 Sam 15:1-35", "1 Sam 28:3-25", "1 Sam 31:1-13"],
                        meaning: "Asked for/Requested",
                        summary: "First king of Israel, chosen by people's demand, rejected by God for disobedience",
                        tags: ["King", "Tragic Figure", "Disobedient", "Rejected"],
                        hasProfile: false
                    },
                    {
                        id: "david",
                        name: "David",
                        hebrew: "דָּוִד",
                        gender: "male",
                        profilePath: "/studies/characters/samuel/david.html",
                        references: ["1 Sam 16:1-23", "1 Sam 17:1-58", "2 Sam 1:1-24:25"],
                        meaning: "Beloved",
                        summary: "Shepherd boy anointed as king, giant-killer, musician, man after God's own heart who fell into sin",
                        tags: ["King", "Shepherd", "Musician", "Giant-killer", "Anointed", "Adulterer", "Repentant"],
                        hasProfile: false
                    },
                    {
                        id: "jonathan",
                        name: "Jonathan",
                        hebrew: "יְהוֹנָתָן",
                        gender: "male",
                        profilePath: "/studies/characters/samuel/jonathan.html",
                        references: ["1 Sam 13:2-3", "1 Sam 14:1-46", "1 Sam 18:1-4", "1 Sam 19:1-7", "1 Sam 20:1-42", "1 Sam 23:16-18"],
                        meaning: "Yahweh has given",
                        summary: "Saul's son and David's loyal friend who chose friendship over succession",
                        tags: ["Prince", "Friend", "Loyal", "Warrior", "Covenant"],
                        hasProfile: false
                    },
                    {
                        id: "goliath",
                        name: "Goliath",
                        hebrew: "גָּלְיָת",
                        gender: "male",
                        profilePath: "/studies/characters/samuel/goliath.html",
                        references: ["1 Sam 17:1-58"],
                        meaning: "Exile/Uncovered",
                        summary: "Philistine giant champion defeated by David with a sling and stone",
                        tags: ["Giant", "Philistine", "Enemy", "Champion"],
                        hasProfile: false
                    },
                    {
                        id: "absalom",
                        name: "Absalom",
                        hebrew: "אַבְשָׁלוֹם",
                        gender: "male",
                        profilePath: "/studies/characters/samuel/absalom.html",
                        references: ["2 Sam 13:1-39", "2 Sam 14:1-33", "2 Sam 15:1-37", "2 Sam 16:1-23", "2 Sam 17:1-29", "2 Sam 18:1-33"],
                        meaning: "Father is peace",
                        summary: "David's third son who rebelled against his father and was killed by Joab",
                        tags: ["Prince", "Rebel", "Avenger", "Beautiful", "Dead"],
                        hasProfile: false
                    },
                    {
                        id: "nathan-prophet",
                        name: "Nathan the Prophet",
                        hebrew: "נָתָן",
                        gender: "male",
                        profilePath: "/studies/characters/samuel/nathan.html",
                        references: ["2 Sam 7:1-29", "2 Sam 12:1-25"],
                        meaning: "Gift",
                        summary: "Prophet who gave David the covenant promises and confronted him about his sin with Bathsheba",
                        tags: ["Prophet", "Confronter", "Covenant Bearer"],
                        hasProfile: false
                    }
                ]
            }
        };
    }

    /**
     * Force display update after data load
     */
    forceDisplayUpdate() {
        // Make sure the book data section is visible
        setTimeout(() => {
            const bookSection = document.getElementById('book-data-section');
            const bookData = document.getElementById('book-data');
            const loading = document.getElementById('book-loading');
            
            if (bookSection && bookData && loading) {
                bookSection.style.display = 'block';
                loading.style.display = 'none';
                bookData.style.display = 'block';
                
                // Scroll to the section
                bookSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    }

    /**
     * Clear the cache
     */
    clearCache() {
        this.cache.clear();
    }
}

// Export for use as ES6 module
export default CharacterLoader;