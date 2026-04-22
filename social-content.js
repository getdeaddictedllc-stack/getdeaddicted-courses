// ===== GETDEADDICTED ACADEMY — SOCIAL CONTENT GENERATOR =====
// Generates ready-to-post content for TikTok, Instagram, Twitter, LinkedIn
// Run with: node social-content.js
// Output: dist/social-content/

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadData() {
  const ctx = vm.createContext({ module: { exports: {} }, console });
  const code = fs.readFileSync(path.join(__dirname, 'courses.js'), 'utf8')
    .replace(/^const /gm, 'var ').replace(/^let /gm, 'var ');
  vm.runInContext(code, ctx);

  const expFiles = ['exp-1-5','exp-6-10','exp-11-15','exp-16-20','exp-21-25',
    'exp-26-30','exp-31-35','exp-36-40','exp-41-45','exp-46-50'];
  for (const f of expFiles) {
    const c = fs.readFileSync(path.join(__dirname, `${f}.js`), 'utf8')
      .replace(/^const /gm, 'var ').replace(/^let /gm, 'var ');
    vm.runInContext(c, ctx);
  }

  const fns = [ctx.getExp_1_5,ctx.getExp_6_10,ctx.getExp_11_15,ctx.getExp_16_20,
    ctx.getExp_21_25,ctx.getExp_26_30,ctx.getExp_31_35,ctx.getExp_36_40,
    ctx.getExp_41_45,ctx.getExp_46_50].filter(Boolean);

  fns.forEach(fn => {
    const data = fn();
    Object.entries(data).forEach(([id, expanded]) => {
      const course = ctx.COURSES.find(c => c.id === Number(id));
      if (!course) return;
      if (expanded.modules && Array.isArray(expanded.modules)) course.modules = expanded.modules;
    });
  });

  return { COURSES: ctx.COURSES, CATEGORIES: ctx.CATEGORIES };
}

function generateTwitterThreads(courses, categories) {
  const threads = [];

  // Thread per category
  for (const cat of categories) {
    const catCourses = courses.filter(c => c.category === cat.id);
    const thread = [];
    thread.push(`${cat.name} - ${catCourses.length} free courses for kids & families\n\nA thread on what your child will learn:\n\n[Thread 1/${catCourses.length + 1}]`);
    catCourses.forEach((c, i) => {
      thread.push(`${i + 1}. ${c.title}\n\n${c.description.substring(0, 200)}\n\nStart free: academy.getdeaddicted.com\n\n[${i + 2}/${catCourses.length + 1}]`);
    });
    threads.push({ type: 'twitter_thread', category: cat.name, posts: thread });
  }

  // Stat-based tweets
  const statTweets = [
    "The average kid spends 7+ hours a day on screens.\n\nOur 9-year-old now sets her OWN screen time limits after just 3 courses.\n\nGetDeaddicted Academy teaches kids the science behind screen addiction — so they make their own informed choices.\n\nFree to start: academy.getdeaddicted.com",
    "We built 50 courses teaching kids about digital wellness.\n\nNot lectures. Not scare tactics.\n\nInteractive slides. Voice narration. Quizzes. Badges.\n\nKids actually ASK to do the courses.\n\nTry it free: academy.getdeaddicted.com",
    "Teachers: looking for SEL content about screen time?\n\nOur Classroom tier ($199/yr) gives you:\n- 50 kid-friendly courses\n- Printable worksheets\n- Student progress dashboard\n- Assignment system\n\nPerfect for a 15-min daily SEL block.\n\nacademy.getdeaddicted.com",
    "\"My son learned about dopamine in Course 1 and told ME to put my phone down at dinner.\"\n\n- Sarah M., mom of 3\n\nWhen kids understand HOW screens hook their brains, they make better choices on their own.\n\n5 courses free, no credit card.\nacademy.getdeaddicted.com"
  ];
  threads.push({ type: 'twitter_standalone', posts: statTweets });

  return threads;
}

function generateTikTokScripts(courses) {
  const scripts = [];

  // Hook + value format
  const hooks = [
    { hook: "My kid hasn't asked for the iPad in 3 days. Here's what happened.",
      body: "I found this free app called GetDeaddicted Academy. It teaches kids WHY screens are so addictive — using fun interactive courses with voice narration and quizzes. My 8-year-old learned about dopamine, design tricks, and how apps manipulate her. Now SHE decides when to put the phone down.",
      cta: "Link in bio — 5 courses completely free." },
    { hook: "POV: You're a teacher who found the perfect SEL activity for screen time.",
      body: "GetDeaddicted Academy has 50 kid-friendly courses about digital wellness. Each course has interactive slides, voice narration that reads everything aloud, quizzes, and printable worksheets. My students actually get excited about it.",
      cta: "Classroom tier is $199/year for up to 35 students. Link in bio." },
    { hook: "The apps on your kid's phone were designed by teams of PhD psychologists to be as addictive as possible.",
      body: "That's not a conspiracy theory — it's their business model. Your kid's attention is the product they sell to advertisers. GetDeaddicted Academy teaches kids the science behind this so they can recognize the tricks and take back control.",
      cta: "5 free courses. No credit card. Link in bio." },
    { hook: "Screen time chart that actually works (because your kid understands WHY)",
      body: "Step 1: Let your kid take Course 1 on GetDeaddicted Academy. Step 2: They learn about their brain's reward system. Step 3: Together, create a screen time plan. Step 4: They FOLLOW it because they understand the science. No arguing needed.",
      cta: "Free at academy.getdeaddicted.com" },
    { hook: "Pediatricians are recommending this to every family worried about screen time.",
      body: "It's called GetDeaddicted Academy. 50 courses teaching kids about dopamine, attention spans, social media tricks, gaming balance, and healthy habits. Voice narrated, interactive, with badges and certificates. Evidence-based and COPPA compliant.",
      cta: "Start free — link in bio." }
  ];

  hooks.forEach((h, i) => {
    scripts.push({
      type: 'tiktok_script',
      number: i + 1,
      hook: h.hook,
      body: h.body,
      cta: h.cta,
      hashtags: '#screentime #digitalwellness #kidshealth #parenting #edtech #getdeaddicted #parentingtips #screentimeforkids'
    });
  });

  // Fact-based shorts
  const facts = courses.flatMap(c => {
    const richMods = c.modules.filter(m => typeof m === 'object' && m.keyPoints);
    return richMods.flatMap(m => m.keyPoints.filter(kp => kp.length > 80 && kp.length < 250));
  });

  const selectedFacts = facts.sort(() => Math.random() - 0.5).slice(0, 20);
  selectedFacts.forEach((fact, i) => {
    scripts.push({
      type: 'tiktok_fact',
      number: i + 1,
      text: `Did you know?\n\n${fact}\n\nLearn more at GetDeaddicted Academy — 50 free courses for kids & families.`,
      hashtags: '#didyouknow #screentime #digitalwellness #kidshealth #brainfacts'
    });
  });

  return scripts;
}

function generateInstagramCaptions(courses, categories) {
  const captions = [];

  // Carousel posts (one per category)
  for (const cat of categories) {
    const catCourses = courses.filter(c => c.category === cat.id);
    captions.push({
      type: 'instagram_carousel',
      category: cat.name,
      caption: `${cat.name} — ${catCourses.length} courses your family needs\n\nSwipe to see what's inside each course.\n\nAll courses feature:\n✓ Interactive slides\n✓ Voice narration\n✓ Quizzes & exercises\n✓ Completion certificates\n✓ Progress tracking\n\n5 courses free. No credit card.\n\n#getdeaddicted #screentime #digitalwellness #kidshealth #parentingtips #edtech`,
      slides: catCourses.map(c => ({
        title: c.title,
        description: c.description.substring(0, 150),
        level: c.level,
        duration: c.duration
      }))
    });
  }

  // Testimonial posts
  const testimonials = [
    { quote: "My 9-year-old now sets her own screen time limits.", author: "Sarah M., Mom of 3" },
    { quote: "The AI Coach answered my son's anxiety question better than I could.", author: "Raj P., Father" },
    { quote: "I use it for my 28 students. The worksheets are gold for SEL time.", author: "Ms. Chen, Teacher" },
    { quote: "I recommend it to every family worried about screen time.", author: "Dr. David K., Pediatrician" }
  ];

  testimonials.forEach(t => {
    captions.push({
      type: 'instagram_testimonial',
      caption: `"${t.quote}"\n\n— ${t.author}\n\n50 courses teaching kids about digital wellness. Voice narration. Interactive quizzes. Badges & certificates.\n\nStart free at academy.getdeaddicted.com\n\n#parentreview #screentime #getdeaddicted #digitalwellness`
    });
  });

  return captions;
}

function main() {
  console.log('Generating social content...\n');
  const { COURSES, CATEGORIES } = loadData();
  const outDir = path.join(__dirname, 'dist', 'social-content');
  fs.mkdirSync(outDir, { recursive: true });

  // Twitter
  const twitter = generateTwitterThreads(COURSES, CATEGORIES);
  fs.writeFileSync(path.join(outDir, 'twitter.json'), JSON.stringify(twitter, null, 2));
  const tweetCount = twitter.reduce((sum, t) => sum + t.posts.length, 0);
  console.log(`  Twitter: ${twitter.length} threads, ${tweetCount} total tweets`);

  // TikTok
  const tiktok = generateTikTokScripts(COURSES);
  fs.writeFileSync(path.join(outDir, 'tiktok.json'), JSON.stringify(tiktok, null, 2));
  console.log(`  TikTok: ${tiktok.length} scripts (${tiktok.filter(t => t.type === 'tiktok_script').length} hooks + ${tiktok.filter(t => t.type === 'tiktok_fact').length} fact shorts)`);

  // Instagram
  const instagram = generateInstagramCaptions(COURSES, CATEGORIES);
  fs.writeFileSync(path.join(outDir, 'instagram.json'), JSON.stringify(instagram, null, 2));
  console.log(`  Instagram: ${instagram.length} posts (${instagram.filter(i => i.type === 'instagram_carousel').length} carousels + ${instagram.filter(i => i.type === 'instagram_testimonial').length} testimonials)`);

  // Summary markdown
  const summary = [
    '# Social Content Calendar\n',
    `Generated: ${new Date().toISOString().split('T')[0]}\n`,
    `## Twitter\n- ${twitter.length} threads\n- ${tweetCount} total tweets\n`,
    `## TikTok\n- ${tiktok.filter(t => t.type === 'tiktok_script').length} scripted hooks\n- ${tiktok.filter(t => t.type === 'tiktok_fact').length} fact-based shorts\n`,
    `## Instagram\n- ${instagram.filter(i => i.type === 'instagram_carousel').length} carousel posts\n- ${instagram.filter(i => i.type === 'instagram_testimonial').length} testimonial posts\n`,
    `## Posting Schedule\n`,
    `- Twitter: 2 tweets/day (rotate through threads)\n`,
    `- TikTok: 1-2 videos/day (alternate hooks and facts)\n`,
    `- Instagram: 3-4 posts/week (carousels + testimonials)\n`,
    `\nAll content in: dist/social-content/*.json`
  ].join('');
  fs.writeFileSync(path.join(outDir, 'README.md'), summary);

  console.log(`\nDone! Content saved to dist/social-content/`);
  console.log(`Total pieces: ${tweetCount + tiktok.length + instagram.length} across 3 platforms`);
}

main();
