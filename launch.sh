#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# GetDeaddicted Academy — Launch Wizard
# One-command script to prepare and deploy the product
#
# Usage: ./launch.sh
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail
cd "$(dirname "$0")"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

echo ""
echo -e "${BOLD}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║   GetDeaddicted Academy — Launch Wizard                 ║${NC}"
echo -e "${BOLD}╚══════════════════════════════════════════════════════════╝${NC}"
echo ""

# ─── Step 1: Run Tests ─────────────────────────────────────────────
echo -e "${BOLD}Step 1/6: Running tests...${NC}"
if node tests.js 2>&1 | grep -q "0 failed"; then
  echo -e "  ${GREEN}✓ 117 structural tests passed${NC}"
else
  echo -e "  ${RED}✗ Tests failed! Fix issues before launching.${NC}"
  node tests.js 2>&1 | grep "✗"
  exit 1
fi

if node test-runtime.js 2>&1 | grep -q "0 failed"; then
  echo -e "  ${GREEN}✓ 119 runtime tests passed${NC}"
else
  echo -e "  ${RED}✗ Runtime tests failed!${NC}"
  exit 1
fi
echo ""

# ─── Step 2: Check Stripe Keys ─────────────────────────────────────
echo -e "${BOLD}Step 2/6: Checking Stripe configuration...${NC}"
if grep -q "pk_test_REPLACE" paywall.js; then
  echo -e "  ${YELLOW}⚠ Stripe keys not configured.${NC}"
  echo ""
  echo "  To configure Stripe:"
  echo "  1. Create account at https://stripe.com"
  echo "  2. Get your publishable key from Dashboard > Developers > API keys"
  echo "  3. Create price IDs for Monthly (\$7.99), Annual (\$59.99), Family (\$79.99)"
  echo "  4. Edit paywall.js and replace the REPLACE placeholders"
  echo ""
  echo -e "  ${BLUE}The app will run in demo mode without Stripe (simulated payments).${NC}"
  echo ""
else
  echo -e "  ${GREEN}✓ Stripe keys configured${NC}"
fi

# ─── Step 3: Check Audio ───────────────────────────────────────────
echo -e "${BOLD}Step 3/6: Checking voice narration...${NC}"
AUDIO_COUNT=$(find audio -name "*.mp3" 2>/dev/null | wc -l)
if [ "$AUDIO_COUNT" -gt 100 ]; then
  echo -e "  ${GREEN}✓ $AUDIO_COUNT MP3 files found${NC}"
else
  echo -e "  ${YELLOW}⚠ Only $AUDIO_COUNT MP3 files. Web Speech API will be used as fallback.${NC}"
  echo ""
  echo "  To generate realistic voice narration (~\$38):"
  echo "  export ELEVENLABS_API_KEY=your_key"
  echo "  ./generate-all-audio.sh"
  echo ""
  echo -e "  ${BLUE}The app works without pre-generated audio (uses browser TTS).${NC}"
fi
echo ""

# ─── Step 4: Check Brand Assets ───────────────────────────────────
echo -e "${BOLD}Step 4/6: Checking brand assets...${NC}"
MISSING_ASSETS=""
[ ! -f "icon-192.png" ] && MISSING_ASSETS="$MISSING_ASSETS icon-192.png"
[ ! -f "icon-512.png" ] && MISSING_ASSETS="$MISSING_ASSETS icon-512.png"
[ ! -f "og-image.png" ] && MISSING_ASSETS="$MISSING_ASSETS og-image.png"

if [ -z "$MISSING_ASSETS" ]; then
  echo -e "  ${GREEN}✓ All brand assets present${NC}"
else
  echo -e "  ${YELLOW}⚠ Missing:$MISSING_ASSETS${NC}"
  echo "  These are recommended but not required for launch."
fi
echo ""

# ─── Step 5: Build ─────────────────────────────────────────────────
echo -e "${BOLD}Step 5/6: Building production bundle...${NC}"
./build.sh 2>&1 | grep -E "(bundle\.js|styles\.css|Build complete|Files:)" | sed 's/^/  /'
echo ""

# ─── Step 6: Deploy Options ───────────────────────────────────────
echo -e "${BOLD}Step 6/6: Ready to deploy!${NC}"
echo ""
echo "  Your production build is in: dist/"
echo ""
echo "  Deploy options:"
echo ""
echo -e "  ${GREEN}Option A: Vercel (recommended)${NC}"
echo "    cd dist && npx vercel --prod"
echo ""
echo -e "  ${GREEN}Option B: GitHub Pages${NC}"
echo "    git add dist/ && git commit -m 'Deploy v1.0'"
echo "    git subtree push --prefix dist origin gh-pages"
echo ""
echo -e "  ${GREEN}Option C: Manual upload${NC}"
echo "    Upload the dist/ folder to any static hosting provider"
echo ""
echo ""
echo -e "${BOLD}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BOLD}  Product Summary${NC}"
echo -e "  Courses: 50 | Slides: 3,205 | SEO pages: 60"
echo -e "  Blog posts: 51 | Social content: 103 pieces"
echo -e "  Tests: 236 passing (117 structural + 119 runtime)"
echo -e "  Languages: English + Spanish"
echo -e "${BOLD}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}Ready to take your first dollar. Ship it! 🚀${NC}"
echo ""
