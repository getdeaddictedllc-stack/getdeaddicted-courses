// ===== GETDEADDICTED ACADEMY — ANALYTICS EVENT SYSTEM =====
// Client-side event tracking layer — ready to pipe into PostHog, GA4, or any provider

const Analytics = (() => {
  const STORAGE_KEY = 'gda_events';
  const MAX_EVENTS = 500;
  let _initialized = false;

  function init() {
    if (_initialized) return;
    _initialized = true;

    track('page_view', { path: window.location.pathname });

    // Auto-track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const seconds = Math.round((Date.now() - startTime) / 1000);
      track('session_end', { duration_seconds: seconds });
    });
  }

  function track(event, properties = {}) {
    const userId = _getUserId();
    const entry = {
      event,
      properties: {
        ...properties,
        userId,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent.substring(0, 100)
      }
    };

    _store(entry);
    _sendToProvider(entry);
  }

  function _getUserId() {
    if (typeof Auth !== 'undefined') {
      const child = Auth.getActiveChild();
      if (child) return child.id;
      const user = Auth.getCurrentUser();
      if (user) return user.id;
    }
    return '_anon';
  }

  function _store(entry) {
    try {
      const events = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      events.push(entry);
      if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {}
  }

  function _sendToProvider(entry) {
    // PostHog integration
    if (typeof posthog !== 'undefined') {
      posthog.capture(entry.event, entry.properties);
      return;
    }

    // Google Analytics 4 integration
    if (typeof gtag !== 'undefined') {
      gtag('event', entry.event, entry.properties);
      return;
    }
  }

  function getEvents(eventName, limit = 50) {
    try {
      const events = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const filtered = eventName ? events.filter(e => e.event === eventName) : events;
      return filtered.slice(-limit);
    } catch { return []; }
  }

  function getMetrics() {
    const events = getEvents(null, 500);
    const signups = events.filter(e => e.event === 'signup').length;
    const courseStarts = events.filter(e => e.event === 'course_start').length;
    const courseCompletes = events.filter(e => e.event === 'course_complete').length;
    const paywallViews = events.filter(e => e.event === 'paywall_view').length;
    const paywallConversions = events.filter(e => e.event === 'checkout_start').length;
    const shares = events.filter(e => e.event === 'share').length;

    return {
      signups,
      courseStarts,
      courseCompletes,
      completionRate: courseStarts > 0 ? Math.round((courseCompletes / courseStarts) * 100) : 0,
      paywallViews,
      paywallConversions,
      paywallConversionRate: paywallViews > 0 ? Math.round((paywallConversions / paywallViews) * 100) : 0,
      shares,
      totalEvents: events.length
    };
  }

  // --- Convenience tracking helpers ---
  function trackSignup(method) { track('signup', { method }); }
  function trackLogin() { track('login'); }
  function trackCourseStart(courseId, title) { track('course_start', { courseId, title }); }
  function trackCourseComplete(courseId, title) { track('course_complete', { courseId, title }); }
  function trackSlideView(courseId, slideIndex) { track('slide_view', { courseId, slideIndex }); }
  function trackPaywallView(source) { track('paywall_view', { source }); }
  function trackCheckout(plan) { track('checkout_start', { plan }); }
  function trackShare(method, courseTitle) { track('share', { method, courseTitle }); }
  function trackBadge(badgeName) { track('badge_earned', { badge: badgeName }); }
  function trackReferral(action) { track('referral', { action }); }

  return {
    init, track, getEvents, getMetrics,
    trackSignup, trackLogin, trackCourseStart, trackCourseComplete,
    trackSlideView, trackPaywallView, trackCheckout,
    trackShare, trackBadge, trackReferral
  };
})();
