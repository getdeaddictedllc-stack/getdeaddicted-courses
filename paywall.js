// ===== GETDEADDICTED ACADEMY — PAYWALL & PAYMENTS =====
// Multi-currency paywall. Razorpay for INR (India), Stripe for everything else.
// Keys read from Config (runtime-loaded). Falls back to simulated payment when
// keys contain "REPLACE", so the product is demoable end-to-end with no setup.

const Paywall = (() => {

  const PRICING = {
    USD: {
      symbol: '$',
      month: '/month', year: '/year',
      monthly: { amount: 7.99, display: '$7.99' },
      annual:  { amount: 59.99, display: '$59.99', save: 'Save 37%' },
      family_annual: { amount: 79.99, display: '$79.99' },
      lifetime: { amount: 149.99, display: '$149.99' },
      founding: { amount: 9, display: '$9' },
    },
    INR: {
      symbol: '₹',
      month: '/month', year: '/year',
      monthly: { amount: 499, display: '₹499' },
      annual:  { amount: 3999, display: '₹3,999', save: 'Save 33%' },
      family_annual: { amount: 5999, display: '₹5,999' },
      lifetime: { amount: 9999, display: '₹9,999' },
      founding: { amount: 499, display: '₹499' },
    },
    EUR: {
      symbol: '€',
      month: '/month', year: '/year',
      monthly: { amount: 7.49, display: '€7.49' },
      annual:  { amount: 54.99, display: '€54.99', save: 'Save 37%' },
      family_annual: { amount: 74.99, display: '€74.99' },
      lifetime: { amount: 139.99, display: '€139.99' },
      founding: { amount: 9, display: '€9' },
    },
    GBP: {
      symbol: '£',
      month: '/month', year: '/year',
      monthly: { amount: 6.49, display: '£6.49' },
      annual:  { amount: 47.99, display: '£47.99', save: 'Save 37%' },
      family_annual: { amount: 64.99, display: '£64.99' },
      lifetime: { amount: 119.99, display: '£119.99' },
      founding: { amount: 8, display: '£8' },
    },
  };

  function detectCurrency() {
    const saved = localStorage.getItem('gda_currency');
    if (saved && PRICING[saved]) return saved;
    const lang = (navigator.language || 'en').toLowerCase();
    if (lang.includes('-in') || lang.startsWith('hi') || lang.startsWith('mr') || lang.startsWith('bn') || lang.startsWith('ta') || lang.startsWith('te')) return 'INR';
    if (lang.includes('-gb')) return 'GBP';
    if (lang.startsWith('de') || lang.startsWith('fr') || lang.startsWith('it') || lang.startsWith('nl') || lang.startsWith('es-es')) return 'EUR';
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return 'INR';
    if (tz.startsWith('Europe/London')) return 'GBP';
    if (tz.startsWith('Europe/')) return 'EUR';
    return 'USD';
  }

  function setCurrency(code) {
    if (!PRICING[code]) return;
    localStorage.setItem('gda_currency', code);
  }

  function getPlans() {
    const cur = detectCurrency();
    const p = PRICING[cur];
    return [
      {
        id: 'monthly',
        name: 'Monthly',
        price: p.monthly.display,
        period: p.month,
        amount: p.monthly.amount,
        currency: cur,
        features: ['All 50 courses', 'Voice narration', 'Progress tracking', 'Badges & certificates'],
        popular: false,
      },
      {
        id: 'annual',
        name: 'Annual',
        price: p.annual.display,
        period: p.year,
        amount: p.annual.amount,
        currency: cur,
        savings: p.annual.save,
        features: ['All 50 courses', 'Voice narration', 'Progress tracking', 'Badges & certificates', 'Priority support'],
        popular: true,
      },
      {
        id: 'family_annual',
        name: 'Family',
        price: p.family_annual.display,
        period: p.year,
        amount: p.family_annual.amount,
        currency: cur,
        features: ['All 50 courses', 'Up to 5 family members', 'Parent dashboard', 'Progress tracking', 'Badges & certificates'],
        popular: false,
      },
    ];
  }

  function showPaywall(courseTitle) {
    const overlay = document.getElementById('paywallOverlay');
    if (!overlay) return;

    const plans = getPlans();
    const courseMsg = courseTitle
      ? `<p class="paywall-course-msg">Unlock <strong>${courseTitle}</strong> and 44 more premium courses</p>`
      : '';

    const foundingLink = `
      <div class="paywall-founding-strip">
        <span>🔥 First 500 families: lifetime access for just <strong>${PRICING[detectCurrency()].founding.display}</strong></span>
        <a href="/founding.html">Claim your spot →</a>
      </div>`;

    overlay.querySelector('.paywall-content').innerHTML = `
      <button class="paywall-close" onclick="Paywall.hide()" aria-label="Close">&times;</button>
      <div class="paywall-header">
        <div class="paywall-icon">&#128274;</div>
        <h2>Upgrade to Premium</h2>
        <p class="paywall-sub">Get access to all 50 digital wellness courses</p>
        ${courseMsg}
      </div>
      ${foundingLink}
      <div class="paywall-plans">
        ${plans.map(plan => `
          <div class="paywall-plan ${plan.popular ? 'popular' : ''}" onclick="Paywall.checkout('${plan.id}')">
            ${plan.popular ? '<div class="plan-badge">Most Popular</div>' : ''}
            ${plan.savings ? '<div class="plan-savings">' + plan.savings + '</div>' : ''}
            <h3>${plan.name}</h3>
            <div class="plan-price">${plan.price}<span class="plan-period">${plan.period}</span></div>
            <ul class="plan-features">
              ${plan.features.map(f => `<li>&#10003; ${f}</li>`).join('')}
            </ul>
            <button class="btn btn-primary plan-cta">Choose ${plan.name}</button>
          </div>
        `).join('')}
      </div>
      <div class="paywall-footer">
        <p>7-day free trial on all plans &middot; Cancel anytime</p>
        <p class="paywall-free-note">Or continue with <a href="#" onclick="Paywall.hide();return false;">5 free courses</a></p>
      </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (typeof Analytics !== 'undefined') {
      Analytics.track('paywall_shown', { courseTitle: courseTitle || 'generic', currency: detectCurrency() });
    }
  }

  function hide() {
    const overlay = document.getElementById('paywallOverlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function checkout(planId) {
    const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;

    if (!user) {
      hide();
      if (typeof showAuthModal === 'function') {
        showAuthModal('signup', 'Sign up to start your free trial');
      }
      return;
    }

    if (typeof Analytics !== 'undefined') {
      Analytics.track('checkout_start', { plan: planId, currency: detectCurrency() });
    }

    const cur = detectCurrency();
    if (cur === 'INR') {
      _razorpayCheckout(planId, user);
    } else {
      _stripeCheckout(planId, user);
    }
  }

  function _stripeCheckout(planId, user) {
    const key = _cfg('stripeKey');
    const priceId = _cfg(_stripePriceKey(planId));

    if (!key || key.includes('REPLACE') || !priceId || priceId.includes('REPLACE')) {
      _simulatePayment(planId, user);
      return;
    }

    if (typeof Stripe === 'undefined') {
      const s = document.createElement('script');
      s.src = 'https://js.stripe.com/v3/';
      s.onload = () => _stripeCheckout(planId, user);
      document.head.appendChild(s);
      return;
    }

    const stripe = Stripe(key);
    stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: planId === 'lifetime' ? 'payment' : 'subscription',
      successUrl: window.location.origin + '?payment=success&plan=' + planId,
      cancelUrl: window.location.origin + '?payment=cancel',
      clientReferenceId: user.id,
      customerEmail: user.email,
    }).then((result) => {
      if (result.error) {
        if (typeof showToast === 'function') showToast('Payment failed. Please try again.');
      }
    });
  }

  function _razorpayCheckout(planId, user) {
    const key = _cfg('razorpayKey');
    if (!key || key.includes('REPLACE')) {
      _simulatePayment(planId, user);
      return;
    }

    if (typeof Razorpay === 'undefined') {
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      s.onload = () => _razorpayCheckout(planId, user);
      document.head.appendChild(s);
      return;
    }

    const p = PRICING.INR[planId];
    if (!p) return;

    const rzp = new Razorpay({
      key: key,
      amount: Math.round(p.amount * 100),
      currency: 'INR',
      name: 'GetDeaddicted Academy',
      description: planId.replace('_', ' ') + ' plan',
      image: '/icon-192.png',
      handler: (resp) => {
        const expiry = new Date();
        if (planId === 'lifetime') expiry.setFullYear(expiry.getFullYear() + 100);
        else if (planId.includes('annual')) expiry.setFullYear(expiry.getFullYear() + 1);
        else expiry.setMonth(expiry.getMonth() + 1);

        Auth.upgradePlan(planId, expiry.toISOString());
        Auth.updateUser({ lastPaymentId: resp.razorpay_payment_id, lastProvider: 'razorpay' });
        hide();
        if (typeof showToast === 'function') showToast('Payment successful! Welcome to Premium!');
        if (typeof Analytics !== 'undefined') Analytics.track('payment_success', { plan: planId, provider: 'razorpay', amount: p.amount });
        if (typeof renderCourses === 'function' && typeof COURSES !== 'undefined') renderCourses(COURSES);
      },
      prefill: { name: user.name || '', email: user.email || '' },
      theme: { color: '#6ee7b7' },
      modal: {
        ondismiss: () => {
          if (typeof Analytics !== 'undefined') Analytics.track('checkout_abandon', { plan: planId, provider: 'razorpay' });
        }
      }
    });
    rzp.open();
  }

  function _simulatePayment(planId, user) {
    const expiry = new Date();
    if (planId === 'lifetime' || planId === 'founding') expiry.setFullYear(expiry.getFullYear() + 100);
    else if (planId.includes('annual')) expiry.setFullYear(expiry.getFullYear() + 1);
    else expiry.setMonth(expiry.getMonth() + 1);

    Auth.upgradePlan(planId, expiry.toISOString());
    hide();
    if (typeof showToast === 'function') showToast('Welcome to Premium! All courses unlocked.');
    if (typeof Analytics !== 'undefined') Analytics.track('payment_success', { plan: planId, provider: 'simulated' });
    if (typeof renderCourses === 'function' && typeof COURSES !== 'undefined') renderCourses(COURSES);
    _updateNavForPlan();
  }

  function handlePaymentReturn() {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    const plan = params.get('plan');

    if (payment === 'success' && plan) {
      const expiry = new Date();
      if (plan === 'lifetime' || plan === 'founding') expiry.setFullYear(expiry.getFullYear() + 100);
      else if (plan.includes('annual')) expiry.setFullYear(expiry.getFullYear() + 1);
      else expiry.setMonth(expiry.getMonth() + 1);

      if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
        Auth.upgradePlan(plan, expiry.toISOString());
      }
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => {
        if (typeof showToast === 'function') showToast('Payment successful! Welcome to Premium!');
      }, 500);
    } else if (payment === 'cancel') {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  function checkAccess(courseId, courseTitle) {
    if (typeof Auth === 'undefined') return true;
    if (Auth.canAccessCourse(courseId)) return true;

    if (!Auth.isLoggedIn()) {
      if (typeof showAuthModal === 'function') showAuthModal('signup', 'Sign up to access this course');
      return false;
    }
    showPaywall(courseTitle);
    return false;
  }

  function _updateNavForPlan() {
    const upgradeBtn = document.getElementById('navUpgradeBtn');
    if (upgradeBtn && typeof Auth !== 'undefined' && Auth.isPaid()) {
      upgradeBtn.style.display = 'none';
    }
  }

  function _cfg(key) {
    if (typeof Config !== 'undefined' && Config.get) return Config.get(key);
    return null;
  }

  function _stripePriceKey(planId) {
    const map = {
      monthly: 'stripeMonthlyPriceId',
      annual: 'stripeAnnualPriceId',
      family_annual: 'stripeFamilyAnnualPriceId',
      family_monthly: 'stripeFamilyMonthlyPriceId',
      lifetime: 'stripeLifetimePriceId',
      founding: 'stripeFoundingPriceId',
      classroom: 'stripeClassroomPriceId',
    };
    return map[planId] || 'stripeAnnualPriceId';
  }

  function init() {
    handlePaymentReturn();
    _updateNavForPlan();
  }

  return {
    showPaywall, hide, checkout, checkAccess, init,
    getPlans, detectCurrency, setCurrency, PRICING,
  };
})();
