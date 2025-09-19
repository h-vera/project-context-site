# Template Migration Guide: v5.4-5.7 → v5.8

## Overview
This guide covers migrating biblical character templates from versions 5.4-5.7 to the new premium v5.8 architecture.

### What's New in v5.8
- **Premium Glass Design**: Liquid glass morphism throughout
- **Auto-Generated Mobile Tabs**: No more manual maintenance
- **Smart Progress Navigator**: Desktop reading progress
- **Single CSS/JS**: Simplified from multiple files
- **Better Performance**: Optimized for modern browsers

### Migration Benefits
- ✨ **33% less code** in templates
- 🎯 **Automatic mobile navigation** based on present sections
- 🚀 **Better performance** with consolidated files
- 💎 **Premium UX** with liquid glass effects
- 🔧 **Easier maintenance** going forward

---

## Pre-Migration Checklist

### Required Files
Ensure you have these new files in place:
- `/assets/css/global-v3.css` (new premium styles)
- `/assets/js/nav-premium.js` (new navigation system)
- `/assets/js/character-page-v2.js` (new functionality)

### Keep These Files (for backward compatibility)
- `/assets/css/global-v2.css` (for templates not yet migrated)
- `/assets/js/nav-component.js` (for v5.4-5.7 templates still in production)

---

## Installation

### 1. Setup Migration Tool

```bash
# Create migration directory
mkdir migration
cd migration

# Create package.json
cat > package.json << 'EOF'
{
  "name": "template-migration-v58",
  "version": "1.0.0",
  "description": "Migration tool for biblical character templates to v5.8",
  "scripts": {
    "test": "node migrate-to-v58.js --test",
    "migrate": "node migrate-to-v58.js",
    "rollback": "node migrate-to-v58.js --rollback",
    "cleanup": "node migrate-to-v58.js --cleanup"
  },
  "dependencies": {
    "chalk": "^4.1.2",
    "fs-extra": "^10.1.0",
    "glob": "^8.0.3"
  }
}
EOF

# Install dependencies
npm install
```

### 2. Save Migration Script
Save the `migrate-to-v58.js` script in the migration directory.

---

## Usage Guide

### Step 1: Test Mode (Recommended First)
Always test first to see what will change without modifying files:

```bash
# Test all templates (no changes made)
node migrate-to-v58.js --test

# Test specific folder
node migrate-to-v58.js --test --folder ../studies/characters/genesis/

# Test single file
node migrate-to-v58.js --test --single ../studies/characters/genesis/sarah.html
```

### Step 2: Migrate Templates

#### Option A: Migrate Everything
```bash
# Migrate all templates (will ask for confirmation)
node migrate-to-v58.js

# Skip confirmation prompt
node migrate-to-v58.js --force
```

#### Option B: Migrate by Book/Section
```bash
# Migrate Genesis characters only
node migrate-to-v58.js --folder ../studies/characters/genesis/

# Migrate Exodus characters
node migrate-to-v58.js --folder ../studies/characters/exodus/

# Migrate women profiles
node migrate-to-v58.js --folder ../studies/women/
```

#### Option C: Migrate Individual Files
```bash
# Migrate single template
node migrate-to-v58.js --single ../studies/characters/genesis/abraham.html
```

### Step 3: Verify Migration
After migration, check:
1. Open migrated templates in browser
2. Verify mobile tabs appear (resize window)
3. Check desktop progress navigator (right side)
4. Confirm navigation works
5. Test all interactive elements

### Step 4: Rollback (If Needed)
If something goes wrong, you can restore from backups:

```bash
# Rollback all migrated files
node migrate-to-v58.js --rollback

# Rollback specific folder
node migrate-to-v58.js --rollback --folder ../studies/characters/genesis/
```

### Step 5: Cleanup Backups
Once you're satisfied with the migration:

```bash
# Remove all backup files (will ask for confirmation)
node migrate-to-v58.js --cleanup
```

---

## What the Script Changes

### 1. CSS Update
```html
<!-- FROM -->
<link rel="stylesheet" href="/assets/css/global-v2.css">

<!-- TO -->
<link rel="stylesheet" href="/assets/css/global-v3.css">
```

### 2. JavaScript Replacement
```html
<!-- REMOVES -->
<script src="/assets/js/character-page.js"></script>
<script src="/assets/js/nav-component.js"></script>
<script src="/assets/js/mobile-menu.js"></script>

<!-- ADDS -->
<script src="/assets/js/nav-premium.js"></script>
<script src="/assets/js/character-page-v2.js" defer></script>
```

### 3. Section Priorities
Adds `data-section-priority` to all sections for mobile tab generation:
```html
<!-- FROM -->
<div class="theology-card" id="overview">

<!-- TO -->
<div class="theology-card glass-premium" id="overview" data-section-priority="1">
```

### 4. Premium Classes
- Adds `glass-premium` to cards
- Adds `hover-lift` to panels
- Updates buttons to `btn btn-glass`

---

## Migration Strategy

### Recommended Phased Approach

#### Week 1: Test & Learn
- [ ] Migrate 2-3 low-traffic templates
- [ ] Test thoroughly on mobile and desktop
- [ ] Document any issues
- [ ] Adjust process if needed

#### Week 2: High-Value Templates
- [ ] Migrate most-visited character profiles
- [ ] Monitor user feedback
- [ ] Check analytics for any issues

#### Week 3-4: Bulk Migration
- [ ] Migrate by book/section
- [ ] Run in batches of 10-20 files
- [ ] Verify each batch before proceeding

#### Week 5: Cleanup
- [ ] Remove backup files after confirming stability
- [ ] Update any documentation
- [ ] Archive old CSS/JS files (keep for reference)

---

## Troubleshooting

### Common Issues

#### Issue: Script can't find templates
```bash
# Specify the correct path
node migrate-to-v58.js --folder /full/path/to/templates/
```

#### Issue: Permission denied
```bash
# Run with elevated permissions (Unix/Mac)
sudo node migrate-to-v58.js

# Or change file permissions first
chmod 644 ../studies/characters/**/*.html
```

#### Issue: Script says "already migrated"
The script detected the template is already on v5.8. Check if:
- Template was previously migrated
- Someone manually updated it
- You're running the script twice

#### Issue: Styles look broken after migration
1. Ensure `global-v3.css` is uploaded to server
2. Clear browser cache
3. Check browser console for 404 errors

#### Issue: Mobile tabs not appearing
1. Check browser console for JavaScript errors
2. Verify `character-page-v2.js` is loading
3. Ensure sections have `data-section-priority` attributes

---

## File Locations

### New Files (v5.8)
```
/assets/
  /css/
    global-v3.css           # New premium styles
  /js/
    nav-premium.js          # New navigation system
    character-page-v2.js    # New functionality
```

### Keep for Backward Compatibility
```
/assets/
  /css/
    global-v2.css          # Keep for unmigrated templates
  /js/
    nav-component.js       # Keep for v5.4-5.7 templates
    character-page.js      # Keep for unmigrated templates
```

---

## Manual Migration (Single File)

If you prefer to migrate manually or the script fails:

### 1. Update CSS Link
Find: `<link rel="stylesheet" href="/assets/css/global-v2.css">`  
Replace with: `<link rel="stylesheet" href="/assets/css/global-v3.css">`

### 2. Remove Old Navigation
Delete the entire `<script type="module">` block that imports NavigationComponent

### 3. Remove Old Scripts
Delete all references to:
- character-page.js
- nav-component.js  
- mobile-menu.js

### 4. Add New Scripts (before `</body>`)
```html
<!-- Premium Navigation -->
<script src="/assets/js/nav-premium.js"></script>
<script>
  window.initPremiumNav({
    currentPage: 'characters',  // or specific character ID
    hubType: 'characters',       // or 'women' for female characters
    enableHaptics: true,
    enableMagnetic: true,
    enableGestures: true
  });
</script>

<!-- Character Page Premium Functionality -->
<script src="/assets/js/character-page-v2.js" defer></script>
```

### 5. Add Section Priorities
Add `data-section-priority="#"` to each section:
- Priority 1: Overview
- Priority 2: Narrative, Biblical Theology, Application
- Priority 3: Themes, Messianic, Literary Context
- Priority 4: ANE Context, Intertext, Chiasm
- Priority 5: Enhancement sections

### 6. Update Classes
- Add `glass-premium` to all `theology-card` divs
- Add `hover-lift` to all `panel` divs
- Change `cross-ref` to `btn btn-glass`

### 7. Update Meta Tags
Add/update:
```html
<meta name="template-version" content="5.8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#7209b7">
```

---

## Validation

### Quick Test Checklist
- [ ] Page loads without console errors
- [ ] Navigation appears and works
- [ ] Mobile tabs show on mobile (max 5)
- [ ] Desktop progress bar shows (>1024px screens)
- [ ] Glass effects visible on cards
- [ ] Hover effects working
- [ ] Timeline animations trigger on scroll
- [ ] Bibliography expands/collapses

### Console Commands for Testing
Open browser console and run:
```javascript
// Check if new system loaded
console.log('Premium Nav:', typeof initPremiumNav);
console.log('Character Page:', typeof CharacterPage);
console.log('Icon System:', typeof BiblicalIconSystem);

// Check template version
document.querySelector('meta[name="template-version"]').content;

// Check mobile tabs generated
document.querySelectorAll('.mobile-section-tabs .tab-item').length;

// Check section priorities
Array.from(document.querySelectorAll('[data-section-priority]'))
  .map(el => ({id: el.id, priority: el.dataset.sectionPriority}));
```

---

## Support

### Getting Help
1. Check the Troubleshooting section above
2. Review the migration log file: `migration-log.txt`
3. Compare with a successfully migrated template
4. Check browser console for errors

### Reporting Issues
When reporting issues, include:
- Template version (5.4, 5.5, 5.6, 5.7)
- Character name and file path
- Error message from console or script
- Browser and device type

---

## Post-Migration

### After Successful Migration
1. **Monitor** - Watch for user feedback for 1-2 weeks
2. **Clean** - Remove backup files with `--cleanup` command
3. **Document** - Note any template-specific adjustments made
4. **Archive** - After all templates migrated, archive old JS/CSS files

### Future Maintenance
- All new templates should use v5.8 structure
- Update `nav-premium.js` for navigation changes
- Update `character-page-v2.js` for functionality changes
- No need to touch individual templates for behavior changes

---

## Appendix

### Version History
- **v5.4-5.5**: Original template structure
- **v5.6-5.7**: Added mobile menu support
- **v5.8**: Premium architecture with auto-generated navigation

### Script Options Reference
```bash
--test          # Run without making changes
--single [file] # Migrate single file only  
--folder [path] # Migrate specific folder
--rollback      # Restore from backups
--cleanup       # Remove backup files
--force         # Skip confirmation prompts
```

### File Patterns
The script looks for:
- `**/studies/characters/**/*.html`
- `**/studies/women/**/*.html`
- Excludes: `*backup*.html`, `*test*.html`

---

*Last Updated: September 2025*  
*Migration Script Version: 1.0.0*  
*Target Template Version: 5.8*