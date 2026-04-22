#!/usr/bin/env python3
"""Long-lived Piper TTS worker.

Loads the ONNX model once, then reads JSON requests from stdin and writes
MP3 files via ffmpeg piped from raw PCM. One ack JSON per request to stdout.

Request:  {"text": "...", "out": "/abs/path/to/file.mp3"}
Response: {"ok": true, "out": "...", "bytes": 12345}
        | {"ok": false, "out": "...", "error": "..."}
Sentinel: empty line on stdin -> exit.
"""
import io
import json
import subprocess
import sys
import wave
from piper import PiperVoice


def main() -> None:
    if len(sys.argv) < 2:
        print(json.dumps({"ok": False, "error": "usage: piper-worker.py MODEL.onnx"}), flush=True)
        sys.exit(2)

    model_path = sys.argv[1]
    voice = PiperVoice.load(model_path)
    print(json.dumps({"ready": True}), flush=True)

    for line in sys.stdin:
        line = line.strip()
        if not line:
            break
        try:
            req = json.loads(line)
            text = req["text"]
            out_path = req["out"]

            wav_buf = io.BytesIO()
            with wave.open(wav_buf, "wb") as wav:
                voice.synthesize_wav(text, wav)
            wav_bytes = wav_buf.getvalue()

            proc = subprocess.run(
                [
                    "ffmpeg", "-y", "-loglevel", "error",
                    "-f", "wav", "-i", "pipe:0",
                    "-codec:a", "libmp3lame", "-qscale:a", "4",
                    out_path,
                ],
                input=wav_bytes,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.PIPE,
            )
            if proc.returncode != 0:
                raise RuntimeError(f"ffmpeg: {proc.stderr.decode('utf-8', 'replace')[:200]}")

            import os
            print(json.dumps({"ok": True, "out": out_path, "bytes": os.path.getsize(out_path)}), flush=True)
        except Exception as e:
            print(json.dumps({"ok": False, "out": req.get("out") if isinstance(req, dict) else None, "error": str(e)[:300]}), flush=True)


if __name__ == "__main__":
    main()
