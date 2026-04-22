// ===== GETDEADDICTED ACADEMY — CERTIFICATE GENERATOR =====
// Generates beautiful completion certificates as downloadable PNG via Canvas API

const Certificate = (() => {
  const WIDTH = 1200;
  const HEIGHT = 850;

  function generate(courseName, userName, level, modules, duration, categoryIcon) {
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    bgGrad.addColorStop(0, '#0a0a1a');
    bgGrad.addColorStop(0.5, '#0f1028');
    bgGrad.addColorStop(1, '#0a0a1a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Border frame
    _drawBorder(ctx);

    // Top decorative line
    const topGrad = ctx.createLinearGradient(200, 0, WIDTH - 200, 0);
    topGrad.addColorStop(0, 'rgba(110,231,183,0)');
    topGrad.addColorStop(0.5, 'rgba(110,231,183,0.6)');
    topGrad.addColorStop(1, 'rgba(59,130,246,0)');
    ctx.strokeStyle = topGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 80);
    ctx.lineTo(WIDTH - 200, 80);
    ctx.stroke();

    // Trophy icon
    ctx.font = '52px serif';
    ctx.textAlign = 'center';
    ctx.fillText('\u{1F3C6}', WIDTH / 2, 140);

    // "Certificate of Completion"
    ctx.font = '600 14px system-ui, sans-serif';
    ctx.fillStyle = '#6ee7b7';
    ctx.letterSpacing = '4px';
    ctx.fillText('CERTIFICATE OF COMPLETION', WIDTH / 2, 175);
    ctx.letterSpacing = '0px';

    // Divider
    _drawDivider(ctx, 195);

    // "This certifies that"
    ctx.font = '300 16px system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('This certifies that', WIDTH / 2, 230);

    // User name
    ctx.font = '700 38px system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(_truncate(userName, 30), WIDTH / 2, 280);

    // "has successfully completed"
    ctx.font = '300 16px system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('has successfully completed the course', WIDTH / 2, 320);

    // Course name
    const courseGrad = ctx.createLinearGradient(200, 340, WIDTH - 200, 340);
    courseGrad.addColorStop(0, '#6ee7b7');
    courseGrad.addColorStop(1, '#3b82f6');
    ctx.font = '700 32px system-ui, sans-serif';
    ctx.fillStyle = courseGrad;
    ctx.fillText(_truncate(courseName, 45), WIDTH / 2, 370);

    // Divider
    _drawDivider(ctx, 400);

    // Stats row
    ctx.font = '600 14px system-ui, sans-serif';
    ctx.fillStyle = '#64748b';
    const statsY = 440;
    const stats = [
      `${modules} Modules`,
      `${duration}`,
      `${level} Level`
    ];
    const statSpacing = 200;
    const startX = WIDTH / 2 - statSpacing;
    stats.forEach((stat, i) => {
      const x = startX + i * statSpacing;
      // Stat pill background
      ctx.fillStyle = 'rgba(110,231,183,0.08)';
      const textWidth = ctx.measureText(stat).width;
      _roundRect(ctx, x - textWidth / 2 - 16, statsY - 14, textWidth + 32, 28, 14);
      ctx.fill();
      ctx.fillStyle = '#6ee7b7';
      ctx.fillText(stat, x, statsY + 4);
    });

    // Motivational message
    ctx.font = '400 18px system-ui, sans-serif';
    ctx.fillStyle = '#e0e0e0';
    ctx.fillText('You took a real step toward a healthier digital life.', WIDTH / 2, 510);
    ctx.font = '300 16px system-ui, sans-serif';
    ctx.fillStyle = '#6ee7b7';
    ctx.fillText('Keep going. You\'re worth it.', WIDTH / 2, 540);

    // Bottom decorative line
    const botGrad = ctx.createLinearGradient(200, 0, WIDTH - 200, 0);
    botGrad.addColorStop(0, 'rgba(110,231,183,0)');
    botGrad.addColorStop(0.5, 'rgba(59,130,246,0.4)');
    botGrad.addColorStop(1, 'rgba(110,231,183,0)');
    ctx.strokeStyle = botGrad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(200, 580);
    ctx.lineTo(WIDTH - 200, 580);
    ctx.stroke();

    // Date
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.font = '400 13px system-ui, sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText(dateStr, WIDTH / 2, 620);

    // Seal / Logo
    ctx.font = '36px serif';
    ctx.fillText('\u2727', WIDTH / 2, 680);
    ctx.font = '600 13px system-ui, sans-serif';
    const brandGrad = ctx.createLinearGradient(WIDTH / 2 - 80, 700, WIDTH / 2 + 80, 700);
    brandGrad.addColorStop(0, '#6ee7b7');
    brandGrad.addColorStop(1, '#3b82f6');
    ctx.fillStyle = brandGrad;
    ctx.fillText('GetDeaddicted Academy', WIDTH / 2, 710);
    ctx.font = '300 11px system-ui, sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText('academy.getdeaddicted.com', WIDTH / 2, 730);

    // Footer
    ctx.font = '300 10px system-ui, sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText('\u00A9 2026 GetDeaddicted LLC. All rights reserved.', WIDTH / 2, 780);

    return canvas;
  }

  function _drawBorder(ctx) {
    const m = 20;
    ctx.strokeStyle = 'rgba(110,231,183,0.15)';
    ctx.lineWidth = 1;
    _roundRect(ctx, m, m, WIDTH - 2 * m, HEIGHT - 2 * m, 16);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(59,130,246,0.08)';
    _roundRect(ctx, m + 8, m + 8, WIDTH - 2 * (m + 8), HEIGHT - 2 * (m + 8), 12);
    ctx.stroke();
  }

  function _drawDivider(ctx, y) {
    const grad = ctx.createLinearGradient(350, y, WIDTH - 350, y);
    grad.addColorStop(0, 'rgba(110,231,183,0)');
    grad.addColorStop(0.5, 'rgba(110,231,183,0.25)');
    grad.addColorStop(1, 'rgba(110,231,183,0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(350, y);
    ctx.lineTo(WIDTH - 350, y);
    ctx.stroke();
  }

  function _roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function _truncate(str, max) {
    return str.length > max ? str.substring(0, max - 1) + '\u2026' : str;
  }

  function download(canvas, courseName) {
    const link = document.createElement('a');
    link.download = `GetDeaddicted-${courseName.replace(/[^a-zA-Z0-9]/g, '-')}-Certificate.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function getDataUrl(canvas) {
    return canvas.toDataURL('image/png');
  }

  function showCertificateModal(course) {
    const user = typeof Auth !== 'undefined' ? Auth.getActiveProfile() : null;
    const userName = user ? user.name : 'Learner';
    const cat = typeof CATEGORIES !== 'undefined' ? CATEGORIES.find(c => c.id === course.category) : null;

    const canvas = generate(
      course.title,
      userName,
      course.level,
      course.modules.length,
      course.duration,
      cat ? cat.icon : ''
    );

    const dataUrl = getDataUrl(canvas);

    // Build share URLs
    const shareText = `I just completed "${course.title}" on GetDeaddicted Academy! Taking back my screen time. \u{1F3C6}`;
    const shareUrl = 'https://academy.getdeaddicted.com';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;

    const modal = document.getElementById('certificateModal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="cert-modal-content">
        <button class="cert-close" onclick="hideCertificateModal()">&times;</button>
        <img src="${dataUrl}" alt="Certificate of Completion" class="cert-preview">
        <div class="cert-actions">
          <button class="btn btn-primary btn-sm" onclick="Certificate.download(Certificate._lastCanvas, '${course.title.replace(/'/g, "\\'")}')">
            Download PNG
          </button>
          <a href="${twitterUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm cert-share-btn">
            Share on X
          </a>
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm cert-share-btn">
            Share on WhatsApp
          </a>
          <button class="btn btn-secondary btn-sm" onclick="Certificate.copyLink()">
            Copy Link
          </button>
        </div>
      </div>
    `;
    modal.classList.add('active');
    Certificate._lastCanvas = canvas;
  }

  function copyLink() {
    const url = 'https://academy.getdeaddicted.com';
    navigator.clipboard.writeText(url).then(() => {
      if (typeof showToast === 'function') showToast('Link copied!');
    }).catch(() => {
      if (typeof showToast === 'function') showToast('Could not copy link');
    });
  }

  return { generate, download, getDataUrl, showCertificateModal, copyLink, _lastCanvas: null };
})();

function hideCertificateModal() {
  const modal = document.getElementById('certificateModal');
  if (modal) modal.classList.remove('active');
}
