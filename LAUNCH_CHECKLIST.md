# GetDeaddicted Academy — Launch Checklist

## Pre-Launch (You Do These)

### Credentials & Accounts
- [ ] Create Stripe account at stripe.com
- [ ] Get Stripe publishable key and create price IDs for Monthly ($7.99), Annual ($59.99), Family ($79.99)
- [ ] Replace `pk_test_REPLACE` in `paywall.js` with real Stripe publishable key
- [ ] Replace `price_*_REPLACE` IDs in `paywall.js` with real Stripe price IDs
- [ ] Get ElevenLabs API key at elevenlabs.io
- [ ] Run `export ELEVENLABS_API_KEY=xxx && ./generate-all-audio.sh` to generate all 3,205 voice narrations (~$38)
- [ ] Create Vercel account and link to GitHub repo
- [ ] (Optional) Set up PostHog at posthog.com for analytics
- [ ] (Optional) Set up Resend at resend.com for email delivery

### Domain & DNS
- [ ] Register/configure `academy.getdeaddicted.com` domain
- [ ] Point DNS to Vercel
- [ ] Verify SSL certificate

### Brand Assets
- [ ] Create 192x192 icon (`icon-192.png`) and 512x512 icon (`icon-512.png`) for PWA
- [ ] Create `favicon.ico`
- [ ] Create `og-image.png` (1200x630) for social sharing fallback
- [ ] (Optional) Install `npm install canvas` and run `node og-generator.js` for per-course OG images

### Content Review
- [ ] Review 5 free courses (IDs: 1, 4, 5, 31, 41) — these are first impressions
- [ ] Test voice narration quality on Course 1
- [ ] Verify printable worksheets look good when printed

## Automated Checks (Already Passing)

```bash
node tests.js  # 117/117 tests passing
```

- [x] 50 courses with complete rich content (verified by tests)
- [x] All 50 courses have narration, keyPoints, exercises
- [x] 10 expansion files load without errors
- [x] All 23 JS modules have valid syntax
- [x] All 36+ HTML element IDs present
- [x] SEO meta tags (og:title, og:description, twitter:card, JSON-LD)
- [x] PWA manifest linked
- [x] Production bundle builds successfully
- [x] Service worker generated
- [x] 50 course SEO pages + 10 category SEO pages
- [x] 51 blog posts (50 + index)
- [x] 63-URL sitemap
- [x] vercel.json valid with proper caching + security headers

## Build & Deploy

```bash
# 1. Build everything (one command)
./build.sh

# 2. Deploy to Vercel
cd dist && vercel --prod

# Or: push to GitHub + auto-deploy via Vercel Git integration
git add -A && git commit -m "Launch v1.0" && git push
```

## Post-Launch (Day 1)

- [ ] Verify site loads at production URL
- [ ] Test signup flow end-to-end
- [ ] Test Stripe payment flow (use test card 4242...)
- [ ] Verify voice narration plays in Course 1
- [ ] Test on iPhone Safari + Android Chrome
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Post first TikTok (content in `dist/social-content/tiktok.json`)
- [ ] Post first Twitter thread (content in `dist/social-content/twitter.json`)
- [ ] Send launch email to waitlist (template in `email.js`)

## Post-Launch (Week 1)

- [ ] Monitor Stripe dashboard for first conversions
- [ ] Check PostHog for user funnel drop-offs
- [ ] Review admin dashboard (footer > Admin, PIN: 999999)
- [ ] A/B test paywall position (Course 2 end vs Course 3)
- [ ] Reach out to 5 pediatricians with partner program
- [ ] Post 2x/day on TikTok
- [ ] Post 1x/day on Twitter
- [ ] Post 3x/week on Instagram

## Product Inventory

| Asset | Count |
|---|---|
| Feature modules | 22 |
| Build/test tools | 7 |
| Automated tests | 117 |
| Courses | 50 |
| Course slides | 3,205 |
| Narration characters | 1,276,948 |
| SEO pages | 60 |
| Blog posts | 51 |
| Social content pieces | 103 |
| Spanish UI translations | 115 keys (100%) |
| Total app LOC | ~5,500 |
| CSS LOC | ~2,250 |
| Production dist files | 770 |
