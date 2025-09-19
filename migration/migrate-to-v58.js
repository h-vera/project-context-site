/**
 * HYBRID MIGRATION SCRIPT: v5.4-5.7 to v5.8
 * Path: /migration/migrate-to-v58.js
 * Purpose: Properly migrate biblical character templates to v5.8
 * Version: 5.0.0 - ENHANCED HYBRID VERSION - COMPLETE
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const cheerio = require('cheerio');

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  backupSuffix: '-backup-v57',
  logFile: './migration-log.txt',
  reportDir: './migration-reports',
  testMode: false,
  verbose: true,
  preserveCustom: true,
  analyzeOnly: false,
  createReports: true,
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

// ============================================
// CONTENT CATEGORIES
// ============================================
const CONTENT_CATEGORIES = {
  // Always migrate these exactly
  mandatory: [
    'overview',
    'narrative',
    'literary-context',
    'themes',
    'ane-context',
    'biblical-theology',
    'messianic',
    'application',
    'questions'
  ],
  
  // Migrate if present
  optional: [
    'major-chiasm',
    'eden',
    'wordplay',
    'covenant',
    'unique',
    'second-temple',
    'songs',
    'literary-artistry',
    'gender-dynamics',
    'intertext',
    'tables',
    'bibliography'
  ],
  
  // Preserve but flag for review
  custom: [
    'textual-clarification',
    'warning-box',
    'related-profiles',
    'custom-insights',
    'special-notes'
  ],
  
  // Never migrate (recreate from metadata)
  regenerate: [
    'character-title',
    'breadcrumbs'
  ]
};

// Standard classes used in templates
const STANDARD_CLASSES = new Set([
  'theology-card', 'animate-on-scroll', 'timeline', 'timeline-item',
  'panel', 'grid-2', 'grid-3', 'grid-4', 'key-insight',
  'glass-card', 'glass-premium', 'glass-textured', 'hover-lift',
  'card-3d', 'stagger-children', 'chiasm-card', 'chiasm-structure',
  'character-type-badge', 'complexity-indicator', 'complexity-level',
  'complexity-dot', 'filled', 'section-title', 'section-icon',
  'hebrew', 'greek', 'hebrew-large', 'greek-large', 'hebrew-inline',
  'meta', 'kv', 'tag', 'primary', 'word-study', 'cross-ref',
  'question-list', 'bibliography-section', 'enhanced',
  'source-category', 'source-entry', 'source-citation', 'source-usage',
  'usage-tag', 'usage-note', 'citation-note', 'breadcrumbs',
  'content-section', 'skip-link', 'reading-progress', 'back-to-top',
  'quick-nav-sidebar', 'quick-nav-item', 'mobile-section-tabs',
  'tabs-container', 'tab-item', 'tab-icon', 'tab-label', 'active',
  'bibliography-header', 'bibliography-inner', 'bibliography-icon',
  'bibliography-text', 'bibliography-title', 'bibliography-subtitle',
  'expand-indicator', 'bibliography-content', 'section-divider',
  'chiasm-title', 'chiasm-line', 'chiasm-center', 'indent-1',
  'indent-2', 'indent-3', 'significance', 'note', 'warning-box',
  'clarification-box', 'enhancement-indicator', 'optional-indicator',
  'profile-status-indicator', 'incomplete', 'multi-page-indicator',
  'character-profile', 'woman-profile'
]);

// Migration statistics
const stats = {
  total: 0,
  migrated: 0,
  skipped: 0,
  errors: 0,
  backedUp: 0,
  analyzed: 0,
  customContent: 0,
  warnings: []
};

// ============================================
// LOGGING UTILITIES
// ============================================
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
    stats.warnings.push(msg);
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
  },
  custom: (msg) => {
    console.log(chalk.magenta('⚡'), msg);
    appendToLog(`CUSTOM: ${msg}`);
  }
};

function appendToLog(msg) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(CONFIG.logFile, `[${timestamp}] ${msg}\n`);
}

// ============================================
// VERSION DETECTION
// ============================================
function detectTemplateVersion(html, $) {
  // Check meta tag first
  const metaVersion = $('meta[name="template-version"]').attr('content');
  if (metaVersion) {
    log.verbose(`Detected version from meta tag: ${metaVersion}`);
    return metaVersion;
  }
  
  // Fallback to CSS detection
  if (html.includes('global-v3.css')) return '5.8';
  if (html.includes('global-v2-enhanced.css')) return '5.7';
  if (html.includes('global-v2.min.css')) return '5.6';
  if (html.includes('global-v2.css')) {
    // Check for minified version indicator
    if (html.includes('global-v2.min.css')) return '5.6';
    
    // Check for extensive inline styles (v5.5 characteristic)
    const styleElements = $('style');
    const hasExtensiveInlineStyles = styleElements.length > 0 && 
      styleElements.toArray().some(el => $(el).html().length > 1000);
    
    if (hasExtensiveInlineStyles) {
      log.verbose('Detected v5.5 based on extensive inline styles');
      return '5.5';
    }
    
    return '5.5'; // Default for global-v2.css
  }
  
  log.warning('Could not detect template version reliably');
  return 'unknown';
}

// ============================================
// CHECK IF ALREADY MIGRATED
// ============================================
function isAlreadyMigrated(html) {
  const checks = [
    html.includes('global-v3.css'),
    html.includes('nav-premium.js'),
    html.includes('character-page-v2.js'),
    html.includes('template-version" content="5.8"')
  ];
  
  return checks.filter(Boolean).length >= 3;
}

// ============================================
// CUSTOM CONTENT DETECTION
// ============================================
function detectInlineCustomizations($) {
  const customizations = {
    inlineStyles: [],
    inlineScripts: [],
    customElements: [],
    customClasses: [],
    customDataAttributes: [],
    customSections: []
  };
  
  // Detect inline styles
  $('style').each(function() {
    const style = $(this).html();
    const isCustom = style && 
      !style.includes('/* template-default */') &&
      !style.includes('/* auto-generated */');
    
    if (isCustom) {
      customizations.inlineStyles.push({
        content: style.substring(0, 200) + (style.length > 200 ? '...' : ''),
        fullContent: style,
        location: $(this).parent().prop('tagName').toLowerCase(),
        length: style.length,
        preserve: true
      });
      log.custom(`Found custom inline styles (${style.length} chars)`);
    }
  });
  
  // Detect inline scripts
  $('script').not('[src]').each(function() {
    const script = $(this).html();
    const isCustom = script && script.trim() && 
      !script.includes('// template-default') &&
      !script.includes('NavigationComponent') && // Skip standard nav
      !script.includes('Template Version:'); // Skip version logging
    
    if (isCustom) {
      customizations.inlineScripts.push({
        content: script.substring(0, 200) + (script.length > 200 ? '...' : ''),
        fullContent: script,
        location: $(this).parent().prop('tagName').toLowerCase(),
        length: script.length,
        preserve: true
      });
      log.custom(`Found custom inline script (${script.length} chars)`);
    }
  });
  
  // Detect non-standard classes
  $('.theology-card, .panel, .timeline-item').each(function() {
    const classAttr = $(this).attr('class');
    if (!classAttr) return;
    
    const classes = classAttr.split(' ').filter(cls => cls.trim());
    classes.forEach(cls => {
      if (!STANDARD_CLASSES.has(cls) && cls !== '') {
        if (!customizations.customClasses.includes(cls)) {
          customizations.customClasses.push(cls);
        }
      }
    });
  });
  
  if (customizations.customClasses.length > 0) {
    log.custom(`Found custom classes: ${customizations.customClasses.join(', ')}`);
  }
  
  // Detect custom data attributes
  $('[data-custom], [data-special], [data-note]').each(function() {
    const $elem = $(this);
    const data = $elem.data();
    customizations.customDataAttributes.push({
      element: this.tagName.toLowerCase(),
      id: $elem.attr('id'),
      class: $elem.attr('class'),
      attributes: data,
      content: $elem.html().substring(0, 100)
    });
  });
  
  // Detect custom sections (warning boxes, clarifications, etc.)
  $('.theology-card').each(function() {
    const $card = $(this);
    const style = $card.attr('style');
    const heading = $card.find('h3, h4').first().text();
    
    // Check for custom styled sections
    if (style && (style.includes('background') || style.includes('border'))) {
      const id = $card.attr('id') || 'custom-' + Date.now();
      customizations.customSections.push({
        id: id,
        heading: heading,
        style: style,
        classes: $card.attr('class'),
        html: $card.prop('outerHTML'),
        type: detectCustomSectionType($card)
      });
      log.custom(`Found custom section: ${heading || id}`);
    }
  });
  
  return customizations;
}

function detectCustomSectionType($element) {
  const text = $element.text().toLowerCase();
  const heading = $element.find('h3, h4').first().text().toLowerCase();
  const style = $element.attr('style') || '';
  
  if (heading.includes('warning') || heading.includes('caution') || heading.includes('⚠️')) {
    return 'warning';
  }
  if (heading.includes('clarification') || heading.includes('note') || text.includes('distinguishing')) {
    return 'clarification';
  }
  if (style.includes('#fffbf0') || style.includes('#f0ad4e')) {
    return 'alert';
  }
  if (heading.includes('related') || heading.includes('profiles')) {
    return 'related';
  }
  
  return 'custom';
}

// ============================================
// CLEAN SECTION HTML
// ============================================
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
  
  // Remove any html tags and their attributes
  html = html.replace(/<html[^>]*>/gi, '');
  html = html.replace(/<\/html>/gi, '');
  
  // Remove any head sections completely
  html = html.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  html = html.replace(/<head[^>]*\/>/gi, '');
  
  // Remove any body tags and their attributes
  html = html.replace(/<body[^>]*>/gi, '');
  html = html.replace(/<\/body>/gi, '');
  
  // Remove any meta tags that might have been included
  html = html.replace(/<meta[^>]*>/gi, '');
  
  // Remove any script tags (unless preserving custom)
  if (!CONFIG.preserveCustom) {
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  }
  
  // Remove any link tags
  html = html.replace(/<link[^>]*>/gi, '');
  
  // Remove any title tags
  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '');
  
  // Trim whitespace
  html = html.trim();
  
  return html;
}

// ============================================
// ENHANCED CONTENT EXTRACTION
// ============================================
function extractContent($, version) {
  const contentData = {
    // Character info from title and meta
    characterName: '',
    bookName: '',
    hebrewName: '',
    greekName: '',
    
    // Meta tags
    description: '',
    gender: 'male',
    profileType: 'single-page',
    characterId: '',
    bookId: '',
    
    // Template version
    sourceVersion: version,
    
    // Body content sections
    sections: {},
    specialSections: {},
    customSections: {},
    
    // Original body classes
    bodyClasses: '',
    
    // Custom content detected
    hasCustomContent: false,
    customizations: null
  };
  
  // Extract customizations first
  contentData.customizations = detectInlineCustomizations($);
  contentData.hasCustomContent = 
    contentData.customizations.inlineStyles.length > 0 ||
    contentData.customizations.inlineScripts.length > 0 ||
    contentData.customizations.customSections.length > 0;
  
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
  
  // Extract Hebrew/Greek names
  const titleSection = $('#character-title, h1.section-title, h2.section-title').first();
  const hebrewSpan = titleSection.find('.hebrew-large, .hebrew').first();
  const greekSpan = titleSection.find('.greek-large, .greek').first();
  
  if (hebrewSpan.length) {
    contentData.hebrewName = hebrewSpan.text().trim();
  }
  if (greekSpan.length) {
    contentData.greekName = greekSpan.text().trim();
  }
  
  // Extract sections using improved logic
  const allSectionIds = [
    ...CONTENT_CATEGORIES.mandatory,
    ...CONTENT_CATEGORIES.optional
  ];
  
  allSectionIds.forEach(id => {
    const $section = extractSectionById($, id);
    if ($section) {
      contentData.sections[id] = $section;
      log.verbose(`Extracted section: ${id}`);
    }
  });
  
  // Extract custom sections
  if (contentData.customizations.customSections.length > 0) {
    contentData.customizations.customSections.forEach(customSection => {
      contentData.customSections[customSection.id] = customSection.html;
      log.verbose(`Preserved custom section: ${customSection.heading || customSection.id}`);
    });
  }
  
  // Extract special components
  extractSpecialComponents($, contentData);
  
  return contentData;
}

function extractSectionById($, id) {
  // Try multiple selectors
  const selectors = [
    `#${id}`,
    `[data-section="${id}"]`,
    `.theology-card#${id}`,
    `.animate-on-scroll#${id}`
  ];
  
  for (const selector of selectors) {
    const $element = $(selector);
    if ($element.length > 0) {
      return cleanSectionHtml($('<div>').append($element.clone()).html());
    }
  }
  
  // Fallback: try to find by heading content
  if (id === 'intertext' || id === 'tables') {
    const $tables = $('.grid-2').filter(function() {
      return $(this).find('table').length > 0;
    });
    if ($tables.length > 0) {
      return cleanSectionHtml($('<div>').append($tables.clone()).html());
    }
  }
  
  return null;
}

function extractSpecialComponents($, contentData) {
  // Character Type Badge
  const $badge = $('.character-type-badge').first();
  if ($badge.length) {
    contentData.specialSections['character-badge'] = cleanSectionHtml($badge.prop('outerHTML'));
  }
  
  // Complexity Indicator
  const $complexity = $('.complexity-indicator').first();
  if ($complexity.length) {
    contentData.specialSections['complexity-indicator'] = cleanSectionHtml($complexity.prop('outerHTML'));
  }
  
  // Bibliography (handle both old and new formats)
  const $bibliography = $('details.bibliography-section, .bibliography-section').first();
  if ($bibliography.length && !contentData.sections['bibliography']) {
    contentData.sections['bibliography'] = cleanSectionHtml($bibliography.prop('outerHTML'));
  }
}

// ============================================
// UPDATE SECTION CLASSES FOR v5.8
// ============================================
function updateSectionClasses(html) {
  if (!html) return '';
  
  // Update classes to v5.8 standards
  html = html.replace(/class="theology-card"/g, 'class="theology-card glass-premium animate-on-scroll"');
  html = html.replace(/class="animate-on-scroll"/g, 'class="animate-on-scroll"');
  
  // Update panel classes
  html = html.replace(/class="panel"/g, 'class="panel hover-lift"');
  
  // Add data-section-priority for proper animations
  if (html.includes('id="overview"')) {
    html = html.replace('id="overview"', 'id="overview" data-section-priority="1"');
  }
  if (html.includes('id="narrative"')) {
    html = html.replace('id="narrative"', 'id="narrative" data-section-priority="2"');
  }
  if (html.includes('id="biblical-theology"')) {
    html = html.replace('id="biblical-theology"', 'id="biblical-theology" data-section-priority="2"');
  }
  if (html.includes('id="messianic"')) {
    html = html.replace('id="messianic"', 'id="messianic" data-section-priority="3"');
  }
  if (html.includes('id="application"')) {
    html = html.replace('id="application"', 'id="application" data-section-priority="2"');
  }
  
  // Update grid classes
  html = html.replace(/class="grid-3"/g, 'class="grid-3 stagger-children"');
  
  // Ensure timeline items have proper classes
  html = html.replace(/class="timeline-item"/g, 'class="timeline-item"');
  
  return html;
}

// ============================================
// MIGRATION PLANNING
// ============================================
function createMigrationPlan(contentData, version) {
  const plan = {
    version: version,
    actions: [],
    warnings: [],
    manual_review: [],
    custom_preservations: []
  };
  
  // Check mandatory sections
  CONTENT_CATEGORIES.mandatory.forEach(id => {
    if (contentData.sections[id]) {
      plan.actions.push({
        type: 'migrate',
        section: id,
        category: 'mandatory',
        method: 'standard'
      });
    } else {
      plan.warnings.push({
        type: 'missing-mandatory',
        section: id,
        severity: 'high'
      });
    }
  });
  
  // Check optional sections
  CONTENT_CATEGORIES.optional.forEach(id => {
    if (contentData.sections[id]) {
      plan.actions.push({
        type: 'migrate',
        section: id,
        category: 'optional',
        method: 'preserve-structure'
      });
    }
  });
  
  // Handle custom content
  if (contentData.hasCustomContent) {
    // Inline styles
    if (contentData.customizations.inlineStyles.length > 0) {
      plan.manual_review.push({
        type: 'inline-styles',
        count: contentData.customizations.inlineStyles.length,
        totalChars: contentData.customizations.inlineStyles.reduce((sum, s) => sum + s.length, 0),
        action: 'review-and-integrate',
        severity: 'medium'
      });
      
      if (CONFIG.preserveCustom) {
        plan.custom_preservations.push({
          type: 'styles',
          content: contentData.customizations.inlineStyles
        });
      }
    }
    
    // Inline scripts
    if (contentData.customizations.inlineScripts.length > 0) {
      plan.manual_review.push({
        type: 'inline-scripts',
        count: contentData.customizations.inlineScripts.length,
        action: 'review-for-compatibility',
        severity: 'high'
      });
      
      if (CONFIG.preserveCustom) {
        plan.custom_preservations.push({
          type: 'scripts',
          content: contentData.customizations.inlineScripts
        });
      }
    }
    
    // Custom classes
    if (contentData.customizations.customClasses.length > 0) {
      plan.manual_review.push({
        type: 'custom-classes',
        classes: contentData.customizations.customClasses,
        action: 'add-to-custom-css',
        severity: 'low'
      });
    }
    
    // Custom sections
    if (contentData.customizations.customSections.length > 0) {
      contentData.customizations.customSections.forEach(section => {
        plan.actions.push({
          type: 'preserve-custom',
          section: section.id,
          category: 'custom',
          sectionType: section.type,
          method: 'preserve-with-update'
        });
      });
    }
  }
  
  return plan;
}

// ============================================
// BUILD MAIN CONTENT
// ============================================
function buildMainContent(contentData, plan) {
  let mainContent = '';
  
  // Add breadcrumbs (always regenerate)
  mainContent += `
    <!-- Breadcrumbs -->
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> ›
      <a href="/studies/">Studies</a> ›
      <a href="/studies/characters/characters_hub.html">Biblical Characters</a> ›
      <a href="/studies/characters/characters_hub.html#${contentData.bookId}">${contentData.bookName}</a> ›
      <span aria-current="page">${contentData.characterName}</span>
    </nav>\n`;
  
  // Always generate character title fresh
  mainContent += `
    <h1 id="character-title" class="section-title" 
        data-character-id="${contentData.characterId}" 
        data-book="${contentData.bookId}">
      <span class="section-icon icon-svg" data-icon="user"></span>
      ${contentData.characterName}
      ${contentData.hebrewName ? `<span class="hebrew-large">${contentData.hebrewName}</span>` : ''}
      ${contentData.greekName ? `<span class="greek-large">${contentData.greekName}</span>` : ''}
    </h1>\n`;
  
  // Add special sections
  if (contentData.specialSections['character-badge']) {
    mainContent += '\n    ' + contentData.specialSections['character-badge'] + '\n';
  }
  
  if (contentData.specialSections['complexity-indicator']) {
    mainContent += '\n    ' + contentData.specialSections['complexity-indicator'] + '\n';
  }
  
  // Add custom sections that come before main content
  Object.entries(contentData.customSections).forEach(([id, html]) => {
    if (id.includes('clarification') || id.includes('warning')) {
      mainContent += '\n    <!-- Custom Section: ' + id + ' -->\n';
      mainContent += '    ' + updateSectionClasses(html) + '\n';
    }
  });
  
  // Add main sections in proper order
  const sectionOrder = [
    'overview',
    'narrative',
    'literary-context',
    'major-chiasm',
    'literary-artistry',
    'themes',
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
  
  sectionOrder.forEach(sectionId => {
    if (contentData.sections[sectionId]) {
      const sectionHtml = updateSectionClasses(contentData.sections[sectionId]);
      if (sectionHtml && !sectionHtml.includes('<html') && !sectionHtml.includes('<body')) {
        mainContent += '\n    ' + sectionHtml + '\n';
      } else if (sectionHtml) {
        log.warning(`Skipping section ${sectionId} due to nested HTML`);
      }
    }
  });
  
  // Add remaining custom sections
  Object.entries(contentData.customSections).forEach(([id, html]) => {
    if (!id.includes('clarification') && !id.includes('warning')) {
      mainContent += '\n    <!-- Custom Section: ' + id + ' -->\n';
      mainContent += '    ' + updateSectionClasses(html) + '\n';
    }
  });
  
  // Add bibliography last
  if (contentData.sections['bibliography']) {
    mainContent += '\n    ' + updateSectionClasses(contentData.sections['bibliography']) + '\n';
  }
  
  return mainContent;
}

// ============================================
// BUILD v5.8 PAGE
// ============================================
function buildV58Page(templatePath, contentData, plan) {
  // Load the v5.8 template
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found at: ${templatePath}`);
  }
  
  let template = fs.readFileSync(templatePath, 'utf8');
  
  // Build the complete main content
  const mainContent = buildMainContent(contentData, plan);
  
  // Final validation - check the main content doesn't have nested HTML
  if (mainContent.includes('<html') || mainContent.includes('<body')) {
    const htmlPos = mainContent.indexOf('<html');
    const bodyPos = mainContent.indexOf('<body');
    log.error(`Main content still contains HTML tags at positions: html=${htmlPos}, body=${bodyPos}`);
    throw new Error('Main content contains nested HTML/BODY tags');
  }
  
  // Prepare all replacements
  const replacements = [
    { find: /\[Character Name\]/g, replace: contentData.characterName },
    { find: /\[Book\]/g, replace: contentData.bookName },
    { find: /\[Hebrew Name\]/g, replace: contentData.hebrewName || '' },
    { find: /\[Greek Name\]/g, replace: contentData.greekName || '' },
    { find: /\[Hebrew\/Greek\]/g, replace: contentData.hebrewName || contentData.greekName || '' },
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
  
  // Handle description replacements
  if (contentData.description) {
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
  
  // Replace the main content section
  const mainStartMatch = template.match(/<main[^>]*>/);
  const mainEndMatch = template.match(/<\/main>/);
  
  if (mainStartMatch && mainEndMatch) {
    const mainStart = template.indexOf(mainStartMatch[0]) + mainStartMatch[0].length;
    const mainEnd = template.lastIndexOf('</main>');
    
    template = template.substring(0, mainStart) + '\n' + 
               mainContent + '\n  ' +
               template.substring(mainEnd);
  }
  
  // Add custom styles if preserved
  if (CONFIG.preserveCustom && plan.custom_preservations.length > 0) {
    const customStyles = plan.custom_preservations
      .filter(p => p.type === 'styles')
      .map(p => p.content.map(s => s.fullContent).join('\n'))
      .join('\n');
    
    if (customStyles) {
      // Add custom styles before closing head tag
      template = template.replace('</head>', 
        `\n  <!-- Custom Preserved Styles -->\n  <style>\n${customStyles}\n  </style>\n</head>`);
      log.custom('Added preserved custom styles to output');
    }
    
    const customScripts = plan.custom_preservations
      .filter(p => p.type === 'scripts')
      .map(p => p.content.map(s => s.fullContent).join('\n'))
      .join('\n');
    
    if (customScripts) {
      // Add custom scripts before closing body tag
      template = template.replace('</body>',
        `\n  <!-- Custom Preserved Scripts -->\n  <script>\n${customScripts}\n  </script>\n</body>`);
      log.custom('Added preserved custom scripts to output');
    }
  }
  
  // Final check - ensure no nested HTML in final output
  const finalCheck = template.match(/<html[^>]*>[\s\S]*<html/);
  if (finalCheck) {
    throw new Error('Final output contains nested HTML tags');
  }
  
  return template;
}

// ============================================
// GENERATE RECOMMENDATIONS
// ============================================
function generateRecommendations(plan, contentData) {
  const recommendations = [];
  
  // Missing mandatory sections
  const missingMandatory = plan.warnings.filter(w => w.type === 'missing-mandatory');
  if (missingMandatory.length > 0) {
    recommendations.push({
      priority: 'high',
      type: 'missing-content',
      action: `Add missing mandatory sections: ${missingMandatory.map(w => w.section).join(', ')}`,
      sections: missingMandatory.map(w => w.section)
    });
  }
  
  // Custom styles review
  if (contentData.customizations.inlineStyles.length > 0) {
    recommendations.push({
      priority: 'medium',
      type: 'custom-styles',
      action: 'Review inline styles and migrate to custom CSS file or global-v3.css',
      details: `${contentData.customizations.inlineStyles.length} style blocks found`
    });
  }
  
  // Custom scripts review
  if (contentData.customizations.inlineScripts.length > 0) {
    recommendations.push({
      priority: 'high',
      type: 'custom-scripts',
      action: 'Test inline scripts with v5.8 JavaScript modules',
      details: `${contentData.customizations.inlineScripts.length} script blocks found`
    });
  }
  
  // Custom classes
  if (contentData.customizations.customClasses.length > 0) {
    recommendations.push({
      priority: 'low',
      type: 'custom-classes',
      action: 'Add custom classes to a supplementary CSS file',
      classes: contentData.customizations.customClasses
    });
  }
  
  // Version-specific recommendations
  if (contentData.sourceVersion === '5.5') {
    recommendations.push({
      priority: 'medium',
      type: 'version-upgrade',
      action: 'Test mobile responsiveness thoroughly (major changes from v5.5)',
      details: 'v5.5 had different mobile handling'
    });
  }
  
  if (contentData.sourceVersion === '5.6' || contentData.sourceVersion === '5.7') {
    recommendations.push({
      priority: 'low',
      type: 'version-upgrade',
      action: 'Review glass morphism effects and animations',
      details: 'v5.8 has enhanced visual effects'
    });
  }
  
  return recommendations;
}

// ============================================
// MIGRATION REPORTING
// ============================================
function generateMigrationReport(file, plan, contentData, result) {
  const report = {
    file: path.basename(file),
    path: file,
    timestamp: new Date().toISOString(),
    
    character: {
      name: contentData.characterName,
      id: contentData.characterId,
      book: contentData.bookName,
      bookId: contentData.bookId,
      gender: contentData.gender,
      profileType: contentData.profileType
    },
    
    source: {
      version: contentData.sourceVersion,
      hasCustomContent: contentData.hasCustomContent,
      bodyClasses: contentData.bodyClasses
    },
    
    migration: {
      status: result.status,
      error: result.error,
      
      sections: {
        mandatory: {
          total: CONTENT_CATEGORIES.mandatory.length,
          migrated: plan.actions.filter(a => 
            a.category === 'mandatory'
          ).length,
          missing: plan.warnings.filter(w => 
            w.type === 'missing-mandatory'
          ).map(w => w.section)
        },
        optional: {
          total: CONTENT_CATEGORIES.optional.length,
          migrated: plan.actions.filter(a => 
            a.category === 'optional'
          ).length
        },
        custom: {
          total: Object.keys(contentData.customSections).length,
          preserved: plan.actions.filter(a => 
            a.category === 'custom'
          ).length
        }
      },
      
      customContent: {
        inlineStyles: contentData.customizations.inlineStyles.length,
        inlineScripts: contentData.customizations.inlineScripts.length,
        customClasses: contentData.customizations.customClasses,
        customSections: contentData.customizations.customSections.map(s => ({
          id: s.id,
          type: s.type,
          heading: s.heading
        }))
      },
      
      warnings: plan.warnings,
      manualReview: plan.manual_review,
      preservations: plan.custom_preservations.map(p => ({
        type: p.type,
        count: Array.isArray(p.content) ? p.content.length : 1
      }))
    },
    
    recommendations: generateRecommendations(plan, contentData)
  };
  
  // Save report
  if (CONFIG.createReports) {
    if (!fs.existsSync(CONFIG.reportDir)) {
      fs.mkdirSync(CONFIG.reportDir, { recursive: true });
    }
    
    const reportName = path.basename(file, '.html') + '-migration-report.json';
    const reportPath = path.join(CONFIG.reportDir, reportName);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log.verbose(`Report saved: ${reportPath}`);
  }
  
  return report;
}

// ============================================
// MAIN MIGRATION FUNCTION
// ============================================
function migrateTemplate(filePath, options = {}) {
  const fileName = path.basename(filePath);
  log.verbose(`Processing ${fileName}`);
  stats.total++;
  
  try {
    // Read the original file
    const originalHtml = fs.readFileSync(filePath, 'utf8');
    
    // Check for corruption
    const htmlTagCount = (originalHtml.match(/<html/gi) || []).length;
    const bodyTagCount = (originalHtml.match(/<body/gi) || []).length;
    
    if (htmlTagCount > 1 || bodyTagCount > 1) {
      log.error(`❌ SOURCE FILE IS CORRUPTED: Contains ${htmlTagCount} <html> and ${bodyTagCount} <body> tags!`);
      
      // Check for backups
      const possibleBackups = [
        filePath.replace('.html', '-backup-v57.html'),
        filePath.replace('.html', '.backup.html'),
        filePath.replace('.html', '-original.html')
      ];
      
      for (const backupPath of possibleBackups) {
        if (fs.existsSync(backupPath)) {
          log.info(`✅ Backup found: ${path.basename(backupPath)}`);
          log.info(`To restore, run: cp "${backupPath}" "${filePath}"`);
          break;
        }
      }
      
      stats.errors++;
      return { status: 'error', error: 'Source file corrupted' };
    }
    
    // Load with cheerio
    const $ = cheerio.load(originalHtml, {
      xml: false,
      decodeEntities: false
    });
    
    // Detect version
    const version = detectTemplateVersion(originalHtml, $);
    log.info(`Detected version: ${version}`);
    
    // Check if already migrated
    if (isAlreadyMigrated(originalHtml)) {
      log.verbose(`Already migrated to v5.8: ${fileName}`);
      stats.skipped++;
      return { status: 'skipped', reason: 'already migrated to v5.8' };
    }
    
    // Extract content
    const contentData = extractContent($, version);
    log.verbose(`Extracted content for: ${contentData.characterName || 'unknown'}`);
    
    // Log extraction details
    const regularSections = Object.keys(contentData.sections).length;
    const specialSections = Object.keys(contentData.specialSections).length;
    const customSections = Object.keys(contentData.customSections).length;
    log.verbose(`Found ${regularSections} regular, ${specialSections} special, ${customSections} custom sections`);
    
    // Create migration plan
    const plan = createMigrationPlan(contentData, version);
    log.verbose(`Created migration plan with ${plan.actions.length} actions`);
    
    // If analyze only mode, generate report and stop
    if (CONFIG.analyzeOnly) {
      const report = generateMigrationReport(filePath, plan, contentData, { status: 'analyzed' });
      stats.analyzed++;
      log.success(`Analysis complete: ${fileName}`);
      return { status: 'analyzed', report };
    }
    
    // Create backup if not in test mode
    if (!CONFIG.testMode) {
      const backupPath = filePath.replace('.html', `${CONFIG.backupSuffix}.html`);
      fs.copyFileSync(filePath, backupPath);
      stats.backedUp++;
      log.verbose(`Backup created: ${path.basename(backupPath)}`);
    }
    
    // Build the new v5.8 page
    const newHtml = buildV58Page(CONFIG.templatePath, contentData, plan);
    
    // Verify the output
    if (newHtml.includes('<html class=') || newHtml.includes('<html data-section-priority=')) {
      throw new Error('Generated HTML contains malformed nested HTML tags');
    }
    
    // Save migrated file if not in test mode
    if (!CONFIG.testMode) {
      fs.writeFileSync(filePath, newHtml);
      log.success(`Migrated: ${fileName}`);
    } else {
      log.info(`TEST MODE - Would migrate: ${fileName}`);
    }
    
    // Generate report
    const report = generateMigrationReport(filePath, plan, contentData, { status: 'migrated' });
    
    // Track custom content
    if (contentData.hasCustomContent) {
      stats.customContent++;
      log.custom(`File has custom content that was preserved: ${fileName}`);
    }
    
    stats.migrated++;
    return { status: 'migrated', contentData, report };
    
  } catch (error) {
    log.error(`Failed to migrate ${fileName}: ${error.message}`);
    if (CONFIG.verbose) {
      console.error(error.stack);
    }
    stats.errors++;
    
    // Generate error report
    if (CONFIG.createReports) {
      const errorReport = {
        file: fileName,
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      };
      
      if (!fs.existsSync(CONFIG.reportDir)) {
        fs.mkdirSync(CONFIG.reportDir, { recursive: true });
      }
      
      const reportPath = path.join(CONFIG.reportDir, `${path.basename(fileName, '.html')}-error.json`);
      fs.writeFileSync(reportPath, JSON.stringify(errorReport, null, 2));
    }
    
    return { status: 'error', error: error.message };
  }
}

// ============================================
// MAIN EXECUTION
// ============================================
async function main() {
  console.log(chalk.cyan('\n╔════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║   Template Migration Tool v5.8 (v5.0.0)   ║'));
  console.log(chalk.cyan('║           ENHANCED HYBRID VERSION         ║'));
  console.log(chalk.cyan('╚════════════════════════════════════════════╝\n'));
  
  // Parse command line arguments
  const args = process.argv.slice(2);
  const flags = {
    test: args.includes('--test'),
    single: args.includes('--single') ? args[args.indexOf('--single') + 1] : null,
    folder: args.includes('--folder') ? args[args.indexOf('--folder') + 1] : './',
    verbose: args.includes('--verbose'),
    analyzeOnly: args.includes('--analyze-only') || args.includes('--analyze'),
    preserveCustom: !args.includes('--no-preserve-custom'),
    createReports: !args.includes('--no-reports'),
    help: args.includes('--help') || args.includes('-h')
  };
  
  // Show help if requested
  if (flags.help) {
    console.log(chalk.yellow('Usage:'));
    console.log('  node migrate-to-v58.js [options]\n');
    console.log(chalk.yellow('Options:'));
    console.log('  --single <file>       Migrate a single file');
    console.log('  --folder <path>       Folder to search for templates (default: ./)');
    console.log('  --test               Test mode (no files modified)');
    console.log('  --verbose            Show detailed output');
    console.log('  --analyze-only       Analyze files without migrating');
    console.log('  --no-preserve-custom Do not preserve custom content');
    console.log('  --no-reports         Do not create migration reports');
    console.log('  --help               Show this help message\n');
    console.log(chalk.yellow('Examples:'));
    console.log('  node migrate-to-v58.js --analyze-only --folder studies/');
    console.log('  node migrate-to-v58.js --single studies/characters/david.html --test');
    console.log('  node migrate-to-v58.js --folder studies/characters/ --preserve-custom');
    process.exit(0);
  }
  
  // Apply flags to config
  CONFIG.testMode = flags.test;
  CONFIG.verbose = flags.verbose;
  CONFIG.analyzeOnly = flags.analyzeOnly;
  CONFIG.preserveCustom = flags.preserveCustom;
  CONFIG.createReports = flags.createReports;
  
  // Display current configuration
  console.log(chalk.blue('Configuration:'));
  console.log(`  Mode: ${CONFIG.analyzeOnly ? 'ANALYZE ONLY' : (CONFIG.testMode ? 'TEST' : 'PRODUCTION')}`);
  console.log(`  Preserve Custom: ${CONFIG.preserveCustom ? 'YES' : 'NO'}`);
  console.log(`  Create Reports: ${CONFIG.createReports ? 'YES' : 'NO'}`);
  console.log(`  Verbose: ${CONFIG.verbose ? 'YES' : 'NO'}`);
  console.log();
  
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
  console.log('\n' + chalk.cyan(CONFIG.analyzeOnly ? 'Starting analysis...' : 'Starting migration...'));
  
  for (const file of files) {
    migrateTemplate(file, flags);
  }
  
  // Display results
  console.log('\n' + chalk.cyan('═══════════════════════════════════════════'));
  console.log(chalk.cyan('Summary:'));
  console.log(chalk.cyan('═══════════════════════════════════════════'));
  console.log(`Total files:       ${stats.total}`);
  
  if (CONFIG.analyzeOnly) {
    console.log(chalk.blue(`✔ Analyzed:        ${stats.analyzed}`));
  } else {
    console.log(chalk.green(`✔ Migrated:        ${stats.migrated}`));
  }
  
  console.log(chalk.yellow(`⚠ Skipped:         ${stats.skipped}`));
  console.log(chalk.red(`✖ Errors:          ${stats.errors}`));
  
  if (stats.customContent > 0) {
    console.log(chalk.magenta(`⚡ Custom Content:  ${stats.customContent}`));
  }
  
  if (stats.backedUp > 0) {
    console.log(chalk.blue(`↻ Backed up:       ${stats.backedUp}`));
  }
  
  if (stats.warnings.length > 0) {
    console.log('\n' + chalk.yellow('Warnings:'));
    stats.warnings.slice(0, 5).forEach(w => console.log(`  • ${w}`));
    if (stats.warnings.length > 5) {
      console.log(`  ... and ${stats.warnings.length - 5} more (see log file)`);
    }
  }
  
  if (CONFIG.testMode) {
    console.log('\n' + chalk.yellow('TEST MODE - No files were actually modified'));
    console.log(chalk.gray('Run without --test flag to perform actual migration'));
  }
  
  if (CONFIG.analyzeOnly) {
    console.log('\n' + chalk.blue('Analysis complete!'));
    if (CONFIG.createReports) {
      console.log(chalk.gray(`Reports saved in: ${CONFIG.reportDir}/`));
    }
    console.log(chalk.gray('Review the reports and run without --analyze-only to migrate'));
  }
  
  if (stats.migrated > 0 && !CONFIG.testMode) {
    console.log('\n' + chalk.green('✨ Migration successful!'));
    console.log(chalk.gray('Backup files have been created with suffix: ' + CONFIG.backupSuffix));
    
    if (CONFIG.createReports) {
      console.log(chalk.gray(`Migration reports saved in: ${CONFIG.reportDir}/`));
    }
    
    if (stats.customContent > 0) {
      console.log('\n' + chalk.magenta('⚡ Custom content was detected and preserved'));
      console.log(chalk.gray('Review the migration reports for manual verification needed'));
    }
  }
  
  // Provide next steps
  if (stats.migrated > 0 || stats.analyzed > 0) {
    console.log('\n' + chalk.cyan('Next Steps:'));
    console.log('1. Review migration reports in ' + CONFIG.reportDir);
    console.log('2. Test migrated files in browser');
    console.log('3. Check mobile responsiveness');
    console.log('4. Verify custom content preservation');
    console.log('5. Test any preserved inline scripts');
  }
}

// Run the script
main().catch(error => {
  log.error(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});