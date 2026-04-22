#!/usr/bin/env node
// ===== GETDEADDICTED ACADEMY — RUNTIME INITIALIZATION TEST =====
// Simulates browser environment and verifies all modules initialize without errors
// Run with: node test-runtime.js

const vm = require('vm');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
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

// Minimal DOM mock
function createMockDOM() {
  const elements = {};
  const mockElement = (id) => ({
    id,
    innerHTML: '',
    textContent: '',
    style: { display: '' },
    className: '',
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => {},
      contains: () => false
    },
    setAttribute: () => {},
    getAttribute: () => null,
    addEventListener: () => {},
    removeEventListener: () => {},
    appendChild: () => {},
    insertBefore: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
    scrollIntoView: () => {},
    remove: () => {},
    focus: () => {},
    value: '',
    checked: false,
    scrollTop: 0,
    offsetWidth: 100,
    dataset: {},
    parentElement: null
  });

  return {
    getElementById: (id) => {
      if (!elements[id]) elements[id] = mockElement(id);
      return elements[id];
    },
    querySelector: () => mockElement('_q'),
    querySelectorAll: () => [],
    createElement: (tag) => mockElement('_created_' + tag),
    addEventListener: () => {},
    body: {
      appendChild: () => {},
      insertBefore: () => {},
      firstChild: mockElement('_first'),
      style: {},
      classList: { add: () => {}, remove: () => {} }
    },
    head: { appendChild: () => {} },
    documentElement: { lang: 'en' }
  };
}

function createMockWindow() {
  const listeners = {};
  return {
    location: { origin: 'http://localhost', href: 'http://localhost/', pathname: '/', search: '' },
    history: { replaceState: () => {} },
    addEventListener: (ev, fn) => { if (!listeners[ev]) listeners[ev] = []; listeners[ev].push(fn); },
    removeEventListener: () => {},
    scrollTo: () => {},
    open: () => ({ document: { write: () => {}, close: () => {} } }),
    navigator: {
      language: 'en-US',
      clipboard: { writeText: () => Promise.resolve() },
      share: undefined,
      userAgent: 'test',
      serviceWorker: undefined
    },
    localStorage: (() => {
      const store = {};
      return {
        getItem: (k) => store[k] || null,
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: (k) => { delete store[k]; },
        clear: () => { Object.keys(store).forEach(k => delete store[k]); },
        get length() { return Object.keys(store).length; },
        key: (i) => Object.keys(store)[i]
      };
    })(),
    speechSynthesis: {
      getVoices: () => [],
      speak: () => {},
      cancel: () => {},
      pause: () => {},
      resume: () => {},
      onvoiceschanged: null
    },
    SpeechSynthesisUtterance: function(text) {
      this.text = text;
      this.voice = null;
      this.rate = 1;
      this.pitch = 1;
      this.volume = 1;
      this.onend = null;
      this.onerror = null;
      this.onboundary = null;
    },
    Audio: function(src) {
      this.src = src;
      this.volume = 1;
      this.play = () => Promise.reject(new Error('autoplay'));
      this.pause = () => {};
      this.currentTime = 0;
      this.onplay = null;
      this.onended = null;
      this.onerror = null;
    },
    Stripe: () => ({ redirectToCheckout: () => Promise.resolve({}) }),
    URL: { createObjectURL: () => 'blob:mock', revokeObjectURL: () => {} },
    Blob: function(parts, opts) { this.parts = parts; this.type = opts?.type; },
    fetch: () => Promise.resolve({ ok: false }),
    setTimeout: global.setTimeout,
    clearTimeout: global.clearTimeout,
    setInterval: global.setInterval,
    clearInterval: global.clearInterval,
    requestAnimationFrame: (fn) => setTimeout(fn, 0),
    _listeners: listeners
  };
}

console.log('\n\x1b[1m🔄 Runtime Initialization Test\x1b[0m\n');

// Build execution context
const mockWindow = createMockWindow();
const mockDocument = createMockDOM();

const ctx = vm.createContext({
  window: mockWindow,
  document: mockDocument,
  navigator: mockWindow.navigator,
  localStorage: mockWindow.localStorage,
  console: { log: () => {}, warn: () => {}, error: () => {} },
  setTimeout: global.setTimeout,
  clearTimeout: global.clearTimeout,
  setInterval: global.setInterval,
  clearInterval: global.clearInterval,
  requestAnimationFrame: (fn) => setTimeout(fn, 0),
  fetch: () => Promise.resolve({ ok: false, json: () => Promise.resolve(null) }),
  Audio: mockWindow.Audio,
  Stripe: mockWindow.Stripe,
  URL: mockWindow.URL,
  Blob: mockWindow.Blob,
  SpeechSynthesisUtterance: mockWindow.SpeechSynthesisUtterance,
  HTMLElement: function() {},
  module: { exports: {} },
  Promise: global.Promise
});

// Make window properties available at top level
ctx.speechSynthesis = mockWindow.speechSynthesis;
ctx.location = mockWindow.location;
ctx.history = mockWindow.history;

// Load order matches index.html
const LOAD_ORDER = [
  'courses.js',
  'exp-1-5.js', 'exp-6-10.js', 'exp-11-15.js', 'exp-16-20.js', 'exp-21-25.js',
  'exp-26-30.js', 'exp-31-35.js', 'exp-36-40.js', 'exp-41-45.js', 'exp-46-50.js',
  'i18n.js', 'loader.js',
  'auth.js', 'progress.js', 'paywall.js', 'dashboard.js',
  'certificate.js', 'coach.js', 'referral.js', 'onboarding.js',
  'classroom.js', 'email.js', 'printables.js',
  'analytics.js', 'recommendations.js', 'notifications.js',
  'gamification.js', 'landing.js', 'admin.js', 'legal.js', 'affiliate.js',
  'voiceover.js', 'avatar.js', 'app.js'
];

console.log('\x1b[1mLoading modules in order:\x1b[0m');

for (const file of LOAD_ORDER) {
  test(`Load ${file}`, () => {
    let code = fs.readFileSync(path.join(__dirname, file), 'utf8');
    // Convert top-level const/let to var so they become context globals (same as browser behavior)
    code = code.replace(/^const /gm, 'var ').replace(/^let /gm, 'var ');
    vm.runInContext(code, ctx, { filename: file, timeout: 5000 });
  });
}

// Verify critical globals exist after loading
console.log('\n\x1b[1mVerifying global objects:\x1b[0m');

const REQUIRED_GLOBALS = [
  'CATEGORIES', 'COURSES',
  'Auth', 'Progress', 'Paywall', 'Dashboard',
  'Certificate', 'Coach', 'Referral', 'Onboarding',
  'Classroom', 'EmailCapture', 'Printables',
  'Analytics', 'Recommendations', 'Notifications',
  'Gamification', 'Landing', 'Admin', 'Legal', 'Affiliate',
  'I18n', 'Loader',
  'voiceover', 'Avatar'
];

for (const name of REQUIRED_GLOBALS) {
  test(`Global "${name}" exists`, () => {
    if (!ctx[name]) throw new Error(`${name} is undefined`);
  });
}

// Verify critical functions are callable
console.log('\n\x1b[1mVerifying key functions:\x1b[0m');

const REQUIRED_FUNCTIONS = [
  ['Auth', 'isLoggedIn'], ['Auth', 'signup'], ['Auth', 'login'],
  ['Progress', 'get'], ['Progress', 'recordSlideView'], ['Progress', 'completeCourse'],
  ['Paywall', 'showPaywall'], ['Paywall', 'checkAccess'],
  ['Certificate', 'generate'],
  ['Coach', 'init'], ['Coach', 'toggle'],
  ['Referral', 'getOrCreateCode'],
  ['Onboarding', 'shouldShow'],
  ['Classroom', 'getClasses'],
  ['Analytics', 'track'],
  ['Recommendations', 'getNext'],
  ['Notifications', 'add'],
  ['Gamification', 'awardXP'], ['Gamification', 'getLevel'],
  ['Landing', 'init'],
  ['Admin', 'isAdmin'],
  ['Legal', 'init'],
  ['Affiliate', 'init'],
  ['I18n', 't'], ['I18n', 'setLocale'],
  ['Loader', 'loadForCourse']
];

for (const [obj, method] of REQUIRED_FUNCTIONS) {
  test(`${obj}.${method}() is callable`, () => {
    if (typeof ctx[obj]?.[method] !== 'function') {
      throw new Error(`${obj}.${method} is not a function (got ${typeof ctx[obj]?.[method]})`);
    }
  });
}

// Verify app.js global functions
console.log('\n\x1b[1mVerifying app.js globals:\x1b[0m');

const APP_FUNCTIONS = [
  'openCourse', 'closeModal', 'startPresentation', 'exitPresentation',
  'nextSlide', 'prevSlide', 'renderSlide', 'buildSlides',
  'filterCourses', 'renderCourses', 'renderCategories',
  'showAuthModal', 'hideAuthModal', 'handleLogin', 'handleSignup',
  'showToast', 'toggleSettings', 'toggleNav', 'closeNav',
  'handleQuizAnswer', 'shareCompletion', 'updateNavAuth'
];

for (const fn of APP_FUNCTIONS) {
  test(`${fn}() is defined`, () => {
    if (typeof ctx[fn] !== 'function') {
      throw new Error(`${fn} is not a function`);
    }
  });
}

// Functional test: Auth flow
console.log('\n\x1b[1mFunctional tests:\x1b[0m');

test('Auth.signup creates a user', () => {
  const result = ctx.Auth.signup({ name: 'Test', email: 'test@test.com', pin: '1234' });
  if (!result.ok) throw new Error('Signup failed: ' + result.error);
});

test('Auth.isLoggedIn returns true after signup', () => {
  if (!ctx.Auth.isLoggedIn()) throw new Error('Not logged in after signup');
});

test('Auth.getCurrentUser returns user', () => {
  const user = ctx.Auth.getCurrentUser();
  if (!user || user.name !== 'Test') throw new Error('Wrong user: ' + JSON.stringify(user));
});

test('Progress.get returns default data', () => {
  const p = ctx.Progress.get();
  if (!p || typeof p.completedCourses === 'undefined') throw new Error('Invalid progress data');
});

test('Gamification.getLevel returns level 1', () => {
  const level = ctx.Gamification.getLevel();
  if (!level || level.level !== 1) throw new Error('Wrong level: ' + JSON.stringify(level));
});

test('I18n.t returns English by default', () => {
  const val = ctx.I18n.t('hero_title');
  if (val !== 'Take Back Your Screen Time') throw new Error('Wrong translation: ' + val);
});

test('I18n.t returns Spanish after setLocale', () => {
  ctx.I18n.setLocale('es');
  const val = ctx.I18n.t('hero_title');
  if (val !== 'Recupera Tu Tiempo de Pantalla') throw new Error('Wrong translation: ' + val);
  ctx.I18n.setLocale('en');
});

test('Recommendations.getNext returns a course', () => {
  const rec = ctx.Recommendations.getNext();
  if (!rec || !rec.title) throw new Error('No recommendation returned');
});

test('Auth.canAccessCourse(1) returns true (free course)', () => {
  if (!ctx.Auth.canAccessCourse(1)) throw new Error('Free course not accessible');
});

test('Auth.canAccessCourse(10) returns false (premium, free plan)', () => {
  if (ctx.Auth.canAccessCourse(10)) throw new Error('Premium course accessible on free plan');
});

test('buildSlides generates slides for course 1', () => {
  const course = ctx.COURSES.find(c => c.id === 1);
  const cat = ctx.CATEGORIES.find(c => c.id === course.category);
  const slides = ctx.buildSlides(course, cat);
  if (!slides || slides.length < 10) throw new Error('Too few slides: ' + slides.length);
});

// Results
console.log('\n' + '═'.repeat(50));
const total = passed + failed;
console.log(`\x1b[1m Results: ${passed}/${total} passed, ${failed} failed\x1b[0m`);
if (failed > 0) {
  console.log(`\x1b[31m ✗ ${failed} test(s) failed\x1b[0m`);
  process.exit(1);
} else {
  console.log(`\x1b[32m ✓ All runtime tests passed!\x1b[0m`);
}
console.log('═'.repeat(50) + '\n');
