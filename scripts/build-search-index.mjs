// scripts/build-search-index.mjs
import { promises as fs } from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');                // repo root
const BOOKS_DIR = path.join(ROOT, 'assets', 'data', 'books');
const OUT_DIR   = path.join(ROOT, 'assets', 'data');

const OUT_CHAR_INDEX  = path.join(OUT_DIR, 'characters-search-index.json');
const OUT_WOMEN_INDEX = path.join(OUT_DIR, 'women-search-index.json');

function normalizeChar(c, bookMeta, bookId) {
  const tags = Array.isArray(c.tags) ? c.tags : (c.tags ? [c.tags] : []);
  return {
    id: c.id || `${bookId}-${(c.name||'').toLowerCase().replace(/[^\w]+/g,'-')}`,
    name: c.name || null,
    hebrew: c.hebrew || null,
    meaning: c.meaning || null,
    summary: c.summary || null,
    references: c.references || [],
    tags: tags.length ? tags : undefined,
    gender: c.gender || 'unknown',
    profilePath: c.profilePath || null,
    book: bookMeta?.name || bookId,
    bookId,
    // Optional: searchable aliases
    aliases: c.aliases || []
  };
}

async function loadBook(file) {
  const full = path.join(BOOKS_DIR, file);
  const raw = await fs.readFile(full, 'utf8');
  const data = JSON.parse(raw);

  const bookId = (data.book?.id) || path.basename(file, '.json');
  const bookMeta = data.book || { id: bookId, name: bookId };
  const chars = Array.isArray(data.characters) ? data.characters : [];

  return chars.map(c => normalizeChar(c, bookMeta, bookId));
}

async function main() {
  const files = (await fs.readdir(BOOKS_DIR))
    .filter(f => f.endsWith('.json'));

  const all = [];
  for (const f of files) {
    try {
      const chars = await loadBook(f);
      all.push(...chars);
    } catch (e) {
      console.warn(`⚠️  Skipping ${f}: ${e.message}`);
    }
  }

  // Deduplicate by id or (name+bookId)
  const seen = new Set();
  const deduped = [];
  for (const c of all) {
    const key = c.id || `${c.name}::${c.bookId}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(c);
    }
  }

  // Split women index
  const women = deduped.filter(c => c.gender === 'female');

  // Sort (nice for diffs)
  const byName = (a,b) => (a.name||'').localeCompare(b.name||'');
  deduped.sort(byName);
  women.sort(byName);

  // Ensure output dir
  await fs.mkdir(OUT_DIR, { recursive: true });

  // Write
  await fs.writeFile(OUT_CHAR_INDEX,  JSON.stringify(deduped, null, 2));
  await fs.writeFile(OUT_WOMEN_INDEX, JSON.stringify(women,   null, 2));

  console.log(`✅ Built ${deduped.length} character entries → ${path.relative(ROOT, OUT_CHAR_INDEX)}`);
  console.log(`✅ Built ${women.length} women entries     → ${path.relative(ROOT, OUT_WOMEN_INDEX)}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});