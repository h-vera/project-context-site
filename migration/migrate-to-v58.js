/**
 * HYBRID MIGRATION SCRIPT: v5.4-5.7 to v5.8
 * Path: /migration/migrate-to-v58.js
 * Purpose: Properly migrate biblical character templates to v5.8
 * Version: 4.0.0 - HYBRID VERSION
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const cheerio = require('cheerio');

// Configuration
const CONFIG = {
  backupSuffix: '-backup-v57',
  logFile: './migration-log.txt',
  testMode: false,
  verbose: true,
  templatePath: path.join(process.cwd(), 'templates/biblical-characters-template-v5.8.html'),
  
  // File patterns to find templates
  patterns: [
    '**/studies/characters/**/*.html',
    '**/studies/women/**/*.html',
    '!**/*backup*.html',
    '!**/*test*.html',
    '!**/*template*.html'
  ]
};

// Migration statistics
const stats = {
  total: 0,
  migrated: 0,
  skipped: 0,
  errors: 0,
  backedUp: 0
};

// Logging utilities
const log = {
  info: (msg) => {
    console.log(chalk.blue('ℹ'), msg);
    appendToLog(`INFO: ${msg}`);
  },
  success: (msg) => {
    console.log(chalk.green('✔'), msg);
    appendToLog(`SUCCESS: ${msg}`);
  },
  warning: (msg) => {
    console.log(chalk.yellow('⚠'), msg);
    appendToLog(`WARNING: ${msg}`);
  },
  error: (msg) => {
    console.log(chalk.red('✖'), msg);
    appendToLog(`ERROR: ${msg}`);
  },
  verbose: (msg) => {
    if (CONFIG.verbose) {
      console.log(chalk.gray('  →'), chalk.gray(msg));
    }
    appendToLog(`VERBOSE: ${msg}`);
  }
};

function appendToLog(msg) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(CONFIG.logFile, `[${timestamp}] ${msg}\n`);
}

/**
 * Check if file is already migrated to v5.8
 */
function isAlreadyMigrated(html) {
  const checks = [
    html.includes('global-v3.css'),
    html.includes('nav-premium.js'),
    html.includes('character-page-v2.js'),
    html.includes('template-version" content="5.8"')
  ];
  
  return checks.filter(Boolean).length >= 3;
}

/**
 * HYBRID EXTRACTION - Captures all content types
 */
function extractContent($) {
  const contentData = {
    // Character info from title and meta
    characterName: '',
    bookName: '',
    hebrewName: '',
    
    // Meta tags
    description: '',
    gender: 'male',
    profileType: 'single-page',
    characterId: '',
    bookId: '',
    
    // Body content sections - preserve everything
    sections: {},
    specialSections: {}, // For non-standard sections
    
    // Original body classes
    bodyClasses: ''
  };
  
  // ========================================
  // PHASE 1: Extract metadata
  // ========================================
  
  // Extract from title
  const title = $('title').text();
  const titleMatch = title.match(/^([^–]+)\s*–\s*[^|]+\|\s*(.+)$/);
  if (titleMatch) {
    contentData.characterName = titleMatch[1].trim();
    contentData.bookName = titleMatch[2].trim();
  }
  
  // Extract meta description
  contentData.description = $('meta[name="description"]').attr('content') || '';
  
  // Extract character metadata
  contentData.gender = $('meta[name="character-gender"]').attr('content') || 'male';
  contentData.profileType = $('meta[name="profile-type"]').attr('content') || 'single-page';
  contentData.characterId = $('meta[name="character-id"]').attr('content') || 
                           $('[data-character-id]').data('character-id') || '';
  contentData.bookId = $('meta[name="book-id"]').attr('content') || 
                       $('[data-book]').data('book') || '';
  
  // Extract body classes
  contentData.bodyClasses = $('body').attr('class') || '';
  
  // Extract Hebrew/Greek name
  const hebrewSpan = $('.hebrew-large, .hebrew').first();
  if (hebrewSpan.length) {
    contentData.hebrewName = hebrewSpan.text().trim();
  }
  
  // ========================================
  // PHASE 2: Extract known sections
  // ========================================
  
  const sectionIds = [
    'character-title',
    'overview',
    'narrative', 
    'literary-context',
    'themes',
    'major-chiasm',
    'ane-context',
    'eden',
    'wordplay',
    'covenant',
    'unique',
    'biblical-theology',
    'messianic',
    'second-temple',
    'songs',
    'intertext',
    'application',
    'questions'
  ];
  
  // Extract standard theology-card sections
  $('.theology-card, .animate-on-scroll').each(function() {
    const id = $(this).attr('id');
    if (id && !contentData.sections[id]) {
      contentData.sections[id] = $.html(this);
      log.verbose(`Extracted section: ${id}`);
    }
  });
  
  // Extract by ID if not already captured
  sectionIds.forEach(id => {
    if (!contentData.sections[id]) {
      const section = $(`#${id}`);
      if (section.length) {
        if (section.hasClass('theology-card') || section.hasClass('section')) {
          contentData.sections[id] = $.html(section);
        } else {
          const parent = section.closest('.theology-card, .section, div[id]');
          if (parent.length) {
            contentData.sections[id] = $.html(parent);
          }
        }
        log.verbose(`Extracted additional section: ${id}`);
      }
    }
  });
  
  // ========================================
  // PHASE 3: Extract special/custom sections
  // ========================================
  
  // 1. Character Title Section (h2 with character name)
  const characterTitle = $('h2#character-title, .section-title').first();
  if (characterTitle.length && !contentData.sections['character-title']) {
    contentData.sections['character-title'] = $.html(characterTitle);
    log.verbose('Extracted character title');
  }
  
  // 2. Character Type Badge
  const characterBadge = $('.character-type-badge');
  if (characterBadge.length) {
    contentData.specialSections['character-badge'] = $.html(characterBadge);
    log.verbose('Extracted character type badge');
  }
  
  // 3. Complexity Indicator
  const complexityIndicator = $('.complexity-indicator');
  if (complexityIndicator.length) {
    contentData.specialSections['complexity-indicator'] = $.html(complexityIndicator);
    log.verbose('Extracted complexity indicator');
  }
  
  // 4. Textual Clarification / Warning boxes
  $('.theology-card').each(function() {
    const $this = $(this);
    const style = $this.attr('style');
    
    // Check for warning box styling
    if (style && (style.includes('#fffbf0') || style.includes('#f0ad4e'))) {
      // This is likely a warning/clarification box
      const heading = $this.find('h4').text();
      if (heading.includes('Textual') || heading.includes('Clarification') || heading.includes('⚠️')) {
        contentData.specialSections['textual-clarification'] = $.html($this);
        log.verbose('Extracted textual clarification box');
      }
    }
  });
  
  // 5. Related Profiles / Cross References
  $('.theology-card').each(function() {
    const $this = $(this);
    const heading = $this.find('h3').text().toLowerCase();
    if ((heading.includes('related') || heading.includes('profiles')) && 
        !contentData.specialSections['related-profiles']) {
      contentData.specialSections['related-profiles'] = $.html($this);
      log.verbose('Extracted related profiles section');
    }
  });
  
  // 6. Tables Grid
  const tablesGrid = $('.grid-2').filter(function() {
    return $(this).find('table').length > 0;
  });
  if (tablesGrid.length && !contentData.sections['tables']) {
    contentData.sections['tables'] = $.html(tablesGrid);
    log.verbose('Extracted tables section');
  }
  
  // 7. Bibliography
  const bibliography = $('.bibliography-section, details').filter(function() {
    const text = $(this).text().toLowerCase();
    const summaryText = $(this).find('summary').text().toLowerCase();
    return text.includes('bibliography') || summaryText.includes('bibliography');
  });
  if (bibliography.length && !contentData.sections['bibliography']) {
    contentData.sections['bibliography'] = $.html(bibliography);
    log.verbose('Extracted bibliography section');
  }
  
  // ========================================
  // PHASE 4: Capture orphaned content (safety net)
  // ========================================
  
  const capturedElements = new Set();
  
  // Mark all already captured elements
  Object.values(contentData.sections).forEach(html => {
    const $section = $(html);
    const id = $section.attr('id');
    if (id) capturedElements.add(id);
  });
  Object.values(contentData.specialSections).forEach(html => {
    const $section = $(html);
    const classes = $section.attr('class');
    if (classes) capturedElements.add(classes);
  });
  
  // Find any direct children of main that weren't captured
  $('main > *').each(function() {
    const $this = $(this);
    const id = $this.attr('id');
    const classes = $this.attr('class') || '';
    const tagName = $this.prop('tagName').toLowerCase();
    
    // Skip if already captured
    if (id && capturedElements.has(id)) return;
    if (classes && capturedElements.has(classes)) return;
    
    // Skip navigation elements
    if (tagName === 'nav' || classes.includes('breadcrumb')) return;
    if (classes.includes('back-to-top') || classes.includes('skip-link')) return;
    
    // Skip empty elements
    const text = $this.text().trim();
    if (text.length === 0 && $this.find('*').length === 0) return;
    
    // Skip hr elements
    if (tagName === 'hr') return;
    
    // Check if this is a loose paragraph with important content
    if (tagName === 'p') {
      const strongText = $this.find('strong').text();
      if (strongText.includes('Tags:') || strongText.includes('Summary:')) {
        // This is likely part of the overview section that got separated
        if (!contentData.sections['overview-extra']) {
          contentData.sections['overview-extra'] = '';
        }
        contentData.sections['overview-extra'] += $.html($this) + '\n';
        log.verbose('Captured loose overview content');
        return;
      }
    }
    
    // Check if this is a loose key-insight div
    if (classes.includes('key-insight')) {
      if (!contentData.sections['overview-extra']) {
        contentData.sections['overview-extra'] = '';
      }
      contentData.sections['overview-extra'] += $.html($this) + '\n';
      log.verbose('Captured loose key-insight');
      return;
    }
    
    // Capture any other orphaned content
    const orphanKey = id || classes.split(' ')[0] || `orphan-${tagName}-${Math.random().toString(36).substr(2, 9)}`;
    contentData.specialSections[orphanKey] = $.html($this);
    log.verbose(`Captured orphaned content: ${orphanKey.substring(0, 50)}`);
  });
  
  return contentData;
}

/**
 * Enhancement function for sections
 */
function enhanceSection(sectionHtml, sectionId) {
  const $ = cheerio.load(sectionHtml);
  const section = $('*').first();
  
  // Add v5.8 classes based on section type
  if (section.hasClass('theology-card')) {
    // Add glass-premium if not present
    if (!section.hasClass('glass-premium')) {
      section.addClass('glass-premium');
    }
    
    // Add animate-on-scroll if not present
    if (!section.hasClass('animate-on-scroll')) {
      section.addClass('animate-on-scroll');
    }
  }
  
  // Add data-section-priority
  const priorities = {
    'overview': '1',
    'narrative': '2',
    'literary-context': '3',
    'themes': '3',
    'ane-context': '4',
    'biblical-theology': '2',
    'messianic': '3',
    'application': '2',
    'questions': '3'
  };
  
  if (priorities[sectionId] && !section.attr('data-section-priority')) {
    section.attr('data-section-priority', priorities[sectionId]);
  }
  
  // Enhance specific elements within sections
  
  // Upgrade panels
  section.find('.panel').each(function() {
    const $panel = $(this);
    if (!$panel.hasClass('hover-lift')) {
      $panel.addClass('hover-lift');
    }
    // Add glass-textured to specific panels
    const h4Text = $panel.find('h4').text();
    if (h4Text.includes('🌍') || h4Text.includes('🍎')) {
      $panel.addClass('glass-textured');
    }
  });
  
  // Upgrade theme panels to 3D cards
  if (sectionId === 'themes') {
    section.find('.panel').each(function() {
      const $panel = $(this);
      if (!$panel.hasClass('card-3d')) {
        $panel.addClass('card-3d');
      }
    });
  }
  
  // Upgrade grids with stagger-children
  section.find('.grid-3').each(function() {
    const $grid = $(this);
    if (!$grid.hasClass('stagger-children')) {
      $grid.addClass('stagger-children');
    }
  });
  
  // Upgrade tables
  section.find('table').each(function() {
    const $table = $(this);
    if (!$table.hasClass('glass-table')) {
      $table.addClass('glass-table');
    }
  });
  
  // Upgrade buttons/links
  section.find('.cross-ref').each(function() {
    const $link = $(this);
    $link.removeClass('cross-ref').addClass('btn btn-glass');
  });
  
  // Add hover-lift to tags
  section.find('.tag').each(function() {
    const $tag = $(this);
    if (!$tag.hasClass('hover-lift')) {
      $tag.addClass('hover-lift');
    }
  });
  
  return $.html();
}

/**
 * Enhancement for special sections
 */
function enhanceSpecialSection(sectionHtml, type) {
  const $ = cheerio.load(sectionHtml);
  const section = $('*').first();
  
  switch(type) {
    case 'badge':
      // Keep as-is, maybe add animation
      if (!section.hasClass('animate-on-scroll')) {
        section.addClass('animate-on-scroll');
      }
      break;
      
    case 'complexity':
      // Keep as-is
      break;
      
    case 'warning':
      // Convert inline styles to classes
      section.removeAttr('style');
      section.addClass('theology-card glass-premium warning-box animate-on-scroll');
      break;
      
    case 'related':
      // Ensure it has premium classes
      if (!section.hasClass('glass-premium')) {
        section.addClass('glass-premium');
      }
      if (!section.hasClass('animate-on-scroll')) {
        section.addClass('animate-on-scroll');
      }
      break;
  }
  
  return $.html();
}

/**
 * Build the complete main content HTML
 */
function buildMainContent(contentData) {
  let mainContent = '';
  
  // Add breadcrumbs
  mainContent += `
    <!-- Breadcrumbs -->
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> ›
      <a href="/studies/">Studies</a> ›
      <a href="/studies/characters/characters_hub.html">Biblical Characters</a> ›
      <a href="/studies/characters/characters_hub.html#${contentData.bookId}">${contentData.bookName}</a> ›
      <span aria-current="page">${contentData.characterName}</span>
    </nav>\n`;
  
  // Add character title
  if (contentData.sections['character-title']) {
    mainContent += enhanceSection(contentData.sections['character-title'], 'character-title') + '\n';
  } else {
    mainContent += `
    <h1 id="character-title" class="section-title" 
        data-character-id="${contentData.characterId}" 
        data-book="${contentData.bookId}">
      <span class="section-icon">👤</span>
      ${contentData.characterName}
      ${contentData.hebrewName ? `<span class="hebrew-large">${contentData.hebrewName}</span>` : ''}
    </h1>\n`;
  }
  
  // Add special sections AFTER title but BEFORE main content
  if (contentData.specialSections['character-badge']) {
    mainContent += enhanceSpecialSection(contentData.specialSections['character-badge'], 'badge') + '\n';
  }
  
  if (contentData.specialSections['complexity-indicator']) {
    mainContent += enhanceSpecialSection(contentData.specialSections['complexity-indicator'], 'complexity') + '\n';
  }
  
  if (contentData.specialSections['textual-clarification']) {
    mainContent += enhanceSpecialSection(contentData.specialSections['textual-clarification'], 'warning') + '\n';
  }
  
  // Add main sections in proper order
  const sectionOrder = [
    'overview',
    'overview-extra',  // Any loose overview content
    'narrative',
    'literary-context',
    'themes',
    'major-chiasm',
    'ane-context',
    'eden',
    'wordplay', 
    'covenant',
    'unique',
    'biblical-theology',
    'messianic',
    'second-temple',
    'songs',
    'intertext',
    'tables',
    'application',
    'questions'
  ];
  
  // Add each section that exists
  sectionOrder.forEach(sectionId => {
    if (contentData.sections[sectionId]) {
      // Special handling for overview-extra
      if (sectionId === 'overview-extra') {
        // Just add it raw, it's already loose content
        mainContent += contentData.sections[sectionId] + '\n';
      } else {
        mainContent += enhanceSection(contentData.sections[sectionId], sectionId) + '\n\n';
      }
    }
  });
  
  // Add related profiles before bibliography
  if (contentData.specialSections['related-profiles']) {
    mainContent += enhanceSpecialSection(contentData.specialSections['related-profiles'], 'related') + '\n\n';
  }
  
  // Add bibliography last
  if (contentData.sections['bibliography']) {
    mainContent += enhanceSection(contentData.sections['bibliography'], 'bibliography') + '\n\n';
  }
  
  // Add any remaining orphaned content (but be selective)
  Object.entries(contentData.specialSections).forEach(([key, html]) => {
    if (!['character-badge', 'complexity-indicator', 'textual-clarification', 'related-profiles'].includes(key)) {
      // Only add if it starts with 'orphan-' (our safety net captures)
      if (key.startsWith('orphan-')) {
        log.verbose(`Adding orphaned content: ${key}`);
        mainContent += html + '\n\n';
      }
    }
  });
  
  return mainContent;
}

/**
 * Build v5.8 page with preserved content
 */
function buildV58Page(templatePath, contentData) {
  // Load the v5.8 template
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found at: ${templatePath}`);
  }
  
  let template = fs.readFileSync(templatePath, 'utf8');
  
  // Build the complete main content
  const mainContent = buildMainContent(contentData);
  
  // Prepare all replacements
  const replacements = {
    // Title and basic meta
    '\\[Character Name\\]': contentData.characterName,
    '\\[Book\\]': contentData.bookName,
    '\\[Hebrew Name\\]': contentData.hebrewName || '',
    '\\[Hebrew\\/Greek\\]': contentData.hebrewName || '',
    '\\[Hebrew\\]': contentData.hebrewName || '',
    
    // Meta descriptions - escape special regex characters
    'Seminary-level biblical character study of \\[Character Name\\][^"]*': 
      contentData.description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    'Comprehensive study of \\[Character Name\\][^"]*': 
      contentData.description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    'Explore the narrative, theology, and significance of \\[Character Name\\] in Scripture\\.':
      contentData.description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    
    // Character metadata
    '\\[male\\/female\\]': contentData.gender,
    '\\[single-page\\/multi-page\\]': contentData.profileType,
    '\\[character-id\\]': contentData.characterId,
    '\\[book-id\\]': contentData.bookId,
    '\\[book\\]': contentData.bookId.replace(/-/g, ''),
    
    // Body classes
    '\\[woman-profile\\]': contentData.gender === 'female' ? 'woman-profile' : '',
    
    // URLs
    '\\[character-name\\]': contentData.characterId,
    
    // Placeholder text replacements
    '\\[key role\\/identity\\][^\\]]*': 'profile',
    '\\[major themes\\][^\\]]*': 'themes',
    '\\[specific theological focus\\][^\\]]*': 'theology',
    '\\[unique contribution\\][^\\]]*': 'significance',
    '\\[Book\\]\'s story': `${contentData.bookName}`,
    
    // Navigation placeholders
    '\\[Character Name\\] \\(\\[Hebrew\\/Greek\\]\\)': `${contentData.characterName}${contentData.hebrewName ? ' (' + contentData.hebrewName + ')' : ''}`,
  };
  
  // First, do simple replacements
  Object.entries(replacements).forEach(([placeholder, value]) => {
    const regex = new RegExp(placeholder, 'g');
    template = template.replace(regex, value || '');
  });
  
  // Now replace the entire main content section
  // Find the main content area in the template
  const mainStartMatch = template.match(/<main[^>]*>/);
  const mainEndMatch = template.match(/<\/main>/);
  
  if (mainStartMatch && mainEndMatch) {
    const mainStart = template.indexOf(mainStartMatch[0]) + mainStartMatch[0].length;
    const mainEnd = template.lastIndexOf('</main>');
    
    // Replace everything between <main> tags with our content
    template = template.substring(0, mainStart) + '\n' + 
               mainContent + '\n' + 
               template.substring(mainEnd);
  }
  
  return template;
}

/**
 * Main migration function - HYBRID VERSION
 */
function migrateTemplate(filePath, options = {}) {
  const fileName = path.basename(filePath);
  log.verbose(`Processing ${fileName}`);
  
  try {
    // Read the original file
    const originalHtml = fs.readFileSync(filePath, 'utf8');
    
    // Check if already migrated
    if (isAlreadyMigrated(originalHtml)) {
      log.verbose(`Already migrated: ${fileName}`);
      stats.skipped++;
      return { status: 'skipped', reason: 'already migrated' };
    }
    
    // Load with cheerio for better parsing
    const $ = cheerio.load(originalHtml);
    
    // Extract all content using hybrid approach
    const contentData = extractContent($);
    log.verbose(`Extracted content for: ${contentData.characterName || 'unknown'}`);
    
    // Log what we found
    const regularSections = Object.keys(contentData.sections).length;
    const specialSections = Object.keys(contentData.specialSections).length;
    log.verbose(`Found ${regularSections} regular sections, ${specialSections} special sections`);
    
    if (CONFIG.verbose) {
      log.verbose(`Regular sections: ${Object.keys(contentData.sections).join(', ')}`);
      log.verbose(`Special sections: ${Object.keys(contentData.specialSections).join(', ')}`);
    }
    
    // Create backup if not in test mode
    if (!CONFIG.testMode) {
      const backupPath = filePath.replace('.html', `${CONFIG.backupSuffix}.html`);
      fs.copyFileSync(filePath, backupPath);
      stats.backedUp++;
      log.verbose(`Backup created: ${path.basename(backupPath)}`);
    }
    
    // Build the new v5.8 page
    const newHtml = buildV58Page(CONFIG.templatePath, contentData);
    
    // Save migrated file if not in test mode
    if (!CONFIG.testMode) {
      fs.writeFileSync(filePath, newHtml);
      log.success(`Migrated: ${fileName}`);
    } else {
      log.info(`TEST MODE - Would migrate: ${fileName}`);
      
      // In test mode, show what we found
      if (CONFIG.verbose) {
        log.verbose('Content summary:');
        log.verbose(`  Character: ${contentData.characterName}`);
        log.verbose(`  Book: ${contentData.bookName}`);
        log.verbose(`  Gender: ${contentData.gender}`);
        log.verbose(`  Total sections captured: ${regularSections + specialSections}`);
      }
    }
    
    stats.migrated++;
    return { status: 'migrated', contentData };
    
  } catch (error) {
    log.error(`Failed to migrate ${fileName}: ${error.message}`);
    if (CONFIG.verbose) {
      console.error(error.stack);
    }
    stats.errors++;
    return { status: 'error', error: error.message };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log(chalk.cyan('\n╔════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║   Template Migration Tool v5.8 HYBRID     ║'));
  console.log(chalk.cyan('╚════════════════════════════════════════════╝\n'));
  
  // Parse command line arguments
  const args = process.argv.slice(2);
  const flags = {
    test: args.includes('--test'),
    single: args.includes('--single') ? args[args.indexOf('--single') + 1] : null,
    folder: args.includes('--folder') ? args[args.indexOf('--folder') + 1] : './',
    verbose: args.includes('--verbose')
  };
  
  CONFIG.testMode = flags.test;
  if (flags.verbose) CONFIG.verbose = true;
  
  // Check if template exists
  if (!fs.existsSync(CONFIG.templatePath)) {
    log.error(`Template not found at: ${CONFIG.templatePath}`);
    log.info('Please ensure the v5.8 template exists at: templates/biblical-characters-template-v5.8.html');
    process.exit(1);
  }
  
  // Check if cheerio is installed
  try {
    require.resolve('cheerio');
  } catch(e) {
    log.error('Cheerio is not installed. Please run: npm install cheerio');
    process.exit(1);
  }
  
  // Initialize log file
  if (!CONFIG.testMode) {
    fs.writeFileSync(CONFIG.logFile, `Migration started at ${new Date().toISOString()}\n`);
  }
  
  // Find files to migrate
  let files;
  if (flags.single) {
    files = [flags.single];
    log.info(`Single file mode: ${flags.single}`);
  } else {
    files = [];
    CONFIG.patterns.forEach(pattern => {
      const found = glob.sync(path.join(flags.folder, pattern));
      files = files.concat(found);
    });
    log.info(`Found ${files.length} template files in ${flags.folder}`);
  }
  
  if (files.length === 0) {
    log.warning('No template files found');
    return;
  }
  
  // Run migration
  console.log('\n' + chalk.cyan('Starting migration...'));
  stats.total = files.length;
  
  for (const file of files) {
    const result = migrateTemplate(file, flags);
  }
  
  // Display results
  console.log('\n' + chalk.cyan('═══════════════════════════════════════════'));
  console.log(chalk.cyan('Migration Summary:'));
  console.log(chalk.cyan('═══════════════════════════════════════════'));
  console.log(`Total files:    ${stats.total}`);
  console.log(chalk.green(`✔ Migrated:     ${stats.migrated}`));
  console.log(chalk.yellow(`⚠ Skipped:      ${stats.skipped}`));
  console.log(chalk.red(`✖ Errors:       ${stats.errors}`));
  if (stats.backedUp > 0) {
    console.log(chalk.blue(`↻ Backed up:    ${stats.backedUp}`));
  }
  
  if (CONFIG.testMode) {
    console.log('\n' + chalk.yellow('TEST MODE - No files were actually modified'));
    console.log(chalk.gray('Run without --test flag to perform actual migration'));
  }
  
  if (stats.migrated > 0 && !CONFIG.testMode) {
    console.log('\n' + chalk.green('✨ Migration successful!'));
    console.log(chalk.gray('Backup files have been created with suffix: ' + CONFIG.backupSuffix));
    console.log(chalk.gray('To rollback: rename backup files to remove the suffix'));
  }
}

// Run the script
main().catch(error => {
  log.error(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});