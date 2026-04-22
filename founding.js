// ===== GETDEADDICTED ACADEMY — FOUNDING FAMILY LANDING =====
// Day-1 revenue play: first 500 families get lifetime access for
// ₹499 (IN) or $9 (global). Uses Razorpay for INR, Stripe for USD.

const Founding = (() => {
  const TOTAL_SPOTS = 500;
  const COUNTER_KEY = 'gda_founding_count';
  const DEAL_END_KEY = 'gda_founding_deadline';
  const DEAL_DAYS = 7;

  const PRICING = {
    INR: { amount: 499, display: '₹499', strike: '₹9,999', compare: 9999 },
    USD: { amount: 9,   display: '$9',   strike: '$149',   compare: 149  },
    EUR: { amount: 9,   display: '€9',   strike: '€139',   compare: 139  },
    GBP: { amount: 8,   display: '£8',   strike: '£119',   compare: 119  },
  };

  let _currency = 'USD';

  function detectCurrency() {
    const saved = localStorage.getItem('gda_currency');
    if (saved && PRICING[saved]) return saved;

    const lang = (navigator.language || 'en').toLowerCase();
    if (lang.includes('-in') || lang.startsWith('hi') || lang.startsWith('mr') || lang.startsWith('bn') || lang.startsWith('ta') || lang.startsWith('te')) return 'INR';
    if (lang.includes('-gb')) return 'GBP';
    if (lang.startsWith('de') || lang.startsWith('fr') || lang.startsWith('es-es') || lang.startsWith('it') || lang.startsWith('nl')) return 'EUR';

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return 'INR';
    if (tz.startsWith('Europe/London')) return 'GBP';
    if (tz.startsWith('Europe/')) return 'EUR';

    return 'USD';
  }

  function _getSpotsSold() {
    const n = parseInt(localStorage.getItem(COUNTER_KEY), 10);
    if (isNaN(n)) {
      const seeded = 37 + Math.floor(Math.random() * 12);
      localStorage.setItem(COUNTER_KEY, seeded);
      return seeded;
    }
    return n;
  }

  function _getDealDeadline() {
    let t = parseInt(localStorage.getItem(DEAL_END_KEY), 10);
    if (!t || t < Date.now()) {
      t = Date.now() + DEAL_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(DEAL_END_KEY, t);
    }
    return t;
  }

  function _fmtCountdown(ms) {
    if (ms <= 0) return 'ends now';
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    if (d > 0) return `${d}d ${h}h`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }

  function _updateUI() {
    const p = PRICING[_currency];
    const sold = _getSpotsSold();
    const left = Math.max(0, TOTAL_SPOTS - sold);

    const priceEl = document.getElementById('foundingPrice');
    const strikeEl = document.getElementById('foundingStrike');
    const ctaPriceEl = document.getElementById('foundingCtaPrice');
    const ctaEl = document.getElementById('foundingCta');
    const spotsEl = document.getElementById('foundingSpotsLeft');
    const timeEl = document.getElementById('foundingTimeLeft');
    const joinedEl = document.getElementById('foundingJoinedCount');

    if (priceEl) priceEl.textContent = p.display;
    if (strikeEl) strikeEl.textContent = p.strike;
    if (ctaPriceEl) ctaPriceEl.textContent = p.display;
    if (spotsEl) spotsEl.textContent = left;
    if (joinedEl) joinedEl.textContent = Math.min(sold, 99);
    if (timeEl) timeEl.textContent = _fmtCountdown(_getDealDeadline() - Date.now());

    if (ctaEl && left <= 0) {
      ctaEl.disabled = true;
      ctaEl.textContent = 'Sold out — join waitlist';
      ctaEl.onclick = _joinWaitlist;
    }
  }

  function _joinWaitlist() {
    const email = prompt('Sold out! Leave your email and we\'ll notify you next time.');
    if (email) {
      const list = JSON.parse(localStorage.getItem('gda_waitlist') || '[]');
      list.push({ email, tier: 'founding', ts: Date.now() });
      localStorage.setItem('gda_waitlist', JSON.stringify(list));
      alert('Added! We\'ll email you if a spot opens.');
      if (typeof Analytics !== 'undefined') Analytics.track('founding_waitlist_join', { email });
    }
  }

  function checkout() {
    if (typeof Analytics !== 'undefined') Analytics.track('founding_checkout_start', { currency: _currency });

    const user = (typeof Auth !== 'undefined') ? Auth.getCurrentUser() : null;
    if (!user) {
      const name = prompt('What\'s your name?');
      if (!name) return;
      const email = prompt('Email for your account + receipt:');
      if (!email) return;
      const pin = prompt('Create a 4-6 digit PIN to log in later:');
      if (!pin || !/^\d{4,6}$/.test(pin)) { alert('PIN must be 4-6 digits.'); return; }

      const res = Auth.signup({ name, email, pin, role: 'parent' });
      if (!res.ok) { alert(res.error); return; }
    }

    const p = PRICING[_currency];

    if (_currency === 'INR') {
      _razorpayCheckout(p);
    } else {
      _stripeCheckout(p);
    }
  }

  function _razorpayCheckout(p) {
    const key = _getConfig('razorpayKey');
    if (!key || key.includes('REPLACE')) {
      _simulateSuccess(p);
      return;
    }

    if (typeof Razorpay === 'undefined') {
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      s.onload = () => _razorpayCheckout(p);
      document.head.appendChild(s);
      return;
    }

    const user = Auth.getCurrentUser();
    const rzp = new Razorpay({
      key: key,
      amount: p.amount * 100,
      currency: 'INR',
      name: 'GetDeaddicted Academy',
      description: 'Founding Family — Lifetime Access',
      image: '/icon-192.png',
      handler: (response) => {
        _onPaymentSuccess(response.razorpay_payment_id, 'razorpay');
      },
      prefill: {
        name: user?.name || '',
        email: user?.email || '',
      },
      theme: { color: '#6ee7b7' },
      modal: {
        ondismiss: () => {
          if (typeof Analytics !== 'undefined') Analytics.track('founding_checkout_abandon', { currency: 'INR' });
        }
      }
    });
    rzp.open();
  }

  function _stripeCheckout(p) {
    const key = _getConfig('stripeKey');
    if (!key || key.includes('REPLACE')) {
      _simulateSuccess(p);
      return;
    }

    const priceId = _getConfig('stripeFoundingPriceId');
    if (!priceId || priceId.includes('REPLACE')) {
      _simulateSuccess(p);
      return;
    }

    const stripe = Stripe(key);
    const user = Auth.getCurrentUser();
    stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      successUrl: window.location.origin + '/founding.html?payment=success',
      cancelUrl: window.location.origin + '/founding.html?payment=cancel',
      clientReferenceId: user?.id,
      customerEmail: user?.email,
    }).then((result) => {
      if (result.error) alert(result.error.message);
    });
  }

  function _simulateSuccess(p) {
    const txId = 'sim_' + Date.now().toString(36);
    _onPaymentSuccess(txId, 'simulated');
  }

  function _onPaymentSuccess(txId, provider) {
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 100);

    if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
      Auth.upgradePlan('founding_lifetime', expiry.toISOString());
      Auth.updateUser({
        founding: true,
        foundingTxId: txId,
        foundingProvider: provider,
        foundingCurrency: _currency,
        foundingPurchasedAt: new Date().toISOString(),
      });
    }

    const sold = _getSpotsSold();
    localStorage.setItem(COUNTER_KEY, sold + 1);

    if (typeof Analytics !== 'undefined') {
      Analytics.track('founding_purchase_success', {
        txId,
        provider,
        currency: _currency,
        amount: PRICING[_currency].amount,
      });
    }

    _showSuccessPanel();
  }

  function _showSuccessPanel() {
    const panel = document.getElementById('foundingSuccess');
    const hero = document.querySelector('.founding-hero');
    if (hero) hero.style.display = 'none';
    if (panel) {
      panel.style.display = 'block';
      panel.scrollIntoView({ behavior: 'smooth' });
    }

    const user = Auth.getCurrentUser();
    const ref = user?.id?.slice(-6) || '';
    const msg = encodeURIComponent(
      `Hey! I just joined GetDeaddicted Academy as a Founding Family — lifetime access to 50 screen-wellness courses for kids. ` +
      `If you join with my link you both get a bonus: https://academy.getdeaddicted.com/founding.html?ref=${ref}`
    );
    const waBtn = document.getElementById('waShareBtn');
    if (waBtn) waBtn.href = 'https://wa.me/?text=' + msg;
  }

  function _getConfig(key) {
    if (typeof Config !== 'undefined' && Config.get) return Config.get(key);
    return null;
  }

  function _handleReturn() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      _onPaymentSuccess('stripe_' + Date.now().toString(36), 'stripe');
      window.history.replaceState({}, '', window.location.pathname);
    }
    const ref = params.get('ref');
    if (ref) {
      localStorage.setItem('gda_referred_by', ref);
    }
  }

  function init() {
    _currency = detectCurrency();
    localStorage.setItem('gda_currency', _currency);
    _updateUI();
    _handleReturn();
    setInterval(_updateUI, 60000);

    if (typeof Analytics !== 'undefined') {
      Analytics.track('founding_page_view', { currency: _currency });
    }
  }

  return { init, checkout, detectCurrency, PRICING };
})();
