// ===== GETDEADDICTED ACADEMY — EMAIL DRIP SEQUENCES =====
// 7-email onboarding sequence + re-engagement emails
// Ready for Resend API integration
// Run with: node email-sequences.js to output all templates

const BRAND = {
  name: 'GetDeaddicted Academy',
  url: 'https://academy.getdeaddicted.com',
  from: 'hello@getdeaddicted.com',
  color: '#6ee7b7',
  bg: '#0a0a0f'
};

function wrap(subject, body) {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:system-ui,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:2rem 1rem;">
  <div style="text-align:center;margin-bottom:1.5rem;">
    <a href="${BRAND.url}" style="color:${BRAND.color};font-size:0.85rem;font-weight:600;text-decoration:none;">GETDEADDICTED ACADEMY</a>
  </div>
  <div style="background:#12121a;border-radius:12px;padding:1.5rem;border:1px solid rgba(110,231,183,0.1);">
    ${body}
  </div>
  <div style="text-align:center;margin-top:1.5rem;">
    <p style="color:#475569;font-size:0.7rem;">
      <a href="${BRAND.url}" style="color:#475569;">GetDeaddicted Academy</a> &middot;
      <a href="${BRAND.url}?unsubscribe=true" style="color:#475569;">Unsubscribe</a>
    </p>
  </div>
</div>
</body></html>`;
}

function btn(text, url) {
  return `<div style="text-align:center;margin:1.5rem 0;">
    <a href="${url}" style="background:linear-gradient(135deg,#6ee7b7,#3b82f6);color:#0a0a0f;padding:0.7rem 2rem;border-radius:8px;font-weight:700;text-decoration:none;display:inline-block;">${text}</a>
  </div>`;
}

const ONBOARDING_SEQUENCE = [
  {
    day: 0,
    delay: '0h',
    subject: 'Welcome to GetDeaddicted Academy! Here\'s where to start.',
    body: (name) => wrap('Welcome!', `
      <p style="color:#e0e0e0;font-size:1rem;">Hi ${name},</p>
      <p style="color:#94a3b8;">Welcome to GetDeaddicted Academy! You just took the first step toward a healthier digital life for your family.</p>
      <p style="color:#94a3b8;"><strong style="color:#e0e0e0;">Here's what to do first:</strong></p>
      <ol style="color:#94a3b8;padding-left:1.2rem;">
        <li style="margin-bottom:0.5rem;"><strong style="color:#6ee7b7;">Start Course 1:</strong> "How Screens Hook Your Brain" — it's free and takes about 15 minutes</li>
        <li style="margin-bottom:0.5rem;"><strong style="color:#6ee7b7;">Add your children:</strong> Set up their profiles in the Parent Dashboard</li>
        <li style="margin-bottom:0.5rem;"><strong style="color:#6ee7b7;">Turn on voice narration:</strong> Your kids can listen along as they learn</li>
      </ol>
      ${btn('Start Course 1', BRAND.url + '/#courses')}
      <p style="color:#475569;font-size:0.8rem;">You have 5 free courses. No credit card required.</p>
    `)
  },
  {
    day: 1,
    delay: '24h',
    subject: 'Did you know? Your child\'s brain vs. app designers',
    body: (name) => wrap('Did you know?', `
      <p style="color:#e0e0e0;">Hi ${name},</p>
      <p style="color:#94a3b8;">Here's something most parents don't realize:</p>
      <div style="background:rgba(110,231,183,0.06);border-left:3px solid #6ee7b7;padding:1rem;margin:1rem 0;border-radius:0 8px 8px 0;">
        <p style="color:#e0e0e0;margin:0;font-size:0.95rem;">The average app is designed by a team of 50+ engineers and psychologists whose <em>entire job</em> is to make it impossible to put down. Your child isn't fighting willpower — they're fighting billion-dollar teams.</p>
      </div>
      <p style="color:#94a3b8;">That's exactly what Course 1 teaches. When kids understand the tricks, they stop falling for them.</p>
      <p style="color:#94a3b8;">One parent told us: <em>"My 9-year-old now sets her OWN screen time limits after Course 1."</em></p>
      ${btn('Start Learning', BRAND.url + '/#courses')}
    `)
  },
  {
    day: 3,
    delay: '72h',
    subject: 'Your child earned their first badge! (or they will today)',
    body: (name) => wrap('Badges!', `
      <p style="color:#e0e0e0;">Hi ${name},</p>
      <p style="color:#94a3b8;">GetDeaddicted Academy has 12 achievement badges — from "First Steps" (complete 1 course) to "Wellness Master" (complete all 50).</p>
      <p style="color:#94a3b8;">Kids can earn XP points, level up (12 levels!), and complete daily challenges. It turns learning into a game — without a screen addiction.</p>
      <p style="color:#94a3b8;"><strong style="color:#e0e0e0;">Today's challenge:</strong> Complete one course and earn the "First Steps" badge. It takes about 15 minutes.</p>
      ${btn('Earn Your First Badge', BRAND.url + '/#courses')}
      <p style="color:#475569;font-size:0.8rem;">Pro tip: Download the completion certificate and share it on social media!</p>
    `)
  },
  {
    day: 5,
    delay: '120h',
    subject: 'Free printable: Family Digital Wellness Week',
    body: (name) => wrap('Free Printable', `
      <p style="color:#e0e0e0;">Hi ${name},</p>
      <p style="color:#94a3b8;">We made a free <strong>Family Digital Wellness Week</strong> activity sheet — 7 days of fun offline challenges for the whole family:</p>
      <ul style="color:#94a3b8;padding-left:1.2rem;">
        <li>Monday: Screen-Free Dinner</li>
        <li>Tuesday: Nature Walk Scavenger Hunt</li>
        <li>Wednesday: Board Game Night</li>
        <li>Thursday: Creative Hour</li>
        <li>Friday: Phone Stack Challenge</li>
        <li>Weekend: The Big Unplug</li>
      </ul>
      ${btn('Get Free Printable', BRAND.url)}
      <p style="color:#94a3b8;">Just click "Free Printables" at the bottom of our site. Print it, stick it on the fridge, and try one challenge each day.</p>
    `)
  },
  {
    day: 7,
    delay: '168h',
    subject: 'Your free trial is ending — here\'s what you\'d be missing',
    body: (name) => wrap('Trial Ending', `
      <p style="color:#e0e0e0;">Hi ${name},</p>
      <p style="color:#94a3b8;">Your free access includes 5 courses. Here's what you'd unlock with Premium:</p>
      <table style="width:100%;color:#94a3b8;font-size:0.88rem;margin:1rem 0;">
        <tr><td style="padding:0.4rem 0;">Courses</td><td style="color:#64748b;">5</td><td style="color:#6ee7b7;font-weight:600;">All 50</td></tr>
        <tr><td style="padding:0.4rem 0;">Parent Dashboard</td><td style="color:#6ee7b7;">&#10003;</td><td style="color:#6ee7b7;">&#10003;</td></tr>
        <tr><td style="padding:0.4rem 0;">AI Wellness Coach</td><td style="color:#64748b;">&#10007;</td><td style="color:#6ee7b7;">&#10003;</td></tr>
        <tr><td style="padding:0.4rem 0;">Certificates</td><td style="color:#64748b;">&#10007;</td><td style="color:#6ee7b7;">&#10003;</td></tr>
        <tr><td style="padding:0.4rem 0;">Family Profiles (5 kids)</td><td style="color:#64748b;">&#10007;</td><td style="color:#6ee7b7;">&#10003;</td></tr>
      </table>
      <p style="color:#e0e0e0;font-size:1.1rem;text-align:center;font-weight:700;">$59.99/year — that's $5/month</p>
      <p style="color:#94a3b8;text-align:center;">Less than one trip to the movies.</p>
      ${btn('Upgrade to Premium', BRAND.url + '/#pricing')}
    `)
  },
  {
    day: 10,
    delay: '240h',
    subject: 'Refer a friend, both get a free month',
    body: (name) => wrap('Refer & Earn', `
      <p style="color:#e0e0e0;">Hi ${name},</p>
      <p style="color:#94a3b8;">Know another family worried about screen time?</p>
      <p style="color:#94a3b8;">Share your referral code and <strong style="color:#6ee7b7;">you both get one free month of Premium</strong>. No limits — refer 12 friends and get a full year free.</p>
      ${btn('Get My Referral Code', BRAND.url)}
      <p style="color:#94a3b8;">Find your code in the Dashboard under "Refer & Earn."</p>
    `)
  },
  {
    day: 14,
    delay: '336h',
    subject: 'Teachers: bring digital wellness to your classroom',
    body: (name) => wrap('For Teachers', `
      <p style="color:#e0e0e0;">Hi ${name},</p>
      <p style="color:#94a3b8;">Are you a teacher, or do you know one? Our Classroom tier is perfect for SEL (Social-Emotional Learning) blocks:</p>
      <ul style="color:#94a3b8;padding-left:1.2rem;">
        <li>All 50 courses, kid-friendly for ages 5+</li>
        <li>Teacher dashboard with student progress tracking</li>
        <li>Assignment system — assign courses to your class</li>
        <li>Printable worksheets for every course</li>
        <li>Up to 35 students per class</li>
      </ul>
      <p style="color:#e0e0e0;font-size:1rem;text-align:center;font-weight:700;">$199/year per teacher</p>
      ${btn('Learn More', BRAND.url + '/#pricing')}
      <p style="color:#475569;font-size:0.8rem;">Forward this email to a teacher you know. They'll thank you.</p>
    `)
  }
];

const RE_ENGAGEMENT = [
  {
    trigger: 'inactive_7d',
    subject: 'We miss you! Your streak is waiting.',
    body: (name) => wrap('Come Back', `
      <p style="color:#e0e0e0;">Hi ${name},</p>
      <p style="color:#94a3b8;">It's been a week since your last visit. Your learning streak wants to keep going!</p>
      <p style="color:#94a3b8;">Just 5 minutes today keeps the habit alive. Pick up where you left off:</p>
      ${btn('Continue Learning', BRAND.url)}
    `)
  },
  {
    trigger: 'inactive_30d',
    subject: 'A lot has changed at GetDeaddicted Academy',
    body: (name) => wrap('We\'ve Grown', `
      <p style="color:#e0e0e0;">Hi ${name},</p>
      <p style="color:#94a3b8;">It's been a while! Here's what's new:</p>
      <ul style="color:#94a3b8;padding-left:1.2rem;">
        <li>AI Wellness Coach — ask questions as you learn</li>
        <li>XP & Levels — 12 levels to reach</li>
        <li>Daily Challenges — new challenge every day</li>
        <li>Spanish language support</li>
        <li>Printable family activity sheets</li>
      </ul>
      ${btn('See What\'s New', BRAND.url)}
    `)
  }
];

function exportAll() {
  const output = {
    onboarding: ONBOARDING_SEQUENCE.map(email => ({
      day: email.day,
      delay: email.delay,
      subject: email.subject,
      html: email.body('{{name}}')
    })),
    reEngagement: RE_ENGAGEMENT.map(email => ({
      trigger: email.trigger,
      subject: email.subject,
      html: email.body('{{name}}')
    })),
    summary: {
      totalEmails: ONBOARDING_SEQUENCE.length + RE_ENGAGEMENT.length,
      onboardingDays: ONBOARDING_SEQUENCE.map(e => e.day),
      reEngagementTriggers: RE_ENGAGEMENT.map(e => e.trigger)
    }
  };
  return output;
}

// CLI mode
if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  const path = require('path');
  const outDir = path.join(__dirname, 'dist', 'email-templates');
  fs.mkdirSync(outDir, { recursive: true });

  const data = exportAll();

  // Write individual HTML files
  data.onboarding.forEach((email, i) => {
    fs.writeFileSync(path.join(outDir, `onboarding-day-${email.day}.html`), email.html);
  });
  data.reEngagement.forEach(email => {
    fs.writeFileSync(path.join(outDir, `re-engage-${email.trigger}.html`), email.html);
  });

  // Write summary
  fs.writeFileSync(path.join(outDir, 'sequence.json'), JSON.stringify(data, null, 2));

  console.log(`Generated ${data.summary.totalEmails} email templates in dist/email-templates/`);
  console.log(`  Onboarding: ${data.onboarding.length} emails (days ${data.summary.onboardingDays.join(', ')})`);
  console.log(`  Re-engagement: ${data.reEngagement.length} emails`);
}

if (typeof module !== 'undefined') module.exports = { exportAll, ONBOARDING_SEQUENCE, RE_ENGAGEMENT };
