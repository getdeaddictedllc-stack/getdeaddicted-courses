// ===== GETDEADDICTED ACADEMY — ONBOARDING FLOW =====
// Welcome wizard: age, interests, personalized recommendations

const Onboarding = (() => {
  const STORAGE_KEY = 'gda_onboarded';
  let _step = 0;
  let _selections = { ageGroup: null, interests: [], goal: null };

  const AGE_GROUPS = [
    { id: 'kid', label: 'Kid (5-9)', emoji: '&#129490;' },
    { id: 'tween', label: 'Tween (10-12)', emoji: '&#129489;' },
    { id: 'teen', label: 'Teen (13-17)', emoji: '&#129491;' },
    { id: 'parent', label: 'Parent / Adult', emoji: '&#129489;&#8205;&#129458;' }
  ];

  const INTERESTS = [
    { id: 'understanding', label: 'Understanding Addiction', icon: '&#129504;' },
    { id: 'phone', label: 'Phone Freedom', icon: '&#128241;' },
    { id: 'social', label: 'Social Media', icon: '&#128172;' },
    { id: 'gaming', label: 'Gaming Balance', icon: '&#127918;' },
    { id: 'focus', label: 'Focus & Attention', icon: '&#127919;' },
    { id: 'family', label: 'Family Screen Time', icon: '&#128106;' },
    { id: 'safety', label: 'Online Safety', icon: '&#128737;' },
    { id: 'creative', label: 'Offline Activities', icon: '&#127912;' }
  ];

  const GOALS = [
    { id: 'reduce', label: 'Reduce screen time', icon: '&#9203;' },
    { id: 'understand', label: 'Understand the science', icon: '&#128218;' },
    { id: 'family', label: 'Help my family', icon: '&#128106;' },
    { id: 'focus', label: 'Improve focus', icon: '&#127919;' },
    { id: 'balance', label: 'Find balance', icon: '&#9878;' }
  ];

  function shouldShow() {
    if (!Auth.isLoggedIn()) return false;
    const user = Auth.getCurrentUser();
    if (!user) return false;
    try {
      const done = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      return !done[user.id];
    } catch { return true; }
  }

  function markComplete() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    try {
      const done = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      done[user.id] = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {}
  }

  function show() {
    _step = 0;
    _selections = { ageGroup: null, interests: [], goal: null };
    const overlay = document.getElementById('onboardingOverlay');
    if (!overlay) return;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    _render();
  }

  function hide() {
    const overlay = document.getElementById('onboardingOverlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
    markComplete();
  }

  function _render() {
    const overlay = document.getElementById('onboardingOverlay');
    if (!overlay) return;

    const user = Auth.getCurrentUser();
    const name = user ? user.name.split(' ')[0] : 'there';

    const steps = [
      _stepWelcome(name),
      _stepAge(),
      _stepInterests(),
      _stepGoal(),
      _stepRecommendations()
    ];

    overlay.innerHTML = `
      <div class="onboard-modal">
        <div class="onboard-progress">
          ${[0,1,2,3,4].map(i => `<div class="onboard-dot ${i <= _step ? 'active' : ''}"></div>`).join('')}
        </div>
        ${steps[_step]}
      </div>
    `;
  }

  function _stepWelcome(name) {
    return `
      <div class="onboard-step">
        <div class="onboard-emoji">&#127881;</div>
        <h2>Welcome, ${name}!</h2>
        <p>Let's personalize your experience in 30 seconds.</p>
        <p class="onboard-sub">We'll recommend the best courses for you.</p>
        <button class="btn btn-primary" onclick="Onboarding.next()">Let's Go</button>
        <button class="btn btn-secondary btn-sm" onclick="Onboarding.hide()" style="margin-top:0.5rem;">Skip for now</button>
      </div>
    `;
  }

  function _stepAge() {
    return `
      <div class="onboard-step">
        <div class="onboard-emoji">&#129489;</div>
        <h2>Who are you?</h2>
        <div class="onboard-options">
          ${AGE_GROUPS.map(ag => `
            <div class="onboard-option ${_selections.ageGroup === ag.id ? 'selected' : ''}" onclick="Onboarding.selectAge('${ag.id}')">
              <span class="onboard-option-icon">${ag.emoji}</span>
              <span>${ag.label}</span>
            </div>
          `).join('')}
        </div>
        <div class="onboard-nav">
          <button class="btn btn-secondary btn-sm" onclick="Onboarding.prev()">Back</button>
          <button class="btn btn-primary btn-sm" onclick="Onboarding.next()" ${!_selections.ageGroup ? 'disabled' : ''}>Next</button>
        </div>
      </div>
    `;
  }

  function _stepInterests() {
    return `
      <div class="onboard-step">
        <div class="onboard-emoji">&#128161;</div>
        <h2>What interests you?</h2>
        <p class="onboard-sub">Pick 2-3 topics (or more!)</p>
        <div class="onboard-options onboard-grid">
          ${INTERESTS.map(i => `
            <div class="onboard-option ${_selections.interests.includes(i.id) ? 'selected' : ''}" onclick="Onboarding.toggleInterest('${i.id}')">
              <span class="onboard-option-icon">${i.icon}</span>
              <span>${i.label}</span>
            </div>
          `).join('')}
        </div>
        <div class="onboard-nav">
          <button class="btn btn-secondary btn-sm" onclick="Onboarding.prev()">Back</button>
          <button class="btn btn-primary btn-sm" onclick="Onboarding.next()" ${_selections.interests.length === 0 ? 'disabled' : ''}>Next</button>
        </div>
      </div>
    `;
  }

  function _stepGoal() {
    return `
      <div class="onboard-step">
        <div class="onboard-emoji">&#127919;</div>
        <h2>What's your main goal?</h2>
        <div class="onboard-options">
          ${GOALS.map(g => `
            <div class="onboard-option ${_selections.goal === g.id ? 'selected' : ''}" onclick="Onboarding.selectGoal('${g.id}')">
              <span class="onboard-option-icon">${g.icon}</span>
              <span>${g.label}</span>
            </div>
          `).join('')}
        </div>
        <div class="onboard-nav">
          <button class="btn btn-secondary btn-sm" onclick="Onboarding.prev()">Back</button>
          <button class="btn btn-primary btn-sm" onclick="Onboarding.next()" ${!_selections.goal ? 'disabled' : ''}>See My Courses</button>
        </div>
      </div>
    `;
  }

  function _stepRecommendations() {
    const recs = getRecommendations();
    return `
      <div class="onboard-step">
        <div class="onboard-emoji">&#11088;</div>
        <h2>Your Personalized Picks</h2>
        <p class="onboard-sub">We picked these just for you</p>
        <div class="onboard-recs">
          ${recs.slice(0, 5).map(course => {
            const cat = CATEGORIES.find(c => c.id === course.category);
            const isFree = Auth.isCourseFree(course.id);
            return `
              <div class="onboard-rec" onclick="Onboarding.hide();openCourse(${course.id});">
                <span class="onboard-rec-icon">${cat ? cat.icon : ''}</span>
                <div class="onboard-rec-info">
                  <strong>${course.title}</strong>
                  <span>${course.level} &middot; ${course.duration}</span>
                </div>
                ${isFree ? '<span class="free-badge" style="position:static;">Free</span>' : ''}
              </div>
            `;
          }).join('')}
        </div>
        <button class="btn btn-primary" onclick="Onboarding.hide()">Start Learning</button>
      </div>
    `;
  }

  function getRecommendations() {
    let scored = COURSES.map(course => {
      let score = 0;
      if (_selections.interests.includes(course.category)) score += 10;
      if (Auth.isCourseFree(course.id)) score += 3;
      if (course.level === 'Beginner') score += 2;
      if (_selections.ageGroup === 'kid' && course.level === 'Beginner') score += 3;
      if (_selections.ageGroup === 'parent' && course.category === 'family') score += 5;
      if (_selections.goal === 'reduce' && (course.category === 'phone' || course.category === 'habits')) score += 4;
      if (_selections.goal === 'understand' && course.category === 'understanding') score += 4;
      if (_selections.goal === 'family' && course.category === 'family') score += 4;
      if (_selections.goal === 'focus' && course.category === 'focus') score += 4;
      if (_selections.goal === 'balance' && (course.category === 'mindfulness' || course.category === 'creative')) score += 4;
      return { ...course, _score: score };
    });
    scored.sort((a, b) => b._score - a._score);
    return scored;
  }

  function selectAge(id) { _selections.ageGroup = id; _render(); }
  function selectGoal(id) { _selections.goal = id; _render(); }
  function toggleInterest(id) {
    const idx = _selections.interests.indexOf(id);
    if (idx >= 0) _selections.interests.splice(idx, 1);
    else _selections.interests.push(id);
    _render();
  }
  function next() { _step = Math.min(_step + 1, 4); _render(); }
  function prev() { _step = Math.max(_step - 1, 0); _render(); }

  return {
    shouldShow, show, hide, next, prev,
    selectAge, selectGoal, toggleInterest, getRecommendations,
    markComplete
  };
})();
