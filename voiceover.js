// ===== GETDEADDICTED ACADEMY — VOICEOVER ENGINE =====
// Uses Web Speech API for text-to-speech narration

class VoiceOverEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.speaking = false;
    this.paused = false;
    this.enabled = true;
    this.rate = 0.95;
    this.pitch = 1.0;
    this.volume = 1.0;
    this.voice = null;
    this.utterance = null;
    this.onEndCallback = null;
    this.voices = [];
    this._loadVoices();
    // Chrome loads voices async
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this._loadVoices();
    }
  }

  _loadVoices() {
    this.voices = this.synth.getVoices();
    // Prefer high-quality English voices
    const preferred = [
      'Google US English',
      'Google UK English Female',
      'Google UK English Male',
      'Microsoft Zira',
      'Microsoft David',
      'Samantha',
      'Alex',
      'Daniel',
      'Karen',
      'Moira',
      'Tessa'
    ];
    for (const name of preferred) {
      const found = this.voices.find(v => v.name.includes(name));
      if (found) {
        this.voice = found;
        break;
      }
    }
    if (!this.voice) {
      this.voice = this.voices.find(v => v.lang.startsWith('en')) || this.voices[0];
    }
    this._updateVoiceSelector();
  }

  _updateVoiceSelector() {
    const selector = document.getElementById('voiceSelect');
    if (!selector) return;
    const englishVoices = this.voices.filter(v => v.lang.startsWith('en'));
    selector.innerHTML = englishVoices.map((v, i) =>
      `<option value="${v.name}" ${v.name === (this.voice?.name || '') ? 'selected' : ''}>${v.name} (${v.lang})</option>`
    ).join('');
  }

  setVoice(name) {
    this.voice = this.voices.find(v => v.name === name) || this.voice;
  }

  speak(text, onEnd) {
    if (!this.enabled || !text) {
      if (onEnd) onEnd();
      return;
    }
    this.stop();

    // Split long text into chunks for reliability (some browsers cap at ~300 chars)
    const chunks = this._splitText(text);
    this._speakChunks(chunks, 0, onEnd);
  }

  _splitText(text) {
    const maxLen = 250;
    if (text.length <= maxLen) return [text];

    const chunks = [];
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let current = '';

    for (const sentence of sentences) {
      if ((current + sentence).length > maxLen && current) {
        chunks.push(current.trim());
        current = sentence;
      } else {
        current += sentence;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks;
  }

  _speakChunks(chunks, index, onEnd) {
    if (index >= chunks.length) {
      this.speaking = false;
      this._updateUI();
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.voice = this.voice;
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = this.volume;

    utterance.onend = () => {
      this._speakChunks(chunks, index + 1, onEnd);
    };
    utterance.onerror = (e) => {
      if (e.error !== 'canceled') {
        console.warn('Speech error:', e.error);
      }
      this.speaking = false;
      this._updateUI();
    };

    this.utterance = utterance;
    this.speaking = true;
    this.paused = false;
    this._updateUI();
    this.synth.speak(utterance);
  }

  pause() {
    if (this.speaking && !this.paused) {
      this.synth.pause();
      this.paused = true;
      this._updateUI();
    }
  }

  resume() {
    if (this.paused) {
      this.synth.resume();
      this.paused = false;
      this._updateUI();
    }
  }

  stop() {
    this.synth.cancel();
    this.speaking = false;
    this.paused = false;
    this._updateUI();
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) this.stop();
    this._updateUI();
    return this.enabled;
  }

  togglePlayPause() {
    if (this.paused) {
      this.resume();
    } else if (this.speaking) {
      this.pause();
    }
  }

  _updateUI() {
    const btn = document.getElementById('voiceToggleBtn');
    if (btn) {
      btn.textContent = this.enabled ? 'Disable Voice' : 'Enable Voice';
      btn.classList.toggle('voice-off', !this.enabled);
    }
    const playBtn = document.getElementById('voicePlayPauseBtn');
    if (playBtn) {
      if (this.paused) {
        playBtn.textContent = 'Resume';
      } else if (this.speaking) {
        playBtn.textContent = 'Pause';
      } else {
        playBtn.textContent = 'Play';
      }
    }
    const indicator = document.getElementById('voiceIndicator');
    if (indicator) {
      indicator.classList.toggle('speaking', this.speaking && !this.paused);
    }
  }
}

// Global instance
const voiceover = new VoiceOverEngine();
