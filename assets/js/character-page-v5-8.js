/**
 * Character Page v5.8 - Dynamic Mobile Tabs
 * Path: /assets/js/character-page-v5-8.js
 * Purpose: Enhanced page utilities with dynamic mobile section navigation
 * Version: 5.8.2 - Added Daniel study sections
 * Created: 2025-10-01
 * Updated: 2025-12-18 - Added Daniel multi-page study sections
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  
  /**
   * Section configuration with metadata for dynamic tab generation
   * Priority: 1 (highest) to 5 (lowest) - used when >5 sections exist
   */
  const sectionConfig = [
    // ============================================
    // TEMPLATE SECTIONS (from v5.8 template)
    // ============================================
    
    // Priority 1 - Core template sections
    { id: 'overview', icon: '', label: 'Overview', priority: 1 },
    { id: 'narrative', icon: '', label: 'Journey', priority: 1 },
    
    // Priority 2 - Standard character template sections
    { id: 'literary-context', icon: '', label: 'Literary', priority: 2 },
    { id: 'themes', icon: '', label: 'Themes', priority: 2 },
    { id: 'ane-context', icon: '', label: 'ANE', priority: 3 },
    { id: 'biblical-theology', icon: '', label: 'Theology', priority: 2 },
    { id: 'messianic', icon: '', label: 'Messianic', priority: 3 },
    { id: 'application', icon: '', label: 'Apply', priority: 3 },
    { id: 'questions', icon: '', label: 'Questions', priority: 4 },
    { id: 'bibliography', icon: '', label: 'Sources', priority: 5 },
    
    // ============================================
    // DANIEL MULTI-PAGE STUDY SECTIONS
    // ============================================
    
    // Navigation section (all Daniel pages)
    { id: 'navigation', icon: '', label: 'Navigate', priority: 4 },
    
    // Faithful Exile page (Daniel 1-6)
    { id: 'setting', icon: '', label: 'Setting', priority: 2 },
    { id: 'new-adam', icon: '', label: 'New Adam', priority: 1 },
    { id: 'nebuchadnezzar', icon: '', label: 'Nebuchadnezzar', priority: 2 },
    { id: 'third-way', icon: '', label: 'Third Way', priority: 2 },
    { id: 'nt-connections', icon: '', label: 'NT Links', priority: 3 },
    
    // Son of Man page (Daniel 7)
    { id: 'genesis-backstory', icon: '', label: 'Genesis', priority: 2 },
    { id: 'beasts', icon: '', label: 'Beasts', priority: 2 },
    { id: 'throne-room', icon: '', label: 'Throne', priority: 2 },
    { id: 'son-of-man', icon: '', label: 'Son of Man', priority: 1 },
    { id: 'neb-preview', icon: '', label: 'Neb Preview', priority: 3 },
    { id: 'interpretation', icon: '', label: 'Interpret', priority: 3 },
    { id: 'why-son-of-man', icon: '', label: 'Why Title', priority: 3 },
    { id: 'jesus', icon: '', label: 'Jesus', priority: 2 },
    
    // Prophetic Hope page (Daniel 8-12)
    { id: 'movement', icon: '', label: 'Movement', priority: 2 },
    { id: 'seventy-sevens', icon: '', label: '70 Sevens', priority: 1 },
    { id: 'imagery', icon: '', label: 'Imagery', priority: 3 },
    { id: 'resurrection', icon: '', label: 'Resurrection', priority: 2 },
    
    // ============================================
    // BOOK STUDY SECTIONS (Ruth, etc.)
    // ============================================
    
    // Common book overview sections
    { id: 'opening', icon: '', label: 'Opening', priority: 1 },
    { id: 'cast', icon: '', label: 'Cast', priority: 2 },
    { id: 'journey', icon: '', label: 'Journey', priority: 2 },
    { id: 'structure', icon: '', label: 'Structure', priority: 2 },
    { id: 'chiasm', icon: '', label: 'Chiasm', priority: 3 },
    { id: 'wordplay', icon: '', label: 'Wordplay', priority: 3 },
    { id: 'providence', icon: '', label: 'Providence', priority: 3 },
    { id: 'transformation', icon: '', label: 'Transform', priority: 3 },
    { id: 'major-chiasm', icon: '', label: 'Chiasm', priority: 3 },
    { id: 'literary-artistry', icon: '', label: 'Artistry', priority: 3 },
    { id: 'key-verses', icon: '', label: 'Verses', priority: 4 },
    { id: 'genealogy', icon: '', label: 'Genealogy', priority: 4 },
    { id: 'further-study', icon: '', label: 'Resources', priority: 5 },
    
    // Literary Design page specific sections
    { id: 'scene-rhythm', icon: '', label: 'Scene Rhythm', priority: 2 },
    { id: 'legal', icon: '', label: 'Legal', priority: 3 },
    { id: 'devices', icon: '', label: 'Devices', priority: 3 },
    { id: 'abrahamic', icon: '', label: 'Abrahamic', priority: 3 },
    { id: 'dialogue', icon: '', label: 'Dialogue', priority: 3 },
    { id: 'chorus', icon: '', label: 'Chorus', priority: 4 },
    { id: 'characters', icon: '', label: 'Characters', priority: 3 },
    
    // ============================================
    // WOMEN-SPECIFIC SECTIONS
    // ============================================
    { id: 'songs', icon: '', label: 'Songs', priority: 4 },
    { id: 'unique', icon: '', label: 'Unique', priority: 4 },
    
    // ============================================
    // THEMATIC SECTIONS
    // ============================================
    { id: 'eden', icon: '', label: 'Eden', priority: 4 },
    { id: 'covenant', icon: '', label: 'Covenant', priority: 4 },
    { id: 'second-temple', icon: '', label: '2nd Temple', priority: 5 },
    { id: 'intertext', icon: '', label: 'Intertext', priority: 4 },

    // ============================================
    // IMAGE OF GOD THEMATIC STUDY SECTIONS
    // ============================================
    // Overview page
    { id: 'models', icon: '', label: 'Models', priority: 2 },
    { id: 'literary-function', icon: '', label: 'Literary', priority: 2 },
    { id: 'ane-transformation', icon: '', label: 'ANE', priority: 3 },
    { id: 'historical-reception', icon: '', label: 'History', priority: 3 },
    { id: 'core-claims', icon: '', label: 'Core Claims', priority: 2 },
    { id: 'why-matters', icon: '', label: 'Why It Matters', priority: 2 },
    { id: 'bridge', icon: '', label: 'Navigation', priority: 4 },
    { id: 'quick-ref', icon: '', label: 'Quick Ref', priority: 3 },

    // NT Trajectory page
    { id: 'christ-image', icon: '', label: 'Christ', priority: 1 },
    { id: 'two-adams', icon: '', label: 'Two Adams', priority: 2 },
    { id: 'believers-renewed', icon: '', label: 'Renewed', priority: 2 },
    { id: 'new-humanity-vocation', icon: '', label: 'Vocation', priority: 2 },
    { id: 'already-not-yet', icon: '', label: 'Already/Not Yet', priority: 3 },
    { id: 'eschatology', icon: '', label: 'Eschatology', priority: 3 },
    { id: 'nt-synthesis', icon: '', label: 'Synthesis', priority: 3 },
    { id: 'nt-implications', icon: '', label: 'Today', priority: 2 },
    { id: 'nt-conclusion', icon: '', label: 'Conclusion', priority: 4 },

    // Royal-Priest-Prophet page
    { id: 'royal', icon: '', label: 'Royal', priority: 1 },
    { id: 'priestly', icon: '', label: 'Priestly', priority: 1 },
    { id: 'prophetic', icon: '', label: 'Prophetic', priority: 1 },
    { id: 'genesis-blueprint', icon: '', label: 'Genesis', priority: 2 },
    { id: 'eden-template', icon: '', label: 'Eden Template', priority: 3 },
    { id: 'vocation-integration', icon: '', label: 'Integration', priority: 2 },
    { id: 'israel-offices', icon: '', label: 'Israel', priority: 3 },
    { id: 'christ-fulfillment', icon: '', label: 'Fulfillment', priority: 2 },
    { id: 'believers-participation', icon: '', label: 'Participation', priority: 2 },
    { id: 'living-today', icon: '', label: 'Living Today', priority: 2 },
    { id: 'rpp-synthesis', icon: '', label: 'Synthesis', priority: 3 },
    { id: 'rpp-takeaway', icon: '', label: 'Takeaway', priority: 4 },

    // ANE Background page
    { id: 'mesopotamia', icon: '', label: 'Mesopotamia', priority: 1 },
    { id: 'egypt', icon: '', label: 'Egypt', priority: 1 },
    { id: 'canaan', icon: '', label: 'Canaan', priority: 2 },
    { id: 'genesis-transformation', icon: '', label: 'Transform', priority: 1 },
    { id: 'archaeological-evidence', icon: '', label: 'Evidence', priority: 3 },
    { id: 'ane-synthesis', icon: '', label: 'Synthesis', priority: 2 },

    // Literary Design page
    { id: 'forming-filling', icon: '', label: 'Form/Fill', priority: 1 },
    { id: 'chiasm-structure', icon: '', label: 'Chiasm', priority: 1 },
    { id: 'poetic-structure', icon: '', label: 'Poetry', priority: 2 },
    { id: 'genesis-2-symmetry', icon: '', label: 'Gen 2', priority: 2 },
    { id: 'number-seven', icon: '', label: 'Sevens', priority: 2 },
    { id: 'sabbath-climax', icon: '', label: 'Sabbath', priority: 1 },
    { id: 'canonical-resonances', icon: '', label: 'Canon', priority: 3 },
    { id: 'literary-implications', icon: '', label: 'Implications', priority: 3 },

    // Male & Female page
    { id: 'unity-in-difference', icon: '', label: 'Unity', priority: 1 },
    { id: 'shared-commission', icon: '', label: 'Commission', priority: 1 },
    { id: 'tough-texts', icon: '', label: 'Tough Texts', priority: 3 },
    { id: 'distortions-fall', icon: '', label: 'Fall', priority: 2 },
    { id: 'canonical-development', icon: '', label: 'Canon', priority: 2 },
    { id: 'mf-synthesis', icon: '', label: 'Synthesis', priority: 2 },
    { id: 'mf-implications', icon: '', label: 'Today', priority: 2 },

    // ============================================
    // HEBREW WORDPLAY PAGE SECTIONS (Ruth, etc.)
    // ============================================
    { id: 'quick-reference', icon: '', label: 'Quick Ref', priority: 1 },
    { id: 'abraham-parallel', icon: '', label: 'Abraham', priority: 2 },
    { id: 'key-words', icon: '', label: 'Keywords', priority: 2 },
    { id: 'shuv', icon: '', label: 'Return', priority: 2 },
    { id: 'hesed', icon: '', label: 'Hesed', priority: 1 },
    { id: 'davaq', icon: '', label: 'Clinging', priority: 3 },
    { id: 'wings', icon: '', label: 'Wings', priority: 3 },
    { id: 'goel', icon: '', label: 'Redeemer', priority: 2 },
    { id: 'names', icon: '', label: 'Names', priority: 3 },
    { id: 'rest', icon: '', label: 'Rest', priority: 3 },
    { id: 'artistry', icon: '', label: 'Artistry', priority: 4 },
    { id: 'torah', icon: '', label: 'Torah Links', priority: 1 },
    { id: 'genesis', icon: '', label: 'Genesis Echoes', priority: 2 },
    { id: 'wisdom', icon: '', label: 'Wisdom', priority: 2 },
    { id: 'threads', icon: '', label: 'Threads', priority: 3 },
    { id: 'ot-intertext', icon: '', label: 'OT Intertext', priority: 3 },
    { id: 'nt-intertext', icon: '', label: 'NT Intertext', priority: 3 },
    { id: 'synthesis', icon: '', label: 'Synthesis', priority: 2 },
    { id: 'redemption', icon: '', label: 'Redemption', priority: 1 },
    { id: 'inclusion', icon: '', label: 'Inclusion', priority: 2 },
    { id: 'fullness', icon: '', label: 'Fullness', priority: 2 },
    { id: 'hiddenness', icon: '', label: 'Hiddenness', priority: 3 },

    // Ruth Study Kit Specific Sections
    { id: 'introduction', icon: '', label: 'Intro', priority: 1 },
    { id: 'session1', icon: '', label: 'Session 1', priority: 1 },
    { id: 'session2', icon: '', label: 'Session 2', priority: 1 },
    { id: 'session3', icon: '', label: 'Session 3', priority: 1 },
    { id: 'session4', icon: '', label: 'Session 4', priority: 1 },
    { id: 'assessment', icon: '', label: 'Assessment', priority: 2 },
    { id: 'resources', icon: '', label: 'Resources', priority: 3 },
    { id: 'further-study', icon: '', label: 'Study More', priority: 4 },

    // ============================================
    // NOAH MULTI-PAGE STUDY SECTIONS
    // ============================================

    
    // HUB SECTION (Overview, Significance, Pattern, etc.)
    { id: 'hub-overview', icon: '', label: 'Overview', priority: 1 },
    { id: 'significance', icon: '', label: 'Why Matters', priority: 1 },
    { id: 'pattern', icon: '', label: 'Pattern', priority: 2 },
    { id: 'pages', icon: '', label: 'Pages', priority: 1 },
    { id: 'timeline', icon: '', label: 'Timeline', priority: 3 },
    { id: 'bridge-forward', icon: '', label: 'Bridge', priority: 3 },
    { id: 'theology-summary', icon: '', label: 'Theology', priority: 2 },
    { id: 'source-note', icon: '', label: 'Foundations', priority: 4 },
    { id: 'notes', icon: '', label: 'Notes', priority: 5 },
    
    // Page 1: Overview
    { id: 'introduction', icon: '', label: 'Intro', priority: 1 },
    { id: 'name-meaning', icon: '', label: 'Name', priority: 1 },
    { id: 'genesis5-design', icon: '', label: 'Gen 5', priority: 2 },
    { id: 'walked-with-god', icon: '', label: 'Walked', priority: 1 },
    { id: 'grace-first', icon: '', label: 'Grace', priority: 1 },
    { id: 'new-adam', icon: '', label: 'New Adam', priority: 1 },
    { id: 'seed-hope', icon: '', label: 'Seed', priority: 2 },
    { id: 'key-verses', icon: '', label: 'Verses', priority: 4 },

    // Page 2: Corruption
    { id: 'sons-of-god', icon: '', label: 'Sons of God', priority: 2 },
    { id: 'violence', icon: '', label: 'Violence', priority: 1 },
    { id: 'gods-grief', icon: '', label: 'God\'s Grief', priority: 1 },
    { id: 'flood-decision', icon: '', label: 'Judgment', priority: 2 },

    // Page 3: Election
    { id: 'introduction', icon: '', label: 'Why Chosen?', priority: 1 },
    { id: 'genealogy', icon: '', label: '10 Generations', priority: 1 },
    { id: 'two-seeds', icon: '', label: 'Two Seeds', priority: 2 },
    { id: 'tested', icon: '', label: 'Tested', priority: 1 },
    { id: 'one-for-many', icon: '', label: 'One for Many', priority: 1 },
    { id: 'name-prophecy', icon: '', label: 'Name Prophecy', priority: 2 },
    { id: 'quilt-insert', icon: '', label: 'Quilt Insert', priority: 3 },
    { id: 'key-verses', icon: '', label: 'Key Verses', priority: 4 },

    // Page 4: The Ark
    { id: 'tebah', label: 'The Word', priority: 1 },
    { id: 'three-tiers', label: '3 Tiers', priority: 2 },
    { id: 'dimensions', label: 'Dimensions', priority: 3 },
    { id: 'microcosm', label: 'Microcosm', priority: 2 },
    { id: 'refuge', label: 'God = Ark', priority: 1 },
    { id: 'jesus-storm', label: 'Jesus', priority: 3 },
    { id: 'tupos', label: 'Pattern', priority: 2 },
    { id: 'cosmic-hyperbole', label: 'Language', priority: 3 },
    { id: 'meaning', label: 'Meaning', priority: 1 },

    // Page 5: The Flood
    { id: 'cosmic-collapse', icon: '', label: 'Collapse', priority: 1 },
    { id: 'overwhelm', icon: '', label: 'Overwhelm', priority: 2 },
    { id: 'pivot', icon: '', label: 'Pivot', priority: 1 },
    { id: 'genesis-replay', icon: '', label: 'Genesis 1', priority: 1 },
    { id: 'ararat', icon: '', label: 'Ararat', priority: 2 },
    { id: 'birds', icon: '', label: 'Birds', priority: 2 },
    { id: 'isaiah54', icon: '', label: 'Isaiah 54', priority: 3 },
    { id: 'bridge-forward', icon: '', label: 'Forward', priority: 4 },

    // Page 6: Covenant
    { id: 'sacrifice', icon: '', label: 'Sacrifice', priority: 1 },
    { id: 'concessions', icon: '', label: 'Concessions', priority: 2 },
    { id: 'rainbow', icon: '', label: 'Rainbow', priority: 1 },
    { id: 'priest', icon: '', label: 'Priest', priority: 3 },
    { id: 'next', icon: '', label: 'Next', priority: 4 },
    { id: 'bridge-babel', icon: '', label: 'To Babel', priority: 4 },

    // Page 7: Babel
    { id: 'cycle', icon: '', label: 'Cycle', priority: 1 },
    { id: 'ham', icon: '', label: 'Ham', priority: 1 },
    { id: 'blessing-curse', icon: '', label: 'Blessing', priority: 1 },
    { id: 'scattered', icon: '', label: 'Scattered', priority: 2 },
    { id: 'nations', icon: '', label: 'Nations', priority: 2 },
    { id: 'nimrod', icon: '', label: 'Nimrod', priority: 1 },
    { id: 'babel', icon: '', label: 'Babel', priority: 1 },
    { id: 'abraham', icon: '', label: 'Abraham', priority: 1 },
    { id: 'key-verses', icon: '', label: 'Verses', priority: 4 },

    // Page 8: Sources & Notes
    { id: 'how-to-use', icon: '', label: 'How to Use', priority: 1 },
    { id: 'primary-sources', icon: '', label: 'Primary', priority: 1 },
    { id: 'commentaries', icon: '', label: 'Commentary', priority: 2 },
    { id: 'ane-context', icon: '', label: 'ANE', priority: 2 },
    { id: 'additional', icon: '', label: 'Additional', priority: 3 },
    { id: 'citation-notes', icon: '', label: 'Notes', priority: 3 },
    { id: 'reading-approach', icon: '', label: 'Approach', priority: 4 },

    // ============================================
    // HOSEA THEOLOGY PAGE SECTIONS (Covenant, Sin, etc.)
    // ============================================
    { id: 'foundation', icon: '', label: 'Foundation', priority: 1 },
    { id: 'knowledge', icon: '', label: 'Knowledge', priority: 1 },
    { id: 'relationship', icon: '', label: 'Relationship', priority: 2 },
    { id: 'dynamics', icon: '', label: 'Dynamics', priority: 2 },
    { id: 'breakdown', icon: '', label: 'Breakdown', priority: 2 },
    { id: 'failure', icon: '', label: 'Failure', priority: 3 },
    { id: 'lawsuit', icon: '', label: 'Lawsuit', priority: 2 },
    { id: 'renewal', icon: '', label: 'Renewal', priority: 1 },

  // ============================================
    // RESURRECTION AS REVELATION STUDY SECTIONS
    // ============================================
    
    // Hub page
    { id: 'parts', icon: '', label: 'Parts', priority: 1 },
    { id: 'double-revelation', icon: '', label: 'Double Rev', priority: 1 },
    { id: 'functions', icon: '', label: 'Functions', priority: 2 },
    { id: 'anchor-texts', icon: '', label: 'Anchor Texts', priority: 2 },
    { id: 'context', icon: '', label: 'Context', priority: 3 },

    // Part 1 - Ephesians
    { id: 'thesis', icon: '', label: 'Thesis', priority: 1 },
    { id: 'beneath', icon: '', label: 'Beneath', priority: 2 },
    { id: 'double-revelation', icon: '', label: 'Double Rev', priority: 1 },
    { id: 'ephesians-apocalypse', icon: '', label: 'Apocalypse', priority: 2 },
    { id: 'ephesians', icon: '', label: 'Ephesians', priority: 1 },
    { id: 'next', icon: '', label: 'Next', priority: 4 },
  
    // Part 2 - 1 Corinthians
    { id: 'diagnosis', icon: '', label: 'Diagnosis', priority: 1 },
    { id: 'anchors', icon: '', label: 'Anchors', priority: 2 },
    { id: 'discipline', icon: '', label: 'Discipline', priority: 2 },
    { id: 'chapter15', icon: '', label: 'Ch 15', priority: 1 },
    { id: 'honorshame', icon: '', label: 'Honor/Shame', priority: 2 },
    { id: 'problems', icon: '', label: 'Problems', priority: 3 },
    { id: 'how-it-solves', icon: '', label: 'Solution', priority: 2 },
    { id: 'bridge', icon: '', label: 'Bridge', priority: 4 },
    { id: 'sources', icon: '', label: 'Sources', priority: 5 },

    // Part 3 - 1 Timothy
    { id: 'formation', icon: '', label: 'Formation', priority: 1 },
    { id: 'context', icon: '', label: 'Context', priority: 2 },
    { id: 'creed', icon: '', label: 'Creed', priority: 1 },
    { id: 'two-ages', icon: '', label: 'Two Ages', priority: 2 },
    { id: 'mystery', icon: '', label: 'Mystery', priority: 1 },
    { id: 'household', icon: '', label: 'Household', priority: 2 },
    { id: 'eternal', icon: '', label: 'Eternal Life', priority: 2 },
    { id: 'credibility', icon: '', label: 'Credibility', priority: 3 },
    { id: 'bridge', icon: '', label: 'Bridge', priority: 4 },
    { id: 'sources', icon: '', label: 'Sources', priority: 5 },
    
    // Part 4 - 2 Timothy
    { id: 'endurance', icon: '', label: 'Endurance', priority: 1 },
    { id: 'chains', icon: '', label: 'Chains', priority: 2 },
    { id: 'completion', icon: '', label: 'Completion', priority: 2 },
    { id: 'suffering', icon: '', label: 'Suffering', priority: 2 },
    { id: 'shame', icon: '', label: 'Shame', priority: 2 },
    { id: 'false-teachers', icon: '', label: 'False Teachers', priority: 2 },
    { id: 'lens', icon: '', label: 'Reading Lens', priority: 3 },
    { id: 'closing', icon: '', label: 'Final Word', priority: 4 },
    { id: 'metaphors', icon: '', label: 'Metaphors', priority: 2 },
    { id: 'scripture', icon: '', label: 'Scripture', priority: 2 },

    // ============================================
    // WORKFLOW / PROCESS PAGES (Ultra-Compact)
    // ============================================

    { id: 'sources', label: 'Sources', priority: 1 },

    { id: 'stage1', label: 'Overview',  priority: 1 },
    { id: 'stage2', label: 'Text',      priority: 1 },
    { id: 'stage3', label: 'Structure', priority: 1 },
    { id: 'stage4', label: 'Context',   priority: 1 },
    { id: 'stage5', label: 'Meaning',   priority: 1 },

    // Lower priority → trimmed first on small screens
    { id: 'stage6', label: 'Canon',     priority: 2 },
    { id: 'stage7', label: 'Practice',  priority: 2 },

    { id: 'legend',  label: 'Legend',   priority: 3 },
    { id: 'explore', label: 'Explore',  priority: 1 }
  ];
  
  // ============================================
  // AUTO-GENERATED SECTION LABELS (fallback)
  // ============================================

  function getSectionLabel(section) {
    const heading = section.querySelector('h2, h3, h4');
    if (heading) return heading.textContent.trim();

    return section.id
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  // ============================================
  // MOBILE TABS CLASS
  // ============================================
  
  class MobileSectionTabs {
    constructor() {
      this.sections = [];
      this.currentSection = null;
      this.isScrolling = false;
      this.lastScrollY = 0;
      this.tabsContainer = null;
      this.tabsElement = null;
      
      // Touch handling
      this.touchStartX = 0;
      this.touchEndX = 0;
      
      // Initialize if on mobile
      if (this.isMobile()) {
        this.init();
      }
      
      // Re-check on resize
      window.addEventListener('resize', this.debounce(() => {
        if (this.isMobile() && !this.tabsElement) {
          this.init();
        } else if (!this.isMobile() && this.tabsElement) {
          this.destroy();
        }
      }, 250));
    }
    
    /**
     * Check if device is mobile
     */
    isMobile() {
      return window.innerWidth <= 768 || ('ontouchstart' in window);
    }
    

/**
 * Initialize mobile tabs
 */
init() {
  this.detectSections();
  
  if (this.sections.length > 0) {
    this.createTabsElement();
    this.generateTabs();
    this.attachListeners();
    this.observeSections();
    this.handleScrollVisibility();
    
    // Add class to body for CSS adjustments
    document.body.classList.add('has-mobile-tabs');
    
    // Show with animation
    setTimeout(() => {
      this.tabsElement.classList.add('slide-in');
    }, 100);
  }
}
    
    /**
 * Detect all sections with IDs on the page - ENHANCED VERSION
    */
    detectSections() {
      const foundSections = [];

      // Expanded selectors to catch more section types
      const sectionSelectors = [
        '.theology-card[id]',
        '.chiasm-card[id]',
        '.hook-section[id]',
        '.transformation-ribbon[id]',
        '.characters-section[id]',
        '.study-nav[id]',
        '.providence-note[id]',
        '.abrahamic-parallel[id]',
        '.chorus-card[id]',
        '.devices-card[id]',
        '.legal-card[id]',
        '.structure-card[id]',
        '.content-section[id]',
        '.models-grid[id]',
        '.ethics-box[id]',
        '.transformation-box[id]',
        '.christ-focus[id]',
        '.two-adams-comparison[id]',
        '.renewal-process[id]',
        '.already-not-yet[id]',
        '.eschatological-vision[id]',
        '.vocation-cards[id]',
        '.integration-box[id]',
        '.christ-box[id]',
        '.eden-blueprint[id]',
        '.application-box[id]',
        'section[id]',
        'div[id]'
      ];

      sectionSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
          const id = element.id;
          if (!id) return;

          // Prevent duplicates across overlapping selectors
          if (foundSections.find(s => s.id === id)) return;

          // Pull from config if present; otherwise auto-generate
          const config = sectionConfig.find(s => s.id === id);

          foundSections.push({
            id,
            element,
            icon: config?.icon || '',
            label: config?.label || getSectionLabel(element),
            priority: config?.priority ?? 99
          });
        });
      });

      // Sort by document order (your existing approach)
      foundSections.sort((a, b) => {
        const posA = a.element.getBoundingClientRect().top;
        const posB = b.element.getBoundingClientRect().top;
        return posA - posB;
      });

      // If more than 7 sections, prioritize (your existing behavior)
      if (foundSections.length > 7) {
        this.sections = this.prioritizeSections(foundSections);
      } else {
        this.sections = foundSections;
      }

      console.log(`MobileTabs: Found ${foundSections.length} sections, using ${this.sections.length}`);
      if (this.sections.length > 0) {
        console.log('Active sections:', this.sections.map(s => `${s.label} (#${s.id})`).join(', '));
      }
    }
    
    /**
     * Prioritize sections when more than 5 exist
     */
    prioritizeSections(sections) {
      // Always include priority 1 sections
      const priority1 = sections.filter(s => s.priority === 1);
      const remaining = sections.filter(s => s.priority > 1);
      
      // Sort remaining by priority, then by document order
      remaining.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        // If same priority, maintain document order
        return sections.indexOf(a) - sections.indexOf(b);
      });
      
      // Build final list
      const finalSections = [...priority1];
      const spotsLeft = 7 - finalSections.length;

      // Add remaining sections up to 7 total
      finalSections.push(...remaining.slice(0, spotsLeft));
      
      // Re-sort by document order for display
      finalSections.sort((a, b) => {
        const posA = a.element.getBoundingClientRect().top;
        const posB = b.element.getBoundingClientRect().top;
        return posA - posB;
      });
      
      return finalSections;
    }
    
/**
 * Create the tabs container element
 */
createTabsElement() {
  this.tabsElement = document.createElement('nav');
  this.tabsElement.className = 'mobile-section-tabs active';
  this.tabsElement.setAttribute('role', 'navigation');
  this.tabsElement.setAttribute('aria-label', 'Section navigation');
  
  // NO inline styles - let CSS handle everything!
  
  this.tabsContainer = document.createElement('div');
  this.tabsContainer.className = 'tabs-container';
  
  this.tabsElement.appendChild(this.tabsContainer);
  document.body.appendChild(this.tabsElement);
}
    
    /**
     * Generate tab elements
     */
    generateTabs() {
      this.sections.forEach((section, index) => {
        const tab = document.createElement('button');
        tab.className = 'tab-item';
        tab.setAttribute('data-target', `#${section.id}`);
        tab.setAttribute('aria-label', `${section.label} section`);
        tab.setAttribute('role', 'tab');
        tab.setAttribute('tabindex', '0');
        
        // Check if icon exists and is not empty
        if (section.icon && section.icon.trim() !== '') {
          // Version with icon
          tab.innerHTML = `
            <span class="tab-icon" aria-hidden="true">${section.icon}</span>
            <span class="tab-label">${section.label}</span>
          `;
        } else {
          // Text-only version for cleaner look
          tab.innerHTML = `
            <span class="tab-label-only">${section.label}</span>
          `;
        }
        
        // First tab is active by default
        if (index === 0) {
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.setAttribute('aria-selected', 'false');
        }
        
        // Store reference on section object
        section.tab = tab;
        
        this.tabsContainer.appendChild(tab);
      });
      
      // Check for scroll indicators
      this.updateScrollIndicators();
    }
    
    /**
 * Enhanced attachListeners() method for MobileSectionTabs class
 * Replace the existing attachListeners() method with this version
 */
attachListeners() {
  let isScrolling = false;
  let scrollTimeout;
  let touchStartTime;
  let touchStartX;
  let touchStartY;
  
  // Track scroll state
  this.tabsContainer.addEventListener('scroll', () => {
    this.tabsContainer.classList.add('is-scrolling');
    isScrolling = true;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      this.tabsContainer.classList.remove('is-scrolling');
      isScrolling = false;
    }, 150); // Wait 150ms after scroll ends
    
    this.updateScrollIndicators();
  }, { passive: true });
  
  // Enhanced touch handling to differentiate scroll from tap
  this.tabsContainer.addEventListener('touchstart', (e) => {
    touchStartTime = Date.now();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    this.touchStartX = e.changedTouches[0].screenX; // For swipe detection
  }, { passive: true });
  
  this.tabsContainer.addEventListener('touchend', (e) => {
    const touchEndTime = Date.now();
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    this.touchEndX = e.changedTouches[0].screenX; // For swipe detection
    
    // Calculate touch duration and movement
    const touchDuration = touchEndTime - touchStartTime;
    const horizontalMove = Math.abs(touchEndX - touchStartX);
    const verticalMove = Math.abs(touchEndY - touchStartY);
    
    // If it was a quick tap with minimal movement, handle as click
    if (touchDuration < 300 && horizontalMove < 10 && verticalMove < 10) {
      const tab = e.target.closest('.tab-item');
      if (tab && !isScrolling) {
        const targetId = tab.getAttribute('data-target').substring(1);
        const section = this.sections.find(s => s.id === targetId);
        if (section) {
          this.scrollToSection(section);
          this.setActiveTab(tab);
        }
      }
    } else if (horizontalMove > 50) {
      // Handle horizontal swipe for section navigation
      this.handleSwipe();
    }
    
    e.preventDefault(); // Prevent click event from firing
  }, { passive: false });
  
  // Prevent regular click events - only use touch events on mobile
  this.tabsContainer.addEventListener('click', (e) => {
    // Only handle clicks on non-touch devices
    if (!('ontouchstart' in window)) {
      const tab = e.target.closest('.tab-item');
      if (tab && !isScrolling) {
        const targetId = tab.getAttribute('data-target').substring(1);
        const section = this.sections.find(s => s.id === targetId);
        if (section) {
          this.scrollToSection(section);
          this.setActiveTab(tab);
        }
      }
    } else {
      // On touch devices, prevent click events
      e.preventDefault();
      e.stopPropagation();
    }
  });
  
  // Keyboard navigation (unchanged)
  this.tabsContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      this.handleKeyboardNav(e);
    }
  });
}
    
    /**
     * Handle swipe gestures for section navigation
     */
    handleSwipe() {
      const swipeDistance = this.touchEndX - this.touchStartX;
      const minSwipeDistance = 50;
      
      if (Math.abs(swipeDistance) < minSwipeDistance) return;
      
      const currentIndex = this.sections.findIndex(s => s.tab.classList.contains('active'));
      let newIndex;
      
      if (swipeDistance > 0) {
        // Swipe right - go to previous section
        newIndex = Math.max(0, currentIndex - 1);
      } else {
        // Swipe left - go to next section
        newIndex = Math.min(this.sections.length - 1, currentIndex + 1);
      }
      
      if (newIndex !== currentIndex) {
        this.scrollToSection(this.sections[newIndex]);
        this.setActiveTab(this.sections[newIndex].tab);
      }
    }
    
    /**
     * Handle keyboard navigation
     */
    handleKeyboardNav(e) {
      const tabs = Array.from(this.tabsContainer.querySelectorAll('.tab-item'));
      const currentTab = document.activeElement;
      const currentIndex = tabs.indexOf(currentTab);
      
      if (currentIndex === -1) return;
      
      let newIndex;
      if (e.key === 'ArrowLeft') {
        newIndex = Math.max(0, currentIndex - 1);
      } else {
        newIndex = Math.min(tabs.length - 1, currentIndex + 1);
      }
      
      tabs[newIndex].focus();
      tabs[newIndex].click();
    }
    
    /**
     * Scroll to a section
     */
    scrollToSection(section) {
      const offset = 20; // Small offset from top since nav isn't sticky
      const elementTop = section.element.getBoundingClientRect().top;
      const scrollTop = window.pageYOffset + elementTop - offset;
      
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
    
    /**
     * Set active tab
     */
    setActiveTab(tab) {
      // Remove active from all tabs
      this.sections.forEach(s => {
        s.tab.classList.remove('active');
        s.tab.setAttribute('aria-selected', 'false');
      });
      
      // Add active to current tab
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      // Ensure tab is visible in container
      this.ensureTabVisible(tab);
    }
    
    /**
     * Ensure active tab is visible in scrollable container
     */
    ensureTabVisible(tab) {
      const container = this.tabsContainer;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerScroll = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      
      if (tabLeft < containerScroll) {
        container.scrollTo({
          left: tabLeft - 20,
          behavior: 'smooth'
        });
      } else if (tabLeft + tabWidth > containerScroll + containerWidth) {
        container.scrollTo({
          left: tabLeft + tabWidth - containerWidth + 20,
          behavior: 'smooth'
        });
      }
    }
    
    /**
     * Update scroll indicators
     */
    updateScrollIndicators() {
      const container = this.tabsContainer;
      const isAtStart = container.scrollLeft <= 10;
      const isAtEnd = container.scrollLeft >= (container.scrollWidth - container.offsetWidth - 10);
      
      this.tabsElement.classList.toggle('scroll-start', !isAtStart);
      this.tabsElement.classList.toggle('scroll-end', !isAtEnd);
      this.tabsElement.classList.toggle('scroll-middle', !isAtStart && !isAtEnd);
    }
    
    /**
 * Observe sections for intersection
 */
observeSections() {
  // More aggressive intersection detection for better scroll tracking
  const options = {
    root: null,
    rootMargin: '-20% 0% -70% 0%',  // Top 20% to 30% of viewport
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]  // More granular detection
  };
  
  const observer = new IntersectionObserver((entries) => {
    let mostVisibleSection = null;
    let highestRatio = 0;
    
    // Find the most visible section
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
        highestRatio = entry.intersectionRatio;
        mostVisibleSection = entry.target;
      }
    });
    
    // Update active tab for most visible section
    if (mostVisibleSection) {
      const section = this.sections.find(s => s.element === mostVisibleSection);
      if (section && section.tab) {
        this.setActiveTab(section.tab);
      }
    }
  }, options);
  
  // Observe all sections
  this.sections.forEach(section => {
    observer.observe(section.element);
  });
  
  // ALSO ADD: Backup scroll listener for better detection
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollPos = window.pageYOffset + (window.innerHeight * 0.3);  // Look at top 30% of viewport
      
      // Find which section we're in
      let activeSection = null;
      this.sections.forEach(section => {
        const rect = section.element.getBoundingClientRect();
        const sectionTop = rect.top + window.pageYOffset;
        const sectionBottom = sectionTop + rect.height;
        
        if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
          activeSection = section;
        }
      });
      
      // If no section contains scroll position, find the closest one
      if (!activeSection) {
        let closestDistance = Infinity;
        this.sections.forEach(section => {
          const rect = section.element.getBoundingClientRect();
          const sectionTop = rect.top + window.pageYOffset;
          const distance = Math.abs(scrollPos - sectionTop);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            activeSection = section;
          }
        });
      }
      
      // Update active tab
      if (activeSection && activeSection.tab) {
        this.setActiveTab(activeSection.tab);
      }
    }, 100);  // Debounce for performance
  });
}
    
    /**
     * Handle scroll visibility (keep tabs always visible for better UX)
     */
    handleScrollVisibility() {
      // Tabs stay visible always - no hiding on scroll
      // This provides better navigation UX
    }
    
    /**
     * Destroy mobile tabs
     */
    destroy() {
      if (this.tabsElement) {
        this.tabsElement.remove();
        this.tabsElement = null;
        this.tabsContainer = null;
      }
      
      document.body.classList.remove('has-mobile-tabs');
      this.sections = [];
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
  }

  // ============================================
  // EXISTING CHARACTER PAGE FUNCTIONALITY
  // ============================================
  
  // Utility: safe query helpers
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  
  // Reading progress indicator
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = $('.reading-progress');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });
  
  // Debounced scroll handler for nav and back-to-top
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
      const nav = document.querySelector('#main-nav');
      const backToTop = $('.back-to-top');
      
      if (window.scrollY > 100) {
        nav?.classList.add('scrolled');
      } else {
        nav?.classList.remove('scrolled');
      }
      
      // Back to top button visibility
      if (window.scrollY > 500) {
        backToTop?.classList.add('visible');
      } else {
        backToTop?.classList.remove('visible');
      }
    });
  });
  
  // Intersection Observer for section animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Apply to all animated cards
  $$('.animate-on-scroll').forEach(card => {
    animationObserver.observe(card);
  });
  
  // Smooth scrolling for anchor links
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = $(this.getAttribute('href'));
      if (target) {
        // Close mobile menu if open
        $('.mobile-menu-toggle')?.classList.remove('active');
        $('.nav-links')?.classList.remove('active');
        $('.mobile-menu-toggle')?.setAttribute('aria-expanded', 'false');
        
        // Scroll to target
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Quick Navigation Sidebar (Desktop)
  const buildQuickNav = () => {
    const quickNavSidebar = $('.quick-nav-sidebar');
    if (!quickNavSidebar || window.innerWidth <= 1400) return;
    
    // Find all sections
    const sections = $$('.theology-card[id], .chiasm-card[id], .hook-section[id], .transformation-ribbon[id], .content-section[id], .models-grid[id], .ethics-box[id], .transformation-box[id], .christ-focus[id], .two-adams-comparison[id], .renewal-process[id], .already-not-yet[id], .eschatological-vision[id], .vocation-cards[id], .integration-box[id], .christ-box[id], .eden-blueprint[id], .application-box[id], [id^="section-"]');
    
    // Clear existing items
    quickNavSidebar.innerHTML = '';
    
    // Create nav items
    sections.forEach(section => {
      const id = section.id;
      const heading = section.querySelector('h3, h2');
      const label = heading ? heading.textContent.trim() : id;
      
      const navItem = document.createElement('div');
      navItem.className = 'quick-nav-item';
      navItem.setAttribute('data-label', label);
      navItem.setAttribute('data-target', `#${id}`);
      
      navItem.addEventListener('click', () => {
        const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
      
      quickNavSidebar.appendChild(navItem);
    });
    
    // Highlight active section in quick nav
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      $$('.quick-nav-item').forEach(item => {
        item.classList.remove('active');
        const target = item.getAttribute('data-target');
        if (target === `#${current}`) {
          item.classList.add('active');
        }
      });
    });
  };
  
  // Enhanced table scroll for mobile
  $$('table').forEach(table => {
    if (!table.parentElement.classList.contains('table-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('table-wrapper');
      wrapper.style.overflowX = 'auto';
      wrapper.style.webkitOverflowScrolling = 'touch';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
  
  // Performance optimization - Debounce resize events
  let resizeTimeout;
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
      // Re-check mobile menu state
      if (window.innerWidth > 768) {
        $('.mobile-menu-toggle')?.classList.remove('active');
        $('.nav-links')?.classList.remove('active');
        $('.mobile-menu-toggle')?.setAttribute('aria-expanded', 'false');
      }
      
      // Rebuild quick nav if needed
      if (window.innerWidth > 1400) {
        buildQuickNav();
      }
    }, 250);
  });
  
  // Print optimization
  window.addEventListener('beforeprint', () => {
    // Expand all sections for printing
    $$('.animate-on-scroll').forEach(section => {
      section.classList.add('visible');
    });
    $$('.timeline-item').forEach(item => {
      item.classList.add('loaded');
    });
    
    // Expand bibliography if collapsed
    const bibliography = $('.bibliography-section');
    if (bibliography) {
      bibliography.setAttribute('open', 'true');
    }
  });
  
  // Bibliography expand/collapse smooth animation
  const bibliographyDetails = $('.bibliography-section');
  if (bibliographyDetails) {
    bibliographyDetails.addEventListener('toggle', (e) => {
      const indicator = bibliographyDetails.querySelector('.expand-indicator');
      if (indicator) {
        if (bibliographyDetails.open) {
          indicator.style.transform = 'rotate(180deg)';
        } else {
          indicator.style.transform = 'rotate(0deg)';
        }
      }
    });
  }
  
  // ============================================
  // INITIALIZATION
  // ============================================
  
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Character Page v5.8.2 initialized - With Daniel study sections');
    
    // Initialize mobile tabs
    window.mobileTabs = new MobileSectionTabs();
    
    // Build desktop quick nav
    buildQuickNav();
    
    // Log detected sections for debugging
    if (window.mobileTabs && window.mobileTabs.sections.length > 0) {
      console.log('Mobile tabs created for sections:', 
        window.mobileTabs.sections.map(s => `${s.label} (#${s.id})`).join(', '));
    } else {
      console.log('No mobile tabs created - no matching sections found');
    }
  });
  
  // Expose utilities globally if needed
  window.__pcq = { $, $$ };
  
})();