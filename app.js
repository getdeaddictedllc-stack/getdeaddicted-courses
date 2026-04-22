// ===== GETDEADDICTED ACADEMY — APPLICATION LOGIC =====

// --- State ---
let currentCourse = null;
let currentSlide = 0;
let slides = [];
let slideDirection = 'forward';
let celebratedMilestones = new Set();
let slideStartTime = null;

// --- Merge expansion data into COURSES ---
function mergeExpansionData() {
  const expFunctions = [
    typeof getExp_1_5 === 'function' && getExp_1_5,
    typeof getExp_6_10 === 'function' && getExp_6_10,
    typeof getExp_11_15 === 'function' && getExp_11_15,
    typeof getExp_16_20 === 'function' && getExp_16_20,
    typeof getExp_21_25 === 'function' && getExp_21_25,
    typeof getExp_26_30 === 'function' && getExp_26_30,
    typeof getExp_31_35 === 'function' && getExp_31_35,
    typeof getExp_36_40 === 'function' && getExp_36_40,
    typeof getExp_41_45 === 'function' && getExp_41_45,
    typeof getExp_46_50 === 'function' && getExp_46_50
  ].filter(Boolean);

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
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  mergeExpansionData();
  renderCategories();
  renderCourses(COURSES);
  populateCategoryFilter();
  renderPricingSection();
  document.addEventListener('keydown', handleKeyboard);

  // Init auth-dependent UI
  updateNavAuth();
  updateStreakBanner();
  if (typeof Paywall !== 'undefined') Paywall.init();
  if (typeof Referral !== 'undefined') Referral.checkUrlReferral();
  if (typeof Coach !== 'undefined') Coach.init();
  if (typeof Analytics !== 'undefined') Analytics.init();
  if (typeof EmailCapture !== 'undefined') EmailCapture.renderFooterForm();
  if (typeof Notifications !== 'undefined') Notifications.init();
  if (typeof Recommendations !== 'undefined') Recommendations.renderRecommendationBar();
  if (typeof I18n !== 'undefined') I18n.init();
  if (typeof Landing !== 'undefined') Landing.init();
  if (typeof Legal !== 'undefined') Legal.init();
  if (typeof Gamification !== 'undefined') Gamification.init();
  if (typeof Affiliate !== 'undefined') Affiliate.init();

  // Post-auth: onboarding + pending referral
  setTimeout(() => {
    if (typeof Referral !== 'undefined') Referral.applyPendingReferral();
    if (typeof Onboarding !== 'undefined' && Onboarding.shouldShow()) Onboarding.show();
  }, 800);

  // Dismiss loading overlay
  requestAnimationFrame(() => {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.classList.add('done');
      setTimeout(() => overlay.remove(), 500);
    }
    document.body.classList.remove('is-loading');
  });
});

// --- Auth UI ---
function showAuthModal(tab, message) {
  const overlay = document.getElementById('authOverlay');
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  switchAuthTab(tab || 'login');
  const msg = document.getElementById('authMessage');
  if (msg) msg.textContent = message || '';
}

function hideAuthModal() {
  const overlay = document.getElementById('authOverlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  document.getElementById('loginForm').style.display = tab === 'login' ? 'flex' : 'none';
  document.getElementById('signupForm').style.display = tab === 'signup' ? 'flex' : 'none';
  document.getElementById('loginError').textContent = '';
  document.getElementById('signupError').textContent = '';
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const pin = document.getElementById('loginPin').value;
  const result = Auth.login({ email, pin });
  if (result.ok) {
    hideAuthModal();
    updateNavAuth();
    updateStreakBanner();
    renderCourses(COURSES);
    showToast('Welcome back!');
  } else {
    document.getElementById('loginError').textContent = result.error;
  }
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const pin = document.getElementById('signupPin').value;
  const result = Auth.signup({ name, email, pin });
  if (result.ok) {
    hideAuthModal();
    updateNavAuth();
    updateStreakBanner();
    renderCourses(COURSES);
    showToast('Account created! 5 free courses are ready for you.');
    if (typeof Analytics !== 'undefined') Analytics.trackSignup('email');
    // Trigger onboarding for new users
    setTimeout(() => {
      if (typeof Onboarding !== 'undefined') Onboarding.show();
    }, 500);
  } else {
    document.getElementById('signupError').textContent = result.error;
  }
}

function updateNavAuth() {
  const authBtn = document.getElementById('navAuthBtn');
  const userDisplay = document.getElementById('navUserDisplay');
  const upgradeBtn = document.getElementById('navUpgradeBtn');
  const dashLink = document.getElementById('navDashboardLink');

  if (Auth.isLoggedIn()) {
    const profile = Auth.getActiveProfile();
    if (authBtn) authBtn.style.display = 'none';
    if (userDisplay) {
      userDisplay.style.display = 'flex';
      userDisplay.onclick = () => Dashboard.show();
      const avatar = document.getElementById('navUserAvatar');
      const nameEl = document.getElementById('navUserName');
      if (avatar && profile) avatar.textContent = (profile.name || 'U')[0].toUpperCase();
      if (nameEl && profile) nameEl.textContent = profile.name || 'User';
    }
    if (upgradeBtn) upgradeBtn.style.display = Auth.isPaid() ? 'none' : 'inline-block';
    if (dashLink) dashLink.style.display = 'inline';
    const refLink = document.getElementById('navReferralLink');
    if (refLink) refLink.style.display = 'inline';
    const classLink = document.getElementById('navClassroomLink');
    if (classLink) classLink.style.display = 'inline';
    const notifBell = document.getElementById('navNotifBell');
    if (notifBell) notifBell.style.display = 'inline-block';
    const xpBar = document.getElementById('xpBar');
    if (xpBar) xpBar.style.display = 'block';
    if (typeof Gamification !== 'undefined') { Gamification.init(); Gamification.renderDailyChallenge(); }
  } else {
    if (authBtn) authBtn.style.display = 'inline-block';
    if (userDisplay) userDisplay.style.display = 'none';
    if (upgradeBtn) upgradeBtn.style.display = 'none';
    if (dashLink) dashLink.style.display = 'none';
  }
}

function updateStreakBanner() {
  const banner = document.getElementById('streakBanner');
  if (!banner) return;
  if (!Auth.isLoggedIn()) { banner.style.display = 'none'; return; }

  const stats = Progress.getStats();
  if (stats.currentStreak > 0) {
    banner.style.display = 'block';
    document.getElementById('streakText').textContent =
      `${stats.currentStreak} day streak! ${stats.coursesCompleted}/50 courses completed`;
    document.getElementById('streakBadgeCount').textContent =
      stats.badgesEarned > 0 ? `${stats.badgesEarned} badges earned` : '';
  } else {
    banner.style.display = 'none';
  }
}

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
      <div class="category-card" style="--cat-color: ${cat.color}" onclick="filterByCategory('${cat.id}')" tabindex="0" role="button" aria-label="${cat.name} - ${count} courses" onkeydown="if(event.key==='Enter')filterByCategory('${cat.id}')">
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
    const isFree = Auth.isCourseFree(course.id);
    const canAccess = Auth.canAccessCourse(course.id);
    const pct = Progress.getCoursePercent(course.id);

    let statusBadge = '';
    if (isFree) {
      statusBadge = '<span class="free-badge">Free</span>';
    } else if (!canAccess) {
      statusBadge = '<span class="locked-badge">&#128274; Premium</span>';
    }

    let progressBar = '';
    if (pct > 0) {
      progressBar = `<div class="course-card-progress"><div class="course-card-progress-fill" style="width:${pct}%"></div></div>`;
    }

    return `
      <div class="course-card" style="--cat-color: ${cat.color}" onclick="openCourse(${course.id})" tabindex="0" role="button" aria-label="${course.title}" onkeydown="if(event.key==='Enter')openCourse(${course.id})">
        ${statusBadge}
        <div class="course-cat">${cat.icon} ${cat.name}</div>
        <h3>${course.title}</h3>
        <p>${course.description.substring(0, 140)}...</p>
        <div class="course-meta">
          <span class="badge ${badgeClass}">${course.level}</span>
          <span>${course.duration}</span>
          <span>${course.lessons} lessons</span>
        </div>
        ${progressBar}
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

  // Show progress in modal
  const pct = Progress.getCoursePercent(currentCourse.id);
  const progressBar = document.getElementById('modalProgressBar');
  if (pct > 0 && progressBar) {
    progressBar.style.display = 'block';
    document.getElementById('modalProgressFill').style.width = pct + '%';
    document.getElementById('modalProgressText').textContent = pct === 100 ? 'Completed!' : `${pct}% complete`;
  } else if (progressBar) {
    progressBar.style.display = 'none';
  }

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

  // Paywall check
  if (!Paywall.checkAccess(currentCourse.id, currentCourse.title)) return;

  const cat = CATEGORIES.find(c => c.id === currentCourse.category);
  closeModal();

  slides = buildSlides(currentCourse, cat);
  currentSlide = 0;
  slideDirection = 'forward';
  slideStartTime = Date.now();
  voiceover.setCourse(currentCourse.id);
  celebratedMilestones = new Set();

  document.getElementById('presTitle').textContent = currentCourse.title;
  document.getElementById('presentationMode').classList.add('active');
  document.body.style.overflow = 'hidden';

  // Inject progress bar if not present
  const presHeader = document.querySelector('.pres-header');
  if (!presHeader.querySelector('.pres-progress-bar')) {
    const bar = document.createElement('div');
    bar.className = 'pres-progress-bar';
    bar.id = 'presProgressBar';
    presHeader.appendChild(bar);
  }

  renderSlide();
  initAvatar();
  if (typeof Coach !== 'undefined') Coach.setCourseContext(currentCourse);
  if (typeof Analytics !== 'undefined') Analytics.trackCourseStart(currentCourse.id, currentCourse.title);
}

function exitPresentation() {
  voiceover.stop();
  if (typeof Avatar !== 'undefined') {
    Avatar.stopIdle();
    Avatar.hide();
  }
  document.getElementById('presentationMode').classList.remove('active');
  document.body.style.overflow = '';

  // Track time spent
  if (slideStartTime && currentCourse) {
    const minutes = (Date.now() - slideStartTime) / 60000;
    Progress.addTime(minutes);
    slideStartTime = null;
  }

  // Refresh course cards to show updated progress
  renderCourses(COURSES);
  updateStreakBanner();
}

function nextSlide() {
  voiceover.stop();
  if (currentSlide < slides.length - 1) {
    slideDirection = 'forward';
    currentSlide++;
    renderSlide();
  }
}

function prevSlide() {
  voiceover.stop();
  if (currentSlide > 0) {
    slideDirection = 'backward';
    currentSlide--;
    renderSlide();
  }
}

function renderSlide() {
  const slide = slides[currentSlide];
  const presSlide = document.getElementById('presSlide');

  // Apply directional animation class
  presSlide.classList.remove('slide-forward', 'slide-backward');
  presSlide.innerHTML = slide.html;
  void presSlide.offsetWidth; // force reflow
  presSlide.classList.add(slideDirection === 'backward' ? 'slide-backward' : 'slide-forward');

  document.getElementById('presProgress').textContent = `${currentSlide + 1} / ${slides.length}`;

  // Update progress bar
  updateProgressBar();

  // Scroll to top of slide
  presSlide.scrollTop = 0;

  // Track progress
  if (currentCourse) {
    Progress.recordSlideView(currentCourse.id, currentSlide, slides.length);

    if (typeof Analytics !== 'undefined') Analytics.trackSlideView(currentCourse.id, currentSlide);
    if (typeof Gamification !== 'undefined') Gamification.awardXP('slide_view');

    // Course completed on last slide
    if (currentSlide === slides.length - 1) {
      Progress.completeCourse(currentCourse.id);
      if (typeof Gamification !== 'undefined') Gamification.awardXP('course_complete');
      if (typeof Analytics !== 'undefined') Analytics.trackCourseComplete(currentCourse.id, currentCourse.title);
      if (typeof Notifications !== 'undefined') Notifications.generateContextual();
      const newBadges = Progress.checkBadges();
      if (newBadges.length > 0) {
        setTimeout(() => showBadgeToast(newBadges[0]), 1500);
        if (typeof Analytics !== 'undefined') Analytics.trackBadge(newBadges[0].name);
      }
    }
  }

  // Check for milestone celebration
  checkMilestoneCelebration();

  // Auto-narrate
  voiceover.setSlideIndex(currentSlide);
  if (slide.narration && voiceover.enabled) {
    setTimeout(() => {
      voiceover.speak(slide.narration, () => {
        const autoAdvance = document.getElementById('autoAdvanceToggle');
        if (autoAdvance && autoAdvance.checked && currentSlide < slides.length - 1 && !slide.interactive) {
          setTimeout(() => nextSlide(), 1500);
        }
      });
    }, 500);
  }
}

function buildSlides(course, cat) {
  const s = [];
  const totalModules = course.modules.length;
  const outcomes = course.detailedOutcomes || course.outcomes;
  const moduleNames = course.modules.map(m => isRichModule(m) ? m.title : m);

  // Slide 1: Title
  s.push({
    html: `
      <div class="slide-fade-in">
        <div class="slide-label">GetDeaddicted Academy</div>
        <div class="big-icon">${cat.icon}</div>
        <h1>${course.title}</h1>
        <p class="slide-discover-intro" style="margin-top: 0.8rem;">Your journey to a healthier digital life starts right here.</p>
        <div style="display:flex;gap:0.6rem;justify-content:center;flex-wrap:wrap;margin-top:1.2rem;">
          <span class="duration-badge">${cat.name}</span>
          <span class="duration-badge">${course.level}</span>
          <span class="duration-badge">${course.duration}</span>
          <span class="duration-badge">${course.lessons} lessons</span>
        </div>
      </div>
    `,
    narration: `Welcome to GetDeaddicted Academy! You are about to begin an exciting course: ${course.title}. This is a ${course.level} level course in ${cat.name}, spanning ${course.duration} with ${course.lessons} lessons. Get ready — let's do this!`
  });

  // Slide 2: Introduction
  const intro = course.introduction || course.description;
  s.push({
    html: `
      <div class="slide-fade-in">
        <div class="slide-label">Course Introduction</div>
        <h2>About This Course</h2>
        <p>${course.description}</p>
        <p style="margin-top: 2rem; color: #6ee7b7; font-size: 1.2rem;"><strong>Who is this for?</strong></p>
        <p>${course.audience}</p>
      </div>
    `,
    narration: intro
  });

  // Slide 3: Outcomes
  s.push({
    html: `
      <div class="slide-fade-in">
        <div class="slide-label">Learning Outcomes</div>
        <h2>What You'll Learn</h2>
        <ul>
          ${outcomes.map(o => `<li>${o}</li>`).join('')}
        </ul>
      </div>
    `,
    narration: `In this course, you will learn the following: ${outcomes.join('. ')}. These outcomes are designed to give you practical, lasting tools for your wellness journey.`
  });

  // Slide 4: Roadmap
  s.push({
    html: `
      <div class="slide-fade-in">
        <div class="slide-label">Course Roadmap</div>
        <h2>Your Learning Path</h2>
        <div class="slide-section">
          ${moduleNames.map((m, i) => `
            <div class="insight-card">
              <span class="insight-num">${i + 1}</span>
              <span class="key-point-text">${m}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `,
    narration: `This course contains ${moduleNames.length} modules. Here's your roadmap: ${moduleNames.map((m, i) => `Module ${i + 1}: ${m}`).join('. ')}. Each module builds on the last, so we recommend going in order.`
  });

  // Module slides
  course.modules.forEach((mod, i) => {
    if (isRichModule(mod)) {
      s.push({
        html: `
          <div class="slide-fade-in">
            <div class="slide-label">Module ${i + 1} of ${totalModules}</div>
            <div class="big-icon">${cat.icon}</div>
            <h2>${mod.title}</h2>
            ${mod.duration ? `<span class="duration-badge" style="margin-bottom:1rem;display:inline-block;">${mod.duration}</span>` : ''}
            <p class="slide-discover-intro">What you'll discover in this module:</p>
            <p class="module-overview">${mod.overview}</p>
          </div>
        `,
        narration: mod.narration || mod.overview
      });

      if (mod.keyPoints && mod.keyPoints.length > 0) {
        s.push({
          html: `
            <div class="slide-fade-in">
              <div class="slide-label">Module ${i + 1} — Key Insights</div>
              <h2>Key Insights</h2>
              <p style="color:#64748b;font-size:0.85rem;margin-bottom:0.5rem;">Click each insight to reveal it</p>
              <div class="slide-section">
                ${mod.keyPoints.map((kp, j) => `
                  <div class="insight-card key-point revealable stagger-item" style="--i:${j}" onclick="this.classList.add('revealed')">
                    <span class="insight-num key-point-num">${j + 1}</span>
                    <span class="key-point-text">${kp}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `,
          narration: `Let's go through the key insights of ${mod.title}. ${mod.keyPoints.map((kp, j) => `Insight ${j + 1}: ${kp}`).join('. ')}.`,
          interactive: true
        });

        const quizData = generateQuiz(mod.keyPoints, mod.title);
        s.push({
          html: `
            <div class="slide-fade-in">
              <div class="slide-label">Module ${i + 1} — Quick Check</div>
              <div class="big-icon">&#129300;</div>
              <h2>Quick Check!</h2>
              <div class="quiz-container" id="quiz-mod-${i}">
                <div class="quiz-question">${quizData.question}</div>
                <div class="quiz-options">
                  ${quizData.options.map((opt, oi) => `
                    <div class="quiz-option stagger-item" style="--i:${oi}" onclick="handleQuizAnswer(this, ${opt.correct ? 'true' : 'false'}, 'quiz-mod-${i}')">
                      <span class="opt-letter">${String.fromCharCode(65 + oi)}</span>
                      <span>${opt.text}</span>
                    </div>
                  `).join('')}
                </div>
                <div id="quiz-feedback-mod-${i}"></div>
              </div>
            </div>
          `,
          narration: `Time for a quick check! ${quizData.question} Take a moment to think about it and select your answer.`,
          interactive: true
        });

        const funFact = mod.keyPoints.reduce((a, b) => a.length >= b.length ? a : b);
        s.push({
          html: `
            <div class="slide-fade-in">
              <div class="slide-label">Module ${i + 1} — Did You Know?</div>
              <div class="big-icon">&#128161;</div>
              <h2>Did You Know?</h2>
              <div class="fun-fact-card">
                <p>${funFact}</p>
              </div>
            </div>
          `,
          narration: `Here's an interesting fact from this module: ${funFact}. Pretty cool, right? Keep this in mind as we continue.`
        });
      }

      if (mod.exercise) {
        s.push({
          html: `
            <div class="slide-fade-in">
              <div class="slide-label">Module ${i + 1} — Practice Activity</div>
              <h2>Your Turn!</h2>
              <div class="exercise-card">
                <div class="exercise-card-header">Practice Activity</div>
                <h3>${mod.title}</h3>
                <p>${mod.exercise}</p>
                ${mod.duration ? `<span class="duration-badge" style="margin-top:1rem;display:inline-block;">Estimated: ${mod.duration}</span>` : ''}
                <p class="exercise-card-motivation">You've got this!</p>
              </div>
            </div>
          `,
          narration: `Now it's your turn to practice! Here is your activity for this module: ${mod.exercise}. Take your time with this. There's no rush. Real growth happens through practice. You've got this!`
        });

        const reflectionQ = generateReflection(mod.title, mod.keyPoints);
        s.push({
          html: `
            <div class="slide-fade-in">
              <div class="slide-label">Module ${i + 1} — Pause & Reflect</div>
              <div class="big-icon">&#128173;</div>
              <h2>Pause & Reflect</h2>
              <div class="reflection-container">
                <div class="reflection-prompt">${reflectionQ}</div>
                <textarea class="reflection-textarea" placeholder="Type your thoughts here... (just for you, nothing is saved)" rows="4"></textarea>
                <button class="reflection-continue" onclick="nextSlide()">Continue when you're ready &rarr;</button>
              </div>
            </div>
          `,
          narration: `Take a moment to pause and reflect. ${reflectionQ} There's no right or wrong answer. Just think about it honestly. When you're ready, move on to the next slide.`,
          interactive: true
        });
      }

      s.push({
        html: `
          <div class="slide-fade-in">
            <div class="slide-label">Module Complete</div>
            <div class="module-complete">
              <div class="big-icon">&#127881;</div>
              <h2>Module ${i + 1} Complete!</h2>
              <p>Great work finishing <strong>${mod.title}</strong></p>
              <div class="module-complete-progress">Module ${i + 1} of ${totalModules} complete</div>
              <div class="module-complete-bar-track">
                <div class="module-complete-bar-fill" style="width:${Math.round(((i + 1) / totalModules) * 100)}%"></div>
              </div>
              ${i + 1 < totalModules ? `<p style="color:#64748b;margin-top:1rem;font-size:0.95rem;">Up next: ${moduleNames[i + 1]}</p>` : `<p style="color:#6ee7b7;margin-top:1rem;font-size:0.95rem;">That was the last module — almost done!</p>`}
            </div>
          </div>
        `,
        narration: `Congratulations! You've completed Module ${i + 1}: ${mod.title}. That's ${i + 1} of ${totalModules} modules done. ${i + 1 < totalModules ? `Up next is ${moduleNames[i + 1]}. Keep going!` : `That was the final module. You're almost at the finish line!`}`
      });

    } else {
      s.push({
        html: `
          <div class="slide-fade-in">
            <div class="slide-label">Module ${i + 1} of ${totalModules}</div>
            <div class="big-icon">${cat.icon}</div>
            <h2>${mod}</h2>
            <p class="slide-discover-intro">What you'll discover:</p>
            <p style="margin-top: 0.5rem;">Deep dive into the principles, practices, and actionable strategies of this module.</p>
            <p style="margin-top: 1rem; color: #64748b; font-size: 1rem;">Part of: ${course.title}</p>
          </div>
        `,
        narration: `We are now on Module ${i + 1}: ${mod}. In this module, we'll take a deep dive into the principles, practices, and actionable strategies related to ${mod}. Let's explore this together.`
      });

      s.push({
        html: `
          <div class="slide-fade-in">
            <div class="slide-label">Module Complete</div>
            <div class="module-complete">
              <div class="big-icon">&#127881;</div>
              <h2>Module ${i + 1} Complete!</h2>
              <p>Great work finishing <strong>${mod}</strong></p>
              <div class="module-complete-progress">Module ${i + 1} of ${totalModules} complete</div>
              <div class="module-complete-bar-track">
                <div class="module-complete-bar-fill" style="width:${Math.round(((i + 1) / totalModules) * 100)}%"></div>
              </div>
              ${i + 1 < totalModules ? `<p style="color:#64748b;margin-top:1rem;font-size:0.95rem;">Up next: ${moduleNames[i + 1]}</p>` : `<p style="color:#6ee7b7;margin-top:1rem;font-size:0.95rem;">That was the last module — almost done!</p>`}
            </div>
          </div>
        `,
        narration: `Nice job completing Module ${i + 1}: ${mod}. That's ${i + 1} of ${totalModules} modules finished. ${i + 1 < totalModules ? `Next up: ${moduleNames[i + 1]}.` : `That was the final module!`}`
      });
    }
  });

  // Key Takeaways
  s.push({
    html: `
      <div class="slide-fade-in">
        <div class="slide-label">Key Takeaways</div>
        <h2>Remember These</h2>
        <ul>
          ${outcomes.map(o => `<li>${o}</li>`).join('')}
        </ul>
      </div>
    `,
    narration: `Let's review the key takeaways from this course: ${outcomes.join('. ')}. Remember, wellness is a journey, not a destination. Take these lessons with you every day.`
  });

  // Course Complete
  s.push({
    html: `
      <div class="slide-fade-in">
        <div class="slide-label">Course Complete</div>
        <div class="achievement-card">
          <div class="achievement-badge">&#127942;</div>
          <div class="achievement-label">Certificate of Completion</div>
          <h1>Congratulations!</h1>
          <p style="font-size:1.15rem;color:#e0e0e0;margin-bottom:1rem;">You've successfully completed</p>
          <p style="font-size:1.4rem;color:#fff;font-weight:700;margin-bottom:1.2rem;">${course.title}</p>
          <div style="display:flex;gap:0.6rem;justify-content:center;flex-wrap:wrap;margin-bottom:1.5rem;">
            <span class="duration-badge">${totalModules} modules mastered</span>
            <span class="duration-badge">${course.duration} of learning</span>
            <span class="duration-badge">${course.level} level</span>
          </div>
          <p style="color: #6ee7b7; font-size: 1.2rem; line-height:1.7;">
            You took a real step toward a healthier digital life.<br>Keep going. You're worth it.
          </p>
          <div class="completion-actions" style="margin-top:1.5rem;display:flex;gap:0.6rem;justify-content:center;flex-wrap:wrap;">
            <button class="btn btn-primary btn-sm" onclick="Certificate.showCertificateModal(currentCourse)">Download Certificate</button>
            <button class="btn btn-secondary btn-sm" onclick="shareCompletion()">Share Achievement</button>
          </div>
          <p style="margin-top: 1.5rem; color: #475569; font-size:0.85rem;">&copy; 2026 GetDeaddicted Academy</p>
        </div>
      </div>
    `,
    narration: `Congratulations! You've completed ${course.title}. You covered ${totalModules} modules and invested real effort into your digital wellness. You should be proud. You can download your certificate and share your achievement! Remember: this is just the beginning. Keep going. You are absolutely worth it. Thank you for learning with GetDeaddicted Academy.`
  });

  return s;
}

// --- Quiz Generator ---
function generateQuiz(keyPoints, moduleTitle) {
  const correctPoint = keyPoints[0];
  const question = `Based on what you just learned about "${moduleTitle}", which of the following is true?`;

  const options = [];
  options.push({ text: correctPoint, correct: true });

  const distractors = [
    `This topic is not important for digital wellness.`,
    `Screen time has no effect on how we feel or behave.`,
    `There is nothing you can do to change your digital habits.`
  ];

  if (keyPoints.length > 1) {
    options.push({ text: distractors[0], correct: false });
    options.push({ text: distractors[2], correct: false });
  } else {
    options.push({ text: distractors[0], correct: false });
    options.push({ text: distractors[1], correct: false });
  }

  for (let k = options.length - 1; k > 0; k--) {
    const r = Math.floor(Math.random() * (k + 1));
    [options[k], options[r]] = [options[r], options[k]];
  }

  return { question, options };
}

// --- Quiz Answer Handler (with progress tracking) ---
function handleQuizAnswer(el, isCorrect, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const allOptions = container.querySelectorAll('.quiz-option');
  const alreadyAnswered = container.querySelector('.quiz-option.correct, .quiz-option.incorrect');
  if (alreadyAnswered) return;

  // Track quiz result
  Progress.recordQuiz(isCorrect);
  if (typeof Gamification !== 'undefined') Gamification.awardXP(isCorrect ? 'quiz_correct' : 'quiz_attempt');

  if (isCorrect) {
    el.classList.add('correct');
  } else {
    el.classList.add('incorrect');
    allOptions.forEach(opt => {
      if (opt.getAttribute('onclick').includes('true')) {
        opt.classList.add('correct');
      }
    });
  }

  const feedbackId = containerId.replace('quiz-', 'quiz-feedback-');
  const feedbackEl = document.getElementById(feedbackId);
  if (feedbackEl) {
    feedbackEl.innerHTML = isCorrect
      ? `<div class="quiz-feedback correct">Awesome! That's correct!</div>`
      : `<div class="quiz-feedback incorrect">Not quite — check the highlighted answer above!</div>`;
  }

  allOptions.forEach(opt => { opt.style.pointerEvents = 'none'; });
}

// Keep old name for backward compat in case any inline onclick uses it
function renderQuiz(el, isCorrect, containerId) {
  handleQuizAnswer(el, isCorrect, containerId);
}

// --- Reflection Question Generator ---
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

// --- Progress Bar ---
function updateProgressBar() {
  const bar = document.getElementById('presProgressBar');
  if (!bar) return;
  const pct = slides.length > 1 ? ((currentSlide) / (slides.length - 1)) * 100 : 0;
  bar.style.width = pct + '%';
}

// --- Toast / Celebration ---
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('dismissing');
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}

function shareCompletion() {
  if (!currentCourse) return;
  const text = `I just completed "${currentCourse.title}" on GetDeaddicted Academy! Taking back my screen time.`;
  const url = 'https://academy.getdeaddicted.com';
  if (navigator.share) {
    navigator.share({ title: 'GetDeaddicted Academy', text, url }).catch(() => {});
  } else {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener');
  }
}

function showBadgeToast(badge) {
  const el = document.getElementById('badgeToast');
  if (!el) return;
  document.getElementById('badgeToastIcon').innerHTML = badge.icon;
  document.getElementById('badgeToastName').textContent = badge.name;
  document.getElementById('badgeToastDesc').textContent = badge.desc;
  el.style.display = 'flex';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

function checkMilestoneCelebration() {
  if (slides.length < 4) return;
  const pct = (currentSlide + 1) / slides.length;
  const milestones = [
    { threshold: 0.25, message: "You're 25% through! Keep going!" },
    { threshold: 0.50, message: "Halfway there! You're doing great!" },
    { threshold: 0.75, message: "75% done! Almost there!" }
  ];

  milestones.forEach(m => {
    if (pct >= m.threshold && pct < m.threshold + 0.05 && !celebratedMilestones.has(m.threshold)) {
      celebratedMilestones.add(m.threshold);
      showToast(m.message);
    }
  });
}

// --- Pricing Section ---
function renderPricingSection() {
  const grid = document.getElementById('pricingGrid');
  if (!grid) return;

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['5 courses included', 'Voice narration', 'Basic progress tracking', 'Works on all devices'],
      cta: 'Start Free',
      action: "document.getElementById('courses').scrollIntoView({behavior:'smooth'})",
      popular: false
    },
    {
      name: 'Annual',
      price: '$59.99',
      period: '/year',
      savings: 'Best Value — Save 37%',
      features: ['All 50 courses', 'Voice narration', 'Full progress & streaks', 'Badges & certificates', 'Priority support'],
      cta: 'Start Free Trial',
      action: "Paywall.checkout('annual')",
      popular: true
    },
    {
      name: 'Family',
      price: '$79.99',
      period: '/year',
      features: ['All 50 courses', 'Up to 5 family members', 'Parent dashboard', 'Full progress & streaks', 'Badges & certificates'],
      cta: 'Start Free Trial',
      action: "Paywall.checkout('family_annual')",
      popular: false
    }
  ];

  grid.innerHTML = plans.map(plan => `
    <div class="pricing-card ${plan.popular ? 'popular' : ''}">
      ${plan.popular ? '<div class="plan-badge">Most Popular</div>' : ''}
      ${plan.savings ? '<div class="plan-savings">' + plan.savings + '</div>' : ''}
      <h3>${plan.name}</h3>
      <div class="plan-price">${plan.price}<span class="plan-period">${plan.period}</span></div>
      <ul class="plan-features">
        ${plan.features.map(f => `<li>&#10003; ${f}</li>`).join('')}
      </ul>
      <button class="btn btn-primary plan-cta" onclick="${plan.action}">${plan.cta}</button>
    </div>
  `).join('');
}

// --- Settings Panel ---
function toggleSettings() {
  const panel = document.getElementById('settingsPanel');
  const overlay = document.getElementById('settingsOverlay');
  const isActive = panel.classList.contains('active');
  panel.classList.toggle('active', !isActive);
  overlay.classList.toggle('active', !isActive);
}

function setNarrationSpeed(speed) {
  voiceover.rate = parseFloat(speed);
}

function setFontSize(size) {
  const slide = document.getElementById('presSlide');
  if (!slide) return;
  slide.classList.remove('font-small', 'font-medium', 'font-large');
  slide.classList.add('font-' + size);
}

// --- Avatar Integration ---
function initAvatar() {
  if (typeof Avatar !== 'undefined') {
    Avatar.init('avatarMount');
    voiceover.onViseme = (viseme) => {
      if (Avatar.visible) Avatar.setViseme(viseme);
    };
    voiceover.onSpeakingChange = (isSpeaking) => {
      if (Avatar.visible) Avatar.setSpeaking(isSpeaking);
    };
  }
}

function toggleAvatar() {
  const toggle = document.getElementById('avatarToggle');
  if (typeof Avatar !== 'undefined') {
    if (toggle && toggle.checked) {
      Avatar.show();
    } else {
      Avatar.hide();
    }
  }
}

// --- Keyboard Navigation ---
function handleKeyboard(e) {
  if (e.key === 'Escape') {
    const settingsPanel = document.getElementById('settingsPanel');
    if (settingsPanel && settingsPanel.classList.contains('active')) {
      toggleSettings();
      return;
    }
    // Close auth modal
    const authOverlay = document.getElementById('authOverlay');
    if (authOverlay && authOverlay.classList.contains('active')) {
      hideAuthModal();
      return;
    }
    // Close paywall
    const paywallOverlay = document.getElementById('paywallOverlay');
    if (paywallOverlay && paywallOverlay.classList.contains('active')) {
      Paywall.hide();
      return;
    }
    const pres = document.getElementById('presentationMode');
    if (pres.classList.contains('active')) {
      exitPresentation();
      return;
    }
    const modal = document.getElementById('modalOverlay');
    if (modal.classList.contains('active')) {
      closeModal();
      return;
    }
    return;
  }

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

// --- Touch/Swipe Support ---
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
