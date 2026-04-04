// ===== GETDEADDICTED ACADEMY — VOICEOVER ENGINE =====
// Uses ElevenLabs pre-rendered MP3s (realistic) with Web Speech API fallback (robotic)

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

    // MP3 audio support
    this._audio = null;              // Current Audio element for MP3 playback
    this._audioManifest = null;      // Loaded manifest.json
    this._currentCourseId = null;    // Current course ID for MP3 lookup
    this._currentSlideIndex = 0;     // Current slide index for MP3 lookup
    this._useMP3 = true;             // Prefer MP3 over Web Speech API
    this._loadManifest();

    this._loadVoices();
    // Chrome loads voices async
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this._loadVoices();
    }
  }

  // ─── MP3 Support ──────────────────────────────────────────────────────

  _loadManifest() {
    fetch('audio/manifest.json')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        this._audioManifest = data;
        console.log('[VoiceOver] MP3 manifest loaded —', Object.keys(data || {}).length, 'courses available');
      })
      .catch(() => {
        console.log('[VoiceOver] No MP3 manifest found, using Web Speech API only');
        this._audioManifest = null;
      });
  }

  setCourse(courseId) {
    this._currentCourseId = courseId;
    this._currentSlideIndex = 0;
  }

  setSlideIndex(index) {
    this._currentSlideIndex = index;
  }

  _getMP3Path() {
    if (!this._audioManifest || !this._currentCourseId) return null;
    const courseSlides = this._audioManifest[this._currentCourseId];
    if (!courseSlides) return null;
    const slide = courseSlides[this._currentSlideIndex];
    if (!slide) return null;
    return 'audio/' + slide.file;
  }

  _speakMP3(mp3Path, onEnd) {
    this.stop(); // Stop any current playback

    this._audio = new Audio(mp3Path);
    this._audio.volume = this.volume;

    this._audio.onplay = () => {
      this.speaking = true;
      this.paused = false;
      this.onSpeakingChange?.(true);
      this.onViseme?.('open_small');
      this._startFallbackAnimationForAudio();
      this._updateUI();
    };

    this._audio.onended = () => {
      this.speaking = false;
      this._clearFallback();
      this.onSpeakingChange?.(false);
      this.onViseme?.('closed');
      this._updateUI();
      if (onEnd) onEnd();
    };

    this._audio.onerror = () => {
      console.warn('[VoiceOver] MP3 failed to load, falling back to Web Speech API');
      this._audio = null;
      // Fallback to Web Speech API — call the original speak logic
      this._speakWebSpeech(null, onEnd);
    };

    this._audio.play().catch(() => {
      // Autoplay blocked — try on next user interaction
      console.warn('[VoiceOver] Autoplay blocked for MP3');
      this._audio = null;
      this._speakWebSpeech(null, onEnd);
    });
  }

  _startFallbackAnimationForAudio() {
    this._clearFallback();
    if (!this.onViseme) return;
    const visemes = ['open_small', 'ee', 'open_wide', 'oo', 'mm', 'open_small'];
    let i = 0;
    this._fallbackInterval = setInterval(() => {
      if (this.speaking && !this.paused) {
        this.onViseme(visemes[i % visemes.length]);
        i++;
      }
    }, 150);
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

    // Try MP3 first (ElevenLabs realistic voice)
    if (this._useMP3) {
      const mp3Path = this._getMP3Path();
      if (mp3Path) {
        this._speakMP3(mp3Path, onEnd);
        return;
      }
    }

    // Fallback: Web Speech API
    this._speakWebSpeech(text, onEnd);
  }

  _speakWebSpeech(text, onEnd) {
    if (!text) {
      if (onEnd) onEnd();
      return;
    }
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
      if (this._audio) {
        this._audio.pause();
      } else {
        this.synth.pause();
      }
      this.paused = true;
      this._clearFallback();
      this.onViseme?.('closed');
      this._updateUI();
    }
  }

  resume() {
    if (this.paused) {
      if (this._audio) {
        this._audio.play();
      } else {
        this.synth.resume();
      }
      this.paused = false;
      this.onViseme?.('open_small');
      this._updateUI();
    }
  }

  stop() {
    if (this._audio) {
      this._audio.pause();
      this._audio.currentTime = 0;
      this._audio = null;
    }
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
