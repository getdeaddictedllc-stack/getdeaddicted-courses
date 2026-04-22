#!/usr/bin/env node
// ===== GETDEADDICTED ACADEMY — BLOG / SEO CONTENT GENERATOR =====
// Generates long-form blog posts from course content for organic SEO
// Run with: node blog-generator.js
// Output: dist/blog/*.html

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const BASE_URL = 'https://academy.getdeaddicted.com';

function loadData() {
  const ctx = vm.createContext({ module: { exports: {} }, console: { log: () => {} } });
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
    Object.entries(data).forEach(([id, exp]) => {
      const course = ctx.COURSES.find(c => c.id === Number(id));
      if (!course) return;
      if (exp.introduction) course.introduction = exp.introduction;
      if (exp.detailedOutcomes) course.detailedOutcomes = exp.detailedOutcomes;
      if (exp.modules && Array.isArray(exp.modules)) course.modules = exp.modules;
    });
  });

  return { COURSES: ctx.COURSES, CATEGORIES: ctx.CATEGORIES };
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateBlogPost(course, cat) {
  const slug = slugify(course.title);
  const intro = course.introduction || course.description;
  const outcomes = course.detailedOutcomes || course.outcomes;
  const modules = course.modules.filter(m => typeof m === 'object' && m.title);
  const wordCount = _estimateWords(course);
  const readTime = Math.max(3, Math.ceil(wordCount / 200));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(course.title)}: A Complete Guide | GetDeaddicted Academy Blog</title>
<meta name="description" content="${esc(course.description.substring(0, 155))}">
<link rel="canonical" href="${BASE_URL}/blog/${slug}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(course.title)}: A Complete Guide">
<meta property="og:description" content="${esc(course.description.substring(0, 155))}">
<meta property="og:url" content="${BASE_URL}/blog/${slug}">
<meta property="og:image" content="${BASE_URL}/og/course-${course.id}.png">
<meta property="article:published_time" content="2026-04-01T00:00:00Z">
<meta property="article:section" content="${esc(cat.name)}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": course.title + ": A Complete Guide",
  "description": course.description,
  "author": { "@type": "Organization", "name": "GetDeaddicted Academy" },
  "publisher": { "@type": "Organization", "name": "GetDeaddicted Academy", "url": BASE_URL },
  "datePublished": "2026-04-01",
  "mainEntityOfPage": `${BASE_URL}/blog/${slug}`,
  "image": `${BASE_URL}/og/course-${course.id}.png`,
  "wordCount": wordCount,
  "articleSection": cat.name
})}</script>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Georgia,'Times New Roman',serif;background:#0a0a0f;color:#d4d4d8;line-height:1.9}
a{color:#6ee7b7;text-decoration:none}a:hover{color:#a7f3d0}
.header{background:linear-gradient(180deg,rgba(110,231,183,.06),transparent);padding:3rem 1rem 2rem;text-align:center;border-bottom:1px solid rgba(255,255,255,.05)}
.header .brand{font-family:system-ui,sans-serif;font-size:.8rem;color:#6ee7b7;font-weight:600;text-transform:uppercase;letter-spacing:2px;margin-bottom:1rem;display:block}
.header h1{font-size:2.2rem;color:#fff;max-width:700px;margin:0 auto .8rem;line-height:1.3}
.header .meta{font-family:system-ui,sans-serif;color:#64748b;font-size:.85rem}
.header .meta span{margin:0 .5rem}
article{max-width:700px;margin:0 auto;padding:2.5rem 1rem}
article h2{font-family:system-ui,sans-serif;font-size:1.4rem;color:#e0e0e0;margin:2.5rem 0 1rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.05)}
article h3{font-family:system-ui,sans-serif;font-size:1.1rem;color:#6ee7b7;margin:1.5rem 0 .5rem}
article p{margin-bottom:1.2rem;font-size:1.05rem}
article ul,article ol{margin:0 0 1.2rem 1.5rem}
article li{margin-bottom:.5rem;font-size:1rem}
.key-insight{background:rgba(110,231,183,.04);border-left:3px solid #6ee7b7;padding:.8rem 1rem;margin:1rem 0;border-radius:0 8px 8px 0}
.key-insight p{margin:0;font-size:.95rem}
.exercise-box{background:rgba(59,130,246,.04);border:1px solid rgba(59,130,246,.15);border-radius:10px;padding:1.2rem;margin:1.5rem 0}
.exercise-box h4{font-family:system-ui,sans-serif;color:#60a5fa;font-size:.9rem;margin-bottom:.5rem}
.exercise-box p{font-size:.95rem;margin:0}
.cta{background:linear-gradient(135deg,rgba(110,231,183,.08),rgba(59,130,246,.08));border:1px solid rgba(110,231,183,.15);border-radius:14px;padding:2rem;text-align:center;margin:2.5rem 0}
.cta h3{color:#6ee7b7;margin-bottom:.5rem}
.cta p{color:#94a3b8;font-size:.9rem;margin-bottom:1rem}
.btn{display:inline-block;font-family:system-ui,sans-serif;background:linear-gradient(135deg,#6ee7b7,#3b82f6);color:#0a0a0f;padding:.7rem 1.5rem;border-radius:8px;font-weight:700;font-size:.95rem}
.toc{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:1.2rem 1.5rem;margin-bottom:2rem}
.toc h3{font-family:system-ui,sans-serif;color:#e0e0e0;font-size:.9rem;margin-bottom:.5rem}
.toc ol{font-family:system-ui,sans-serif;font-size:.88rem;color:#94a3b8}
.toc a{color:#94a3b8}.toc a:hover{color:#6ee7b7}
.footer{text-align:center;padding:2rem 1rem;color:#475569;font-size:.75rem;font-family:system-ui,sans-serif;border-top:1px solid rgba(255,255,255,.05);margin-top:3rem}
@media(max-width:600px){.header h1{font-size:1.6rem}article{padding:1.5rem 1rem}}
</style>
</head>
<body>
<div class="header">
  <a href="${BASE_URL}/blog" class="brand">GetDeaddicted Academy Blog</a>
  <h1>${esc(course.title)}: A Complete Guide</h1>
  <div class="meta">
    <span>${esc(cat.name)}</span> &middot;
    <span>${readTime} min read</span> &middot;
    <span>${esc(course.level)}</span> &middot;
    <span>${modules.length} sections</span>
  </div>
</div>

<article>
<p style="font-size:1.15rem;color:#e0e0e0;">${esc(intro)}</p>

<div class="toc">
  <h3>In This Guide</h3>
  <ol>
    ${modules.map((m, i) => `<li><a href="#section-${i + 1}">${esc(m.title)}</a></li>`).join('\n    ')}
    <li><a href="#takeaways">Key Takeaways</a></li>
    <li><a href="#next-steps">Next Steps</a></li>
  </ol>
</div>

<h2>What You'll Learn</h2>
<ul>
${outcomes.map(o => `  <li>${esc(o)}</li>`).join('\n')}
</ul>

${modules.map((m, i) => `
<h2 id="section-${i + 1}">${i + 1}. ${esc(m.title)}</h2>
<p>${esc(m.overview || '')}</p>

${(m.keyPoints || []).map(kp => `
<div class="key-insight"><p>${esc(kp)}</p></div>
`).join('')}

${m.exercise ? `
<div class="exercise-box">
  <h4>Try This Activity</h4>
  <p>${esc(m.exercise)}</p>
</div>
` : ''}
`).join('')}

<h2 id="takeaways">Key Takeaways</h2>
<ol>
${outcomes.slice(0, 5).map(o => `  <li>${esc(o)}</li>`).join('\n')}
</ol>

<div class="cta">
  <h3>Take the Full Interactive Course</h3>
  <p>This guide covers the highlights. The full course includes voice narration, interactive quizzes, reflection exercises, and a completion certificate.</p>
  <a href="${BASE_URL}/#courses" class="btn">Start Free \u2014 No Credit Card</a>
</div>

<h2 id="next-steps">Next Steps</h2>
<p>Ready to continue your digital wellness journey? Here are some related courses you might enjoy:</p>
<ul>
  <li><a href="${BASE_URL}/categories/${slugify(cat.name)}">More courses in ${esc(cat.name)}</a></li>
  <li><a href="${BASE_URL}/#courses">Browse all 50 courses</a></li>
  <li><a href="${BASE_URL}/#pricing">See pricing plans</a></li>
</ul>
</article>

<div class="footer">
  <p>&copy; 2026 GetDeaddicted Academy &middot; <a href="${BASE_URL}">Home</a> &middot; <a href="${BASE_URL}/blog">Blog</a></p>
</div>
</body>
</html>`;
}

function _estimateWords(course) {
  let text = course.description + ' ' + (course.introduction || '');
  course.modules.forEach(m => {
    if (typeof m === 'object') {
      text += ' ' + (m.overview || '') + ' ' + (m.narration || '');
      (m.keyPoints || []).forEach(kp => text += ' ' + kp);
      text += ' ' + (m.exercise || '');
    }
  });
  return text.split(/\s+/).length;
}

function generateBlogIndex(courses, categories) {
  const posts = courses.map(c => {
    const cat = categories.find(ct => ct.id === c.category);
    return { course: c, cat, slug: slugify(c.title), words: _estimateWords(c) };
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Digital Wellness Blog | GetDeaddicted Academy</title>
<meta name="description" content="Expert guides on screen time, digital wellness, and healthy habits for kids and families. 50 in-depth articles.">
<link rel="canonical" href="${BASE_URL}/blog">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#0a0a0f;color:#e0e0e0;line-height:1.7}
a{color:#6ee7b7;text-decoration:none}
.container{max-width:800px;margin:0 auto;padding:2rem 1rem}
h1{font-size:1.8rem;margin-bottom:.5rem;background:linear-gradient(135deg,#6ee7b7,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sub{color:#94a3b8;margin-bottom:2rem}
.post{border-bottom:1px solid rgba(255,255,255,.05);padding:1.2rem 0}
.post h3{font-size:1rem;margin-bottom:.3rem}.post h3 a{color:#e0e0e0}
.post p{color:#94a3b8;font-size:.85rem}
.post .meta{color:#64748b;font-size:.75rem;margin-top:.3rem}
.footer{text-align:center;color:#475569;font-size:.75rem;margin-top:2rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.05)}
</style>
</head>
<body>
<div class="container">
<h1>Digital Wellness Blog</h1>
<p class="sub">Expert guides on screen time, digital habits, and wellness for kids and families.</p>
${posts.map(p => `
<div class="post">
  <h3><a href="${BASE_URL}/blog/${p.slug}">${esc(p.course.title)}: A Complete Guide</a></h3>
  <p>${esc(p.course.description.substring(0, 180))}...</p>
  <div class="meta">${esc(p.cat.name)} &middot; ${Math.ceil(p.words / 200)} min read &middot; ${p.course.level}</div>
</div>
`).join('')}
</div>
<div class="footer"><p>&copy; 2026 GetDeaddicted Academy &middot; <a href="${BASE_URL}">Home</a></p></div>
</body>
</html>`;
}

function main() {
  console.log('Generating blog posts...\n');
  const { COURSES, CATEGORIES } = loadData();
  const blogDir = path.join(__dirname, 'dist', 'blog');
  fs.mkdirSync(blogDir, { recursive: true });

  let totalWords = 0;
  for (const course of COURSES) {
    const cat = CATEGORIES.find(c => c.id === course.category);
    const slug = slugify(course.title);
    const html = generateBlogPost(course, cat);
    fs.writeFileSync(path.join(blogDir, `${slug}.html`), html);
    totalWords += _estimateWords(course);
  }

  // Blog index
  const index = generateBlogIndex(COURSES, CATEGORIES);
  fs.writeFileSync(path.join(blogDir, 'index.html'), index);

  console.log(`  Generated ${COURSES.length} blog posts + index`);
  console.log(`  Total words: ~${totalWords.toLocaleString()}`);
  console.log(`  Average: ~${Math.round(totalWords / COURSES.length)} words/post`);
  console.log(`\nDone! Blog in dist/blog/`);
}

main();
