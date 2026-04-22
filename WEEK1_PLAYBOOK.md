# Week 1 Launch Playbook

## Deploy Day (30 minutes total)

### Step 1: Stripe (10 min)
```bash
# Option A: Automated (requires Stripe CLI)
./setup-stripe.sh

# Option B: Manual
# 1. Create account at stripe.com
# 2. Create product "GetDeaddicted Academy Premium"
# 3. Add 3 recurring prices: $7.99/mo, $59.99/yr, $79.99/yr
# 4. Copy publishable key + price IDs into paywall.js
```

### Step 2: Build + Deploy (5 min)
```bash
./build.sh
cd dist
npx vercel --prod
# Follow prompts to link to your Vercel account
```

### Step 3: Domain (5 min)
```bash
# In Vercel dashboard:
# Settings > Domains > Add "academy.getdeaddicted.com"
# Update DNS: CNAME to cname.vercel-dns.com
```

### Step 4: Verify (10 min)
- [ ] Site loads at production URL
- [ ] Sign up with test email
- [ ] Start Course 1, verify voice narration plays
- [ ] Hit paywall at Course 6, verify Stripe checkout opens
- [ ] Complete Course 1, verify certificate generates
- [ ] Check Parent Dashboard shows progress
- [ ] Test on phone (iPhone Safari + Android Chrome)
- [ ] Submit sitemap to Google Search Console

---

## Launch Day (Day 0)

### Morning: Soft Launch
- [ ] Deploy is live, Stripe is live
- [ ] Create your own parent account + child profile
- [ ] Go through Course 1 completely as a real user
- [ ] Fix anything that feels broken or confusing

### Afternoon: Social Blitz
Post on ALL channels within 2 hours:

**TikTok (highest priority):**
Post the first hook script from `dist/social-content/tiktok.json`:
> "My kid hasn't asked for the iPad in 3 days. Here's what happened."

Film yourself or your kid. 60 seconds. Link in bio.

**Twitter/X:**
Post the first standalone tweet from `dist/social-content/twitter.json`. Then start Thread #1 (Understanding Screen Addiction).

**Instagram:**
Post the first carousel (Understanding Screen Addiction category) from `dist/social-content/instagram.json`.

**Reddit:**
- r/Parenting — share your story, mention the free courses naturally
- r/digitalminimalism — share the science behind Course 1
- r/Teachers — mention the Classroom tier for SEL

### Evening: Email
Send welcome email to anyone who signed up today using the template in `dist/email-templates/onboarding-day-0.html`.

---

## Day 1-3: Momentum

### Daily Tasks (30 min/day)
- [ ] Post 1 TikTok (rotate through the 5 hook scripts)
- [ ] Post 1 tweet (work through the threads)
- [ ] Check Stripe dashboard for conversions
- [ ] Check admin dashboard (site footer > Admin, PIN: 999999)
- [ ] Reply to any comments/DMs within 2 hours

### Outreach (Day 1)
Email 5 pediatricians in your area:
```
Subject: Free digital wellness resource for your patients

Hi Dr. [Name],

I built a free educational platform that helps kids (ages 5+) 
understand screen addiction through interactive courses.

It teaches the science — dopamine, design tricks, habit loops — 
in kid-friendly language with voice narration and quizzes.

Many pediatricians are recommending it to families as a 
starting point for screen time conversations.

Would you be open to sharing it with patients? 
I have printable handouts for your waiting room.

Free to try: academy.getdeaddicted.com

Best,
[Your name]
GetDeaddicted Academy
```

### Outreach (Day 2)
Email 5 teachers/school counselors:
```
Subject: Free SEL resource: 50 digital wellness courses for students

Hi [Name],

I created GetDeaddicted Academy — 50 interactive courses 
that teach kids about screen time, social media, gaming balance, 
and digital wellness.

Perfect for a 15-minute daily SEL block:
- Voice narration reads everything aloud
- Built-in quizzes and reflection exercises  
- Printable worksheets
- Teacher dashboard with progress tracking

The Classroom tier is $199/year for up to 35 students.
Want to try it free first?

academy.getdeaddicted.com

Best,
[Your name]
```

---

## Day 4-7: Optimize

### Check Metrics
Look at your admin dashboard and analytics for:

| Metric | Target | Action if Below |
|---|---|---|
| Signups/day | 20+ | Increase posting frequency |
| Course 1 completion | 60%+ | Shorten Course 1 or improve narration |
| Paywall conversion | 5%+ | A/B test paywall position |
| D1 retention | 40%+ | Check onboarding flow |

### A/B Test the Paywall
In `admin.js`, the feature flags include `paywall_position`. Test moving it from after Course 3 to after Course 2 (higher intent moment).

### Content That Converts Best (from our research)
1. **"My kid did X after Course Y"** — transformation stories
2. **"Did you know [brain fact]?"** — use the fact shorts from TikTok content
3. **"Screen time chart that actually works"** — the 4-step hook
4. **Parent commenting back about their experience** — reply engagement

---

## Week 1 KPIs

| KPI | Goal | How to Check |
|---|---|---|
| Total signups | 200+ | Admin dashboard |
| Paid conversions | 10+ | Stripe dashboard |
| MRR | $50+ | Stripe dashboard |
| TikTok views | 10K+ | TikTok analytics |
| Course completions | 100+ | Admin dashboard |
| Email subscribers | 50+ | Admin dashboard |
| Google indexed pages | 30+ | Google Search Console |

---

## Week 1 Budget

| Item | Cost |
|---|---|
| Vercel hosting | $0 (hobby tier) |
| Stripe fees | 2.9% + $0.30 per txn |
| ElevenLabs audio (if not done) | ~$38 one-time |
| Domain (if new) | ~$12/year |
| Ads (optional) | $0 (organic first) |
| **Total** | **~$50 one-time** |

---

## Quick Reference

```bash
# Rebuild after changes
./build.sh

# Redeploy
cd dist && vercel --prod

# Generate audio
export ELEVENLABS_API_KEY=xxx && ./generate-all-audio.sh

# Run tests
node tests.js && node test-runtime.js

# Admin dashboard
# Go to site footer > Admin link > PIN: 999999
```
