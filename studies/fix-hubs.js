// ============================================
// VS Code Update Script for Biblical Character Hubs
// ============================================
// This script contains the fixes for both the Women's Hub and Characters Hub
// You can either:
// 1. Run this as a Node.js script to automatically update files
// 2. Copy the relevant sections manually into your files
// ============================================

const fs = require('fs');
const path = require('path');

// ============================================
// PART 1: CHARACTER DATA FOR CHARACTERS HUB
// ============================================
// Add this data to the characterData object in characters-hub.html

const characterDataToAdd = {
    genesis: {
        "book": "Genesis",
        "entries": [
            {
                "id": "adam",
                "display": "Adam",
                "script": {
                    "lang": "hebrew",
                    "text": "אָדָם",
                    "translit": "Adam"
                },
                "meaning": "Man/Mankind",
                "references": ["Gen 2-5"],
                "summary": "First human created by God, placed in Eden, father of humanity.",
                "tags": ["First Man", "Creation"],
                "gender": "male",
                "order_in_book": 1
            },
            {
                "id": "eve",
                "display": "Eve",
                "script": {
                    "lang": "hebrew",
                    "text": "חַוָּה",
                    "translit": "Chavvah"
                },
                "meaning": "Life or Living",
                "references": ["Gen 2:18–4:1"],
                "summary": "First woman, mother of all living, introduced themes of partnership, temptation, and human fall.",
                "tags": ["First Woman", "Mother of All"],
                "gender": "female",
                "order_in_book": 2
            },
            {
                "id": "abraham",
                "display": "Abraham",
                "script": {
                    "lang": "hebrew",
                    "text": "אַבְרָהָם",
                    "translit": "Avraham"
                },
                "meaning": "Father of Many Nations",
                "references": ["Gen 11-25"],
                "summary": "Father of faith, covenant recipient, and patriarch of Israel. His journey from Ur to Canaan exemplifies faith and obedience.",
                "tags": ["Patriarch", "Covenant", "Multi-page Study"],
                "gender": "male",
                "order_in_book": 3
            },
            {
                "id": "sarah",
                "display": "Sarah",
                "script": {
                    "lang": "hebrew",
                    "text": "שָׂרָה",
                    "translit": "Sarah"
                },
                "meaning": "Princess",
                "references": ["Gen 11-25"],
                "summary": "Mother of nations, wife of Abraham. Her story demonstrates faith through struggle with infertility and God's promise fulfillment.",
                "tags": ["Matriarch", "Covenant Figure"],
                "gender": "female",
                "order_in_book": 4
            },
            {
                "id": "hagar",
                "display": "Hagar",
                "script": {
                    "lang": "hebrew",
                    "text": "הָגָר",
                    "translit": "Hagar"
                },
                "meaning": "Flight or Stranger",
                "references": ["Gen 16, 21"],
                "summary": "Egyptian servant who became mother of Ishmael. Her encounters with God reveal His compassion for the marginalized.",
                "tags": ["Mother", "Foreign", "Marginalized"],
                "gender": "female",
                "order_in_book": 5
            },
            {
                "id": "isaac",
                "display": "Isaac",
                "script": {
                    "lang": "hebrew",
                    "text": "יִצְחָק",
                    "translit": "Yitzchak"
                },
                "meaning": "He Laughs",
                "references": ["Gen 21-35"],
                "summary": "Son of promise, father of Jacob and Esau, patriarch who carried forward the Abrahamic covenant.",
                "tags": ["Patriarch", "Son of Promise"],
                "gender": "male",
                "order_in_book": 6
            }
        ]
    },
    exodus: {
        "book": "Exodus",
        "entries": [
            {
                "id": "moses",
                "display": "Moses",
                "script": {
                    "lang": "hebrew",
                    "text": "מֹשֶׁה",
                    "translit": "Moshe"
                },
                "meaning": "Drawn Out",
                "references": ["Exodus-Deuteronomy"],
                "summary": "Prophet, lawgiver, and deliverer of Israel from Egypt. Central figure in the Exodus and covenant at Sinai.",
                "tags": ["Prophet", "Lawgiver", "Multi-page Study"],
                "gender": "male",
                "order_in_book": 1
            },
            {
                "id": "miriam",
                "display": "Miriam",
                "script": {
                    "lang": "hebrew",
                    "text": "מִרְיָם",
                    "translit": "Miryam"
                },
                "meaning": "Bitter or Rebellious",
                "references": ["Ex 2:1-10", "Ex 15:20-21"],
                "summary": "Prophetess, sister of Moses and Aaron, led women in worship after crossing the Red Sea.",
                "tags": ["Prophetess", "Leader", "Worship"],
                "gender": "female",
                "order_in_book": 2
            },
            {
                "id": "aaron",
                "display": "Aaron",
                "script": {
                    "lang": "hebrew",
                    "text": "אַהֲרֹן",
                    "translit": "Aharon"
                },
                "meaning": "Mountain of Strength",
                "references": ["Ex 4-Num 20"],
                "summary": "First High Priest of Israel, spokesman for Moses, brother of Moses and Miriam.",
                "tags": ["High Priest", "Leader"],
                "gender": "male",
                "order_in_book": 3
            }
        ]
    },
    judges: {
        "book": "Judges",
        "entries": [
            {
                "id": "deborah",
                "display": "Deborah",
                "script": {
                    "lang": "hebrew",
                    "text": "דְּבוֹרָה",
                    "translit": "Devorah"
                },
                "meaning": "Bee",
                "references": ["Judg 4-5"],
                "summary": "Prophet, judge, and military leader. The only female judge who led Israel to victory over Canaanite oppression.",
                "tags": ["Prophetess", "Judge", "Leader", "Multi-page Study"],
                "gender": "female",
                "order_in_book": 1
            },
            {
                "id": "gideon",
                "display": "Gideon",
                "script": {
                    "lang": "hebrew",
                    "text": "גִּדְעוֹן",
                    "translit": "Gid'on"
                },
                "meaning": "Mighty Warrior",
                "references": ["Judg 6-8"],
                "summary": "Judge who defeated the Midianites with 300 men, demonstrating God's power through weakness.",
                "tags": ["Judge", "Warrior"],
                "gender": "male",
                "order_in_book": 2
            },
            {
                "id": "samson",
                "display": "Samson",
                "script": {
                    "lang": "hebrew",
                    "text": "שִׁמְשׁוֹן",
                    "translit": "Shimshon"
                },
                "meaning": "Sun",
                "references": ["Judg 13-16"],
                "summary": "Judge with supernatural strength, Nazirite from birth, delivered Israel from Philistines.",
                "tags": ["Judge", "Nazirite", "Warrior"],
                "gender": "male",
                "order_in_book": 3
            },
            {
                "id": "delilah",
                "display": "Delilah",
                "script": {
                    "lang": "hebrew",
                    "text": "דְּלִילָה",
                    "translit": "Delilah"
                },
                "meaning": "Delicate or Weaken",
                "references": ["Judg 16"],
                "summary": "Philistine woman who betrayed Samson. Her story explores themes of deception, weakness, and divine sovereignty.",
                "tags": ["Betrayer", "Foreign"],
                "gender": "female",
                "order_in_book": 4
            }
        ]
    },
    hosea: {
        "book": "Hosea",
        "entries": [
            {
                "id": "gomer",
                "display": "Gomer",
                "script": {
                    "lang": "hebrew",
                    "text": "גֹּמֶר",
                    "translit": "Gomer"
                },
                "meaning": "Completion/Coming to an end",
                "references": ["Hosea 1-3"],
                "summary": "Wife of prophet Hosea, living metaphor of Israel's unfaithfulness to God. Her story of betrayal and redemption illustrates God's persistent love.",
                "tags": ["Wife", "Symbolic Figure", "Living Metaphor"],
                "gender": "female",
                "order_in_book": 1
            },
            {
                "id": "hosea",
                "display": "Hosea",
                "script": {
                    "lang": "hebrew",
                    "text": "הוֹשֵׁעַ",
                    "translit": "Hoshea"
                },
                "meaning": "Salvation",
                "references": ["Hosea 1-14"],
                "summary": "Prophet to the Northern Kingdom who lived out God's message through his marriage to unfaithful Gomer.",
                "tags": ["Prophet", "Husband"],
                "gender": "male",
                "order_in_book": 2
            }
        ]
    }
};

// ============================================
// PART 2: FIX FOR WOMEN'S HUB LOADING FUNCTION
// ============================================
// Replace the loadBookData function in women-bible-hub.html with this improved version

const improvedLoadBookDataFunction = `
function loadBookData(bookId) {
    // Find which section the book belongs to
    const clickedRow = document.querySelector(\`tr[data-book="\${bookId}"]\`);
    const parentSection = clickedRow?.closest('.sub-tab-content');
    
    // Check if this book has any women
    const womenCount = parseInt(clickedRow?.querySelector('td:last-child').textContent) || 0;
    
    // Determine which book data section to use based on parent
    let bookDataSection, loadingEl, dataEl;
    
    if (parentSection) {
        // Check if we're in Torah section
        if (parentSection.id === 'torah-category') {
            bookDataSection = document.getElementById('book-data-section');
            loadingEl = document.getElementById('book-loading');
            dataEl = document.getElementById('book-data');
        } 
        // For other sections, create a generic book data section if it doesn't exist
        else {
            let genericSection = parentSection.querySelector('.book-data-section-generic');
            if (!genericSection) {
                const sectionHTML = \`
                    <div class="book-data-section-generic" style="display: none;">
                        <div class="loading book-loading-generic">
                            <div class="loading-spinner"></div>
                        </div>
                        <div class="book-data-generic" style="display: none;">
                            <!-- Book content will be injected here -->
                        </div>
                    </div>
                \`;
                parentSection.insertAdjacentHTML('beforeend', sectionHTML);
                genericSection = parentSection.querySelector('.book-data-section-generic');
            }
            bookDataSection = genericSection;
            loadingEl = genericSection.querySelector('.book-loading-generic');
            dataEl = genericSection.querySelector('.book-data-generic');
        }
    }
    
    if (!bookDataSection || !loadingEl || !dataEl) {
        console.error('Could not find book data section elements');
        return;
    }
    
    // Show the book data section
    bookDataSection.style.display = 'block';
    loadingEl.style.display = 'flex';
    dataEl.style.display = 'none';
    
    // Simulate loading
    setTimeout(() => {
        // Check if this book has no women
        if (womenCount === 0) {
            dataEl.innerHTML = \`
                <div class="empty-state">
                    <div class="empty-state-icon">📖</div>
                    <div class="empty-state-text">No Women Recorded</div>
                    <div class="empty-state-subtext">This book does not contain any named or unnamed women</div>
                </div>
            \`;
            loadingEl.style.display = 'none';
            dataEl.style.display = 'block';
            bookDataSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }
        
        const bookData = bibleWomenData[bookId];
        
        if (bookData) {
            const named = bookData.entries.filter(e => e.type === 'named').sort((a, b) => a.order_in_book - b.order_in_book);
            const unnamed = bookData.entries.filter(e => e.type === 'unnamed').sort((a, b) => a.order_in_book - b.order_in_book);
            
            let html = \`<h3 class="section-title">\${bookData.book} Women</h3>\`;
            
            if (named.length > 0) {
                html += \`
                    <div class="section-header">
                        <h4 class="section-title">Named Women</h4>
                        <p class="section-subtitle">\${named.length} women with recorded names</p>
                    </div>
                    <div class="cards-grid">
                        \${named.map(entry => createTile(entry, bookId)).join('')}
                    </div>
                \`;
            }
            
            if (unnamed.length > 0) {
                html += \`
                    <div class="section-header">
                        <h4 class="section-title">Unnamed Women & Groups</h4>
                        <p class="section-subtitle">\${unnamed.length} women identified by role or relationship</p>
                    </div>
                    <div class="cards-grid">
                        \${unnamed.map(entry => createTile(entry, bookId)).join('')}
                    </div>
                \`;
            }
            
            dataEl.innerHTML = html;
        } else {
            dataEl.innerHTML = \`
                <div class="empty-state">
                    <div class="empty-state-icon">📚</div>
                    <div class="empty-state-text">Coming Soon</div>
                    <div class="empty-state-subtext">This book's profiles are being prepared</div>
                </div>
            \`;
        }
        
        loadingEl.style.display = 'none';
        dataEl.style.display = 'block';
        
        // Scroll to the data section
        bookDataSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 800);
}`;

// ============================================
// MANUAL UPDATE INSTRUCTIONS
// ============================================

console.log(`
============================================
MANUAL UPDATE INSTRUCTIONS FOR VS CODE
============================================

1. UPDATE CHARACTERS HUB (characters-hub.html):
   ----------------------------------------
   Find the line: const characterData = {
   
   Replace the empty object with the data above (characterDataToAdd)
   
   The object should now contain entries for:
   - Genesis (Adam, Eve, Abraham, Sarah, Hagar, Isaac)
   - Exodus (Moses, Miriam, Aaron)
   - Judges (Deborah, Gideon, Samson, Delilah)
   - Hosea (Gomer, Hosea)

2. UPDATE WOMEN'S HUB (women-bible-hub.html):
   ------------------------------------------
   Find the loadBookData function (around line 1350)
   
   Replace the entire function with the improved version above
   
   Key changes:
   - Checks for books with 0 women count
   - Shows appropriate message for books without women
   - Prevents errors when clicking on empty books

3. TEST THE FIXES:
   ---------------
   a) Characters Hub:
      - Click on "Hosea" in the Latter Prophets table
      - Should now show Gomer and Hosea profiles
      
   b) Women's Hub:
      - Click on "Leviticus" or "Deuteronomy" (0 women)
      - Should show "No Women Recorded" message
      - Click on "Hosea" (1 woman)
      - Should show Gomer's profile

4. OPTIONAL ENHANCEMENTS:
   ----------------------
   - Add more character data to other books
   - Create corresponding HTML files for each character
   - Add search functionality
   - Add filtering by tags

============================================
`);

// ============================================
// AUTOMATED FILE UPDATE (Optional - Node.js)
// ============================================
// Uncomment below to automatically update files


// Function to update characters-hub.html
function updateCharactersHub() {
    const filePath = path.join(__dirname, 'studies/characters/characters-hub.html');
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find and replace the characterData object
    const regex = /const characterData = \{[\s\S]*?\};/;
    const newData = `const characterData = ${JSON.stringify(characterDataToAdd, null, 8)};`;
    
    content = content.replace(regex, newData);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Updated characters-hub.html');
}

// Function to update women-bible-hub.html
function updateWomenHub() {
    const filePath = path.join(__dirname, 'studies/women/women-bible-hub.html');
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find and replace the loadBookData function
    const regex = /function loadBookData\(bookId\) \{[\s\S]*?^\s{8}\}/m;
    
    content = content.replace(regex, improvedLoadBookDataFunction);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Updated women-bible-hub.html');
}

// Run updates
try {
    updateCharactersHub();
    updateWomenHub();
    console.log('✅ All files updated successfully!');
} catch (error) {
    console.error('❌ Error updating files:', error);
    console.log('Please update manually using the instructions above.');
}
