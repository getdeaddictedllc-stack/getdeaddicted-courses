#!/usr/bin/env node
// ===== GETDEADDICTED ACADEMY — ELEVENLABS MP3 GENERATOR =====
// Extracts all slide narrations and generates realistic MP3s via ElevenLabs API
//
// Usage: node generate-audio.js [--course N] [--dry-run] [--voice VOICE_ID]
//
// --course N    Generate audio for a single course (1-50)
// --dry-run     Show narrations without calling API (free, no credits used)
// --voice ID    Use a specific ElevenLabs voice ID

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
let fetch; try { fetch = require('node-fetch'); } catch { /* optional, only needed for elevenlabs */ }

// ─── Config ───────────────────────────────────────────────────────────────
function loadElevenLabsKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY;
  try {
    return fs.readFileSync(path.join(__dirname, '../../api-keys.env'), 'utf8')
      .match(/ELEVENLABS_API_KEY=(.+)/)?.[1]?.trim();
  } catch { return null; }
}
const API_KEY = loadElevenLabsKey();

const AUDIO_DIR = path.join(__dirname, 'audio');
const API_BASE = 'https://api.elevenlabs.io/v1';

// High-quality realistic voices (will be selected after fetching available voices)
// Default: "Rachel" — warm, friendly, great for educational content
let VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // Rachel (default)

// Model: eleven_multilingual_v2 for highest quality
const MODEL_ID = 'eleven_multilingual_v2';

// Voice settings for warm, clear, kid-friendly narration
const VOICE_SETTINGS = {
  stability: 0.65,        // Slightly varied = more natural
  similarity_boost: 0.80, // High similarity to chosen voice
  style: 0.35,            // Some expressiveness
  use_speaker_boost: true  // Clearer audio
};

// Rate limiting: ElevenLabs allows ~2-3 concurrent requests
const DELAY_MS = 500; // 500ms between requests to be safe
const MAX_RETRIES = 5;

// ─── Piper config ─────────────────────────────────────────────────────────
const PIPER_PYTHON = path.join(__dirname, '.venv-piper/bin/python');
const PIPER_WORKER = path.join(__dirname, 'piper-worker.py');
const PIPER_MODEL = path.join(__dirname, 'voices/en_US-amy-medium.onnx');

// ─── Load Course Data ─────────────────────────────────────────────────────

function loadCourseData() {
  const vm = require('vm');

  // Create a shared context for all evals
  const ctx = vm.createContext({ module: { exports: {} }, console });

  // Load CATEGORIES and COURSES from courses.js
  // Replace const/let with var so they become context properties
  const coursesCode = fs.readFileSync(path.join(__dirname, 'courses.js'), 'utf8')
    .replace(/^const /gm, 'var ').replace(/^let /gm, 'var ');
  vm.runInContext(coursesCode, ctx);

  // Load expansion data
  const expFiles = [
    'exp-1-5', 'exp-6-10', 'exp-11-15', 'exp-16-20', 'exp-21-25',
    'exp-26-30', 'exp-31-35', 'exp-36-40', 'exp-41-45', 'exp-46-50'
  ];

  for (const file of expFiles) {
    const code = fs.readFileSync(path.join(__dirname, `${file}.js`), 'utf8')
      .replace(/^const /gm, 'var ').replace(/^let /gm, 'var ');
    vm.runInContext(code, ctx);
  }

  // Get expansion functions from context
  const expFunctions = [
    ctx.getExp_1_5, ctx.getExp_6_10, ctx.getExp_11_15, ctx.getExp_16_20,
    ctx.getExp_21_25, ctx.getExp_26_30, ctx.getExp_31_35, ctx.getExp_36_40,
    ctx.getExp_41_45, ctx.getExp_46_50
  ].filter(Boolean);

  const COURSES = ctx.COURSES;
  const CATEGORIES = ctx.CATEGORIES;

  // Merge expansion data into courses
  expFunctions.forEach(fn => {
    const data = fn();
    Object.entries(data).forEach(([id, expanded]) => {
      const course = COURSES.find(c => c.id === Number(id));
      if (!course) return;
      if (expanded.introduction) course.introduction = expanded.introduction;
      if (expanded.detailedOutcomes) course.detailedOutcomes = expanded.detailedOutcomes;
      if (expanded.modules && Array.isArray(expanded.modules)) {
        course.modules = expanded.modules;
      }
    });
  });

  return { COURSES, CATEGORIES };
}

// ─── Replicate buildSlides() narration logic ──────────────────────────────

function isRichModule(mod) {
  return typeof mod === 'object' && mod.title;
}

function generateQuiz(keyPoints, moduleTitle) {
  const question = `Based on what you just learned about "${moduleTitle}", which of the following is true?`;
  return { question };
}

function generateReflection(moduleTitle, keyPoints) {
  const reflections = [
    `How does what you learned about "${moduleTitle}" connect to your own daily life?`,
    `Think about someone you know. How could the ideas from "${moduleTitle}" help them?`,
    `What is one small thing you could change today based on what you just learned?`,
    `If you could tell a friend one thing from this module, what would it be?`,
    `How did this module make you feel? Did anything surprise you?`
  ];
  const hash = moduleTitle.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return reflections[hash % reflections.length];
}

function extractNarrations(course, cat) {
  const narrations = [];
  const totalModules = course.modules.length;
  const outcomes = course.detailedOutcomes || course.outcomes;
  const moduleNames = course.modules.map(m => isRichModule(m) ? m.title : m);

  // Slide 1: Title
  narrations.push({
    slideType: 'title',
    text: `Welcome to GetDeaddicted Academy! You are about to begin an exciting course: ${course.title}. This is a ${course.level} level course in ${cat.name}, spanning ${course.duration} with ${course.lessons} lessons. Get ready — let's do this!`
  });

  // Slide 2: Introduction
  const intro = course.introduction || course.description;
  narrations.push({
    slideType: 'introduction',
    text: intro
  });

  // Slide 3: Learning Outcomes
  narrations.push({
    slideType: 'outcomes',
    text: `In this course, you will learn the following: ${outcomes.join('. ')}. These outcomes are designed to give you practical, lasting tools for your wellness journey.`
  });

  // Slide 4: Roadmap
  narrations.push({
    slideType: 'roadmap',
    text: `This course contains ${moduleNames.length} modules. Here's your roadmap: ${moduleNames.map((m, i) => `Module ${i + 1}: ${m}`).join('. ')}. Each module builds on the last, so we recommend going in order.`
  });

  // Module slides
  course.modules.forEach((mod, i) => {
    if (isRichModule(mod)) {
      // Module overview
      narrations.push({
        slideType: 'module-overview',
        module: i + 1,
        text: mod.narration || mod.overview
      });

      // Key insights
      if (mod.keyPoints && mod.keyPoints.length > 0) {
        narrations.push({
          slideType: 'key-insights',
          module: i + 1,
          text: `Let's go through the key insights of ${mod.title}. ${mod.keyPoints.map((kp, j) => `Insight ${j + 1}: ${kp}`).join('. ')}.`
        });

        // Quiz
        const quizData = generateQuiz(mod.keyPoints, mod.title);
        narrations.push({
          slideType: 'quiz',
          module: i + 1,
          text: `Time for a quick check! ${quizData.question} Take a moment to think about it and select your answer.`
        });

        // Did You Know
        const funFact = mod.keyPoints.reduce((a, b) => a.length >= b.length ? a : b);
        narrations.push({
          slideType: 'fun-fact',
          module: i + 1,
          text: `Here's an interesting fact from this module: ${funFact}. Pretty cool, right? Keep this in mind as we continue.`
        });
      }

      // Exercise
      if (mod.exercise) {
        narrations.push({
          slideType: 'exercise',
          module: i + 1,
          text: `Now it's your turn to practice! Here is your activity for this module: ${mod.exercise}. Take your time with this. There's no rush. Real growth happens through practice. You've got this!`
        });

        // Reflection
        const reflectionQ = generateReflection(mod.title, mod.keyPoints);
        narrations.push({
          slideType: 'reflection',
          module: i + 1,
          text: `Take a moment to pause and reflect. ${reflectionQ} There's no right or wrong answer. Just think about it honestly. When you're ready, move on to the next slide.`
        });
      }

      // Module complete
      narrations.push({
        slideType: 'module-complete',
        module: i + 1,
        text: `Congratulations! You've completed Module ${i + 1}: ${mod.title}. That's ${i + 1} of ${totalModules} modules done. ${i + 1 < totalModules ? `Up next is ${moduleNames[i + 1]}. Keep going!` : `That was the final module. You're almost at the finish line!`}`
      });

    } else {
      // Simple string module
      narrations.push({
        slideType: 'module-simple',
        module: i + 1,
        text: `We are now on Module ${i + 1}: ${mod}. In this module, we'll take a deep dive into the principles, practices, and actionable strategies related to ${mod}. Let's explore this together.`
      });

      narrations.push({
        slideType: 'module-complete',
        module: i + 1,
        text: `Nice job completing Module ${i + 1}: ${mod}. That's ${i + 1} of ${totalModules} modules finished. ${i + 1 < totalModules ? `Next up: ${moduleNames[i + 1]}.` : `That was the final module!`}`
      });
    }
  });

  // Key Takeaways
  narrations.push({
    slideType: 'takeaways',
    text: `Let's review the key takeaways from this course: ${outcomes.join('. ')}. Remember, wellness is a journey, not a destination. Take these lessons with you every day.`
  });

  // Course Complete
  narrations.push({
    slideType: 'complete',
    text: `Congratulations! You've completed ${course.title}. You covered ${totalModules} modules and invested real effort into your digital wellness. You should be proud. Remember: this is just the beginning. Keep going. You are absolutely worth it. Thank you for learning with GetDeaddicted Academy.`
  });

  return narrations;
}

// ─── ElevenLabs API ───────────────────────────────────────────────────────

async function listVoices() {
  const res = await fetch(`${API_BASE}/voices`, {
    headers: { 'xi-api-key': API_KEY }
  });
  if (!res.ok) throw new Error(`Failed to list voices: ${res.status}`);
  const data = await res.json();
  return data.voices;
}

async function getSubscription() {
  const res = await fetch(`${API_BASE}/user/subscription`, {
    headers: { 'xi-api-key': API_KEY }
  });
  if (!res.ok) throw new Error(`Failed to get subscription: ${res.status}`);
  return await res.json();
}

async function generateAudio(text, outputPath, retries = 0) {
  try {
    const res = await fetch(`${API_BASE}/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text: text,
        model_id: MODEL_ID,
        voice_settings: VOICE_SETTINGS
      })
    });

    if (res.status === 429) {
      // Rate limited — wait and retry
      const wait = Math.pow(2, retries) * 2000;
      console.log(`  ⏳ Rate limited, waiting ${wait / 1000}s...`);
      await sleep(wait);
      if (retries < MAX_RETRIES) return generateAudio(text, outputPath, retries + 1);
      throw new Error('Rate limit exceeded after retries');
    }

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`API error ${res.status}: ${err}`);
    }

    const buffer = await res.buffer();
    fs.writeFileSync(outputPath, buffer);
    return buffer.length;
  } catch (err) {
    if (retries < MAX_RETRIES) {
      console.log(`  ⚠ Retry ${retries + 1}/${MAX_RETRIES}: ${err.message}`);
      await sleep(2000);
      return generateAudio(text, outputPath, retries + 1);
    }
    throw err;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Piper Engine (long-lived worker, one model load per process) ─────────

class PiperEngine {
  constructor() {
    this.proc = null;
    this.queue = [];
    this.buf = '';
    this.ready = false;
    this.readyPromise = null;
  }

  async start() {
    if (this.proc) return;
    this.proc = spawn(PIPER_PYTHON, [PIPER_WORKER, PIPER_MODEL], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    this.proc.stderr.on('data', d => process.stderr.write(`[piper] ${d}`));
    this.proc.on('exit', code => {
      this.proc = null;
      while (this.queue.length) {
        const { reject } = this.queue.shift();
        reject(new Error(`piper-worker exited (${code})`));
      }
    });

    this.proc.stdout.on('data', chunk => {
      this.buf += chunk.toString();
      let nl;
      while ((nl = this.buf.indexOf('\n')) !== -1) {
        const line = this.buf.slice(0, nl).trim();
        this.buf = this.buf.slice(nl + 1);
        if (!line) continue;
        let msg;
        try { msg = JSON.parse(line); } catch { continue; }
        if (msg.ready) {
          this.ready = true;
          if (this._readyResolve) this._readyResolve();
          continue;
        }
        const pending = this.queue.shift();
        if (!pending) continue;
        if (msg.ok) pending.resolve(msg.bytes);
        else pending.reject(new Error(msg.error || 'piper failed'));
      }
    });

    await new Promise(res => { this._readyResolve = res; });
  }

  generate(text, outputPath) {
    return new Promise((resolve, reject) => {
      this.queue.push({ resolve, reject });
      this.proc.stdin.write(JSON.stringify({ text, out: outputPath }) + '\n');
    });
  }

  async stop() {
    if (!this.proc) return;
    try { this.proc.stdin.end('\n'); } catch {}
    await new Promise(res => setTimeout(res, 50));
  }
}

// ─── Manifest helpers ─────────────────────────────────────────────────────

function writeCourseManifest(courseId, narrations, engine) {
  const courseDir = path.join(AUDIO_DIR, `course-${courseId}`);
  fs.mkdirSync(courseDir, { recursive: true });
  const slides = narrations.map((n, i) => ({
    slide: i,
    type: n.slideType,
    module: n.module || null,
    file: `course-${courseId}/slide-${i}.mp3`,
    chars: n.text.length,
    engine
  }));
  fs.writeFileSync(
    path.join(courseDir, 'manifest.json'),
    JSON.stringify({ courseId, engine, slides }, null, 2)
  );
}

function mergeManifests() {
  const manifest = {};
  const dirs = fs.readdirSync(AUDIO_DIR).filter(d => d.startsWith('course-'));
  for (const dir of dirs) {
    const id = parseInt(dir.replace('course-', ''));
    if (Number.isNaN(id)) continue;
    const manifestPath = path.join(AUDIO_DIR, dir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) continue;
    try {
      const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      manifest[id] = m.slides || m;
    } catch (e) {
      console.error(`  ⚠ skip ${dir}: ${e.message}`);
    }
  }
  fs.writeFileSync(path.join(AUDIO_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  const totalSlides = Object.values(manifest).reduce((s, arr) => s + arr.length, 0);
  console.log(`✅ Merged ${Object.keys(manifest).length} courses, ${totalSlides} slides → audio/manifest.json`);
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const courseArg = args.indexOf('--course');
  const singleCourse = courseArg !== -1 ? parseInt(args[courseArg + 1]) : null;
  const voiceArg = args.indexOf('--voice');
  if (voiceArg !== -1) VOICE_ID = args[voiceArg + 1];
  const engineArg = args.indexOf('--engine');
  const engine = engineArg !== -1 ? args[engineArg + 1] : 'piper';
  const mergeOnly = args.includes('--merge-manifests');
  const coursesArg = args.indexOf('--courses');
  const courseList = coursesArg !== -1
    ? args[coursesArg + 1].split(',').map(n => parseInt(n.trim())).filter(n => !Number.isNaN(n))
    : null;

  if (mergeOnly) {
    mergeManifests();
    return;
  }

  console.log('╔══════════════════════════════════════════════════════╗');
  console.log(`║   GetDeaddicted Academy — Audio Generator (${engine.padEnd(9)}) ║`);
  console.log('╚══════════════════════════════════════════════════════╝\n');

  // Load course data
  console.log('📚 Loading course data...');
  const { COURSES, CATEGORIES } = loadCourseData();
  console.log(`   Found ${COURSES.length} courses\n`);

  if (!dryRun && engine === 'elevenlabs') {
    // Check subscription
    console.log('🔑 Checking ElevenLabs subscription...');
    try {
      const sub = await getSubscription();
      console.log(`   Plan: ${sub.tier}`);
      console.log(`   Characters remaining: ${sub.character_limit - sub.character_count} / ${sub.character_limit}`);
      console.log();
    } catch (e) {
      console.error(`   ⚠ Could not check subscription: ${e.message}\n`);
    }

    // List available voices
    console.log('🎙  Available voices:');
    try {
      const voices = await listVoices();
      const recommended = voices.filter(v =>
        ['Rachel', 'Aria', 'Sarah', 'Laura', 'Charlotte', 'Matilda'].includes(v.name)
      );
      if (recommended.length > 0) {
        recommended.forEach(v => {
          const marker = v.voice_id === VOICE_ID ? ' ← SELECTED' : '';
          console.log(`   • ${v.name} (${v.voice_id})${marker}`);
        });
      }
      console.log(`   Total voices available: ${voices.length}`);
      console.log();
    } catch (e) {
      console.log(`   Using default voice: ${VOICE_ID}\n`);
    }
  }

  // Filter courses
  let courses = COURSES;
  if (singleCourse) courses = COURSES.filter(c => c.id === singleCourse);
  else if (courseList) courses = COURSES.filter(c => courseList.includes(c.id));

  if (courses.length === 0) {
    console.error(`No matching courses found.`);
    process.exit(1);
  }

  // Extract all narrations
  let totalSlides = 0;
  let totalChars = 0;
  const courseNarrations = [];

  for (const course of courses) {
    const cat = CATEGORIES.find(c => c.id === course.category);
    const narrations = extractNarrations(course, cat);
    courseNarrations.push({ course, narrations });
    totalSlides += narrations.length;
    totalChars += narrations.reduce((sum, n) => sum + n.text.length, 0);
  }

  console.log('📊 Summary:');
  console.log(`   Courses: ${courses.length}`);
  console.log(`   Total slides: ${totalSlides}`);
  console.log(`   Total characters: ${totalChars.toLocaleString()}`);
  console.log(`   Estimated cost: ~$${(totalChars / 1000 * 0.03).toFixed(2)} (at $0.03/1K chars)\n`);

  if (dryRun) {
    console.log('── DRY RUN MODE ── (no API calls, no credits used)\n');
    for (const { course, narrations } of courseNarrations) {
      console.log(`\n━━ Course ${course.id}: ${course.title} (${narrations.length} slides) ━━`);
      narrations.forEach((n, i) => {
        const preview = n.text.substring(0, 80).replace(/\n/g, ' ');
        console.log(`   Slide ${i}: [${n.slideType}] ${preview}... (${n.text.length} chars)`);
      });
    }
    console.log(`\n✅ Dry run complete. Run without --dry-run to generate MP3s.`);
    return;
  }

  // Create audio directory
  fs.mkdirSync(AUDIO_DIR, { recursive: true });

  // Start engine
  let piper = null;
  if (engine === 'piper') {
    piper = new PiperEngine();
    console.log('🐍 Starting Piper worker...');
    await piper.start();
    console.log('   Worker ready (model loaded)\n');
  }

  // Generate audio for each course
  let completed = 0;
  let failed = 0;
  let skipped = 0;

  for (const { course, narrations } of courseNarrations) {
    const courseDir = path.join(AUDIO_DIR, `course-${course.id}`);
    fs.mkdirSync(courseDir, { recursive: true });

    console.log(`\n🎵 Course ${course.id}: ${course.title} (${narrations.length} slides)`);

    for (let i = 0; i < narrations.length; i++) {
      const n = narrations[i];
      const filename = `slide-${i}.mp3`;
      const outputPath = path.join(courseDir, filename);

      // Skip if already generated
      if (fs.existsSync(outputPath)) {
        const stat = fs.statSync(outputPath);
        if (stat.size > 1000) { // Valid MP3 > 1KB
          skipped++;
          continue;
        }
      }

      try {
        const size = engine === 'piper'
          ? await piper.generate(n.text, outputPath)
          : await generateAudio(n.text, outputPath);
        completed++;
        if (completed % 10 === 0) console.log(`   ✅ ${completed} done (${i + 1}/${narrations.length} this course, last ${(size / 1024).toFixed(1)}KB)`);
      } catch (err) {
        failed++;
        console.log(`   ❌ Slide ${i} [${n.slideType}]: ${err.message}`);
        fs.appendFileSync(
          path.join(AUDIO_DIR, 'errors.log'),
          `${new Date().toISOString()} | Course ${course.id} | Slide ${i} | ${err.message}\n`
        );
      }

      if (engine === 'elevenlabs') await sleep(DELAY_MS);
    }

    // Per-course manifest (parallel-safe)
    writeCourseManifest(course.id, narrations, engine);
    console.log(`   📋 Wrote manifest for course ${course.id}`);
  }

  if (piper) await piper.stop();

  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║            Generation Complete            ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log(`║  ✅ Generated: ${String(completed).padStart(4)} MP3s               ║`);
  console.log(`║  ⏭  Skipped:   ${String(skipped).padStart(4)} (already existed)   ║`);
  console.log(`║  ❌ Failed:    ${String(failed).padStart(4)}                      ║`);
  console.log('╚══════════════════════════════════════════╝');
  console.log(`\n📁 Audio files saved to: ${AUDIO_DIR}`);
  console.log(`📋 Manifest saved to: ${path.join(AUDIO_DIR, 'manifest.json')}`);
}

main().catch(err => {
  console.error('\n💥 Fatal error:', err.message);
  process.exit(1);
});
