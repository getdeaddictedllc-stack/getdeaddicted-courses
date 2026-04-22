// ===== GETDEADDICTED ACADEMY — LEGAL, PRIVACY & ACCESSIBILITY =====
// Cookie consent, privacy policy, terms, COPPA compliance, a11y helpers

const Legal = (() => {
  const CONSENT_KEY = 'gda_consent';

  // --- Cookie Consent ---
  function showConsentBanner() {
    if (_hasConsent()) return;
    const banner = document.createElement('div');
    banner.id = 'cookieConsent';
    banner.className = 'consent-banner';
    banner.innerHTML = `
      <div class="consent-content">
        <p>We use localStorage to save your progress and preferences. No cookies, no tracking, no data sold. <a href="#" onclick="Legal.showPrivacy();return false;">Privacy Policy</a></p>
        <div class="consent-actions">
          <button class="btn btn-primary btn-sm" onclick="Legal.acceptConsent()">Got It</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
  }

  function acceptConsent() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    const el = document.getElementById('cookieConsent');
    if (el) { el.classList.add('dismissing'); setTimeout(() => el.remove(), 400); }
  }

  function _hasConsent() {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  }

  // --- Privacy Policy ---
  function showPrivacy() {
    _showLegalPage('Privacy Policy', `
      <p><strong>Last updated:</strong> April 2026</p>

      <h3>What We Collect</h3>
      <p>GetDeaddicted Academy stores your data locally in your browser (localStorage). We collect:</p>
      <ul>
        <li><strong>Account info:</strong> Name, email, and PIN (stored locally, not sent to any server)</li>
        <li><strong>Progress data:</strong> Courses completed, streaks, badges, quiz scores</li>
        <li><strong>Preferences:</strong> Settings, onboarding selections, notification state</li>
      </ul>

      <h3>What We Do NOT Collect</h3>
      <ul>
        <li>No cookies</li>
        <li>No third-party tracking pixels</li>
        <li>No advertising IDs</li>
        <li>No location data</li>
        <li>No data sold to anyone, ever</li>
      </ul>

      <h3>Children's Privacy (COPPA)</h3>
      <p>GetDeaddicted Academy is designed for users ages 5+. We do not knowingly collect personal information from children without parental consent. All child accounts are managed by a parent account with PIN protection.</p>
      <ul>
        <li>Children cannot create accounts independently — a parent must set up the family account first</li>
        <li>Child profiles are linked to and managed by the parent account</li>
        <li>No child data is transmitted to external servers</li>
        <li>Parents can view, modify, or delete all child data from the Parent Dashboard</li>
      </ul>

      <h3>Payment Processing</h3>
      <p>Payments are processed by Stripe, Inc. We never see, store, or handle your credit card details. Stripe's privacy policy applies to payment transactions.</p>

      <h3>Data Storage</h3>
      <p>All data is stored in your browser's localStorage. This means:</p>
      <ul>
        <li>Your data stays on YOUR device</li>
        <li>Clearing browser data will erase your progress</li>
        <li>Different devices have separate data</li>
        <li>You can export your data from the Dashboard at any time</li>
      </ul>

      <h3>Analytics</h3>
      <p>We may use privacy-respecting analytics (PostHog, self-hosted) to understand how courses are used. This data is aggregated and anonymous — we cannot identify individual users from analytics data.</p>

      <h3>Your Rights</h3>
      <p>You can:</p>
      <ul>
        <li>Export all your data (Dashboard > Account > Export)</li>
        <li>Delete all your data (clear localStorage or use Admin tools)</li>
        <li>Request information about your data: <a href="mailto:privacy@getdeaddicted.com">privacy@getdeaddicted.com</a></li>
      </ul>

      <h3>Contact</h3>
      <p>GetDeaddicted LLC<br>Email: <a href="mailto:privacy@getdeaddicted.com">privacy@getdeaddicted.com</a></p>
    `);
  }

  // --- Terms of Service ---
  function showTerms() {
    _showLegalPage('Terms of Service', `
      <p><strong>Last updated:</strong> April 2026</p>

      <h3>Acceptance</h3>
      <p>By using GetDeaddicted Academy, you agree to these terms. If you are under 18, your parent or guardian must agree on your behalf.</p>

      <h3>Service</h3>
      <p>GetDeaddicted Academy provides digital wellness educational content through interactive courses. We are not a substitute for professional medical or psychological advice.</p>

      <h3>Accounts</h3>
      <ul>
        <li>You must provide accurate information when creating an account</li>
        <li>You are responsible for keeping your PIN secure</li>
        <li>Parent accounts are responsible for child profiles created under them</li>
      </ul>

      <h3>Subscriptions</h3>
      <ul>
        <li>Free tier: 5 courses, no payment required</li>
        <li>Premium tiers: Monthly, annual, or family plans processed by Stripe</li>
        <li>7-day free trial on all paid plans</li>
        <li>Cancel anytime — access continues until the end of the billing period</li>
        <li>Refunds within 30 days of purchase if fewer than 5 courses completed</li>
      </ul>

      <h3>Classroom Use</h3>
      <p>The Classroom tier is licensed per teacher. Each teacher account supports up to 35 students. Schools requiring more seats should contact us for district pricing.</p>

      <h3>Content</h3>
      <p>All course content is owned by GetDeaddicted LLC. You may not redistribute, resell, or commercially reproduce our content without written permission. Printable worksheets may be distributed within your family or classroom.</p>

      <h3>Limitation of Liability</h3>
      <p>GetDeaddicted Academy provides educational content only. We are not liable for any decisions made based on our content. For medical or psychological concerns, please consult a qualified professional.</p>

      <h3>Contact</h3>
      <p>GetDeaddicted LLC<br>Email: <a href="mailto:legal@getdeaddicted.com">legal@getdeaddicted.com</a></p>
    `);
  }

  function _showLegalPage(title, content) {
    const section = document.getElementById('dashboardSection');
    if (!section) return;
    document.querySelectorAll('.section, .hero, .footer').forEach(el => el.style.display = 'none');
    section.style.display = 'block';
    section.innerHTML = `
      <div class="legal-page">
        <button class="btn btn-secondary btn-sm" onclick="Dashboard.hide()" style="margin-bottom:1rem;">Back</button>
        <h2>${title}</h2>
        <div class="legal-content">${content}</div>
      </div>
    `;
    window.scrollTo(0, 0);
  }

  // --- Accessibility Helpers ---
  function initA11y() {
    // Skip-to-content link
    const skip = document.createElement('a');
    skip.href = '#courses';
    skip.className = 'skip-link';
    skip.textContent = 'Skip to courses';
    document.body.insertBefore(skip, document.body.firstChild);

    // Announce route changes for screen readers
    const live = document.createElement('div');
    live.id = 'a11yLive';
    live.setAttribute('role', 'status');
    live.setAttribute('aria-live', 'polite');
    live.className = 'sr-only';
    document.body.appendChild(live);

    // Focus management for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') _trapFocus(e);
    });
  }

  function announce(message) {
    const live = document.getElementById('a11yLive');
    if (live) { live.textContent = ''; setTimeout(() => { live.textContent = message; }, 100); }
  }

  function _trapFocus(e) {
    const activeOverlays = document.querySelectorAll('.auth-overlay.active, .paywall-overlay.active, .cert-overlay.active, .onboard-overlay.active, .referral-overlay.active');
    if (activeOverlays.length === 0) return;

    const overlay = activeOverlays[0];
    const focusable = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // --- Global Error Handler ---
  function initErrorHandler() {
    window.addEventListener('error', (e) => {
      console.error('[GDA Error]', e.message, e.filename, e.lineno);
      if (typeof Analytics !== 'undefined') {
        Analytics.track('js_error', { message: e.message, file: e.filename, line: e.lineno });
      }
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('[GDA Promise]', e.reason);
      if (typeof Analytics !== 'undefined') {
        Analytics.track('promise_error', { reason: String(e.reason) });
      }
    });
  }

  function init() {
    showConsentBanner();
    initA11y();
    initErrorHandler();
  }

  return { init, showPrivacy, showTerms, acceptConsent, announce };
})();
