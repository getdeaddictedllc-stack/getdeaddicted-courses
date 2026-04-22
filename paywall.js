// ===== GETDEADDICTED ACADEMY — PAYWALL & STRIPE INTEGRATION =====
// Gating logic + pricing display + Stripe Checkout redirect

const Paywall = (() => {
  // Replace with your Stripe publishable key and price IDs
  const STRIPE_CONFIG = {
    publishableKey: 'pk_test_REPLACE_WITH_YOUR_KEY',
    prices: {
      monthly: 'price_monthly_REPLACE',
      annual: 'price_annual_REPLACE',
      lifetime: 'price_lifetime_REPLACE',
      family_monthly: 'price_family_monthly_REPLACE',
      family_annual: 'price_family_annual_REPLACE'
    },
    successUrl: window.location.origin + '?payment=success',
    cancelUrl: window.location.origin + '?payment=cancel'
  };

  const PLANS = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$7.99',
      period: '/month',
      features: ['All 50 courses', 'Voice narration', 'Progress tracking', 'Badges & certificates'],
      popular: false
    },
    {
      id: 'annual',
      name: 'Annual',
      price: '$59.99',
      period: '/year',
      savings: 'Save 37%',
      features: ['All 50 courses', 'Voice narration', 'Progress tracking', 'Badges & certificates', 'Priority support'],
      popular: true
    },
    {
      id: 'family_annual',
      name: 'Family',
      price: '$79.99',
      period: '/year',
      features: ['All 50 courses', 'Up to 5 family members', 'Parent dashboard', 'Progress tracking', 'Badges & certificates'],
      popular: false
    }
  ];

  function showPaywall(courseTitle) {
    const overlay = document.getElementById('paywallOverlay');
    if (!overlay) return;

    const courseMsg = courseTitle
      ? `<p class="paywall-course-msg">Unlock <strong>${courseTitle}</strong> and 44 more premium courses</p>`
      : '';

    overlay.querySelector('.paywall-content').innerHTML = `
      <button class="paywall-close" onclick="Paywall.hide()" aria-label="Close">&times;</button>
      <div class="paywall-header">
        <div class="paywall-icon">&#128274;</div>
        <h2>Upgrade to Premium</h2>
        <p class="paywall-sub">Get access to all 50 digital wellness courses</p>
        ${courseMsg}
      </div>
      <div class="paywall-plans">
        ${PLANS.map(plan => `
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

    // For demo/dev: simulate successful payment
    if (STRIPE_CONFIG.publishableKey.includes('REPLACE')) {
      _simulatePayment(planId, user);
      return;
    }

    // Production: redirect to Stripe Checkout
    _redirectToStripe(planId, user);
  }

  function _simulatePayment(planId, user) {
    const expiry = new Date();
    if (planId === 'lifetime') {
      expiry.setFullYear(expiry.getFullYear() + 100);
    } else if (planId.includes('annual')) {
      expiry.setFullYear(expiry.getFullYear() + 1);
    } else {
      expiry.setMonth(expiry.getMonth() + 1);
    }

    Auth.upgradePlan(planId, expiry.toISOString());
    hide();

    if (typeof showToast === 'function') {
      showToast('Welcome to Premium! All courses unlocked.');
    }

    if (typeof renderCourses === 'function' && typeof COURSES !== 'undefined') {
      renderCourses(COURSES);
    }

    _updateNavForPlan();
  }

  async function _redirectToStripe(planId, user) {
    try {
      const stripe = Stripe(STRIPE_CONFIG.publishableKey);
      const priceId = STRIPE_CONFIG.prices[planId];
      if (!priceId) return;

      const result = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: planId === 'lifetime' ? 'payment' : 'subscription',
        successUrl: STRIPE_CONFIG.successUrl + '&plan=' + planId,
        cancelUrl: STRIPE_CONFIG.cancelUrl,
        clientReferenceId: user.id,
        customerEmail: user.email
      });

      if (result.error) {
        console.error('Stripe error:', result.error.message);
        if (typeof showToast === 'function') {
          showToast('Payment failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Stripe redirect failed:', err);
    }
  }

  function handlePaymentReturn() {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    const plan = params.get('plan');

    if (payment === 'success' && plan) {
      const expiry = new Date();
      if (plan === 'lifetime') {
        expiry.setFullYear(expiry.getFullYear() + 100);
      } else if (plan.includes('annual')) {
        expiry.setFullYear(expiry.getFullYear() + 1);
      } else {
        expiry.setMonth(expiry.getMonth() + 1);
      }

      if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
        Auth.upgradePlan(plan, expiry.toISOString());
      }

      window.history.replaceState({}, '', window.location.pathname);

      setTimeout(() => {
        if (typeof showToast === 'function') {
          showToast('Payment successful! Welcome to Premium!');
        }
      }, 500);
    } else if (payment === 'cancel') {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  function checkAccess(courseId, courseTitle) {
    if (typeof Auth === 'undefined') return true;
    if (Auth.canAccessCourse(courseId)) return true;

    if (!Auth.isLoggedIn()) {
      if (typeof showAuthModal === 'function') {
        showAuthModal('signup', 'Sign up to access this course');
      }
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

  function init() {
    handlePaymentReturn();
    _updateNavForPlan();
  }

  return { showPaywall, hide, checkout, checkAccess, init, PLANS };
})();
