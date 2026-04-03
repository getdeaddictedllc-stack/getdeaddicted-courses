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
    this.onViseme = null;           // callback: function(visemeName) called on each viseme change
    this.onSpeakingChange = null;   // callback: function(isSpeaking) called on start/stop
    this._boundaryFired = false;
    this._fallbackInterval = null;
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
      this._clearFallback();
      this.onSpeakingChange?.(false);
      this.onViseme?.('closed');
      this._updateUI();
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.voice = this.voice;
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = this.volume;

    utterance.onboundary = (event) => {
      if (event.name === 'word' && this.onViseme) {
        this._boundaryFired = true;
        const text = chunks[index];
        const word = text.substring(event.charIndex, event.charIndex + event.charLength);
        const viseme = this._getVisemeForWord(word);
        this.onViseme(viseme);
      }
    };

    utterance.onend = () => {
      this._clearFallback();
      this._speakChunks(chunks, index + 1, onEnd);
    };
    utterance.onerror = (e) => {
      if (e.error !== 'canceled') {
        console.warn('Speech error:', e.error);
      }
      this.speaking = false;
      this._clearFallback();
      this.onSpeakingChange?.(false);
      this.onViseme?.('closed');
      this._updateUI();
    };

    this.utterance = utterance;
    this.speaking = true;
    this.paused = false;
    this._boundaryFired = false;
    this.onSpeakingChange?.(true);
    this.onViseme?.('open_small');
    this._updateUI();
    this.synth.speak(utterance);

    // Android fallback: if no boundary events fire within 500ms, use fallback animation
    setTimeout(() => {
      if (this.speaking && !this._boundaryFired && this.onViseme) {
        this._startFallbackAnimation(chunks[index]);
      }
    }, 500);
  }

  pause() {
    if (this.speaking && !this.paused) {
      this.synth.pause();
      this.paused = true;
      this._clearFallback();
      this.onViseme?.('closed');
      this._updateUI();
    }
  }

  resume() {
    if (this.paused) {
      this.synth.resume();
      this.paused = false;
      this.onViseme?.('open_small');
      this._updateUI();
    }
  }

  stop() {
    this.synth.cancel();
    this.speaking = false;
    this.paused = false;
    this._clearFallback();
    this.onSpeakingChange?.(false);
    this.onViseme?.('closed');
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

  _getVisemeForWord(word) {
    if (!word) return 'closed';
    const w = word.toLowerCase().trim();
    if (!w) return 'closed';
    const first = w[0];
    const firstTwo = w.substring(0, 2);

    // M/B/P sounds — lips pressed
    if ('mbp'.includes(first)) return 'mm';

    // OO/W sounds — rounded mouth
    if ('ouw'.includes(first) || firstTwo === 'oo') return 'oo';

    // EE/I/Y sounds — wide stretch
    if ('eiy'.includes(first) || firstTwo === 'ee') return 'ee';

    // A/H sounds — wide open
    if ('ah'.includes(first)) return 'open_wide';

    // Consonants — small open
    if ('tdszjnlrcgkfvq'.includes(first)) return 'open_small';

    // Default
    return 'open_small';
  }

  _startFallbackAnimation(text) {
    this._clearFallback();
    const words = text.split(/\s+/);
    let wordIndex = 0;
    const msPerWord = 60000 / (this.rate * 150); // rough estimate

    this._fallbackInterval = setInterval(() => {
      if (wordIndex < words.length && this.speaking && !this.paused) {
        const viseme = this._getVisemeForWord(words[wordIndex]);
        this.onViseme?.(viseme);
        wordIndex++;
      } else {
        this._clearFallback();
      }
    }, msPerWord);
  }

  _clearFallback() {
    if (this._fallbackInterval) {
      clearInterval(this._fallbackInterval);
      this._fallbackInterval = null;
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
