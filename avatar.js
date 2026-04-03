/* ================================================================
   Avatar.js — Animated SVG Avatar for GetDeaddicted Academy
   A friendly, gender-neutral digital wellness coach buddy.
   ================================================================ */

const Avatar = {
  el: null,
  visible: true,
  _blinkTimer: null,
  _speakTimer: null,
  _idleRunning: false,
  _styleEl: null,

  /* ---- Viseme mouth paths (centered at ~x:100, y:~168) ---- */
  _visemes: {
    closed:     'M 82 168 C 88 172, 96 174, 100 174 C 104 174, 112 172, 118 168',
    open_small: 'M 84 168 C 90 170, 96 172, 100 172 C 104 172, 110 170, 116 168 C 112 178, 106 182, 100 182 C 94 182, 88 178, 84 168 Z',
    open_wide:  'M 82 166 C 88 168, 94 170, 100 170 C 106 170, 112 168, 118 166 C 114 186, 108 194, 100 194 C 92 194, 86 186, 82 166 Z',
    oo:         'M 92 166 C 94 164, 98 163, 100 163 C 102 163, 106 164, 108 166 C 110 172, 108 178, 100 178 C 92 178, 90 172, 92 166 Z',
    ee:         'M 78 168 C 86 172, 94 174, 100 174 C 106 174, 114 172, 122 168 C 118 176, 110 178, 100 178 C 90 178, 82 176, 78 168 Z',
    mm:         'M 84 170 C 90 168, 96 167, 100 167 C 104 167, 110 168, 116 170',
    smile:      'M 78 166 C 86 176, 94 182, 100 182 C 106 182, 114 176, 122 166'
  },

  /* ---- Inject scoped CSS for animations ---- */
  _injectCSS() {
    if (this._styleEl) return;
    const css = `
      /* Smooth mouth shape transitions (CSS d property) */
      #avatar-mouth {
        transition: d 0.12s ease;
      }

      /* Breathing — subtle vertical float on body */
      @keyframes avatar-breathe {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-2px); }
      }

      /* Head bob — very gentle rotation */
      @keyframes avatar-headbob {
        0%, 100% { transform: rotate(0deg); }
        30%      { transform: rotate(-0.8deg); }
        70%      { transform: rotate(0.8deg); }
      }

      /* Blink — scale eyelid to cover the eye */
      .avatar-eyelid {
        transform-origin: center;
        transform: scaleY(0);
        transition: transform 0.08s ease-in;
      }
      .avatar-blink .avatar-eyelid {
        transform: scaleY(1);
        transition: transform 0.06s ease-out;
      }

      /* Speaking pulse on mouth */
      @keyframes avatar-speak-pulse {
        0%, 100% { transform: scaleY(1); }
        50%      { transform: scaleY(1.15); }
      }

      /* Idle animation classes (applied via JS) */
      .avatar-idle #avatar-body {
        animation: avatar-breathe 4s ease-in-out infinite;
      }
      .avatar-idle #avatar-head {
        animation: avatar-headbob 6s ease-in-out infinite;
      }

      /* Fade show/hide */
      .avatar-svg {
        transition: opacity 0.35s ease;
      }
      .avatar-svg.avatar-hidden {
        opacity: 0;
        pointer-events: none;
      }
    `;
    this._styleEl = document.createElement('style');
    this._styleEl.textContent = css;
    document.head.appendChild(this._styleEl);
  },

  /* ---- SVG namespace helper ---- */
  _ns: 'http://www.w3.org/2000/svg',

  _svgEl(tag, attrs, parent) {
    const el = document.createElementNS(this._ns, tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    if (parent) parent.appendChild(el);
    return el;
  },

  /* ================================================================
     Build the full SVG character
     ================================================================ */
  _buildSVG() {
    const ns = this._ns;
    const svg = this._svgEl('svg', {
      viewBox: '0 0 200 250',
      xmlns: ns,
      class: 'avatar-svg',
      'aria-label': 'Digital wellness buddy avatar'
    });
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.display = 'block';

    /* ---- Defs: gradients & filters ---- */
    const defs = this._svgEl('defs', null, svg);

    // Hair gradient — teal to blue
    const hairGrad = this._svgEl('linearGradient', { id: 'avatar-hair-grad', x1: '0', y1: '0', x2: '1', y2: '1' }, defs);
    this._svgEl('stop', { offset: '0%', 'stop-color': '#6ee7b7' }, hairGrad);
    this._svgEl('stop', { offset: '100%', 'stop-color': '#3b82f6' }, hairGrad);

    // Body/shirt gradient — blue to purple
    const bodyGrad = this._svgEl('linearGradient', { id: 'avatar-body-grad', x1: '0', y1: '0', x2: '0.3', y2: '1' }, defs);
    this._svgEl('stop', { offset: '0%', 'stop-color': '#3b82f6' }, bodyGrad);
    this._svgEl('stop', { offset: '100%', 'stop-color': '#7c3aed' }, bodyGrad);

    // Skin radial gradient for soft shading
    const skinGrad = this._svgEl('radialGradient', { id: 'avatar-skin-grad', cx: '0.45', cy: '0.38', r: '0.55' }, defs);
    this._svgEl('stop', { offset: '0%', 'stop-color': '#ffe0c2' }, skinGrad);
    this._svgEl('stop', { offset: '100%', 'stop-color': '#f5c49b' }, skinGrad);

    // Eye shine gradient
    const eyeShine = this._svgEl('radialGradient', { id: 'avatar-eye-shine', cx: '0.35', cy: '0.3', r: '0.65' }, defs);
    this._svgEl('stop', { offset: '0%', 'stop-color': '#ffffff' }, eyeShine);
    this._svgEl('stop', { offset: '100%', 'stop-color': '#f0f0f5' }, eyeShine);

    // Collar accent gradient
    const collarGrad = this._svgEl('linearGradient', { id: 'avatar-collar-grad', x1: '0', y1: '0', x2: '1', y2: '0' }, defs);
    this._svgEl('stop', { offset: '0%', 'stop-color': '#a78bfa' }, collarGrad);
    this._svgEl('stop', { offset: '50%', 'stop-color': '#6ee7b7' }, collarGrad);
    this._svgEl('stop', { offset: '100%', 'stop-color': '#3b82f6' }, collarGrad);

    // Subtle shadow filter
    const shadow = this._svgEl('filter', { id: 'avatar-shadow', x: '-10%', y: '-10%', width: '130%', height: '130%' }, defs);
    const feGauss = this._svgEl('feGaussianBlur', { in: 'SourceAlpha', stdDeviation: '3', result: 'blur' }, shadow);
    const feOff = this._svgEl('feOffset', { in: 'blur', dx: '0', dy: '2', result: 'shadow' }, shadow);
    const feFlood = this._svgEl('feFlood', { 'flood-color': '#000', 'flood-opacity': '0.15', result: 'color' }, shadow);
    const feComp = this._svgEl('feComposite', { in: 'color', in2: 'shadow', operator: 'in', result: 'colorShadow' }, shadow);
    const feMerge = this._svgEl('feMerge', null, shadow);
    this._svgEl('feMergeNode', { in: 'colorShadow' }, feMerge);
    this._svgEl('feMergeNode', { in: 'SourceGraphic' }, feMerge);

    // Cheek blush gradient
    const blushGrad = this._svgEl('radialGradient', { id: 'avatar-blush-grad', cx: '0.5', cy: '0.5', r: '0.5' }, defs);
    this._svgEl('stop', { offset: '0%', 'stop-color': '#ffb3b3', 'stop-opacity': '0.5' }, blushGrad);
    this._svgEl('stop', { offset: '100%', 'stop-color': '#ffb3b3', 'stop-opacity': '0' }, blushGrad);

    /* ================================================================
       BODY GROUP
       ================================================================ */
    const bodyGroup = this._svgEl('g', { id: 'avatar-body' }, svg);

    // Shoulders / upper body — rounded trapezoid
    this._svgEl('path', {
      d: 'M 40 250 C 40 210, 55 195, 80 190 L 120 190 C 145 195, 160 210, 160 250 Z',
      fill: 'url(#avatar-body-grad)',
      filter: 'url(#avatar-shadow)'
    }, bodyGroup);

    // Shirt collar V-shape accent
    this._svgEl('path', {
      d: 'M 88 190 L 100 210 L 112 190',
      fill: 'none',
      stroke: 'url(#avatar-collar-grad)',
      'stroke-width': '2.5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, bodyGroup);

    // Collar line
    this._svgEl('path', {
      d: 'M 78 190 C 85 193, 92 194, 100 194 C 108 194, 115 193, 122 190',
      fill: 'none',
      stroke: '#2563eb',
      'stroke-width': '1.5',
      'stroke-linecap': 'round',
      opacity: '0.5'
    }, bodyGroup);

    // Neck
    this._svgEl('rect', {
      x: '90', y: '176', width: '20', height: '18', rx: '4',
      fill: 'url(#avatar-skin-grad)'
    }, bodyGroup);

    // Neck shadow
    this._svgEl('ellipse', {
      cx: '100', cy: '190', rx: '14', ry: '3',
      fill: '#e8a878', opacity: '0.35'
    }, bodyGroup);

    /* ================================================================
       HEAD GROUP
       ================================================================ */
    const headGroup = this._svgEl('g', { id: 'avatar-head', filter: 'url(#avatar-shadow)' }, svg);

    // Head shape — rounded oval
    this._svgEl('ellipse', {
      cx: '100', cy: '120', rx: '52', ry: '58',
      fill: 'url(#avatar-skin-grad)'
    }, headGroup);

    // Ear left
    this._svgEl('ellipse', {
      cx: '50', cy: '125', rx: '8', ry: '12',
      fill: '#f5c49b'
    }, headGroup);
    this._svgEl('ellipse', {
      cx: '51', cy: '125', rx: '4', ry: '7',
      fill: '#edb588', opacity: '0.5'
    }, headGroup);

    // Ear right
    this._svgEl('ellipse', {
      cx: '150', cy: '125', rx: '8', ry: '12',
      fill: '#f5c49b'
    }, headGroup);
    this._svgEl('ellipse', {
      cx: '149', cy: '125', rx: '4', ry: '7',
      fill: '#edb588', opacity: '0.5'
    }, headGroup);

    /* ---- Hair ---- */
    // Main hair volume — rounded top with side volume
    this._svgEl('path', {
      d: `M 48 115
          C 48 72, 62 52, 100 50
          C 138 52, 152 72, 152 115
          C 152 100, 148 85, 140 76
          C 132 65, 120 62, 100 60
          C 80 62, 68 65, 60 76
          C 52 85, 48 100, 48 115 Z`,
      fill: 'url(#avatar-hair-grad)'
    }, headGroup);

    // Hair top volume
    this._svgEl('path', {
      d: `M 55 105
          C 52 75, 66 50, 100 47
          C 134 50, 148 75, 145 105
          C 146 88, 140 68, 126 58
          C 114 50, 100 48, 86 50
          C 72 54, 62 66, 55 105 Z`,
      fill: 'url(#avatar-hair-grad)',
      opacity: '0.85'
    }, headGroup);

    // Hair fringe / bangs — soft swoopy bangs
    this._svgEl('path', {
      d: `M 58 95
          C 60 72, 72 58, 92 55
          C 82 68, 76 82, 72 95 Z`,
      fill: '#5dd4a8',
      opacity: '0.7'
    }, headGroup);
    this._svgEl('path', {
      d: `M 80 90
          C 86 66, 98 55, 118 54
          C 108 65, 98 76, 92 90 Z`,
      fill: '#4fc9a0',
      opacity: '0.6'
    }, headGroup);

    // Hair shine highlight
    this._svgEl('path', {
      d: `M 75 70 C 82 58, 96 52, 110 54 C 98 56, 86 62, 78 74 Z`,
      fill: '#a7f3d0',
      opacity: '0.4'
    }, headGroup);

    /* ---- Face group ---- */
    const faceGroup = this._svgEl('g', { id: 'avatar-face' }, headGroup);

    // Left eyebrow
    this._svgEl('path', {
      id: 'avatar-left-eyebrow',
      d: 'M 68 102 C 72 97, 82 96, 88 99',
      fill: 'none',
      stroke: '#6bb89e',
      'stroke-width': '2.5',
      'stroke-linecap': 'round'
    }, faceGroup);

    // Right eyebrow
    this._svgEl('path', {
      id: 'avatar-right-eyebrow',
      d: 'M 112 99 C 118 96, 128 97, 132 102',
      fill: 'none',
      stroke: '#6bb89e',
      'stroke-width': '2.5',
      'stroke-linecap': 'round'
    }, faceGroup);

    /* ---- Left eye ---- */
    const leftEye = this._svgEl('g', { id: 'avatar-left-eye' }, faceGroup);
    // Eye white
    this._svgEl('ellipse', {
      cx: '78', cy: '118', rx: '13', ry: '14',
      fill: 'url(#avatar-eye-shine)',
      stroke: '#d4bfa0',
      'stroke-width': '0.5'
    }, leftEye);
    // Iris
    this._svgEl('circle', {
      cx: '78', cy: '119', r: '8',
      fill: '#3b82f6'
    }, leftEye);
    // Iris inner ring
    this._svgEl('circle', {
      cx: '78', cy: '119', r: '5.5',
      fill: '#2563eb'
    }, leftEye);
    // Pupil
    this._svgEl('circle', {
      cx: '78', cy: '119', r: '3.5',
      fill: '#0f172a'
    }, leftEye);
    // Eye sparkle / catchlight
    this._svgEl('circle', {
      cx: '74', cy: '115', r: '2.5',
      fill: '#fff', opacity: '0.9'
    }, leftEye);
    this._svgEl('circle', {
      cx: '81', cy: '122', r: '1.2',
      fill: '#fff', opacity: '0.5'
    }, leftEye);
    // Eyelid for blink
    this._svgEl('ellipse', {
      cx: '78', cy: '118', rx: '14', ry: '15',
      fill: 'url(#avatar-skin-grad)',
      class: 'avatar-eyelid'
    }, leftEye);

    /* ---- Right eye ---- */
    const rightEye = this._svgEl('g', { id: 'avatar-right-eye' }, faceGroup);
    this._svgEl('ellipse', {
      cx: '122', cy: '118', rx: '13', ry: '14',
      fill: 'url(#avatar-eye-shine)',
      stroke: '#d4bfa0',
      'stroke-width': '0.5'
    }, rightEye);
    this._svgEl('circle', {
      cx: '122', cy: '119', r: '8',
      fill: '#3b82f6'
    }, rightEye);
    this._svgEl('circle', {
      cx: '122', cy: '119', r: '5.5',
      fill: '#2563eb'
    }, rightEye);
    this._svgEl('circle', {
      cx: '122', cy: '119', r: '3.5',
      fill: '#0f172a'
    }, rightEye);
    this._svgEl('circle', {
      cx: '118', cy: '115', r: '2.5',
      fill: '#fff', opacity: '0.9'
    }, rightEye);
    this._svgEl('circle', {
      cx: '125', cy: '122', r: '1.2',
      fill: '#fff', opacity: '0.5'
    }, rightEye);
    this._svgEl('ellipse', {
      cx: '122', cy: '118', rx: '14', ry: '15',
      fill: 'url(#avatar-skin-grad)',
      class: 'avatar-eyelid'
    }, rightEye);

    // Cheek blush — left
    this._svgEl('ellipse', {
      cx: '64', cy: '140', rx: '10', ry: '6',
      fill: 'url(#avatar-blush-grad)'
    }, faceGroup);
    // Cheek blush — right
    this._svgEl('ellipse', {
      cx: '136', cy: '140', rx: '10', ry: '6',
      fill: 'url(#avatar-blush-grad)'
    }, faceGroup);

    // Nose — simple small soft triangle
    this._svgEl('path', {
      d: 'M 97 138 C 98 132, 102 132, 103 138 C 102 140, 98 140, 97 138 Z',
      fill: '#edb588',
      opacity: '0.6'
    }, faceGroup);
    // Nostril hints
    this._svgEl('circle', {
      cx: '96', cy: '139', r: '1.2',
      fill: '#d9a070', opacity: '0.35'
    }, faceGroup);
    this._svgEl('circle', {
      cx: '104', cy: '139', r: '1.2',
      fill: '#d9a070', opacity: '0.35'
    }, faceGroup);

    // Mouth
    this._svgEl('path', {
      id: 'avatar-mouth',
      d: this._visemes.smile,
      fill: 'none',
      stroke: '#c47a5a',
      'stroke-width': '2.5',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, faceGroup);

    return svg;
  },

  /* ================================================================
     PUBLIC API
     ================================================================ */

  /**
   * Initialize — create SVG and append to container
   * @param {string} containerId - DOM id of the container element
   */
  init(containerId) {
    this._injectCSS();
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn('[Avatar] Container not found:', containerId);
      return;
    }
    this.el = this._buildSVG();
    container.appendChild(this.el);
    this.visible = true;
    // Start with a friendly smile
    this.setViseme('smile');
  },

  /**
   * Set mouth to a specific viseme shape
   * @param {'closed'|'open_small'|'open_wide'|'oo'|'ee'|'mm'|'smile'} visemeName
   */
  setViseme(visemeName) {
    const path = this._visemes[visemeName];
    if (!path) return;
    const mouth = this.el && this.el.querySelector('#avatar-mouth');
    if (!mouth) return;

    // Determine if the shape is open (filled) or a line (stroke only)
    const isOpen = path.includes('Z');

    if (isOpen) {
      mouth.setAttribute('d', path);
      mouth.setAttribute('fill', '#c9524a');
      mouth.setAttribute('stroke', '#b34040');
      mouth.setAttribute('fill-opacity', '0.85');
    } else {
      mouth.setAttribute('d', path);
      mouth.setAttribute('fill', 'none');
      mouth.setAttribute('fill-opacity', '0');
      mouth.setAttribute('stroke', '#c47a5a');
    }

    // CSS `d` property transition — also set via style for browsers that support it
    try {
      mouth.style.d = 'path("' + path + '")';
    } catch (_) { /* Firefox may not support style.d */ }
  },

  /**
   * Start idle animations (blink, breathe, head bob)
   */
  startIdle() {
    if (this._idleRunning) return;
    this._idleRunning = true;
    if (this.el) this.el.classList.add('avatar-idle');
    this._startBlinking();
  },

  /**
   * Stop all idle animations
   */
  stopIdle() {
    this._idleRunning = false;
    if (this.el) this.el.classList.remove('avatar-idle');
    this._stopBlinking();
  },

  /**
   * Set speaking state — cycles through visemes as a fallback
   * when no per-phoneme data is available.
   * @param {boolean} isSpeaking
   */
  setSpeaking(isSpeaking) {
    if (isSpeaking) {
      this._stopSpeaking();
      const speakVisemes = ['open_small', 'ee', 'open_wide', 'oo', 'mm', 'open_small', 'closed'];
      let idx = 0;
      const cycle = () => {
        if (!this._speakTimer) return;
        this.setViseme(speakVisemes[idx % speakVisemes.length]);
        idx++;
        this._speakTimer = setTimeout(cycle, 120 + Math.random() * 80);
      };
      this._speakTimer = setTimeout(cycle, 0);
    } else {
      this._stopSpeaking();
      this.setViseme('smile');
    }
  },

  _stopSpeaking() {
    if (this._speakTimer) {
      clearTimeout(this._speakTimer);
      this._speakTimer = null;
    }
  },

  /**
   * Show the avatar (fade in)
   */
  show() {
    this.visible = true;
    if (this.el) this.el.classList.remove('avatar-hidden');
  },

  /**
   * Hide the avatar (fade out)
   */
  hide() {
    this.visible = false;
    if (this.el) this.el.classList.add('avatar-hidden');
  },

  /* ---- Blink system ---- */
  _startBlinking() {
    this._stopBlinking();
    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 3000; // 2.5–5.5 seconds
      this._blinkTimer = setTimeout(() => {
        this._doBlink();
        if (this._idleRunning) scheduleBlink();
      }, delay);
    };
    scheduleBlink();
  },

  _stopBlinking() {
    if (this._blinkTimer) {
      clearTimeout(this._blinkTimer);
      this._blinkTimer = null;
    }
  },

  _doBlink() {
    if (!this.el) return;
    const leftEye = this.el.querySelector('#avatar-left-eye');
    const rightEye = this.el.querySelector('#avatar-right-eye');
    if (leftEye) leftEye.classList.add('avatar-blink');
    if (rightEye) rightEye.classList.add('avatar-blink');
    setTimeout(() => {
      if (leftEye) leftEye.classList.remove('avatar-blink');
      if (rightEye) rightEye.classList.remove('avatar-blink');
    }, 150);
  }
};
