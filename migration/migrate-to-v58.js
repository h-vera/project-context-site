/**
 * TEMPLATE MIGRATION SCRIPT: v5.4-5.7 to v5.8
 * Path: /migration/migrate-to-v58.js
 * Purpose: Safely migrate biblical character templates to premium architecture
 * 
 * USAGE:
 * 1. npm install chalk glob fs-extra
 * 2. node migrate-to-v58.js [options]
 * 
 * OPTIONS:
 * --test           Run in test mode (no changes)
 * --single [file]  Migrate single file only
 * --folder [path]  Migrate specific folder
 * --rollback       Restore from backups
 * --force          Skip confirmation prompts
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
    '!**/*test*.html'
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
  
  // Extract character name
  const titleMatch = html.match(/<title>([^–]+).*?<\/title>/);
  if (titleMatch) metadata.characterName = titleMatch[1].trim();
  
  // Extract character ID
  const idMatch = html.match(/data-character-id="([^"]+)"/);
  if (idMatch) metadata.characterId = idMatch[1];
  
  // Extract book
  const bookMatch = html.match(/data-book="([^"]+)"/);
  if (bookMatch) metadata.book = bookMatch[1];
  
  // Extract gender
  const genderMatch = html.match(/name="character-gender" content="([^"]+)"/);
  if (genderMatch) metadata.gender = genderMatch[1];
  
  // Extract page type
  const pageMatch = html.match(/name="profile-type" content="([^"]+)"/);
  if (pageMatch) metadata.profileType = pageMatch[1];
  
  return metadata;
}

/**
 * Main migration function
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
    
    // Create backup
    if (!CONFIG.testMode) {
      const backupPath = filePath.replace('.html', `${CONFIG.backupSuffix}.html`);
      fs.copyFileSync(filePath, backupPath);
      stats.backedUp++;
      log.verbose(`Backup created: ${path.basename(backupPath)}`);
    }
    
    // ========================================
    // MIGRATION STEPS
    // ========================================
    
    // Step 1: Update CSS file reference
    html = html.replace(
      /<link rel="stylesheet" href="[^"]*global-v2\.css[^"]*">/g,
      '<link rel="stylesheet" href="/assets/css/global-v3.css">'
    );
    log.verbose('Updated CSS reference');
    
    // Step 2: Update template version meta tag
    html = html.replace(
      /name="template-version" content="[^"]+"/g,
      'name="template-version" content="5.8"'
    );
    
    // If no template version exists, add it
    if (!html.includes('name="template-version"')) {
      html = html.replace(
        '</title>',
        '</title>\n  <meta name="template-version" content="5.8">'
      );
    }
    
    // Step 3: Add viewport and theme-color if missing
    if (!html.includes('viewport-fit=cover')) {
      html = html.replace(
        'name="viewport" content="width=device-width, initial-scale=1"',
        'name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"'
      );
    }
    
    if (!html.includes('name="theme-color"')) {
      html = html.replace(
        '<meta name="viewport"',
        '<meta name="theme-color" content="#7209b7">\n  <meta name="viewport"'
      );
    }
    
    // Step 4: Remove old navigation component import
    html = html.replace(
      /<script type="module">[\s\S]*?import\s+NavigationComponent[\s\S]*?<\/script>/gi,
      ''
    );
    
    html = html.replace(
      /<script type="module">[\s\S]*?import\s+.*?nav-component\.js[\s\S]*?<\/script>/gi,
      ''
    );
    log.verbose('Removed old navigation imports');
    
    // Step 5: Remove old JavaScript files
    const oldScripts = [
      'character-page.js',
      'mobile-menu.js',
      'nav-component.js'
    ];
    
    oldScripts.forEach(script => {
      const regex = new RegExp(`<script[^>]*src="[^"]*${script}"[^>]*>\\s*</script>`, 'gi');
      html = html.replace(regex, '');
    });
    log.verbose('Removed old JavaScript files');
    
    // Step 6: Find the right place to insert new scripts (before </body>)
    const bodyCloseIndex = html.lastIndexOf('</body>');
    if (bodyCloseIndex === -1) {
      throw new Error('Could not find </body> tag');
    }
    
    // Build new script section
    const currentPage = metadata.characterId || 'characters';
    const hubType = metadata.gender === 'female' ? 'women' : 'characters';
    
    const newScripts = `
  <!-- ======================================
       JAVASCRIPT - Premium System v5.8
       ====================================== -->
  
  <!-- Premium Navigation -->
  <script src="/assets/js/nav-premium.js"></script>
  <script>
    // Initialize premium navigation
    window.initPremiumNav({
      currentPage: '${currentPage}',
      hubType: '${hubType}',
      enableHaptics: true,
      enableMagnetic: true,
      enableGestures: true
    });
  </script>

  <!-- Character Page Premium Functionality -->
  <script src="/assets/js/character-page-v2.js" defer></script>

  <!-- Page initialization -->
  <script>
    // Show page when ready
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      
      // Log initialization
      console.log('Template Version: 5.8 Premium');
      console.log('Character: ${metadata.characterName || '[Character Name]'}');
      console.log('Book: ${metadata.book || '[Book]'}');
    });
  </script>
`;
    
    // Insert new scripts before </body>
    html = html.substring(0, bodyCloseIndex) + newScripts + '\n' + html.substring(bodyCloseIndex);
    
    // Step 7: Add data-section-priority to sections
    Object.entries(CONFIG.sectionPriorities).forEach(([id, priority]) => {
      // Pattern 1: id="section-name"
      const regex1 = new RegExp(`id="${id}"(?![^>]*data-section-priority)`, 'g');
      html = html.replace(regex1, `id="${id}" data-section-priority="${priority}"`);
      
      // Pattern 2: id='section-name'
      const regex2 = new RegExp(`id='${id}'(?![^>]*data-section-priority)`, 'g');
      html = html.replace(regex2, `id='${id}' data-section-priority="${priority}"`);
    });
    log.verbose('Added section priorities');
    
    // Step 8: Add glass-premium class to theology cards
    html = html.replace(
      /class="theology-card(?![^"]*glass-premium)/g,
      'class="theology-card glass-premium'
    );
    
    // Also add animate-on-scroll if missing
    html = html.replace(
      /class="theology-card glass-premium(?![^"]*animate-on-scroll)/g,
      'class="theology-card glass-premium animate-on-scroll'
    );
    log.verbose('Added premium glass classes');
    
    // Step 9: Update buttons to use new classes
    html = html.replace(
      /class="cross-ref"/g,
      'class="btn btn-glass"'
    );
    
    // Step 10: Add hover effects to panels
    html = html.replace(
      /class="panel(?![^"]*hover-lift)/g,
      'class="panel hover-lift'
    );
    
    // Step 11: Remove old quick navigation sidebar HTML if present
    html = html.replace(
      /<div class="quick-nav-sidebar"[\s\S]*?<\/div>\s*<!-- End quick nav -->/gi,
      ''
    );
    
    // Step 12: Clean up extra blank lines
    html = html.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    // Step 13: Update preload directives
    const hasPreload = html.includes('rel="preload"');
    if (!hasPreload) {
      html = html.replace(
        '<link rel="stylesheet" href="/assets/css/global-v3.css">',
        `<!-- Preload Critical Resources -->
  <link rel="preload" href="/assets/css/global-v3.css" as="style">
  <link rel="preload" href="/assets/js/nav-premium.js" as="script">
  <link rel="preload" href="/assets/js/character-page-v2.js" as="script">
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="/assets/css/global-v3.css">`
      );
    }
    
    // Save migrated file
    if (!CONFIG.testMode) {
      fs.writeFileSync(filePath, html);
      log.success(`Migrated: ${fileName}`);
    } else {
      log.info(`TEST MODE - Would migrate: ${fileName}`);
    }
    
    stats.migrated++;
    return { status: 'migrated', changes: html !== originalHtml };
    
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
 * Clean up backup files
 */
function cleanupBackups(folderPath) {
  const backupFiles = glob.sync(`${folderPath}/**/*${CONFIG.backupSuffix}.html`);
  
  if (backupFiles.length === 0) {
    log.info('No backup files to clean');
    return;
  }
  
  log.warning(`Found ${backupFiles.length} backup files`);
  
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Delete all backup files? (yes/no): ', (answer) => {
    if (answer.toLowerCase() === 'yes') {
      backupFiles.forEach(file => {
        fs.unlinkSync(file);
        log.verbose(`Deleted: ${path.basename(file)}`);
      });
      log.success('All backup files deleted');
    } else {
      log.info('Backup files preserved');
    }
    readline.close();
  });
}

/**
 * Main execution
 */
async function main() {
  console.log(chalk.cyan('\n╔══════════════════════════════════════════╗'));
  console.log(chalk.cyan('║   Template Migration Tool v5.8          ║'));
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
  
  // Handle cleanup
  if (flags.cleanup) {
    cleanupBackups(flags.folder);
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
  }
  
  if (stats.migrated > 0 && !CONFIG.testMode) {
    console.log('\n' + chalk.green('✨ Migration successful!'));
    console.log(chalk.gray('Backup files have been created with suffix: ' + CONFIG.backupSuffix));
    console.log(chalk.gray('Run with --rollback to restore from backups'));
    console.log(chalk.gray('Run with --cleanup to remove backup files'));
  }
}

// Run the script
main().catch(error => {
  log.error(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});