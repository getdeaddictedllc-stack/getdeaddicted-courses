# GetDeaddicted Academy

## What This Is
A web-based digital wellness educational platform helping kids, teens, and families build healthy relationships with screens and technology. Features **50 kid-friendly courses** (ages 5+) across 10 categories with interactive presentations and voice narration.

**Tagline:** "Take Back Your Screen Time"

## Tech Stack
- **Pure vanilla:** HTML5, CSS3, JavaScript (no frameworks, no build tools)
- **Voice:** Web Speech API for text-to-speech narration
- **Deployment:** Static site (GitHub Pages / any static host)
- **Repo:** https://github.com/getdeaddictedllc-stack/getdeaddicted-courses.git

## Project Structure

```
index.html          # Single-page app entry point
app.js              # Core logic: rendering, filtering, presentation engine (~407 lines)
courses.js          # 50 course definitions + 10 categories (~488 lines)
voiceover.js        # Speech synthesis engine using Web Speech API (~192 lines)
styles.css          # Full styling, dark theme, mobile-first responsive (~450 lines)
exp-{N}-{M}.js      # Rich expanded content for courses N-M (10 files, ~6500 lines total)
```

## Architecture & Data Flow

```
courses.js (50 courses + categories)
    ↓
exp-*.js (rich modules with narration, exercises, key points)
    ↓
app.js (renders UI, handles search/filter, builds presentations)
    ↓
voiceover.js (speaks slide narration via Web Speech API)
```

### Key Patterns
- **No build system** - files served as-is, no npm/webpack
- **Single-page app** - all views managed via JS show/hide of sections in index.html
- **Expansion files** (`exp-*.js`) each export a function `getExp_N_M()` returning rich course data (modules with `overview`, `keyPoints`, `narration`, `exercise`, `duration`)
- **Presentation engine** in `app.js` auto-generates 8-15 slides per course via `buildSlides()`
- **Modules can be simple strings OR rich objects** - code handles both
- **Category colors** applied via `--cat-color` CSS variable

## Course Categories (10 categories, 5 courses each)
1. Understanding Screen Addiction (1-5)
2. Phone & Device Freedom (6-10)
3. Social Media Wellness (11-15)
4. Gaming Balance (16-20)
5. Focus & Attention (21-25)
6. Healthy Digital Habits (26-30)
7. Mindfulness & Unplugging (31-35)
8. Family Screen Time (36-40)
9. Online Safety & Wellness (41-45)
10. Creative Alternatives (46-50)

## Running Locally
```bash
python -m http.server 8000
# or
npx http-server
```

## Key Design Decisions
- Dark theme (#0a0a0f background) with teal (#6ee7b7) and blue (#3b82f6) accents
- Mobile-first responsive (breakpoints at 768px, 380px)
- Touch-optimized (44x44 min targets, swipe navigation, safe area insets)
- Voice narration is opt-in, auto-advances slides when enabled
- Text chunked to <250 chars for Web Speech API reliability
- All content designed for ages 5+ with compassionate, kid-friendly language

## When Modifying
- To add a new course: add entry in `courses.js` COURSES array, then add rich content in the appropriate `exp-*.js` file
- To add a category: add to CATEGORIES array in `courses.js`, assign courses to it
- Presentation slides are auto-generated from course data - edit `buildSlides()` in `app.js` to change slide structure
- Styles use no CSS framework - all hand-crafted in `styles.css`
