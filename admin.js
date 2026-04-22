// ===== GETDEADDICTED ACADEMY — ADMIN DASHBOARD =====
// Revenue metrics, user funnel, course engagement, A/B testing, feature flags

const Admin = (() => {
  const ADMIN_PIN = '999999';
  const FLAGS_KEY = 'gda_feature_flags';
  const AB_KEY = 'gda_ab_tests';

  function isAdmin() {
    try { return localStorage.getItem('gda_admin') === 'true'; } catch { return false; }
  }

  function login(pin) {
    if (pin === ADMIN_PIN) {
      localStorage.setItem('gda_admin', 'true');
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem('gda_admin');
  }

  // --- Feature Flags ---
  function getFlags() {
    try { return JSON.parse(localStorage.getItem(FLAGS_KEY)) || _defaultFlags(); }
    catch { return _defaultFlags(); }
  }

  function _defaultFlags() {
    return {
      ai_coach_enabled: true,
      referral_enabled: true,
      classroom_enabled: true,
      email_popup_enabled: true,
      free_course_count: 5,
      paywall_position: 'course_3',
      show_comparison_table: true,
      enable_notifications: true
    };
  }

  function setFlag(key, value) {
    const flags = getFlags();
    flags[key] = value;
    localStorage.setItem(FLAGS_KEY, JSON.stringify(flags));
  }

  function getFlag(key) {
    return getFlags()[key];
  }

  // --- A/B Testing ---
  function getABVariant(testName) {
    try {
      const tests = JSON.parse(localStorage.getItem(AB_KEY)) || {};
      if (tests[testName]) return tests[testName];
      const variant = Math.random() < 0.5 ? 'A' : 'B';
      tests[testName] = variant;
      localStorage.setItem(AB_KEY, JSON.stringify(tests));
      return variant;
    } catch { return 'A'; }
  }

  function getABResults() {
    try { return JSON.parse(localStorage.getItem(AB_KEY)) || {}; } catch { return {}; }
  }

  // --- Dashboard ---
  function showDashboard() {
    if (!isAdmin()) {
      _showLoginPrompt();
      return;
    }

    const section = document.getElementById('dashboardSection');
    if (!section) return;
    document.querySelectorAll('.section, .hero, .footer').forEach(el => el.style.display = 'none');
    section.style.display = 'block';
    section.innerHTML = _buildAdminDashboard();
    window.scrollTo(0, 0);
  }

  function _showLoginPrompt() {
    const pin = prompt('Admin PIN:');
    if (pin && login(pin)) {
      showDashboard();
    } else {
      if (typeof showToast === 'function') showToast('Invalid admin PIN');
    }
  }

  function _buildAdminDashboard() {
    const metrics = typeof Analytics !== 'undefined' ? Analytics.getMetrics() : {};
    const flags = getFlags();
    const subs = typeof EmailCapture !== 'undefined' ? EmailCapture.getSubscriberCount() : 0;
    const users = _getUserCount();
    const revenue = _estimateRevenue();
    const abTests = getABResults();

    return `
      <div class="dashboard admin-dashboard">
        <div class="dash-header">
          <div class="dash-header-left">
            <h2>Admin Dashboard</h2>
            <span class="dash-plan-badge premium">Admin</span>
          </div>
          <div class="dash-header-right">
            <button class="btn btn-secondary btn-sm" onclick="Dashboard.hide()">Back</button>
            <button class="btn btn-secondary btn-sm" onclick="Admin.logout();Dashboard.hide();">Logout</button>
          </div>
        </div>

        <!-- Revenue Metrics -->
        <div class="dash-section">
          <h3>Revenue & Growth</h3>
          <div class="dash-stats-grid" style="grid-template-columns:repeat(auto-fit,minmax(120px,1fr));">
            <div class="dash-stat-card"><div class="dash-stat-num">${users.total}</div><div class="dash-stat-label">Total Users</div></div>
            <div class="dash-stat-card"><div class="dash-stat-num">${users.paid}</div><div class="dash-stat-label">Paid Users</div></div>
            <div class="dash-stat-card"><div class="dash-stat-num">$${revenue.mrr}</div><div class="dash-stat-label">Est. MRR</div></div>
            <div class="dash-stat-card"><div class="dash-stat-num">${subs}</div><div class="dash-stat-label">Email Subs</div></div>
            <div class="dash-stat-card"><div class="dash-stat-num">${revenue.conversionRate}%</div><div class="dash-stat-label">Conversion</div></div>
            <div class="dash-stat-card"><div class="dash-stat-num">${users.teachers}</div><div class="dash-stat-label">Teachers</div></div>
          </div>
        </div>

        <!-- Funnel -->
        <div class="dash-section">
          <h3>Funnel Metrics</h3>
          <div class="admin-funnel">
            <div class="funnel-step"><span class="funnel-num">${metrics.signups || 0}</span><span>Signups</span></div>
            <div class="funnel-arrow">&#8594;</div>
            <div class="funnel-step"><span class="funnel-num">${metrics.courseStarts || 0}</span><span>Course Starts</span></div>
            <div class="funnel-arrow">&#8594;</div>
            <div class="funnel-step"><span class="funnel-num">${metrics.courseCompletes || 0}</span><span>Completions</span></div>
            <div class="funnel-arrow">&#8594;</div>
            <div class="funnel-step"><span class="funnel-num">${metrics.paywallViews || 0}</span><span>Paywall Views</span></div>
            <div class="funnel-arrow">&#8594;</div>
            <div class="funnel-step"><span class="funnel-num">${metrics.paywallConversions || 0}</span><span>Conversions</span></div>
          </div>
          <p style="color:#64748b;font-size:0.75rem;margin-top:0.5rem;">Completion rate: ${metrics.completionRate || 0}% | Paywall conversion: ${metrics.paywallConversionRate || 0}%</p>
        </div>

        <!-- Feature Flags -->
        <div class="dash-section">
          <h3>Feature Flags</h3>
          <div class="admin-flags">
            ${Object.entries(flags).map(([key, val]) => `
              <div class="admin-flag-row">
                <span>${key.replace(/_/g, ' ')}</span>
                ${typeof val === 'boolean' ?
                  `<label class="toggle-switch"><input type="checkbox" ${val ? 'checked' : ''} onchange="Admin.setFlag('${key}',this.checked)"><span class="toggle-slider"></span></label>` :
                  `<input type="text" value="${val}" onchange="Admin.setFlag('${key}',this.value)" style="width:80px;padding:0.3rem;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:#1a1a2e;color:#e0e0e0;font-size:0.8rem;">`
                }
              </div>
            `).join('')}
          </div>
        </div>

        <!-- A/B Tests -->
        <div class="dash-section">
          <h3>A/B Test Assignments</h3>
          ${Object.keys(abTests).length === 0 ? '<p class="dash-empty">No active A/B tests</p>' :
            `<div class="admin-ab-list">
              ${Object.entries(abTests).map(([test, variant]) =>
                `<div class="admin-ab-row"><span>${test}</span><span class="admin-ab-variant">${variant}</span></div>`
              ).join('')}
            </div>`
          }
        </div>

        <!-- Event Log -->
        <div class="dash-section">
          <h3>Recent Events (last 20)</h3>
          <div class="admin-event-log">
            ${typeof Analytics !== 'undefined' ? Analytics.getEvents(null, 20).reverse().map(e => `
              <div class="admin-event-row">
                <span class="admin-event-name">${e.event}</span>
                <span class="admin-event-time">${new Date(e.properties.timestamp).toLocaleTimeString()}</span>
              </div>
            `).join('') || '<p class="dash-empty">No events</p>' : '<p class="dash-empty">Analytics not loaded</p>'}
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="dash-section">
          <h3>Quick Actions</h3>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <button class="btn btn-secondary btn-sm" onclick="localStorage.clear();location.reload();">Clear All Data</button>
            <button class="btn btn-secondary btn-sm" onclick="Admin.exportData()">Export Data</button>
            <button class="btn btn-secondary btn-sm" onclick="Admin.generateReport()">Generate Report</button>
          </div>
        </div>
      </div>
    `;
  }

  function _getUserCount() {
    try {
      const users = JSON.parse(localStorage.getItem('gda_users')) || [];
      const paid = users.filter(u => u.plan !== 'free').length;
      const classrooms = JSON.parse(localStorage.getItem('gda_classroom')) || {};
      const teachers = Object.keys(classrooms).length;
      return { total: users.length, paid, teachers };
    } catch { return { total: 0, paid: 0, teachers: 0 }; }
  }

  function _estimateRevenue() {
    const users = _getUserCount();
    const mrr = users.paid * 7.99;
    const conversionRate = users.total > 0 ? Math.round((users.paid / users.total) * 100) : 0;
    return { mrr: mrr.toFixed(0), conversionRate };
  }

  function exportData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('gda_')) {
        try { data[key] = JSON.parse(localStorage.getItem(key)); }
        catch { data[key] = localStorage.getItem(key); }
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `getdeaddicted-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (typeof showToast === 'function') showToast('Data exported!');
  }

  function generateReport() {
    const metrics = typeof Analytics !== 'undefined' ? Analytics.getMetrics() : {};
    const users = _getUserCount();
    const revenue = _estimateRevenue();
    const report = `
GetDeaddicted Academy — Weekly Report
Generated: ${new Date().toLocaleDateString()}

USERS
  Total: ${users.total}
  Paid: ${users.paid}
  Teachers: ${users.teachers}

REVENUE
  MRR: $${revenue.mrr}
  Conversion: ${revenue.conversionRate}%

FUNNEL
  Signups: ${metrics.signups || 0}
  Course Starts: ${metrics.courseStarts || 0}
  Completions: ${metrics.courseCompletes || 0}
  Paywall Views: ${metrics.paywallViews || 0}
  Conversions: ${metrics.paywallConversions || 0}

ENGAGEMENT
  Completion Rate: ${metrics.completionRate || 0}%
  Shares: ${metrics.shares || 0}
  Total Events: ${metrics.totalEvents || 0}
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    if (typeof showToast === 'function') showToast('Report generated!');
  }

  return {
    isAdmin, login, logout,
    getFlags, setFlag, getFlag,
    getABVariant, getABResults,
    showDashboard, exportData, generateReport
  };
})();
