// ===== GETDEADDICTED ACADEMY — PRINTABLE WORKSHEETS =====
// Generates print-friendly course worksheets and family activity sheets

const Printables = (() => {

  function generateWorksheet(courseId) {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return;
    const cat = CATEGORIES.find(c => c.id === course.category);
    const outcomes = course.detailedOutcomes || course.outcomes;
    const modules = course.modules;

    const win = window.open('', '_blank');
    win.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${course.title} - Worksheet | GetDeaddicted Academy</title>
<style>
  @media print { @page { margin: 1.5cm; } }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; color: #1a1a1a; line-height: 1.6; padding: 2rem; max-width: 800px; margin: 0 auto; }
  .header { text-align: center; border-bottom: 2px solid #6ee7b7; padding-bottom: 1rem; margin-bottom: 1.5rem; }
  .header h1 { font-size: 1.6rem; color: #0f172a; }
  .header .meta { color: #64748b; font-size: 0.85rem; margin-top: 0.3rem; }
  .brand { font-size: 0.8rem; color: #6ee7b7; font-weight: 600; }
  h2 { font-size: 1.1rem; color: #0f172a; margin: 1.2rem 0 0.5rem; border-left: 3px solid #6ee7b7; padding-left: 0.6rem; }
  h3 { font-size: 0.95rem; color: #334155; margin: 0.8rem 0 0.3rem; }
  ul { padding-left: 1.2rem; margin-bottom: 0.8rem; }
  li { margin-bottom: 0.3rem; color: #334155; }
  .module-block { border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin-bottom: 0.8rem; page-break-inside: avoid; }
  .module-num { display: inline-block; background: #6ee7b7; color: #0f172a; width: 24px; height: 24px; border-radius: 50%; text-align: center; font-size: 0.75rem; font-weight: 700; line-height: 24px; margin-right: 0.5rem; }
  .exercise-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem; margin: 0.5rem 0; }
  .exercise-box h4 { color: #166534; font-size: 0.85rem; margin-bottom: 0.3rem; }
  .write-space { border: 1px dashed #cbd5e1; border-radius: 6px; min-height: 80px; margin: 0.5rem 0; padding: 0.5rem; }
  .write-label { font-size: 0.75rem; color: #94a3b8; }
  .reflection-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 1rem; margin: 0.5rem 0; }
  .footer { text-align: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; font-size: 0.7rem; color: #94a3b8; }
  .print-btn { display: block; margin: 1rem auto; padding: 0.5rem 1.5rem; background: #6ee7b7; color: #0f172a; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 0.9rem; }
  @media print { .print-btn { display: none; } }
  .name-line { border-bottom: 1px solid #94a3b8; width: 200px; display: inline-block; margin-left: 0.5rem; }
  .date-line { border-bottom: 1px solid #94a3b8; width: 120px; display: inline-block; margin-left: 0.5rem; }
</style>
</head>
<body>
<button class="print-btn" onclick="window.print()">Print Worksheet</button>

<div class="header">
  <div class="brand">GetDeaddicted Academy</div>
  <h1>${_esc(course.title)}</h1>
  <div class="meta">${cat ? cat.name : ''} &middot; ${course.level} &middot; ${course.duration} &middot; ${course.lessons} lessons</div>
  <div style="margin-top:0.8rem;font-size:0.85rem;">
    Name: <span class="name-line"></span> &nbsp;&nbsp; Date: <span class="date-line"></span>
  </div>
</div>

<h2>What You'll Learn</h2>
<ul>
  ${outcomes.map(o => `<li>${_esc(o)}</li>`).join('')}
</ul>

<h2>Course Modules</h2>
${modules.map((mod, i) => {
  const isRich = typeof mod === 'object' && mod.title;
  const title = isRich ? mod.title : mod;
  return `
    <div class="module-block">
      <h3><span class="module-num">${i + 1}</span>${_esc(title)}</h3>
      ${isRich && mod.overview ? `<p style="color:#64748b;font-size:0.85rem;">${_esc(mod.overview)}</p>` : ''}
      ${isRich && mod.keyPoints ? `
        <h4 style="margin-top:0.5rem;font-size:0.8rem;color:#334155;">Key Points:</h4>
        <ul>${mod.keyPoints.map(kp => `<li style="font-size:0.85rem;">${_esc(kp)}</li>`).join('')}</ul>
      ` : ''}
      ${isRich && mod.exercise ? `
        <div class="exercise-box">
          <h4>Activity:</h4>
          <p style="font-size:0.85rem;">${_esc(mod.exercise)}</p>
        </div>
      ` : ''}
      <div class="reflection-box">
        <h4 style="color:#1e40af;font-size:0.8rem;">My Thoughts:</h4>
        <div class="write-space"><span class="write-label">Write or draw your reflections here...</span></div>
      </div>
    </div>
  `;
}).join('')}

<h2>My Action Plan</h2>
<p style="font-size:0.85rem;color:#64748b;margin-bottom:0.5rem;">After completing this course, what 3 things will you do differently?</p>
<div class="write-space"><span class="write-label">1.</span></div>
<div class="write-space"><span class="write-label">2.</span></div>
<div class="write-space"><span class="write-label">3.</span></div>

<div class="footer">
  <p>&copy; 2026 GetDeaddicted Academy &middot; academy.getdeaddicted.com &middot; Your screen time, your rules.</p>
</div>

</body></html>
    `);
    win.document.close();
  }

  function generateFamilyActivitySheet() {
    const win = window.open('', '_blank');
    win.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Family Digital Wellness Activity Sheet | GetDeaddicted Academy</title>
<style>
  @media print { @page { margin: 1.5cm; } }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; color: #1a1a1a; line-height: 1.7; padding: 2rem; max-width: 800px; margin: 0 auto; }
  .header { text-align: center; border-bottom: 2px solid #6ee7b7; padding-bottom: 1rem; margin-bottom: 1.5rem; }
  .header h1 { font-size: 1.5rem; }
  .brand { font-size: 0.8rem; color: #6ee7b7; font-weight: 600; }
  h2 { font-size: 1.1rem; margin: 1.2rem 0 0.6rem; border-left: 3px solid #f472b6; padding-left: 0.6rem; }
  .activity { border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.2rem; margin-bottom: 1rem; page-break-inside: avoid; }
  .activity h3 { font-size: 0.95rem; color: #0f172a; }
  .activity p { font-size: 0.85rem; color: #475569; margin-top: 0.3rem; }
  .checkbox { display: flex; gap: 0.5rem; align-items: flex-start; margin: 0.4rem 0; }
  .checkbox-box { width: 18px; height: 18px; border: 2px solid #94a3b8; border-radius: 4px; flex-shrink: 0; margin-top: 2px; }
  .write-space { border: 1px dashed #cbd5e1; border-radius: 6px; min-height: 60px; margin: 0.5rem 0; padding: 0.5rem; }
  .footer { text-align: center; margin-top: 2rem; font-size: 0.7rem; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 1rem; }
  .print-btn { display: block; margin: 1rem auto; padding: 0.5rem 1.5rem; background: #f472b6; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
  @media print { .print-btn { display: none; } }
</style>
</head>
<body>
<button class="print-btn" onclick="window.print()">Print Activity Sheet</button>

<div class="header">
  <div class="brand">GetDeaddicted Academy</div>
  <h1>Family Digital Wellness Week</h1>
  <p style="color:#64748b;font-size:0.85rem;">Fun activities for the whole family. No screens required!</p>
</div>

<h2>Daily Challenges</h2>

<div class="activity">
  <h3>Monday: Screen-Free Dinner</h3>
  <p>All devices go in a basket before dinner. Talk about everyone's best moment of the day.</p>
  <div class="checkbox"><div class="checkbox-box"></div><span>We did it!</span></div>
</div>

<div class="activity">
  <h3>Tuesday: Nature Walk Scavenger Hunt</h3>
  <p>Go outside for 20 minutes. Find: something soft, something that makes a sound, something beautiful, something tiny.</p>
  <div class="checkbox"><div class="checkbox-box"></div><span>We did it!</span></div>
  <div class="write-space"><span style="font-size:0.75rem;color:#94a3b8;">What did you find?</span></div>
</div>

<div class="activity">
  <h3>Wednesday: Board Game Night</h3>
  <p>Play any board game, card game, or make up your own game. The sillier, the better!</p>
  <div class="checkbox"><div class="checkbox-box"></div><span>We did it!</span></div>
</div>

<div class="activity">
  <h3>Thursday: Creative Hour</h3>
  <p>Draw, paint, build with LEGO, write a story, or make music. No screens allowed during this hour.</p>
  <div class="checkbox"><div class="checkbox-box"></div><span>We did it!</span></div>
</div>

<div class="activity">
  <h3>Friday: Phone Stack Challenge</h3>
  <p>Stack all family phones in the center of the table during a meal. First person to reach for theirs does the dishes!</p>
  <div class="checkbox"><div class="checkbox-box"></div><span>We did it!</span></div>
</div>

<div class="activity">
  <h3>Weekend: The Big Unplug</h3>
  <p>Try 4 hours with zero screens. Go to a park, cook together, play sports, visit a friend, or explore your neighborhood.</p>
  <div class="checkbox"><div class="checkbox-box"></div><span>We did it!</span></div>
  <div class="write-space"><span style="font-size:0.75rem;color:#94a3b8;">How did it feel? What did you do instead?</span></div>
</div>

<h2>Family Reflection</h2>
<div class="write-space"><span style="font-size:0.75rem;color:#94a3b8;">What was the hardest challenge this week?</span></div>
<div class="write-space"><span style="font-size:0.75rem;color:#94a3b8;">What was the most fun?</span></div>
<div class="write-space"><span style="font-size:0.75rem;color:#94a3b8;">What habit will we keep doing?</span></div>

<div class="footer">
  <p>&copy; 2026 GetDeaddicted Academy &middot; academy.getdeaddicted.com</p>
</div>
</body></html>
    `);
    win.document.close();
  }

  function _esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  return { generateWorksheet, generateFamilyActivitySheet };
})();
