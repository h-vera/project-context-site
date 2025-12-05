/**
 * Hub Core JavaScript Module
 * Path: /assets/js/hub-core.js
 * Handles all hub functionality for both characters and women hubs
 * Updated to handle multi-page character studies with subdirectories
 */

class HubCore {
    constructor(options = {}) {
        this.type = options.type || 'characters'; // 'characters' or 'women'
        this.filterGender = options.filterGender || null; // null, 'male', or 'female'
        this.loader = null;
        this.currentBook = null;
        this.initialized = false;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    async init() {
        if (this.initialized) return;
        
        try {
            // Import the CharacterLoader module
            const { default: CharacterLoader } = await import('./character-loader.js');
            this.loader = new CharacterLoader({ 
                filterGender: this.filterGender 
            });
            
            // Initialize the loader and get manifest
            await this.loader.initialize();
            
            // Setup all event listeners
            this.setupEventListeners();
            
            // Animate stats if they exist
            this.animateStats();
            
            // Load featured characters
            this.loadFeaturedCharacters();
            
            // Setup mobile menu - commented out becuase of migration to nav component w/ cosmic eye
            //this.setupMobileMenu();
            
            // Setup scroll effects
            this.setupScrollEffects();
            
            this.initialized = true;
            
        } catch (error) {
            console.error('Failed to initialize hub:', error);
            this.showError('Failed to initialize. Please refresh the page.');
        }
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Main tab switching (Tanakh vs New Testament)
        document.querySelectorAll('.main-tab-button').forEach(button => {
            button.addEventListener('click', (e) => this.handleMainTabClick(e));
        });

        // Sub-tab switching (Torah, Prophets, Writings)
        document.querySelectorAll('.sub-tab-button').forEach(button => {
            button.addEventListener('click', (e) => this.handleSubTabClick(e));
        });

        // Book row clicks
        document.querySelectorAll('tr[data-book]').forEach(row => {
            row.addEventListener('click', (e) => this.handleBookClick(e));
        });

        // Quick link smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleAnchorClick(e));
        });
    }

    /**
     * Handle main tab clicks
     */
    handleMainTabClick(event) {
        const button = event.currentTarget;
        const section = button.dataset.section;
        
        // Update active states
        document.querySelectorAll('.main-tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Show/hide content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetContent = document.getElementById(`${section}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    /**
     * Handle sub-tab clicks
     */
    handleSubTabClick(event) {
        const button = event.currentTarget;
        const category = button.dataset.category;
        
        // Find the parent nav group
        const navGroup = button.closest('.sub-tabs-nav');
        
        // Update active states within this group only
        navGroup.querySelectorAll('.sub-tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Hide all sub-tab-content
        document.querySelectorAll('.sub-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show the selected category
        const targetContent = document.getElementById(`${category}-category`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    /**
     * Handle book row clicks
     */
    async handleBookClick(event) {
        const row = event.currentTarget;
        const bookId = row.dataset.book;
        
        if (!bookId) return;
        
        // Prevent multiple clicks
        if (this.currentBook === bookId && this.isLoading) return;
        
        this.currentBook = bookId;
        await this.loadBookCharacters(bookId);
    }

    /**
     * Handle anchor link clicks for smooth scrolling
     */
    handleAnchorClick(event) {
        event.preventDefault();
        const target = document.querySelector(event.currentTarget.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Load and display book characters
     */
    async loadBookCharacters(bookId) {
        const section = document.getElementById('book-data-section');
        const loading = document.getElementById('book-loading');
        const dataEl = document.getElementById('book-data');
        
        if (!section || !loading || !dataEl) {
            console.error('Required elements not found');
            return;
        }
        
        // Show loading state
        section.style.display = 'block';
        loading.style.display = 'flex';
        dataEl.style.display = 'none';
        this.isLoading = true;
        
        try {
            // Load book data (already filtered by CharacterLoader if filterGender is set)
            const data = await this.loader.loadBook(bookId);
            
            if (!data || !data.characters || data.characters.length === 0) {
                // Customize message based on filter
                let emptyMessage = 'No Characters Found';
                let emptySubtext = 'This book doesn\'t have any character profiles yet';
                
                if (this.filterGender === 'female') {
                    emptyMessage = 'No Women Recorded';
                    emptySubtext = 'This book does not contain any women profiles';
                } else if (this.filterGender === 'male') {
                    emptyMessage = 'No Men Recorded';
                    emptySubtext = 'This book does not contain any men profiles';
                }
                
                dataEl.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📚</div>
                        <div class="empty-state-text">${emptyMessage}</div>
                        <div class="empty-state-subtext">${emptySubtext}</div>
                    </div>
                `;
            } else {
                // Render character cards
                this.renderCharacterCards(data, dataEl);
            }
            
            // Hide loading, show data
            loading.style.display = 'none';
            dataEl.style.display = 'block';
            
            // Smooth scroll to content
            setTimeout(() => {
                section.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
            
        } catch (error) {
            console.error('Error loading book:', error);
            dataEl.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">⚠️</div>
                    <div class="empty-state-text">Failed to Load Characters</div>
                    <div class="empty-state-subtext">Please try again or refresh the page</div>
                </div>
            `;
            loading.style.display = 'none';
            dataEl.style.display = 'block';
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Render character cards in the data element
     * FIXED: Now properly respects the filterGender setting
     */
    renderCharacterCards(data, container) {
        const bookName = data.book?.name || 'Book';
        const bookId = data.book?.id || 'book';
        
        // CRITICAL FIX: Respect the gender filter
        // If filterGender is set, only show that gender
        // If not set, show all characters separated by gender
        
        let html = '';
        
        if (this.filterGender === 'female') {
            // Women's hub - only show women
            const women = data.characters.filter(c => c.gender === 'female');
            
            if (women.length === 0) {
                html = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📖</div>
                        <div class="empty-state-text">No Women in ${bookName}</div>
                        <div class="empty-state-subtext">This book does not contain any women profiles</div>
                    </div>
                `;
            } else {
                // Separate named and unnamed women
                const named = women.filter(w => !w.tags?.includes('Unnamed'));
                const unnamed = women.filter(w => w.tags?.includes('Unnamed'));
                
                html = `<h3 class="section-title">Women in ${bookName}</h3>`;
                
                if (named.length > 0) {
                    html += `
                        <div class="section-header">
                            <h4 class="section-title">Named Women</h4>
                            <p class="section-subtitle">${named.length} women with recorded names</p>
                        </div>
                        <div class="cards-grid">
                            ${named.map(char => this.createCharacterCard(char, bookId)).join('')}
                        </div>
                    `;
                }
                
                if (unnamed.length > 0) {
                    html += `
                        <div class="section-header">
                            <h4 class="section-title">Unnamed Women</h4>
                            <p class="section-subtitle">${unnamed.length} women identified by role or relationship</p>
                        </div>
                        <div class="cards-grid">
                            ${unnamed.map(char => this.createCharacterCard(char, bookId)).join('')}
                        </div>
                    `;
                }
            }
            
        } else if (this.filterGender === 'male') {
            // Men only filter - only show men
            const men = data.characters.filter(c => c.gender === 'male');
            
            html = `<h3 class="section-title">Men in ${bookName}</h3>`;
            
            if (men.length > 0) {
                html += `
                    <div class="cards-grid">
                        ${men.map(char => this.createCharacterCard(char, bookId)).join('')}
                    </div>
                `;
            } else {
                html = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📖</div>
                        <div class="empty-state-text">No Men in ${bookName}</div>
                        <div class="empty-state-subtext">This book does not contain any men profiles</div>
                    </div>
                `;
            }
            
        } else {
            // No filter - show all characters separated by gender (original behavior)
            const men = data.characters.filter(c => c.gender === 'male');
            const women = data.characters.filter(c => c.gender === 'female');
            const unknown = data.characters.filter(c => !c.gender || c.gender === 'unknown');
            
            html = `<h3 class="section-title">${bookName} Characters</h3>`;
            
            // Render men section if exists
            if (men.length > 0) {
                html += `
                    <div class="section-header">
                        <h4 class="section-title">Men</h4>
                        <p class="section-subtitle">${men.length} male character${men.length > 1 ? 's' : ''}</p>
                    </div>
                    <div class="cards-grid">
                        ${men.map(char => this.createCharacterCard(char, bookId)).join('')}
                    </div>
                `;
            }
            
            // Render women section if exists
            if (women.length > 0) {
                html += `
                    <div class="section-header">
                        <h4 class="section-title">Women</h4>
                        <p class="section-subtitle">${women.length} female character${women.length > 1 ? 's' : ''}</p>
                    </div>
                    <div class="cards-grid">
                        ${women.map(char => this.createCharacterCard(char, bookId)).join('')}
                    </div>
                `;
            }
            
            // Render unknown/other section if exists
            if (unknown.length > 0) {
                html += `
                    <div class="section-header">
                        <h4 class="section-title">Other Characters</h4>
                        <p class="section-subtitle">${unknown.length} character${unknown.length > 1 ? 's' : ''}</p>
                    </div>
                    <div class="cards-grid">
                        ${unknown.map(char => this.createCharacterCard(char, bookId)).join('')}
                    </div>
                `;
            }
        }
        
        container.innerHTML = html;
        
        // Animate cards in
        this.animateCardEntrance();
    }

    /**
     * Build the correct path for a character profile
     * Handles multi-page studies that have subdirectories
     */
    buildCharacterPath(character, bookId) {
        // If character has explicit profilePath, use it
        if (character.profilePath) {
            return character.profilePath;
        }
        
        // If character has multiPage flag, it's in a subdirectory
        if (character.multiPage) {
            return `/studies/characters/${bookId}/${character.id}/${character.id}.html`;
        }
        
        // Standard single-page character
        return `/studies/characters/${bookId}/${character.id}.html`;
    }

    /**
     * Create a single character card HTML
     */
    createCharacterCard(character, bookId) {
        const hebrewText = character.hebrew ? 
            `<span class="hebrew">${character.hebrew}</span>` : '';
        
        const tags = (character.tags || []).map(tag => {
            const tagClass = this.getTagClass(tag);
            return `<span class="tag ${tagClass}">${tag}</span>`;
        }).join('');
        
        const references = Array.isArray(character.references) ? 
            character.references.join(', ') : character.references || '';
        
        const meta = character.meaning ? 
            `${character.meaning} • ${references}` : references;
        
        // Build the correct path
        const href = this.buildCharacterPath(character, bookId);
        
        // Add song link for women with songs
        const songLink = character.hasSong && character.songPath ? 
            `<a href="${character.songPath}" class="song-link" title="View Song">
                <span>🎵</span> Song
            </a>` : '';
        
        return `
            <article class="study-card" style="opacity: 0;">
                <a href="${href}" class="study-card-link">
                    <div class="study-card-header">
                        <h4 class="study-card-title">
                            ${character.name} ${hebrewText}
                        </h4>
                        <div class="study-card-tags">${tags}</div>
                    </div>
                    <div class="study-card-body">
                        <p class="study-card-meta">${meta}</p>
                        <p class="study-card-desc">${character.summary || ''}</p>
                    </div>
                    <div class="study-card-arrow">
                        <svg viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                    </div>
                </a>
                ${songLink}
            </article>
        `;
    }

    /**
     * Get appropriate tag class based on tag content
     */
    getTagClass(tag) {
        const lowerTag = tag.toLowerCase();
        if (lowerTag.includes('group') || lowerTag.includes('unnamed')) {
            return 'group';
        }
        if (lowerTag.includes('warning') || lowerTag.includes('antagonist')) {
            return 'warning';
        }
        return '';
    }

    /**
     * Animate card entrance
     */
    animateCardEntrance() {
        const cards = document.querySelectorAll('.study-card[style*="opacity: 0"]');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }, index * 50); // 50ms stagger
        });
    }

    /**
     * Load featured characters
     * Updated to respect gender filter
     */
    async loadFeaturedCharacters() {
        const featuredGrid = document.getElementById('featured-grid');
        if (!featuredGrid) return;
        
        let featured = [];
        
        if (this.filterGender === 'female') {
            // Women-only featured characters
            featured = [
                { 
                    book: 'judges', 
                    id: 'deborah', 
                    name: 'Deborah', 
                    hebrew: 'דְּבוֹרָה',
                    desc: 'Prophet, judge, and military leader. The only female judge who led Israel to victory over Canaanite oppression.',
                    meta: 'Judges 4-5 • Multi-page Study',
                    multiPage: true
                },
                { 
                    book: 'genesis', 
                    id: 'sarah', 
                    name: 'Sarah', 
                    hebrew: 'שָׂרָה',
                    desc: 'Mother of nations, wife of Abraham. Her story demonstrates faith through struggle with infertility and God\'s promise fulfillment.',
                    meta: 'Genesis 11-25 • Complete Profile',
                    multiPage: false
                },
                { 
                    book: 'ruth', 
                    id: 'ruth', 
                    name: 'Ruth', 
                    hebrew: 'רוּת',
                    desc: 'Moabite woman whose loyalty and faithfulness led to her becoming great-grandmother of King David.',
                    meta: 'Book of Ruth • Complete Profile',
                    multiPage: false
                },
                { 
                    book: 'exodus', 
                    id: 'miriam', 
                    name: 'Miriam', 
                    hebrew: 'מִרְיָם',
                    desc: 'Prophetess and sister of Moses who led women in worship after crossing the Red Sea.',
                    meta: 'Exodus • Complete Profile',
                    multiPage: false
                },
                { 
                    book: 'genesis', 
                    id: 'hagar', 
                    name: 'Hagar', 
                    hebrew: 'הָגָר',
                    desc: 'Egyptian servant who became mother of Ishmael. Her encounters with God reveal His compassion for the marginalized.',
                    meta: 'Genesis 16, 21 • Complete Profile',
                    multiPage: false
                },
                { 
                    book: 'judges', 
                    id: 'delilah', 
                    name: 'Delilah', 
                    hebrew: 'דְּלִילָה',
                    desc: 'Philistine woman who betrayed Samson. Her story explores themes of deception, weakness, and divine sovereignty.',
                    meta: 'Judges 16 • Complete Profile',
                    multiPage: false
                }
            ];
        } else {
            // Default featured characters (mixed gender or all)
            featured = [
                { 
                    book: 'genesis', 
                    id: 'abraham', 
                    name: 'Abraham', 
                    hebrew: 'אַבְרָהָם',
                    desc: 'Father of faith, covenant recipient, and patriarch of Israel. His journey from Ur to Canaan exemplifies faith and obedience.',
                    meta: 'Genesis 11-25 • Multi-page Study',
                    multiPage: true
                },
                { 
                    book: 'genesis', 
                    id: 'sarah', 
                    name: 'Sarah', 
                    hebrew: 'שָׂרָה',
                    desc: 'Mother of nations, wife of Abraham. Her story demonstrates faith through struggle with infertility and God\'s promise fulfillment.',
                    meta: 'Genesis 11-25 • Complete Profile',
                    multiPage: false
                },
                { 
                    book: 'samuel', 
                    id: 'david', 
                    name: 'David', 
                    hebrew: 'דָּוִד',
                    desc: 'Shepherd boy anointed as king, giant-killer, musician, man after God\'s own heart who fell into sin.',
                    meta: '1-2 Samuel • Multi-page Study',
                    multiPage: true
                },
                { 
                    book: 'judges', 
                    id: 'deborah', 
                    name: 'Deborah', 
                    hebrew: 'דְּבוֹרָה',
                    desc: 'Prophet, judge, and military leader. The only female judge who led Israel to victory over Canaanite oppression.',
                    meta: 'Judges 4-5 • Multi-page Study',
                    multiPage: true
                },
                { 
                    book: 'genesis', 
                    id: 'hagar', 
                    name: 'Hagar', 
                    hebrew: 'הָגָר',
                    desc: 'Egyptian servant who became mother of Ishmael. Her encounters with God reveal His compassion for the marginalized.',
                    meta: 'Genesis 16, 21 • Complete Profile',
                    multiPage: false
                },
                { 
                    book: 'judges', 
                    id: 'delilah', 
                    name: 'Delilah', 
                    hebrew: 'דְּלִילָה',
                    desc: 'Philistine woman who betrayed Samson. Her story explores themes of deception, weakness, and divine sovereignty.',
                    meta: 'Judges 16 • Complete Profile',
                    multiPage: false
                }
            ];
        }
        
        // Render featured cards with correct paths
        const html = featured.map(char => {
            // Build the correct path based on whether it's multi-page
            const href = char.multiPage 
                ? `/studies/characters/${char.book}/${char.id}/${char.id}.html`
                : `/studies/characters/${char.book}/${char.id}.html`;
            
            return `
                <a href="${href}" class="character-card">
                    <div class="character-header">
                        <div class="character-name">
                            ${char.name} 
                            <span class="character-hebrew">${char.hebrew}</span>
                        </div>
                    </div>
                    <div class="character-body">
                        <p class="character-desc">${char.desc}</p>
                        <div class="character-meta">${char.meta}</div>
                    </div>
                </a>
            `;
        }).join('');
        
        featuredGrid.innerHTML = html;
    }

    /**
     * Animate hero stats
     */
    animateStats() {
        document.querySelectorAll('[data-target]').forEach(stat => {
            const target = parseInt(stat.dataset.target);
            if (isNaN(target)) return;
            
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        });
    }

    /**
     * Setup mobile menu functionality
     */
    setupMobileMenu() {
        const toggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (!toggle || !navLinks) return;
        
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                toggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    /**
     * Setup scroll effects
     */
    setupScrollEffects() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = window.requestAnimationFrame(() => {
                const nav = document.getElementById('main-nav');
                if (nav) {
                    if (window.scrollY > 100) {
                        nav.classList.add('scrolled');
                    } else {
                        nav.classList.remove('scrolled');
                    }
                }
            });
        });
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorHtml = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <div class="empty-state-text">Error</div>
                <div class="empty-state-subtext">${message}</div>
            </div>
        `;
        
        // Try to find a suitable container
        const container = document.getElementById('book-data') || 
                         document.querySelector('.container');
        if (container) {
            container.innerHTML = errorHtml;
        } else {
            console.error(message);
        }
    }
}

// Make available globally for non-module usage
if (typeof window !== 'undefined') {
    window.HubCore = HubCore;
}

export default HubCore;