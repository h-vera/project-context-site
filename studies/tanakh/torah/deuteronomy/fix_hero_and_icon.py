#!/usr/bin/env python3
"""
Two targeted fixes:
1. deut-structure.html — Move hero above nav
2. deut-study-kit.html — Replace 🎙️ with BP icon, verify bibliography

Usage: python3 fix_hero_and_icon.py .
"""
import re, sys, os, shutil

directory = sys.argv[1] if len(sys.argv) > 1 else '.'

# ══════════════════════════════════════════
# FIX 1: deut-structure.html — Hero above nav
# ══════════════════════════════════════════
struct_path = os.path.join(directory, 'deut-structure.html')
if os.path.exists(struct_path):
    shutil.copy2(struct_path, struct_path + '.bak2')
    with open(struct_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # The current order is: breadcrumbs → nav → hero
    # We need: breadcrumbs → hero → nav
    # 
    # Strategy: find the nav block and hero block, swap them
    
    nav_pattern = re.compile(
        r'([ \t]*<nav class="study-nav-tabs"[^>]*>.*?</nav>)',
        re.DOTALL
    )
    hero_pattern = re.compile(
        r'([ \t]*<!-- HERO -->\s*<section class="page-header-banner".*?</section>)',
        re.DOTALL
    )
    
    nav_match = nav_pattern.search(html)
    hero_match = hero_pattern.search(html)
    
    if nav_match and hero_match and nav_match.start() < hero_match.start():
        nav_text = nav_match.group(1)
        hero_text = hero_match.group(1)
        
        # Replace nav with a placeholder
        html = html[:nav_match.start()] + '{{HERO_GOES_HERE}}' + html[nav_match.end():]
        # Now find and replace hero with nav
        html = html.replace(hero_text, nav_text, 1)
        # Put hero where nav was
        html = html.replace('{{HERO_GOES_HERE}}', hero_text)
        
        with open(struct_path, 'w', encoding='utf-8') as f:
            f.write(html)
        print("  ✓ deut-structure.html — Hero moved above nav")
    else:
        print("  · deut-structure.html — Hero/nav order already correct or pattern not found")
else:
    print("  ✗ deut-structure.html — NOT FOUND")

# ══════════════════════════════════════════
# FIX 2: deut-study-kit.html — BP icon + bibliography check
# ══════════════════════════════════════════
kit_path = os.path.join(directory, 'deut-study-kit.html')
if os.path.exists(kit_path):
    shutil.copy2(kit_path, kit_path + '.bak2')
    with open(kit_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    changes = 0
    
    # Replace 🎙️ emoji with BP icon image
    old_heading = '🎙️ BibleProject Podcast Sources'
    new_heading = '<img src="/assets/images/BP_icon-blu.png" alt="BibleProject" style="height:1.1em;width:auto;vertical-align:middle;margin-right:.25rem;"> BibleProject Podcast Sources'
    if old_heading in html:
        html = html.replace(old_heading, new_heading)
        changes += 1
        print("  ✓ deut-study-kit.html — Replaced 🎙️ with BP_icon-blu.png")
    else:
        print("  · deut-study-kit.html — 🎙️ emoji not found (may already be fixed)")
    
    # Verify bibliography entries exist
    required_entries = [
        ('Block, Daniel I.*Deuteronomy.*NIVAC', 'Block NIVAC commentary'),
        ('Thompson, J\\.? A\\.?', 'Thompson Tyndale Bulletin'),
        ('Dorsey, David A\\.?', 'Dorsey Literary Structure'),
        ('Craigie, Peter C\\.?', 'Craigie NICOT'),
        ('Tigay, Jeffrey', 'Tigay JPS'),
        ('McConville, J\\.? Gordon', 'McConville Apollos'),
        ('Weinfeld, Moshe', 'Weinfeld Deuteronomic School'),
        ('Kitchen, K\\.? A\\.?', 'Kitchen Reliability'),
        ('Sailhamer, John', 'Sailhamer Pentateuch'),
        ('Dempster, Stephen', 'Dempster Dominion'),
        ('Beale, G\\.?K\\.?', 'Beale/Carson NT Use of OT'),
        ('Hoffner, Harry', 'Hoffner Tudhaliya treaty'),
        ('Parpola, Simo', 'Parpola Neo-Assyrian Treaties'),
        ('Olson, Dennis', 'Olson Death of Moses'),
        ('Brueggemann, Walter', 'Brueggemann Abingdon'),
        ('Hallo, William', 'Hallo Context of Scripture'),
        ('Alter, Robert', 'Alter Hebrew Bible'),
        ('Walton, John', 'Walton ANE Thought'),
        ('Wenham, Gordon', 'Wenham Exploring OT'),
        ('Kline, Meredith', 'Kline Treaty'),
        ('Wright, Christopher.*Old Testament Ethics', 'Wright OT Ethics'),
        ('Wright, Christopher.*Deuteronomy', 'Wright NIBC Deuteronomy'),
    ]
    
    print("\n  Bibliography verification:")
    missing = []
    for pattern, label in required_entries:
        if re.search(pattern, html):
            pass  # Found
        else:
            missing.append(label)
    
    if missing:
        print(f"  ⚠ MISSING entries: {', '.join(missing)}")
    else:
        print("  ✓ All 22 required bibliography entries present")
    
    if changes > 0:
        with open(kit_path, 'w', encoding='utf-8') as f:
            f.write(html)
    
else:
    print("  ✗ deut-study-kit.html — NOT FOUND")

print("\nDone.")
