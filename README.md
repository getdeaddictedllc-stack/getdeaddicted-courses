# GetDeaddicted Academy

**Digital wellness education for kids & families. 50 interactive courses with voice narration, quizzes, badges, and certificates.**

Take Back Your Screen Time. Ages 5+.

## Quick Start

```bash
# Launch wizard (runs tests, builds, shows deploy options)
./launch.sh

# Or manually:
./build.sh                  # Build production bundle
cd dist && python3 -m http.server 8000   # Preview locally
```

## What This Is

A complete SaaS product for digital wellness education:

- **50 courses** across 10 categories (screen addiction, social media, gaming, focus, family, safety, mindfulness, creative alternatives)
- **3,205 interactive slides** with voice narration, quizzes, exercises, and reflections
- **Parent dashboard** with progress tracking, streaks, and family leaderboard
- **Classroom mode** for teachers with student rosters and assignments
- **AI wellness coach** chat widget
- **Gamification** — XP points, 12 levels, daily challenges, 12 badges
- **Certificates** — downloadable shareable PNG completion certificates
- **Referral program** — give-a-month/get-a-month viral loop
- **Affiliate program** — 20-30% commission for partners
- **Paywall** — 5 free courses, 3 paid tiers (Monthly $7.99, Annual $59.99, Family $79.99)
- **Classroom tier** — $199/yr per teacher for schools
- **i18n** — English + Spanish (100% coverage)

## Architecture

Pure vanilla JavaScript — no frameworks, no build tools beyond a concat script. Ships as static HTML/CSS/JS.

```
index.html              Single-page app entry
styles.css              2,280 lines hand-crafted CSS
app.js                  Core: rendering, presentation, course flow

# Feature Modules (21)
auth.js                 User auth, parent/child profiles
progress.js             Course progress, streaks, 12 badges
paywall.js              Stripe Checkout, 3 tiers, 5 free courses
dashboard.js            Parent dashboard, leaderboard
certificate.js          Canvas API certificate generator
coach.js                AI wellness coach chat widget
referral.js             Give/get referral program
onboarding.js           5-step personalization wizard
classroom.js            Teacher dashboard, rosters, assignments
email.js                Email capture, newsletter templates
printables.js           Print-friendly worksheets
notifications.js        In-app notification center
recommendations.js      Smart next-course engine
analytics.js            Event tracking (PostHog/GA4 ready)
gamification.js         XP, levels, daily challenges
landing.js              Testimonials, FAQ, comparison, trust badges
admin.js                Admin dashboard, feature flags, A/B testing
legal.js                Privacy, terms, COPPA, a11y, error handling
loader.js               Lazy-load expansion data per course
i18n.js                 Internationalization (EN + ES)
affiliate.js            Partner program (20-30% commission)

# Course Content
courses.js              50 course definitions + 10 categories
exp-{N}-{M}.js          Rich expansion data (10 files)
voiceover.js            Speech synthesis + MP3 playback
avatar.js               Animated SVG avatar with lip-sync

# Build & Deploy
build.sh                Production bundler (concat + SW + assets)
launch.sh               One-command launch wizard
vercel.json             Vercel deployment config
manifest.json           PWA manifest
sitemap.xml             63-URL sitemap
robots.txt              Search engine config
404.html                Branded error page

# Content Generation
generate-all-audio.sh   ElevenLabs MP3 generation (~$38)
generate-audio.js       Audio pipeline (ElevenLabs + Piper)
seo-pages.js            60 SEO landing pages
blog-generator.js       51 blog articles (146K words)
social-content.js       103 social media content pieces
og-generator.js         OG image generation
email-sequences.js      9 email templates (7 onboarding + 2 re-engagement)

# Testing
tests.js                117 structural tests
test-runtime.js         119 runtime integration tests
```

## Deploy to Production

### Option A: Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Build + deploy
./build.sh
cd dist && vercel --prod
```

### Option B: Any Static Host

```bash
./build.sh
# Upload dist/ folder to Netlify, GitHub Pages, Cloudflare Pages, etc.
```

## Configuration

### Stripe (Payments)

Edit `paywall.js` and replace:
```
pk_test_REPLACE → your Stripe publishable key
price_*_REPLACE → your Stripe price IDs
```

### ElevenLabs (Voice Narration)

```bash
export ELEVENLABS_API_KEY=your_key
./generate-all-audio.sh    # ~$38 for all 3,205 slides
```

Without this, the app uses browser Web Speech API as fallback.

### PostHog (Analytics)

Add the PostHog snippet to index.html. The `analytics.js` module auto-detects it.

## Testing

```bash
node tests.js          # 117 structural tests
node test-runtime.js   # 119 runtime tests
```

## Revenue Model

| Tier | Price | Target |
|---|---|---|
| Free | $0 | 5 courses, acquisition |
| Monthly | $7.99/mo | Individual families |
| Annual | $59.99/yr | Committed families |
| Family | $79.99/yr | Multi-child households |
| Classroom | $199/yr | Teachers (35 students) |
| Enterprise | Custom | School districts |

## Content Stats

| Metric | Value |
|---|---|
| Courses | 50 |
| Slides | 3,205 |
| Narration | 1,276,948 characters |
| SEO Pages | 60 |
| Blog Articles | 51 (146,274 words) |
| Social Content | 103 pieces |
| Email Templates | 9 |
| Languages | English + Spanish |

## License

Copyright 2026 GetDeaddicted LLC. All rights reserved.
