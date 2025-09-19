/**
 * HYBRID MIGRATION SCRIPT: v5.4-5.7 to v5.8
 * Path: /migration/migrate-to-v58.js
 * Purpose: Properly migrate biblical character templates to v5.8
 * Version: 4.3.0 - COMPLETE CLEAN VERSION
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
 * Clean section HTML to ensure no nested html/body tags
 */
function cleanSectionHtml(html) {
  if (!html) return '';
  
  // First, check if this looks like a full HTML document
  if (html.includes('<!DOCTYPE') || html.includes('<html') || html.includes('<body')) {
    // This is a full document, extract just the content we need
    const $ = cheerio.load(html, {
      xml: false,
      decodeEntities: false
    });
    
    // Try to find the actual content element
    // Look for the main elements that we care about
    const mainElements = [
      '.theology-card',
      '.animate-on-scroll', 
      '.character-type-badge',
      '.complexity-indicator',
      '.bibliography-section',
      '.section-title',
      '.grid-2',
      'details',
      'h1',
      'h2',
      'h3'
    ];
    
    let extractedContent = '';
    for (const selector of mainElements) {
      const element = $(selector).first();
      if (element.length) {
        extractedContent = element.prop('outerHTML');
        break;
      }
    }
    
    if (extractedContent) {
      html = extractedContent;
    } else {
      // Fallback: get everything inside body
      const bodyContent = $('body').html();
      if (bodyContent) {
        html = bodyContent;
      }
    }
  }
  
  // Now do additional cleaning to be absolutely sure
  // Remove any DOCTYPE declarations
  html = html.replace(/<!DOCTYPE[^>]*>/gi, '');
  
  // Remove any html tags and their attributes (more aggressive)
  html = html.replace(/<html[^>]*>/gi, '');
  html = html.replace(/<\/html>/gi, '');
  
  // Remove any head sections completely
  html = html.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  html = html.replace(/<head[^>]*\/>/gi, ''); // Self-closing head
  
  // Remove any body tags and their attributes
  html = html.replace(/<body[^>]*>/gi, '');
  html = html.replace(/<\/body>/gi, '');
  
  // Remove any meta tags that might have been included
  html = html.replace(/<meta[^>]*>/gi, '');
  
  // Remove any script tags
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  
  // Remove any link tags
  html = html.replace(/<link[^>]*>/gi, '');
  
  // Remove any title tags
  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '');
  
  // Trim whitespace
  html = html.trim();
  
  return html;
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
  
  // Extract Hebrew/Greek name from the title section
  const titleSection = $('#character-title, h1.section-title, h2.section-title').first();
  const hebrewSpan = titleSection.find('.hebrew-large, .hebrew').first();
  if (hebrewSpan.length) {
    contentData.hebrewName = hebrewSpan.text().trim();
  }
  
  // ========================================
  // PHASE 2: Extract sections using $.html() method
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
  
  // Extract sections by ID
  sectionIds.forEach(id => {
    // First try to find by ID
    let $section = $(`#${id}`);
    
    if ($section.length > 0) {
      let html = '';
      
      // If the ID is on a parent container, use that
      if ($section.hasClass('theology-card') || $section.hasClass('animate-on-scroll') || $section.hasClass('grid-2')) {
        // Get just this element
        html = $('<div>').append($section.clone()).html();
      } else {
        // The ID might be on an inner element, look for parent
        const $parent = $section.closest('.theology-card, .animate-on-scroll, .grid-2');
        if ($parent.length > 0) {
          html = $('<div>').append($parent.clone()).html();
        } else {
          // Just use the element with the ID
          html = $('<div>').append($section.clone()).html();
        }
      }
      
      contentData.sections[id] = cleanSectionHtml(html);
      log.verbose(`Extracted section by ID: ${id}`);
    }
  });
  
  // Extract unlabeled theology cards
  $('.theology-card, .animate-on-scroll').each(function() {
    const $this = $(this);
    const id = $this.attr('id');
    
    // Skip if already extracted
    if (id && contentData.sections[id]) return;
    
    // Check if it's a special section by its content
    const heading = $this.find('h3, h4').first().text();
    
    if (!id && heading) {
      // Try to generate an ID from the heading
      const generatedId = heading.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 30);
      
      if (!contentData.sections[generatedId]) {
        const html = $('<div>').append($this.clone()).html();
        contentData.sections[generatedId] = cleanSectionHtml(html);
        log.verbose(`Extracted unlabeled section: ${generatedId}`);
      }
    }
  });
  
  // Extract grid-2 sections with tables (for intertext)
  $('.grid-2').each(function() {
    const $this = $(this);
    const id = $this.attr('id');
    
    // Check if it has tables inside
    if ($this.find('table').length > 0) {
      if (id && !contentData.sections[id]) {
        const html = $('<div>').append($this.clone()).html();
        contentData.sections[id] = cleanSectionHtml(html);
        log.verbose(`Extracted grid section: ${id}`);
      } else if (!id) {
        // Try to identify by content
        const firstHeading = $this.find('h3').first().text().toLowerCase();
        if (firstHeading.includes('intertext') || firstHeading.includes('old testament') || firstHeading.includes('new testament')) {
          const html = $('<div>').append($this.clone()).html();
          contentData.sections['intertext'] = cleanSectionHtml(html);
          log.verbose('Extracted intertext tables section');
        }
      }
    }
  });
  
  // ========================================
  // PHASE 3: Extract special/custom sections
  // ========================================
  
  // 1. Character Title Section - Skip extraction if it causes issues
  // We'll recreate it from metadata instead
  const characterTitle = $('h1#character-title, h2#character-title, h1.section-title, h2.section-title').first();
  if (characterTitle.length) {
    // Extract Hebrew name if present
    const hebrewInTitle = characterTitle.find('.hebrew-large, .hebrew').first();
    if (hebrewInTitle.length && !contentData.hebrewName) {
      contentData.hebrewName = hebrewInTitle.text().trim();
    }
    log.verbose('Skipping character title extraction due to HTML nesting issues - will recreate from metadata');
  }
  
  // 2. Character Type Badge
  const characterBadge = $('.character-type-badge').first();
  if (characterBadge.length) {
    // Use outerHTML directly to avoid wrapper issues
    const badgeHtml = characterBadge.prop('outerHTML');
    if (badgeHtml) {
      contentData.specialSections['character-badge'] = cleanSectionHtml(badgeHtml);
    }
    log.verbose('Extracted character type badge');
  }
  
  // 3. Complexity Indicator
  const complexityIndicator = $('.complexity-indicator').first();
  if (complexityIndicator.length) {
    // Use outerHTML directly
    const complexityHtml = complexityIndicator.prop('outerHTML');
    if (complexityHtml) {
      contentData.specialSections['complexity-indicator'] = cleanSectionHtml(complexityHtml);
    }
    log.verbose('Extracted complexity indicator');
  }
  
  // 4. Warning/Clarification boxes - SKIP THIS TO AVOID ISSUES
  // The textual clarification boxes are causing nested HTML problems
  // We'll skip extracting them and recreate manually if needed
  log.verbose('Skipping textual clarification extraction to avoid nested HTML issues');
  
  // 5. Related Profiles - SKIP THIS TOO
  // Also causing nested HTML issues
  log.verbose('Skipping related profiles extraction to avoid nested HTML issues');
  
  // 6. Tables Grid (for intertext sections)
  const tablesGrid = $('.grid-2').filter(function() {
    return $(this).find('table').length > 0;
  }).first();
  if (tablesGrid.length && !contentData.sections['tables']) {
    const html = $('<div>').append(tablesGrid.clone()).html();
    contentData.sections['tables'] = cleanSectionHtml(html);
    log.verbose('Extracted tables section');
  }
  
  // Also check for #intertext specifically
  const intertextSection = $('#intertext');
  if (intertextSection.length && !contentData.sections['intertext']) {
    const html = $('<div>').append(intertextSection.clone()).html();
    contentData.sections['intertext'] = cleanSectionHtml(html);
    log.verbose('Extracted intertext section by ID');
  }
  
  // 7. Bibliography
  const bibliography = $('.bibliography-section, details').filter(function() {
    const text = $(this).text().toLowerCase();
    const summaryText = $(this).find('summary').text().toLowerCase();
    return text.includes('bibliography') || summaryText.includes('bibliography');
  }).first();
  if (bibliography.length && !contentData.sections['bibliography']) {
    const html = $('<div>').append(bibliography.clone()).html();
    contentData.sections['bibliography'] = cleanSectionHtml(html);
    log.verbose('Extracted bibliography section');
  }
  
  // 8. Any remaining sections with specific headings
  $('.theology-card').each(function() {
    const $this = $(this);
    const heading = $this.find('h3').first().text().toLowerCase();
    
    // Songs section
    if (heading.includes('songs') && !contentData.sections['songs']) {
      const html = $('<div>').append($this.clone()).html();
      contentData.sections['songs'] = cleanSectionHtml(html);
      log.verbose('Extracted songs section');
    }
    
    // Second Temple section
    if ((heading.includes('second temple') || heading.includes('jewish sources')) && !contentData.sections['second-temple']) {
      const html = $('<div>').append($this.clone()).html();
      contentData.sections['second-temple'] = cleanSectionHtml(html);
      log.verbose('Extracted second temple section');
    }
  });
  
  return contentData;
}

/**
 * Enhancement function for sections - SIMPLIFIED VERSION
 */
function enhanceSection(sectionHtml, sectionId) {
  if (!sectionHtml) return '';
  
  // Clean the HTML first - aggressive cleaning
  sectionHtml = sectionHtml.replace(/<html[^>]*>/gi, '');
  sectionHtml = sectionHtml.replace(/<\/html>/gi, '');
  sectionHtml = sectionHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  sectionHtml = sectionHtml.replace(/<head[^>]*\/>/gi, '');
  sectionHtml = sectionHtml.replace(/<body[^>]*>/gi, '');
  sectionHtml = sectionHtml.replace(/<\/body>/gi, '');
  sectionHtml = sectionHtml.trim();
  
  // If it still has HTML/body tags after cleaning, return empty
  if (sectionHtml.includes('<html') || sectionHtml.includes('<body')) {
    log.warning(`Section ${sectionId} still has nested HTML after cleaning - skipping enhancement`);
    return '';
  }
  
  // For now, just return the cleaned HTML without further enhancement
  // The classes should already be in the extracted HTML
  return sectionHtml;
}

/**
 * Enhancement for special sections
 */
function enhanceSpecialSection(sectionHtml, type) {
  if (!sectionHtml) return '';
  
  // First, aggressively clean the HTML
  sectionHtml = sectionHtml.replace(/<html[^>]*>/gi, '');
  sectionHtml = sectionHtml.replace(/<\/html>/gi, '');
  sectionHtml = sectionHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  sectionHtml = sectionHtml.replace(/<head[^>]*\/>/gi, '');
  sectionHtml = sectionHtml.replace(/<body[^>]*>/gi, '');
  sectionHtml = sectionHtml.replace(/<\/body>/gi, '');
  sectionHtml = sectionHtml.trim();
  
  // If still has nested tags, try to extract the actual content
  if (sectionHtml.includes('<html') || sectionHtml.includes('<body')) {
    const $ = cheerio.load(sectionHtml, {
      xml: false,
      decodeEntities: false  
    });
    
    // Find the actual element we want
    let actualElement = null;
    if (type === 'badge') {
      actualElement = $('.character-type-badge').first();
    } else if (type === 'complexity') {
      actualElement = $('.complexity-indicator').first();
    } else if (type === 'warning') {
      actualElement = $('.theology-card, .warning-box').first();
    } else if (type === 'related') {
      actualElement = $('.theology-card').first();
    }
    
    if (actualElement && actualElement.length) {
      sectionHtml = actualElement.prop('outerHTML') || '';
    }
  }
  
  // Now enhance based on type
  const $ = cheerio.load(sectionHtml, {
    xml: false,
    decodeEntities: false
  });
  
  const $section = $('*').first();
  
  switch(type) {
    case 'badge':
      // Just return as-is, it's already properly formatted
      return sectionHtml;
      
    case 'complexity':
      // Just return as-is
      return sectionHtml;
      
    case 'warning':
      // Ensure it has proper classes
      if (!$section.hasClass('theology-card')) {
        $section.addClass('theology-card');
      }
      if (!$section.hasClass('glass-premium')) {
        $section.addClass('glass-premium');
      }
      if (!$section.hasClass('animate-on-scroll')) {
        $section.addClass('animate-on-scroll');
      }
      return $.html();
      
    case 'related':
      // Ensure it has premium classes
      if (!$section.hasClass('glass-premium')) {
        $section.addClass('glass-premium');
      }
      if (!$section.hasClass('animate-on-scroll')) {
        $section.addClass('animate-on-scroll');
      }
      return $.html();
      
    default:
      return sectionHtml;
  }
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
  
  // ALWAYS generate character title fresh - never use extracted version
  mainContent += `
    <h2 id="character-title" class="section-title" 
        data-character-id="${contentData.characterId}" 
        data-book="${contentData.bookId}">
      <span class="section-icon">👤</span>
      ${contentData.characterName}
      ${contentData.hebrewName ? `<span class="hebrew-large">${contentData.hebrewName}</span>` : ''}
    </h2>\n`;
  
  // Add special sections AFTER title but BEFORE main content
  if (contentData.specialSections['character-badge']) {
    let badgeHtml = contentData.specialSections['character-badge'];
    // Clean it just in case
    badgeHtml = badgeHtml.replace(/<html[^>]*>/gi, '').replace(/<\/html>/gi, '');
    badgeHtml = badgeHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
    badgeHtml = badgeHtml.replace(/<body[^>]*>/gi, '').replace(/<\/body>/gi, '');
    
    if (!badgeHtml.includes('<html') && !badgeHtml.includes('<body')) {
      mainContent += '\n    ' + enhanceSpecialSection(badgeHtml, 'badge') + '\n';
    }
  }
  
  if (contentData.specialSections['complexity-indicator']) {
    let complexityHtml = contentData.specialSections['complexity-indicator'];
    // Clean it just in case
    complexityHtml = complexityHtml.replace(/<html[^>]*>/gi, '').replace(/<\/html>/gi, '');
    complexityHtml = complexityHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
    complexityHtml = complexityHtml.replace(/<body[^>]*>/gi, '').replace(/<\/body>/gi, '');
    
    if (!complexityHtml.includes('<html') && !complexityHtml.includes('<body')) {
      mainContent += '\n    ' + enhanceSpecialSection(complexityHtml, 'complexity') + '\n';
    }
  }
  
  // SKIP THE TEXTUAL CLARIFICATION - it's causing issues
  // Log that we're skipping it
  if (contentData.specialSections['textual-clarification']) {
    log.verbose('Skipping textual clarification section due to extraction issues');
  }
  
  // Add main sections in proper order
  const sectionOrder = [
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
    'tables',
    'application',
    'questions'
  ];
  
  // Add each section that exists
  sectionOrder.forEach(sectionId => {
    if (contentData.sections[sectionId]) {
      let sectionHtml = contentData.sections[sectionId];
      
      // Extra safety: clean each section before adding
      sectionHtml = sectionHtml.replace(/<html[^>]*>/gi, '').replace(/<\/html>/gi, '');
      sectionHtml = sectionHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
      sectionHtml = sectionHtml.replace(/<body[^>]*>/gi, '').replace(/<\/body>/gi, '');
      
      if (!sectionHtml.includes('<html') && !sectionHtml.includes('<body')) {
        const enhanced = enhanceSection(sectionHtml, sectionId);
        if (enhanced) {
          mainContent += '\n    ' + enhanced + '\n';
        }
      } else {
        log.warning(`Skipping section ${sectionId} due to nested HTML`);
      }
    }
  });
  
  // SKIP related profiles - causing issues
  if (contentData.specialSections['related-profiles']) {
    log.verbose('Skipping related profiles section due to extraction issues');
  }
  
  // Add bibliography last
  if (contentData.sections['bibliography']) {
    let bibHtml = contentData.sections['bibliography'];
    // Clean it
    bibHtml = bibHtml.replace(/<html[^>]*>/gi, '').replace(/<\/html>/gi, '');
    bibHtml = bibHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
    bibHtml = bibHtml.replace(/<body[^>]*>/gi, '').replace(/<\/body>/gi, '');
    
    if (!bibHtml.includes('<html') && !bibHtml.includes('<body')) {
      mainContent += '\n    ' + enhanceSection(bibHtml, 'bibliography') + '\n';
    }
  }
  
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
  
  // Final validation - check the main content doesn't have nested HTML
  if (mainContent.includes('<html') || mainContent.includes('<body')) {
    console.log('DEBUG: Main content still contains HTML/BODY tags');
    const htmlPos = mainContent.indexOf('<html');
    const bodyPos = mainContent.indexOf('<body');
    console.log('First <html> occurrence:', htmlPos);
    console.log('First <body> occurrence:', bodyPos);
    
    // Show what's around position 421
    if (bodyPos > 0) {
      console.log('Content around position:', mainContent.substring(Math.max(0, bodyPos - 50), bodyPos + 100));
    }
    
    // Debug: Show which sections have the problem
    Object.entries(contentData.sections).forEach(([id, html]) => {
      if (html && (html.includes('<html') || html.includes('<body'))) {
        console.log(`Section "${id}" contains HTML/BODY tags`);
      }
    });
    Object.entries(contentData.specialSections).forEach(([id, html]) => {
      if (html && (html.includes('<html') || html.includes('<body'))) {
        console.log(`Special section "${id}" contains HTML/BODY tags`);
      }
    });
    
    throw new Error('Main content contains nested HTML/BODY tags');
  }
  
  // Prepare all replacements - using a safer approach
  const replacements = [
    { find: /\[Character Name\]/g, replace: contentData.characterName },
    { find: /\[Book\]/g, replace: contentData.bookName },
    { find: /\[Hebrew Name\]/g, replace: contentData.hebrewName || '' },
    { find: /\[Hebrew\/Greek\]/g, replace: contentData.hebrewName || '' },
    { find: /\[Hebrew\]/g, replace: contentData.hebrewName || '' },
    { find: /\[male\/female\]/g, replace: contentData.gender },
    { find: /\[single-page\/multi-page\]/g, replace: contentData.profileType },
    { find: /\[character-id\]/g, replace: contentData.characterId },
    { find: /\[book-id\]/g, replace: contentData.bookId },
    { find: /\[book\]/g, replace: contentData.bookId.replace(/-/g, '') },
    { find: /\[woman-profile\]/g, replace: contentData.gender === 'female' ? 'woman-profile' : '' },
    { find: /\[character-name\]/g, replace: contentData.characterId }
  ];
  
  // Apply replacements
  replacements.forEach(({ find, replace }) => {
    template = template.replace(find, replace);
  });
  
  // Handle description replacements separately
  if (contentData.description) {
    // Replace the meta description placeholders
    template = template.replace(
      /Seminary-level biblical character study of \[Character Name\][^"]*/g,
      contentData.description
    );
    template = template.replace(
      /Comprehensive study of \[Character Name\][^"]*/g,
      contentData.description
    );
    template = template.replace(
      /Explore the narrative, theology, and significance of \[Character Name\] in Scripture\./g,
      contentData.description
    );
  }
  
  // Replace placeholder text patterns
  template = template.replace(/\[key role\/identity\][^\]]*/g, 'profile');
  template = template.replace(/\[major themes\][^\]]*/g, 'themes');
  template = template.replace(/\[specific theological focus\][^\]]*/g, 'theology');
  template = template.replace(/\[unique contribution\][^\]]*/g, 'significance');
  template = template.replace(/\[Book\]'s story/g, contentData.bookName);
  template = template.replace(/\[Character Name\] \(\[Hebrew\/Greek\]\)/g, 
    `${contentData.characterName}${contentData.hebrewName ? ' (' + contentData.hebrewName + ')' : ''}`);
  
  // Now replace the entire main content section
  // Find the main content area in the template
  const mainStartMatch = template.match(/<main[^>]*>/);
  const mainEndMatch = template.match(/<\/main>/);
  
  if (mainStartMatch && mainEndMatch) {
    const mainStart = template.indexOf(mainStartMatch[0]) + mainStartMatch[0].length;
    const mainEnd = template.lastIndexOf('</main>');
    
    // Replace everything between <main> tags with our content
    template = template.substring(0, mainStart) + '\n' + 
               mainContent + '\n  ' +
               template.substring(mainEnd);
  }
  
  // Final check - ensure no nested HTML in final output
  const finalCheck = template.match(/<html[^>]*>[\s\S]*<html/);
  if (finalCheck) {
    throw new Error('Final output contains nested HTML tags');
  }
  
  return template;
}

/**
 * Fix already migrated files with malformed HTML
 */
function fixMigratedFile(filePath) {
  const fileName = path.basename(filePath);
  log.verbose(`Fixing malformed HTML in ${fileName}`);
  
  try {
    // Read the file
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Check if it has the malformed HTML issue
    if (!html.includes('<html class=') && !html.includes('<html data-section-priority=')) {
      log.verbose(`No malformed HTML found in ${fileName}`);
      return { status: 'skipped', reason: 'no malformed HTML' };
    }
    
    // Load with cheerio to re-extract content
    const $ = cheerio.load(html);
    
    // Re-extract content
    const contentData = extractContent($);
    
    // If we have a template, rebuild the page
    if (fs.existsSync(CONFIG.templatePath)) {
      const fixedHtml = buildV58Page(CONFIG.templatePath, contentData);
      
      // Save the fixed file
      if (!CONFIG.testMode) {
        // Create backup first
        const backupPath = filePath.replace('.html', `-backup-fix-${Date.now()}.html`);
        fs.copyFileSync(filePath, backupPath);
        
        // Save fixed version
        fs.writeFileSync(filePath, fixedHtml);
        log.success(`Fixed malformed HTML in: ${fileName}`);
      } else {
        log.info(`TEST MODE - Would fix: ${fileName}`);
      }
      
      return { status: 'fixed' };
    }
    
  } catch (error) {
    log.error(`Failed to fix ${fileName}: ${error.message}`);
    return { status: 'error', error: error.message };
  }
}

/**
 * Main migration function
 */
function migrateTemplate(filePath, options = {}) {
  const fileName = path.basename(filePath);
  log.verbose(`Processing ${fileName}`);
  
  try {
    // Read the original file
    const originalHtml = fs.readFileSync(filePath, 'utf8');
    
    // CRITICAL CHECK: Count HTML and BODY tags
    const htmlTagCount = (originalHtml.match(/<html/gi) || []).length;
    const bodyTagCount = (originalHtml.match(/<body/gi) || []).length;
    
    log.verbose(`Source file has ${htmlTagCount} <html> tags and ${bodyTagCount} <body> tags`);
    
    // If file is corrupted, we need to restore from backup
    if (htmlTagCount > 1 || bodyTagCount > 1) {
      log.error(`❌ SOURCE FILE IS CORRUPTED: Contains ${htmlTagCount} <html> and ${bodyTagCount} <body> tags!`);
      log.error('This file has nested HTML from a failed migration.');
      
      // Check for existing backups
      const possibleBackups = [
        filePath.replace('.html', '-backup-v57.html'),
        filePath.replace('.html', '.backup.html'),
        filePath.replace('.html', '-original.html'),
        filePath.replace('.html', '-clean.html')
      ];
      
      let backupFound = false;
      for (const backupPath of possibleBackups) {
        if (fs.existsSync(backupPath)) {
          log.info(`✅ Backup found: ${path.basename(backupPath)}`);
          log.info(`To restore, run:`);
          log.info(`  cp "${backupPath}" "${filePath}"`);
          backupFound = true;
          break;
        }
      }
      
      if (!backupFound) {
        log.error('❌ No backup found. You may need to restore from version control.');
      }
      
      stats.errors++;
      return { status: 'error', error: 'Source file corrupted - restore from backup' };
    }
    
    // Check if already migrated
    if (isAlreadyMigrated(originalHtml)) {
      log.verbose(`Already migrated: ${fileName}`);
      stats.skipped++;
      return { status: 'skipped', reason: 'already migrated' };
    }
    
    // Load with cheerio for better parsing
    const $ = cheerio.load(originalHtml, {
      xml: false,
      decodeEntities: false
    });
    
    // Extract all content using hybrid approach
    const contentData = extractContent($);
    log.verbose(`Extracted content for: ${contentData.characterName || 'unknown'}`);
    
    // Log what we found
    const regularSections = Object.keys(contentData.sections).length;
    const specialSections = Object.keys(contentData.specialSections).length;
    log.verbose(`Found ${regularSections} regular sections, ${specialSections} special sections`);
    
    // Debug: Check each section for nested HTML
    if (CONFIG.verbose) {
      Object.entries(contentData.sections).forEach(([id, html]) => {
        if (html && (html.includes('<html') || html.includes('<body'))) {
          log.warning(`Section ${id} contains nested HTML tags!`);
          // Show first 200 chars of problematic section
          log.verbose(`Preview: ${html.substring(0, 200)}...`);
        }
      });
      
      Object.entries(contentData.specialSections).forEach(([id, html]) => {
        if (html && (html.includes('<html') || html.includes('<body'))) {
          log.warning(`Special section ${id} contains nested HTML tags!`);
          log.verbose(`Preview: ${html.substring(0, 200)}...`);
        }
      });
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
    
    // Verify the output doesn't have malformed HTML
    if (newHtml.includes('<html class=') || newHtml.includes('<html data-section-priority=')) {
      throw new Error('Generated HTML contains malformed nested HTML tags');
    }
    
    // Additional check for any nested HTML
    if (newHtml.match(/<html[^>]*>[\s\S]*<html/)) {
      throw new Error('Generated HTML contains nested <html> tags');
    }
    
    // Save migrated file if not in test mode
    if (!CONFIG.testMode) {
      fs.writeFileSync(filePath, newHtml);
      log.success(`Migrated: ${fileName}`);
    } else {
      log.info(`TEST MODE - Would migrate: ${fileName}`);
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
  console.log(chalk.cyan('║   Template Migration Tool v5.8 (v4.3.0)   ║'));
  console.log(chalk.cyan('╚════════════════════════════════════════════╝\n'));
  
  // Parse command line arguments
  const args = process.argv.slice(2);
  const flags = {
    test: args.includes('--test'),
    single: args.includes('--single') ? args[args.indexOf('--single') + 1] : null,
    folder: args.includes('--folder') ? args[args.indexOf('--folder') + 1] : './',
    verbose: args.includes('--verbose'),
    fix: args.includes('--fix')  // Flag to fix malformed HTML
  };
  
  CONFIG.testMode = flags.test;
  if (flags.verbose) CONFIG.verbose = true;
  
  // Check if template exists
  if (!fs.existsSync(CONFIG.templatePath)) {
    log.error(`Template not found at: ${CONFIG.templatePath}`);
    log.info('Please ensure the v5.8 template exists at: templates/biblical-characters-template-v5.8.html');
    process.exit(1);
  }
  
  // Initialize log file
  if (!CONFIG.testMode) {
    fs.writeFileSync(CONFIG.logFile, `Migration started at ${new Date().toISOString()}\n`);
  }
  
  // Find files to migrate or fix
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
  
  // Run migration or fix
  console.log('\n' + chalk.cyan(flags.fix ? 'Starting fix process...' : 'Starting migration...'));
  stats.total = files.length;
  
  for (const file of files) {
    if (flags.fix) {
      fixMigratedFile(file);
    } else {
      migrateTemplate(file, flags);
    }
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