// ===== GETDEADDICTED ACADEMY — SEO PAGE GENERATOR =====
// Generates individual HTML pages for each course and category
// Run with: node seo-pages.js
// Output: dist/courses/<slug>.html and dist/categories/<slug>.html

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadData() {
  const ctx = vm.createContext({ module: { exports: {} }, console });
  const coursesCode = fs.readFileSync(path.join(__dirname, 'courses.js'), 'utf8')
    .replace(/^const /gm, 'var ').replace(/^let /gm, 'var ');
  vm.runInContext(coursesCode, ctx);

  const expFiles = ['exp-1-5','exp-6-10','exp-11-15','exp-16-20','exp-21-25',
    'exp-26-30','exp-31-35','exp-36-40','exp-41-45','exp-46-50'];
  for (const f of expFiles) {
    const code = fs.readFileSync(path.join(__dirname, `${f}.js`), 'utf8')
      .replace(/^const /gm, 'var ').replace(/^let /gm, 'var ');
    vm.runInContext(code, ctx);
  }

  const fns = [ctx.getExp_1_5,ctx.getExp_6_10,ctx.getExp_11_15,ctx.getExp_16_20,
    ctx.getExp_21_25,ctx.getExp_26_30,ctx.getExp_31_35,ctx.getExp_36_40,
    ctx.getExp_41_45,ctx.getExp_46_50].filter(Boolean);

  fns.forEach(fn => {
    const data = fn();
    Object.entries(data).forEach(([id, expanded]) => {
      const course = ctx.COURSES.find(c => c.id === Number(id));
      if (!course) return;
      if (expanded.introduction) course.introduction = expanded.introduction;
      if (expanded.detailedOutcomes) course.detailedOutcomes = expanded.detailedOutcomes;
      if (expanded.modules && Array.isArray(expanded.modules)) course.modules = expanded.modules;
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

const BASE_URL = 'https://academy.getdeaddicted.com';

function generateCoursePage(course, cat) {
  const slug = slugify(course.title);
  const outcomes = course.detailedOutcomes || course.outcomes;
  const modules = course.modules;
  const intro = course.introduction || course.description;

  const moduleList = modules.map((m, i) => {
    const isRich = typeof m === 'object' && m.title;
    const title = isRich ? m.title : m;
    const overview = isRich && m.overview ? m.overview : '';
    const keyPoints = isRich && m.keyPoints ? m.keyPoints : [];
    return { num: i + 1, title, overview, keyPoints, duration: isRich ? m.duration : '' };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": { "@type": "Organization", "name": "GetDeaddicted Academy", "url": BASE_URL },
    "educationalLevel": course.level,
    "audience": { "@type": "EducationalAudience", "educationalRole": "student", "suggestedMinAge": 5 },
    "numberOfCredits": modules.length,
    "timeRequired": course.duration,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free trial available" },
    "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "courseWorkload": course.duration }
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(course.title)} - Free Course | GetDeaddicted Academy</title>
<meta name="description" content="${esc(course.description.substring(0, 155))}">
<meta name="keywords" content="${esc(course.title)}, digital wellness, screen time, kids, ${esc(cat.name)}">
<link rel="canonical" href="${BASE_URL}/courses/${slug}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(course.title)} | GetDeaddicted Academy">
<meta property="og:description" content="${esc(course.description.substring(0, 155))}">
<meta property="og:url" content="${BASE_URL}/courses/${slug}">
<meta property="og:image" content="${BASE_URL}/og/course-${course.id}.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(course.title)}">
<meta name="twitter:description" content="${esc(course.description.substring(0, 155))}">
<meta name="twitter:image" content="${BASE_URL}/og/course-${course.id}.png">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#0a0a0f;color:#e0e0e0;line-height:1.7;padding:0}
a{color:#6ee7b7;text-decoration:none}a:hover{color:#a7f3d0}
.container{max-width:800px;margin:0 auto;padding:2rem 1rem}
.breadcrumb{font-size:.78rem;color:#64748b;margin-bottom:1.5rem}
.breadcrumb a{color:#64748b}.breadcrumb a:hover{color:#6ee7b7}
h1{font-size:1.8rem;margin-bottom:.5rem;background:linear-gradient(135deg,#6ee7b7,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.meta{display:flex;gap:.6rem;flex-wrap:wrap;margin-bottom:1.5rem}
.tag{background:rgba(110,231,183,.08);border:1px solid rgba(110,231,183,.15);color:#6ee7b7;padding:.2rem .6rem;border-radius:20px;font-size:.75rem}
.intro{color:#94a3b8;font-size:1rem;margin-bottom:2rem;border-left:3px solid #6ee7b7;padding-left:1rem}
h2{font-size:1.2rem;color:#e0e0e0;margin:1.8rem 0 .8rem}
.outcomes li{color:#94a3b8;margin-bottom:.4rem;font-size:.9rem}
.module{background:#12121a;border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:1.2rem;margin-bottom:.8rem}
.module h3{font-size:.95rem;color:#e0e0e0;margin-bottom:.4rem}
.module .overview{color:#94a3b8;font-size:.85rem}
.module .kp{color:#64748b;font-size:.8rem;margin-top:.5rem}
.module .kp li{margin-bottom:.2rem}
.cta-box{background:linear-gradient(135deg,rgba(110,231,183,.08),rgba(59,130,246,.08));border:1px solid rgba(110,231,183,.15);border-radius:14px;padding:2rem;text-align:center;margin:2rem 0}
.cta-box h2{color:#6ee7b7;margin-bottom:.5rem}
.cta-box p{color:#94a3b8;margin-bottom:1rem;font-size:.9rem}
.btn{display:inline-block;background:linear-gradient(135deg,#6ee7b7,#3b82f6);color:#0a0a0f;padding:.7rem 1.5rem;border-radius:8px;font-weight:700;text-decoration:none;font-size:.95rem}
.btn:hover{opacity:.9;color:#0a0a0f}
.footer{text-align:center;color:#475569;font-size:.75rem;margin-top:3rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.06)}
</style>
</head>
<body>
<div class="container">
<div class="breadcrumb">
  <a href="${BASE_URL}">Home</a> / <a href="${BASE_URL}/categories/${slugify(cat.name)}">${esc(cat.name)}</a> / ${esc(course.title)}
</div>

<h1>${esc(course.title)}</h1>
<div class="meta">
  <span class="tag">${esc(cat.name)}</span>
  <span class="tag">${esc(course.level)}</span>
  <span class="tag">${esc(course.duration)}</span>
  <span class="tag">${course.lessons} lessons</span>
  <span class="tag">${modules.length} modules</span>
</div>

<div class="intro">${esc(intro)}</div>

<p style="color:#94a3b8;font-size:.88rem;margin-bottom:1rem"><strong style="color:#e0e0e0">Who is this for:</strong> ${esc(course.audience)}</p>

<h2>What You'll Learn</h2>
<ul class="outcomes">${outcomes.map(o => `<li>${esc(o)}</li>`).join('')}</ul>

<h2>Course Modules (${modules.length})</h2>
${moduleList.map(m => `
<div class="module">
  <h3>Module ${m.num}: ${esc(m.title)}${m.duration ? ` <span style="color:#64748b;font-size:.75rem">(${m.duration})</span>` : ''}</h3>
  ${m.overview ? `<p class="overview">${esc(m.overview)}</p>` : ''}
  ${m.keyPoints.length > 0 ? `<ul class="kp">${m.keyPoints.map(kp => `<li>${esc(kp)}</li>`).join('')}</ul>` : ''}
</div>
`).join('')}

<div class="cta-box">
  <h2>Start This Course Free</h2>
  <p>Interactive slides, voice narration, quizzes, and certificates. No credit card needed.</p>
  <a href="${BASE_URL}/#courses" class="btn">Start Learning Now</a>
</div>

<div class="footer">
  <p>&copy; 2026 GetDeaddicted Academy &middot; <a href="${BASE_URL}">Home</a> &middot; <a href="${BASE_URL}/#pricing">Pricing</a></p>
</div>
</div>
</body>
</html>`;
}

function generateCategoryPage(cat, courses) {
  const slug = slugify(cat.name);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": cat.name + " - Digital Wellness Courses",
    "description": cat.desc,
    "numberOfItems": courses.length,
    "itemListElement": courses.map((c, i) => ({
      "@type": "ListItem", "position": i + 1,
      "item": { "@type": "Course", "name": c.title, "url": `${BASE_URL}/courses/${slugify(c.title)}` }
    }))
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(cat.name)} Courses | GetDeaddicted Academy</title>
<meta name="description" content="${esc(cat.desc)} ${courses.length} free courses for kids and families.">
<link rel="canonical" href="${BASE_URL}/categories/${slug}">
<meta property="og:title" content="${esc(cat.name)} | GetDeaddicted Academy">
<meta property="og:description" content="${esc(cat.desc)}">
<meta property="og:url" content="${BASE_URL}/categories/${slug}">
<meta property="og:image" content="${BASE_URL}/og/category-${slug}.png">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#0a0a0f;color:#e0e0e0;line-height:1.7}
a{color:#6ee7b7;text-decoration:none}a:hover{color:#a7f3d0}
.container{max-width:800px;margin:0 auto;padding:2rem 1rem}
.breadcrumb{font-size:.78rem;color:#64748b;margin-bottom:1.5rem}
h1{font-size:1.8rem;margin-bottom:.5rem;background:linear-gradient(135deg,#6ee7b7,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.desc{color:#94a3b8;font-size:1rem;margin-bottom:2rem}
.course-list{display:flex;flex-direction:column;gap:1rem}
.course-item{background:#12121a;border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:1.2rem;transition:border-color .2s}
.course-item:hover{border-color:rgba(110,231,183,.3)}
.course-item h3{font-size:1rem;margin-bottom:.3rem}
.course-item h3 a{color:#e0e0e0}
.course-item p{color:#94a3b8;font-size:.85rem}
.course-item .tags{display:flex;gap:.4rem;margin-top:.5rem}
.tag{background:rgba(110,231,183,.08);color:#6ee7b7;padding:.15rem .5rem;border-radius:20px;font-size:.7rem}
.cta-box{background:linear-gradient(135deg,rgba(110,231,183,.08),rgba(59,130,246,.08));border:1px solid rgba(110,231,183,.15);border-radius:14px;padding:2rem;text-align:center;margin:2rem 0}
.btn{display:inline-block;background:linear-gradient(135deg,#6ee7b7,#3b82f6);color:#0a0a0f;padding:.7rem 1.5rem;border-radius:8px;font-weight:700;font-size:.95rem}
.footer{text-align:center;color:#475569;font-size:.75rem;margin-top:3rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.06)}
</style>
</head>
<body>
<div class="container">
<div class="breadcrumb"><a href="${BASE_URL}">Home</a> / ${esc(cat.name)}</div>
<h1>${esc(cat.name)}</h1>
<p class="desc">${esc(cat.desc)}</p>
<p style="color:#6ee7b7;font-size:.9rem;margin-bottom:1.5rem">${courses.length} courses available</p>

<div class="course-list">
${courses.map((c, i) => `
<div class="course-item">
  <h3><a href="${BASE_URL}/courses/${slugify(c.title)}">${i + 1}. ${esc(c.title)}</a></h3>
  <p>${esc(c.description.substring(0, 200))}...</p>
  <div class="tags">
    <span class="tag">${esc(c.level)}</span>
    <span class="tag">${esc(c.duration)}</span>
    <span class="tag">${c.lessons} lessons</span>
  </div>
</div>
`).join('')}
</div>

<div class="cta-box">
  <h2 style="color:#6ee7b7;margin-bottom:.5rem">Start Learning Free</h2>
  <p style="color:#94a3b8;margin-bottom:1rem;font-size:.9rem">5 courses free, no credit card needed.</p>
  <a href="${BASE_URL}/#courses" class="btn">Browse All Courses</a>
</div>

<div class="footer">
  <p>&copy; 2026 GetDeaddicted Academy &middot; <a href="${BASE_URL}">Home</a></p>
</div>
</div>
</body>
</html>`;
}

function generateSitemap(courses, categories) {
  const urls = [
    { loc: BASE_URL + '/', priority: '1.0', freq: 'weekly' },
    { loc: BASE_URL + '/#pricing', priority: '0.8', freq: 'monthly' },
    { loc: BASE_URL + '/#about', priority: '0.5', freq: 'monthly' },
  ];

  categories.forEach(cat => {
    urls.push({ loc: `${BASE_URL}/categories/${slugify(cat.name)}`, priority: '0.8', freq: 'weekly' });
  });

  courses.forEach(course => {
    urls.push({ loc: `${BASE_URL}/courses/${slugify(course.title)}`, priority: '0.7', freq: 'monthly' });
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><changefreq>${u.freq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`;
}

// --- Main ---
function main() {
  console.log('Generating SEO pages...\n');
  const { COURSES, CATEGORIES } = loadData();
  const dist = path.join(__dirname, 'dist');

  // Course pages
  const coursesDir = path.join(dist, 'courses');
  fs.mkdirSync(coursesDir, { recursive: true });
  let courseCount = 0;
  for (const course of COURSES) {
    const cat = CATEGORIES.find(c => c.id === course.category);
    const slug = slugify(course.title);
    const html = generateCoursePage(course, cat);
    fs.writeFileSync(path.join(coursesDir, `${slug}.html`), html);
    courseCount++;
  }
  console.log(`  Generated ${courseCount} course pages`);

  // Category pages
  const catsDir = path.join(dist, 'categories');
  fs.mkdirSync(catsDir, { recursive: true });
  let catCount = 0;
  for (const cat of CATEGORIES) {
    const courses = COURSES.filter(c => c.category === cat.id);
    const slug = slugify(cat.name);
    const html = generateCategoryPage(cat, courses);
    fs.writeFileSync(path.join(catsDir, `${slug}.html`), html);
    catCount++;
  }
  console.log(`  Generated ${catCount} category pages`);

  // Sitemap
  const sitemap = generateSitemap(COURSES, CATEGORIES);
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
  console.log(`  Generated sitemap.xml (${courseCount + catCount + 3} URLs)`);

  console.log(`\nDone! ${courseCount + catCount} SEO pages in dist/`);
}

main();
