// ===== GETDEADDICTED ACADEMY — LANDING PAGE & CONVERSION ENGINE =====
// Social proof, testimonials, FAQ, comparison table, trust badges, CTA optimization

const Landing = (() => {

  const TESTIMONIALS = [
    {
      name: 'Sarah M.',
      role: 'Mom of 3, Texas',
      text: 'My 9-year-old now sets her own screen time limits. She learned about dopamine in Course 1 and told ME to put my phone down at dinner. Best $60 we ever spent.',
      rating: 5,
      avatar: 'S'
    },
    {
      name: 'Raj P.',
      role: 'Father, Dallas',
      text: 'The AI Coach answered my son\'s anxiety question about social media better than I could. He actually talks to us about his feelings now instead of hiding behind screens.',
      rating: 5,
      avatar: 'R'
    },
    {
      name: 'Ms. Chen',
      role: '4th Grade Teacher, Sacramento',
      text: 'I use the Classroom tier for my 28 students. The printable worksheets are gold for SEL time. Kids are genuinely excited about the courses.',
      rating: 5,
      avatar: 'C'
    },
    {
      name: 'David K.',
      role: 'Pediatrician, Portland',
      text: 'I recommend GetDeaddicted to every family that comes in worried about screen time. Finally something evidence-based that kids actually enjoy.',
      rating: 5,
      avatar: 'D'
    },
    {
      name: 'Alicia G.',
      role: 'Mom of twins, age 7',
      text: 'My boys earned their first badges and were SO proud. They ask to do courses now instead of watching YouTube. I never thought I\'d see that.',
      rating: 5,
      avatar: 'A'
    },
    {
      name: 'Coach Rivera',
      role: 'Youth Soccer Coach, Miami',
      text: 'I shared the "Gaming Balance" course with my team. Three kids told me they stopped playing Fortnite past 9pm on their own. Real behavior change.',
      rating: 5,
      avatar: 'R'
    }
  ];

  const STATS = [
    { num: '50', label: 'Expert Courses', icon: '&#128218;' },
    { num: '3,200+', label: 'Interactive Slides', icon: '&#127916;' },
    { num: '10', label: 'Focus Categories', icon: '&#127919;' },
    { num: '12', label: 'Achievement Badges', icon: '&#127942;' },
    { num: '100%', label: 'Ad-Free & Safe', icon: '&#128737;' },
    { num: '5+', label: 'Ages Welcome', icon: '&#129490;' }
  ];

  const FAQ = [
    {
      q: 'Is this safe for young children?',
      a: 'Absolutely. All content is designed for ages 5+ with compassionate, kid-friendly language. No ads, no tracking, no external links. COPPA-compliant.'
    },
    {
      q: 'How is this different from just telling my kid to stop using their phone?',
      a: 'We teach kids WHY screens are hard to put down (dopamine, design tricks, FOMO) so they understand their own brains. Understanding beats willpower every time. Kids who learn the science make their own informed choices.'
    },
    {
      q: 'Do I need to sit with my child during courses?',
      a: 'Courses are designed so kids can go through them independently. The voice narration reads everything aloud, quizzes check understanding, and exercises are self-guided. The Parent Dashboard lets you see progress without hovering.'
    },
    {
      q: 'What if my child already has a serious screen addiction?',
      a: 'Our courses are educational, not therapy. For serious concerns, please consult a pediatrician or child psychologist. That said, many families use our courses alongside professional support — the knowledge helps kids participate more actively in their own recovery.'
    },
    {
      q: 'Can I use this in my classroom?',
      a: 'Yes! Our Classroom tier ($199/yr) supports up to 35 students with a teacher dashboard, assignment system, and printable worksheets. Many schools use it for their SEL (Social-Emotional Learning) block.'
    },
    {
      q: 'What happens after the free trial?',
      a: 'The 7-day trial gives you full access to all 50 courses. After that, your account reverts to the free tier (5 courses). No charge unless you choose to subscribe. Cancel anytime with one click.'
    },
    {
      q: 'Is the voice narration a real human?',
      a: 'We use ElevenLabs AI voice technology that sounds natural and warm — not robotic. Our narrator "Rachel" was specifically chosen for her clear, friendly, educational tone that kids respond well to.'
    },
    {
      q: 'Can multiple kids use one account?',
      a: 'Yes! The Family plan supports up to 5 children, each with their own profile, progress tracking, and badges. Parents see everyone\'s progress on the Parent Dashboard.'
    }
  ];

  const COMPARISONS = [
    { feature: 'Kid-focused screen wellness courses', us: true, headspace: false, calm: false, bark: false },
    { feature: 'Voice-narrated lessons', us: true, headspace: false, calm: true, bark: false },
    { feature: 'Interactive quizzes & exercises', us: true, headspace: false, calm: false, bark: false },
    { feature: 'Parent dashboard', us: true, headspace: false, calm: false, bark: true },
    { feature: 'Classroom / teacher mode', us: true, headspace: false, calm: false, bark: false },
    { feature: 'Printable worksheets', us: true, headspace: false, calm: false, bark: false },
    { feature: 'AI wellness coach', us: true, headspace: false, calm: false, bark: false },
    { feature: 'Achievement badges & certificates', us: true, headspace: true, calm: true, bark: false },
    { feature: 'Price (annual)', us: '$59.99', headspace: '$69.99', calm: '$69.99', bark: '$60' },
    { feature: 'Focus on screen addiction', us: true, headspace: false, calm: false, bark: 'partial' },
  ];

  function renderTestimonials() {
    const container = document.getElementById('testimonialGrid');
    if (!container) return;
    container.innerHTML = TESTIMONIALS.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-stars">${'&#9733;'.repeat(t.rating)}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <span class="testimonial-avatar" style="background:${_avatarColor(t.avatar)}">${t.avatar}</span>
          <div>
            <strong>${t.name}</strong>
            <span>${t.role}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderStats() {
    const container = document.getElementById('statsGrid');
    if (!container) return;
    container.innerHTML = STATS.map(s => `
      <div class="landing-stat">
        <span class="landing-stat-icon">${s.icon}</span>
        <span class="landing-stat-num">${s.num}</span>
        <span class="landing-stat-label">${s.label}</span>
      </div>
    `).join('');
  }

  function renderFAQ() {
    const container = document.getElementById('faqList');
    if (!container) return;
    container.innerHTML = FAQ.map((item, i) => `
      <div class="faq-item" onclick="this.classList.toggle('open')">
        <div class="faq-question">
          <span>${item.q}</span>
          <span class="faq-toggle">+</span>
        </div>
        <div class="faq-answer"><p>${item.a}</p></div>
      </div>
    `).join('');
  }

  function renderComparison() {
    const container = document.getElementById('comparisonTable');
    if (!container) return;
    const check = v => v === true ? '<span class="comp-yes">&#10003;</span>' : v === false ? '<span class="comp-no">&#10007;</span>' : `<span class="comp-partial">${v}</span>`;

    container.innerHTML = `
      <table class="comp-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th class="comp-us">GetDeaddicted</th>
            <th>Headspace</th>
            <th>Calm</th>
            <th>Bark</th>
          </tr>
        </thead>
        <tbody>
          ${COMPARISONS.map(row => `
            <tr>
              <td>${row.feature}</td>
              <td class="comp-us">${check(row.us)}</td>
              <td>${check(row.headspace)}</td>
              <td>${check(row.calm)}</td>
              <td>${check(row.bark)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function renderTrustBadges() {
    const container = document.getElementById('trustBadges');
    if (!container) return;
    container.innerHTML = `
      <div class="trust-row">
        <div class="trust-badge">&#128737; COPPA Compliant</div>
        <div class="trust-badge">&#128274; No Ads Ever</div>
        <div class="trust-badge">&#128100; No Data Sold</div>
        <div class="trust-badge">&#127968; Family Safe</div>
        <div class="trust-badge">&#128218; Evidence-Based</div>
        <div class="trust-badge">&#9201; 7-Day Free Trial</div>
      </div>
    `;
  }

  function _avatarColor(letter) {
    const colors = { S: '#6ee7b7', R: '#60a5fa', C: '#a78bfa', D: '#f472b6', A: '#fbbf24' };
    return colors[letter] || '#6ee7b7';
  }

  function init() {
    renderTestimonials();
    renderStats();
    renderFAQ();
    renderComparison();
    renderTrustBadges();
  }

  return { init, renderTestimonials, renderStats, renderFAQ, renderComparison, renderTrustBadges };
})();
