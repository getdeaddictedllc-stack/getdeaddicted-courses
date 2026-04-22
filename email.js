// ===== GETDEADDICTED ACADEMY — EMAIL CAPTURE & NEWSLETTER =====
// Collects emails, stores preferences, generates email templates for Resend API

const EmailCapture = (() => {
  const STORAGE_KEY = 'gda_email_subs';

  function _getData() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  }
  function _saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function subscribe(email, preferences = {}) {
    if (!email || !email.includes('@')) return { ok: false, error: 'Please enter a valid email.' };
    const data = _getData();
    if (data.find(s => s.email === email)) return { ok: false, error: 'Already subscribed!' };

    data.push({
      email,
      preferences: {
        weeklyDigest: preferences.weeklyDigest !== false,
        streakReminders: preferences.streakReminders !== false,
        newCourses: preferences.newCourses !== false,
        tips: preferences.tips !== false
      },
      subscribedAt: new Date().toISOString(),
      source: preferences.source || 'footer'
    });
    _saveData(data);

    // Track event
    if (typeof Analytics !== 'undefined') Analytics.track('email_subscribe', { source: preferences.source || 'footer' });

    return { ok: true, message: 'Subscribed! Check your inbox for a welcome email.' };
  }

  function unsubscribe(email) {
    const data = _getData().filter(s => s.email !== email);
    _saveData(data);
    return { ok: true };
  }

  function isSubscribed(email) {
    return _getData().some(s => s.email === email);
  }

  function getSubscriberCount() {
    return _getData().length;
  }

  // --- Email Templates (ready for Resend API integration) ---

  function getWelcomeEmailHtml(name) {
    return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Welcome to GetDeaddicted Academy</title></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:system-ui,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:2rem 1rem;">
  <div style="text-align:center;margin-bottom:2rem;">
    <span style="font-size:2rem;">&#9883;</span>
    <h1 style="color:#6ee7b7;font-size:1.5rem;margin:0.5rem 0;">Welcome to GetDeaddicted Academy!</h1>
  </div>
  <div style="background:#12121a;border-radius:12px;padding:1.5rem;border:1px solid rgba(110,231,183,0.1);">
    <p style="color:#e0e0e0;font-size:1rem;">Hi ${name || 'there'},</p>
    <p style="color:#94a3b8;">You just took the first step toward a healthier digital life. Here's what you can do now:</p>
    <ul style="color:#94a3b8;padding-left:1.2rem;">
      <li style="margin-bottom:0.5rem;"><strong style="color:#6ee7b7;">Start with a free course</strong> — "How Screens Hook Your Brain" is a great first pick</li>
      <li style="margin-bottom:0.5rem;"><strong style="color:#6ee7b7;">Set up your family</strong> — Add your kids in the Parent Dashboard</li>
      <li style="margin-bottom:0.5rem;"><strong style="color:#6ee7b7;">Build a streak</strong> — Even 5 minutes a day makes a difference</li>
    </ul>
    <div style="text-align:center;margin:1.5rem 0;">
      <a href="https://academy.getdeaddicted.com" style="background:linear-gradient(135deg,#6ee7b7,#3b82f6);color:#0a0a0f;padding:0.7rem 2rem;border-radius:8px;font-weight:700;text-decoration:none;display:inline-block;">Start Learning</a>
    </div>
  </div>
  <p style="color:#475569;font-size:0.75rem;text-align:center;margin-top:1.5rem;">&copy; 2026 GetDeaddicted LLC. Your screen time, your rules.</p>
</div>
</body></html>`;
  }

  function getWeeklyDigestHtml(name, stats) {
    return `
<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Your Weekly Progress</title></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:system-ui,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:2rem 1rem;">
  <div style="text-align:center;margin-bottom:1.5rem;">
    <span style="font-size:1.5rem;">&#9883;</span>
    <h2 style="color:#6ee7b7;font-size:1.3rem;margin:0.3rem 0;">Your Weekly Progress Report</h2>
  </div>
  <div style="background:#12121a;border-radius:12px;padding:1.5rem;border:1px solid rgba(110,231,183,0.1);">
    <p style="color:#e0e0e0;">Hi ${name || 'there'}, here's how your family did this week:</p>
    <div style="display:flex;gap:1rem;margin:1rem 0;text-align:center;">
      <div style="flex:1;background:rgba(110,231,183,0.06);border-radius:8px;padding:0.8rem;">
        <div style="font-size:1.5rem;font-weight:800;color:#6ee7b7;">${stats?.coursesCompleted || 0}</div>
        <div style="font-size:0.75rem;color:#64748b;">Courses Done</div>
      </div>
      <div style="flex:1;background:rgba(110,231,183,0.06);border-radius:8px;padding:0.8rem;">
        <div style="font-size:1.5rem;font-weight:800;color:#fbbf24;">${stats?.streak || 0}</div>
        <div style="font-size:0.75rem;color:#64748b;">Day Streak</div>
      </div>
      <div style="flex:1;background:rgba(110,231,183,0.06);border-radius:8px;padding:0.8rem;">
        <div style="font-size:1.5rem;font-weight:800;color:#60a5fa;">${stats?.badges || 0}</div>
        <div style="font-size:0.75rem;color:#64748b;">Badges</div>
      </div>
    </div>
    <div style="text-align:center;margin:1.5rem 0;">
      <a href="https://academy.getdeaddicted.com" style="background:linear-gradient(135deg,#6ee7b7,#3b82f6);color:#0a0a0f;padding:0.6rem 1.5rem;border-radius:8px;font-weight:700;text-decoration:none;display:inline-block;">Keep Going!</a>
    </div>
  </div>
  <p style="color:#475569;font-size:0.7rem;text-align:center;margin-top:1rem;">
    <a href="https://academy.getdeaddicted.com?unsubscribe=true" style="color:#475569;">Unsubscribe</a>
  </p>
</div>
</body></html>`;
  }

  // --- UI: Footer subscription form ---
  function renderFooterForm() {
    const container = document.getElementById('emailCaptureFooter');
    if (!container) return;

    const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
    const alreadySubbed = user && isSubscribed(user.email);

    if (alreadySubbed) {
      container.innerHTML = '<p class="email-subbed">&#10003; Subscribed to weekly updates</p>';
      return;
    }

    container.innerHTML = `
      <div class="email-capture">
        <h4>Get Weekly Digital Wellness Tips</h4>
        <p>Join families building healthier screen habits</p>
        <form class="email-form" onsubmit="EmailCapture.handleSubscribe(event)">
          <input type="email" id="emailCaptureInput" placeholder="Your email address" required>
          <button type="submit" class="btn btn-primary btn-sm">Subscribe</button>
        </form>
        <p class="email-capture-note" id="emailCaptureMsg"></p>
      </div>
    `;
  }

  function handleSubscribe(e) {
    e.preventDefault();
    const email = document.getElementById('emailCaptureInput').value.trim();
    const result = subscribe(email, { source: 'footer' });
    const msg = document.getElementById('emailCaptureMsg');
    if (msg) {
      msg.textContent = result.ok ? result.message : result.error;
      msg.style.color = result.ok ? '#6ee7b7' : '#f87171';
    }
    if (result.ok) {
      setTimeout(() => renderFooterForm(), 2000);
    }
  }

  // --- Popup trigger (show after 60s on page or after completing a course) ---
  function showPopup() {
    const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
    if (user && isSubscribed(user.email)) return;

    const popup = document.getElementById('emailPopup');
    if (!popup) return;
    popup.innerHTML = `
      <div class="email-popup-content">
        <button class="cert-close" onclick="EmailCapture.hidePopup()">&times;</button>
        <div class="onboard-emoji">&#128231;</div>
        <h3>Stay on Track!</h3>
        <p>Get weekly progress reports and digital wellness tips for your family.</p>
        <form onsubmit="EmailCapture.handlePopupSubscribe(event)">
          <input type="email" id="emailPopupInput" placeholder="Your email" required value="${user?.email || ''}">
          <button type="submit" class="btn btn-primary btn-full">Subscribe Free</button>
        </form>
        <p class="email-capture-note" id="emailPopupMsg"></p>
      </div>
    `;
    popup.classList.add('active');
  }

  function hidePopup() {
    const popup = document.getElementById('emailPopup');
    if (popup) popup.classList.remove('active');
  }

  function handlePopupSubscribe(e) {
    e.preventDefault();
    const email = document.getElementById('emailPopupInput').value.trim();
    const result = subscribe(email, { source: 'popup' });
    const msg = document.getElementById('emailPopupMsg');
    if (msg) {
      msg.textContent = result.ok ? result.message : result.error;
      msg.style.color = result.ok ? '#6ee7b7' : '#f87171';
    }
    if (result.ok) setTimeout(() => hidePopup(), 1500);
  }

  return {
    subscribe, unsubscribe, isSubscribed, getSubscriberCount,
    getWelcomeEmailHtml, getWeeklyDigestHtml,
    renderFooterForm, handleSubscribe,
    showPopup, hidePopup, handlePopupSubscribe
  };
})();
