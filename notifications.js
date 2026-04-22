// ===== GETDEADDICTED ACADEMY — NOTIFICATION CENTER =====
// In-app notification bell with streak reminders, badge alerts, course suggestions

const Notifications = (() => {
  const STORAGE_KEY = 'gda_notifications';
  const MAX_NOTIFICATIONS = 30;

  function _getData(userId) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      return all[userId] || [];
    } catch { return []; }
  }

  function _saveData(userId, notifications) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      all[userId] = notifications.slice(0, MAX_NOTIFICATIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {}
  }

  function _getUserId() {
    if (typeof Auth === 'undefined') return '_anon';
    const child = Auth.getActiveChild();
    if (child) return child.id;
    const user = Auth.getCurrentUser();
    return user ? user.id : '_anon';
  }

  function add(type, title, message, action) {
    const userId = _getUserId();
    const notifications = _getData(userId);
    notifications.unshift({
      id: 'n_' + Date.now().toString(36),
      type,
      title,
      message,
      action: action || null,
      read: false,
      createdAt: new Date().toISOString()
    });
    _saveData(userId, notifications);
    _updateBell();
  }

  function getAll() {
    return _getData(_getUserId());
  }

  function getUnreadCount() {
    return getAll().filter(n => !n.read).length;
  }

  function markRead(notifId) {
    const userId = _getUserId();
    const notifications = _getData(userId);
    const n = notifications.find(x => x.id === notifId);
    if (n) n.read = true;
    _saveData(userId, notifications);
    _updateBell();
  }

  function markAllRead() {
    const userId = _getUserId();
    const notifications = _getData(userId);
    notifications.forEach(n => n.read = true);
    _saveData(userId, notifications);
    _updateBell();
  }

  function clear() {
    _saveData(_getUserId(), []);
    _updateBell();
  }

  // --- Auto-generate notifications based on state ---
  function generateContextual() {
    if (typeof Auth === 'undefined' || !Auth.isLoggedIn()) return;
    const stats = Progress.getStats();
    const notifications = getAll();
    const types = notifications.map(n => n.type);

    // Streak reminder
    if (stats.currentStreak >= 3 && !types.includes('streak_' + stats.currentStreak)) {
      add('streak_' + stats.currentStreak, 'Streak on Fire!',
        `${stats.currentStreak} days in a row! Keep the momentum going.`);
    }

    // Course milestone
    if (stats.coursesCompleted >= 5 && !types.includes('milestone_5')) {
      add('milestone_5', '5 Courses Complete!',
        "You've finished 5 courses. You're building real digital wellness skills!", 'dashboard');
    }
    if (stats.coursesCompleted >= 10 && !types.includes('milestone_10')) {
      add('milestone_10', 'Double Digits!',
        "10 courses done. You're in the top 5% of learners!", 'dashboard');
    }
    if (stats.coursesCompleted >= 25 && !types.includes('milestone_25')) {
      add('milestone_25', 'Halfway Hero!',
        "25 out of 50 courses. You're halfway to mastering digital wellness!", 'dashboard');
    }

    // Suggest next course
    if (stats.coursesCompleted > 0 && stats.coursesCompleted < 50 && !types.includes('suggest_' + stats.coursesCompleted)) {
      const rec = Recommendations.getNext();
      if (rec) {
        add('suggest_' + stats.coursesCompleted, 'Try This Next',
          `Based on your progress, we recommend: "${rec.title}"`, 'course_' + rec.id);
      }
    }

    // Upgrade nudge for free users
    if (!Auth.isPaid() && stats.coursesCompleted >= 3 && !types.includes('upgrade_nudge')) {
      add('upgrade_nudge', 'Loving the courses?',
        'Upgrade to Premium for all 50 courses, certificates, and family features.', 'upgrade');
    }
  }

  // --- UI ---
  function _updateBell() {
    const badge = document.getElementById('notifBadge');
    const count = getUnreadCount();
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  function togglePanel() {
    const panel = document.getElementById('notifPanel');
    if (!panel) return;
    const isActive = panel.classList.contains('active');
    if (!isActive) {
      _renderPanel();
    }
    panel.classList.toggle('active', !isActive);
  }

  function _renderPanel() {
    const panel = document.getElementById('notifPanel');
    if (!panel) return;
    const notifications = getAll();

    panel.innerHTML = `
      <div class="notif-header">
        <strong>Notifications</strong>
        ${notifications.length > 0 ? '<button class="btn btn-xs btn-secondary" onclick="Notifications.markAllRead()">Mark all read</button>' : ''}
      </div>
      <div class="notif-list">
        ${notifications.length === 0 ? '<p class="notif-empty">No notifications yet</p>' :
          notifications.slice(0, 15).map(n => `
            <div class="notif-item ${n.read ? 'read' : 'unread'}" onclick="Notifications.handleAction('${n.id}', '${n.action || ''}')">
              <div class="notif-dot ${n.read ? '' : 'active'}"></div>
              <div class="notif-content">
                <strong>${n.title}</strong>
                <span>${n.message}</span>
                <span class="notif-time">${_timeAgo(n.createdAt)}</span>
              </div>
            </div>
          `).join('')
        }
      </div>
    `;
  }

  function handleAction(notifId, action) {
    markRead(notifId);
    togglePanel();

    if (action === 'dashboard' && typeof Dashboard !== 'undefined') {
      Dashboard.show();
    } else if (action === 'upgrade' && typeof Paywall !== 'undefined') {
      Paywall.showPaywall();
    } else if (action && action.startsWith('course_')) {
      const courseId = parseInt(action.split('_')[1]);
      if (courseId && typeof openCourse === 'function') openCourse(courseId);
    }
  }

  function _timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + 'm ago';
    const hours = Math.floor(mins / 60);
    if (hours < 24) return hours + 'h ago';
    return Math.floor(hours / 24) + 'd ago';
  }

  function init() {
    _updateBell();
    generateContextual();
  }

  return {
    add, getAll, getUnreadCount, markRead, markAllRead, clear,
    generateContextual, togglePanel, handleAction, init
  };
})();
