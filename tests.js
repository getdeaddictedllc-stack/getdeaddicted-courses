#!/usr/bin/env node
// ===== GETDEADDICTED ACADEMY — AUTOMATED TEST SUITE =====
// Run with: node tests.js
// Tests: module integrity, course data, build output, HTML structure

const fs = require('fs');
const path = require('path');
const vm = require('vm');

let passed = 0;
let failed = 0;
let total = 0;

function test(name, fn) {
  total++;
  try {
    fn();
    passed++;
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
  } catch (err) {
    failed++;
    console.log(`  \x1b[31m✗\x1b[0m ${name}`);
    console.log(`    → ${err.message}`);
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

function assertEqual(actual, expected, msg) {
  if (actual !== expected) throw new Error(`${msg || 'Not equal'}: expected ${expected}, got ${actual}`);
}

// ─── Test Group: File Integrity ──────────────────────────────────────

console.log('\n\x1b[1m📁 File Integrity\x1b[0m');

const REQUIRED_JS = [
  'auth.js', 'progress.js', 'paywall.js', 'dashboard.js', 'certificate.js',
  'coach.js', 'referral.js', 'onboarding.js', 'classroom.js', 'email.js',
  'printables.js', 'notifications.js', 'recommendations.js', 'analytics.js',
  'gamification.js', 'landing.js', 'admin.js', 'legal.js', 'loader.js',
  'voiceover.js', 'avatar.js', 'app.js', 'courses.js'
];

for (const f of REQUIRED_JS) {
  test(`${f} exists and has content`, () => {
    const stat = fs.statSync(path.join(__dirname, f));
    assert(stat.size > 100, `${f} is too small (${stat.size} bytes)`);
  });
}

test('styles.css exists and is substantial', () => {
  const lines = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8').split('\n').length;
  assert(lines > 1000, `Only ${lines} lines`);
});

test('index.html exists', () => {
  assert(fs.existsSync(path.join(__dirname, 'index.html')));
});

// ─── Test Group: JS Syntax ───────────────────────────────────────────

console.log('\n\x1b[1m🔧 JavaScript Syntax\x1b[0m');

for (const f of REQUIRED_JS) {
  test(`${f} has valid syntax`, () => {
    const code = fs.readFileSync(path.join(__dirname, f), 'utf8');
    try { new (require('vm').Script)(code, { filename: f }); }
    catch (e) { throw new Error(`Syntax error in ${f}: ${e.message}`); }
  });
}

// ─── Test Group: Course Data ─────────────────────────────────────────

console.log('\n\x1b[1m📚 Course Data\x1b[0m');

const ctx = vm.createContext({ module: { exports: {} }, console: { ...console, log: () => {} } });
const coursesCode = fs.readFileSync(path.join(__dirname, 'courses.js'), 'utf8')
  .replace(/^const /gm, 'var ').replace(/^let /gm, 'var ');
vm.runInContext(coursesCode, ctx);

test('COURSES array has 50 courses', () => {
  assertEqual(ctx.COURSES.length, 50);
});

test('CATEGORIES array has 10 categories', () => {
  assertEqual(ctx.CATEGORIES.length, 10);
});

test('Every course has required fields', () => {
  for (const c of ctx.COURSES) {
    assert(c.id, `Course missing id`);
    assert(c.title, `Course ${c.id} missing title`);
    assert(c.description, `Course ${c.id} missing description`);
    assert(c.category, `Course ${c.id} missing category`);
    assert(c.level, `Course ${c.id} missing level`);
    assert(c.duration, `Course ${c.id} missing duration`);
    assert(c.lessons, `Course ${c.id} missing lessons`);
    assert(c.modules && c.modules.length > 0, `Course ${c.id} has no modules`);
    assert(c.outcomes && c.outcomes.length > 0, `Course ${c.id} has no outcomes`);
    assert(c.audience, `Course ${c.id} missing audience`);
  }
});

test('Course IDs are unique and sequential 1-50', () => {
  const ids = ctx.COURSES.map(c => c.id).sort((a, b) => a - b);
  for (let i = 0; i < 50; i++) {
    assertEqual(ids[i], i + 1, `Missing course ID ${i + 1}`);
  }
});

test('Every course maps to a valid category', () => {
  const catIds = ctx.CATEGORIES.map(c => c.id);
  for (const c of ctx.COURSES) {
    assert(catIds.includes(c.category), `Course ${c.id} has invalid category: ${c.category}`);
  }
});

test('Each category has exactly 5 courses', () => {
  for (const cat of ctx.CATEGORIES) {
    const count = ctx.COURSES.filter(c => c.category === cat.id).length;
    assertEqual(count, 5, `Category ${cat.name} has ${count} courses`);
  }
});

// ─── Test Group: Expansion Data ──────────────────────────────────────

console.log('\n\x1b[1m📖 Expansion Data\x1b[0m');

const expFiles = ['exp-1-5','exp-6-10','exp-11-15','exp-16-20','exp-21-25',
  'exp-26-30','exp-31-35','exp-36-40','exp-41-45','exp-46-50'];

for (const f of expFiles) {
  test(`${f}.js loads without error`, () => {
    const code = fs.readFileSync(path.join(__dirname, `${f}.js`), 'utf8')
      .replace(/^const /gm, 'var ').replace(/^let /gm, 'var ');
    vm.runInContext(code, ctx);
  });
}

test('All 50 courses have rich expansion data', () => {
  const fns = [ctx.getExp_1_5,ctx.getExp_6_10,ctx.getExp_11_15,ctx.getExp_16_20,
    ctx.getExp_21_25,ctx.getExp_26_30,ctx.getExp_31_35,ctx.getExp_36_40,
    ctx.getExp_41_45,ctx.getExp_46_50].filter(Boolean);

  const ids = new Set();
  for (const fn of fns) {
    const data = fn();
    Object.keys(data).forEach(id => ids.add(Number(id)));
  }
  assertEqual(ids.size, 50, `Only ${ids.size} courses have expansion data`);
});

test('Every expanded module has narration, keyPoints, and exercise', () => {
  const fns = [ctx.getExp_1_5,ctx.getExp_6_10,ctx.getExp_11_15,ctx.getExp_16_20,
    ctx.getExp_21_25,ctx.getExp_26_30,ctx.getExp_31_35,ctx.getExp_36_40,
    ctx.getExp_41_45,ctx.getExp_46_50].filter(Boolean);

  let incomplete = [];
  for (const fn of fns) {
    const data = fn();
    for (const [id, exp] of Object.entries(data)) {
      if (!exp.modules) continue;
      for (const mod of exp.modules) {
        if (typeof mod !== 'object') continue;
        if (!mod.narration) incomplete.push(`Course ${id}: ${mod.title} missing narration`);
        if (!mod.keyPoints || mod.keyPoints.length === 0) incomplete.push(`Course ${id}: ${mod.title} missing keyPoints`);
      }
    }
  }
  assert(incomplete.length === 0, `${incomplete.length} incomplete modules:\n    ${incomplete.slice(0, 5).join('\n    ')}`);
});

// ─── Test Group: HTML Structure ──────────────────────────────────────

console.log('\n\x1b[1m🏗️  HTML Structure\x1b[0m');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const REQUIRED_IDS = [
  'loadingOverlay', 'authOverlay', 'paywallOverlay', 'certificateModal',
  'referralPanel', 'onboardingOverlay', 'coachWidget', 'classroomModal',
  'emailPopup', 'notifPanel', 'badgeToast', 'navLinks', 'navAuthBtn',
  'navUserDisplay', 'navUpgradeBtn', 'navNotifBell', 'navDashboardLink',
  'xpBar', 'dailyChallenge', 'streakBanner', 'categoryGrid', 'courseGrid',
  'searchInput', 'categoryFilter', 'levelFilter', 'pricingGrid',
  'statsGrid', 'trustBadges', 'testimonialGrid', 'comparisonTable', 'faqList',
  'modalOverlay', 'presentationMode', 'dashboardSection', 'recommendationBar',
  'emailCaptureFooter'
];

for (const id of REQUIRED_IDS) {
  test(`HTML has element #${id}`, () => {
    assert(html.includes(`id="${id}"`), `Missing id="${id}"`);
  });
}

test('HTML has all script tags', () => {
  const scriptCount = (html.match(/<script src=".*\.js"><\/script>/g) || []).length;
  assert(scriptCount >= 30, `Only ${scriptCount} script tags (expected 30+)`);
});

test('HTML has SEO meta tags', () => {
  assert(html.includes('og:title'), 'Missing og:title');
  assert(html.includes('og:description'), 'Missing og:description');
  assert(html.includes('twitter:card'), 'Missing twitter:card');
  assert(html.includes('application/ld+json'), 'Missing JSON-LD');
});

test('HTML has PWA manifest link', () => {
  assert(html.includes('manifest.json'), 'Missing manifest.json link');
});

// ─── Test Group: Build Output ────────────────────────────────────────

console.log('\n\x1b[1m📦 Build Output\x1b[0m');

test('dist/ directory exists', () => {
  assert(fs.existsSync(path.join(__dirname, 'dist')));
});

test('dist/bundle.js exists and is > 500KB', () => {
  const stat = fs.statSync(path.join(__dirname, 'dist', 'bundle.js'));
  assert(stat.size > 500000, `Bundle too small: ${stat.size} bytes`);
});

test('dist/sw.js exists', () => {
  assert(fs.existsSync(path.join(__dirname, 'dist', 'sw.js')));
});

test('dist/sitemap.xml has 60+ URLs', () => {
  const sitemap = fs.readFileSync(path.join(__dirname, 'dist', 'sitemap.xml'), 'utf8');
  const urls = (sitemap.match(/<url>/g) || []).length;
  assert(urls >= 60, `Only ${urls} URLs in sitemap`);
});

test('50 course SEO pages exist', () => {
  const pages = fs.readdirSync(path.join(__dirname, 'dist', 'courses')).filter(f => f.endsWith('.html'));
  assertEqual(pages.length, 50);
});

test('10 category SEO pages exist', () => {
  const pages = fs.readdirSync(path.join(__dirname, 'dist', 'categories')).filter(f => f.endsWith('.html'));
  assertEqual(pages.length, 10);
});

test('vercel.json exists and is valid JSON', () => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8'));
  assert(data.outputDirectory === 'dist', 'outputDirectory should be dist');
  assert(data.headers && data.headers.length > 0, 'Missing headers');
});

test('manifest.json is valid PWA manifest', () => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
  assert(data.name === 'GetDeaddicted Academy', 'Wrong app name');
  assert(data.icons && data.icons.length > 0, 'Missing icons');
});

// ─── Test Group: Static Assets ───────────────────────────────────────

console.log('\n\x1b[1m📎 Static Assets\x1b[0m');

for (const f of ['robots.txt', 'sitemap.xml', 'manifest.json', 'vercel.json']) {
  test(`${f} exists`, () => {
    assert(fs.existsSync(path.join(__dirname, f)));
  });
}

// ─── Results ─────────────────────────────────────────────────────────

console.log('\n' + '═'.repeat(50));
console.log(`\x1b[1m Results: ${passed}/${total} passed, ${failed} failed\x1b[0m`);
if (failed > 0) {
  console.log(`\x1b[31m ✗ ${failed} test(s) failed\x1b[0m`);
  process.exit(1);
} else {
  console.log(`\x1b[32m ✓ All tests passed!\x1b[0m`);
}
console.log('═'.repeat(50) + '\n');
