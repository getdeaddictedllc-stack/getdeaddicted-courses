// ===== GETDEADDICTED ACADEMY — 50 DIGITAL WELLNESS COURSES =====
// Kid-friendly (ages 5+), focused on mobile & digital addiction

const CATEGORIES = [
  { id: "understanding", name: "Understanding Screen Addiction", icon: "&#129504;", color: "#6ee7b7", desc: "Learn how screens hook our brains and why it's hard to put them down" },
  { id: "phone", name: "Phone & Device Freedom", icon: "&#128241;", color: "#60a5fa", desc: "Break free from phone habits and take control of your devices" },
  { id: "social", name: "Social Media Wellness", icon: "&#128172;", color: "#a78bfa", desc: "Build a healthy relationship with social media platforms" },
  { id: "gaming", name: "Gaming Balance", icon: "&#127918;", color: "#f472b6", desc: "Enjoy games without losing yourself — find the right balance" },
  { id: "focus", name: "Focus & Attention", icon: "&#127919;", color: "#fbbf24", desc: "Rebuild your attention span and power of concentration" },
  { id: "habits", name: "Healthy Digital Habits", icon: "&#11088;", color: "#34d399", desc: "Build daily routines that put you in charge of technology" },
  { id: "mindfulness", name: "Mindfulness & Unplugging", icon: "&#128992;", color: "#f0abfc", desc: "Practice being present and enjoy life beyond the screen" },
  { id: "family", name: "Family Screen Time", icon: "&#128106;", color: "#fb923c", desc: "Help families create healthy screen habits together" },
  { id: "safety", name: "Online Safety & Wellness", icon: "&#128737;", color: "#22d3ee", desc: "Stay safe, kind, and healthy in the digital world" },
  { id: "creative", name: "Creative Alternatives", icon: "&#127912;", color: "#e879f9", desc: "Discover fun offline activities that make screens less tempting" }
];

let COURSES = [

  // ===== UNDERSTANDING SCREEN ADDICTION (5 courses) =====
  {
    id: 1, category: "understanding", level: "Beginner",
    title: "How Screens Hook Your Brain",
    description: "Discover how apps and games are designed to keep you watching, scrolling, and tapping. Learn about the tricks that make it so hard to put your phone down, and how your brain's reward system works.",
    duration: "2 weeks", lessons: 8,
    modules: ["Your Brain's Reward Button", "Why One More Video Feels So Good", "The Tricks Apps Use to Keep You Watching", "What Happens When You Can't Stop", "Screen Time and Your Mood", "Your Brain Is Not Broken", "How Much Is Too Much?", "Taking Back Control"],
    outcomes: ["Understand how the brain's reward system responds to screens", "Identify tricks apps use to keep you engaged", "Recognize when screen time is affecting your mood", "Know the difference between healthy and unhealthy screen use"],
    audience: "Anyone who wants to understand why screens are so hard to put down"
  },
  {
    id: 2, category: "understanding", level: "Beginner",
    title: "The Attention Economy: You Are the Product",
    description: "Learn how tech companies make money from your attention. Understand why apps are free but your time is the real cost, and how to be a smarter digital citizen.",
    duration: "2 weeks", lessons: 6,
    modules: ["Why Are Apps Free?", "How Companies Sell Your Attention", "The Infinite Scroll Trap", "Notifications: The Attention Thieves", "Ads That Follow You Around", "Being a Smart Digital Citizen"],
    outcomes: ["Understand the business model behind free apps", "Recognize attention-grabbing design patterns", "Identify how notifications manipulate behavior", "Make informed choices about which apps deserve your time"],
    audience: "Kids, teens, and adults who want to understand the digital attention economy"
  },
  {
    id: 3, category: "understanding", level: "Intermediate",
    title: "Screen Time and Your Body",
    description: "Explore how too much screen time affects your eyes, sleep, posture, and energy. Learn simple habits to protect your body while still enjoying technology.",
    duration: "2 weeks", lessons: 8,
    modules: ["Screen Eyes: Protecting Your Vision", "Blue Light and Your Sleep", "Tech Neck and Posture Problems", "Sitting Too Long: Get Moving!", "Headaches and Screen Fatigue", "Screen Time and Your Energy Levels", "The 20-20-20 Rule", "Building a Body-Friendly Tech Routine"],
    outcomes: ["Understand how screens affect eyes, sleep, and posture", "Practice the 20-20-20 rule for eye health", "Set up an ergonomic device setup", "Build movement breaks into screen time"],
    audience: "Anyone experiencing physical effects from too much screen time"
  },
  {
    id: 4, category: "understanding", level: "Beginner",
    title: "Am I Using Too Much Screen Time? A Self-Check",
    description: "A friendly, non-judgmental self-assessment to help you understand your screen habits. No grades, no guilt — just honest awareness and helpful next steps.",
    duration: "1 week", lessons: 5,
    modules: ["Tracking Your Real Screen Time", "Screen Time Diary: What Am I Actually Doing?", "How Do I Feel Before and After Screens?", "What Am I Missing Because of Screens?", "My Personal Screen Time Goal"],
    outcomes: ["Accurately track daily screen time", "Distinguish between productive and passive screen use", "Notice how screens affect mood and energy", "Set a personal screen time goal that feels right"],
    audience: "Anyone curious about whether their screen habits are healthy"
  },
  {
    id: 5, category: "understanding", level: "Intermediate",
    title: "Digital Wellness for the Whole Family",
    description: "A course for families to take together. Learn about screen habits as a team, create family agreements, and build a healthier digital home — no blame, just teamwork.",
    duration: "3 weeks", lessons: 10,
    modules: ["Our Family Screen Habits", "How Screens Affect Kids Differently", "Parents as Digital Role Models", "Creating a Family Digital Agreement", "Screen-Free Zones and Times", "Handling Disagreements About Screens", "Fun Things to Do Together Offline", "Supporting Each Other's Goals", "When Someone Struggles", "Our Family Digital Wellness Plan"],
    outcomes: ["Assess family screen habits together", "Create a written family digital agreement", "Establish screen-free zones and times", "Plan regular offline family activities"],
    audience: "Families who want to improve their digital habits together"
  },

  // ===== PHONE & DEVICE FREEDOM (5 courses) =====
  {
    id: 6, category: "phone", level: "Beginner",
    title: "Phone-Free Mornings: Start Your Day Right",
    description: "Transform your mornings by keeping your phone away for the first hour. Learn why the morning phone check hurts your brain and build a wake-up routine you'll love.",
    duration: "2 weeks", lessons: 7,
    modules: ["Why Your Phone Shouldn't Be Your Alarm Clock", "What Happens When You Check Your Phone First Thing", "Building a Screen-Free Morning Routine", "Morning Activities That Boost Your Day", "Dealing with the Urge to Check", "Weekend Mornings Without Screens", "Making It a Lasting Habit"],
    outcomes: ["Understand why morning phone use affects mood and focus", "Build a phone-free morning routine", "Use an analog alarm clock or phone-away charging station", "Maintain the habit for at least 14 days"],
    audience: "Anyone who reaches for their phone the moment they wake up"
  },
  {
    id: 7, category: "phone", level: "Beginner",
    title: "Phone-Free Bedtime: Sleep Better Tonight",
    description: "Screens before bed wreck your sleep. This course helps you build an evening wind-down routine without devices so you can fall asleep faster and wake up refreshed.",
    duration: "2 weeks", lessons: 7,
    modules: ["How Screens Steal Your Sleep", "The Blue Light Problem", "Creating a Phone Parking Spot", "Your New Evening Routine", "What to Do Instead of Scrolling", "Dealing with FOMO at Night", "Better Sleep Starts Tonight"],
    outcomes: ["Understand how screens disrupt sleep hormones", "Create a device-free bedroom setup", "Build a relaxing screen-free bedtime routine", "Improve sleep quality within two weeks"],
    audience: "Anyone who scrolls in bed and struggles with sleep"
  },
  {
    id: 8, category: "phone", level: "Intermediate",
    title: "Notification Detox: Silence the Noise",
    description: "Notifications interrupt you hundreds of times a day. Learn to take control, keep only what matters, and stop letting your phone boss you around.",
    duration: "1 week", lessons: 6,
    modules: ["How Many Times Does Your Phone Buzz?", "Why Notifications Are Designed to Interrupt", "The Great Notification Audit", "Essential vs Non-Essential Alerts", "Setting Up Do Not Disturb Like a Pro", "Living with Fewer Interruptions"],
    outcomes: ["Audit all notification settings on your devices", "Reduce notifications by at least 70%", "Set up effective Do Not Disturb schedules", "Experience fewer daily interruptions"],
    audience: "Anyone overwhelmed by constant phone notifications"
  },
  {
    id: 9, category: "phone", level: "Intermediate",
    title: "The 30-Day Phone Detox Challenge",
    description: "A structured month-long program to reset your relationship with your phone. Daily challenges, tips, and alternatives to build lasting freedom from phone dependency.",
    duration: "4 weeks", lessons: 30,
    modules: ["Day 1-5: Awareness Week", "Day 6-10: Removing Temptations", "Day 11-15: Building New Habits", "Day 16-20: Going Deeper", "Day 21-25: Filling the Void", "Day 26-30: Your New Normal"],
    outcomes: ["Complete a full 30-day phone reset", "Reduce daily phone pickup frequency by 50%", "Build alternative habits for phone-free time", "Create a sustainable long-term phone usage plan"],
    audience: "Anyone ready for a structured reset of their phone habits"
  },
  {
    id: 10, category: "phone", level: "Advanced",
    title: "Digital Minimalism: Keep Only What Matters",
    description: "Go beyond detox to build a phone setup with only the apps and tools that truly add value to your life. Less clutter, more purpose, more freedom.",
    duration: "3 weeks", lessons: 9,
    modules: ["What Is Digital Minimalism?", "Auditing Every App on Your Phone", "The One-Screen Challenge", "Replacing Apps with Real-World Alternatives", "Grayscale Mode and Other Tricks", "Building Your Minimal Phone Setup", "Social Pressure and Your Choices", "When You Need an App vs Want an App", "Your Digital Minimalism Philosophy"],
    outcomes: ["Remove all non-essential apps from your phone", "Set up a minimal, intentional phone layout", "Use grayscale and other screen-reduction tools", "Develop a personal technology philosophy"],
    audience: "People ready to radically simplify their digital life"
  },

  // ===== SOCIAL MEDIA WELLNESS (5 courses) =====
  {
    id: 11, category: "social", level: "Beginner",
    title: "Social Media: Friend or Foe?",
    description: "Is social media helping you or hurting you? This course helps you figure out your personal relationship with social media — no judgment, just honest exploration.",
    duration: "2 weeks", lessons: 8,
    modules: ["What Social Media Does to Your Brain", "The Comparison Trap", "Likes, Comments, and Your Self-Worth", "FOMO: Fear of Missing Out", "The Highlight Reel vs Real Life", "When Social Media Makes You Feel Bad", "The Good Parts of Social Media", "Finding Your Balance"],
    outcomes: ["Understand how social media affects mood and self-esteem", "Recognize the comparison trap", "Distinguish between healthy and unhealthy social media use", "Create a personal social media balance plan"],
    audience: "Anyone questioning their social media habits"
  },
  {
    id: 12, category: "social", level: "Intermediate",
    title: "Social Media Detox: 14-Day Reset",
    description: "A two-week guided break from social media. Daily activities, reflection prompts, and offline alternatives to help you rediscover life beyond the feed.",
    duration: "2 weeks", lessons: 14,
    modules: ["Preparing for Your Break", "Day 1-3: The Withdrawal Phase", "Day 4-7: Filling the Time", "Day 8-10: Discovering What You've Been Missing", "Day 11-14: Deciding Your Future with Social Media", "Re-engaging Mindfully (or Not)"],
    outcomes: ["Complete a full 14-day social media break", "Discover offline activities that bring genuine joy", "Assess which platforms add real value to your life", "Create intentional rules for any platform you return to"],
    audience: "Anyone ready for a break from social media"
  },
  {
    id: 13, category: "social", level: "Beginner",
    title: "Being Kind Online: Digital Citizenship",
    description: "Learn to be a positive force in online spaces. This course teaches kindness, empathy, and responsibility in the digital world — skills for life.",
    duration: "2 weeks", lessons: 8,
    modules: ["Words Matter Online Too", "Think Before You Post", "How to Disagree Respectfully", "Standing Up to Cyberbullying", "Protecting Your Privacy", "Your Digital Footprint", "Being an Upstander, Not a Bystander", "Spreading Positivity Online"],
    outcomes: ["Practice kindness and empathy in online interactions", "Know how to handle cyberbullying as a target or witness", "Protect personal privacy online", "Understand the permanence of digital footprints"],
    audience: "Kids, teens, and anyone who interacts online"
  },
  {
    id: 14, category: "social", level: "Intermediate",
    title: "Curating a Healthy Feed",
    description: "Your social media feed shapes your mood and worldview. Learn to actively curate what you see so your feed inspires and uplifts rather than drains and compares.",
    duration: "1 week", lessons: 6,
    modules: ["Your Feed Shapes Your Mind", "The Unfollow Audit", "Following Accounts That Inspire You", "Muting, Blocking, and Filtering", "Algorithm Hacks: Training Your Feed", "Maintaining Your Healthy Feed"],
    outcomes: ["Audit and clean up all social media feeds", "Unfollow accounts that trigger negative feelings", "Curate a feed that inspires and educates", "Understand how algorithms work and influence them"],
    audience: "Social media users who want a more positive experience"
  },
  {
    id: 15, category: "social", level: "Advanced",
    title: "Content Creator Wellness",
    description: "For kids and teens who create content — how to share your creativity online while protecting your mental health, managing pressure, and keeping perspective.",
    duration: "3 weeks", lessons: 10,
    modules: ["Why Creating Is Awesome", "The Pressure of Likes and Views", "Comparison with Other Creators", "Taking Breaks Without Losing Followers", "Dealing with Mean Comments", "Privacy and Safety for Creators", "Creating for Joy, Not Just Numbers", "When to Step Back", "Building a Healthy Creator Routine", "Your Creative Mission Statement"],
    outcomes: ["Create content from a place of joy, not pressure", "Handle negative feedback constructively", "Take regular breaks without anxiety", "Maintain privacy and safety while sharing"],
    audience: "Young content creators who want to stay mentally healthy"
  },

  // ===== GAMING BALANCE (5 courses) =====
  {
    id: 16, category: "gaming", level: "Beginner",
    title: "Why Games Are So Hard to Stop",
    description: "Discover the science behind why video games are so engaging. Learn how game designers use psychology to keep you playing, and how to enjoy games without losing control.",
    duration: "2 weeks", lessons: 8,
    modules: ["How Games Light Up Your Brain", "Loot Boxes and Lucky Rewards", "Just One More Level: The Hook", "Daily Logins and FOMO Events", "The Social Pull of Multiplayer", "When Fun Becomes a Problem", "Games vs Real Life Rewards", "Playing Smart"],
    outcomes: ["Understand game design psychology", "Recognize manipulation tactics in games", "Know the warning signs of gaming problems", "Develop smarter gaming awareness"],
    audience: "Gamers of all ages who want to understand why games are so compelling"
  },
  {
    id: 17, category: "gaming", level: "Intermediate",
    title: "Setting Gaming Boundaries That Work",
    description: "Learn to set time limits, manage gaming sessions, and stick to boundaries — without it feeling like punishment. Enjoy games AND the rest of your life.",
    duration: "2 weeks", lessons: 8,
    modules: ["How Much Gaming Is Right for Me?", "Setting a Timer That You'll Actually Respect", "The 'One More Game' Problem", "Finishing Strong: Ending Sessions Well", "Gaming After Homework and Chores", "Weekend Gaming Plans", "When Friends Want to Keep Playing", "My Personal Gaming Contract"],
    outcomes: ["Set realistic, personalized gaming time limits", "Use timers and session-ending strategies effectively", "Communicate boundaries to gaming friends", "Create and follow a personal gaming contract"],
    audience: "Gamers who want to enjoy games without overdoing it"
  },
  {
    id: 18, category: "gaming", level: "Beginner",
    title: "Leveling Up in Real Life",
    description: "The skills you build in games — strategy, teamwork, persistence — are real skills! Learn to transfer your gaming superpowers to school, hobbies, and real-world adventures.",
    duration: "2 weeks", lessons: 8,
    modules: ["Your Gaming Skills Are Real Skills", "Strategy Games and Problem Solving", "Teamwork from Multiplayer to Real Life", "Persistence: The Retry Mindset", "Building Things in Games and in Reality", "Real-World Quests and Adventures", "Finding Your Offline Passion", "Your Real-Life Achievement Board"],
    outcomes: ["Identify transferable skills from gaming", "Apply gaming mindset to real-world challenges", "Discover offline activities with similar rewards", "Create a real-life achievement tracking system"],
    audience: "Gamers looking to balance screen and real-world achievements"
  },
  {
    id: 19, category: "gaming", level: "Intermediate",
    title: "The Gaming and Spending Trap",
    description: "In-app purchases, battle passes, and virtual currencies are designed to get you spending. Learn to enjoy games without emptying your wallet or your parents' wallet.",
    duration: "2 weeks", lessons: 7,
    modules: ["How Free Games Make Money from You", "Virtual Currency Tricks", "Battle Passes: Are They Worth It?", "The Urge to Buy Skins and Items", "Setting a Gaming Budget", "Free-to-Play Without Paying", "Talking to Parents About Gaming Purchases"],
    outcomes: ["Understand monetization tactics in free games", "Resist impulse in-game purchases", "Create a gaming spending budget", "Have productive conversations about gaming costs"],
    audience: "Young gamers and families navigating in-game spending"
  },
  {
    id: 20, category: "gaming", level: "Advanced",
    title: "30-Day Gaming Reset",
    description: "A structured month-long program to completely reset your gaming habits. Take a break, rediscover other interests, and come back (or not) with total control.",
    duration: "4 weeks", lessons: 30,
    modules: ["Why a Reset Matters", "Preparing for Your Break", "Week 1: The Hardest Part", "Filling the Time with Adventures", "Week 2: Discovering New Interests", "Managing the Social Side", "Week 3: Who Am I Without Games?", "Trying New Hobbies", "Week 4: Making Your Decision", "Your New Gaming Philosophy"],
    outcomes: ["Complete a full 30-day gaming break", "Discover at least 5 new offline interests", "Assess gaming's true role in your life", "Create a balanced gaming plan going forward"],
    audience: "Anyone who feels gaming has taken over too much of their life"
  },

  // ===== FOCUS & ATTENTION (5 courses) =====
  {
    id: 21, category: "focus", level: "Beginner",
    title: "Rebuild Your Attention Span",
    description: "Screens have shortened our attention spans. This course helps you rebuild your ability to focus, concentrate, and pay attention — one step at a time.",
    duration: "3 weeks", lessons: 10,
    modules: ["What Happened to My Focus?", "How Screens Shrink Attention", "The Multitasking Myth", "Starting Small: 5-Minute Focus Sprints", "Building to 15 Minutes", "Deep Focus: 30 Minutes and Beyond", "Focus-Friendly Environments", "Focus and Homework", "Focus Games and Exercises", "Your Focus Superpower Plan"],
    outcomes: ["Understand how screens affect attention span", "Practice progressive focus-building exercises", "Create a focus-friendly environment", "Sustain focused attention for increasing periods"],
    audience: "Anyone who feels their attention span has gotten shorter"
  },
  {
    id: 22, category: "focus", level: "Intermediate",
    title: "Homework Without Distractions",
    description: "Stop the homework-phone-homework-phone cycle. Learn practical strategies to focus on schoolwork without constantly checking your device.",
    duration: "2 weeks", lessons: 8,
    modules: ["Why Homework and Phones Don't Mix", "Setting Up a Distraction-Free Zone", "The Phone Box: Out of Sight, Out of Mind", "The Pomodoro Technique for Students", "Music: Helpful or Distracting?", "When You Need Your Device for Homework", "Rewarding Yourself After Focused Work", "Building the Focus Habit"],
    outcomes: ["Create a distraction-free study space", "Use the Pomodoro technique for focused study sessions", "Separate device use from homework time", "Reward focused work with intentional screen time"],
    audience: "Students who struggle to focus on homework due to device distractions"
  },
  {
    id: 23, category: "focus", level: "Beginner",
    title: "Reading Real Books Again",
    description: "Screens make it hard to read for more than a few minutes. This course rebuilds your reading ability and helps you discover the joy of getting lost in a book.",
    duration: "4 weeks", lessons: 12,
    modules: ["Why Reading Feels Hard Now", "Starting with 5 Pages", "Finding Books You'll Actually Love", "Creating a Cozy Reading Spot", "Reading Before Bed Instead of Scrolling", "Comics, Graphic Novels, and Audiobooks Count!", "Building a Reading Streak", "The 20-Minute Reading Habit", "Starting a Book Club", "Screen-Free Reading Time", "Tracking Your Reading Journey", "Becoming a Reader Again"],
    outcomes: ["Build a daily reading habit starting with 5 pages", "Find books matched to your interests", "Replace screen time before bed with reading", "Track and celebrate reading progress"],
    audience: "Anyone who used to enjoy reading but lost the habit to screens"
  },
  {
    id: 24, category: "focus", level: "Intermediate",
    title: "Single-Tasking: Doing One Thing at a Time",
    description: "Our brains can't actually multitask — they just switch between tasks badly. Learn the power of doing one thing at a time and watch your productivity soar.",
    duration: "2 weeks", lessons: 7,
    modules: ["The Multitasking Lie", "What Happens When You Switch Tasks", "One Tab, One Task", "Batching Similar Activities", "Mindful Transitions Between Activities", "Single-Tasking with Technology", "The Joy of Full Presence"],
    outcomes: ["Understand why multitasking reduces quality", "Practice single-tasking in daily activities", "Reduce browser tabs and app-switching", "Experience deeper engagement with tasks"],
    audience: "Anyone who constantly juggles screens, tasks, and notifications"
  },
  {
    id: 25, category: "focus", level: "Advanced",
    title: "Deep Work for Young Minds",
    description: "Learn to do your best, most creative work by mastering deep concentration. Build the skill that will set you apart in school, hobbies, and eventually your career.",
    duration: "3 weeks", lessons: 10,
    modules: ["What Is Deep Work?", "Why Deep Work Is a Superpower", "Your Deep Work Environment", "Ritual and Routine for Focus", "Starting a Deep Work Session", "Handling Interruptions", "The Flow State", "Deep Work for Creative Projects", "Deep Work for Studying", "Building Your Deep Work Practice"],
    outcomes: ["Understand deep work and its benefits", "Create rituals that trigger focused states", "Achieve flow state in creative and academic work", "Build a regular deep work practice"],
    audience: "Students and young people who want to develop exceptional focus"
  },

  // ===== HEALTHY DIGITAL HABITS (5 courses) =====
  {
    id: 26, category: "habits", level: "Beginner",
    title: "My Daily Screen Time Plan",
    description: "Create a personalized daily schedule that balances screen time with everything else that matters — school, play, family, sleep, and fun.",
    duration: "1 week", lessons: 5,
    modules: ["What Does My Day Look Like Now?", "Screen Time Guidelines by Age", "Building a Balanced Daily Schedule", "Screen Time as a Reward, Not a Default", "My Personal Daily Plan"],
    outcomes: ["Map current daily screen time accurately", "Create an age-appropriate screen time schedule", "Balance screens with offline activities", "Use screen time intentionally, not by default"],
    audience: "Kids, teens, and families creating daily screen time plans"
  },
  {
    id: 27, category: "habits", level: "Beginner",
    title: "Tech-Free Mealtimes",
    description: "Eating while watching screens means you miss the food AND the people around you. Learn to enjoy meals without devices and make family time count.",
    duration: "1 week", lessons: 5,
    modules: ["Why Screens at Meals Are a Problem", "The Phone Stack Game", "Conversation Starters for Mealtime", "Tasting Your Food: Mindful Eating", "Making Tech-Free Meals a Family Rule"],
    outcomes: ["Understand why screens reduce meal enjoyment", "Implement device-free mealtimes", "Use fun conversation starters at dinner", "Practice mindful eating without distractions"],
    audience: "Families who want to reclaim mealtimes from devices"
  },
  {
    id: 28, category: "habits", level: "Intermediate",
    title: "App Audit: Cleaning Up Your Digital Life",
    description: "How many apps do you really use? Learn to audit, organize, and declutter your devices so they work for you instead of distracting you.",
    duration: "1 week", lessons: 5,
    modules: ["How Many Apps Do You Have?", "The Keep, Delete, or Limit Test", "Organizing Your Home Screen for Calm", "Turning Off the Time-Wasters", "Your Clean Digital Space"],
    outcomes: ["Audit all apps on your devices", "Delete or limit apps that waste time", "Organize home screens to reduce temptation", "Maintain a clean, intentional device setup"],
    audience: "Anyone with a cluttered, distracting device"
  },
  {
    id: 29, category: "habits", level: "Intermediate",
    title: "Boredom Is Not an Emergency",
    description: "We reach for our phones every time we're bored. But boredom is actually your brain's way of pushing you toward creativity. Learn to sit with boredom and let it spark something amazing.",
    duration: "2 weeks", lessons: 8,
    modules: ["Why We Grab Our Phones When Bored", "Boredom Is Your Brain's Gift", "Sitting with Nothing for 5 Minutes", "The Boredom Jar: 50 Offline Ideas", "Daydreaming: Your Brain's Creative Mode", "Waiting Without a Screen", "Boredom and Creativity: The Connection", "Embracing the Quiet"],
    outcomes: ["Tolerate boredom without reaching for a device", "Use boredom as a springboard for creativity", "Build a personal list of offline alternatives", "Practice waiting without screens"],
    audience: "Anyone who can't sit still without checking their phone"
  },
  {
    id: 30, category: "habits", level: "Beginner",
    title: "Screen-Free Sundays (or Any Day!)",
    description: "Take one full day per week away from screens. This course makes it fun with activity ideas, family challenges, and tips for making it through the whole day.",
    duration: "2 weeks", lessons: 7,
    modules: ["Why One Screen-Free Day Matters", "Picking Your Day", "Preparing for a Screen-Free Day", "50 Amazing Things to Do Without Screens", "Getting the Whole Family Involved", "When It Gets Hard", "Making It a Weekly Tradition"],
    outcomes: ["Complete at least two screen-free days", "Discover offline activities you genuinely enjoy", "Build a weekly screen-free tradition", "Experience the mental clarity of a full day offline"],
    audience: "Individuals and families who want a regular digital sabbath"
  },

  // ===== MINDFULNESS & UNPLUGGING (5 courses) =====
  {
    id: 31, category: "mindfulness", level: "Beginner",
    title: "Mindfulness for Kids: Being Here Right Now",
    description: "Simple, fun mindfulness exercises designed for young minds. Learn to notice the world around you, calm big feelings, and be present without needing a screen.",
    duration: "3 weeks", lessons: 12,
    modules: ["What Is Mindfulness?", "The Breathing Buddy Exercise", "Five Senses Scavenger Hunt", "Listening to the World Around You", "Mindful Eating: Really Tasting Your Food", "Body Scan for Kids", "Mindful Walking", "Calming Down When Things Feel Big", "Gratitude Practice", "Mindful Drawing", "Nature Noticing", "Your Mindfulness Superpower"],
    outcomes: ["Practice 5 kid-friendly mindfulness exercises", "Use breathing techniques to manage emotions", "Notice the real world with all five senses", "Build a daily mindfulness practice"],
    audience: "Children ages 5-12 learning mindfulness for the first time"
  },
  {
    id: 32, category: "mindfulness", level: "Intermediate",
    title: "Breathing Exercises for Screen Breaks",
    description: "Quick breathing techniques you can do anytime to reset your brain between screen sessions. Takes just 1-3 minutes and makes a huge difference.",
    duration: "1 week", lessons: 6,
    modules: ["Why Breathing Resets Your Brain", "Box Breathing: 4-4-4-4", "The Balloon Breath", "Five-Finger Breathing", "The Calm Down Breath", "Building Breathing into Your Day"],
    outcomes: ["Learn 5 different breathing techniques", "Use breathing to transition away from screens", "Calm anxiety and restlessness in under 2 minutes", "Build regular breathing breaks into screen time"],
    audience: "All ages — quick breathing tools for daily screen breaks"
  },
  {
    id: 33, category: "mindfulness", level: "Intermediate",
    title: "Nature Time: The Best Screen Break",
    description: "Getting outside in nature is the most powerful antidote to too much screen time. Learn to enjoy nature, even in small doses, and feel the difference it makes.",
    duration: "3 weeks", lessons: 10,
    modules: ["Why Nature Heals the Screen-Tired Brain", "Starting with 10 Minutes Outside", "Nature Scavenger Hunts", "Cloud Watching and Sky Gazing", "Gardening: Growing Something Real", "Walking Without Your Phone", "Nature Journaling", "Finding Nature in the City", "Outdoor Adventures for Every Season", "Making Nature a Daily Habit"],
    outcomes: ["Spend at least 20 minutes in nature daily", "Practice phone-free outdoor activities", "Start a nature journal or photo project (with a real camera!)", "Experience the mood-boosting effects of nature"],
    audience: "Anyone who wants to balance screen time with outdoor time"
  },
  {
    id: 34, category: "mindfulness", level: "Beginner",
    title: "Gratitude Without a Screen",
    description: "Learn to notice and appreciate the good things in your life — no app required. Build a gratitude practice using a journal, drawings, or conversation.",
    duration: "2 weeks", lessons: 7,
    modules: ["What Is Gratitude and Why Does It Matter?", "The Gratitude Journal", "Three Good Things Each Day", "Gratitude Letters to People You Love", "Gratitude Walks", "Gratitude at Mealtimes", "Making Gratitude a Habit"],
    outcomes: ["Start a daily gratitude practice", "Notice positive experiences without documenting them digitally", "Express gratitude to others regularly", "Experience improved mood through consistent gratitude"],
    audience: "All ages — building appreciation without technology"
  },
  {
    id: 35, category: "mindfulness", level: "Advanced",
    title: "Meditation for Teens: Calm Your Digital Mind",
    description: "A meditation course designed specifically for teens living in a hyper-connected world. Learn to quiet the noise, manage stress, and find inner calm.",
    duration: "4 weeks", lessons: 14,
    modules: ["Meditation Is Not What You Think", "Your First 2-Minute Sit", "Dealing with a Noisy Mind", "Guided Meditation Practice", "Body Scan Meditation", "Walking Meditation", "Meditation for Stress and Test Anxiety", "Meditation for Better Sleep", "Meditation for Focus", "Meditation When You're Upset", "Building to 10 Minutes", "Meditation and Digital Balance", "Finding Your Style", "Your Personal Practice"],
    outcomes: ["Establish a daily meditation practice", "Use meditation for stress, sleep, and focus", "Sit with a busy mind without frustration", "Build from 2 to 10+ minutes of practice"],
    audience: "Teens and young adults seeking calm in a noisy digital world"
  },

  // ===== FAMILY SCREEN TIME (5 courses) =====
  {
    id: 36, category: "family", level: "Beginner",
    title: "Screen Rules for Little Kids (Ages 3-7)",
    description: "Age-appropriate screen guidelines for young children. Helps parents set up healthy habits early with practical, loving strategies that work.",
    duration: "2 weeks", lessons: 8,
    modules: ["How Screens Affect Little Brains", "Age-Appropriate Time Limits", "Choosing Quality Content", "Co-Viewing: Watching Together", "Transitioning Away from Screens Without Meltdowns", "Screen-Free Play Ideas for Little Ones", "When Screens Are Okay", "Building Lifelong Healthy Habits Early"],
    outcomes: ["Set developmentally appropriate screen limits", "Choose high-quality content for young children", "Handle screen-to-activity transitions smoothly", "Build a foundation of healthy digital habits"],
    audience: "Parents and caregivers of children ages 3-7"
  },
  {
    id: 37, category: "family", level: "Intermediate",
    title: "Navigating Screens with Tweens (Ages 8-12)",
    description: "The tween years bring new digital challenges — first phones, social media curiosity, and gaming passion. Build trust-based guidelines that grow with your child.",
    duration: "3 weeks", lessons: 10,
    modules: ["The Tween Digital Landscape", "First Phone Readiness", "Setting Up Parental Controls with Trust", "Social Media: When and How", "Gaming Guidelines for Tweens", "Online Friendships: What Parents Should Know", "Having Open Conversations About Screen Time", "Building Digital Responsibility", "When to Give More Freedom", "Growing Together Digitally"],
    outcomes: ["Assess first phone readiness using clear criteria", "Set up age-appropriate parental controls", "Have open, non-judgmental conversations about digital life", "Build a trust-based system that grows with your child"],
    audience: "Parents of tweens navigating increasing digital independence"
  },
  {
    id: 38, category: "family", level: "Intermediate",
    title: "Teens and Screens: Respect and Responsibility",
    description: "Guide teens toward digital independence with respect on both sides. Build agreements, not arguments, about screen time, privacy, and online behavior.",
    duration: "3 weeks", lessons: 10,
    modules: ["Understanding Teen Digital Culture", "Respecting Privacy While Ensuring Safety", "Collaborative Screen Time Agreements", "When Social Media Affects Mood", "Gaming and Academic Balance", "Digital Curfews That Make Sense", "Handling Screen Time Conflicts", "Teaching Self-Regulation", "Preparing for Full Digital Independence", "The Ongoing Conversation"],
    outcomes: ["Create collaborative screen time agreements", "Balance teen privacy with safety", "Resolve screen time conflicts respectfully", "Prepare teens for independent digital decision-making"],
    audience: "Parents of teens seeking respectful, effective digital guidance"
  },
  {
    id: 39, category: "family", level: "Beginner",
    title: "Parents as Digital Role Models",
    description: "Kids learn from what you DO, not what you SAY. This course helps parents examine their own screen habits and model the behavior they want to see.",
    duration: "2 weeks", lessons: 7,
    modules: ["Do as I Say, Not as I Do? It Doesn't Work", "Auditing Your Own Screen Time", "Phone-Free Parenting Moments", "Being Present with Your Kids", "Managing Work-Life-Screen Balance", "Apologizing When You Slip Up", "Growing Together as a Family"],
    outcomes: ["Honestly assess your own screen habits", "Identify moments when phones interfere with parenting", "Model phone-free presence with children", "Create accountability for your own digital habits"],
    audience: "Parents who want to practice what they preach about screens"
  },
  {
    id: 40, category: "family", level: "Intermediate",
    title: "Screen-Free Family Activities: 100 Ideas",
    description: "A treasure chest of fun things families can do together without any screens. Organized by season, budget, age group, and energy level.",
    duration: "2 weeks", lessons: 8,
    modules: ["Why Shared Offline Time Matters", "Rainy Day Indoor Adventures", "Outdoor Family Fun", "Creative Projects Together", "Board Games and Card Games", "Cooking and Baking as a Family", "Active Adventures and Sports", "Building Family Traditions Without Screens"],
    outcomes: ["Have a go-to list of 100 screen-free family activities", "Try at least 10 new activities during the course", "Build weekly screen-free family time", "Create new family traditions around offline fun"],
    audience: "Families looking for engaging alternatives to screen time"
  },

  // ===== ONLINE SAFETY & WELLNESS (5 courses) =====
  {
    id: 41, category: "safety", level: "Beginner",
    title: "Internet Safety for Kids",
    description: "Essential internet safety skills for young users. Learn to stay safe online, protect personal information, and know what to do if something feels wrong.",
    duration: "2 weeks", lessons: 8,
    modules: ["The Internet Is Amazing AND Requires Care", "Personal Information: What to Never Share", "Strangers Online: The Safety Rules", "What to Do If Something Feels Wrong", "Safe Searching and Browsing", "Passwords: Your Digital Lock", "Asking a Trusted Adult for Help", "Being a Safe and Kind Internet User"],
    outcomes: ["Know what personal information to protect online", "Recognize unsafe online situations", "Practice safe browsing and searching", "Know when and how to ask an adult for help"],
    audience: "Children ages 5-12 learning internet safety fundamentals"
  },
  {
    id: 42, category: "safety", level: "Intermediate",
    title: "Cyberbullying: Prevention and Response",
    description: "Learn what cyberbullying looks like, how to prevent it, how to respond if it happens to you, and how to be an upstander who helps others.",
    duration: "2 weeks", lessons: 8,
    modules: ["What Is Cyberbullying?", "Different Forms of Online Cruelty", "How Cyberbullying Feels", "What to Do If You're Being Bullied", "Saving Evidence and Reporting", "Being an Upstander", "Why People Cyberbully", "Creating a Kinder Online World"],
    outcomes: ["Recognize all forms of cyberbullying", "Know specific steps to take if bullied online", "Save evidence and report effectively", "Stand up for others being bullied"],
    audience: "Kids and teens learning to handle and prevent cyberbullying"
  },
  {
    id: 43, category: "safety", level: "Beginner",
    title: "Protecting Your Digital Wellbeing",
    description: "Your mental health matters more than any app. Learn to recognize when digital experiences are hurting your feelings and what to do about it.",
    duration: "2 weeks", lessons: 8,
    modules: ["How Do Screens Make Me Feel?", "Recognizing Digital Stress", "When Online Stuff Makes You Sad or Angry", "Taking a Screen Break When You Need It", "Talking to Someone You Trust", "Building Emotional Awareness Online", "Digital Boundaries for Your Feelings", "Your Digital Wellbeing Toolkit"],
    outcomes: ["Recognize how different digital experiences affect emotions", "Take breaks when screens cause stress or negative feelings", "Talk to trusted adults about online experiences", "Build a personal digital wellbeing toolkit"],
    audience: "Kids and teens learning to protect their emotional health online"
  },
  {
    id: 44, category: "safety", level: "Intermediate",
    title: "Fake News and Critical Thinking Online",
    description: "Not everything online is true. Learn to spot misinformation, think critically about what you see, and be a smarter consumer of digital content.",
    duration: "2 weeks", lessons: 8,
    modules: ["Why Do People Share Fake News?", "Spotting Fake Headlines", "Checking Sources: Is This Real?", "Photos and Videos Can Lie", "Clickbait: Don't Take the Bait", "Echo Chambers and Filter Bubbles", "Fact-Checking Tools", "Being a Critical Thinker Online"],
    outcomes: ["Identify fake news and misinformation", "Verify sources before believing or sharing content", "Recognize clickbait and misleading thumbnails", "Use fact-checking tools and techniques"],
    audience: "Kids, teens, and adults learning to navigate online misinformation"
  },
  {
    id: 45, category: "safety", level: "Intermediate",
    title: "Healthy Online Friendships",
    description: "Online friendships can be wonderful. Learn to build genuine connections online while staying safe, setting boundaries, and knowing the difference between real friends and strangers.",
    duration: "2 weeks", lessons: 7,
    modules: ["Online Friends Can Be Real Friends", "Safety First: Who Are You Talking To?", "Boundaries in Online Friendships", "When Online Drama Gets Too Much", "Balancing Online and Offline Friends", "Signs of an Unhealthy Online Relationship", "Building Genuine Connection Safely"],
    outcomes: ["Build healthy online friendships with appropriate boundaries", "Recognize warning signs of unsafe online interactions", "Balance online and offline social connections", "Handle online social drama constructively"],
    audience: "Kids and teens who form friendships through gaming, social media, or online communities"
  },

  // ===== CREATIVE ALTERNATIVES (5 courses) =====
  {
    id: 46, category: "creative", level: "Beginner",
    title: "Drawing and Art Without a Tablet",
    description: "Rediscover the joy of creating with your hands. Paper, pencils, paint, and clay — art you can touch, feel, and hang on your wall.",
    duration: "4 weeks", lessons: 12,
    modules: ["Why Making Art Feels Amazing", "Drawing: Starting with Doodles", "Sketching the World Around You", "Painting: Watercolors for Beginners", "Collage and Mixed Media", "Clay and Sculpture", "Comics and Storytelling", "Art Journaling", "Making Art Gifts", "Art Outdoors", "Starting an Art Habit", "Your Creative Portfolio"],
    outcomes: ["Try at least 6 different art forms", "Build a regular creative practice", "Create art that processes emotions without screens", "Discover which art forms bring you the most joy"],
    audience: "All ages — rediscovering hands-on creativity"
  },
  {
    id: 47, category: "creative", level: "Beginner",
    title: "Music, Dance, and Movement",
    description: "Move your body, make some noise, and feel the joy of physical expression. No screens required — just you, your body, and maybe some instruments.",
    duration: "3 weeks", lessons: 10,
    modules: ["Why Movement Feels Good", "Kitchen Dance Parties", "Learning a Simple Instrument", "Singing: Your Built-In Instrument", "Making Music with Everyday Objects", "Active Games for Indoors", "Active Games for Outdoors", "Stretching and Yoga for Kids", "Movement Challenges", "Your Movement Playlist (Not on a Screen!)"],
    outcomes: ["Build daily movement and music into your routine", "Discover physical activities you genuinely enjoy", "Use movement to manage screen cravings", "Experience the mood boost of physical expression"],
    audience: "Kids and families looking for active screen alternatives"
  },
  {
    id: 48, category: "creative", level: "Intermediate",
    title: "Building and Making: Hands-On Projects",
    description: "Build forts, create inventions, design crafts, and make things with your hands. Real-world building beats virtual building every time.",
    duration: "4 weeks", lessons: 12,
    modules: ["The Joy of Making Things", "Cardboard Construction Challenge", "Simple Woodworking Projects", "Sewing and Fabric Crafts", "Science Experiments at Home", "Cooking and Baking Projects", "Model Building", "Origami and Paper Crafts", "Upcycling: Making New from Old", "Building a Fort or Treehouse", "Inventing Something New", "Your Maker Project"],
    outcomes: ["Complete at least 6 hands-on building projects", "Develop basic construction and craft skills", "Experience the satisfaction of creating tangible objects", "Choose making over screen time during free time"],
    audience: "Kids and teens who love building in games and want to build in real life"
  },
  {
    id: 49, category: "creative", level: "Beginner",
    title: "Storytelling and Writing Adventures",
    description: "Create your own stories, comics, poems, and adventures — on paper, not a screen. Unlock your imagination through the power of words.",
    duration: "3 weeks", lessons: 10,
    modules: ["Everyone Has Stories to Tell", "Story Starters and Writing Prompts", "Creating Characters", "Building Worlds", "Writing Your Own Comic", "Poetry That's Actually Fun", "Letter Writing: Analog Social Media", "Journaling Your Life", "Collaborative Storytelling Games", "Your Story Collection"],
    outcomes: ["Write regularly using paper and pen", "Create original stories, comics, or poems", "Use writing to process emotions offline", "Build a personal writing habit"],
    audience: "Young writers and storytellers of all levels"
  },
  {
    id: 50, category: "creative", level: "Intermediate",
    title: "Outdoor Adventures and Exploration",
    description: "The greatest game ever made is the one outside your door. This course turns your neighborhood, parks, and nature into the ultimate adventure playground.",
    duration: "4 weeks", lessons: 12,
    modules: ["Your Neighborhood Is an Adventure Map", "Geocaching: Real-World Treasure Hunting", "Nature Photography (With a Real Camera)", "Bird Watching for Beginners", "Hiking and Trail Exploration", "Stargazing Nights", "Camping Skills", "Orienteering and Map Reading", "Nature Collection and Identification", "Seasonal Outdoor Challenges", "Planning Your Own Expedition", "The Explorer's Journal"],
    outcomes: ["Explore your local area with new curiosity", "Try at least 8 outdoor activities", "Build regular outdoor adventure habits", "Experience nature as more exciting than screens"],
    audience: "Kids, teens, and families discovering outdoor adventures"
  }
];
