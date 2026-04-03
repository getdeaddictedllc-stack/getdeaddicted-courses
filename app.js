// ===== GETDEADDICTED ACADEMY — APPLICATION LOGIC =====

// --- State ---
let currentCourse = null;
let currentSlide = 0;
let slides = [];

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderCourses(COURSES);
  populateCategoryFilter();
  document.addEventListener('keydown', handleKeyboard);
});

// --- Navigation ---
function toggleNav() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
}
function closeNav() {
  const links = document.getElementById('navLinks');
  links.classList.remove('open');
}

// --- Category Rendering ---
function renderCategories() {
  const grid = document.getElementById('categoryGrid');
  grid.innerHTML = CATEGORIES.map(cat => {
    const count = COURSES.filter(c => c.category === cat.id).length;
    return `
      <div class="category-card" style="--cat-color: ${cat.color}" onclick="filterByCategory('${cat.id}')">
        <span class="cat-icon">${cat.icon}</span>
        <div class="cat-name">${cat.name}</div>
        <div class="cat-count">${count} courses</div>
        <div class="cat-desc">${cat.desc}</div>
      </div>
    `;
  }).join('');
}

function filterByCategory(catId) {
  document.getElementById('categoryFilter').value = catId;
  filterCourses();
  document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
}

// --- Course Rendering ---
function renderCourses(courses) {
  const grid = document.getElementById('courseGrid');
  if (courses.length === 0) {
    grid.innerHTML = '<p style="color: #64748b; text-align: center; grid-column: 1/-1; padding: 3rem;">No courses match your search. Try different keywords.</p>';
    return;
  }
  grid.innerHTML = courses.map(course => {
    const cat = CATEGORIES.find(c => c.id === course.category);
    const badgeClass = `badge-${course.level.toLowerCase()}`;
    return `
      <div class="course-card" style="--cat-color: ${cat.color}" onclick="openCourse(${course.id})">
        <div class="course-cat">${cat.icon} ${cat.name}</div>
        <h3>${course.title}</h3>
        <p>${course.description.substring(0, 140)}...</p>
        <div class="course-meta">
          <span class="badge ${badgeClass}">${course.level}</span>
          <span>${course.duration}</span>
          <span>${course.lessons} lessons</span>
        </div>
      </div>
    `;
  }).join('');
  document.getElementById('filteredCount').textContent = `Showing ${courses.length} courses`;
}

// --- Filtering ---
function filterCourses() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const level = document.getElementById('levelFilter').value;

  let filtered = COURSES;
  if (search) {
    filtered = filtered.filter(c => {
      const modText = c.modules.map(m => typeof m === 'string' ? m : m.title).join(' ').toLowerCase();
      return c.title.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search) ||
        modText.includes(search);
    });
  }
  if (category !== 'all') {
    filtered = filtered.filter(c => c.category === category);
  }
  if (level !== 'all') {
    filtered = filtered.filter(c => c.level === level);
  }
  renderCourses(filtered);
}

function populateCategoryFilter() {
  const select = document.getElementById('categoryFilter');
  CATEGORIES.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.id;
    opt.textContent = cat.name;
    select.appendChild(opt);
  });
}

// --- Helper: check if modules are rich (object) or simple (string) ---
function isRichModule(mod) {
  return typeof mod === 'object' && mod.title;
}

// --- Course Modal ---
function openCourse(id) {
  currentCourse = COURSES.find(c => c.id === id);
  if (!currentCourse) return;
  const cat = CATEGORIES.find(c => c.id === currentCourse.category);

  document.getElementById('modalCategory').textContent = `${cat.icon} ${cat.name}`;
  document.getElementById('modalTitle').textContent = currentCourse.title;
  document.getElementById('modalLevel').textContent = currentCourse.level;
  document.getElementById('modalLevel').className = `badge badge-${currentCourse.level.toLowerCase()}`;
  document.getElementById('modalDuration').textContent = currentCourse.duration;
  document.getElementById('modalLessons').textContent = `${currentCourse.lessons} lessons`;
  document.getElementById('modalDescription').textContent = currentCourse.description;
  document.getElementById('modalAudience').textContent = currentCourse.audience;

  const modules = currentCourse.modules;
  document.getElementById('modalModules').innerHTML = modules.map((m, i) => {
    const title = isRichModule(m) ? m.title : m;
    const overview = isRichModule(m) && m.overview ? `<div style="color:#94a3b8;font-size:0.85rem;margin-top:0.3rem;">${m.overview}</div>` : '';
    const dur = isRichModule(m) && m.duration ? `<span style="color:#64748b;font-size:0.8rem;margin-left:auto;white-space:nowrap;">${m.duration}</span>` : '';
    return `
      <div class="module-item">
        <span class="module-num">${i + 1}</span>
        <div style="flex:1"><span class="module-name">${title}</span>${overview}</div>
        ${dur}
      </div>
    `;
  }).join('');

  const outcomes = currentCourse.detailedOutcomes || currentCourse.outcomes;
  document.getElementById('modalOutcomes').innerHTML = outcomes.map(o => `<li>${o}</li>`).join('');

  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

// --- Presentation Mode ---
function startPresentation() {
  if (!currentCourse) return;
  const cat = CATEGORIES.find(c => c.id === currentCourse.category);
  closeModal();

  slides = buildSlides(currentCourse, cat);
  currentSlide = 0;

  document.getElementById('presTitle').textContent = currentCourse.title;
  document.getElementById('presentationMode').classList.add('active');
  document.body.style.overflow = 'hidden';
  renderSlide();
}

function exitPresentation() {
  voiceover.stop();
  document.getElementById('presentationMode').classList.remove('active');
  document.body.style.overflow = '';
}

function nextSlide() {
  voiceover.stop();
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    renderSlide();
  }
}

function prevSlide() {
  voiceover.stop();
  if (currentSlide > 0) {
    currentSlide--;
    renderSlide();
  }
}

function renderSlide() {
  const slide = slides[currentSlide];
  document.getElementById('presSlide').innerHTML = slide.html;
  document.getElementById('presProgress').textContent = `${currentSlide + 1} / ${slides.length}`;

  // Scroll to top of slide
  document.getElementById('presSlide').scrollTop = 0;

  // Auto-narrate
  if (slide.narration && voiceover.enabled) {
    setTimeout(() => {
      voiceover.speak(slide.narration, () => {
        // Auto-advance if enabled
        const autoAdvance = document.getElementById('autoAdvance');
        if (autoAdvance && autoAdvance.checked && currentSlide < slides.length - 1) {
          setTimeout(() => nextSlide(), 1500);
        }
      });
    }, 500);
  }
}

function buildSlides(course, cat) {
  const s = [];
  const hasRich = course.modules.length > 0 && isRichModule(course.modules[0]);

  // Slide 1: Title
  s.push({
    html: `
      <div class="slide-label">GetDeaddicted Academy</div>
      <div class="big-icon">${cat.icon}</div>
      <h1>${course.title}</h1>
      <p style="margin-top: 1rem; font-size: 1.1rem; color: #64748b;">
        ${cat.name} &bull; ${course.level} &bull; ${course.duration} &bull; ${course.lessons} lessons
      </p>
    `,
    narration: `Welcome to GetDeaddicted Academy. You are about to begin the course: ${course.title}. This is a ${course.level} level course in ${cat.name}, spanning ${course.duration} with ${course.lessons} lessons. Let's get started.`
  });

  // Slide 2: Introduction / Overview
  const intro = course.introduction || course.description;
  s.push({
    html: `
      <div class="slide-label">Course Introduction</div>
      <h2>About This Course</h2>
      <p>${course.description}</p>
      <p style="margin-top: 2rem; color: #6ee7b7; font-size: 1.2rem;"><strong>Who is this for?</strong></p>
      <p>${course.audience}</p>
    `,
    narration: intro
  });

  // Slide 3: What You'll Learn
  const outcomes = course.detailedOutcomes || course.outcomes;
  s.push({
    html: `
      <div class="slide-label">Learning Outcomes</div>
      <h2>What You'll Learn</h2>
      <ul>
        ${outcomes.map(o => `<li>${o}</li>`).join('')}
      </ul>
    `,
    narration: `In this course, you will learn the following: ${outcomes.join('. ')}. These outcomes are designed to give you practical, lasting tools for your recovery journey.`
  });

  // Slide 4: Course Roadmap
  const moduleNames = course.modules.map(m => isRichModule(m) ? m.title : m);
  s.push({
    html: `
      <div class="slide-label">Course Roadmap</div>
      <h2>Module Overview</h2>
      <ul>
        ${moduleNames.map((m, i) => `<li><strong>Module ${i + 1}:</strong> ${m}</li>`).join('')}
      </ul>
    `,
    narration: `This course contains ${moduleNames.length} modules. Here's your roadmap: ${moduleNames.map((m, i) => `Module ${i + 1}: ${m}`).join('. ')}. Each module builds on the last, so we recommend going in order.`
  });

  // Individual module slides
  course.modules.forEach((mod, i) => {
    if (isRichModule(mod)) {
      // Rich module: Overview slide
      s.push({
        html: `
          <div class="slide-label">Module ${i + 1} of ${course.modules.length}</div>
          <div class="big-icon">${cat.icon}</div>
          <h2>${mod.title}</h2>
          <p class="module-overview">${mod.overview}</p>
          ${mod.duration ? `<p style="color:#64748b;font-size:1rem;margin-top:0.5rem;">Estimated time: ${mod.duration}</p>` : ''}
        `,
        narration: mod.narration || mod.overview
      });

      // Rich module: Key Points slide
      if (mod.keyPoints && mod.keyPoints.length > 0) {
        s.push({
          html: `
            <div class="slide-label">Module ${i + 1} — Key Points</div>
            <h2>${mod.title}</h2>
            <div class="slide-section">
              ${mod.keyPoints.map((kp, j) => `
                <div class="key-point">
                  <span class="key-point-num">${j + 1}</span>
                  <span class="key-point-text">${kp}</span>
                </div>
              `).join('')}
            </div>
          `,
          narration: `Let's go through the key points of ${mod.title}. ${mod.keyPoints.map((kp, j) => `Point ${j + 1}: ${kp}`).join('. ')}.`
        });
      }

      // Rich module: Exercise slide
      if (mod.exercise) {
        s.push({
          html: `
            <div class="slide-label">Module ${i + 1} — Practice Exercise</div>
            <h2>Practice Time</h2>
            <div class="exercise-box">
              <h3>Exercise: ${mod.title}</h3>
              <p>${mod.exercise}</p>
            </div>
          `,
          narration: `Now it's time to practice what you've learned. Here is your exercise for this module: ${mod.exercise}. Take your time with this. There's no rush. Real growth happens through practice.`
        });
      }
    } else {
      // Simple string module
      s.push({
        html: `
          <div class="slide-label">Module ${i + 1} of ${course.modules.length}</div>
          <div class="big-icon">${cat.icon}</div>
          <h2>${mod}</h2>
          <p style="margin-top: 1.5rem;">Deep dive into the principles, practices, and actionable strategies of this module.</p>
          <p style="margin-top: 1rem; color: #64748b; font-size: 1rem;">Part of: ${course.title}</p>
        `,
        narration: `We are now on Module ${i + 1}: ${mod}. In this module, we'll take a deep dive into the principles, practices, and actionable strategies related to ${mod}. Let's explore this together.`
      });
    }
  });

  // Key Takeaways
  s.push({
    html: `
      <div class="slide-label">Key Takeaways</div>
      <h2>Remember These</h2>
      <ul>
        ${outcomes.map(o => `<li>${o}</li>`).join('')}
      </ul>
    `,
    narration: `Let's review the key takeaways from this course: ${outcomes.join('. ')}. Remember, recovery is a journey, not a destination. Take these lessons with you every day.`
  });

  // Course Complete
  s.push({
    html: `
      <div class="slide-label">Course Complete</div>
      <div class="big-icon">&#127942;</div>
      <h1>Congratulations!</h1>
      <p>You've completed <strong>${course.title}</strong></p>
      <p style="margin-top: 2rem; color: #6ee7b7; font-size: 1.3rem;">
        Recovery is not a destination. It's a journey.<br>Keep going. You're worth it.
      </p>
      <p style="margin-top: 2rem; color: #64748b;">&copy; 2026 GetDeaddicted Academy</p>
    `,
    narration: `Congratulations! You've completed ${course.title}. You should be proud of yourself for investing in your recovery. Remember: recovery is not a destination, it's a journey. Keep going. You are worth it. Thank you for learning with GetDeaddicted Academy.`
  });

  return s;
}

// --- Keyboard Navigation ---
function handleKeyboard(e) {
  const pres = document.getElementById('presentationMode');
  if (!pres.classList.contains('active')) return;

  switch(e.key) {
    case 'ArrowRight':
    case ' ':
      e.preventDefault();
      nextSlide();
      break;
    case 'ArrowLeft':
    case 'Backspace':
      e.preventDefault();
      prevSlide();
      break;
    case 'Escape':
      exitPresentation();
      break;
    case 'v':
    case 'V':
      voiceover.toggle();
      break;
    case 'p':
    case 'P':
      voiceover.togglePlayPause();
      break;
  }
}

// --- Touch/Swipe Support for Presentation ---
let touchStartX = 0;
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });
document.addEventListener('touchend', (e) => {
  const pres = document.getElementById('presentationMode');
  if (!pres.classList.contains('active')) return;
  const dx = e.changedTouches[0].screenX - touchStartX;
  const dy = e.changedTouches[0].screenY - touchStartY;
  if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
  if (dx < 0) nextSlide();
  else prevSlide();
}, { passive: true });
