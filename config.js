// ===== GETDEADDICTED ACADEMY — RUNTIME CONFIG =====
// Loads payment + analytics + service keys from three sources, in order:
//   1. window.GDA_CONFIG (injected at build time or by a <script> tag)
//   2. localStorage (dev/testing: owner pastes keys in admin dashboard)
//   3. Defaults (REPLACE sentinels — triggers simulated-payment fallback)

const Config = (() => {
  const DEFAULTS = {
    stripeKey: 'pk_test_REPLACE_WITH_YOUR_KEY',
    stripeMonthlyPriceId: 'price_monthly_REPLACE',
    stripeAnnualPriceId: 'price_annual_REPLACE',
    stripeLifetimePriceId: 'price_lifetime_REPLACE',
    stripeFamilyMonthlyPriceId: 'price_family_monthly_REPLACE',
    stripeFamilyAnnualPriceId: 'price_family_annual_REPLACE',
    stripeFoundingPriceId: 'price_founding_REPLACE',
    stripeClassroomPriceId: 'price_classroom_REPLACE',

    razorpayKey: 'rzp_test_REPLACE_WITH_YOUR_KEY',
    razorpayMonthlyPlanId: 'plan_monthly_REPLACE',
    razorpayAnnualPlanId: 'plan_annual_REPLACE',

    posthogKey: '',
    ga4MeasurementId: '',

    foundingTotalSpots: 500,
    foundingDealDays: 7,

    resendApiKey: '',
  };

  const LS_PREFIX = 'gda_config_';

  function get(key) {
    if (typeof window !== 'undefined' && window.GDA_CONFIG && window.GDA_CONFIG[key] != null) {
      return window.GDA_CONFIG[key];
    }
    try {
      const v = localStorage.getItem(LS_PREFIX + key);
      if (v != null) return v;
    } catch (_) {}
    return DEFAULTS[key];
  }

  function set(key, value) {
    try { localStorage.setItem(LS_PREFIX + key, value); } catch (_) {}
  }

  function isConfigured(key) {
    const v = get(key);
    return v && !String(v).includes('REPLACE') && v !== '';
  }

  function all() {
    const out = {};
    for (const k of Object.keys(DEFAULTS)) out[k] = get(k);
    return out;
  }

  return { get, set, isConfigured, all, DEFAULTS };
})();
