#!/usr/bin/env node

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  srcDir: 'assets',
  distDir: 'public/assets',
  keepOriginals: true,
};

// Find all CSS and JS files
function findFiles(dir, extensions) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findFiles(fullPath, extensions));
    } else if (extensions.some(ext => item.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

// Build individual files
async function buildFiles() {
  // Ensure dist directory exists
  fs.mkdirSync(config.distDir, { recursive: true });
  fs.mkdirSync(`${config.distDir}/css`, { recursive: true });
  fs.mkdirSync(`${config.distDir}/js`, { recursive: true });

  // Find all CSS files
  const cssFiles = findFiles(`${config.srcDir}/css`, ['.css']);
  console.log(`Found ${cssFiles.length} CSS files`);

  // Find all JS files
  const jsFiles = findFiles(`${config.srcDir}/js`, ['.js']);
  console.log(`Found ${jsFiles.length} JS files`);

  // Build CSS files
  for (const file of cssFiles) {
    const relativePath = path.relative(config.srcDir, file);
    const outputPath = path.join(config.distDir, relativePath);
    const minOutputPath = outputPath.replace('.css', '.min.css');
    
    try {
      await esbuild.build({
        entryPoints: [file],
        outfile: minOutputPath,
        minify: true,
        sourcemap: true,
      });
      
      if (config.keepOriginals) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.copyFileSync(file, outputPath);
      }
      
      console.log(`✓ Built: ${minOutputPath}`);
    } catch (error) {
      console.error(`✗ Error building ${file}:`, error.message);
    }
  }

  // Build JS files
  for (const file of jsFiles) {
    const relativePath = path.relative(config.srcDir, file);
    const outputPath = path.join(config.distDir, relativePath);
    const minOutputPath = outputPath.replace('.js', '.min.js');
    
    try {
      await esbuild.build({
        entryPoints: [file],
        outfile: minOutputPath,
        minify: true,
        sourcemap: true,
        format: 'iife',
        target: 'es2020',
        // Fix the CommonJS/ESM mixing warning
        platform: 'browser',
        globalName: path.basename(file, '.js').replace(/[-\.]/g, '_'),
      });
      
      if (config.keepOriginals) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.copyFileSync(file, outputPath);
      }
      
      console.log(`✓ Built: ${minOutputPath}`);
    } catch (error) {
      console.error(`✗ Error building ${file}:`, error.message);
    }
  }
}

// Special bundles - FIXED VERSION
async function buildBundles() {
  const bundles = [
    {
      name: 'hub-bundle',
      // Create a single entry point that imports everything
      entry: `
        import HubCore from './assets/js/hub-core.js';
        import HubCommon from './assets/js/hub-common.js';
        import './assets/js/mobile-menu.js';
        
        window.HubCore = HubCore;
        window.HubCommon = HubCommon;
      `,
      outfile: 'hub-bundle.min.js'
    },
    {
      name: 'character-bundle',
      entry: `
        import CharacterLoader from './assets/js/character-loader.js';
        import './assets/js/character-page.js';
        
        window.CharacterLoader = CharacterLoader;
      `,
      outfile: 'character-bundle.min.js'
    }
  ];

  for (const bundle of bundles) {
    try {
      // Create temporary entry file
      const tempEntry = `temp-${bundle.name}-entry.js`;
      fs.writeFileSync(tempEntry, bundle.entry);
      
      await esbuild.build({
        entryPoints: [tempEntry],
        outfile: `${config.distDir}/js/${bundle.outfile}`,
        bundle: true,
        minify: true,
        sourcemap: true,
        format: 'iife',
        target: 'es2020',
        platform: 'browser',
        globalName: bundle.name.replace(/[-]/g, '_'),
      });
      
      // Clean up temp file
      fs.unlinkSync(tempEntry);
      
      console.log(`✓ Bundle: ${bundle.outfile}`);
    } catch (error) {
      console.error(`✗ Error building bundle ${bundle.name}:`, error.message);
      // Clean up temp file if it exists
      try {
        const tempEntry = `temp-${bundle.name}-entry.js`;
        if (fs.existsSync(tempEntry)) {
          fs.unlinkSync(tempEntry);
        }
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
    }
  }
}

// Main build function
async function build() {
  console.log('🚀 Starting build process...\n');
  
  try {
    await buildFiles();
    await buildBundles();
    console.log('\n✅ Build completed successfully!');
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  build();
}

module.exports = { build };