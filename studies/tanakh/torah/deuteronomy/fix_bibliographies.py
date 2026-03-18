#!/usr/bin/env python3
"""
Fix bibliography sections on deut-overview.html and deut-study-kit.html
to use standard 5.8.1 collapsible <details> pattern.

Usage: python3 fix_bibliographies.py .
"""
import re, sys, os, shutil

directory = sys.argv[1] if len(sys.argv) > 1 else '.'

# ══════════════════════════════════════════
# STANDARD BIBLIOGRAPHY BLOCKS
# ══════════════════════════════════════════

OVERVIEW_BIB = '''    <details class="bibliography-section enhanced" id="bibliography">
      <summary><div class="bibliography-header"><div class="bibliography-inner"><span class="bibliography-icon">📚</span><div class="bibliography-text"><h3 class="bibliography-title">Bibliography & Sources</h3><p class="bibliography-subtitle">Key references for the Deuteronomy overview</p></div><div class="expand-indicator"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div></div></summary>
      <div class="bibliography-content">
        <div class="source-category"><h4>Commentaries</h4>
          <div class="source-entry"><div class="source-citation"><strong>Craigie, Peter C.</strong> <em>The Book of Deuteronomy.</em> NICOT. Grand Rapids: Eerdmans.</div><div class="source-usage"><span class="usage-tag">Treaty · ANE Context</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>McConville, J. Gordon.</strong> <em>Deuteronomy.</em> Apollos OTC. Leicester: IVP, 2002.</div><div class="source-usage"><span class="usage-tag">Heart Theology · Covenant</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Block, Daniel I.</strong> <em>Deuteronomy.</em> NIVAC. Grand Rapids: Zondervan, 2012.</div><div class="source-usage"><span class="usage-tag">Law Clusters · Election</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Block, Daniel I.</strong> <em>The Gospel According to Moses.</em> Wipf & Stock.</div><div class="source-usage"><span class="usage-tag">Application · Song</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Wenham, Gordon J.</strong> <em>Exploring the Old Testament: The Pentateuch.</em> London: SPCK.</div><div class="source-usage"><span class="usage-tag">Torah Overview</span></div></div>
        </div>
        <div class="source-category"><h4>Background & Literary Studies</h4>
          <div class="source-entry"><div class="source-citation"><strong>Kline, Meredith G.</strong> <em>Treaty of the Great King.</em> Grand Rapids: Eerdmans.</div><div class="source-usage"><span class="usage-tag">Treaty Structure</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Walton, John H.</strong> <em>Ancient Near Eastern Thought and the Old Testament.</em> Grand Rapids: Baker Academic.</div><div class="source-usage"><span class="usage-tag">Cultural Background</span></div></div>
        </div>
        <div class="source-category"><h4><img src="/assets/images/icons/BP_icon-blu.png" alt="BibleProject" style="height:1.1em;width:auto;vertical-align:middle;margin-right:.25rem;">BibleProject</h4>
          <div class="source-entry"><div class="source-citation"><strong>BibleProject.</strong> "Book of Deuteronomy Summary." Animated overview. BibleProject.com.</div><div class="source-usage"><span class="usage-tag">Overview</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Mackie, Tim, and Jon Collins.</strong> "What's the Point of Deuteronomy?" <em>Deuteronomy Scroll Series.</em> BibleProject, 2022.</div><div class="source-usage"><span class="usage-tag">Be'er · Genre · Structure</span></div></div>
        </div>
        <div class="citation-note"><p><strong>Full bibliography:</strong> See the <a href="deut-study-kit.html#bibliography">Study Kit master bibliography</a> for the complete source list.</p></div>
      </div>
    </details>'''

STUDYKIT_BIB = '''    <details class="bibliography-section enhanced" id="bibliography">
      <summary><div class="bibliography-header"><div class="bibliography-inner"><span class="bibliography-icon">📚</span><div class="bibliography-text"><h3 class="bibliography-title">Selected Bibliography</h3><p class="bibliography-subtitle">Master reference list for the Deuteronomy study</p></div><div class="expand-indicator"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></div></div></div></summary>
      <div class="bibliography-content">
        <div class="source-category"><h4>Biblical Texts</h4>
          <div class="source-entry"><div class="source-citation"><strong>Biblia Hebraica Stuttgartensia.</strong> Masoretic Text edition.</div><div class="source-usage"><span class="usage-tag">Hebrew Text</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Septuagint (Rahlfs–Hanhart).</strong> Greek translation for comparative study.</div><div class="source-usage"><span class="usage-tag">Greek Text</span></div></div>
        </div>
        <div class="source-category"><h4>Scholarly Commentaries</h4>
          <div class="source-entry"><div class="source-citation"><strong>Craigie, Peter C.</strong> <em>The Book of Deuteronomy.</em> NICOT. Grand Rapids: Eerdmans.</div><div class="source-usage"><span class="usage-tag">Treaty Structure</span><span class="usage-note">ANE treaty analysis and commentary</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Tigay, Jeffrey H.</strong> <em>Deuteronomy.</em> JPS Torah Commentary. Philadelphia: JPS.</div><div class="source-usage"><span class="usage-tag">Law Core</span><span class="usage-note">Jewish scholarly tradition, Ten Commandments mapping</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Block, Daniel I.</strong> <em>Deuteronomy.</em> NIVAC. Grand Rapids: Zondervan, 2012.</div><div class="source-usage"><span class="usage-tag">7-Layer Design</span><span class="usage-note">Law clusters, Jeshurun, internal organization</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Block, Daniel I.</strong> <em>The Gospel According to Moses.</em> Wipf & Stock.</div><div class="source-usage"><span class="usage-tag">Application</span><span class="usage-note">Song, blessing, theological reflection</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>McConville, J. Gordon.</strong> <em>Deuteronomy.</em> Apollos OTC. Leicester: IVP, 2002.</div><div class="source-usage"><span class="usage-tag">Heart Theology</span><span class="usage-note">Heart-circumcision arc, covenant theology, prophetic connections</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Wright, Christopher J. H.</strong> <em>Deuteronomy.</em> NIBC. Peabody: Hendrickson.</div><div class="source-usage"><span class="usage-tag">Ethics</span><span class="usage-note">Social ethics, land theology</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Brueggemann, Walter.</strong> <em>Deuteronomy.</em> Abingdon OTC. Nashville: Abingdon, 2001.</div><div class="source-usage"><span class="usage-tag">Rhetoric</span><span class="usage-note">Rhetorical theology, contemporary relevance</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Olson, Dennis T.</strong> <em>Deuteronomy and the Death of Moses.</em> OBT. Minneapolis: Fortress, 1994.</div><div class="source-usage"><span class="usage-tag">Death · Transition</span><span class="usage-note">Moses' death, prophetic succession, poetry</span></div></div>
        </div>
        <div class="source-category"><h4>Background & Literary Studies</h4>
          <div class="source-entry"><div class="source-citation"><strong>Kline, Meredith G.</strong> <em>Treaty of the Great King.</em> Grand Rapids: Eerdmans, 1963.</div><div class="source-usage"><span class="usage-tag">Treaty</span><span class="usage-note">Foundational study of Deuteronomy as suzerain treaty</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Walton, John H.</strong> <em>Ancient Near Eastern Thought and the Old Testament.</em> Grand Rapids: Baker Academic, 2006.</div><div class="source-usage"><span class="usage-tag">ANE Context</span><span class="usage-note">Cultural background for covenant law and treaty forms</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Kitchen, K. A.</strong> <em>On the Reliability of the Old Testament.</em> Grand Rapids: Eerdmans, 2003.</div><div class="source-usage"><span class="usage-tag">Treaty Dating</span><span class="usage-note">Second-millennium treaty parallels, historical reliability</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Alter, Robert.</strong> <em>The Hebrew Bible: A Translation with Commentary.</em> New York: W. W. Norton.</div><div class="source-usage"><span class="usage-tag">Literary</span><span class="usage-note">Translation, narrative technique</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Weinfeld, Moshe.</strong> <em>Deuteronomy and the Deuteronomic School.</em> Oxford: Clarendon, 1972.</div><div class="source-usage"><span class="usage-tag">Treaty</span><span class="usage-note">Foundational ANE treaty parallels study</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Wenham, Gordon J.</strong> <em>Exploring the Old Testament: The Pentateuch.</em> London: SPCK.</div><div class="source-usage"><span class="usage-tag">Torah Overview</span><span class="usage-note">Introduction to the Pentateuch</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Hallo, William W., ed.</strong> <em>The Context of Scripture.</em> 3 vols. Leiden: Brill, 1997–2002.</div><div class="source-usage"><span class="usage-tag">ANE Laws</span><span class="usage-note">Hammurabi, Hittite laws, comparative texts</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Hoffner, Harry A., Jr.</strong> "Treaty of Tudḫaliya IV with Kurunta." In <em>Context of Scripture</em> (COS 2.18).</div><div class="source-usage"><span class="usage-tag">Treaty Exemplar</span><span class="usage-note">Hittite suzerainty treaty translation</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Parpola, Simo, and Kazuko Watanabe.</strong> <em>Neo-Assyrian Treaties and Loyalty Oaths.</em> SAA 2. Helsinki: Helsinki University Press, 1988.</div><div class="source-usage"><span class="usage-tag">Treaty Exemplar</span><span class="usage-note">Esarhaddon succession oaths, Neo-Assyrian treaty corpus</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Thompson, J. A.</strong> "The Ancient Near Eastern Treaties and the Old Testament." <em>Tyndale Bulletin.</em></div><div class="source-usage"><span class="usage-tag">Treaty Template</span><span class="usage-note">Treaty element analysis, biblical comparison</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Dorsey, David A.</strong> <em>The Literary Structure of the Old Testament.</em> Grand Rapids: Baker, 1999.</div><div class="source-usage"><span class="usage-tag">Chiastic Design</span><span class="usage-note">Macro and internal chiastic structure analysis</span></div></div>
        </div>
        <div class="source-category"><h4>Canonical & New Testament Use</h4>
          <div class="source-entry"><div class="source-citation"><strong>Sailhamer, John H.</strong> <em>The Pentateuch as Narrative.</em> Grand Rapids: Zondervan, 1992.</div><div class="source-usage"><span class="usage-tag">Genesis Bookends</span><span class="usage-note">Torah shape, canonical connections</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Dempster, Stephen G.</strong> <em>Dominion and Dynasty.</em> NSBT 15. Downers Grove: IVP, 2003.</div><div class="source-usage"><span class="usage-tag">Canonical Shape</span><span class="usage-note">TaNaK design, seams</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Beale, G.K., and D.A. Carson, eds.</strong> <em>Commentary on the New Testament Use of the Old Testament.</em> Grand Rapids: Baker, 2007.</div><div class="source-usage"><span class="usage-tag">Jesus · Paul</span><span class="usage-note">Rom 10:19 · 12:19 · 15:10 · Heb 10:30 · Rev 15:3</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>Wright, Christopher J. H.</strong> <em>Old Testament Ethics for the People of God.</em> Downers Grove: IVP, 2004.</div><div class="source-usage"><span class="usage-tag">Application</span><span class="usage-note">Wisdom reflection on Torah for modern ethics</span></div></div>
        </div>
        <div class="source-category"><h4><img src="/assets/images/icons/BP_icon-blu.png" alt="BibleProject" style="height:1.1em;width:auto;vertical-align:middle;margin-right:.25rem;">BibleProject Podcast Sources</h4>
          <div class="source-entry"><div class="source-citation"><strong>Mackie, Tim, and Jon Collins.</strong> <em>The Scroll of Deuteronomy</em> podcast series. BibleProject, 2022.</div><div class="source-usage"><span class="usage-tag">All Themes</span><span class="usage-note">Primary podcast source for the entire study</span></div></div>
          <div class="source-entry"><div class="source-citation">Individual episodes: "What's the Point of Deuteronomy?" · "The Way to True Life" · "The Law… Again" · "Covenant Curses" · "Can Anyone Live a Blessed Life?" · "Moses' Final Words" · "How Do We Use the Law Today?" · "Jesus, Marriage, and the Law" · "Which Laws Still Apply?" (Q&R)</div></div>
          <div class="source-entry"><div class="source-citation"><strong>Mackie, Tim, and Jon Collins.</strong> "The Seams of the TaNaK." <em>Classroom: Jonah, Session 8.</em> BibleProject, 2022.</div><div class="source-usage"><span class="usage-tag">Seams · Canonical Shape</span></div></div>
          <div class="source-entry"><div class="source-citation"><strong>BibleProject.</strong> "Book of Deuteronomy Summary." Animated overview video.</div><div class="source-usage"><span class="usage-tag">Overview</span></div></div>
        </div>
        <div class="citation-note">
          <p><strong>Citation Format:</strong> Chicago Manual of Style, 17th edition. Individual page bibliographies list only the sources most relevant to that page's content.</p>
        </div>
      </div>
    </details>'''


# ══════════════════════════════════════════
# APPLY FIXES
# ══════════════════════════════════════════

def fix_file(filepath, old_pattern, new_block, label):
    if not os.path.exists(filepath):
        print(f"  ✗ {os.path.basename(filepath)} — NOT FOUND")
        return
    
    shutil.copy2(filepath, filepath + '.bib-bak')
    
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    match = re.search(old_pattern, html, re.DOTALL)
    if match:
        html = html[:match.start()] + new_block + html[match.end():]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  ✓ {os.path.basename(filepath)} — {label}")
    else:
        print(f"  · {os.path.basename(filepath)} — pattern not found, skipping")

print("╔══════════════════════════════════════════════╗")
print("║  Fix Bibliographies → 5.8.1 Collapsible      ║")
print("╚══════════════════════════════════════════════╝")
print()

# 1. Overview — replace existing <details> block
fix_file(
    os.path.join(directory, 'deut-overview.html'),
    r'<details class="bibliography-section enhanced" id="bibliography">.*?</details>',
    OVERVIEW_BIB,
    "Bibliography → 5.8.1 with usage-tags + BP icon"
)

# 2. Study Kit — replace the custom card-grid bibliography
# The study-kit bib is a <div class="theology-card"> with id="bibliography"
# followed by the closing </main>
fix_file(
    os.path.join(directory, 'deut-study-kit.html'),
    r'<div class="theology-card animate-on-scroll" id="bibliography">.*?</div>\s*</main>',
    STUDYKIT_BIB + '\n\n  </main>',
    "Card-grid bibliography → 5.8.1 collapsible with usage-tags + BP icon"
)

print()
print("Done. Backups saved as *.bib-bak")
