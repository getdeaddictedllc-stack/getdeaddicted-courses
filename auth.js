// ===== GETDEADDICTED ACADEMY — USER AUTHENTICATION =====
// Lightweight client-side auth with parent-managed child profiles
// localStorage-backed; ready to swap for Clerk/API backend

const Auth = (() => {
  const STORAGE_KEY = 'gda_users';
  const SESSION_KEY = 'gda_session';
  const FREE_COURSE_IDS = [1, 4, 5, 31, 41];

  function _getUsers() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function _saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  function _getSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
    catch { return null; }
  }

  function _saveSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  function generateId() {
    return 'u_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
  }

  function signup({ name, email, pin, role = 'parent' }) {
    const users = _getUsers();
    if (users.find(u => u.email === email)) {
      return { ok: false, error: 'Account already exists with this email.' };
    }
    const user = {
      id: generateId(),
      name,
      email,
      pin,
      role,
      plan: 'free',
      planExpiry: null,
      children: [],
      createdAt: new Date().toISOString()
    };
    users.push(user);
    _saveUsers(users);
    _saveSession({ userId: user.id, role: user.role });
    return { ok: true, user };
  }

  function addChild({ parentId, name, age, avatarColor = '#6ee7b7' }) {
    const users = _getUsers();
    const parent = users.find(u => u.id === parentId);
    if (!parent) return { ok: false, error: 'Parent not found.' };
    if (parent.children.length >= 4) return { ok: false, error: 'Maximum 4 children per family account.' };

    const child = {
      id: generateId(),
      name,
      age: parseInt(age),
      avatarColor,
      createdAt: new Date().toISOString()
    };
    parent.children.push(child);
    _saveUsers(users);
    return { ok: true, child };
  }

  function login({ email, pin }) {
    const users = _getUsers();
    const user = users.find(u => u.email === email && u.pin === pin);
    if (!user) return { ok: false, error: 'Invalid email or PIN.' };
    _saveSession({ userId: user.id, role: user.role });
    return { ok: true, user };
  }

  function loginAsChild(childId) {
    const session = _getSession();
    if (!session) return { ok: false, error: 'Parent must be logged in.' };
    _saveSession({ ...session, activeChildId: childId });
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function getCurrentUser() {
    const session = _getSession();
    if (!session) return null;
    const users = _getUsers();
    return users.find(u => u.id === session.userId) || null;
  }

  function getActiveChild() {
    const session = _getSession();
    if (!session || !session.activeChildId) return null;
    const user = getCurrentUser();
    if (!user) return null;
    return user.children.find(c => c.id === session.activeChildId) || null;
  }

  function getActiveProfile() {
    return getActiveChild() || getCurrentUser();
  }

  function isLoggedIn() {
    return !!_getSession();
  }

  function isPaid() {
    const user = getCurrentUser();
    if (!user) return false;
    if (user.plan === 'free') return false;
    if (user.planExpiry && new Date(user.planExpiry) < new Date()) {
      user.plan = 'free';
      user.planExpiry = null;
      const users = _getUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx >= 0) { users[idx] = user; _saveUsers(users); }
      return false;
    }
    return true;
  }

  function isCourseFree(courseId) {
    return FREE_COURSE_IDS.includes(courseId);
  }

  function canAccessCourse(courseId) {
    if (isCourseFree(courseId)) return true;
    return isPaid();
  }

  function upgradePlan(plan, expiryDate) {
    const user = getCurrentUser();
    if (!user) return false;
    user.plan = plan;
    user.planExpiry = expiryDate;
    const users = _getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) { users[idx] = user; _saveUsers(users); }
    _saveSession({ userId: user.id, role: user.role, activeChildId: _getSession()?.activeChildId });
    return true;
  }

  function updateUser(updates) {
    const user = getCurrentUser();
    if (!user) return false;
    Object.assign(user, updates);
    const users = _getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) { users[idx] = user; _saveUsers(users); }
    return true;
  }

  return {
    signup, addChild, login, loginAsChild, logout,
    getCurrentUser, getActiveChild, getActiveProfile,
    isLoggedIn, isPaid, isCourseFree, canAccessCourse,
    upgradePlan, updateUser, FREE_COURSE_IDS
  };
})();
