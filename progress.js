// ===== GETDEADDICTED ACADEMY — PROGRESS TRACKING ENGINE =====
// Tracks course completion, streaks, badges, and time spent

const Progress = (() => {
  const STORAGE_KEY = 'gda_progress';

  const BADGES = [
    { id: 'first_course', name: 'First Steps', icon: '&#127793;', desc: 'Complete your first course', check: p => p.completedCourses.length >= 1 },
    { id: 'five_courses', name: 'Knowledge Seeker', icon: '&#128218;', desc: 'Complete 5 courses', check: p => p.completedCourses.length >= 5 },
    { id: 'ten_courses', name: 'Digital Scholar', icon: '&#127891;', desc: 'Complete 10 courses', check: p => p.completedCourses.length >= 10 },
    { id: 'twenty_five', name: 'Halfway Hero', icon: '&#11088;', desc: 'Complete 25 courses', check: p => p.completedCourses.length >= 25 },
    { id: 'all_fifty', name: 'Wellness Master', icon: '&#127942;', desc: 'Complete all 50 courses', check: p => p.completedCourses.length >= 50 },
    { id: 'streak_3', name: 'On a Roll', icon: '&#128293;', desc: '3-day learning streak', check: p => p.currentStreak >= 3 },
    { id: 'streak_7', name: 'Week Warrior', icon: '&#9889;', desc: '7-day learning streak', check: p => p.currentStreak >= 7 },
    { id: 'streak_30', name: 'Monthly Master', icon: '&#128142;', desc: '30-day learning streak', check: p => p.currentStreak >= 30 },
    { id: 'category_complete', name: 'Category Champion', icon: '&#127941;', desc: 'Complete all courses in a category', check: p => _hasCompletedAnyCategory(p) },
    { id: 'quiz_ace', name: 'Quiz Ace', icon: '&#129504;', desc: 'Answer 10 quizzes correctly', check: p => (p.quizCorrect || 0) >= 10 },
    { id: 'explorer', name: 'Explorer', icon: '&#127758;', desc: 'Start courses in 5 different categories', check: p => _categoriesStarted(p) >= 5 },
    { id: 'speed_learner', name: 'Speed Learner', icon: '&#128640;', desc: 'Complete 3 courses in one day', check: p => _coursesCompletedToday(p) >= 3 },
  ];

  function _hasCompletedAnyCategory(p) {
    if (typeof CATEGORIES === 'undefined' || typeof COURSES === 'undefined') return false;
    return CATEGORIES.some(cat => {
      const catCourses = COURSES.filter(c => c.category === cat.id);
      return catCourses.length > 0 && catCourses.every(c => p.completedCourses.includes(c.id));
    });
  }

  function _categoriesStarted(p) {
    if (typeof COURSES === 'undefined') return 0;
    const cats = new Set();
    Object.keys(p.courseProgress || {}).forEach(id => {
      const course = COURSES.find(c => c.id === Number(id));
      if (course) cats.add(course.category);
    });
    return cats.size;
  }

  function _coursesCompletedToday(p) {
    const today = new Date().toISOString().split('T')[0];
    return (p.completionDates || []).filter(d => d.date === today).length;
  }

  function _getProgress(userId) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      return all[userId] || _defaultProgress();
    } catch { return _defaultProgress(); }
  }

  function _saveProgress(userId, progress) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      all[userId] = progress;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch { /* storage full */ }
  }

  function _defaultProgress() {
    return {
      completedCourses: [],
      courseProgress: {},
      completionDates: [],
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      totalTimeMinutes: 0,
      quizCorrect: 0,
      quizTotal: 0,
      earnedBadges: [],
      slideBookmarks: {}
    };
  }

  function _getActiveUserId() {
    if (typeof Auth === 'undefined') return '_anon';
    const child = Auth.getActiveChild();
    if (child) return child.id;
    const user = Auth.getCurrentUser();
    return user ? user.id : '_anon';
  }

  function get() {
    return _getProgress(_getActiveUserId());
  }

  function save(progress) {
    _saveProgress(_getActiveUserId(), progress);
  }

  function getForUser(userId) {
    return _getProgress(userId);
  }

  function updateStreak() {
    const p = get();
    const today = new Date().toISOString().split('T')[0];
    if (p.lastActiveDate === today) return p;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (p.lastActiveDate === yesterday) {
      p.currentStreak++;
    } else if (p.lastActiveDate !== today) {
      p.currentStreak = 1;
    }
    p.longestStreak = Math.max(p.longestStreak, p.currentStreak);
    p.lastActiveDate = today;
    save(p);
    return p;
  }

  function recordSlideView(courseId, slideIndex, totalSlides) {
    const p = get();
    if (!p.courseProgress[courseId]) {
      p.courseProgress[courseId] = { startedAt: new Date().toISOString(), maxSlide: 0, totalSlides };
    }
    const cp = p.courseProgress[courseId];
    cp.maxSlide = Math.max(cp.maxSlide, slideIndex);
    cp.totalSlides = totalSlides;
    cp.lastViewedAt = new Date().toISOString();
    save(p);
    updateStreak();
    return p;
  }

  function completeCourse(courseId) {
    const p = get();
    if (!p.completedCourses.includes(courseId)) {
      p.completedCourses.push(courseId);
      p.completionDates.push({ courseId, date: new Date().toISOString().split('T')[0] });
    }
    if (p.courseProgress[courseId]) {
      p.courseProgress[courseId].completedAt = new Date().toISOString();
    }
    save(p);
    checkBadges();
    return p;
  }

  function recordQuiz(correct) {
    const p = get();
    p.quizTotal = (p.quizTotal || 0) + 1;
    if (correct) p.quizCorrect = (p.quizCorrect || 0) + 1;
    save(p);
    checkBadges();
    return p;
  }

  function addTime(minutes) {
    const p = get();
    p.totalTimeMinutes = (p.totalTimeMinutes || 0) + minutes;
    save(p);
  }

  function getCoursePercent(courseId) {
    const p = get();
    if (p.completedCourses.includes(courseId)) return 100;
    const cp = p.courseProgress[courseId];
    if (!cp || !cp.totalSlides) return 0;
    return Math.round((cp.maxSlide / (cp.totalSlides - 1)) * 100);
  }

  function checkBadges() {
    const p = get();
    let newBadges = [];
    BADGES.forEach(badge => {
      if (!p.earnedBadges.includes(badge.id) && badge.check(p)) {
        p.earnedBadges.push(badge.id);
        newBadges.push(badge);
      }
    });
    if (newBadges.length > 0) {
      save(p);
    }
    return newBadges;
  }

  function getEarnedBadges() {
    const p = get();
    return BADGES.filter(b => p.earnedBadges.includes(b.id));
  }

  function getAllBadges() {
    const p = get();
    return BADGES.map(b => ({ ...b, earned: p.earnedBadges.includes(b.id) }));
  }

  function getStats() {
    const p = get();
    return {
      coursesCompleted: p.completedCourses.length,
      coursesStarted: Object.keys(p.courseProgress).length,
      currentStreak: p.currentStreak,
      longestStreak: p.longestStreak,
      totalTimeMinutes: p.totalTimeMinutes || 0,
      quizCorrect: p.quizCorrect || 0,
      quizTotal: p.quizTotal || 0,
      badgesEarned: p.earnedBadges.length,
      totalBadges: BADGES.length
    };
  }

  function getChildrenStats(parentUser) {
    if (!parentUser || !parentUser.children) return [];
    return parentUser.children.map(child => {
      const cp = _getProgress(child.id);
      return {
        child,
        coursesCompleted: cp.completedCourses.length,
        coursesStarted: Object.keys(cp.courseProgress).length,
        currentStreak: cp.currentStreak,
        longestStreak: cp.longestStreak,
        totalTimeMinutes: cp.totalTimeMinutes || 0,
        lastActive: cp.lastActiveDate,
        earnedBadges: BADGES.filter(b => cp.earnedBadges.includes(b.id)),
        recentCourses: cp.completedCourses.slice(-5).reverse()
      };
    });
  }

  return {
    get, save, getForUser, updateStreak,
    recordSlideView, completeCourse, recordQuiz, addTime,
    getCoursePercent, checkBadges, getEarnedBadges, getAllBadges,
    getStats, getChildrenStats, BADGES
  };
})();
