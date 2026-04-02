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
  const links = document.querySelector('.nav-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
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
        <p>${course.description.substring(0, 120)}...</p>
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
    filtered = filtered.filter(c =>
      c.title.toLowerCase().includes(search) ||
      c.description.toLowerCase().includes(search) ||
      c.modules.some(m => m.toLowerCase().includes(search))
    );
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

  document.getElementById('modalModules').innerHTML = currentCourse.modules.map((m, i) => `
    <div class="module-item">
      <span class="module-num">${i + 1}</span>
      <span class="module-name">${m}</span>
    </div>
  `).join('');

  document.getElementById('modalOutcomes').innerHTML = currentCourse.outcomes.map(o => `
    <li>${o}</li>
  `).join('');

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
  document.getElementById('presentationMode').classList.remove('active');
  document.body.style.overflow = '';
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    renderSlide();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    renderSlide();
  }
}

function renderSlide() {
  const slide = slides[currentSlide];
  document.getElementById('presSlide').innerHTML = slide;
  document.getElementById('presProgress').textContent = `${currentSlide + 1} / ${slides.length}`;
}

function buildSlides(course, cat) {
  const s = [];

  // Slide 1: Title
  s.push(`
    <div class="slide-label">GetDeaddicted Academy</div>
    <div class="big-icon">${cat.icon}</div>
    <h1>${course.title}</h1>
    <p style="margin-top: 1rem; font-size: 1.1rem; color: #64748b;">
      ${cat.name} &bull; ${course.level} &bull; ${course.duration} &bull; ${course.lessons} lessons
    </p>
  `);

  // Slide 2: Overview
  s.push(`
    <div class="slide-label">Course Overview</div>
    <h2>About This Course</h2>
    <p>${course.description}</p>
    <p style="margin-top: 2rem; color: #6ee7b7; font-size: 1.2rem;"><strong>Who is this for?</strong></p>
    <p>${course.audience}</p>
  `);

  // Slide 3: What You'll Learn
  s.push(`
    <div class="slide-label">Learning Outcomes</div>
    <h2>What You'll Learn</h2>
    <ul>
      ${course.outcomes.map(o => `<li>${o}</li>`).join('')}
    </ul>
  `);

  // Slide 4: Course Roadmap
  s.push(`
    <div class="slide-label">Course Roadmap</div>
    <h2>Module Overview</h2>
    <ul>
      ${course.modules.map((m, i) => `<li><strong>Module ${i + 1}:</strong> ${m}</li>`).join('')}
    </ul>
  `);

  // Individual module slides
  course.modules.forEach((mod, i) => {
    s.push(`
      <div class="slide-label">Module ${i + 1} of ${course.modules.length}</div>
      <div class="big-icon">${cat.icon}</div>
      <h2>${mod}</h2>
      <p style="margin-top: 1.5rem;">Deep dive into the principles, practices, and actionable strategies of this module.</p>
      <p style="margin-top: 1rem; color: #64748b; font-size: 1rem;">Part of: ${course.title}</p>
    `);
  });

  // Key Takeaways
  s.push(`
    <div class="slide-label">Key Takeaways</div>
    <h2>Remember These</h2>
    <ul>
      ${course.outcomes.map(o => `<li>${o}</li>`).join('')}
    </ul>
  `);

  // Course Complete
  s.push(`
    <div class="slide-label">Course Complete</div>
    <div class="big-icon">&#127942;</div>
    <h1>Congratulations!</h1>
    <p>You've completed <strong>${course.title}</strong></p>
    <p style="margin-top: 2rem; color: #6ee7b7; font-size: 1.3rem;">
      Recovery is not a destination. It's a journey.<br>Keep going. You're worth it.
    </p>
    <p style="margin-top: 2rem; color: #64748b;">&copy; 2026 GetDeaddicted Academy</p>
  `);

  return s;
}

// --- Keyboard Navigation ---
function handleKeyboard(e) {
  const pres = document.getElementById('presentationMode');
  if (!pres.classList.contains('active')) return;

  switch(e.key) {
    case 'ArrowRight':
    case ' ':
    case 'Enter':
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
  }
}
