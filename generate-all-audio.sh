#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# GetDeaddicted Academy — Production Audio Generation
# Generates realistic ElevenLabs MP3 narration for ALL 50 courses
#
# REQUIREMENTS:
#   1. Set ELEVENLABS_API_KEY env var or put it in ../../api-keys.env
#   2. Node.js 18+ installed
#   3. npm install node-fetch (already in package.json)
#
# USAGE:
#   ./generate-all-audio.sh              # Generate all 50 courses
#   ./generate-all-audio.sh --dry-run    # Preview without spending credits
#   ./generate-all-audio.sh --course 1   # Generate single course
#
# VOICES (warm, kid-friendly):
#   Rachel (default): EXAVITQu4vr4xnSDxMaL — warm, clear, educational
#   Aria:   9BWtsMINqrJLrRacOk9x — young, friendly
#   Sarah:  EXAVITQu4vr4xnSDxMaL — professional, calm
#
# COST ESTIMATE:
#   ~500,000 characters total across 50 courses
#   ElevenLabs Starter ($5/mo): 30,000 chars — need ~17 months or Pro plan
#   ElevenLabs Pro ($22/mo): 100,000 chars — need ~5 months
#   ElevenLabs Scale ($99/mo): 500,000 chars — ALL courses in one shot
#   Pay-as-you-go: ~$15 total at $0.03/1K chars
#
# The script skips already-generated files, so you can run it
# incrementally over multiple months on a cheaper plan.
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail
cd "$(dirname "$0")"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║   GetDeaddicted Academy — Production Audio Generator        ║"
echo "║   Engine: ElevenLabs (realistic human voice)                ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check for API key
if [ -z "${ELEVENLABS_API_KEY:-}" ]; then
  if [ -f "../../api-keys.env" ]; then
    export ELEVENLABS_API_KEY=$(grep ELEVENLABS_API_KEY ../../api-keys.env | cut -d= -f2)
  fi
fi

if [ -z "${ELEVENLABS_API_KEY:-}" ]; then
  echo "ERROR: ELEVENLABS_API_KEY not set."
  echo ""
  echo "Set it with:"
  echo "  export ELEVENLABS_API_KEY=your_key_here"
  echo "  ./generate-all-audio.sh"
  echo ""
  echo "Or create ../../api-keys.env with:"
  echo "  ELEVENLABS_API_KEY=your_key_here"
  echo ""
  echo "Get your key at: https://elevenlabs.io/app/settings/api-keys"
  exit 1
fi

echo "API key found. Starting generation..."
echo ""

# Run the generator with ElevenLabs engine
node generate-audio.js --engine elevenlabs "$@"

# Merge all course manifests into one
echo ""
echo "Merging manifests..."
node generate-audio.js --merge-manifests

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  DONE! Audio files are in: ./audio/"
echo "  Manifest at: ./audio/manifest.json"
echo ""
echo "  To test: python3 -m http.server 8000"
echo "  Then open a course and enable voice narration."
echo "═══════════════════════════════════════════════════════════════"
