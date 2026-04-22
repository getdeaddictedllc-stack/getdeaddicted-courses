// ===== GETDEADDICTED ACADEMY — AFFILIATE / PARTNER PROGRAM =====
// Tracking system for pediatricians, therapists, schools, and influencers

const Affiliate = (() => {
  const STORAGE_KEY = 'gda_affiliates';
  const COOKIE_KEY = 'gda_aff_ref';

  const TIERS = {
    standard: { name: 'Standard', commission: 20, description: '20% recurring commission' },
    professional: { name: 'Professional', commission: 30, description: '30% recurring for verified professionals' },
    enterprise: { name: 'Enterprise', commission: 25, description: '25% + custom landing page for institutions' }
  };

  const PARTNER_TYPES = [
    { id: 'pediatrician', label: 'Pediatrician / Doctor', tier: 'professional', icon: '&#129658;' },
    { id: 'therapist', label: 'Therapist / Counselor', tier: 'professional', icon: '&#128106;' },
    { id: 'teacher', label: 'Teacher / Educator', tier: 'standard', icon: '&#128218;' },
    { id: 'school', label: 'School / District', tier: 'enterprise', icon: '&#127979;' },
    { id: 'influencer', label: 'Content Creator / Influencer', tier: 'standard', icon: '&#127908;' },
    { id: 'blogger', label: 'Blogger / Writer', tier: 'standard', icon: '&#128221;' },
    { id: 'other', label: 'Other', tier: 'standard', icon: '&#11088;' }
  ];

  function _getData() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  }

  function _saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function register({ name, email, type, website, audience }) {
    const data = _getData();
    if (data[email]) return { ok: false, error: 'This email is already registered as an affiliate.' };

    const partnerType = PARTNER_TYPES.find(p => p.id === type) || PARTNER_TYPES[PARTNER_TYPES.length - 1];
    const tier = TIERS[partnerType.tier];
    const code = 'AFF-' + name.substring(0, 3).toUpperCase() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();

    data[email] = {
      name,
      email,
      type,
      website: website || '',
      audience: audience || '',
      tier: partnerType.tier,
      code,
      clicks: 0,
      signups: 0,
      conversions: 0,
      earnings: 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    _saveData(data);
    return { ok: true, code, tier: tier.name, commission: tier.commission };
  }

  function trackClick(affCode) {
    const data = _getData();
    for (const [email, aff] of Object.entries(data)) {
      if (aff.code === affCode) {
        aff.clicks = (aff.clicks || 0) + 1;
        _saveData(data);
        localStorage.setItem(COOKIE_KEY, affCode);
        if (typeof Analytics !== 'undefined') Analytics.track('affiliate_click', { code: affCode });
        return true;
      }
    }
    return false;
  }

  function trackSignup() {
    const affCode = localStorage.getItem(COOKIE_KEY);
    if (!affCode) return;
    const data = _getData();
    for (const [email, aff] of Object.entries(data)) {
      if (aff.code === affCode) {
        aff.signups = (aff.signups || 0) + 1;
        _saveData(data);
        if (typeof Analytics !== 'undefined') Analytics.track('affiliate_signup', { code: affCode });
        return;
      }
    }
  }

  function trackConversion(amount) {
    const affCode = localStorage.getItem(COOKIE_KEY);
    if (!affCode) return;
    const data = _getData();
    for (const [email, aff] of Object.entries(data)) {
      if (aff.code === affCode) {
        aff.conversions = (aff.conversions || 0) + 1;
        const tier = TIERS[aff.tier] || TIERS.standard;
        const commission = (amount * tier.commission) / 100;
        aff.earnings = (aff.earnings || 0) + commission;
        _saveData(data);
        if (typeof Analytics !== 'undefined') Analytics.track('affiliate_conversion', { code: affCode, commission });
        return;
      }
    }
  }

  function getStats(email) {
    const data = _getData();
    const aff = data[email];
    if (!aff) return null;
    const tier = TIERS[aff.tier] || TIERS.standard;
    return {
      ...aff,
      tierName: tier.name,
      commissionRate: tier.commission,
      conversionRate: aff.clicks > 0 ? Math.round((aff.conversions / aff.clicks) * 100) : 0,
      shareUrl: `https://academy.getdeaddicted.com?aff=${aff.code}`
    };
  }

  function checkUrlAffiliate() {
    const params = new URLSearchParams(window.location.search);
    const aff = params.get('aff');
    if (aff) {
      trackClick(aff);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  // --- Partner Portal UI ---
  function showPortal() {
    const section = document.getElementById('dashboardSection');
    if (!section) return;
    document.querySelectorAll('.section, .hero, .footer').forEach(el => el.style.display = 'none');
    section.style.display = 'block';
    section.innerHTML = _buildPortal();
    window.scrollTo(0, 0);
  }

  function _buildPortal() {
    const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
    const stats = user ? getStats(user.email) : null;

    if (stats && stats.status !== 'rejected') {
      return _buildAffiliateDashboard(stats);
    }
    return _buildRegistrationForm();
  }

  function _buildRegistrationForm() {
    return `
      <div class="dashboard">
        <div class="dash-header">
          <div class="dash-header-left">
            <h2>Partner Program</h2>
            <p class="dash-welcome">Earn commission recommending digital wellness</p>
          </div>
          <div class="dash-header-right">
            <button class="btn btn-secondary btn-sm" onclick="Dashboard.hide()">Back</button>
          </div>
        </div>

        <div class="affiliate-benefits">
          <div class="dash-stats-grid">
            <div class="dash-stat-card"><div class="dash-stat-num">20-30%</div><div class="dash-stat-label">Recurring Commission</div></div>
            <div class="dash-stat-card"><div class="dash-stat-num">90 day</div><div class="dash-stat-label">Cookie Window</div></div>
            <div class="dash-stat-card"><div class="dash-stat-num">Monthly</div><div class="dash-stat-label">Payouts</div></div>
            <div class="dash-stat-card"><div class="dash-stat-num">Free</div><div class="dash-stat-label">Marketing Kit</div></div>
          </div>
        </div>

        <div class="dash-section">
          <h3>Join as a Partner</h3>
          <form class="affiliate-form" onsubmit="Affiliate.handleRegister(event)">
            <input type="text" id="affName" placeholder="Your name or practice name" required maxlength="60">
            <input type="email" id="affEmail" placeholder="Email address" required>
            <select id="affType" required>
              <option value="">Select partner type...</option>
              ${PARTNER_TYPES.map(p => `<option value="${p.id}">${p.icon} ${p.label}</option>`).join('')}
            </select>
            <input type="url" id="affWebsite" placeholder="Website (optional)">
            <input type="text" id="affAudience" placeholder="Estimated audience size (optional)" maxlength="30">
            <button type="submit" class="btn btn-primary btn-full">Apply to Partner Program</button>
          </form>
          <p class="affiliate-form-note" id="affMessage"></p>
        </div>

        <div class="dash-section">
          <h3>Commission Tiers</h3>
          <div class="affiliate-tiers">
            ${Object.values(TIERS).map(t => `
              <div class="affiliate-tier-card">
                <h4>${t.name}</h4>
                <div class="dash-stat-num">${t.commission}%</div>
                <p>${t.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function _buildAffiliateDashboard(stats) {
    return `
      <div class="dashboard">
        <div class="dash-header">
          <div class="dash-header-left">
            <h2>Partner Dashboard</h2>
            <p class="dash-welcome">${stats.name}</p>
            <span class="dash-plan-badge premium">${stats.tierName} Partner \u2014 ${stats.commissionRate}%</span>
          </div>
          <div class="dash-header-right">
            <button class="btn btn-secondary btn-sm" onclick="Dashboard.hide()">Back</button>
          </div>
        </div>

        <div class="dash-stats-grid">
          <div class="dash-stat-card"><div class="dash-stat-num">${stats.clicks}</div><div class="dash-stat-label">Link Clicks</div></div>
          <div class="dash-stat-card"><div class="dash-stat-num">${stats.signups}</div><div class="dash-stat-label">Signups</div></div>
          <div class="dash-stat-card"><div class="dash-stat-num">${stats.conversions}</div><div class="dash-stat-label">Conversions</div></div>
          <div class="dash-stat-card"><div class="dash-stat-num">$${stats.earnings.toFixed(2)}</div><div class="dash-stat-label">Total Earnings</div></div>
        </div>

        <div class="dash-section">
          <h3>Your Affiliate Link</h3>
          <div class="referral-code-box">
            <span class="referral-code" style="font-size:0.9rem;">${stats.shareUrl}</span>
            <button class="btn btn-sm btn-secondary" onclick="navigator.clipboard.writeText('${stats.shareUrl}');showToast('Link copied!')">Copy</button>
          </div>
          <p style="color:#64748b;font-size:0.78rem;margin-top:0.5rem;">Code: ${stats.code} \u2014 Conversion rate: ${stats.conversionRate}%</p>
        </div>

        <div class="dash-section">
          <h3>Marketing Materials</h3>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <button class="btn btn-secondary btn-sm" onclick="Affiliate.downloadKit()">Download Marketing Kit</button>
            <button class="btn btn-secondary btn-sm" onclick="Affiliate.getEmailTemplate()">Get Email Template</button>
            <button class="btn btn-secondary btn-sm" onclick="Affiliate.getSocialPosts()">Get Social Posts</button>
          </div>
        </div>
      </div>
    `;
  }

  function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('affName').value.trim();
    const email = document.getElementById('affEmail').value.trim();
    const type = document.getElementById('affType').value;
    const website = document.getElementById('affWebsite').value.trim();
    const audience = document.getElementById('affAudience').value.trim();

    const result = register({ name, email, type, website, audience });
    const msg = document.getElementById('affMessage');
    if (msg) {
      msg.textContent = result.ok
        ? `Application submitted! Your code is ${result.code} (${result.tier}, ${result.commission}% commission)`
        : result.error;
      msg.style.color = result.ok ? '#6ee7b7' : '#f87171';
    }
    if (result.ok) setTimeout(() => showPortal(), 2000);
  }

  function downloadKit() { showToast('Marketing kit download coming soon!'); }
  function getEmailTemplate() { showToast('Email template coming soon!'); }
  function getSocialPosts() { showToast('Social posts coming soon!'); }

  function init() { checkUrlAffiliate(); }

  return {
    register, trackClick, trackSignup, trackConversion,
    getStats, checkUrlAffiliate, showPortal,
    handleRegister, downloadKit, getEmailTemplate, getSocialPosts,
    init, TIERS, PARTNER_TYPES
  };
})();
