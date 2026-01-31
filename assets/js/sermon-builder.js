// ========================================
// SERMON BUILDER - Main JavaScript
// Project Context v5.8.1
// ========================================

// State
const availableBooks = {
  // TaNaKh - Torah
  'genesis': { name: 'Genesis', testament: 'tanakh', category: 'torah' },
  
  // TaNaKh - Prophets
  'jonah': { name: 'Jonah', testament: 'tanakh', category: 'prophets' },
  
  // New Covenant - Gospels & Acts
  'luke': { name: 'Luke', testament: 'new-covenant', category: 'gospels' },
  'acts': { name: 'Acts', testament: 'new-covenant', category: 'gospels' },
  
  // New Covenant - Petrine & Jude
  '1-peter': { name: '1 Peter', testament: 'new-covenant', category: 'general' },
  '2-peter': { name: '2 Peter', testament: 'new-covenant', category: 'general' },
  
  // New Covenant - Johannine Corpus
  'revelation': { name: 'Revelation', testament: 'new-covenant', category: 'johannine' }
};

let currentBookData = null;
let currentPassageKey = null;
let currentType = null;

// Default cautions
const DEFAULT_TYPE_CAUTIONS = {
  expository: "Don't move to application until structure and tension are clear.",
  narrative: "Resist turning the story into points; trace the narrative movement.",
  testimony: "You are a witness, not the hero—keep Jesus as the primary actor.",
  prophetic: "Strengthen, encourage, and console must be grounded in the text, not emotion."
};

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  renderBookGrid();
  setupBrowserToggle();
  setupFormActions();
  setupOutputTabs();
  initScrollAnimations();
  loadFromLocalStorage();

  // Show "Your Work" section by default
  document.getElementById('yourWorkSection').classList.add('visible');
  
  updateCanonicalTrajectoryHelper();
  updateTypeCautionUI();
  updateGenerateButtonState();
});

// ========================================
// CANONICAL TRAJECTORY HELPER
// ========================================
function updateCanonicalTrajectoryHelper() {
  const helper = document.getElementById('trajectoryHelper');
  if (!helper) return;

  if (!currentBookData || !currentType) {
    helper.innerHTML = `
      How does this text contribute to the larger biblical story—by shaping the need for the Messiah,
      revealing Jesus' identity, or showing how the resurrection changes everything?
      <em>Not every text names Jesus directly; all texts participate in the story he fulfills.</em>
    `;
    return;
  }

  const testament = currentBookData.testament || 'ot';

  const baseByTestament = {
    ot: 'For OT texts, focus on how this passage shapes covenant tension, human failure, hope, or expectation that creates need for God\'s rescue.',
    nt: 'For NT texts, focus on how Jesus\' identity, resurrection, and Spirit reshape meaning, mission, and community.'
  };

  const byType = {
    expository: 'Let the author\'s logic and structure carry the trajectory.',
    narrative: 'Trace story pressure and movement—don\'t flatten the story into points.',
    testimony: 'Keep Jesus as the primary actor; you are bearing witness.',
    prophetic: 'Ground strengthening, encouragement, and consolation in what the text actually promises.'
  };

  helper.innerHTML = `
    ${baseByTestament[testament]}
    ${byType[currentType] ? ' ' + byType[currentType] : ''}
    <br><em>Not every text names Jesus directly; all texts participate in the story he fulfills.</em>
  `;
}

// ========================================
// TYPE CAUTION
// ========================================
function getTypeCaution(type) {
  try {
    const passage = currentBookData?.passages?.[currentPassageKey];
    return (passage && passage[type] && passage[type].caution)
      || (currentBookData && currentBookData.cautions && currentBookData.cautions[type])
      || DEFAULT_TYPE_CAUTIONS[type]
      || "";
  } catch (e) {
    return DEFAULT_TYPE_CAUTIONS[type] || "";
  }
}

function updateTypeCautionUI() {
  const el = document.getElementById('typeCautionWork');
  if (!el) return;
  const caution = currentType ? getTypeCaution(currentType) : "";
  if (!caution) {
    el.style.display = "none";
    el.innerHTML = "";
    return;
  }
  el.style.display = "block";
  el.innerHTML = `<strong>Type Caution:</strong> ${caution}`;
}

// ========================================
// VALIDATION
// ========================================
function validateRequiredFields(showMessage = false) {
  const aim = (document.getElementById('authorAim')?.value || "").trim();
  const risk = (document.getElementById('misheardRisk')?.value || "").trim();
  const ok = aim.length > 0 && risk.length > 0;

  const msg = document.getElementById('validationMessage');
  if (msg) {
    if (!ok && showMessage) {
      msg.style.display = "block";
      msg.textContent = "Complete the two required formation fields (Author's Aim + Misheard Risk) before generating outputs.";
    } else {
      msg.style.display = "none";
      msg.textContent = "";
    }
  }
  return ok;
}

function updateGenerateButtonState() {
  const btn = document.getElementById('generateBtn');
  if (!btn) return;
  const ok = validateRequiredFields(false);
  btn.disabled = !ok;
  btn.classList.toggle('disabled', !ok);
  btn.setAttribute('aria-disabled', String(!ok));
  btn.title = ok ? "" : "Fill in the required formation fields first.";
}

// ========================================
// TYPE BLOCK ENSURER
// ========================================
function ensureTypeBlock(passage, type) {
  if (!passage || passage[type]) return passage;

  const narrative = passage.narrative;
  if (!narrative) return passage;

  if (type === 'testimony') {
    passage.testimony = {
      before: narrative.storyPanels || '',
      encounter: narrative.pattern || '',
      now: '',
      messiahLink: narrative.messiahLink || '',
      notes: 'Generated from narrative arc'
    };
  }

  if (type === 'prophetic') {
    passage.prophetic = {
      strengthen: narrative.pattern || '',
      encourage: narrative.messiahLink || '',
      console: '',
      notes: 'Generated from narrative arc'
    };
  }

  return passage;
}

// ========================================
// STORY PANELS RENDERER
// ========================================
function renderStoryPanels(panelsText) {
  if (!panelsText) return '';
  
  const panels = panelsText
    .split('→')
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  let html = '<div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">';
  
  panels.forEach((panel, index) => {
    html += `
      <div style="display: flex; gap: 0.75rem; align-items: start;">
        <div style="
          min-width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6c4ff7, #e94bff);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          flex-shrink: 0;
        ">${index + 1}</div>
        <div style="
          flex: 1;
          background: white;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border-left: 3px solid #6c4ff7;
          line-height: 1.6;
          font-size: 0.95rem;
        ">${panel}</div>
      </div>
    `;
  });
  
  html += '</div>';
  return html;
}

// ========================================
// BOOK BROWSER
// ========================================
function setupBrowserToggle() {
  // Main browser toggle
  const toggle = document.getElementById('browserToggle');
  const content = document.getElementById('browserContent');
  const icon = toggle.querySelector('.browser-toggle');

  toggle.addEventListener('click', () => {
    content.classList.toggle('open');
    icon.classList.toggle('open');
  });

  // Testament toggles
  document.querySelectorAll('.testament-header').forEach(header => {
    header.addEventListener('click', () => {
      const testament = header.dataset.testament;
      // Convert 'new-covenant' to 'new-covenantContent', 'tanakh' to 'tanakhContent'
      const contentId = testament + 'Content';
      const content = document.getElementById(contentId);
      const icon = header.querySelector('.testament-toggle');
      
      if (!content || !icon) {
        console.error(`Testament content not found: ${contentId}`);
        return;
      }
      
      content.classList.toggle('open');
      icon.classList.toggle('open');
    });
  });
}

function renderBookGrid() {
  // Organize books by testament and category
  const booksByCategory = {
    torah: [],
    prophets: [],
    writings: [],
    gospels: [],
    pauline: [],
    johannine: [],
    general: [],
    apocalypse: []
  };

  // Categorize books (defensive against unknown categories)
for (const [key, book] of Object.entries(availableBooks)) {
  if (!booksByCategory[book.category]) {
    console.warn(
      `Unknown category "${book.category}" for book "${key}". Defaulting to "general".`
    );
    booksByCategory.general.push({ key, ...book });
    continue;
  }

  booksByCategory[book.category].push({ key, ...book });
}

  // Render TaNaKh sections
  renderCategory('torah', booksByCategory.torah);
  renderCategory('prophets', booksByCategory.prophets);
  renderCategory('writings', booksByCategory.writings);

  // Render New Covenant sections
  renderCategory('gospels', booksByCategory.gospels);
  renderCategory('pauline', booksByCategory.pauline);
  renderCategory('general', booksByCategory.general);
  renderCategory('johannine', booksByCategory.johannine);
  renderCategory('apocalypse', booksByCategory.apocalypse);

  // Update testament counts
  const tanakhCount = booksByCategory.torah.length + booksByCategory.prophets.length + booksByCategory.writings.length;
  const newCovenantCount = booksByCategory.gospels.length + booksByCategory.pauline.length + booksByCategory.general.length + booksByCategory.johannine.length + booksByCategory.apocalypse.length;
  
  document.getElementById('tanakhCount').textContent = tanakhCount;
  document.getElementById('new-covenantCount').textContent = newCovenantCount;
}

function renderCategory(categoryId, books) {
  const section = document.getElementById(`${categoryId}Section`);
  const container = document.getElementById(`${categoryId}Books`);
  const countBadge = document.getElementById(`${categoryId}Count`);

  if (!section || !container || !countBadge) return;

  if (books.length === 0) {
    // Hide section if no books
    section.style.display = 'none';
    return;
  }

  // Show section
  section.style.display = 'block';
  countBadge.textContent = books.length;

  // Render book chips
  let html = '';
  books.forEach(book => {
    html += `
      <div class="book-chip" data-book="${book.key}">
        ${book.name}
      </div>
    `;
  });

  container.innerHTML = html;

  // Add click listeners
  container.querySelectorAll('.book-chip').forEach(chip => {
    chip.addEventListener('click', () => loadBook(chip.dataset.book));
  });
}

async function loadBook(bookKey) {
  try {
    const response = await fetch(`/assets/data/speech-presets/${bookKey}.json`);
    if (!response.ok) throw new Error('Failed to load book data');
    
    currentBookData = await response.json();
    
    // Update active state - remove from all chips
    document.querySelectorAll('.book-chip').forEach(c => c.classList.remove('active'));
    // Add to selected chip
    document.querySelector(`[data-book="${bookKey}"]`)?.classList.add('active');
    
    // Show overview
    renderBookOverview();
  } catch (error) {
    console.error('Error loading book:', error);
    alert('Failed to load book data. Please try again.');
  }
}

function renderBookOverview() {
  const overview = document.getElementById('bookOverview');
  const data = currentBookData;

    // Defensive render: structure can be array OR string
  let structureHtml = '';
  if (Array.isArray(data.structure)) {
    structureHtml = `
      <ul style="margin: 0.5rem 0 0 1.5rem; line-height: 1.8;">
        ${data.structure.map(s => `<li>${s}</li>`).join('')}
      </ul>
    `;
  } else if (typeof data.structure === 'string') {
    structureHtml = `
      <p style="margin: 0.5rem 0 0; line-height: 1.8; white-space: pre-line;">
        ${data.structure}
      </p>
    `;
  }
  
  let html = `
    <h3 style="margin: 0 0 1rem 0; color: var(--cosmic-indigo);">📖 ${data.book}</h3>
    
    <div style="margin-bottom: 1.5rem;">
      <strong style="display: block; margin-bottom: 0.5rem; color: #495057;">Book Theme:</strong>
      <p style="margin: 0; line-height: 1.7;">${data.theme}</p>
    </div>

        <div style="margin-bottom: 1.5rem;">
      <strong style="display: block; margin-bottom: 0.5rem; color: #495057;">Structure:</strong>
      ${structureHtml}
    </div>

    <div style="margin-bottom: 1.5rem;">
      <strong style="display: block; margin-bottom: 0.5rem; color: #495057;">Messiah Profile:</strong>
      <p style="margin: 0; line-height: 1.7;">${data.messiahProfile}</p>
    </div>

    <div>
      <strong style="display: block; margin-bottom: 1rem; color: #495057;">Key Passages:</strong>
      <div class="passage-grid">
        ${Object.entries(data.passages).map(([key, passage]) => `
          <div class="passage-card">
            <div class="passage-info">
              <h4>${passage.reference}</h4>
              <p>${passage.title}</p>
              <div class="type-badges">
                ${passage.types.map(type => `
                  <span class="type-badge">${type}</span>
                `).join('')}
              </div>
            </div>
            <button class="load-passage-btn" data-passage="${key}">
              Load →
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  overview.innerHTML = html;
  overview.classList.add('visible');

  overview.querySelectorAll('.load-passage-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPassageKey = btn.dataset.passage;
      loadPassage();
    });
  });
}

function loadPassage() {
  const passage = currentBookData.passages[currentPassageKey];
  
  const typeSelector = document.getElementById('typeSelector');
  const typePills = document.getElementById('typePills');
  
  let pillsHtml = passage.types.map(type => `
    <div class="type-pill" data-type="${type}">
      ${type === 'expository' ? '📖' : type === 'narrative' ? '📚' : type === 'testimony' ? '💬' : '🔥'}
      ${type.charAt(0).toUpperCase() + type.slice(1)}
    </div>
  `).join('');
  
  typePills.innerHTML = pillsHtml;
  typeSelector.classList.add('visible');
  
  typePills.querySelectorAll('.type-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      typePills.querySelectorAll('.type-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentType = pill.dataset.type;

      const typeIcons = {
        'expository': '📖',
        'narrative': '📚',
        'testimony': '💬',
        'prophetic': '🔥'
      };
      const previewBadge = document.getElementById('typePreviewBadge');
      if (previewBadge) {
        previewBadge.textContent = `${typeIcons[currentType] || ''} ${currentType}`;
        previewBadge.style.display = 'inline-block';
      }

      ensureTypeBlock(currentBookData.passages[currentPassageKey], currentType);
      loadOrientation();
      
      setTimeout(() => {
        document.getElementById('orientationSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });
  });
  
  currentType = passage.types[0];
  typePills.querySelector('.type-pill').classList.add('active');
  
  const typeIcons = {
    'expository': '📖',
    'narrative': '📚',
    'testimony': '💬',
    'prophetic': '🔥'
  };
  const previewBadge = document.getElementById('typePreviewBadge');
  if (previewBadge) {
    previewBadge.textContent = `${typeIcons[currentType] || ''} ${currentType}`;
    previewBadge.style.display = 'inline-block';
  }
  
  loadOrientation();
  
  document.getElementById('sermonText').value = passage.reference;
  
  setTimeout(() => {
    document.getElementById('typeSelector').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);
}

function loadOrientation() {
  const passage = currentBookData.passages[currentPassageKey];
  const data = passage[currentType];
  
  if (!data) return;
  
  const badge = document.getElementById('currentTypeBadge');
  if (badge) {
    const typeIcons = {
      'expository': '📖',
      'narrative': '📚',
      'testimony': '💬',
      'prophetic': '🔥'
    };
    badge.textContent = `${typeIcons[currentType] || ''} ${currentType}`;
  }
  
  let html = '';
  
  if (currentType === 'expository') {
    if (data.context) html += createOrientationField('📍 Context', data.context);
    if (data.tension) html += createOrientationField('⚡ Tension', data.tension);
    if (data.structure) html += createOrientationField('🧩 Structure', data.structure);
    if (data.messiahProfile) html += createOrientationField('👑 Messiah Profile', data.messiahProfile);
    if (data.messiahLink) html += createOrientationField('✝️ Messiah Link', data.messiahLink);
    if (data.notes) html += createOrientationField('📝 Notes', data.notes);
  } else if (currentType === 'narrative') {
    if (data.storyPanels) {
      html += `
        <div class="orientation-field">
          <strong>📚 STORY PANELS</strong>
          ${renderStoryPanels(data.storyPanels)}
        </div>
      `;
    }
    if (data.pattern) html += createOrientationField('🔍 Pattern', data.pattern);
    if (data.messiahLink) html += createOrientationField('✝️ Messiah Link', data.messiahLink);
    if (data.notes) html += createOrientationField('📝 Notes', data.notes);
  } else if (currentType === 'testimony') {
    if (data.before || data.encounter || data.now) {
      html += `
        <div class="orientation-field">
          <strong>💬 Testimony Structure</strong>
          ${data.before ? `<p><strong>Before:</strong> ${data.before}</p>` : ''}
          ${data.encounter ? `<p><strong>Encounter:</strong> ${data.encounter}</p>` : ''}
          ${data.now ? `<p><strong>Now:</strong> ${data.now}</p>` : ''}
        </div>
      `;
    }
    if (data.messiahLink) html += createOrientationField('✝️ Keep Jesus Central', data.messiahLink);
    if (data.notes) html += createOrientationField('📝 Notes', data.notes);
  } else if (currentType === 'prophetic') {
    if (data.strengthen) html += createOrientationField('💪 Strengthen', data.strengthen);
    if (data.encourage) html += createOrientationField('🎯 Encourage', data.encourage);
    if (data.console) html += createOrientationField('💙 Console', data.console);
    if (data.notes) html += createOrientationField('📝 Notes', data.notes);
  }
  
  document.getElementById('orientationContent').innerHTML = html;
  document.getElementById('orientationSection').classList.add('visible');
  
  updateDynamicFields();
  updateCanonicalTrajectoryHelper();
  updateTypeCautionUI();
}

function createOrientationField(label, content) {
  const isNotes = label.includes('Notes') || label.includes('📝');
  const className = isNotes ? 'orientation-field notes-field' : 'orientation-field';
  
  return `
    <div class="${className}">
      <strong>${label}</strong>
      <p>${content}</p>
    </div>
  `;
}

function updateDynamicFields() {
  const container = document.getElementById('dynamicFields');
  let html = '';
  
  if (currentType === 'expository') {
    html = `
      <div class="form-field">
        <label for="movement1">Movement 1 (Your Outline):</label>
        <textarea id="movement1" rows="2" placeholder="First section of text and your main point"></textarea>
      </div>
      <div class="form-field">
        <label for="movement2">Movement 2 (Your Outline):</label>
        <textarea id="movement2" rows="2" placeholder="Second section and your main point"></textarea>
      </div>
      <div class="form-field">
        <label for="movement3">Movement 3 (Your Outline - optional):</label>
        <textarea id="movement3" rows="2" placeholder="Third section and your main point"></textarea>
      </div>
    `;
  } else if (currentType === 'narrative') {
    html = `
      <div class="form-field">
        <label for="storyPanel1">Story Panel 1 (Your Selection):</label>
        <textarea id="storyPanel1" rows="2" placeholder="First story episode you'll use"></textarea>
      </div>
      <div class="form-field">
        <label for="storyPanel2">Story Panel 2 (Your Selection):</label>
        <textarea id="storyPanel2" rows="2" placeholder="Second story episode"></textarea>
      </div>
      <div class="form-field">
        <label for="narrativePattern">Pattern Exposed (Your Application):</label>
        <textarea id="narrativePattern" rows="2" placeholder="What pattern do you see? How does it apply to your audience?"></textarea>
      </div>
    `;
  } else if (currentType === 'testimony') {
    html = `
      <div class="form-field">
        <label for="testimonyBefore">Before (Your Story):</label>
        <textarea id="testimonyBefore" rows="2" placeholder="What was your life like before Jesus?"></textarea>
      </div>
      <div class="form-field">
        <label for="testimonyEncounter">Encounter (Your Story):</label>
        <textarea id="testimonyEncounter" rows="2" placeholder="How did Jesus meet you? Be specific about HIS work"></textarea>
      </div>
      <div class="form-field">
        <label for="testimonyNow">Now (Your Story):</label>
        <textarea id="testimonyNow" rows="2" placeholder="What's different now?"></textarea>
      </div>
    `;
  } else if (currentType === 'prophetic') {
    html = `
      <div class="form-field">
        <label for="propheticStrengthen">Strengthen (Your Word):</label>
        <textarea id="propheticStrengthen" rows="2" placeholder="What truth builds up their faith?"></textarea>
      </div>
      <div class="form-field">
        <label for="propheticEncourage">Encourage (Your Word):</label>
        <textarea id="propheticEncourage" rows="2" placeholder="What vision moves them forward?"></textarea>
      </div>
      <div class="form-field">
        <label for="propheticConsole">Console (Your Word):</label>
        <textarea id="propheticConsole" rows="2" placeholder="What hope meets their pain?"></textarea>
      </div>
    `;
  }
  
  container.innerHTML = html;
}

// ========================================
// FORM ACTIONS
// ========================================
function setupFormActions() {
  const authorAim = document.getElementById('authorAim');
  const misheardRisk = document.getElementById('misheardRisk');
  
  if (authorAim && misheardRisk) {
    authorAim.addEventListener('input', () => {
      updateGenerateButtonState();
      saveToLocalStorage();
    });
    misheardRisk.addEventListener('input', () => {
      updateGenerateButtonState();
      saveToLocalStorage();
    });
  }
  
  // Auto-save on all form changes
  document.getElementById('sermonForm').addEventListener('input', saveToLocalStorage);
  
  updateGenerateButtonState();

  document.getElementById('generateBtn').addEventListener('click', () => {
    if (!validateRequiredFields(true)) {
      document.getElementById('yourWorkSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    generateOutputs();
  });

  document.getElementById('clearBtn').addEventListener('click', clearForm);
}

function generateOutputs() {
  const htmlSermon = generateFullHtmlSermon();
  const proPresenter = generateProPresenterXML();
  const speakerNotes = generateSpeakerNotes();
  
  document.getElementById('htmlOutput').textContent = htmlSermon;
  document.getElementById('proPresenterOutput').textContent = proPresenter;
  document.getElementById('speakerOutput').textContent = speakerNotes;
  
  document.getElementById('outputSection').classList.add('visible');
  document.getElementById('outputSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearForm() {
  if (confirm('Clear all form fields and stored draft?')) {
    document.getElementById('sermonForm').reset();
    localStorage.removeItem('sermonBuilderDraft');
    updateTypeCautionUI();
    updateGenerateButtonState();
    const validationMsg = document.getElementById('validationMessage');
    if (validationMsg) validationMsg.style.display = 'none';
    
    currentBookData = null;
    currentPassageKey = null;
    currentType = null;
    
    document.querySelectorAll('.book-chip').forEach(c => c.classList.remove('active'));
    document.getElementById('bookOverview').classList.remove('visible');
    document.getElementById('typeSelector').classList.remove('visible');
    document.getElementById('orientationSection').classList.remove('visible');
    document.getElementById('outputSection').classList.remove('visible');
    
    const previewBadge = document.getElementById('typePreviewBadge');
    if (previewBadge) previewBadge.style.display = 'none';
    
    updateCanonicalTrajectoryHelper();
    updateTypeCautionUI();
  }
}

// ========================================
// LOCAL STORAGE (Auto-save)
// ========================================
function saveToLocalStorage() {
  const formData = {
    authorAim: document.getElementById('authorAim')?.value || '',
    misheardRisk: document.getElementById('misheardRisk')?.value || '',
    sermonTitle: document.getElementById('sermonTitle')?.value || '',
    sermonSpeaker: document.getElementById('sermonSpeaker')?.value || '',
    sermonDate: document.getElementById('sermonDate')?.value || '',
    sermonText: document.getElementById('sermonText')?.value || '',
    scriptureTranslation: document.getElementById('scriptureTranslation')?.value || 'ESV',
    scriptureText: document.getElementById('scriptureText')?.value || '',
    yourContext: document.getElementById('yourContext')?.value || '',
    bigIdea: document.getElementById('bigIdea')?.value || '',
    canonicalTrajectory: document.getElementById('canonicalTrajectory')?.value || '',
    response: document.getElementById('response')?.value || '',
    currentType: currentType
  };

  // Type-specific fields
  if (currentType === 'expository') {
    formData.movement1 = document.getElementById('movement1')?.value || '';
    formData.movement2 = document.getElementById('movement2')?.value || '';
    formData.movement3 = document.getElementById('movement3')?.value || '';
  } else if (currentType === 'narrative') {
    formData.storyPanel1 = document.getElementById('storyPanel1')?.value || '';
    formData.storyPanel2 = document.getElementById('storyPanel2')?.value || '';
    formData.narrativePattern = document.getElementById('narrativePattern')?.value || '';
  } else if (currentType === 'testimony') {
    formData.testimonyBefore = document.getElementById('testimonyBefore')?.value || '';
    formData.testimonyEncounter = document.getElementById('testimonyEncounter')?.value || '';
    formData.testimonyNow = document.getElementById('testimonyNow')?.value || '';
  } else if (currentType === 'prophetic') {
    formData.propheticStrengthen = document.getElementById('propheticStrengthen')?.value || '';
    formData.propheticEncourage = document.getElementById('propheticEncourage')?.value || '';
    formData.propheticConsole = document.getElementById('propheticConsole')?.value || '';
  }

  localStorage.setItem('sermonBuilderDraft', JSON.stringify(formData));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('sermonBuilderDraft');
  if (!saved) return;

  try {
    const formData = JSON.parse(saved);
    
    // Basic fields
    if (formData.authorAim) document.getElementById('authorAim').value = formData.authorAim;
    if (formData.misheardRisk) document.getElementById('misheardRisk').value = formData.misheardRisk;
    if (formData.sermonTitle) document.getElementById('sermonTitle').value = formData.sermonTitle;
    if (formData.sermonSpeaker) document.getElementById('sermonSpeaker').value = formData.sermonSpeaker;
    if (formData.sermonDate) document.getElementById('sermonDate').value = formData.sermonDate;
    if (formData.sermonText) document.getElementById('sermonText').value = formData.sermonText;
    if (formData.scriptureTranslation) document.getElementById('scriptureTranslation').value = formData.scriptureTranslation;
    if (formData.scriptureText) document.getElementById('scriptureText').value = formData.scriptureText;
    if (formData.yourContext) document.getElementById('yourContext').value = formData.yourContext;
    if (formData.bigIdea) document.getElementById('bigIdea').value = formData.bigIdea;
    if (formData.canonicalTrajectory) document.getElementById('canonicalTrajectory').value = formData.canonicalTrajectory;
    if (formData.response) document.getElementById('response').value = formData.response;

    updateGenerateButtonState();

    console.log('Draft loaded from localStorage');
  } catch (e) {
    console.error('Error loading draft:', e);
  }
}

// ========================================
// OUTPUT GENERATION - FULL HTML SERMON
// ========================================
function generateFullHtmlSermon() {
  const get = (id) => document.getElementById(id)?.value || '';
  const title = get('sermonTitle') || 'Untitled Sermon';
  const text = get('sermonText') || '[Text Reference]';
  const speaker = get('sermonSpeaker') || '[Speaker]';
  const date = get('sermonDate') || '[Date]';
  const translation = get('scriptureTranslation') || 'ESV';
  const scripture = get('scriptureText') || '[Scripture text not provided]';
  const typeLabel = currentType ? currentType.toUpperCase() : 'SERMON';

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} – ${text} | ${speaker}</title>
  <meta name="description" content="${get('bigIdea') || 'A sermon on ' + text}" />
  
  <style>
    /* Reset & Base */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.7;
      color: #1a1a2e;
      background: #ffffff;
      padding: 2rem 1rem;
      max-width: 900px;
      margin: 0 auto;
    }
    
    h1, h2, h3, h4 { font-weight: 700; margin: 1.5rem 0 0.75rem; }
    h1 { font-size: 2.5rem; color: #6c4ff7; }
    h2 { font-size: 1.8rem; color: #7209b7; border-bottom: 2px solid #e94bff; padding-bottom: 0.5rem; }
    h3 { font-size: 1.4rem; color: #495057; }
    p { margin: 0.75rem 0; }
    
    .hero {
      background: linear-gradient(135deg, #6c4ff7, #e94bff);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .hero h1 { color: white; margin: 0; }
    .hero .meta { opacity: 0.95; margin-top: 1rem; font-size: 1.1rem; }
    
    .section {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 1.5rem 0;
    }
    
    .section h2 { margin-top: 0; }
    
    .scripture {
      background: #fff;
      border-left: 4px solid #6c4ff7;
      padding: 1rem 1.5rem;
      font-size: 1.05rem;
      line-height: 1.9;
      white-space: pre-wrap;
    }
    
    .big-idea {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border-left: 4px solid #3b82f6;
      padding: 1rem 1.5rem;
      font-size: 1.15rem;
      font-weight: 600;
      color: #1e40af;
    }
    
    .formation {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 1rem 1.5rem;
      margin: 1rem 0;
    }
    
    .formation strong { color: #856404; display: block; margin-bottom: 0.5rem; }
    
    .type-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, #6c4ff7, #e94bff);
      color: white;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    footer {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 2px solid #dee2e6;
      text-align: center;
      color: #6c757d;
      font-size: 0.9rem;
    }
    
    @media print {
      body { max-width: 100%; padding: 1rem; }
      .hero { background: #6c4ff7 !important; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>

<header class="hero" id="sermon-hero">
  <h1>${title}</h1>
  <div class="meta">
    <strong>${text}</strong><br>
    ${speaker} | ${date}<br>
    <span class="type-badge">${typeLabel}</span>
  </div>
</header>

<section class="section" id="sermon-big-idea">
  <h2>💡 Big Idea</h2>
  <div class="big-idea">
    ${get('bigIdea') || '[Your one-sentence Big Idea]'}
  </div>
</section>

<section class="section" id="sermon-formation">
  <h2>📋 Formation Guardrails</h2>
  <div class="formation">
    <strong>Author's Aim for Original Audience:</strong>
    <p>${get('authorAim')}</p>
  </div>
  <div class="formation">
    <strong>What Would Be Misheard If We Skip the Original Setting:</strong>
    <p>${get('misheardRisk')}</p>
  </div>
</section>

<section class="section" id="sermon-text">
  <h2>📖 Scripture Reading (${translation})</h2>
  <div class="scripture">${scripture}</div>
</section>

<section class="section" id="sermon-context">
  <h2>📍 Context</h2>
  <p>${get('yourContext') || '[Context for your audience]'}</p>
</section>

`;

  // Type-specific content
  if (currentType === 'expository') {
    html += `<section class="section" id="sermon-movements">
  <h2>🧩 Movements</h2>
`;
    if (get('movement1')) html += `  <h3>Movement 1</h3>\n  <p>${get('movement1')}</p>\n\n`;
    if (get('movement2')) html += `  <h3>Movement 2</h3>\n  <p>${get('movement2')}</p>\n\n`;
    if (get('movement3')) html += `  <h3>Movement 3</h3>\n  <p>${get('movement3')}</p>\n\n`;
    html += `</section>\n\n`;
  } else if (currentType === 'narrative') {
    html += `<section class="section" id="sermon-story">
  <h2>📚 Story Panels</h2>
`;
    if (get('storyPanel1')) html += `  <h3>Panel 1</h3>\n  <p>${get('storyPanel1')}</p>\n\n`;
    if (get('storyPanel2')) html += `  <h3>Panel 2</h3>\n  <p>${get('storyPanel2')}</p>\n\n`;
    if (get('narrativePattern')) html += `  <h3>The Pattern</h3>\n  <p>${get('narrativePattern')}</p>\n\n`;
    html += `</section>\n\n`;
  } else if (currentType === 'testimony') {
    html += `<section class="section" id="sermon-testimony">
  <h2>💬 Testimony</h2>
`;
    if (get('testimonyBefore')) html += `  <h3>Before</h3>\n  <p>${get('testimonyBefore')}</p>\n\n`;
    if (get('testimonyEncounter')) html += `  <h3>Encounter with Jesus</h3>\n  <p>${get('testimonyEncounter')}</p>\n\n`;
    if (get('testimonyNow')) html += `  <h3>Now</h3>\n  <p>${get('testimonyNow')}</p>\n\n`;
    html += `</section>\n\n`;
  } else if (currentType === 'prophetic') {
    html += `<section class="section" id="sermon-prophetic">
  <h2>🔥 Prophetic Edification (1 Cor 14:3)</h2>
`;
    if (get('propheticStrengthen')) html += `  <h3>Strengthen</h3>\n  <p>${get('propheticStrengthen')}</p>\n\n`;
    if (get('propheticEncourage')) html += `  <h3>Encourage</h3>\n  <p>${get('propheticEncourage')}</p>\n\n`;
    if (get('propheticConsole')) html += `  <h3>Console</h3>\n  <p>${get('propheticConsole')}</p>\n\n`;
    html += `</section>\n\n`;
  }

  html += `<section class="section" id="sermon-canonical-trajectory">
  <h2>🧭 Canonical Trajectory</h2>
  <p>${get('canonicalTrajectory') || '[How this text fits in the Messiah → Resurrection story]'}</p>
</section>

<section class="section" id="sermon-response">
  <h2>↪️ Response & Application</h2>
  <p>${get('response') || '[Concrete action/repentance]'}</p>
</section>

<footer>
  <p><strong>Generated by Project Context Sermon Builder</strong></p>
  <p><a href="https://projectcontext.org/resources/teaching-formation/prophetic-training/builder.html">https://projectcontext.org</a></p>
</footer>

</body>
</html>`;

  return html;
}

// ========================================
// OUTPUT GENERATION - PROPRESENTER XML
// ========================================
function generateProPresenterXML() {
  const get = (id) => document.getElementById(id)?.value || '';
  const title = get('sermonTitle') || 'Untitled Sermon';
  const text = get('sermonText') || '[Text]';
  const speaker = get('sermonSpeaker') || '[Speaker]';
  const date = get('sermonDate') || '[Date]';
  const translation = get('scriptureTranslation') || 'ESV';
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<RVPresentationDocument height="1080" width="1920" versionNumber="700" docType="6" creatorCode="1349676880" lastDateUsed="${new Date().toISOString()}" usedCount="0" category="Sermon" resourcesDirectory="" backgroundColor="0 0 0 1" drawingBackgroundColor="0" notes="" artist="" author="${speaker}" album="" title="${title}" CCLIDisplay="0" CCLIArtistCredits="" CCLIPublisher="" CCLISongTitle="" CCLIAuthor="">
  <timeline timeOffSet="0" selectedMediaTrackIndex="0" unitOfMeasure="60" duration="0" loop="0">
  </timeline>
  <bibleReference></bibleReference>
  <groups containerClass="NSMutableArray">
    <RVSlideGrouping name="${title}" uuid="${generateUUID()}" color="0 0 0 0" serialization-array-index="0">
      <slides containerClass="NSMutableArray">
`;

  // Title Slide
  xml += generateSlide(`${title}\n${text}\n\n${speaker} | ${date}`, 'Title');

  // Big Idea
  if (get('bigIdea')) {
    xml += generateSlide(`BIG IDEA\n\n${get('bigIdea')}`, 'Big Idea');
  }

  // Scripture
  if (get('scriptureText')) {
    xml += generateSlide(`${text} (${translation})\n\n${get('scriptureText')}`, 'Scripture');
  }

  // Type-specific slides
  if (currentType === 'expository') {
    if (get('movement1')) xml += generateSlide(`MOVEMENT 1\n\n${get('movement1')}`, 'Movement 1');
    if (get('movement2')) xml += generateSlide(`MOVEMENT 2\n\n${get('movement2')}`, 'Movement 2');
    if (get('movement3')) xml += generateSlide(`MOVEMENT 3\n\n${get('movement3')}`, 'Movement 3');
  } else if (currentType === 'narrative') {
    if (get('storyPanel1')) xml += generateSlide(`STORY PANEL 1\n\n${get('storyPanel1')}`, 'Panel 1');
    if (get('storyPanel2')) xml += generateSlide(`STORY PANEL 2\n\n${get('storyPanel2')}`, 'Panel 2');
    if (get('narrativePattern')) xml += generateSlide(`THE PATTERN\n\n${get('narrativePattern')}`, 'Pattern');
  } else if (currentType === 'testimony') {
    if (get('testimonyBefore')) xml += generateSlide(`BEFORE\n\n${get('testimonyBefore')}`, 'Before');
    if (get('testimonyEncounter')) xml += generateSlide(`ENCOUNTER\n\n${get('testimonyEncounter')}`, 'Encounter');
    if (get('testimonyNow')) xml += generateSlide(`NOW\n\n${get('testimonyNow')}`, 'Now');
  } else if (currentType === 'prophetic') {
    if (get('propheticStrengthen')) xml += generateSlide(`STRENGTHEN\n\n${get('propheticStrengthen')}`, 'Strengthen');
    if (get('propheticEncourage')) xml += generateSlide(`ENCOURAGE\n\n${get('propheticEncourage')}`, 'Encourage');
    if (get('propheticConsole')) xml += generateSlide(`CONSOLE\n\n${get('propheticConsole')}`, 'Console');
  }

  // Canonical Trajectory
  if (get('canonicalTrajectory')) {
    xml += generateSlide(`CANONICAL TRAJECTORY\n\n${get('canonicalTrajectory')}`, 'Trajectory');
  }

  // Response
  if (get('response')) {
    xml += generateSlide(`RESPONSE\n\n${get('response')}`, 'Response');
  }

  // Closing
  xml += generateSlide(`Let's pray.`, 'Closing');

  xml += `      </slides>
    </RVSlideGrouping>
  </groups>
</RVPresentationDocument>`;

  return xml;
}

// Browser-safe Base64 encoder (replaces Node Buffer)
function base64EncodeUtf8(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
function generateSlide(text, label) {
  const uuid = generateUUID();

  // Escape text for RTF (this is DIFFERENT from XML escaping)
  const rtfSafe = String(text)
    .replace(/\\/g, '\\\\')   // backslash
    .replace(/{/g, '\\{')     // opening brace
    .replace(/}/g, '\\}')     // closing brace
    .replace(/\r?\n/g, '\\line '); // line breaks

  // Minimal valid RTF document
  const rtf = `{\\rtf1\\ansi ${rtfSafe}}`;

  return `        <RVDisplaySlide backgroundColor="0 0 0 1" enabled="1" highlightColor="0 0 0 0" hotKey="" label="${label}" notes="" slideType="1" sort_index="0" UUID="${uuid}" drawingBackgroundColor="0" chordChartPath="" serialization-array-index="0">
          <cues containerClass="NSMutableArray"></cues>
          <displayElements containerClass="NSMutableArray">
            <RVTextElement
              displayDelay="0"
              displayName="Text"
              locked="0"
              persistent="0"
              typeID="0"
              fromTemplate="0"
              bezelRadius="0"
              rotation="0"
              source=""
              adjustsHeightToFit="0"
              verticalAlignment="0"
              RTFData="${base64EncodeUtf8(rtf)}"
              revealType="0"
              serialization-array-index="0">
              <_-RVRect3D-_position x="0" y="0" z="0" width="1920" height="1080"></_-RVRect3D-_position>
              <_-D-_serializedShadow containerClass="NSMutableDictionary"></_-D-_serializedShadow>
              <stroke containerClass="NSMutableDictionary"></stroke>
            </RVTextElement>
          </displayElements>
        </RVDisplaySlide>
`;
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ========================================
// OUTPUT GENERATION - SPEAKER NOTES
// ========================================
function generateSpeakerNotes() {
  const get = (id) => document.getElementById(id)?.value || '';
  const typeLabel = currentType ? currentType.toUpperCase() : 'N/A';
  
  let output = '═══════════════════════════════════════════════════════\n';
  output += '                 SERMON OUTLINE\n';
  output += '                 Speaker Notes\n';
  output += '═══════════════════════════════════════════════════════\n\n';
  
  output += `TITLE: ${get('sermonTitle') || '[Title]'}\n`;
  output += `TEXT: ${get('sermonText') || '[Text Reference]'}\n`;
  output += `SPEAKER: ${get('sermonSpeaker') || '[Speaker]'}\n`;
  output += `DATE: ${get('sermonDate') || '[Date]'}\n`;
  output += `TYPE: ${typeLabel}\n`;
  output += `TRANSLATION: ${get('scriptureTranslation') || 'ESV'}\n\n`;
  
  output += '═══════════════════════════════════════════════════════\n\n';
  
  // Formation guardrails
  output += '📋 FORMATION GUARDRAILS\n';
  output += '───────────────────────────────────────────────────────\n';
  output += `Author's Aim: ${get('authorAim')}\n\n`;
  output += `Misheard Risk: ${get('misheardRisk')}\n\n`;
  
  // Scripture
  if (get('scriptureText')) {
    output += '📖 SCRIPTURE TEXT\n';
    output += '───────────────────────────────────────────────────────\n';
    output += `${get('scriptureText')}\n\n`;
  }
  
  if (get('yourContext')) {
    output += '📍 CONTEXT\n';
    output += '───────────────────────────────────────────────────────\n';
    output += `${get('yourContext')}\n\n`;
  }
  
  output += '💡 BIG IDEA\n';
  output += '───────────────────────────────────────────────────────\n';
  output += `${get('bigIdea') || '[Your one-sentence Big Idea]'}\n\n`;

  // Type-specific content
  if (currentType === 'expository') {
    output += '🧩 MOVEMENTS\n';
    output += '───────────────────────────────────────────────────────\n';
    if (get('movement1')) output += `1. ${get('movement1')}\n\n`;
    if (get('movement2')) output += `2. ${get('movement2')}\n\n`;
    if (get('movement3')) output += `3. ${get('movement3')}\n\n`;
  } else if (currentType === 'narrative') {
    output += '📚 STORY PANELS\n';
    output += '───────────────────────────────────────────────────────\n';
    if (get('storyPanel1')) output += `Panel 1: ${get('storyPanel1')}\n\n`;
    if (get('storyPanel2')) output += `Panel 2: ${get('storyPanel2')}\n\n`;
    if (get('narrativePattern')) output += `Pattern:\n${get('narrativePattern')}\n\n`;
  } else if (currentType === 'testimony') {
    output += '💬 TESTIMONY STRUCTURE\n';
    output += '───────────────────────────────────────────────────────\n';
    if (get('testimonyBefore')) output += `BEFORE:\n${get('testimonyBefore')}\n\n`;
    if (get('testimonyEncounter')) output += `ENCOUNTER:\n${get('testimonyEncounter')}\n\n`;
    if (get('testimonyNow')) output += `NOW:\n${get('testimonyNow')}\n\n`;
  } else if (currentType === 'prophetic') {
    output += '🔥 PROPHETIC EDIFICATION (1 Cor 14:3)\n';
    output += '───────────────────────────────────────────────────────\n';
    if (get('propheticStrengthen')) output += `STRENGTHEN:\n${get('propheticStrengthen')}\n\n`;
    if (get('propheticEncourage')) output += `ENCOURAGE:\n${get('propheticEncourage')}\n\n`;
    if (get('propheticConsole')) output += `CONSOLE:\n${get('propheticConsole')}\n\n`;
  }

  output += '🧭 CANONICAL TRAJECTORY\n';
  output += '───────────────────────────────────────────────────────\n';
  output += `${get('canonicalTrajectory') || '[How this text fits in the Messiah → Resurrection story]'}\n\n`;

  output += '↪️ RESPONSE & APPLICATION\n';
  output += '───────────────────────────────────────────────────────\n';
  output += `${get('response') || '[Concrete action/repentance]'}\n\n`;

  output += '═══════════════════════════════════════════════════════\n';
  output += 'Generated by Project Context Sermon Builder\n';
  output += 'https://projectcontext.org/resources/teaching-formation/\n';
  output += '═══════════════════════════════════════════════════════\n';

  return output;
}

// ========================================
// OUTPUT TABS & COPY/DOWNLOAD
// ========================================
function setupOutputTabs() {
  // Tab switching
  document.querySelectorAll('.output-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      
      document.querySelectorAll('.output-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('.output-content').forEach(c => c.classList.remove('active'));
      document.querySelector(`[data-content="${target}"]`).classList.add('active');
    });
  });

  // Copy/Download buttons
  setupCopyButton('copySpeakerBtn', 'speakerOutput');
  setupCopyButton('copyProBtn', 'proPresenterOutput');
  setupDownloadButton('downloadSpeakerBtn', 'speakerOutput', 'speaker-notes.txt');
  setupDownloadButton('downloadProBtn', 'proPresenterOutput', 'sermon.pro7');
  setupDownloadButton('downloadHtmlBtn', 'htmlOutput', 'sermon.html');
}

function setupCopyButton(btnId, outputId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  
  btn.addEventListener('click', async function() {
    const text = document.getElementById(outputId).textContent;
    try {
      await navigator.clipboard.writeText(text);
      this.textContent = '✓ Copied!';
      setTimeout(() => {
        this.textContent = '📋 Copy';
      }, 2000);
    } catch (err) {
      alert('Copy failed. Please select and copy manually.');
    }
  });
}

function setupDownloadButton(btnId, outputId, filename) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  
  btn.addEventListener('click', function() {
    const text = document.getElementById(outputId).textContent;
    const title = document.getElementById('sermonTitle').value || 'sermon';
    const finalFilename = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + filename;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = finalFilename;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
  const items = Array.from(document.querySelectorAll('.animate-on-scroll'));
  if (!items.length) return;

  if (typeof IntersectionObserver === 'undefined') {
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
  );

  items.forEach(el => observer.observe(el));
}

// ========================================
// PAGE UTILITIES
// ========================================
// Reading progress
const progressBar = document.querySelector('.reading-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

// Back to top
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });
}

console.log('Sermon Builder v5.8.1 initialized');