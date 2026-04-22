# Sprint 04 — Day-1 Revenue Unlock (India-First)

**Sprint window:** 2026-04-22 → 2026-05-06
**PO/SM/Tech Lead:** Claude (autonomous PO-mode)
**Operator:** GetDeaddicted LLC

## Sprint Goal

> Go from zero paying customers to *first-paid-customer-capable* in **48 hours**, with India as the primary payment rail and a Founding Family deposit as the Day-1 cashflow play.

## Why now

Sprint 01–03 delivered a near-complete SaaS: 50 courses, 3,205 slides, 21 feature modules, ElevenLabs voice, animated avatar, 60 SEO pages, 51 blog posts, EN+ES i18n, auth, paywall, classroom tier, referral, affiliate. The product is **sellable on the content side**. What is blocking revenue is **wiring**:

1. Stripe keys are `pk_test_REPLACE` placeholders → no card can be charged today.
2. Razorpay is not integrated at all → India (primary ICP) cannot pay natively.
3. No "Founding Family" deposit page → the owner-stated Day-1 cashflow play doesn't exist yet.
4. i18n covers EN+ES, but owner said Hindi + Marathi are priority.
5. No WhatsApp share loop → the #1 organic-growth channel in India.
6. 14 modules of Sprint 01–03 work are uncommitted → blast risk if WT gets dirty.

Sprint 04 fixes all six. Everything else (native apps, premium AI coach, school admin polish) waits.

## Sprint Backlog (ranked by revenue impact)

| # | Story | Size | Revenue tag |
|---|---|---|---|
| US-01 | Commit Sprint 01–03 work as a clean baseline | S | infra |
| US-02 | Founding Family landing page (`founding.html` + `founding.js`) — ₹499 / $9 lifetime deposit, countdown, social proof | M | **direct revenue** |
| US-03 | Razorpay integration + multi-currency in `paywall.js` (auto-detect INR/USD, lifetime tier) | M | **direct revenue** |
| US-04 | Hindi (`hi`) + Marathi (`mr`) i18n locales — hero, CTAs, paywall, nav, pricing | M | **market expansion** |
| US-05 | WhatsApp share buttons (referral + Founding page) | S | **viral** |
| US-06 | `config.js` + `PAYMENTS_SETUP.md` walkthrough (Stripe + Razorpay) | S | go-live enabler |
| US-07 | Hook Founding page into `index.html` nav + add `#/founding` route | XS | conversion |
| US-08 | Multi-agent verification pass (user personas + QA) | S | quality |
| US-09 | Sprint review + retro doc | XS | process |

**Sprint capacity estimate:** ~14 story points. Matches the prior sprints' velocity (Sprint 01–03 averaged ~15 SP each per memory).

## Acceptance criteria (sprint-level)

- [ ] A parent in India can land on `academy.getdeaddicted.com/founding.html`, see ₹499 price in INR, click pay, and complete a Razorpay checkout (test mode).
- [ ] A parent in the US sees the same page with $9 USD, Stripe checkout.
- [ ] After payment, their account is upgraded to `founding_lifetime` with a 100-year expiry.
- [ ] `i18n.setLocale('hi')` or `setLocale('mr')` switches hero + CTAs without breaking layout.
- [ ] `WhatsApp` share button on Founding page opens `wa.me` with pre-filled message + referral code.
- [ ] `node tests.js && node test-runtime.js` still passes.
- [ ] `./build.sh` still builds a valid `dist/`.
- [ ] No placeholder keys in committed code paths that run without env config.
- [ ] All Sprint 04 work is committed with signed, descriptive commits.

## Daily scrums (simulated)

### Day 1 (2026-04-22)
- **Yesterday:** Sprint 01–03 shipped (per memory). 14 modules uncommitted.
- **Today:** Commit baseline; write SPRINT_04.md; build Founding Family page shell; extend paywall.js with currency detection + Razorpay.
- **Blockers:** None (Razorpay SDK is a CDN script, no build step needed).

### Day 2 (2026-04-23)
- **Yesterday:** Founding page live; Razorpay wired; baseline committed.
- **Today:** Hindi + Marathi i18n; WhatsApp share; config.js; `PAYMENTS_SETUP.md`.
- **Blockers:** None.

### Day 3 (2026-04-24)
- **Yesterday:** i18n + viral + docs shipped.
- **Today:** Verification pass (user + QA personas), P1 fixes, review doc.
- **Blockers:** None.

## Sprint KPIs

| Metric | Target | Measurement |
|---|---|---|
| Time to first Razorpay test transaction | < 48h | Razorpay test dashboard |
| Founding Family deposit conversion (visit → pay) | ≥ 4% | `analytics.js` funnel |
| Hindi language switch rate (in India traffic) | ≥ 25% | `analytics.js` `locale_changed` event |
| WhatsApp share clicks / paid conversion | ≥ 0.5 | `analytics.js` event ratio |
| `tests.js` + `test-runtime.js` | 100% pass | CI |

## Out of scope (punted to Sprint 05+)

- Real-backend auth (Clerk / Descope) — keeping localStorage for this sprint
- UPI/GPay direct integration (Razorpay covers it under the hood)
- Full translation of all 50 courses (only UI strings here)
- School-district portal polish
- HeyGen per-course avatar videos (already have SVG avatar)
- Native iOS/Android wrappers

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Owner hasn't activated Razorpay merchant account yet | `config.js` reads from localStorage `gda_razorpay_key` → owner flips one switch to go live |
| Stripe + Razorpay double-charging if both wired | Currency lock: INR → Razorpay only, everything else → Stripe |
| Lifetime tier cannibalizes subscriptions | Founding Family deposit is **capped at first 500 customers**; countdown + scarcity UI |
| COPPA: collecting parent email for payment | Standard parent-consent payment flow; no child data touches payment |

## Revenue projection (Sprint 04 end-state)

At 1,000 Founding Family visitors (organic + WhatsApp) × 4% conversion × ₹499 avg = **₹19,960 (~$240)** Sprint-level cashflow.
Not huge. But it is **real money**, **proof of willingness to pay**, and **deployment-validated Razorpay + Stripe rails** ready to scale.
