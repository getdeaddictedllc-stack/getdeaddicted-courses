// ===== GETDEADDICTED ACADEMY — PARENT DASHBOARD =====
// Shows children's progress, streaks, badges, and activity

const Dashboard = (() => {

  function show() {
    const user = Auth.getCurrentUser();
    if (!user) {
      showAuthModal('login', 'Log in to view your dashboard');
      return;
    }

    const section = document.getElementById('dashboardSection');
    if (!section) return;

    // Hide other sections, show dashboard
    document.querySelectorAll('.section, .hero, .footer').forEach(el => el.style.display = 'none');
    section.style.display = 'block';
    section.innerHTML = _buildDashboard(user);
    window.scrollTo(0, 0);
  }

  function hide() {
    const section = document.getElementById('dashboardSection');
    if (section) section.style.display = 'none';
    document.querySelectorAll('.section, .hero, .footer').forEach(el => el.style.display = '');
  }

  function _buildDashboard(user) {
    const stats = Progress.getStats();
    const childrenStats = Progress.getChildrenStats(user);
    const allBadges = Progress.getAllBadges();

    return `
      <div class="dashboard">
        <div class="dash-header">
          <div class="dash-header-left">
            <h2>Parent Dashboard</h2>
            <p class="dash-welcome">Welcome back, ${_esc(user.name)}</p>
            <span class="dash-plan-badge ${Auth.isPaid() ? 'premium' : 'free'}">${Auth.isPaid() ? 'Premium' : 'Free Plan'}</span>
          </div>
          <div class="dash-header-right">
            <button class="btn btn-secondary btn-sm" onclick="Dashboard.hide()">Back to Courses</button>
            ${!Auth.isPaid() ? '<button class="btn btn-primary btn-sm" onclick="Paywall.showPaywall()">Upgrade</button>' : ''}
          </div>
        </div>

        <!-- Family Overview -->
        <div class="dash-stats-grid">
          <div class="dash-stat-card">
            <div class="dash-stat-num">${stats.coursesCompleted}</div>
            <div class="dash-stat-label">Courses Done</div>
          </div>
          <div class="dash-stat-card">
            <div class="dash-stat-num">${stats.currentStreak}</div>
            <div class="dash-stat-label">Day Streak</div>
          </div>
          <div class="dash-stat-card">
            <div class="dash-stat-num">${stats.badgesEarned}</div>
            <div class="dash-stat-label">Badges</div>
          </div>
          <div class="dash-stat-card">
            <div class="dash-stat-num">${Math.round(stats.totalTimeMinutes)}</div>
            <div class="dash-stat-label">Minutes</div>
          </div>
        </div>

        <!-- Children Section -->
        ${user.children.length > 0 ? `
          <div class="dash-section">
            <h3>Your Children</h3>
            <div class="dash-children">
              ${childrenStats.map(cs => _buildChildCard(cs)).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Family Leaderboard -->
        ${user.children.length > 1 ? `
          <div class="dash-section">
            <h3>Family Leaderboard</h3>
            <div class="dash-leaderboard">
              ${_buildLeaderboard(childrenStats)}
            </div>
          </div>
        ` : ''}

        <!-- Referral -->
        <div class="dash-section">
          <h3>Refer & Earn</h3>
          <div class="dash-referral-cta">
            <p>Share GetDeaddicted Academy with friends. Give a month, get a month free!</p>
            <button class="btn btn-primary btn-sm" onclick="Referral.showReferralPanel()">Get My Referral Code</button>
          </div>
        </div>

        <!-- Add Child -->
        <div class="dash-section">
          <h3>${user.children.length > 0 ? 'Add Another Child' : 'Add Your Child'}</h3>
          <form class="dash-add-child" onsubmit="Dashboard.addChild(event)">
            <input type="text" id="childName" placeholder="Child's name" required maxlength="30">
            <input type="number" id="childAge" placeholder="Age" min="3" max="18" required>
            <select id="childColor">
              <option value="#6ee7b7">Teal</option>
              <option value="#60a5fa">Blue</option>
              <option value="#f472b6">Pink</option>
              <option value="#fbbf24">Yellow</option>
              <option value="#a78bfa">Purple</option>
              <option value="#fb923c">Orange</option>
            </select>
            <button type="submit" class="btn btn-primary btn-sm">Add Child</button>
          </form>
        </div>

        <!-- Badges -->
        <div class="dash-section">
          <h3>Badges & Achievements</h3>
          <div class="dash-badges">
            ${allBadges.map(b => `
              <div class="dash-badge ${b.earned ? 'earned' : 'locked'}">
                <span class="dash-badge-icon">${b.icon}</span>
                <span class="dash-badge-name">${b.name}</span>
                <span class="dash-badge-desc">${b.desc}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Course Progress -->
        <div class="dash-section">
          <h3>Course Progress</h3>
          <div class="dash-course-progress">
            ${_buildCourseProgressList()}
          </div>
        </div>

        <!-- Account -->
        <div class="dash-section">
          <h3>Account</h3>
          <div class="dash-account-info">
            <p><strong>Email:</strong> ${_esc(user.email)}</p>
            <p><strong>Plan:</strong> ${Auth.isPaid() ? user.plan : 'Free (5 courses)'}</p>
            <p><strong>Member since:</strong> ${new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="Auth.logout();location.reload();">Log Out</button>
        </div>
      </div>
    `;
  }

  function _buildChildCard(cs) {
    const recentNames = cs.recentCourses.map(id => {
      const course = COURSES.find(c => c.id === id);
      return course ? course.title : 'Course ' + id;
    });

    return `
      <div class="dash-child-card" style="--child-color: ${cs.child.avatarColor}">
        <div class="dash-child-avatar" style="background: ${cs.child.avatarColor}">${cs.child.name[0].toUpperCase()}</div>
        <div class="dash-child-info">
          <h4>${_esc(cs.child.name)} <span class="dash-child-age">Age ${cs.child.age}</span></h4>
          <div class="dash-child-stats">
            <span>${cs.coursesCompleted} courses</span>
            <span>${cs.currentStreak} day streak</span>
            <span>${cs.earnedBadges.length} badges</span>
          </div>
          ${cs.lastActive ? `<p class="dash-child-last">Last active: ${cs.lastActive}</p>` : '<p class="dash-child-last">Not started yet</p>'}
          ${recentNames.length > 0 ? `<p class="dash-child-recent">Recent: ${recentNames.join(', ')}</p>` : ''}
          <button class="btn btn-secondary btn-xs" onclick="Auth.loginAsChild('${cs.child.id}');location.reload();">Switch to ${_esc(cs.child.name)}</button>
        </div>
      </div>
    `;
  }

  function _buildLeaderboard(childrenStats) {
    const sorted = [...childrenStats].sort((a, b) => {
      if (b.coursesCompleted !== a.coursesCompleted) return b.coursesCompleted - a.coursesCompleted;
      return b.currentStreak - a.currentStreak;
    });

    const medals = ['&#129351;', '&#129352;', '&#129353;'];
    return `<div class="leaderboard-list">
      ${sorted.map((cs, i) => `
        <div class="leaderboard-row ${i === 0 ? 'leader' : ''}">
          <span class="leaderboard-rank">${i < 3 ? medals[i] : (i + 1)}</span>
          <span class="leaderboard-avatar" style="background:${cs.child.avatarColor}">${cs.child.name[0].toUpperCase()}</span>
          <span class="leaderboard-name">${_esc(cs.child.name)}</span>
          <span class="leaderboard-score">${cs.coursesCompleted} courses</span>
          <span class="leaderboard-streak">${cs.currentStreak}d streak</span>
        </div>
      `).join('')}
    </div>`;
  }

  function _buildCourseProgressList() {
    const p = Progress.get();
    const started = Object.keys(p.courseProgress);
    if (started.length === 0) return '<p class="dash-empty">No courses started yet. Go explore!</p>';

    return started.map(id => {
      const course = COURSES.find(c => c.id === Number(id));
      if (!course) return '';
      const pct = Progress.getCoursePercent(course.id);
      const completed = p.completedCourses.includes(course.id);
      return `
        <div class="dash-course-item ${completed ? 'completed' : ''}">
          <div class="dash-course-title">${course.title}</div>
          <div class="dash-course-bar-track">
            <div class="dash-course-bar-fill" style="width:${pct}%"></div>
          </div>
          <span class="dash-course-pct">${completed ? 'Done' : pct + '%'}</span>
        </div>
      `;
    }).join('');
  }

  function addChild(e) {
    e.preventDefault();
    const name = document.getElementById('childName').value.trim();
    const age = document.getElementById('childAge').value;
    const color = document.getElementById('childColor').value;
    const user = Auth.getCurrentUser();
    if (!user) return;

    const result = Auth.addChild({ parentId: user.id, name, age, avatarColor: color });
    if (result.ok) {
      show();
      if (typeof showToast === 'function') showToast(`${name} added! Switch to their profile to start learning.`);
    } else {
      if (typeof showToast === 'function') showToast(result.error);
    }
  }

  function _esc(str) {
    const el = document.createElement('span');
    el.textContent = str;
    return el.innerHTML;
  }

  return { show, hide, addChild };
})();
