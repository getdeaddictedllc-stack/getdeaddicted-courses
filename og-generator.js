// ===== GETDEADDICTED ACADEMY — OG IMAGE GENERATOR =====
// Generates 1200x630 OG images for each course and category using Canvas
// Run with: node og-generator.js
// Output: dist/og/course-{id}.png and dist/og/category-{slug}.png

const { createCanvas } = (() => {
  try { return require('canvas'); }
  catch { return { createCanvas: null }; }
})();

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WIDTH = 1200;
const HEIGHT = 630;

function loadData() {
  const ctx = vm.createContext({ module: { exports: {} }, console });
  const code = fs.readFileSync(path.join(__dirname, 'courses.js'), 'utf8')
    .replace(/^const /gm, 'var ').replace(/^let /gm, 'var ');
  vm.runInContext(code, ctx);
  return { COURSES: ctx.COURSES, CATEGORIES: ctx.CATEGORIES };
}

function generateCourseOG(course, cat) {
  if (!createCanvas) return null;
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  grad.addColorStop(0, '#0a0a1a');
  grad.addColorStop(0.5, '#0f1028');
  grad.addColorStop(1, '#0a0a1a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Accent line top
  const lineGrad = ctx.createLinearGradient(0, 0, WIDTH, 0);
  lineGrad.addColorStop(0, '#6ee7b7');
  lineGrad.addColorStop(1, '#3b82f6');
  ctx.fillStyle = lineGrad;
  ctx.fillRect(0, 0, WIDTH, 4);

  // Brand
  ctx.font = '600 16px system-ui, sans-serif';
  ctx.fillStyle = '#6ee7b7';
  ctx.fillText('GETDEADDICTED ACADEMY', 60, 60);

  // Category
  ctx.font = '400 18px system-ui, sans-serif';
  ctx.fillStyle = cat.color || '#94a3b8';
  ctx.fillText(cat.name.toUpperCase(), 60, 95);

  // Title
  ctx.font = '700 48px system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  const words = course.title.split(' ');
  let line = '';
  let y = 180;
  for (const word of words) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > WIDTH - 120 && line) {
      ctx.fillText(line.trim(), 60, y);
      line = word + ' ';
      y += 60;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), 60, y);

  // Description
  ctx.font = '400 20px system-ui, sans-serif';
  ctx.fillStyle = '#94a3b8';
  const desc = course.description.substring(0, 120) + '...';
  ctx.fillText(desc, 60, y + 60);

  // Stats bar
  const statsY = HEIGHT - 100;
  ctx.font = '600 16px system-ui, sans-serif';
  ctx.fillStyle = '#6ee7b7';
  const stats = [`${course.level}`, `${course.duration}`, `${course.lessons} lessons`, `${course.modules.length} modules`];
  let sx = 60;
  stats.forEach(stat => {
    const w = ctx.measureText(stat).width + 24;
    ctx.fillStyle = 'rgba(110,231,183,0.1)';
    _roundRect(ctx, sx, statsY, w, 30, 15);
    ctx.fill();
    ctx.fillStyle = '#6ee7b7';
    ctx.fillText(stat, sx + 12, statsY + 20);
    sx += w + 12;
  });

  // Bottom line
  ctx.fillStyle = lineGrad;
  ctx.fillRect(0, HEIGHT - 4, WIDTH, 4);

  return canvas;
}

function generateCategoryOG(cat, courseCount) {
  if (!createCanvas) return null;
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  grad.addColorStop(0, '#0a0a1a');
  grad.addColorStop(1, '#0f1028');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const lineGrad = ctx.createLinearGradient(0, 0, WIDTH, 0);
  lineGrad.addColorStop(0, cat.color || '#6ee7b7');
  lineGrad.addColorStop(1, '#3b82f6');
  ctx.fillStyle = lineGrad;
  ctx.fillRect(0, 0, WIDTH, 4);

  ctx.font = '600 16px system-ui, sans-serif';
  ctx.fillStyle = '#6ee7b7';
  ctx.fillText('GETDEADDICTED ACADEMY', 60, 60);

  ctx.font = '700 56px system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(cat.name, 60, 200);

  ctx.font = '400 24px system-ui, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(cat.desc, 60, 260);

  ctx.font = '600 20px system-ui, sans-serif';
  ctx.fillStyle = cat.color || '#6ee7b7';
  ctx.fillText(`${courseCount} courses available`, 60, 320);

  ctx.fillStyle = lineGrad;
  ctx.fillRect(0, HEIGHT - 4, WIDTH, 4);

  return canvas;
}

function _roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function main() {
  if (!createCanvas) {
    console.log('canvas package not installed. Install with: npm install canvas');
    console.log('Generating placeholder OG metadata instead...\n');
    generatePlaceholders();
    return;
  }

  const { COURSES, CATEGORIES } = loadData();
  const ogDir = path.join(__dirname, 'dist', 'og');
  fs.mkdirSync(ogDir, { recursive: true });

  console.log('Generating OG images...\n');

  let count = 0;
  for (const course of COURSES) {
    const cat = CATEGORIES.find(c => c.id === course.category);
    const canvas = generateCourseOG(course, cat);
    if (canvas) {
      fs.writeFileSync(path.join(ogDir, `course-${course.id}.png`), canvas.toBuffer('image/png'));
      count++;
    }
  }
  console.log(`  Generated ${count} course OG images`);

  let catCount = 0;
  for (const cat of CATEGORIES) {
    const courses = COURSES.filter(c => c.category === cat.id);
    const canvas = generateCategoryOG(cat, courses.length);
    if (canvas) {
      fs.writeFileSync(path.join(ogDir, `category-${slugify(cat.name)}.png`), canvas.toBuffer('image/png'));
      catCount++;
    }
  }
  console.log(`  Generated ${catCount} category OG images`);
  console.log(`\nDone! ${count + catCount} OG images in dist/og/`);
}

function generatePlaceholders() {
  const { COURSES, CATEGORIES } = loadData();
  const ogDir = path.join(__dirname, 'dist', 'og');
  fs.mkdirSync(ogDir, { recursive: true });

  // Write a manifest of what images are needed
  const manifest = {
    courses: COURSES.map(c => ({
      file: `course-${c.id}.png`,
      title: c.title,
      category: CATEGORIES.find(cat => cat.id === c.category)?.name || '',
      level: c.level
    })),
    categories: CATEGORIES.map(cat => ({
      file: `category-${slugify(cat.name)}.png`,
      name: cat.name,
      courses: COURSES.filter(c => c.category === cat.id).length
    }))
  };
  fs.writeFileSync(path.join(ogDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`  OG manifest written with ${manifest.courses.length} courses + ${manifest.categories.length} categories`);
  console.log('  Install "canvas" package to generate actual PNGs: npm install canvas');
}

main();
