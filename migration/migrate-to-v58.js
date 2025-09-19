/**
 * TEMPLATE MIGRATION SCRIPT: v5.4-5.7 to v5.8 (IMPROVED)
 * Path: /migration/migrate-to-v58-improved.js
 * Purpose: Safely migrate biblical character templates to premium architecture
 * Version: 2.0.0 - Handles real-world HTML variations better
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

// Configuration
const CONFIG = {
  backupSuffix: '-backup-v57',
  logFile: './migration-log.txt',
  testMode: false,
  verbose: true,
  
  // File patterns to find templates
  patterns: [
    '**/studies/characters/**/*.html',
    '**/studies/women/**/*.html',
    '!**/*backup*.html',
    '!**/*test*.html',
    '!**/*template*.html'
  ],
  
  // Section priority mapping
  sectionPriorities: {
    'overview': 1,
    'narrative': 2,
    'literary-context': 3,
    'major-chiasm': 4,
    'themes': 3,
    'ane-context': 4,
    'eden': 5,
    'wordplay': 5,
    'covenant': 5,
    'unique': 5,
    'biblical-theology': 2,
    'messianic': 3,
    'second-temple': 4,
    'songs': 4,
    'intertext': 4,
    'application': 2,
    'questions': 3
  }
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
 * Detect template version
 */
function detectVersion(html) {
  if (html.includes('template-version" content="5.8"')) return '5.8';
  if (html.includes('template-version" content="5.7"')) return '5.7';
  if (html.includes('template-version" content="5.6"')) return '5.6';
  if (html.includes('template-version" content="5.5"')) return '5.5';
  if (html.includes('template-version" content="5.4"')) return '5.4';
  
  // Try to detect by file patterns
  if (html.includes('character-page.js') && html.includes('global-v2.css')) {
    return '5.4-5.7';
  }
  
  return 'unknown';
}

/**
 * Extract character metadata from template
 */
function extractMetadata(html) {
  const metadata = {};
  
  // Extract character name from title
  const titleMatch = html.match(/<title>([^–]+).*?<\/title>/);
  if (titleMatch) metadata.characterName = titleMatch[1].trim();
  
  // Extract book name from title
  const bookMatch = html.match(/<title>[^|]+\|\s*([^<]+)<\/title>/);
  if (bookMatch) metadata.bookName = bookMatch[1].trim();
  
  // Extract character ID
  const idMatch = html.match(/data-character-id="([^"]+)"/);
  if (idMatch) metadata.characterId = idMatch[1];
  else if (html.match(/name="character-id" content="([^"]+)"/)) {
    metadata.characterId = html.match(/name="character-id" content="([^"]+)"/)[1];
  }
  
  // Extract book ID
  const bookIdMatch = html.match(/data-book="([^"]+)"/);
  if (bookIdMatch) metadata.book = bookIdMatch[1];
  else if (html.match(/name="book-id" content="([^"]+)"/)) {
    metadata.book = html.match(/name="book-id" content="([^"]+)"/)[1];
  }
  
  // Extract gender
  const genderMatch = html.match(/name="character-gender" content="([^"]+)"/);
  if (genderMatch) metadata.gender = genderMatch[1];
  
  // Extract page type
  const pageMatch = html.match(/name="profile-type" content="([^"]+)"/);
  if (pageMatch) metadata.profileType = pageMatch[1];
  
  // Extract body classes
  const bodyMatch = html.match(/<body[^>]+class="([^"]+)"/);
  if (bodyMatch) metadata.bodyClasses = bodyMatch[1];
  
  return metadata;
}

/**
 * Extract main content sections preserving structure
 */
function extractMainContent(html) {
  // Find main content area
  const mainStart = html.indexOf('<main');
  const mainEnd = html.indexOf('</main>') + '</main>'.length;
  
  if (mainStart === -1 || mainEnd === -1) {
    return null;
  }
  
  let mainContent = html.substring(mainStart, mainEnd);
  
  // Extract just the inner content (between main tags)
  const innerMatch = mainContent.match(/<main[^>]*>([\s\S]*)<\/main>/);
  if (innerMatch) {
    return innerMatch[1].trim();
  }
  
  return null;
}

/**
 * Clean and enhance content sections for v5.8
 */
function enhanceContent(content, metadata) {
  let enhanced = content;
  
  // Remove any hardcoded navigation (old style)
  enhanced = enhanced.replace(/<nav id="main-nav"[\s\S]*?<\/nav>/gi, '');
  
  // Remove quick navigation sidebar
  enhanced = enhanced.replace(/<div class="quick-nav-sidebar"[\s\S]*?<\/div>\s*<!-- End quick nav -->/gi, '');
  enhanced = enhanced.replace(/<div class="quick-nav-sidebar"[\s\S]*?(?=<main|<div class="content-section")/gi, '');
  
  // Remove old inline styles
  enhanced = enhanced.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Add glass-premium class to theology cards
  enhanced = enhanced.replace(
    /class="theology-card(?![^"]*glass-premium)([^"]*)"/g,
    'class="theology-card glass-premium$1"'
  );
  
  // Ensure animate-on-scroll is present
  enhanced = enhanced.replace(
    /class="theology-card glass-premium(?![^"]*animate-on-scroll)([^"]*)"/g,
    'class="theology-card glass-premium animate-on-scroll$1"'
  );
  
  // Add hover-lift to panels
  enhanced = enhanced.replace(
    /class="panel(?![^"]*hover-lift)([^"]*)"/g,
    'class="panel hover-lift$1"'
  );
  
  // Update cross-ref links to btn btn-glass
  enhanced = enhanced.replace(
    /class="cross-ref"/g,
    'class="btn btn-glass"'
  );
  
  // Add data-section-priority to sections
  Object.entries(CONFIG.sectionPriorities).forEach(([id, priority]) => {
    // Multiple patterns to catch variations
    const patterns = [
      new RegExp(`id="${id}"(?![^>]*data-section-priority)`, 'g'),
      new RegExp(`id='${id}'(?![^>]*data-section-priority)`, 'g'),
      new RegExp(`id=${id}(?![^>]*data-section-priority)`, 'g')
    ];
    
    patterns.forEach(regex => {
      enhanced = enhanced.replace(regex, (match) => {
        return `${match} data-section-priority="${priority}"`;
      });
    });
  });
  
  // Add stagger-children class to grids
  enhanced = enhanced.replace(
    /class="grid-3(?![^"]*stagger-children)([^"]*)"/g,
    'class="grid-3 stagger-children$1"'
  );
  
  // Add card-3d effect to certain panels in theme grids
  const themeSection = enhanced.match(/<div[^>]*id="themes"[^>]*>[\s\S]*?(?=<div[^>]*id=|$)/);
  if (themeSection) {
    let updatedTheme = themeSection[0].replace(
      /class="panel hover-lift(?![^"]*card-3d)([^"]*)"/g,
      'class="panel hover-lift card-3d$1"'
    );
    enhanced = enhanced.replace(themeSection[0], updatedTheme);
  }
  
  // Add glass-textured to certain panels
  enhanced = enhanced.replace(
    /class="panel(?![^"]*glass-textured)([^"]*)"[^>]*>\s*<h4>[🌍🍎]/g,
    (match) => match.replace('class="panel', 'class="panel glass-textured')
  );
  
  return enhanced;
}

/**
 * Build v5.8 page from template
 */
function buildFromTemplate(templatePath, metadata, content) {
  // Load the v5.8 template
  let template = fs.readFileSync(templatePath || path.join(__dirname, 'template-v5.8-improved.html'), 'utf8');
  
  // Prepare replacements
  const replacements = {
    '{{CHARACTER_NAME}}': metadata.characterName || '[Character Name]',
    '{{BOOK_NAME}}': metadata.bookName || '[Book]',
    '{{META_DESCRIPTION}}': metadata.description || `Comprehensive profile of ${metadata.characterName}`,
    '{{GENDER}}': metadata.gender || 'unknown',
    '{{PROFILE_TYPE}}': metadata.profileType || 'single-page',
    '{{CHARACTER_ID}}': metadata.characterId || 'character-id',
    '{{BOOK_ID}}': metadata.book || 'book-id',
    '{{OG_DESCRIPTION}}': `Comprehensive study of ${metadata.characterName}`,
    '{{OG_URL}}': metadata.url || '#',
    '{{OG_IMAGE}}': metadata.image || '/assets/images/og-default.jpg',
    '{{TWITTER_DESCRIPTION}}': `Explore the narrative, theology, and significance of ${metadata.characterName}`,
    '{{CANONICAL_URL}}': metadata.url || '#',
    '{{BODY_CLASSES}}': metadata.bodyClasses || 'character-profile',
    '{{NAV_CURRENT}}': metadata.characterId || 'characters',
    '{{NAV_HUB}}': metadata.gender === 'female' ? 'women' : 'characters',
    '{{MAIN_CONTENT}}': content,
    '{{HEBREW_FONT_PRELOAD}}': metadata.gender === 'female' || metadata.book?.includes('samuel') ? 
      '<link rel="preload" href="https://projectcontext.org/assets/fonts/SBL_Hebrew.woff2" as="font" type="font/woff2" crossorigin>' : 
      '<!-- No Hebrew font needed -->'
  };
  
  // Replace all placeholders
  Object.entries(replacements).forEach(([placeholder, value]) => {
    template = template.replace(new RegExp(placeholder, 'g'), value);
  });
  
  return template;
}

/**
 * Main migration function (IMPROVED)
 */
function migrateTemplate(filePath, options = {}) {
  const fileName = path.basename(filePath);
  log.verbose(`Processing ${fileName}`);
  
  try {
    let html = fs.readFileSync(filePath, 'utf8');
    const originalHtml = html;
    
    // Check if already migrated
    if (isAlreadyMigrated(html)) {
      log.verbose(`Already migrated: ${fileName}`);
      stats.skipped++;
      return { status: 'skipped', reason: 'already migrated' };
    }
    
    // Detect current version
    const currentVersion = detectVersion(html);
    log.verbose(`Detected version: ${currentVersion}`);
    
    if (currentVersion === 'unknown') {
      log.warning(`Unknown template version: ${fileName}`);
      stats.skipped++;
      return { status: 'skipped', reason: 'unknown version' };
    }
    
    // Extract metadata for smart migration
    const metadata = extractMetadata(html);
    log.verbose(`Character: ${metadata.characterName || 'unknown'}`);
    
    // Extract main content
    const mainContent = extractMainContent(html);
    if (!mainContent) {
      log.error(`Could not extract main content from ${fileName}`);
      stats.errors++;
      return { status: 'error', reason: 'no main content found' };
    }
    
    // Create backup
    if (!CONFIG.testMode) {
      const backupPath = filePath.replace('.html', `${CONFIG.backupSuffix}.html`);
      fs.copyFileSync(filePath, backupPath);
      stats.backedUp++;
      log.verbose(`Backup created: ${path.basename(backupPath)}`);
    }
    
    // Enhance content for v5.8
    const enhancedContent = enhanceContent(mainContent, metadata);
    
    // Build new page from template
    const newHtml = buildFromTemplate(null, metadata, enhancedContent);
    
    // Save migrated file
    if (!CONFIG.testMode) {
      fs.writeFileSync(filePath, newHtml);
      log.success(`Migrated: ${fileName}`);
    } else {
      log.info(`TEST MODE - Would migrate: ${fileName}`);
      
      // In test mode, show what would change
      if (CONFIG.verbose) {
        log.verbose('Extracted metadata:');
        Object.entries(metadata).forEach(([key, value]) => {
          log.verbose(`  ${key}: ${value}`);
        });
      }
    }
    
    stats.migrated++;
    return { status: 'migrated', metadata };
    
  } catch (error) {
    log.error(`Failed to migrate ${fileName}: ${error.message}`);
    stats.errors++;
    return { status: 'error', error: error.message };
  }
}

/**
 * Rollback migration from backups
 */
function rollbackMigration(folderPath) {
  log.info('Starting rollback process...');
  
  const backupFiles = glob.sync(`${folderPath}/**/*${CONFIG.backupSuffix}.html`);
  
  if (backupFiles.length === 0) {
    log.warning('No backup files found');
    return;
  }
  
  log.info(`Found ${backupFiles.length} backup files`);
  
  backupFiles.forEach(backupFile => {
    const originalFile = backupFile.replace(`${CONFIG.backupSuffix}.html`, '.html');
    
    try {
      if (fs.existsSync(originalFile)) {
        fs.copyFileSync(backupFile, originalFile);
        fs.unlinkSync(backupFile); // Remove backup after restoration
        log.success(`Restored: ${path.basename(originalFile)}`);
      }
    } catch (error) {
      log.error(`Failed to restore ${path.basename(originalFile)}: ${error.message}`);
    }
  });
  
  log.info('Rollback complete');
}

/**
 * Main execution
 */
async function main() {
  console.log(chalk.cyan('\n╔══════════════════════════════════════════╗'));
  console.log(chalk.cyan('║   Template Migration Tool v5.8 IMPROVED ║'));
  console.log(chalk.cyan('╚══════════════════════════════════════════╝\n'));
  
  // Parse command line arguments
  const args = process.argv.slice(2);
  const flags = {
    test: args.includes('--test'),
    rollback: args.includes('--rollback'),
    cleanup: args.includes('--cleanup'),
    force: args.includes('--force'),
    single: args.includes('--single') ? args[args.indexOf('--single') + 1] : null,
    folder: args.includes('--folder') ? args[args.indexOf('--folder') + 1] : './'
  };
  
  CONFIG.testMode = flags.test;
  
  // Initialize log file
  if (!CONFIG.testMode) {
    fs.writeFileSync(CONFIG.logFile, `Migration started at ${new Date().toISOString()}\n`);
  }
  
  // Handle rollback
  if (flags.rollback) {
    rollbackMigration(flags.folder);
    return;
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
  
  // Show what will be migrated
  if (!flags.force && !CONFIG.testMode) {
    console.log('\nFiles to migrate:');
    files.forEach(file => console.log(chalk.gray(`  • ${path.basename(file)}`)));
    
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    await new Promise(resolve => {
      readline.question('\nProceed with migration? (yes/no): ', (answer) => {
        if (answer.toLowerCase() !== 'yes') {
          log.info('Migration cancelled');
          process.exit(0);
        }
        readline.close();
        resolve();
      });
    });
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
    console.log(chalk.gray('Run with --rollback to restore from backups'));
  }
}

// Run the script
main().catch(error => {
  log.error(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});