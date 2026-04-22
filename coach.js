// ===== GETDEADDICTED ACADEMY — AI COACH =====
// In-course chat widget with smart contextual responses
// Ready for Claude API backend — currently uses curated response engine

const Coach = (() => {
  let _visible = false;
  let _courseContext = null;
  let _history = [];

  const RESPONSES = {
    greeting: [
      "Hi there! I'm your Digital Wellness Coach. Ask me anything about what you're learning!",
      "Hey! I'm here to help you on your wellness journey. What's on your mind?",
      "Welcome! I can explain concepts, give tips, or just chat about digital wellness."
    ],
    screen_time: [
      "Screen time isn't all bad — what matters is *how* you use it. Creative time (drawing, coding, music) is different from passive scrolling. Try tracking which type you do more of this week!",
      "A good rule of thumb: for every 30 minutes of screen time, take a 5-minute break to move your body or look at something far away. Your eyes and brain will thank you!",
      "Many experts suggest keeping recreational screen time under 2 hours for kids. But the quality matters more than the quantity."
    ],
    addiction: [
      "Feeling pulled to check your phone is totally normal — apps are designed that way! The first step is just noticing the urge. Try pausing 10 seconds before opening an app and ask: 'Do I really want this right now?'",
      "Addiction to screens works similarly to other habits. Your brain creates pathways that seek the quick reward. The good news? You can build new pathways with practice!",
      "If you feel anxious without your phone, that's called FOMO (Fear of Missing Out). Try this: put your phone in another room for 30 minutes. You'll probably feel calmer than you expected!"
    ],
    social_media: [
      "Social media shows everyone's highlight reel, not their real life. Next time you feel bad after scrolling, remember: you're comparing your behind-the-scenes to someone else's best moments.",
      "Try this experiment: unfollow 5 accounts that make you feel bad and follow 5 that teach you something. Notice how your feed — and your mood — changes!",
      "The average person checks social media 150 times per day. Try turning off notifications for just one app this week and see how it feels."
    ],
    sleep: [
      "Blue light from screens tells your brain it's daytime, making it harder to fall asleep. Try stopping screens 1 hour before bed — read a book, draw, or listen to music instead.",
      "Keeping your phone out of the bedroom is one of the most powerful sleep habits you can build. Try charging it in another room tonight!",
      "Studies show that teens who stop screens 30 minutes before bed fall asleep 20 minutes faster. That's an extra 20 minutes of rest every night!"
    ],
    gaming: [
      "Games are designed with reward loops — completing a quest, leveling up, getting loot. Knowing this helps you decide when to stop. Try setting a timer before you start playing!",
      "Gaming with friends can be great for socializing! But if gaming is your only social time, try adding one offline hangout per week.",
      "The 'one more game' feeling is the strongest right after a win OR a loss. That's the hardest time to stop — and the best time to practice saying 'that's enough for today.'"
    ],
    motivation: [
      "The fact that you're here learning about digital wellness means you already care about yourself. That takes courage. Keep going!",
      "Change doesn't happen overnight. Every small step counts. Even reading one slide or thinking about your habits for 30 seconds is progress.",
      "You're not alone in this. Millions of people — kids and adults — are working on building healthier relationships with technology."
    ],
    tips: [
      "Here are 3 quick wins: 1) Turn off non-essential notifications. 2) Move social media apps off your home screen. 3) Set a daily screen time goal (start with whatever feels doable).",
      "Try the 'Phone Stack' game at dinner: everyone puts their phone in the middle. First person to grab theirs does the dishes!",
      "Create a 'Tech-Free Zone' in your home — maybe the dinner table or your bedroom. It becomes easier when there's a clear boundary."
    ],
    default: [
      "That's a great question! While I think about the best answer, here's something to consider: every moment you spend thinking about your digital habits is a step toward a healthier relationship with technology.",
      "I'm still learning about that topic! In the meantime, try applying what you've learned in this course to your daily life — even small changes make a big difference.",
      "Good question! Digital wellness is a personal journey. What works for one person might not work for another. The key is to experiment and find what helps *you* feel your best."
    ]
  };

  function _pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function _getResponse(message) {
    const lower = message.toLowerCase();

    if (lower.match(/\b(hi|hello|hey|start|help)\b/)) return _pickRandom(RESPONSES.greeting);
    if (lower.match(/\b(screen\s*time|how\s*much|too\s*much|hours|limit)\b/)) return _pickRandom(RESPONSES.screen_time);
    if (lower.match(/\b(addict|hooked|can.t\s*stop|obsess|compuls)\b/)) return _pickRandom(RESPONSES.addiction);
    if (lower.match(/\b(social\s*media|instagram|tiktok|snapchat|facebook|twitter|follower)\b/)) return _pickRandom(RESPONSES.social_media);
    if (lower.match(/\b(sleep|bed|night|blue\s*light|tired|insomnia)\b/)) return _pickRandom(RESPONSES.sleep);
    if (lower.match(/\b(game|gaming|fortnite|minecraft|roblox|xbox|playstation|nintendo)\b/)) return _pickRandom(RESPONSES.gaming);
    if (lower.match(/\b(motivat|inspire|give\s*up|hard|difficult|can.t\s*do)\b/)) return _pickRandom(RESPONSES.motivation);
    if (lower.match(/\b(tip|advice|suggest|recommend|what\s*should|how\s*do)\b/)) return _pickRandom(RESPONSES.tips);

    return _pickRandom(RESPONSES.default);
  }

  function init() {
    const container = document.getElementById('coachWidget');
    if (!container) return;
    container.innerHTML = `
      <button class="coach-fab" id="coachFab" onclick="Coach.toggle()" title="AI Wellness Coach">
        <span class="coach-fab-icon">&#129302;</span>
        <span class="coach-fab-pulse"></span>
      </button>
      <div class="coach-panel" id="coachPanel">
        <div class="coach-header">
          <span class="coach-avatar">&#129302;</span>
          <div>
            <strong>Wellness Coach</strong>
            <span class="coach-status">AI-powered</span>
          </div>
          <button class="coach-close" onclick="Coach.toggle()">&times;</button>
        </div>
        <div class="coach-messages" id="coachMessages"></div>
        <form class="coach-input" onsubmit="Coach.send(event)">
          <input type="text" id="coachInput" placeholder="Ask me anything about digital wellness..." maxlength="500" autocomplete="off">
          <button type="submit" class="coach-send">&#10148;</button>
        </form>
      </div>
    `;
  }

  function toggle() {
    _visible = !_visible;
    const panel = document.getElementById('coachPanel');
    const fab = document.getElementById('coachFab');
    if (panel) panel.classList.toggle('active', _visible);
    if (fab) fab.classList.toggle('open', _visible);

    if (_visible && _history.length === 0) {
      _addMessage('coach', _pickRandom(RESPONSES.greeting));
    }
  }

  function setCourseContext(course) {
    _courseContext = course;
  }

  function send(e) {
    e.preventDefault();
    const input = document.getElementById('coachInput');
    const msg = input.value.trim();
    if (!msg) return;

    _addMessage('user', msg);
    input.value = '';

    // Simulate typing delay
    _showTyping();
    setTimeout(() => {
      _hideTyping();
      const response = _getResponse(msg);
      _addMessage('coach', response);
    }, 800 + Math.random() * 600);
  }

  function _addMessage(role, text) {
    _history.push({ role, text, time: Date.now() });
    const container = document.getElementById('coachMessages');
    if (!container) return;

    const div = document.createElement('div');
    div.className = `coach-msg coach-msg-${role}`;
    div.innerHTML = `<div class="coach-msg-bubble">${_escapeHtml(text)}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function _showTyping() {
    const container = document.getElementById('coachMessages');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'coach-msg coach-msg-coach coach-typing';
    div.id = 'coachTyping';
    div.innerHTML = '<div class="coach-msg-bubble"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></div>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function _hideTyping() {
    const el = document.getElementById('coachTyping');
    if (el) el.remove();
  }

  function _escapeHtml(str) {
    const el = document.createElement('span');
    el.textContent = str;
    return el.innerHTML;
  }

  return { init, toggle, send, setCourseContext };
})();
