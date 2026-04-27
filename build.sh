#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# GetDeaddicted Academy — Production Build Script
# Concatenates JS into single bundle, minifies CSS, generates SW
#
# USAGE:
#   ./build.sh           # Build production bundle to dist/
#   ./build.sh --serve   # Build + start preview server
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail
cd "$(dirname "$0")"

DIST="dist"
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║   GetDeaddicted Academy — Production Build              ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Clean
rm -rf "$DIST"
mkdir -p "$DIST/audio"

echo "1/6  Bundling JavaScript..."

# App modules in load order (data first, then features, then UI)
JS_FILES=(
  courses.js
  exp-1-5.js exp-6-10.js exp-11-15.js exp-16-20.js exp-21-25.js
  exp-26-30.js exp-31-35.js exp-36-40.js exp-41-45.js exp-46-50.js
  config.js
  i18n.js loader.js
  auth.js progress.js paywall.js dashboard.js
  certificate.js coach.js referral.js onboarding.js
  classroom.js email.js printables.js
  analytics.js recommendations.js notifications.js
  gamification.js landing.js admin.js legal.js affiliate.js
  voiceover.js avatar.js app.js
)

# Concatenate all JS into single bundle
{
  echo "/* GetDeaddicted Academy — Production Bundle */"
  echo "/* Built: $(date -u +%Y-%m-%dT%H:%M:%SZ) */"
  echo "'use strict';"
  for f in "${JS_FILES[@]}"; do
    echo ""
    echo "// ═══ $f ═══"
    cat "$f"
  done
} > "$DIST/bundle.js"

JS_SIZE=$(wc -c < "$DIST/bundle.js")
echo "   bundle.js: $(( JS_SIZE / 1024 ))KB"

echo "2/6  Processing CSS..."
cp styles.css "$DIST/styles.css"
CSS_SIZE=$(wc -c < "$DIST/styles.css")
echo "   styles.css: $(( CSS_SIZE / 1024 ))KB"

echo "3/6  Building production HTML..."

# Generate production index.html with single bundle
sed '/^<script src=.*\.js"><\/script>$/d' index.html | \
  sed 's|</body>|<script src="bundle.js"></script>\n<script src="sw-register.js"></script>\n</body>|' \
  > "$DIST/index.html"

echo "   index.html updated with single bundle"

echo "4/6  Generating Service Worker..."
cat > "$DIST/sw.js" << 'SWEOF'
const CACHE_NAME = 'gda-v2';
const PRECACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/bundle.js',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network-first for API calls, cache-first for static assets
  if (e.request.url.includes('/api/')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fetched = fetch(e.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
          }
          return response;
        }).catch(() => cached);
        return cached || fetched;
      })
    );
  }
});
SWEOF

cat > "$DIST/sw-register.js" << 'REGEOF'
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
REGEOF
echo "   sw.js + sw-register.js created"

echo "5/7  Copying static assets..."
cp manifest.json "$DIST/"
cp sitemap.xml "$DIST/"
cp robots.txt "$DIST/"
cp 404.html "$DIST/" 2>/dev/null || true
cp vercel.json "$DIST/" 2>/dev/null || true

# Standalone Founding Family landing page (loads its own minimal deps)
if [ -f founding.html ]; then
  cp founding.html "$DIST/"
  cp config.js "$DIST/"
  cp auth.js "$DIST/"
  cp i18n.js "$DIST/"
  cp analytics.js "$DIST/"
  cp paywall.js "$DIST/"
  cp founding.js "$DIST/"
  echo "   founding.html + deps copied"
fi

# Copy audio if it exists
if [ -d "audio" ] && [ "$(ls -A audio 2>/dev/null)" ]; then
  cp -r audio/* "$DIST/audio/" 2>/dev/null || true
  echo "   Audio files copied"
else
  echo "   No audio files to copy (generate with ./generate-all-audio.sh)"
fi

# Copy icons if they exist
for icon in icon-192.png icon-512.png favicon.ico og-image.png; do
  [ -f "$icon" ] && cp "$icon" "$DIST/"
done

echo "6/7  Generating SEO pages + social content..."
node seo-pages.js 2>/dev/null || echo "   (seo-pages.js skipped)"
node blog-generator.js 2>/dev/null || echo "   (blog-generator.js skipped)"
node social-content.js 2>/dev/null || echo "   (social-content.js skipped)"
node email-sequences.js 2>/dev/null || echo "   (email-sequences.js skipped)"

echo "7/7  Build summary..."
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  Build complete!"
echo ""
TOTAL_SIZE=$(du -sh "$DIST" | cut -f1)
echo "  Output:       $DIST/"
echo "  Total size:   $TOTAL_SIZE"
echo "  JS bundle:    $(( JS_SIZE / 1024 ))KB"
echo "  CSS:          $(( CSS_SIZE / 1024 ))KB"
echo "  Files:        $(find "$DIST" -type f | wc -l) files"
echo ""
echo "  Deploy options:"
echo "    Vercel:   cd dist && vercel"
echo "    Netlify:  drag dist/ folder to netlify.com"
echo "    GitHub:   push dist/ to gh-pages branch"
echo "    Manual:   upload dist/ to any static host"
echo "═══════════════════════════════════════════════════════════"

if [ "${1:-}" = "--serve" ]; then
  echo ""
  echo "Starting preview server on http://localhost:9000..."
  cd "$DIST" && python3 -m http.server 9000
fi
