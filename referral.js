// ===== GETDEADDICTED ACADEMY — REFERRAL PROGRAM =====
// Give a month, get a month. Referral codes, tracking, sharing.

const Referral = (() => {
  const STORAGE_KEY = 'gda_referrals';

  function _getData() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  }

  function _saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function getOrCreateCode() {
    const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
    if (!user) return null;

    const data = _getData();
    if (data[user.id]?.code) return data[user.id].code;

    const code = 'GDA-' + user.name.substring(0, 3).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
    data[user.id] = { code, referrals: [], rewardsEarned: 0 };
    _saveData(data);
    return code;
  }

  function getReferralStats() {
    const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
    if (!user) return { code: null, referrals: 0, rewardsEarned: 0 };
    const data = _getData();
    const userData = data[user.id] || {};
    return {
      code: userData.code || null,
      referrals: (userData.referrals || []).length,
      rewardsEarned: userData.rewardsEarned || 0
    };
  }

  function redeemCode(code) {
    const data = _getData();
    let referrerId = null;

    for (const [userId, userData] of Object.entries(data)) {
      if (userData.code === code) {
        referrerId = userId;
        break;
      }
    }

    if (!referrerId) return { ok: false, error: 'Invalid referral code.' };

    const currentUser = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
    if (!currentUser) return { ok: false, error: 'Please sign up first.' };
    if (referrerId === currentUser.id) return { ok: false, error: 'You cannot use your own referral code.' };

    const referrerData = data[referrerId];
    if (referrerData.referrals.includes(currentUser.id)) {
      return { ok: false, error: 'This referral has already been applied.' };
    }

    // Give reward to referrer: +1 month
    referrerData.referrals.push(currentUser.id);
    referrerData.rewardsEarned = (referrerData.rewardsEarned || 0) + 1;

    // Give reward to new user: +1 month
    if (!data[currentUser.id]) {
      data[currentUser.id] = { code: getOrCreateCode(), referrals: [], rewardsEarned: 0 };
    }

    _saveData(data);

    // Extend both users' plans by 1 month
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);
    Auth.upgradePlan('referral_monthly', expiry.toISOString());

    return { ok: true, message: 'Referral applied! You both get 1 free month of Premium.' };
  }

  function getShareUrl(code) {
    return `https://academy.getdeaddicted.com?ref=${code}`;
  }

  function getShareText(code) {
    return `My family is learning about digital wellness on GetDeaddicted Academy! Use my code ${code} and we both get a free month of Premium.`;
  }

  function showReferralPanel() {
    const user = typeof Auth !== 'undefined' ? Auth.getCurrentUser() : null;
    if (!user) {
      if (typeof showAuthModal === 'function') showAuthModal('signup', 'Sign up to get your referral code');
      return;
    }

    const code = getOrCreateCode();
    const stats = getReferralStats();
    const shareUrl = getShareUrl(code);
    const shareText = getShareText(code);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;

    const panel = document.getElementById('referralPanel');
    if (!panel) return;

    panel.innerHTML = `
      <div class="referral-content">
        <button class="referral-close" onclick="Referral.hidePanel()">&times;</button>
        <div class="referral-header">
          <div class="referral-icon">&#127873;</div>
          <h2>Give a Month, Get a Month</h2>
          <p>Share your code with friends. When they sign up, you both get 1 free month of Premium!</p>
        </div>
        <div class="referral-code-box">
          <span class="referral-code">${code}</span>
          <button class="btn btn-sm btn-secondary" onclick="Referral.copyCode('${code}')">Copy</button>
        </div>
        <div class="referral-share-row">
          <a href="${twitterUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-secondary">Share on X</a>
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-secondary">WhatsApp</a>
          <button class="btn btn-sm btn-secondary" onclick="Referral.copyLink('${shareUrl}')">Copy Link</button>
        </div>
        <div class="referral-stats">
          <div class="referral-stat">
            <strong>${stats.referrals}</strong>
            <span>Friends Referred</span>
          </div>
          <div class="referral-stat">
            <strong>${stats.rewardsEarned}</strong>
            <span>Free Months Earned</span>
          </div>
        </div>
        <div class="referral-redeem">
          <p>Have a referral code?</p>
          <form onsubmit="Referral.handleRedeem(event)">
            <input type="text" id="redeemCodeInput" placeholder="Enter code (e.g. GDA-SAM-X4F2)" maxlength="20">
            <button type="submit" class="btn btn-primary btn-sm">Redeem</button>
          </form>
          <p class="referral-redeem-msg" id="redeemMessage"></p>
        </div>
      </div>
    `;
    panel.classList.add('active');
  }

  function hidePanel() {
    const panel = document.getElementById('referralPanel');
    if (panel) panel.classList.remove('active');
  }

  function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
      if (typeof showToast === 'function') showToast('Referral code copied!');
    }).catch(() => {});
  }

  function copyLink(url) {
    navigator.clipboard.writeText(url).then(() => {
      if (typeof showToast === 'function') showToast('Share link copied!');
    }).catch(() => {});
  }

  function handleRedeem(e) {
    e.preventDefault();
    const code = document.getElementById('redeemCodeInput').value.trim().toUpperCase();
    const msg = document.getElementById('redeemMessage');
    if (!code) return;
    const result = redeemCode(code);
    if (msg) {
      msg.textContent = result.ok ? result.message : result.error;
      msg.style.color = result.ok ? '#6ee7b7' : '#f87171';
    }
  }

  function checkUrlReferral() {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      localStorage.setItem('gda_pending_referral', ref);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  function applyPendingReferral() {
    const pending = localStorage.getItem('gda_pending_referral');
    if (pending && typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
      const result = redeemCode(pending);
      localStorage.removeItem('gda_pending_referral');
      if (result.ok && typeof showToast === 'function') {
        showToast(result.message);
      }
    }
  }

  return {
    getOrCreateCode, getReferralStats, redeemCode,
    getShareUrl, getShareText, showReferralPanel, hidePanel,
    copyCode, copyLink, handleRedeem, checkUrlReferral, applyPendingReferral
  };
})();
