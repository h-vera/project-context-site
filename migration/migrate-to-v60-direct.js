/**
 * MIGRATION SCRIPT: v5.5/5.6/5.7 to v6.0 (Direct Migration)
 * Path: /migration/migrate-to-v60-direct.js
 * Purpose: Migrate biblical character templates directly to v6.0 from older versions
 * Version: 1.0.0 - Direct migration path
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
  backupSuffix: '-backup-pre-v60',
  logFile: './migration-v60-log.txt',
  reportDir: './migration-reports-v60',
  testMode: false,
  verbose: true,
  preserveCustom: true,
  analyzeOnly: false,
  createReports: true,
  templatePath: path.join(process.cwd(), 'templates/biblical-character-template-v6.0.html'),
  
  // File patterns to find templates
  patterns: [
    '**/studies/characters/**/*.html',
    '**/studies/women/**/*.html',
    '!**/*backup*.html',
    '!**/*test*.html',
    '!**/*template*.html'
  ],
  
  // Version 6.0 specific features
  v60Features: {
    enhancedMeta: true,           // Structured data, enhanced meta tags
    consolidatedInit: true,       // Use consolidated-init.js instead of separate scripts
    improvedAccessibility: true,  // Enhanced ARIA labels
    mobileOptimizations: true,    // Better mobile support
    glassMorphism: true,          // New glass-premium effects
    iconSystem: 'css-based',      // CSS-based icon system
    performanceMonitoring: true   // Built-in performance monitoring
  }
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
  
  // Never migrate (regenerate from metadata)
  regenerate: [
    'character-title',
    'breadcrumbs',
    'navigation'
  ]
};

// Migration statistics
const stats = {
  total: 0,
  migrated: 0,
  skipped: 0,
  errors: 0,
  backedUp: 0,
  analyzed: 0,
  customContent: 0,
  warnings: [],
  versionCounts: {
    '5.5': 0,
    '5.6': 0,
    '5.7': 0,
    'unknown': 0
  }
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
  },
  v60: (msg) => {
    console.log(chalk.cyan('🚀'), msg);
    appendToLog(`V6.0: ${msg}`);
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
  
  // Check for v6.0 indicators
  if (html.includes('consolidated-init.js')) return '6.0';
  if (html.includes('global-v3.css') && html.includes('character-page-v2.js')) return '5.8';
  
  // Check for older versions
  if (html.includes('global-v2-enhanced.css')) return '5.7';
  if (html.includes('global-v2.min.css')) return '5.6';
  
  // Check for v5.5 specific patterns
  if (html.includes('nav-component.js') && html.includes('character-page.js')) {
    return '5.5';
  }
  
  // Additional v5.5 detection
  if (html.includes('global-v2.css')) {
    const hasMinified = html.includes('global-v2.min.css');
    const hasNavComponent = html.includes('nav-component.js');
    const hasOldCharacterJS = html.includes('character-page.js');
    
    if (hasNavComponent || hasOldCharacterJS) return '5.5';
    if (hasMinified) return '5.6';
    
    // Check for inline styles (v5.5 characteristic)
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
// CHECK IF ALREADY v6.0
// ============================================
function isAlreadyV60(html) {
  const checks = [
    html.includes('global-v3.css'),
    html.includes('consolidated-init.js'),
    html.includes('template-version" content="6.0'),
    html.includes('viewport-fit=cover'),
    html.includes('mobile-web-app-capable'),
    html.includes('application/ld+json') // Structured data
  ];
  
  return checks.filter(Boolean).length >= 4;
}

// ============================================
// EXTRACT CONTENT FROM OLD TEMPLATE
// ============================================
function extractContent($, version) {
  const contentData = {
    // Character info
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
  contentData.customizations = detectCustomizations($);
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
  
  // Extract sections
  const allSectionIds = [
    ...CONTENT_CATEGORIES.mandatory,
    ...CONTENT_CATEGORIES.optional
  ];
  
  allSectionIds.forEach(id => {
    const $section = extractSectionById($, id);
    if ($section) {
      contentData.sections[id] = cleanSectionHtml($section);
      log.verbose(`Extracted section: ${id}`);
    }
  });
  
  // Extract special components
  extractSpecialComponents($, contentData);
  
  // Extract custom sections
  if (contentData.customizations.customSections.length > 0) {
    contentData.customizations.customSections.forEach(customSection => {
      contentData.customSections[customSection.id] = customSection.html;
      log.verbose(`Preserved custom section: ${customSection.heading || customSection.id}`);
    });
  }
  
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
      return $('<div>').append($element.clone()).html();
    }
  }
  
  // Special handling for intertext tables
  if (id === 'intertext' || id === 'tables') {
    const $tables = $('.grid-2').filter(function() {
      return $(this).find('table').length > 0;
    });
    if ($tables.length > 0) {
      return $('<div>').append($tables.clone()).html();
    }
  }
  
  return null;
}

function extractSpecialComponents($, contentData) {
  // Character Type Badge
  const $badge = $('.character-type-badge').first();
  if ($badge.length) {
    contentData.specialSections['character-badge'] = $badge.prop('outerHTML');
  }
  
  // Complexity Indicator
  const $complexity = $('.complexity-indicator').first();
  if ($complexity.length) {
    contentData.specialSections['complexity-indicator'] = $complexity.prop('outerHTML');
  }
  
  // Bibliography (handle both old and new formats)
  const $bibliography = $('details.bibliography-section, .bibliography-section').first();
  if ($bibliography.length && !contentData.sections['bibliography']) {
    contentData.sections['bibliography'] = $bibliography.prop('outerHTML');
  }
  
  // Mobile section tabs (v5.7)
  const $mobileTabs = $('.mobile-section-tabs').first();
  if ($mobileTabs.length) {
    log.verbose('Found v5.7 mobile tabs - will be regenerated with v6.0 system');
  }
}

function cleanSectionHtml(html) {
  if (!html) return '';
  
  // Remove any full HTML document wrapper
  html = html.replace(/<!DOCTYPE[^>]*>/gi, '');
  html = html.replace(/<html[^>]*>/gi, '');
  html = html.replace(/<\/html>/gi, '');
  html = html.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  html = html.replace(/<body[^>]*>/gi, '');
  html = html.replace(/<\/body>/gi, '');
  html = html.replace(/<meta[^>]*>/gi, '');
  html = html.replace(/<link[^>]*>/gi, '');
  html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '');
  
  return html.trim();
}

// ============================================
// DETECT CUSTOMIZATIONS
// ============================================
function detectCustomizations($) {
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
  
  // Detect inline scripts (excluding navigation)
  $('script').not('[src]').each(function() {
    const script = $(this).html();
    const isCustom = script && script.trim() && 
      !script.includes('// template-default') &&
      !script.includes('NavigationComponent') &&
      !script.includes('Template Version:') &&
      !script.includes('initPremiumNav') &&
      !script.includes('APP_CONFIG');
    
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
  
  // Detect custom sections with unique styling
  $('.theology-card').each(function() {
    const $card = $(this);
    const style = $card.attr('style');
    const heading = $card.find('h3, h4').first().text();
    
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
// UPDATE SECTIONS FOR v6.0
// ============================================
function updateSectionsForV60(html) {
  if (!html) return '';
  
  // Update classes to v6.0 standards
  html = html.replace(/class="theology-card"/g, 'class="theology-card glass-premium animate-on-scroll"');
  html = html.replace(/class="animate-on-scroll"/g, 'class="animate-on-scroll"');
  html = html.replace(/class="panel"/g, 'class="panel hover-lift"');
  
  // Add v6.0 specific attributes
  html = addDataSectionPriorities(html);
  
  // Add hover-lift to tags
  html = html.replace(/class="tag primary"/g, 'class="tag primary hover-lift"');
  html = html.replace(/class="tag"(?!.*hover-lift)/g, 'class="tag hover-lift"');
  
  // Update grid classes
  html = html.replace(/class="grid-3"/g, 'class="grid-3 stagger-children"');
  html = html.replace(/class="grid-4"/g, 'class="grid-4"');
  
  // Add 3D card effects where appropriate
  html = html.replace(/class="panel hover-lift"/g, 'class="panel hover-lift card-3d"');
  
  // Update icon system to use CSS-based icons
  html = updateIconSystem(html);
  
  return html;
}

function addDataSectionPriorities(html) {
  // Add data-section-priority for proper animations
  const priorities = {
    'overview': '1',
    'narrative': '2',
    'biblical-theology': '2',
    'messianic': '3',
    'application': '2',
    'literary-context': '3',
    'themes': '3',
    'ane-context': '4',
    'questions': '3'
  };
  
  Object.entries(priorities).forEach(([id, priority]) => {
    const regex = new RegExp(`id="${id}"`, 'g');
    html = html.replace(regex, `id="${id}" data-section-priority="${priority}"`);
  });
  
  return html;
}

function updateIconSystem(html) {
  // Replace emoji icons with CSS-based icon system
  const iconMappings = {
    '👤': '<span class="icon-svg" data-icon="user"></span>',
    '📋': '<span class="icon-svg" data-icon="overview"></span>',
    '📖': '<span class="icon-svg" data-icon="narrative"></span>',
    '✍️': '<span class="icon-svg" data-icon="literary"></span>',
    '🎯': '<span class="icon-svg" data-icon="themes"></span>',
    '⛪': '<span class="icon-svg" data-icon="theology"></span>',
    '💡': '<span class="icon-svg" data-icon="application"></span>',
    '❓': '<span class="icon-svg" data-icon="questions"></span>',
    '👑': '<span class="icon-svg" data-icon="crown"></span>',
    '📜': '<span class="icon-svg" data-icon="scroll"></span>',
    '🔍': '<span class="icon-svg" data-icon="search"></span>'
  };
  
  Object.entries(iconMappings).forEach(([emoji, replacement]) => {
    html = html.replace(new RegExp(emoji, 'g'), replacement);
  });
  
  return html;
}

// ============================================
// BUILD v6.0 PAGE
// ============================================
function buildV60Page(templatePath, contentData) {
  // Load the v6.0 template
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found at: ${templatePath}`);
  }
  
  let template = fs.readFileSync(templatePath, 'utf8');
  
  // Build the main content
  const mainContent = buildMainContent(contentData);
  
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
    { find: /\[character-name\]/g, replace: contentData.characterId },
    { find: /\[Year\]/g, replace: new Date().getFullYear().toString() },
    { find: /\[ISO-date\]/g, replace: new Date().toISOString() }
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
  }
  
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
  if (CONFIG.preserveCustom && contentData.customizations.inlineStyles.length > 0) {
    const customStyles = contentData.customizations.inlineStyles
      .map(s => s.fullContent)
      .join('\n');
    
    if (customStyles) {
      template = template.replace('</head>', 
        `\n  <!-- Custom Preserved Styles -->\n  <style>\n${customStyles}\n  </style>\n</head>`);
      log.custom('Added preserved custom styles to output');
    }
  }
  
  // Add custom scripts if preserved (but after v6.0 scripts)
  if (CONFIG.preserveCustom && contentData.customizations.inlineScripts.length > 0) {
    const customScripts = contentData.customizations.inlineScripts
      .map(s => s.fullContent)
      .join('\n');
    
    if (customScripts) {
      template = template.replace('</body>',
        `\n  <!-- Custom Preserved Scripts -->\n  <script>\n${customScripts}\n  </script>\n</body>`);
      log.custom('Added preserved custom scripts to output');
    }
  }
  
  return template;
}

function buildMainContent(contentData) {
  let mainContent = '';
  
  // Add breadcrumbs (always regenerate for v6.0 structure)
  mainContent += `
    <!-- ============================================
         MANDATORY: BREADCRUMBS
         ============================================ -->
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a> ›
      <a href="/studies/">Studies</a> ›
      <a href="/studies/characters/characters_hub.html">Biblical Characters</a> ›
      <a href="/studies/characters/characters_hub.html#${contentData.bookId}">${contentData.bookName}</a> ›
      <span aria-current="page">${contentData.characterName}</span>
    </nav>\n`;
  
  // Generate character title with v6.0 structure
  mainContent += `
    <!-- ============================================
         MANDATORY: TITLE & METADATA
         ============================================ -->
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
    mainContent += '\n    ' + updateSectionsForV60(contentData.specialSections['character-badge']) + '\n';
  }
  
  if (contentData.specialSections['complexity-indicator']) {
    mainContent += '\n    ' + updateSectionsForV60(contentData.specialSections['complexity-indicator']) + '\n';
  }
  
  // Add custom sections that come before main content
  Object.entries(contentData.customSections).forEach(([id, html]) => {
    if (id.includes('clarification') || id.includes('warning')) {
      mainContent += '\n    <!-- Custom Section: ' + id + ' -->\n';
      mainContent += '    ' + updateSectionsForV60(html) + '\n';
    }
  });
  
  // Add main sections in proper v6.0 order
  const sectionOrder = [
    'overview',
    'narrative',
    'literary-context',
    'themes',
    'major-chiasm',
    'literary-artistry',
    'ane-context',
    'eden',
    'wordplay',
    'covenant',
    'unique',
    'biblical-theology',
    'messianic',
    'intertext',
    'tables',
    'second-temple',
    'songs',
    'application',
    'questions'
  ];
  
  sectionOrder.forEach(sectionId => {
    if (contentData.sections[sectionId]) {
      const sectionHtml = updateSectionsForV60(contentData.sections[sectionId]);
      if (sectionHtml) {
        // Add section separator comment
        mainContent += `\n    <!-- ============================================
         ${sectionId.toUpperCase().replace(/-/g, ' ')}
         ============================================ -->\n`;
        mainContent += '    ' + sectionHtml + '\n';
      }
    }
  });
  
  // Add remaining custom sections
  Object.entries(contentData.customSections).forEach(([id, html]) => {
    if (!id.includes('clarification') && !id.includes('warning')) {
      mainContent += '\n    <!-- Custom Section: ' + id + ' -->\n';
      mainContent += '    ' + updateSectionsForV60(html) + '\n';
    }
  });
  
  // Add related profiles section
  if (!contentData.sections['related-profiles']) {
    mainContent += `\n    <!-- ============================================
         MANDATORY: RELATED PROFILES
         ============================================ -->
    <div class="theology-card glass-premium animate-on-scroll">
      <h3>Related Profiles & Studies</h3>
      <p>
        <!-- Add related character links here -->
      </p>
    </div>\n`;
  }
  
  // Add bibliography last
  if (contentData.sections['bibliography']) {
    mainContent += `\n    <!-- ============================================
         MANDATORY: BIBLIOGRAPHY
         ============================================ -->\n`;
    mainContent += '    ' + updateSectionsForV60(contentData.sections['bibliography']) + '\n';
  }
  
  return mainContent;
}

// ============================================
// MIGRATION REPORT
// ============================================
function generateMigrationReport(file, contentData, result) {
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
    
    migration: {
      fromVersion: contentData.sourceVersion,
      toVersion: '6.0',
      status: result.status,
      error: result.error,
      
      features: {
        enhancedMeta: true,
        consolidatedInit: true,
        improvedAccessibility: true,
        mobileOptimizations: true,
        glassMorphism: true,
        iconSystem: 'css-based',
        performanceMonitoring: true
      },
      
      sections: {
        total: Object.keys(contentData.sections).length,
        mandatory: CONTENT_CATEGORIES.mandatory.filter(id => contentData.sections[id]).length,
        optional: CONTENT_CATEGORIES.optional.filter(id => contentData.sections[id]).length,
        custom: Object.keys(contentData.customSections).length
      },
      
      customContent: {
        inlineStyles: contentData.customizations.inlineStyles.length,
        inlineScripts: contentData.customizations.inlineScripts.length,
        customSections: contentData.customizations.customSections.length,
        preserved: CONFIG.preserveCustom
      }
    },
    
    recommendations: generateRecommendations(contentData)
  };
  
  // Save report
  if (CONFIG.createReports) {
    if (!fs.existsSync(CONFIG.reportDir)) {
      fs.mkdirSync(CONFIG.reportDir, { recursive: true });
    }
    
    const reportName = path.basename(file, '.html') + '-v60-migration-report.json';
    const reportPath = path.join(CONFIG.reportDir, reportName);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log.verbose(`Report saved: ${reportPath}`);
  }
  
  return report;
}

function generateRecommendations(contentData) {
  const recommendations = [];
  
  // Version-specific recommendations
  if (contentData.sourceVersion === '5.5') {
    recommendations.push({
      priority: 'high',
      type: 'version-upgrade',
      action: 'Major upgrade from v5.5 - test all features thoroughly',
      details: [
        'New navigation system (nav-premium.js)',
        'New character page functionality (character-page-v2.js)',
        'Consolidated initialization (consolidated-init.js)',
        'CSS-based icon system',
        'Enhanced mobile support'
      ]
    });
  }
  
  if (contentData.sourceVersion === '5.6') {
    recommendations.push({
      priority: 'medium',
      type: 'version-upgrade',
      action: 'Upgrade from v5.6 - test mobile and animations',
      details: [
        'New glass morphism effects',
        'Enhanced animations',
        'Improved mobile navigation',
        'Better performance monitoring'
      ]
    });
  }
  
  if (contentData.sourceVersion === '5.7') {
    recommendations.push({
      priority: 'low',
      type: 'version-upgrade',
      action: 'Minor upgrade from v5.7 - verify mobile tabs',
      details: [
        'Mobile tabs now auto-generated',
        'Improved initialization sequence',
        'Better error handling'
      ]
    });
  }
  
  // Custom content recommendations
  if (contentData.customizations.inlineStyles.length > 0) {
    recommendations.push({
      priority: 'medium',
      type: 'custom-styles',
      action: 'Review preserved inline styles for v6.0 compatibility',
      count: contentData.customizations.inlineStyles.length
    });
  }
  
  if (contentData.customizations.inlineScripts.length > 0) {
    recommendations.push({
      priority: 'high',
      type: 'custom-scripts',
      action: 'Test preserved scripts with v6.0 modules',
      count: contentData.customizations.inlineScripts.length
    });
  }
  
  // General v6.0 recommendations
  recommendations.push({
    priority: 'medium',
    type: 'testing',
    action: 'Test these v6.0 features',
    details: [
      'Mobile section tabs (auto-generated)',
      'Smart progress navigator (desktop)',
      'Glass morphism effects',
      'Performance monitoring',
      'Accessibility improvements'
    ]
  });
  
  return recommendations;
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
    
    // Load with cheerio
    const $ = cheerio.load(originalHtml, {
      xml: false,
      decodeEntities: false
    });
    
    // Detect version
    const version = detectTemplateVersion(originalHtml, $);
    log.info(`Detected version: ${version}`);
    stats.versionCounts[version] = (stats.versionCounts[version] || 0) + 1;
    
    // Check if already v6.0
    if (isAlreadyV60(originalHtml)) {
      log.verbose(`Already migrated to v6.0: ${fileName}`);
      stats.skipped++;
      return { status: 'skipped', reason: 'already v6.0' };
    }
    
    // Extract content
    const contentData = extractContent($, version);
    log.verbose(`Extracted content for: ${contentData.characterName || 'unknown'}`);
    
    // If analyze only mode, generate report and stop
    if (CONFIG.analyzeOnly) {
      const report = generateMigrationReport(filePath, contentData, { status: 'analyzed' });
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
    
    // Build the new v6.0 page
    const newHtml = buildV60Page(CONFIG.templatePath, contentData);
    
    // Save migrated file if not in test mode
    if (!CONFIG.testMode) {
      fs.writeFileSync(filePath, newHtml);
      log.success(`Migrated to v6.0: ${fileName}`);
    } else {
      log.info(`TEST MODE - Would migrate to v6.0: ${fileName}`);
    }
    
    // Generate report
    const report = generateMigrationReport(filePath, contentData, { status: 'migrated' });
    
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
    
    return { status: 'error', error: error.message };
  }
}

// ============================================
// MAIN EXECUTION
// ============================================
async function main() {
  console.log(chalk.cyan('\n╔════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║   Template Migration Tool v6.0             ║'));
  console.log(chalk.cyan('║   Direct Migration from v5.5/5.6/5.7       ║'));
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
    console.log('  node migrate-to-v60-direct.js [options]\n');
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
    console.log('  node migrate-to-v60-direct.js --analyze-only --folder studies/');
    console.log('  node migrate-to-v60-direct.js --single studies/characters/david.html --test');
    console.log('  node migrate-to-v60-direct.js --folder studies/characters/');
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
    log.info('Please ensure the v6.0 template exists at: templates/biblical-character-template-v6.0.html');
    process.exit(1);
  }
  
  // Initialize log file
  if (!CONFIG.testMode) {
    fs.writeFileSync(CONFIG.logFile, `Migration to v6.0 started at ${new Date().toISOString()}\n`);
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
  console.log('\n' + chalk.cyan(CONFIG.analyzeOnly ? 'Starting analysis...' : 'Starting migration to v6.0...'));
  
  for (const file of files) {
    migrateTemplate(file, flags);
  }
  
  // Display results
  console.log('\n' + chalk.cyan('═══════════════════════════════════════════'));
  console.log(chalk.cyan('Summary:'));
  console.log(chalk.cyan('═══════════════════════════════════════════'));
  console.log(`Total files:       ${stats.total}`);
  
  // Show version breakdown
  console.log('\n' + chalk.blue('Source versions:'));
  Object.entries(stats.versionCounts).forEach(([version, count]) => {
    if (count > 0) {
      console.log(`  v${version}: ${count}`);
    }
  });
  
  if (CONFIG.analyzeOnly) {
    console.log(chalk.blue(`\n✔ Analyzed:        ${stats.analyzed}`));
  } else {
    console.log(chalk.green(`\n✔ Migrated:        ${stats.migrated}`));
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
    console.log('\n' + chalk.green('✨ Migration to v6.0 successful!'));
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
    console.log('3. Check mobile responsiveness with device testing');
    console.log('4. Verify glass morphism effects render correctly');
    console.log('5. Test navigation and mobile tabs functionality');
    console.log('6. Confirm custom content preservation (if any)');
    console.log('7. Check performance monitoring in browser console');
    console.log('\n' + chalk.cyan('Key v6.0 Features to Verify:'));
    console.log('• Consolidated initialization (consolidated-init.js)');
    console.log('• CSS-based icon system');
    console.log('• Auto-generated mobile tabs');
    console.log('• Smart progress navigator (desktop)');
    console.log('• Enhanced meta tags and structured data');
    console.log('• Glass morphism visual effects');
    console.log('• Performance monitoring');
  }
}

// Run the script
main().catch(error => {
  log.error(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});