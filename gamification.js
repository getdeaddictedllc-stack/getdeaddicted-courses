// ===== GETDEADDICTED ACADEMY — XP & GAMIFICATION ENGINE =====
// XP points, levels, daily challenges, achievements, streak multipliers

const Gamification = (() => {
  const STORAGE_KEY = 'gda_xp';

  const XP_ACTIONS = {
    slide_view: 2,
    quiz_correct: 15,
    quiz_attempt: 5,
    exercise_done: 20,
    reflection_done: 10,
    course_complete: 100,
    module_complete: 25,
    daily_login: 10,
    streak_bonus: 5,         // per day in streak
    first_course: 50,
    share_certificate: 30,
    referral_sent: 50,
    challenge_complete: 40
  };

  const LEVELS = [
    { level: 1, name: 'Screen Newbie', xpNeeded: 0, color: '#94a3b8' },
    { level: 2, name: 'Awareness Spark', xpNeeded: 50, color: '#6ee7b7' },
    { level: 3, name: 'Digital Explorer', xpNeeded: 150, color: '#60a5fa' },
    { level: 4, name: 'Habit Builder', xpNeeded: 350, color: '#a78bfa' },
    { level: 5, name: 'Focus Fighter', xpNeeded: 600, color: '#f472b6' },
    { level: 6, name: 'Wellness Warrior', xpNeeded: 1000, color: '#fbbf24' },
    { level: 7, name: 'Balance Master', xpNeeded: 1500, color: '#34d399' },
    { level: 8, name: 'Screen Sage', xpNeeded: 2200, color: '#f0abfc' },
    { level: 9, name: 'Digital Champion', xpNeeded: 3000, color: '#fb923c' },
    { level: 10, name: 'Wellness Legend', xpNeeded: 4000, color: '#22d3ee' },
    { level: 11, name: 'Academy Master', xpNeeded: 5500, color: '#e879f9' },
    { level: 12, name: 'Grandmaster', xpNeeded: 7500, color: '#ef4444' }
  ];

  const DAILY_CHALLENGES = [
    { id: 'complete_slide_20', text: 'View 20 slides today', target: 20, action: 'slide_view', xp: 40 },
    { id: 'quiz_3', text: 'Answer 3 quizzes correctly', target: 3, action: 'quiz_correct', xp: 45 },
    { id: 'start_new', text: 'Start a new course', target: 1, action: 'course_start', xp: 30 },
    { id: 'complete_course', text: 'Complete a course', target: 1, action: 'course_complete', xp: 100 },
    { id: 'streak_3', text: 'Maintain a 3+ day streak', target: 3, action: 'streak_check', xp: 35 },
    { id: 'explore_category', text: 'View courses in 3 categories', target: 3, action: 'category_view', xp: 30 },
    { id: 'slide_50', text: 'View 50 slides today', target: 50, action: 'slide_view', xp: 60 },
    { id: 'reflect', text: 'Complete 2 reflection exercises', target: 2, action: 'reflection_done', xp: 40 },
    { id: 'share', text: 'Share an achievement', target: 1, action: 'share', xp: 35 },
    { id: 'complete_2', text: 'Complete 2 courses', target: 2, action: 'course_complete', xp: 150 }
  ];

  function _getUserId() {
    if (typeof Auth !== 'undefined') {
      const child = Auth.getActiveChild();
      if (child) return child.id;
      const user = Auth.getCurrentUser();
      return user ? user.id : '_anon';
    }
    return '_anon';
  }

  function _getData() {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      return all[_getUserId()] || _defaultData();
    } catch { return _defaultData(); }
  }

  function _saveData(data) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      all[_getUserId()] = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {}
  }

  function _defaultData() {
    return {
      totalXP: 0,
      xpHistory: [],
      dailyChallengeId: null,
      dailyChallengeDate: null,
      dailyChallengeProgress: 0,
      dailyChallengesCompleted: 0,
      todayActions: {}
    };
  }

  function awardXP(action, extra = 0) {
    const points = (XP_ACTIONS[action] || 0) + extra;
    if (points <= 0) return 0;

    const data = _getData();
    const streakMultiplier = _getStreakMultiplier();
    const earned = Math.round(points * streakMultiplier);

    data.totalXP += earned;
    data.xpHistory.push({ action, points: earned, time: Date.now() });
    if (data.xpHistory.length > 200) data.xpHistory = data.xpHistory.slice(-200);

    // Track daily actions
    const today = new Date().toISOString().split('T')[0];
    if (!data.todayActions._date || data.todayActions._date !== today) {
      data.todayActions = { _date: today };
    }
    data.todayActions[action] = (data.todayActions[action] || 0) + 1;

    _saveData(data);
    _checkDailyChallenge(data, action);
    _showXPPopup(earned, action);

    // Check for level up
    const oldLevel = _getLevelForXP(data.totalXP - earned);
    const newLevel = _getLevelForXP(data.totalXP);
    if (newLevel.level > oldLevel.level) {
      _showLevelUp(newLevel);
    }

    _updateXPBar();
    return earned;
  }

  function _getStreakMultiplier() {
    if (typeof Progress === 'undefined') return 1;
    const stats = Progress.getStats();
    if (stats.currentStreak >= 30) return 2.0;
    if (stats.currentStreak >= 14) return 1.5;
    if (stats.currentStreak >= 7) return 1.3;
    if (stats.currentStreak >= 3) return 1.1;
    return 1.0;
  }

  function getXP() { return _getData().totalXP; }

  function getLevel() { return _getLevelForXP(_getData().totalXP); }

  function _getLevelForXP(xp) {
    let current = LEVELS[0];
    for (const lvl of LEVELS) {
      if (xp >= lvl.xpNeeded) current = lvl;
      else break;
    }
    return current;
  }

  function getNextLevel() {
    const data = _getData();
    const current = _getLevelForXP(data.totalXP);
    const next = LEVELS.find(l => l.level === current.level + 1);
    if (!next) return null;
    return {
      ...next,
      xpRemaining: next.xpNeeded - data.totalXP,
      progress: Math.round(((data.totalXP - current.xpNeeded) / (next.xpNeeded - current.xpNeeded)) * 100)
    };
  }

  // --- Daily Challenges ---
  function getDailyChallenge() {
    const data = _getData();
    const today = new Date().toISOString().split('T')[0];

    if (data.dailyChallengeDate === today && data.dailyChallengeId) {
      const challenge = DAILY_CHALLENGES.find(c => c.id === data.dailyChallengeId);
      return challenge ? { ...challenge, progress: data.dailyChallengeProgress, completed: data.dailyChallengeProgress >= challenge.target } : null;
    }

    // New day, new challenge
    const hash = today.split('-').reduce((a, b) => a + parseInt(b), 0);
    const challenge = DAILY_CHALLENGES[hash % DAILY_CHALLENGES.length];
    data.dailyChallengeId = challenge.id;
    data.dailyChallengeDate = today;
    data.dailyChallengeProgress = 0;
    _saveData(data);
    return { ...challenge, progress: 0, completed: false };
  }

  function _checkDailyChallenge(data, action) {
    const challenge = getDailyChallenge();
    if (!challenge || challenge.completed) return;
    if (challenge.action === action || (challenge.action === 'streak_check' && action === 'daily_login')) {
      data.dailyChallengeProgress = (data.dailyChallengeProgress || 0) + 1;
      if (data.dailyChallengeProgress >= challenge.target) {
        data.dailyChallengesCompleted = (data.dailyChallengesCompleted || 0) + 1;
        awardXP('challenge_complete');
        if (typeof showToast === 'function') showToast('Daily challenge complete! +' + challenge.xp + ' XP');
      }
      _saveData(data);
    }
  }

  // --- UI ---
  function _showXPPopup(xp, action) {
    const popup = document.createElement('div');
    popup.className = 'xp-popup';
    popup.textContent = '+' + xp + ' XP';
    document.body.appendChild(popup);
    setTimeout(() => { popup.classList.add('fade'); setTimeout(() => popup.remove(), 500); }, 1500);
  }

  function _showLevelUp(level) {
    if (typeof showToast === 'function') {
      showToast(`LEVEL UP! You're now ${level.name} (Level ${level.level})!`);
    }
    if (typeof Legal !== 'undefined') Legal.announce('Level up! You reached level ' + level.level);
  }

  function _updateXPBar() {
    const bar = document.getElementById('xpBar');
    if (!bar) return;
    const level = getLevel();
    const next = getNextLevel();
    const data = _getData();

    if (next) {
      bar.innerHTML = `
        <div class="xp-bar-info">
          <span class="xp-level" style="color:${level.color}">Lv.${level.level} ${level.name}</span>
          <span class="xp-total">${data.totalXP} XP</span>
        </div>
        <div class="xp-bar-track">
          <div class="xp-bar-fill" style="width:${next.progress}%;background:${level.color}"></div>
        </div>
        <span class="xp-next">${next.xpRemaining} XP to ${next.name}</span>
      `;
    } else {
      bar.innerHTML = `
        <div class="xp-bar-info">
          <span class="xp-level" style="color:${level.color}">MAX LEVEL: ${level.name}</span>
          <span class="xp-total">${data.totalXP} XP</span>
        </div>
      `;
    }
  }

  function renderDailyChallenge() {
    const container = document.getElementById('dailyChallenge');
    if (!container) return;
    if (typeof Auth === 'undefined' || !Auth.isLoggedIn()) { container.style.display = 'none'; return; }

    const challenge = getDailyChallenge();
    if (!challenge) { container.style.display = 'none'; return; }

    container.style.display = 'block';
    const pct = Math.min(100, Math.round((challenge.progress / challenge.target) * 100));
    container.innerHTML = `
      <div class="daily-challenge ${challenge.completed ? 'done' : ''}">
        <span class="daily-icon">${challenge.completed ? '&#10003;' : '&#9889;'}</span>
        <div class="daily-info">
          <strong>Daily Challenge</strong>
          <span>${challenge.text}</span>
          <div class="daily-bar"><div class="daily-fill" style="width:${pct}%"></div></div>
        </div>
        <span class="daily-xp">+${challenge.xp} XP</span>
      </div>
    `;
  }

  function init() {
    _updateXPBar();
    renderDailyChallenge();
    // Daily login XP
    if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
      const data = _getData();
      const today = new Date().toISOString().split('T')[0];
      if (!data.todayActions?._date || data.todayActions._date !== today) {
        awardXP('daily_login');
      }
    }
  }

  return {
    awardXP, getXP, getLevel, getNextLevel,
    getDailyChallenge, renderDailyChallenge,
    init, XP_ACTIONS, LEVELS
  };
})();
