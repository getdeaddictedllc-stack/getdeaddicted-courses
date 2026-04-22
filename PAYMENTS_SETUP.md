# Payments Setup — Stripe + Razorpay

GetDeaddicted Academy accepts cards via **Stripe** (USD/EUR/GBP) and **Razorpay** (INR, UPI, GPay, PhonePe, Paytm). Currency is auto-detected per visitor.

Config lives in `config.js`. Until you wire real keys, the paywall uses a **simulated payment** fallback so the product is still demoable end-to-end — but no money is collected.

## 1. Razorpay (India — primary market)

### a. Create account

1. Sign up at **[razorpay.com](https://razorpay.com)** with your business email.
2. Complete KYC (PAN, bank account, business proof). Test mode works immediately; live mode needs KYC approval (usually ~24h).

### b. Grab your keys

1. Dashboard → **Settings → API Keys → Generate Test Key**.
2. Copy the **Key ID** (starts with `rzp_test_…`). The Secret is for server-side only — we never use it client-side.
3. Open `config.js` (or use the admin dashboard → PIN `999999` → Config):

```js
// config.js defaults (or set via window.GDA_CONFIG / localStorage)
razorpayKey: 'rzp_test_YOUR_KEY_HERE',
```

### c. Create subscription plans (recurring)

For monthly/annual subscriptions Razorpay needs pre-created **Plans**:

1. Dashboard → **Subscriptions → Plans → Create Plan**.
2. Create two plans:
   - `plan_monthly` — amount ₹499, frequency **monthly**.
   - `plan_annual` — amount ₹3999, frequency **yearly**.
3. Copy the plan IDs into `config.js`:

```js
razorpayMonthlyPlanId: 'plan_XXXXXXXXXXXXX',
razorpayAnnualPlanId:  'plan_YYYYYYYYYYYYY',
```

(The Founding Family lifetime deposit doesn't need a plan — it's a one-shot charge, handled via the regular checkout.)

### d. Go live

1. Razorpay dashboard → **Live Mode** toggle.
2. Regenerate keys in live mode (you'll get `rzp_live_…`).
3. Replace `razorpayKey` with the live key in `config.js`.

## 2. Stripe (global — USD/EUR/GBP)

### a. Create account

1. Sign up at **[stripe.com](https://stripe.com)**. Accept card payments is enabled by default.

### b. Grab your publishable key

1. Dashboard → **Developers → API keys**.
2. Copy the **Publishable key** (`pk_test_…` or `pk_live_…`).

### c. Create products + prices

Easiest path: run the provided helper:

```bash
./setup-stripe.sh
```

It prompts for your publishable key, creates the product + 3 prices ($7.99/mo, $59.99/yr, $79.99/yr family), and patches `paywall.js` for you.

Or do it manually in the dashboard and put the price IDs in `config.js`:

```js
stripeKey:                  'pk_test_YOUR_KEY',
stripeMonthlyPriceId:       'price_xxx',
stripeAnnualPriceId:        'price_yyy',
stripeFamilyAnnualPriceId:  'price_zzz',
stripeLifetimePriceId:      'price_lifetime',
stripeFoundingPriceId:      'price_founding',  // for the $9 deposit
```

## 3. Where to put the keys

Three options in priority order:

1. **`window.GDA_CONFIG`** — inject a `<script>` before `config.js` (best for Vercel/Netlify env injection):

    ```html
    <script>
      window.GDA_CONFIG = {
        stripeKey: 'pk_live_...',
        razorpayKey: 'rzp_live_...',
        // ...
      };
    </script>
    <script src="config.js"></script>
    ```

2. **`localStorage`** — admin dashboard saves them in `gda_config_<key>`. Good for solo dev / local testing.

3. **Edit `config.js` directly** — simple but don't commit live keys.

## 4. Currency detection logic

`paywall.js → detectCurrency()`:

1. User-set override in `localStorage.gda_currency` (currency switcher).
2. `navigator.language` — `hi`, `mr`, `bn`, `ta`, `te`, `*-IN` → INR. `*-GB` → GBP. Major EU langs → EUR.
3. `Intl.DateTimeFormat().resolvedOptions().timeZone` — `Asia/Kolkata` → INR, `Europe/London` → GBP, `Europe/*` → EUR.
4. Default → USD.

Razorpay is only used when currency resolves to INR. Stripe is used for everything else.

## 5. Testing checkouts

### Razorpay test cards

- **Success:** `4111 1111 1111 1111` — any future expiry, any CVV, OTP `1234`.
- **Failure:** `4000 0000 0000 0002`.
- UPI test: `success@razorpay`.

### Stripe test cards

- **Success:** `4242 4242 4242 4242`.
- **3-D Secure required:** `4000 0025 0000 3155`.
- **Declined:** `4000 0000 0000 0002`.

## 6. Go-live checklist

- [ ] Live Razorpay key in `config.js` / `window.GDA_CONFIG`.
- [ ] Live Stripe key + real price IDs.
- [ ] `founding.html` loads and shows the correct currency in your browser.
- [ ] Test INR checkout completes end-to-end (Razorpay test mode).
- [ ] Test USD checkout completes end-to-end (Stripe test mode).
- [ ] After payment, `Auth.isPaid()` returns `true` and all 50 courses unlock.
- [ ] Analytics `payment_success` event fires (visible in admin dashboard / PostHog).
- [ ] GST/tax configured in Razorpay dashboard if applicable.
- [ ] Refund policy linked in footer (legal.js renders it).
