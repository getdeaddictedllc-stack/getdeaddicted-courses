#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# GetDeaddicted Academy — Stripe Setup
# Creates products and prices via Stripe CLI, then patches paywall.js
#
# PREREQUISITES:
#   1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
#   2. Login: stripe login
#   3. Run this script: ./setup-stripe.sh
#
# If you don't have Stripe CLI, follow the manual steps at the bottom.
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail
cd "$(dirname "$0")"

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║   GetDeaddicted Academy — Stripe Setup                  ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Check for Stripe CLI
if ! command -v stripe &>/dev/null; then
  echo "Stripe CLI not found."
  echo ""
  echo "Install it:"
  echo "  macOS:  brew install stripe/stripe-cli/stripe"
  echo "  Linux:  see https://stripe.com/docs/stripe-cli"
  echo ""
  echo "Or set up manually:"
  echo ""
  echo "  1. Go to https://dashboard.stripe.com/products"
  echo "  2. Create product: 'GetDeaddicted Academy Premium'"
  echo "  3. Add 3 prices:"
  echo "     - Monthly:       \$7.99/month  recurring"
  echo "     - Annual:        \$59.99/year  recurring"
  echo "     - Family Annual: \$79.99/year  recurring"
  echo "  4. Copy the publishable key from Developers > API keys"
  echo "  5. Copy each price ID (starts with price_)"
  echo "  6. Edit paywall.js and replace the REPLACE values"
  echo ""
  exit 1
fi

echo "Creating Stripe product and prices..."
echo ""

# Create product
PRODUCT_ID=$(stripe products create \
  --name="GetDeaddicted Academy Premium" \
  --description="Digital wellness courses for kids and families" \
  --metadata[app]="getdeaddicted" \
  2>/dev/null | grep '"id":' | head -1 | sed 's/.*"id": "//;s/".*//')

echo "  Product: $PRODUCT_ID"

# Create prices
MONTHLY_ID=$(stripe prices create \
  --product="$PRODUCT_ID" \
  --unit-amount=799 \
  --currency=usd \
  --recurring[interval]=month \
  --metadata[plan]="monthly" \
  2>/dev/null | grep '"id":' | head -1 | sed 's/.*"id": "//;s/".*//')

echo "  Monthly price ($7.99/mo): $MONTHLY_ID"

ANNUAL_ID=$(stripe prices create \
  --product="$PRODUCT_ID" \
  --unit-amount=5999 \
  --currency=usd \
  --recurring[interval]=year \
  --metadata[plan]="annual" \
  2>/dev/null | grep '"id":' | head -1 | sed 's/.*"id": "//;s/".*//')

echo "  Annual price ($59.99/yr): $ANNUAL_ID"

FAMILY_ID=$(stripe prices create \
  --product="$PRODUCT_ID" \
  --unit-amount=7999 \
  --currency=usd \
  --recurring[interval]=year \
  --metadata[plan]="family_annual" \
  2>/dev/null | grep '"id":' | head -1 | sed 's/.*"id": "//;s/".*//')

echo "  Family price ($79.99/yr): $FAMILY_ID"

# Get publishable key
echo ""
echo "Now enter your Stripe PUBLISHABLE key."
echo "Find it at: https://dashboard.stripe.com/apikeys"
echo -n "Publishable key (pk_live_... or pk_test_...): "
read PK_KEY

if [ -z "$PK_KEY" ]; then
  echo "No key entered. You can manually edit paywall.js later."
  exit 0
fi

# Patch paywall.js
echo ""
echo "Patching paywall.js..."

sed -i "s|pk_test_REPLACE_WITH_YOUR_KEY|$PK_KEY|" paywall.js
sed -i "s|price_monthly_REPLACE|$MONTHLY_ID|" paywall.js
sed -i "s|price_annual_REPLACE|$ANNUAL_ID|" paywall.js
sed -i "s|price_lifetime_REPLACE|$ANNUAL_ID|" paywall.js
sed -i "s|price_family_monthly_REPLACE|$FAMILY_ID|" paywall.js
sed -i "s|price_family_annual_REPLACE|$FAMILY_ID|" paywall.js

echo "  paywall.js updated!"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  Stripe setup complete!"
echo ""
echo "  Product: $PRODUCT_ID"
echo "  Monthly: $MONTHLY_ID"
echo "  Annual:  $ANNUAL_ID"
echo "  Family:  $FAMILY_ID"
echo "  Key:     ${PK_KEY:0:12}..."
echo ""
echo "  Next: ./build.sh && cd dist && vercel --prod"
echo "═══════════════════════════════════════════════════════════"
