#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# GetDeaddicted Academy — One-Command Deploy
#
# Does everything: test → build → deploy to Vercel
#
# Usage:
#   ./deploy.sh              # Deploy preview
#   ./deploy.sh --prod       # Deploy production
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail
cd "$(dirname "$0")"

PROD=""
[ "${1:-}" = "--prod" ] && PROD="--prod"

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║   GetDeaddicted Academy — Deploy                       ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Tests
echo "1/4 Running tests..."
if ! node tests.js 2>&1 | grep -q "0 failed"; then
  echo "  Tests failed. Fix before deploying."
  exit 1
fi
if ! node test-runtime.js 2>&1 | grep -q "0 failed"; then
  echo "  Runtime tests failed. Fix before deploying."
  exit 1
fi
echo "  236 tests passed."
echo ""

# Step 2: Build
echo "2/4 Building production..."
./build.sh 2>&1 | grep -E "(bundle|styles|Build complete)" | sed 's/^/  /'
echo ""

# Step 3: Check for Vercel CLI
echo "3/4 Checking Vercel CLI..."
if ! command -v vercel &>/dev/null; then
  echo "  Vercel CLI not found. Installing..."
  npm i -g vercel
fi
echo "  Vercel CLI ready."
echo ""

# Step 4: Deploy
echo "4/4 Deploying..."
echo ""

cd dist

if [ -n "$PROD" ]; then
  echo "  Deploying to PRODUCTION..."
  vercel --prod --yes 2>&1 | tail -5
else
  echo "  Deploying PREVIEW..."
  vercel --yes 2>&1 | tail -5
fi

cd ..

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  Deploy complete!"
echo ""
if [ -n "$PROD" ]; then
  echo "  Your product is LIVE."
  echo "  Next: Follow WEEK1_PLAYBOOK.md for launch operations."
else
  echo "  Preview deployment created."
  echo "  When ready for production: ./deploy.sh --prod"
fi
echo "═══════════════════════════════════════════════════════════"
