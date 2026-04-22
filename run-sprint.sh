#!/usr/bin/env bash
# Sprint runner: 20 parallel workers, round-robin course assignment.
# Logs per worker; waits for all; reports counts.

set -u
cd "$(dirname "$0")"

WORKERS=20
TOTAL=50
LOG_DIR="audio/sprint-logs"
mkdir -p "$LOG_DIR"
rm -f "$LOG_DIR"/worker-*.log "$LOG_DIR"/worker-*.done

assign() {
  # Worker N (1..WORKERS) → courses N, N+W, N+2W, ... up to TOTAL
  local n=$1
  local out=""
  local c=$n
  while [ $c -le $TOTAL ]; do
    if [ -z "$out" ]; then out="$c"; else out="$out,$c"; fi
    c=$((c + WORKERS))
  done
  echo "$out"
}

start_worker() {
  local n=$1
  local courses
  courses=$(assign "$n")
  if [ -z "$courses" ]; then return; fi
  (
    echo "[worker-$n] courses=$courses start=$(date -u +%FT%TZ)"
    node generate-audio.js --engine piper --courses "$courses" 2>&1
    echo "[worker-$n] done=$(date -u +%FT%TZ)"
    touch "$LOG_DIR/worker-$n.done"
  ) > "$LOG_DIR/worker-$n.log" 2>&1 &
}

echo "Starting $WORKERS workers across $TOTAL courses..."
for n in $(seq 1 $WORKERS); do
  start_worker "$n"
done

echo "All workers launched. PIDs:"
jobs -p
echo "Run: tail -f $LOG_DIR/worker-*.log"
