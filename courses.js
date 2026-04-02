// ===== GETDEADDICTED ACADEMY — 108 COURSES DATA =====

const CATEGORIES = [
  { id: "substance", name: "Substance Recovery", icon: "&#127793;", color: "#6ee7b7", desc: "Evidence-based approaches to overcoming substance dependence" },
  { id: "behavioral", name: "Behavioral Addictions", icon: "&#129504;", color: "#60a5fa", desc: "Break free from compulsive behaviors and habit loops" },
  { id: "digital", name: "Digital Detox", icon: "&#128241;", color: "#a78bfa", desc: "Reclaim your time and attention from screens and social media" },
  { id: "mental", name: "Mental Health", icon: "&#128154;", color: "#34d399", desc: "Build psychological resilience and emotional well-being" },
  { id: "mindfulness", name: "Mindfulness & Meditation", icon: "&#128992;", color: "#f0abfc", desc: "Cultivate present-moment awareness and inner calm" },
  { id: "physical", name: "Physical Wellness", icon: "&#128170;", color: "#fb923c", desc: "Rebuild your body and establish healthy fitness habits" },
  { id: "nutrition", name: "Nutrition & Healing", icon: "&#129382;", color: "#fbbf24", desc: "Nourish your recovery with proper nutrition and diet" },
  { id: "relationships", name: "Relationships & Communication", icon: "&#129309;", color: "#f472b6", desc: "Rebuild trust, set boundaries, and connect authentically" },
  { id: "financial", name: "Financial Recovery", icon: "&#128176;", color: "#4ade80", desc: "Repair finances and build lasting financial stability" },
  { id: "career", name: "Career & Purpose", icon: "&#127919;", color: "#38bdf8", desc: "Rediscover your professional path and life purpose" },
  { id: "family", name: "Family & Parenting", icon: "&#127968;", color: "#fb7185", desc: "Heal family dynamics and become the parent you want to be" },
  { id: "relapse", name: "Relapse Prevention", icon: "&#128737;", color: "#c084fc", desc: "Build your defense system against relapse triggers" },
  { id: "support", name: "Support Systems", icon: "&#129730;", color: "#22d3ee", desc: "Build and maintain your recovery support network" },
  { id: "life-skills", name: "Life Skills", icon: "&#128736;", color: "#e879f9", desc: "Master the practical skills for independent, fulfilling living" },
  { id: "spiritual", name: "Spiritual Growth", icon: "&#10024;", color: "#fcd34d", desc: "Explore meaning, purpose, and spiritual connection in recovery" }
];

const COURSES = [
  // ===== SUBSTANCE RECOVERY (8 courses) =====
  {
    id: 1, category: "substance", level: "Beginner",
    title: "Understanding Addiction: The Science Behind Dependence",
    description: "Explore the neuroscience of addiction — how substances hijack the brain's reward system, the role of dopamine, and why willpower alone isn't enough.",
    duration: "4 weeks", lessons: 12,
    modules: ["The Brain's Reward System", "How Substances Alter Neurochemistry", "Tolerance, Dependence & Withdrawal", "The Genetics of Addiction", "Beyond Willpower: Why Biology Matters", "Your Personal Risk Assessment"],
    outcomes: ["Understand the neuroscience of addiction", "Identify personal risk factors", "Explain why addiction is a medical condition, not a moral failing", "Communicate your condition to loved ones with confidence"],
    audience: "Anyone new to recovery or seeking to understand addiction from a scientific perspective"
  },
  {
    id: 2, category: "substance", level: "Beginner",
    title: "Your First 30 Days: A Survival Guide",
    description: "A day-by-day roadmap for the critical first month of sobriety. Practical tools for managing cravings, withdrawal, and building your initial support structure.",
    duration: "4 weeks", lessons: 30,
    modules: ["Preparing for Day One", "Managing Physical Withdrawal", "The Emotional Rollercoaster (Week 1)", "Building Daily Structure", "Cravings: Ride the Wave", "Celebrating 30 Days"],
    outcomes: ["Navigate withdrawal symptoms safely", "Build a structured daily routine", "Use 5 evidence-based craving management techniques", "Establish an initial support system"],
    audience: "People in early recovery or preparing to begin their sobriety journey"
  },
  {
    id: 3, category: "substance", level: "Intermediate",
    title: "Alcohol Recovery: Breaking the Cycle",
    description: "Comprehensive program specifically designed for alcohol use disorder. Covers the unique challenges of alcohol recovery in a culture that normalizes drinking.",
    duration: "8 weeks", lessons: 16,
    modules: ["Understanding Alcohol Use Disorder", "Navigating Social Pressure", "Alcohol and Your Body: Damage & Healing", "Mocktails & Alternative Rituals", "Dealing with Alcohol Everywhere", "Building an Alcohol-Free Identity", "When Others Still Drink", "Long-Term Sobriety Maintenance"],
    outcomes: ["Navigate social situations without alcohol", "Understand the physical healing timeline", "Create new social rituals and traditions", "Build a sustainable alcohol-free lifestyle"],
    audience: "Individuals recovering from alcohol use disorder at any stage"
  },
  {
    id: 4, category: "substance", level: "Intermediate",
    title: "Opioid Recovery: Pathways to Freedom",
    description: "Specialized recovery program addressing the opioid crisis. Includes medication-assisted treatment education, pain management alternatives, and community resources.",
    duration: "10 weeks", lessons: 20,
    modules: ["The Opioid Epidemic: Context & Hope", "MAT: Medication-Assisted Treatment Explained", "Managing Chronic Pain Without Opioids", "Naloxone: Saving Lives", "Rebuilding After Opioid Dependence", "Fentanyl Awareness & Harm Reduction"],
    outcomes: ["Understand MAT options and their benefits", "Develop a non-opioid pain management plan", "Use harm reduction strategies", "Access community resources for opioid recovery"],
    audience: "Individuals in opioid recovery, their families, and healthcare professionals"
  },
  {
    id: 5, category: "substance", level: "Intermediate",
    title: "Stimulant Recovery: Reclaiming Your Energy",
    description: "Recovery strategies for cocaine, methamphetamine, and prescription stimulant misuse. Focus on restoring natural energy and motivation.",
    duration: "8 weeks", lessons: 16,
    modules: ["How Stimulants Rewire Your Brain", "The Crash: Managing Post-Acute Withdrawal", "Rebuilding Natural Dopamine", "Sleep Restoration Program", "Exercise as Medicine", "Finding Natural Motivation", "Social Recovery After Stimulant Use", "Long-Term Brain Healing"],
    outcomes: ["Understand stimulant-specific recovery challenges", "Restore natural sleep and energy patterns", "Use exercise to boost natural dopamine", "Rebuild motivation without substances"],
    audience: "People recovering from stimulant use including cocaine, meth, and prescription stimulants"
  },
  {
    id: 6, category: "substance", level: "Beginner",
    title: "Cannabis: When Casual Becomes Compulsive",
    description: "Address the often-dismissed challenge of cannabis dependency. Understand the spectrum from casual use to problematic patterns and find your path forward.",
    duration: "6 weeks", lessons: 12,
    modules: ["Is My Use a Problem? Self-Assessment", "Cannabis and the Developing Brain", "Physical vs Psychological Dependence", "Managing Cannabis Withdrawal", "Motivation & Drive Restoration", "Living in a Legalized World"],
    outcomes: ["Honestly assess your relationship with cannabis", "Understand cannabis withdrawal symptoms", "Restore motivation and clarity", "Navigate legalization without relapse"],
    audience: "Anyone questioning their cannabis use or actively trying to reduce/stop"
  },
  {
    id: 7, category: "substance", level: "Advanced",
    title: "Poly-Substance Recovery: The Complex Path",
    description: "For those recovering from multiple substance dependencies simultaneously. Addresses the unique challenges of poly-substance use and integrated recovery.",
    duration: "12 weeks", lessons: 24,
    modules: ["Untangling Multiple Dependencies", "Prioritizing Recovery Goals", "Cross-Addiction Awareness", "Integrated Treatment Planning", "Managing Multiple Withdrawal Timelines", "Building a Unified Recovery Identity"],
    outcomes: ["Create an integrated recovery plan for multiple substances", "Identify cross-addiction patterns", "Manage complex withdrawal safely", "Build a single unified recovery practice"],
    audience: "Individuals dealing with dependencies on multiple substances"
  },
  {
    id: 8, category: "substance", level: "Advanced",
    title: "Medication Management in Recovery",
    description: "Navigate the complex world of medications in recovery — from MAT to mental health prescriptions. Learn to work effectively with your medical team.",
    duration: "6 weeks", lessons: 12,
    modules: ["Recovery-Safe Medications", "MAT Deep Dive: Suboxone, Methadone, Naltrexone", "Mental Health Meds in Recovery", "Pain Management Protocols", "Working With Your Doctor", "Tapering & Transitions"],
    outcomes: ["Understand medication options in recovery", "Communicate effectively with healthcare providers", "Make informed decisions about MAT", "Manage medications safely alongside recovery"],
    audience: "People in recovery who take or are considering medications"
  },

  // ===== BEHAVIORAL ADDICTIONS (8 courses) =====
  {
    id: 9, category: "behavioral", level: "Beginner",
    title: "Understanding Behavioral Addiction",
    description: "Learn how activities like gambling, shopping, and gaming can become addictive. Understand the brain mechanisms that make behaviors as compelling as substances.",
    duration: "4 weeks", lessons: 8,
    modules: ["What Makes a Behavior Addictive?", "The Dopamine Loop", "Behavioral vs Substance Addiction: Similarities", "Identifying Your Behavioral Patterns", "The Role of Escapism", "Taking the First Steps"],
    outcomes: ["Identify behavioral addiction patterns", "Understand the neuroscience behind behavioral compulsions", "Differentiate between habits and addictions", "Create an initial change plan"],
    audience: "Anyone concerned about compulsive behavioral patterns"
  },
  {
    id: 10, category: "behavioral", level: "Intermediate",
    title: "Gambling Recovery: Beating the Odds",
    description: "Comprehensive recovery program for gambling addiction. Covers the psychology of gambling, financial damage repair, and building a life beyond the bet.",
    duration: "8 weeks", lessons: 16,
    modules: ["The Psychology of Gambling", "Understanding the House Edge", "Financial Damage Assessment", "Self-Exclusion & Barriers", "Cognitive Distortions in Gambling", "Alternative Excitement Sources", "Repairing Financial Damage", "Life After Gambling"],
    outcomes: ["Implement self-exclusion from gambling venues", "Challenge gambling-related cognitive distortions", "Create a financial repair plan", "Find healthy sources of excitement and risk"],
    audience: "Individuals struggling with any form of gambling"
  },
  {
    id: 11, category: "behavioral", level: "Intermediate",
    title: "Shopping & Spending Addiction",
    description: "Break the cycle of compulsive shopping and spending. Understand emotional spending triggers and build a healthy relationship with money.",
    duration: "6 weeks", lessons: 12,
    modules: ["Emotional Spending Triggers", "The Dopamine Hit of 'Add to Cart'", "Decluttering: Facing Your Purchases", "Building Spending Awareness", "Healthy Reward Alternatives", "From Consumer to Creator"],
    outcomes: ["Identify emotional spending triggers", "Implement a 48-hour purchase rule", "Build a mindful spending practice", "Find non-material sources of satisfaction"],
    audience: "Anyone who struggles with compulsive shopping or spending"
  },
  {
    id: 12, category: "behavioral", level: "Intermediate",
    title: "Gaming Addiction: Leveling Up in Real Life",
    description: "For gamers who've lost control. Understand why games are so compelling, find balance, and transfer your gaming skills to real-world achievements.",
    duration: "6 weeks", lessons: 12,
    modules: ["Why Games Hook Us: Psychology of Game Design", "Assessing Your Gaming Habits", "The Social Dimension of Gaming", "Setting Boundaries with Games", "Transferring Skills to Real Life", "Building Offline Adventures"],
    outcomes: ["Understand game design psychology and manipulation", "Set and maintain healthy gaming boundaries", "Transfer problem-solving skills to real challenges", "Build a rich offline social life"],
    audience: "Gamers who feel their gaming has become problematic"
  },
  {
    id: 13, category: "behavioral", level: "Beginner",
    title: "Food & Eating: Finding Balance",
    description: "Address compulsive eating patterns — binge eating, emotional eating, and food obsession. Build a peaceful relationship with food and your body.",
    duration: "8 weeks", lessons: 16,
    modules: ["Emotional Eating Patterns", "The Brain-Gut Connection", "Hunger vs Craving", "Mindful Eating Practices", "Breaking the Restrict-Binge Cycle", "Body Image & Self-Compassion", "Meal Planning for Recovery", "Intuitive Eating Introduction"],
    outcomes: ["Distinguish emotional hunger from physical hunger", "Practice mindful eating techniques", "Break the restrict-binge cycle", "Develop body compassion and acceptance"],
    audience: "Anyone with a troubled relationship with food"
  },
  {
    id: 14, category: "behavioral", level: "Advanced",
    title: "Sex & Pornography Addiction Recovery",
    description: "A sensitive, shame-free approach to recovering from compulsive sexual behavior and pornography addiction. Rebuild healthy intimacy and self-respect.",
    duration: "12 weeks", lessons: 24,
    modules: ["Understanding Compulsive Sexual Behavior", "Porn and the Brain", "Breaking the Shame Cycle", "Digital Boundaries & Blockers", "Rebuilding Healthy Intimacy", "Addressing Underlying Trauma", "Communication with Partners", "Sustained Recovery"],
    outcomes: ["Understand the compulsion cycle without shame", "Implement effective digital boundaries", "Rebuild capacity for healthy intimacy", "Address underlying emotional drivers"],
    audience: "Individuals struggling with compulsive sexual behavior or pornography use"
  },
  {
    id: 15, category: "behavioral", level: "Beginner",
    title: "Work Addiction: The Acceptable Compulsion",
    description: "Workaholism is often praised, but it destroys health and relationships. Learn to find your worth beyond productivity and build a balanced life.",
    duration: "6 weeks", lessons: 12,
    modules: ["When Hard Work Becomes Addiction", "Identity Beyond Productivity", "Setting Work Boundaries", "The Fear Behind the Drive", "Rediscovering Rest & Play", "Sustainable Success"],
    outcomes: ["Recognize workaholic patterns and their costs", "Set firm work-life boundaries", "Find identity and worth beyond work output", "Build sustainable productivity habits"],
    audience: "Professionals who can't stop working even when it hurts them"
  },
  {
    id: 16, category: "behavioral", level: "Intermediate",
    title: "Codependency: Addiction to Fixing Others",
    description: "Break the cycle of codependency. Learn where helping ends and controlling begins, and discover how to love without losing yourself.",
    duration: "8 weeks", lessons: 16,
    modules: ["What Is Codependency?", "The Rescuer Trap", "People-Pleasing as Addiction", "Boundaries: Your New Best Friend", "Self-Worth Without Approval", "Healthy Helping vs Enabling", "Detaching with Love", "Building Interdependence"],
    outcomes: ["Identify codependent patterns in relationships", "Set boundaries without guilt", "Distinguish helping from enabling", "Build healthy interdependent relationships"],
    audience: "People who consistently put others' needs above their own to an unhealthy degree"
  },

  // ===== DIGITAL DETOX (7 courses) =====
  {
    id: 17, category: "digital", level: "Beginner",
    title: "Digital Addiction: Understanding the Hook",
    description: "How tech companies engineer addiction. Understand the psychological tricks that keep you scrolling, clicking, and losing hours of your life.",
    duration: "3 weeks", lessons: 9,
    modules: ["Attention Economy: You Are the Product", "Variable Reward Loops", "Social Validation Feedback Loops", "The Infinite Scroll Trap", "Dark Patterns & Manipulation", "Reclaiming Your Attention"],
    outcomes: ["Identify tech manipulation techniques", "Understand your personal digital triggers", "Recognize variable reward loops in apps", "Begin reclaiming your attention"],
    audience: "Anyone who feels controlled by their devices"
  },
  {
    id: 18, category: "digital", level: "Intermediate",
    title: "Social Media Detox: 30-Day Reset",
    description: "A structured 30-day program to break free from social media addiction. Daily challenges, alternatives, and strategies for a healthier digital life.",
    duration: "4 weeks", lessons: 30,
    modules: ["Audit Your Social Media Use", "The Comparison Trap", "FOMO is Manufactured", "Day-by-Day Detox Calendar", "Analog Alternatives", "Mindful Re-engagement (or Not)"],
    outcomes: ["Complete a 30-day social media reset", "Identify which platforms add vs drain your life", "Build offline connection habits", "Create intentional social media boundaries"],
    audience: "Heavy social media users ready for a reset"
  },
  {
    id: 19, category: "digital", level: "Beginner",
    title: "Phone-Free Mornings & Evenings",
    description: "Transform the bookends of your day. Create powerful morning and evening routines that don't involve screens.",
    duration: "3 weeks", lessons: 9,
    modules: ["Why First & Last Hours Matter", "The Morning Phone Check Habit", "Building a Screen-Free Morning Ritual", "Evening Wind-Down Without Screens", "Analog Alarm Clocks & Sleep Hygiene", "Sustaining the Practice"],
    outcomes: ["Create a phone-free morning routine", "Build a screen-free evening wind-down", "Improve sleep quality through digital boundaries", "Increase morning productivity and calm"],
    audience: "Anyone who reaches for their phone first and last thing every day"
  },
  {
    id: 20, category: "digital", level: "Intermediate",
    title: "Doomscrolling & News Addiction",
    description: "Break the compulsive news and doomscrolling cycle. Stay informed without being consumed by the 24-hour information firehose.",
    duration: "4 weeks", lessons: 8,
    modules: ["Why Bad News Is Addictive", "The Anxiety-Information Loop", "Curating Your Information Diet", "Scheduled News Check-Ins", "From Consumer to Actor", "Healthy Civic Engagement"],
    outcomes: ["Break the doomscrolling habit", "Create a structured information diet", "Reduce news-related anxiety", "Channel concern into meaningful action"],
    audience: "People who compulsively check news and can't stop scrolling"
  },
  {
    id: 21, category: "digital", level: "Intermediate",
    title: "Streaming & Binge-Watching Recovery",
    description: "When 'one more episode' becomes an entire weekend. Reclaim your time from streaming services and build more fulfilling leisure habits.",
    duration: "4 weeks", lessons: 8,
    modules: ["The Auto-Play Trap", "Why We Binge: Escapism & Avoidance", "Setting Viewing Limits That Stick", "Rediscovering Active Leisure", "Social Watching vs Isolated Binging", "A Balanced Entertainment Diet"],
    outcomes: ["Set and maintain streaming boundaries", "Understand the emotional drivers of binge-watching", "Discover fulfilling active leisure alternatives", "Use entertainment intentionally, not compulsively"],
    audience: "People who lose excessive time to streaming services"
  },
  {
    id: 22, category: "digital", level: "Advanced",
    title: "Digital Minimalism: The Complete System",
    description: "Go beyond detox to build an intentional digital life. Implement Cal Newport's digital minimalism philosophy with practical, lasting systems.",
    duration: "8 weeks", lessons: 16,
    modules: ["The Philosophy of Digital Minimalism", "The 30-Day Technology Reset", "Evaluating Each Tool's Value", "Attention Architecture", "High-Quality Leisure", "Analog Alternatives Toolkit", "Social Media Operating Procedures", "Your Digital Life Plan"],
    outcomes: ["Implement a complete digital minimalism system", "Evaluate every digital tool by clear criteria", "Build an attention-friendly environment", "Create a sustainable personal technology philosophy"],
    audience: "People ready for a complete digital life overhaul"
  },
  {
    id: 23, category: "digital", level: "Beginner",
    title: "Kids & Screens: A Parent's Guide",
    description: "Help your children develop a healthy relationship with technology. Age-appropriate guidelines, conversations, and family digital agreements.",
    duration: "4 weeks", lessons: 8,
    modules: ["Screens and Developing Brains", "Age-Appropriate Screen Guidelines", "Having the Tech Talk", "Family Digital Agreements", "Modeling Healthy Tech Use", "Tech-Free Family Activities"],
    outcomes: ["Implement age-appropriate screen guidelines", "Create a family digital agreement", "Model healthy technology use", "Build tech-free family bonding time"],
    audience: "Parents concerned about their children's screen time"
  },

  // ===== MENTAL HEALTH (8 courses) =====
  {
    id: 24, category: "mental", level: "Beginner",
    title: "Anxiety Management for Recovery",
    description: "Anxiety and addiction are deeply intertwined. Learn practical tools to manage anxiety without reaching for substances or compulsive behaviors.",
    duration: "6 weeks", lessons: 12,
    modules: ["Understanding Anxiety in Recovery", "The Fight-or-Flight Hijack", "Breathing Techniques That Actually Work", "Grounding Exercises", "Cognitive Restructuring Basics", "Building Your Anxiety Toolkit"],
    outcomes: ["Use 5 evidence-based anxiety management techniques", "Understand the anxiety-addiction connection", "Create a personalized anxiety management plan", "Reduce anxiety without substances"],
    audience: "People in recovery experiencing anxiety"
  },
  {
    id: 25, category: "mental", level: "Intermediate",
    title: "Depression & Recovery: The Dual Battle",
    description: "Address the heavy overlap between depression and addiction. Evidence-based strategies for managing depression while maintaining recovery.",
    duration: "8 weeks", lessons: 16,
    modules: ["Depression and Addiction: The Cycle", "Post-Acute Withdrawal vs Depression", "Behavioral Activation", "The Exercise Prescription", "Sleep Optimization", "When to Seek Professional Help", "Medication Considerations", "Building a Life Worth Living"],
    outcomes: ["Distinguish withdrawal symptoms from clinical depression", "Implement behavioral activation strategies", "Use lifestyle interventions for mood improvement", "Know when and how to seek professional help"],
    audience: "People managing both depression and addiction recovery"
  },
  {
    id: 26, category: "mental", level: "Intermediate",
    title: "Trauma-Informed Recovery",
    description: "Understand how trauma fuels addiction and learn safe approaches to healing. Not a replacement for therapy, but a vital companion to professional support.",
    duration: "10 weeks", lessons: 20,
    modules: ["What Is Trauma?", "Trauma and the Addicted Brain", "Your Window of Tolerance", "Somatic Experiencing Basics", "EMDR: What to Expect", "Safety Planning", "Self-Compassion Practices", "Post-Traumatic Growth"],
    outcomes: ["Understand the trauma-addiction connection", "Expand your window of tolerance", "Practice grounding and safety techniques", "Know what to expect from trauma therapy"],
    audience: "People whose addiction has roots in traumatic experiences"
  },
  {
    id: 27, category: "mental", level: "Beginner",
    title: "Emotional Intelligence in Recovery",
    description: "Many people in addiction never learned to process emotions healthily. Build your emotional vocabulary and learn to feel without being overwhelmed.",
    duration: "6 weeks", lessons: 12,
    modules: ["The Emotional Vocabulary Expansion", "Feelings Aren't Facts (But They Matter)", "Sitting with Discomfort", "Emotional Regulation Toolkit", "From Reacting to Responding", "Emotional Honesty"],
    outcomes: ["Expand your emotional vocabulary", "Practice sitting with uncomfortable emotions", "Use emotional regulation techniques", "Respond to emotions rather than react"],
    audience: "Anyone who struggles to identify or manage their emotions"
  },
  {
    id: 28, category: "mental", level: "Advanced",
    title: "CBT Skills for Addiction Recovery",
    description: "Master Cognitive Behavioral Therapy techniques adapted specifically for addiction recovery. Identify and restructure the thought patterns that drive addictive behavior.",
    duration: "8 weeks", lessons: 16,
    modules: ["The CBT Model for Addiction", "Automatic Thoughts & Beliefs", "Thought Records & Challenging", "Core Beliefs in Addiction", "Behavioral Experiments", "Relapse-Related Thinking Traps", "Building Alternative Beliefs", "Maintenance & Self-Therapy"],
    outcomes: ["Identify addiction-related cognitive distortions", "Use thought records effectively", "Challenge and restructure core beliefs", "Apply CBT techniques independently"],
    audience: "People in recovery who want structured cognitive skill-building"
  },
  {
    id: 29, category: "mental", level: "Intermediate",
    title: "DBT Skills for Emotional Storms",
    description: "Dialectical Behavior Therapy skills adapted for recovery. Master distress tolerance, emotion regulation, mindfulness, and interpersonal effectiveness.",
    duration: "10 weeks", lessons: 20,
    modules: ["What Is DBT?", "Mindfulness: Wise Mind", "Distress Tolerance: TIPP", "Distress Tolerance: Radical Acceptance", "Emotion Regulation: Opposite Action", "Interpersonal Effectiveness: DEAR MAN", "Walking the Middle Path", "Building a Life Worth Living"],
    outcomes: ["Use TIPP skills for crisis moments", "Practice radical acceptance", "Implement opposite action for difficult emotions", "Use DEAR MAN for assertive communication"],
    audience: "People who experience intense emotions in recovery"
  },
  {
    id: 30, category: "mental", level: "Beginner",
    title: "Self-Esteem Reconstruction",
    description: "Addiction destroys self-worth. This course helps you rebuild a positive identity, separate your worth from your past, and develop genuine self-respect.",
    duration: "6 weeks", lessons: 12,
    modules: ["The Shame-Addiction Cycle", "You Are Not Your Addiction", "Identifying Strengths & Values", "Self-Compassion Practice", "Challenging the Inner Critic", "Building a New Identity"],
    outcomes: ["Break the shame-addiction cycle", "Identify personal strengths and values", "Practice self-compassion daily", "Build a positive recovery identity"],
    audience: "Anyone whose self-esteem has been damaged by addiction"
  },
  {
    id: 31, category: "mental", level: "Advanced",
    title: "Dual Diagnosis: Managing Co-Occurring Disorders",
    description: "Deep dive into managing addiction alongside mental health conditions — bipolar disorder, ADHD, PTSD, BPD, and more. Integrated treatment approaches.",
    duration: "10 weeks", lessons: 20,
    modules: ["What Is Dual Diagnosis?", "Addiction & Bipolar Disorder", "Addiction & ADHD", "Addiction & PTSD", "Addiction & Personality Disorders", "Integrated Treatment Models", "Medication Considerations", "Building Your Treatment Team", "Self-Advocacy in Healthcare", "Long-Term Management"],
    outcomes: ["Understand how co-occurring disorders interact", "Navigate integrated treatment approaches", "Advocate for yourself in healthcare settings", "Build a comprehensive treatment plan"],
    audience: "People managing addiction alongside other mental health conditions"
  },

  // ===== MINDFULNESS & MEDITATION (7 courses) =====
  {
    id: 32, category: "mindfulness", level: "Beginner",
    title: "Meditation for Absolute Beginners",
    description: "Never meditated before? Perfect. Start here with 2-minute practices and build up to a sustainable daily meditation habit.",
    duration: "4 weeks", lessons: 28,
    modules: ["What Meditation Actually Is (and Isn't)", "Your First 2-Minute Sit", "Breath Awareness Basics", "Dealing with a Busy Mind", "Building to 5 Minutes", "Making It a Daily Habit", "10-Minute Practice"],
    outcomes: ["Establish a daily meditation practice", "Use breath awareness for calm", "Sit with a busy mind without frustration", "Build from 2 to 10 minutes of practice"],
    audience: "Complete meditation beginners"
  },
  {
    id: 33, category: "mindfulness", level: "Intermediate",
    title: "Mindfulness-Based Relapse Prevention (MBRP)",
    description: "The evidence-based MBRP program adapted for self-study. Use mindfulness to recognize triggers, tolerate cravings, and prevent relapse.",
    duration: "8 weeks", lessons: 16,
    modules: ["Autopilot & Relapse", "Awareness of Triggers", "Mindfulness in Daily Life", "Mindfulness in High-Risk Situations", "Acceptance & Skillful Action", "Seeing Thoughts as Thoughts", "Self-Care & Balance", "Social Support & Continuing Practice"],
    outcomes: ["Recognize triggers before they escalate", "Use mindfulness to ride out cravings", "Break autopilot behavioral patterns", "Maintain a formal mindfulness practice"],
    audience: "People in recovery who want evidence-based mindfulness tools"
  },
  {
    id: 34, category: "mindfulness", level: "Beginner",
    title: "Breathwork for Recovery",
    description: "Your breath is the most powerful tool you carry. Master breathing techniques that calm anxiety, manage cravings, improve sleep, and boost energy.",
    duration: "4 weeks", lessons: 12,
    modules: ["The Science of Breathing", "Box Breathing for Calm", "4-7-8 Sleep Breathing", "Wim Hof Method Introduction", "Breath of Fire for Energy", "Creating Your Breathwork Practice"],
    outcomes: ["Use 5+ breathing techniques for different situations", "Calm anxiety in under 60 seconds", "Improve sleep with bedtime breathwork", "Build a daily breathwork practice"],
    audience: "Anyone looking for practical, body-based recovery tools"
  },
  {
    id: 35, category: "mindfulness", level: "Intermediate",
    title: "Body Scan & Somatic Awareness",
    description: "Reconnect with your body after addiction. Learn to listen to physical sensations, release stored tension, and use body awareness as an early warning system.",
    duration: "6 weeks", lessons: 12,
    modules: ["Why We Disconnect from Our Bodies", "Progressive Body Scan Technique", "Identifying Stored Tension", "Somatic Experiencing Basics", "Body-Based Trigger Awareness", "Integration: Body & Recovery"],
    outcomes: ["Perform a full body scan meditation", "Identify where you hold stress and emotion", "Use body awareness as an early warning system", "Release chronic tension through awareness"],
    audience: "People who feel disconnected from their physical sensations"
  },
  {
    id: 36, category: "mindfulness", level: "Advanced",
    title: "Loving-Kindness & Compassion Practice",
    description: "Develop deep compassion for yourself and others. Essential for those carrying shame, resentment, or self-hatred from their addiction journey.",
    duration: "6 weeks", lessons: 12,
    modules: ["The Science of Compassion", "Metta (Loving-Kindness) Meditation", "Self-Compassion: The Hardest Practice", "Forgiving Yourself", "Extending Compassion to Difficult People", "Compassion in Daily Life"],
    outcomes: ["Practice loving-kindness meditation daily", "Develop genuine self-compassion", "Begin the process of self-forgiveness", "Extend compassion even to those who hurt you"],
    audience: "Anyone struggling with self-hatred, shame, or resentment"
  },
  {
    id: 37, category: "mindfulness", level: "Intermediate",
    title: "Mindful Movement: Yoga for Recovery",
    description: "Gentle, trauma-informed yoga practice designed specifically for recovery. No flexibility required — just willingness to reconnect with your body.",
    duration: "8 weeks", lessons: 24,
    modules: ["Yoga & the Recovering Brain", "Trauma-Informed Principles", "Breath-Linked Movement", "Gentle Floor Sequences", "Standing Strength & Balance", "Restorative Yoga for Healing", "Chair Yoga Accessibility", "Building a Home Practice"],
    outcomes: ["Practice trauma-informed yoga safely", "Use yoga for anxiety and craving management", "Build strength and flexibility gradually", "Establish a sustainable home practice"],
    audience: "People in recovery interested in gentle, body-based healing"
  },
  {
    id: 38, category: "mindfulness", level: "Advanced",
    title: "Mindfulness Teacher Training for Recovery",
    description: "For those who want to share mindfulness with others in recovery. Learn to teach basic meditation and facilitate mindfulness groups.",
    duration: "12 weeks", lessons: 24,
    modules: ["Foundations of Teaching Mindfulness", "Holding Space for Others", "Guiding Meditation Sessions", "Working with Resistance", "Adapting for Trauma", "Group Facilitation Skills", "Ethics in Teaching", "Building Your Teaching Practice"],
    outcomes: ["Guide basic meditation sessions", "Facilitate mindfulness groups for recovery", "Adapt practices for trauma-sensitive populations", "Develop an ethical teaching practice"],
    audience: "Experienced practitioners who want to teach mindfulness in recovery settings"
  },

  // ===== PHYSICAL WELLNESS (7 courses) =====
  {
    id: 39, category: "physical", level: "Beginner",
    title: "Movement in Early Recovery",
    description: "Start moving safely when your body is still healing. Gentle exercises designed for people in early recovery, regardless of current fitness level.",
    duration: "4 weeks", lessons: 12,
    modules: ["Exercise and the Recovering Brain", "Starting Where You Are", "Walking: The Most Underrated Exercise", "Gentle Stretching Routine", "Building Consistency Over Intensity", "When to Push and When to Rest"],
    outcomes: ["Begin a safe exercise routine", "Understand how exercise aids recovery", "Build a walking habit", "Know when to push and when to rest"],
    audience: "People in early recovery who want to start exercising"
  },
  {
    id: 40, category: "physical", level: "Intermediate",
    title: "Strength Training for Recovery",
    description: "Build physical and mental strength through resistance training. No gym required — bodyweight and minimal equipment programs included.",
    duration: "8 weeks", lessons: 24,
    modules: ["Why Strength Training Transforms Recovery", "Bodyweight Fundamentals", "Progressive Overload Principles", "Upper Body Program", "Lower Body Program", "Core Strength & Stability", "Recovery & Rest Days", "Building Long-Term Habits"],
    outcomes: ["Follow a structured strength training program", "Perform exercises with proper form", "Progressively increase difficulty safely", "Use strength training as a recovery tool"],
    audience: "People in recovery ready for structured physical training"
  },
  {
    id: 41, category: "physical", level: "Intermediate",
    title: "Running & Cardio for Mental Health",
    description: "Discover the runner's high — nature's own reward system. Build a cardio practice that boosts mood, reduces cravings, and rebuilds your cardiovascular system.",
    duration: "8 weeks", lessons: 16,
    modules: ["The Runner's High: Natural Endorphins", "Couch to 5K Recovery Edition", "Heart Rate Training Zones", "Running as Moving Meditation", "Cycling & Swimming Alternatives", "Training for Your First Event", "Injury Prevention", "Making Cardio a Lifestyle"],
    outcomes: ["Build a sustainable cardio routine", "Use cardiovascular exercise for mood management", "Train safely and prevent injury", "Experience natural endorphin boosts"],
    audience: "People looking to use cardiovascular exercise as a recovery tool"
  },
  {
    id: 42, category: "physical", level: "Beginner",
    title: "Sleep Recovery Program",
    description: "Addiction destroys sleep. This program rebuilds your sleep architecture from the ground up with sleep hygiene, routines, and natural sleep aids.",
    duration: "4 weeks", lessons: 12,
    modules: ["How Addiction Wrecks Sleep", "Sleep Hygiene Fundamentals", "Your Optimal Sleep Environment", "The Perfect Wind-Down Routine", "Natural Sleep Supplements", "Managing Insomnia Without Pills", "Napping Strategy", "Advanced Sleep Optimization"],
    outcomes: ["Implement comprehensive sleep hygiene", "Create an optimal sleep environment", "Build a consistent sleep-wake schedule", "Manage insomnia without substances"],
    audience: "Anyone in recovery struggling with sleep"
  },
  {
    id: 43, category: "physical", level: "Intermediate",
    title: "Martial Arts & Recovery",
    description: "Channel energy, build discipline, and process aggression through martial arts. Covers boxing, BJJ, and other martial arts as recovery tools.",
    duration: "8 weeks", lessons: 16,
    modules: ["Martial Arts as Therapy", "Boxing Basics for Stress Relief", "BJJ: The Gentle Art", "Discipline & Recovery", "Channeling Anger Productively", "The Martial Arts Community", "Competition & Goals", "Lifelong Practice"],
    outcomes: ["Understand how martial arts support recovery", "Learn basic boxing and grappling fundamentals", "Channel difficult emotions through physical practice", "Join a supportive martial arts community"],
    audience: "People interested in martial arts as a recovery tool"
  },
  {
    id: 44, category: "physical", level: "Beginner",
    title: "Nature Therapy: Outdoor Recovery",
    description: "Harness the healing power of nature. Forest bathing, hiking, gardening, and outdoor activities that restore body and mind.",
    duration: "6 weeks", lessons: 12,
    modules: ["The Science of Nature Therapy", "Forest Bathing (Shinrin-Yoku)", "Hiking as Moving Meditation", "Gardening for Recovery", "Water Therapy", "Building Outdoor Habits"],
    outcomes: ["Understand the science behind nature therapy", "Practice forest bathing techniques", "Build regular outdoor habits", "Use nature as a daily recovery tool"],
    audience: "Anyone looking to incorporate nature into their recovery"
  },
  {
    id: 45, category: "physical", level: "Advanced",
    title: "Athletic Training in Long-Term Recovery",
    description: "For those further in recovery ready to pursue athletic goals. Training plans for races, competitions, and peak physical performance.",
    duration: "12 weeks", lessons: 24,
    modules: ["Setting Athletic Goals in Recovery", "Periodized Training Plans", "Nutrition for Performance", "Mental Toughness Training", "Community & Team Sports", "From Recovery to Athlete Identity", "Competition Preparation", "Sustainable Athletic Lifestyle"],
    outcomes: ["Set and train for athletic goals", "Follow periodized training plans", "Fuel athletic performance with proper nutrition", "Build identity as a person in recovery AND an athlete"],
    audience: "People in established recovery pursuing athletic goals"
  },

  // ===== NUTRITION & HEALING (7 courses) =====
  {
    id: 46, category: "nutrition", level: "Beginner",
    title: "Nutrition Basics for Recovery",
    description: "Addiction depletes your body. Learn the nutritional foundations for healing — what to eat, when to eat, and how nutrition supports brain recovery.",
    duration: "4 weeks", lessons: 12,
    modules: ["How Addiction Depletes Your Body", "Macronutrients 101", "Micronutrients for Brain Healing", "Hydration & Recovery", "Meal Planning Basics", "Supplements for Recovery"],
    outcomes: ["Understand nutritional deficiencies common in recovery", "Plan balanced meals", "Support brain healing through nutrition", "Make informed supplement choices"],
    audience: "Anyone in early recovery wanting to improve their nutrition"
  },
  {
    id: 47, category: "nutrition", level: "Intermediate",
    title: "Gut Health & the Recovery Brain",
    description: "The gut-brain axis plays a crucial role in mood, cravings, and recovery. Heal your gut to heal your mind.",
    duration: "6 weeks", lessons: 12,
    modules: ["The Gut-Brain Connection", "Probiotics & Prebiotics", "Healing Leaky Gut", "Fermented Foods Workshop", "Anti-Inflammatory Eating", "Your Gut Health Protocol"],
    outcomes: ["Understand the gut-brain axis", "Incorporate probiotics and prebiotics", "Follow an anti-inflammatory eating pattern", "Support mental health through gut health"],
    audience: "People interested in the gut-brain connection for recovery"
  },
  {
    id: 48, category: "nutrition", level: "Beginner",
    title: "Sugar & Recovery: The Hidden Trap",
    description: "Many people in recovery develop sugar cravings. Understand why, and learn to manage sugar intake without triggering addictive patterns.",
    duration: "4 weeks", lessons: 8,
    modules: ["Why Recovery Craves Sugar", "Sugar and the Dopamine System", "Reading Labels: Hidden Sugars", "Healthy Sweet Alternatives", "Managing Sugar Cravings", "Balanced Blood Sugar for Stable Mood"],
    outcomes: ["Understand the sugar-dopamine connection", "Identify hidden sugars in foods", "Manage sugar cravings effectively", "Stabilize mood through blood sugar balance"],
    audience: "People in recovery who notice increased sugar cravings"
  },
  {
    id: 49, category: "nutrition", level: "Intermediate",
    title: "Cooking for Recovery: Hands-On Meal Prep",
    description: "Learn to cook simple, nutritious meals. Cooking is therapy — it's creative, meditative, and produces something nourishing.",
    duration: "8 weeks", lessons: 16,
    modules: ["Kitchen Setup & Essentials", "10 Recovery-Boosting Recipes", "Batch Cooking Sunday Prep", "Budget-Friendly Nutrition", "Cooking as Meditation", "Hosting Sober Dinners", "International Healing Cuisines", "Your Recipe Collection"],
    outcomes: ["Cook 10+ nutritious meals confidently", "Batch prep meals for the week", "Eat well on a budget", "Use cooking as a therapeutic practice"],
    audience: "People who want to build cooking skills for their recovery"
  },
  {
    id: 50, category: "nutrition", level: "Beginner",
    title: "Hydration & Detox: Water as Medicine",
    description: "Most people in recovery are chronically dehydrated. Learn why hydration is critical for healing and how to build proper hydration habits.",
    duration: "2 weeks", lessons: 6,
    modules: ["Dehydration & Recovery", "How Much Water You Actually Need", "Electrolytes & Minerals", "Herbal Teas for Recovery", "Building Hydration Habits", "Water Quality & Filtering"],
    outcomes: ["Understand your hydration needs", "Build consistent hydration habits", "Use herbal teas therapeutically", "Support detox through proper hydration"],
    audience: "Anyone wanting to improve their hydration in recovery"
  },
  {
    id: 51, category: "nutrition", level: "Intermediate",
    title: "Caffeine & Nicotine: Recovery's Gray Areas",
    description: "Honest exploration of caffeine and nicotine use in recovery. Understand the impacts and make informed decisions about these legal substances.",
    duration: "4 weeks", lessons: 8,
    modules: ["Caffeine: Helper or Hindrance?", "Nicotine Addiction in Recovery", "Cross-Addiction Considerations", "Reducing Caffeine Mindfully", "Quitting Smoking in Recovery", "Replacement Rituals"],
    outcomes: ["Make informed decisions about caffeine use", "Understand nicotine's impact on recovery", "Reduce or quit caffeine/nicotine safely", "Create healthy replacement rituals"],
    audience: "People in recovery evaluating their caffeine and nicotine use"
  },
  {
    id: 52, category: "nutrition", level: "Advanced",
    title: "Functional Medicine Approach to Recovery",
    description: "Advanced nutritional and functional medicine strategies for recovery. Amino acid therapy, nutrient IVs, and targeted supplementation protocols.",
    duration: "8 weeks", lessons: 16,
    modules: ["Functional Medicine Principles", "Amino Acid Therapy", "Neurotransmitter Support", "Advanced Supplementation", "Elimination Diets", "Working with Functional Practitioners", "Lab Testing Guide", "Your Personalized Protocol"],
    outcomes: ["Understand functional medicine approaches to recovery", "Know which lab tests to request", "Work effectively with functional practitioners", "Create a personalized nutritional protocol"],
    audience: "People seeking advanced nutritional recovery strategies"
  },

  // ===== RELATIONSHIPS & COMMUNICATION (7 courses) =====
  {
    id: 53, category: "relationships", level: "Beginner",
    title: "Rebuilding Trust After Addiction",
    description: "Trust is often the biggest casualty of addiction. Learn the patient, consistent work of rebuilding trust with those you've hurt.",
    duration: "8 weeks", lessons: 16,
    modules: ["Understanding the Damage", "Why 'Sorry' Isn't Enough", "Consistent Actions Over Time", "Accountability Without Excuses", "When Trust Can't Be Rebuilt", "Being Trustworthy to Yourself", "Patience with the Process", "New Foundations"],
    outcomes: ["Understand trust-building as a process, not an event", "Take accountability without making excuses", "Demonstrate trustworthiness through consistent action", "Accept when relationships can't be repaired"],
    audience: "Anyone working to rebuild damaged relationships"
  },
  {
    id: 54, category: "relationships", level: "Intermediate",
    title: "Healthy Boundaries: The Complete Guide",
    description: "Boundaries aren't walls — they're bridges built to last. Learn to set, communicate, and maintain healthy boundaries in every relationship.",
    duration: "6 weeks", lessons: 12,
    modules: ["What Are Healthy Boundaries?", "Identifying Your Boundaries", "Communicating Boundaries Clearly", "Maintaining Boundaries Under Pressure", "Boundaries with Family", "Boundaries in Recovery Relationships", "Digital Boundaries", "Boundaries as Self-Love"],
    outcomes: ["Identify where you need boundaries", "Communicate boundaries without aggression", "Maintain boundaries under pressure", "Understand boundaries as an act of love, not rejection"],
    audience: "Anyone who struggles with setting or maintaining boundaries"
  },
  {
    id: 55, category: "relationships", level: "Intermediate",
    title: "Dating & Romance in Recovery",
    description: "Navigate the complex world of dating while in recovery. When to start dating, disclosure decisions, and building healthy romantic relationships.",
    duration: "6 weeks", lessons: 12,
    modules: ["The One-Year Rule: Myth or Wisdom?", "Are You Ready? Self-Assessment", "Where to Meet People", "The Disclosure Conversation", "Red Flags & Green Flags", "Sober Dating Ideas", "Intimacy & Vulnerability", "Building a Healthy Partnership"],
    outcomes: ["Assess your readiness for dating", "Navigate disclosure conversations", "Identify red and green flags in partners", "Build a relationship that supports recovery"],
    audience: "Single people in recovery considering dating"
  },
  {
    id: 56, category: "relationships", level: "Intermediate",
    title: "Couples Recovery: Healing Together",
    description: "For couples where one or both partners are in recovery. Rebuild your relationship with honesty, understanding, and shared growth.",
    duration: "10 weeks", lessons: 20,
    modules: ["Addiction's Impact on Your Relationship", "Both Partners' Recovery", "Communication Repair", "Rebuilding Intimacy", "Managing Triggers as a Couple", "Shared Recovery Goals", "When to Seek Couples Therapy", "Growing Together"],
    outcomes: ["Improve communication with your partner", "Rebuild emotional and physical intimacy", "Create shared recovery goals", "Know when to seek professional couples therapy"],
    audience: "Couples navigating recovery together"
  },
  {
    id: 57, category: "relationships", level: "Beginner",
    title: "Assertive Communication Skills",
    description: "Move from passive, aggressive, or passive-aggressive patterns to clear, assertive communication that gets your needs met without damaging relationships.",
    duration: "4 weeks", lessons: 8,
    modules: ["The 4 Communication Styles", "Why Assertiveness Feels Hard", "'I' Statements That Work", "Making Requests, Not Demands", "Saying No Without Guilt", "Conflict Resolution Basics", "Active Listening", "Practice Scenarios"],
    outcomes: ["Identify your dominant communication style", "Use 'I' statements effectively", "Say no without guilt", "Resolve conflicts constructively"],
    audience: "Anyone who struggles with communication in relationships"
  },
  {
    id: 58, category: "relationships", level: "Advanced",
    title: "Forgiveness: Giving & Receiving",
    description: "The deep work of forgiveness — forgiving those who hurt you, seeking forgiveness from those you've harmed, and the hardest part: forgiving yourself.",
    duration: "8 weeks", lessons: 16,
    modules: ["What Forgiveness Is (and Isn't)", "The Cost of Unforgiveness", "Forgiving Those Who Hurt You", "Making Amends: The 9th Step Deep Dive", "When Amends Aren't Possible", "Forgiving Yourself", "Radical Acceptance", "Freedom Through Forgiveness"],
    outcomes: ["Understand forgiveness as a process for your own freedom", "Make meaningful amends where appropriate", "Begin the process of self-forgiveness", "Release resentment through structured practice"],
    audience: "People carrying resentment, guilt, or unforgiveness"
  },
  {
    id: 59, category: "relationships", level: "Beginner",
    title: "Loneliness & Connection in Recovery",
    description: "Addiction isolates. Recovery reconnects. Learn to combat loneliness, build genuine connections, and create community in your new life.",
    duration: "6 weeks", lessons: 12,
    modules: ["The Loneliness Epidemic in Recovery", "Quality vs Quantity of Connections", "Vulnerability: The Bridge to Connection", "Building Sober Friendships", "Community Involvement", "Being Alone Without Being Lonely"],
    outcomes: ["Distinguish loneliness from solitude", "Build genuine connections in recovery", "Practice vulnerability in safe contexts", "Create a sense of belonging and community"],
    audience: "People feeling isolated in recovery"
  },

  // ===== FINANCIAL RECOVERY (7 courses) =====
  {
    id: 60, category: "financial", level: "Beginner",
    title: "Financial Fresh Start: Recovery Edition",
    description: "Addiction often leaves financial devastation. This course provides a compassionate, step-by-step guide to assessing and beginning to repair the damage.",
    duration: "4 weeks", lessons: 8,
    modules: ["Facing the Numbers", "Debt Assessment & Prioritization", "Creating Your First Recovery Budget", "Building an Emergency Fund", "Dealing with Creditors", "Financial Self-Forgiveness"],
    outcomes: ["Complete a full financial assessment", "Create a realistic recovery budget", "Prioritize debt repayment", "Begin building an emergency fund"],
    audience: "Anyone whose finances were damaged by addiction"
  },
  {
    id: 61, category: "financial", level: "Intermediate",
    title: "Budgeting & Money Management",
    description: "Master practical budgeting skills. Track spending, reduce expenses, and build the financial habits that support long-term recovery.",
    duration: "6 weeks", lessons: 12,
    modules: ["Budgeting Methods That Actually Work", "Tracking Every Dollar", "Reducing Expenses Painlessly", "The Envelope System", "Digital Budgeting Tools", "Monthly Financial Review Habit"],
    outcomes: ["Choose and implement a budgeting method", "Track spending consistently", "Reduce unnecessary expenses", "Build a monthly financial review habit"],
    audience: "People ready to build strong financial habits"
  },
  {
    id: 62, category: "financial", level: "Intermediate",
    title: "Debt Recovery: Getting Out from Under",
    description: "Structured debt elimination strategies — avalanche, snowball, consolidation, and when to consider bankruptcy. No judgment, just solutions.",
    duration: "6 weeks", lessons: 12,
    modules: ["Understanding Your Debt", "Snowball vs Avalanche Methods", "Debt Consolidation Options", "Negotiating with Creditors", "When Bankruptcy Is the Right Choice", "Staying Debt-Free"],
    outcomes: ["Choose the right debt elimination strategy", "Negotiate with creditors effectively", "Understand bankruptcy as a tool, not a failure", "Build habits to stay debt-free"],
    audience: "People dealing with significant debt from addiction"
  },
  {
    id: 63, category: "financial", level: "Beginner",
    title: "Credit Score Repair",
    description: "Your credit score isn't permanent. Learn how credit works, dispute errors, and strategically rebuild your credit for a fresh financial future.",
    duration: "4 weeks", lessons: 8,
    modules: ["How Credit Scores Work", "Getting Your Credit Reports", "Disputing Errors", "Rebuilding Strategies", "Secured Credit Cards", "Monitoring Your Progress"],
    outcomes: ["Understand how credit scores are calculated", "Dispute errors on credit reports", "Implement credit rebuilding strategies", "Monitor and protect your credit"],
    audience: "Anyone with damaged credit seeking to rebuild"
  },
  {
    id: 64, category: "financial", level: "Advanced",
    title: "Investing Basics for Recovery",
    description: "Once your foundation is solid, start building wealth. Introduction to investing, retirement accounts, and building long-term financial security.",
    duration: "8 weeks", lessons: 16,
    modules: ["Investing vs Speculating", "Index Funds: The Simple Path", "Retirement Accounts (401k, IRA)", "Risk Tolerance Assessment", "Avoiding Get-Rich-Quick Traps", "Compound Interest: Time Is Your Friend", "Real Estate Basics", "Your Investment Plan"],
    outcomes: ["Understand basic investment principles", "Open and fund a retirement account", "Avoid investment scams and gambling-like trading", "Create a long-term wealth-building plan"],
    audience: "People in stable recovery ready to build wealth"
  },
  {
    id: 65, category: "financial", level: "Beginner",
    title: "Navigating Benefits & Assistance Programs",
    description: "Know what help is available. Navigate disability, unemployment, healthcare, housing assistance, and other programs that support recovery.",
    duration: "3 weeks", lessons: 6,
    modules: ["Healthcare Coverage Options", "Disability Benefits", "Housing Assistance Programs", "Food Assistance", "Employment Support", "Application Tips & Advocacy"],
    outcomes: ["Identify available assistance programs", "Navigate application processes", "Advocate for yourself in bureaucratic systems", "Access healthcare coverage for treatment"],
    audience: "People needing financial assistance during recovery"
  },
  {
    id: 66, category: "financial", level: "Intermediate",
    title: "Entrepreneurship in Recovery",
    description: "Channel your recovery energy into building a business. From side hustles to full ventures — entrepreneurship as a path to purpose and financial freedom.",
    duration: "8 weeks", lessons: 16,
    modules: ["Entrepreneurial Mindset in Recovery", "Finding Your Business Idea", "Lean Startup Principles", "Building a Business Plan", "Funding Options", "Marketing Basics", "Managing Money & Addiction Triggers", "Growth & Sustainability"],
    outcomes: ["Identify viable business ideas", "Create a lean business plan", "Understand startup funding options", "Manage entrepreneurial stress without relapse"],
    audience: "People in recovery interested in starting a business"
  },

  // ===== CAREER & PURPOSE (7 courses) =====
  {
    id: 67, category: "career", level: "Beginner",
    title: "Career Rebuilding After Addiction",
    description: "Address employment gaps, criminal records, and lost confidence. Practical strategies for re-entering the workforce with honesty and strength.",
    duration: "6 weeks", lessons: 12,
    modules: ["Assessing Your Skills & Strengths", "Addressing Employment Gaps", "Criminal Record Considerations", "Resume Writing for Recovery", "Interview Preparation", "Disclosure Decisions at Work"],
    outcomes: ["Create a recovery-friendly resume", "Address employment gaps confidently", "Navigate background check situations", "Prepare for common interview challenges"],
    audience: "People re-entering the workforce after addiction"
  },
  {
    id: 68, category: "career", level: "Intermediate",
    title: "Finding Your Purpose in Recovery",
    description: "Move beyond just 'not using' to actively building a purposeful life. Explore values, passions, and how your recovery story can become your superpower.",
    duration: "8 weeks", lessons: 16,
    modules: ["Beyond Sobriety: What Do You Want?", "Values Exploration Deep Dive", "Passion Discovery Exercises", "Your Recovery as an Asset", "Purpose vs Productivity", "Setting Meaningful Goals", "Taking Aligned Action", "Living on Purpose"],
    outcomes: ["Clarify your core values", "Discover what excites and motivates you", "Frame your recovery experience as a strength", "Set and pursue purpose-driven goals"],
    audience: "Anyone seeking deeper meaning in their recovery"
  },
  {
    id: 69, category: "career", level: "Intermediate",
    title: "Becoming a Recovery Professional",
    description: "Turn your experience into a career helping others. Pathways to becoming a counselor, peer specialist, recovery coach, or social worker.",
    duration: "6 weeks", lessons: 12,
    modules: ["Recovery Careers Overview", "Peer Support Specialist Certification", "CASAC & Addiction Counseling", "Social Work Pathways", "Recovery Coaching", "Education & Training Requirements"],
    outcomes: ["Understand recovery career pathways", "Know certification requirements", "Begin pursuing a recovery career", "Use lived experience as a professional asset"],
    audience: "People who want to make a career in the recovery field"
  },
  {
    id: 70, category: "career", level: "Beginner",
    title: "Digital Skills for Career Reinvention",
    description: "Build in-demand digital skills for career reinvention. Covers basic computer literacy through to marketable tech skills.",
    duration: "8 weeks", lessons: 16,
    modules: ["Computer Basics Refresher", "Email & Professional Communication", "Microsoft Office / Google Workspace", "Social Media for Professional Use", "Introduction to Coding", "Freelancing Platforms", "Building an Online Presence", "Continuous Learning Resources"],
    outcomes: ["Navigate essential digital tools confidently", "Use professional communication platforms", "Build a professional online presence", "Identify digital skills worth developing further"],
    audience: "People who need to update their technology skills"
  },
  {
    id: 71, category: "career", level: "Intermediate",
    title: "Recovery-Friendly Workplaces",
    description: "How to identify and advocate for recovery-friendly workplace policies. For both employees navigating work in recovery and employers wanting to be supportive.",
    duration: "4 weeks", lessons: 8,
    modules: ["What Makes a Workplace Recovery-Friendly", "Your Rights Under ADA", "Employee Assistance Programs", "Advocating for Yourself at Work", "For Employers: Building Recovery Culture", "Maintaining Recovery at Work"],
    outcomes: ["Know your legal rights in the workplace", "Identify recovery-friendly employers", "Use EAP resources effectively", "Maintain recovery while managing work stress"],
    audience: "Employees and employers navigating recovery in the workplace"
  },
  {
    id: 72, category: "career", level: "Advanced",
    title: "Leadership in Recovery",
    description: "Recovery builds extraordinary leaders. Develop leadership skills rooted in vulnerability, resilience, and authentic connection.",
    duration: "8 weeks", lessons: 16,
    modules: ["Recovery as Leadership Training", "Vulnerable Leadership", "Emotional Intelligence for Leaders", "Building & Leading Teams", "Public Speaking & Your Story", "Servant Leadership", "Managing Stress in Leadership", "Your Leadership Legacy"],
    outcomes: ["Leverage recovery experience for leadership", "Lead with vulnerability and authenticity", "Build and inspire teams", "Manage leadership stress without relapse"],
    audience: "People in recovery moving into leadership roles"
  },
  {
    id: 73, category: "career", level: "Beginner",
    title: "Volunteering: Purpose Before Paycheck",
    description: "Build skills, confidence, and connections through volunteering. A powerful stepping stone back into professional life and community.",
    duration: "3 weeks", lessons: 6,
    modules: ["Why Volunteering Matters in Recovery", "Finding the Right Opportunity", "Building Skills Through Service", "Networking Through Volunteering", "From Volunteer to Employee", "Making Service a Lifestyle"],
    outcomes: ["Find meaningful volunteer opportunities", "Build professional skills through service", "Expand your network through volunteering", "Use volunteering as a career stepping stone"],
    audience: "People looking to rebuild confidence and skills through service"
  },

  // ===== FAMILY & PARENTING (7 courses) =====
  {
    id: 74, category: "family", level: "Beginner",
    title: "Family Recovery: Healing Together",
    description: "Addiction is a family disease. This course helps the entire family understand addiction, heal wounds, and build a healthier dynamic together.",
    duration: "8 weeks", lessons: 16,
    modules: ["Addiction as a Family System Disease", "Family Roles in Addiction", "Breaking Dysfunctional Patterns", "Family Communication Skills", "Setting Boundaries with Love", "Supporting Without Enabling", "Family Therapy: What to Expect", "Building a Healthy Family Culture"],
    outcomes: ["Understand family dynamics in addiction", "Identify and break dysfunctional roles", "Communicate effectively as a family", "Support recovery without enabling"],
    audience: "Families affected by a member's addiction"
  },
  {
    id: 75, category: "family", level: "Intermediate",
    title: "Parenting in Recovery",
    description: "Be the parent your children need. Address guilt, rebuild relationships with your kids, and develop healthy parenting skills.",
    duration: "8 weeks", lessons: 16,
    modules: ["Parenting Through Guilt & Shame", "Age-Appropriate Conversations About Addiction", "Rebuilding Trust with Your Children", "Consistent, Loving Discipline", "Managing Parenting Stress", "Co-Parenting Challenges", "Your Children's Emotional Needs", "Breaking the Cycle"],
    outcomes: ["Address parenting guilt constructively", "Have age-appropriate conversations about addiction", "Rebuild trust with your children", "Develop consistent, loving parenting practices"],
    audience: "Parents in recovery working to be better parents"
  },
  {
    id: 76, category: "family", level: "Beginner",
    title: "For Partners: Loving Someone in Recovery",
    description: "Dedicated to the partners of people in addiction or recovery. Understand what your loved one is going through while protecting your own well-being.",
    duration: "6 weeks", lessons: 12,
    modules: ["Understanding Your Partner's Addiction", "Your Own Recovery Journey", "Setting Boundaries as a Partner", "Rebuilding Trust Together", "When to Stay and When to Go", "Taking Care of Yourself"],
    outcomes: ["Understand your partner's recovery process", "Set healthy boundaries for yourself", "Make informed decisions about your relationship", "Prioritize your own well-being"],
    audience: "Partners of people in addiction or recovery"
  },
  {
    id: 77, category: "family", level: "Intermediate",
    title: "Adult Children of Addicts",
    description: "If you grew up with an addicted parent, this course helps you understand how it shaped you and guides your own healing journey.",
    duration: "8 weeks", lessons: 16,
    modules: ["Growing Up in Addiction", "Common Traits of ACOAs", "Your Inner Child", "Breaking Generational Patterns", "Grief for the Childhood You Deserved", "Reparenting Yourself", "Relationships & ACOAs", "Your Own Healing Path"],
    outcomes: ["Understand how parental addiction shaped your personality", "Identify ACOA traits and patterns", "Begin reparenting your inner child", "Break generational addiction cycles"],
    audience: "Adults who grew up with addicted parents"
  },
  {
    id: 78, category: "family", level: "Intermediate",
    title: "Pregnancy, Babies & Recovery",
    description: "Navigate pregnancy and new parenthood in recovery. Safe practices, support systems, and managing the unique challenges of this beautiful, overwhelming time.",
    duration: "10 weeks", lessons: 20,
    modules: ["Recovery During Pregnancy", "Safe Medication Considerations", "Preparing for Parenthood", "Postpartum Mental Health", "Breastfeeding & Recovery", "Sleep Deprivation Management", "Building a Support System", "Thriving as a New Parent"],
    outcomes: ["Navigate pregnancy safely in recovery", "Prepare for postpartum challenges", "Build a robust support system", "Manage the stress of new parenthood without relapse"],
    audience: "Pregnant women or new parents in recovery"
  },
  {
    id: 79, category: "family", level: "Advanced",
    title: "Family Intervention: The Complete Guide",
    description: "For families considering an intervention. Understanding intervention models, preparation, execution, and follow-through — whether the person says yes or no.",
    duration: "4 weeks", lessons: 8,
    modules: ["When Is an Intervention Appropriate?", "Intervention Models Explained", "Preparing the Team", "Writing Your Letters", "The Intervention Day", "If They Say Yes", "If They Say No", "Family Recovery Regardless"],
    outcomes: ["Decide if intervention is appropriate", "Choose the right intervention model", "Prepare and execute an intervention", "Continue family recovery regardless of outcome"],
    audience: "Families considering an intervention for a loved one"
  },
  {
    id: 80, category: "family", level: "Beginner",
    title: "Grandparents Raising Grandchildren",
    description: "For grandparents who've stepped in to raise grandchildren affected by a parent's addiction. Practical support, legal guidance, and emotional care.",
    duration: "6 weeks", lessons: 12,
    modules: ["Navigating Your New Role", "Legal Custody & Guardianship", "Explaining Addiction to Children", "Managing Your Own Emotions", "Financial Resources", "Self-Care for Grandparent Caregivers"],
    outcomes: ["Understand legal custody options", "Explain addiction to children appropriately", "Access financial and community resources", "Maintain your own health while caregiving"],
    audience: "Grandparents raising grandchildren due to a parent's addiction"
  },

  // ===== RELAPSE PREVENTION (7 courses) =====
  {
    id: 81, category: "relapse", level: "Beginner",
    title: "Relapse Prevention Fundamentals",
    description: "Your comprehensive foundation for preventing relapse. Understand warning signs, build your prevention plan, and learn what to do if relapse occurs.",
    duration: "6 weeks", lessons: 12,
    modules: ["Understanding the Relapse Process", "Emotional Relapse Warning Signs", "Mental Relapse Warning Signs", "Physical Relapse Prevention", "Building Your Prevention Plan", "Emergency Action Plan"],
    outcomes: ["Identify the three stages of relapse", "Recognize personal warning signs", "Build a comprehensive prevention plan", "Know exactly what to do in a crisis"],
    audience: "Anyone in recovery wanting to strengthen their relapse prevention"
  },
  {
    id: 82, category: "relapse", level: "Intermediate",
    title: "Trigger Mapping & Management",
    description: "Identify, categorize, and develop strategies for every trigger in your environment. Build a comprehensive trigger management system.",
    duration: "6 weeks", lessons: 12,
    modules: ["External vs Internal Triggers", "People, Places, Things Audit", "Emotional Triggers Deep Dive", "Situational Planning", "Building Trigger-Response Plans", "Gradual Exposure vs Avoidance"],
    outcomes: ["Map all personal triggers comprehensively", "Categorize triggers by risk level", "Build specific response plans for each trigger", "Know when to avoid vs when to face triggers"],
    audience: "People wanting to systematically address their triggers"
  },
  {
    id: 83, category: "relapse", level: "Intermediate",
    title: "Craving Surfing: Advanced Techniques",
    description: "Go beyond basic craving management. Master urge surfing, cognitive defusion, and advanced mindfulness techniques for intense cravings.",
    duration: "4 weeks", lessons: 8,
    modules: ["The Anatomy of a Craving", "Urge Surfing Technique", "Cognitive Defusion", "Playing the Tape Forward", "Delay & Distract Advanced", "Cravings as Information", "Physical Techniques", "Post-Craving Processing"],
    outcomes: ["Surf intense cravings without acting on them", "Use cognitive defusion to separate from urges", "Apply the 'play the tape forward' technique", "Process cravings as valuable information"],
    audience: "People dealing with persistent or intense cravings"
  },
  {
    id: 84, category: "relapse", level: "Intermediate",
    title: "HALT + Stress Management",
    description: "Master the HALT framework (Hungry, Angry, Lonely, Tired) and build comprehensive stress management skills for long-term recovery.",
    duration: "6 weeks", lessons: 12,
    modules: ["The HALT Framework", "Hunger: Physical & Emotional", "Anger: Processing & Expressing", "Loneliness: Connection Strategies", "Tired: Rest & Recovery", "Stress Management Toolkit", "Building Resilience", "Your Personal HALT Plan"],
    outcomes: ["Use HALT check-ins regularly", "Address each HALT state proactively", "Build a comprehensive stress management toolkit", "Increase overall resilience"],
    audience: "Anyone who notices that basic needs states trigger cravings"
  },
  {
    id: 85, category: "relapse", level: "Advanced",
    title: "After Relapse: Getting Back Up",
    description: "Relapse doesn't mean failure. This course provides a compassionate, practical guide to getting back on track with greater wisdom and resilience.",
    duration: "4 weeks", lessons: 8,
    modules: ["Relapse Is Data, Not Defeat", "Immediate Harm Reduction", "The 24-Hour Recovery Plan", "Analyzing What Happened", "Strengthening Your Plan", "Dealing with Shame", "Telling Your Support System", "Recommitting with Wisdom"],
    outcomes: ["Respond to relapse without spiraling", "Analyze what happened without shame", "Strengthen your recovery plan with new data", "Recommit to recovery with greater resolve"],
    audience: "People who have experienced a relapse"
  },
  {
    id: 86, category: "relapse", level: "Intermediate",
    title: "Holiday & Special Event Survival Guide",
    description: "Navigate the most triggering times of year. Strategies for holidays, celebrations, funerals, and other high-risk events.",
    duration: "4 weeks", lessons: 8,
    modules: ["Why Holidays Are Dangerous", "Planning Ahead: Event Strategy", "The Exit Plan", "Sober Celebrations", "Grief Events & Recovery", "New Year's Without Drinking", "Summer & Vacation Sobriety", "Creating New Traditions"],
    outcomes: ["Plan ahead for high-risk events", "Execute exit strategies when needed", "Create sober celebration traditions", "Navigate grief events safely"],
    audience: "People in recovery facing upcoming challenging events"
  },
  {
    id: 87, category: "relapse", level: "Advanced",
    title: "Long-Term Recovery: Years 2-10+",
    description: "Recovery doesn't end after year one. Address the unique challenges of long-term recovery — complacency, boredom, and evolving your recovery practice.",
    duration: "8 weeks", lessons: 16,
    modules: ["The Complacency Trap", "Evolution of Recovery Needs", "When Meetings Don't Work Anymore", "Boredom in Sobriety", "Giving Back: Service Work", "Continued Growth & Challenge", "Relationships in Long-Term Recovery", "Legacy: What Recovery Means Now"],
    outcomes: ["Recognize and combat complacency", "Evolve your recovery practice over time", "Find new meaning and challenge in long-term recovery", "Build a legacy through your recovery"],
    audience: "People with 1+ years of recovery seeking to deepen their practice"
  },

  // ===== SUPPORT SYSTEMS (7 courses) =====
  {
    id: 88, category: "support", level: "Beginner",
    title: "12-Step Programs: A Modern Guide",
    description: "A balanced, modern exploration of 12-step programs. What they offer, how they work, common objections, and how to get the most from them.",
    duration: "6 weeks", lessons: 12,
    modules: ["History & Philosophy of 12 Steps", "Finding the Right Meeting", "Working the Steps", "Sponsorship: Finding & Being", "Common Objections Addressed", "The Higher Power Flexibility", "Online Meetings", "Making It Work for You"],
    outcomes: ["Understand the 12-step framework", "Find and attend meetings comfortably", "Work the steps at your own pace", "Navigate spiritual aspects on your own terms"],
    audience: "People curious about or new to 12-step programs"
  },
  {
    id: 89, category: "support", level: "Intermediate",
    title: "SMART Recovery: Science-Based Alternative",
    description: "Explore SMART Recovery — the science-based alternative to 12-step programs. Learn the 4-point program and self-empowerment approach.",
    duration: "6 weeks", lessons: 12,
    modules: ["What Is SMART Recovery?", "Building & Maintaining Motivation", "Coping with Urges", "Managing Thoughts, Feelings & Behaviors", "Living a Balanced Life", "SMART vs 12-Step: Finding Your Fit", "Online SMART Resources", "Facilitating SMART Meetings"],
    outcomes: ["Understand SMART Recovery's 4-point program", "Use CBT-based recovery tools", "Decide if SMART is right for you", "Access SMART Recovery resources"],
    audience: "People seeking a science-based recovery program"
  },
  {
    id: 90, category: "support", level: "Beginner",
    title: "Building Your Recovery Team",
    description: "Recovery isn't a solo journey. Build your personal recovery support team — sponsor, therapist, doctor, peers, and accountability partners.",
    duration: "4 weeks", lessons: 8,
    modules: ["Why You Can't Do This Alone", "Types of Support You Need", "Finding a Therapist", "The Sponsor/Mentor Relationship", "Peer Support Networks", "Professional Treatment Team", "Online Recovery Communities", "Maintaining Your Network"],
    outcomes: ["Identify your support needs", "Build a comprehensive recovery support team", "Find and connect with recovery communities", "Maintain and strengthen your support network"],
    audience: "Anyone wanting to build a stronger recovery support system"
  },
  {
    id: 91, category: "support", level: "Intermediate",
    title: "Recovery Coaching Fundamentals",
    description: "Learn what recovery coaching is and how to work with a coach — or become one yourself. A growing field with enormous impact.",
    duration: "6 weeks", lessons: 12,
    modules: ["What Is Recovery Coaching?", "Coach vs Sponsor vs Therapist", "Working with a Recovery Coach", "Core Coaching Skills", "Goal Setting & Accountability", "Becoming a Recovery Coach"],
    outcomes: ["Understand recovery coaching principles", "Work effectively with a coach", "Apply coaching skills to self and others", "Explore recovery coaching as a career"],
    audience: "People interested in recovery coaching as a tool or career"
  },
  {
    id: 92, category: "support", level: "Beginner",
    title: "Refuge Recovery: Buddhist-Inspired Path",
    description: "Explore the Buddhist-inspired approach to recovery. Meditation, mindfulness, and the Four Noble Truths applied to addiction and suffering.",
    duration: "8 weeks", lessons: 16,
    modules: ["Buddhism & Addiction", "The Four Noble Truths of Recovery", "The Eightfold Path Applied", "Meditation as Medicine", "Community (Sangha)", "Wise Speech in Recovery", "Working with Craving & Aversion", "A Life of Compassion"],
    outcomes: ["Understand Buddhist approaches to suffering and addiction", "Apply the Four Noble Truths to recovery", "Build a meditation-centered recovery practice", "Join the Refuge Recovery community"],
    audience: "People drawn to mindfulness and Buddhist-inspired recovery"
  },
  {
    id: 93, category: "support", level: "Intermediate",
    title: "Online Recovery Communities",
    description: "Navigate the world of online recovery — Reddit communities, apps, virtual meetings, and digital peer support. Build your online recovery toolkit.",
    duration: "3 weeks", lessons: 6,
    modules: ["The Online Recovery Landscape", "Reddit Recovery Communities", "Recovery Apps Reviewed", "Virtual Meetings & Events", "Safety in Online Spaces", "Building Your Digital Support Network"],
    outcomes: ["Navigate online recovery resources safely", "Find and evaluate recovery apps", "Participate in virtual recovery communities", "Build a digital support network"],
    audience: "People who prefer or need online recovery support"
  },
  {
    id: 94, category: "support", level: "Advanced",
    title: "Starting a Recovery Meeting or Group",
    description: "Step into leadership by starting a recovery meeting, support group, or community organization. Everything you need from concept to sustainable operation.",
    duration: "6 weeks", lessons: 12,
    modules: ["Identifying the Need", "Choosing a Format", "Logistics & Planning", "Facilitator Training", "Building Attendance", "Managing Group Dynamics", "Safety & Crisis Protocols", "Sustainability & Growth"],
    outcomes: ["Plan and launch a recovery meeting or group", "Facilitate group discussions effectively", "Handle crisis situations in group settings", "Build a sustainable community resource"],
    audience: "Experienced recovery members ready to start a meeting or group"
  },

  // ===== LIFE SKILLS (7 courses) =====
  {
    id: 95, category: "life-skills", level: "Beginner",
    title: "Daily Routines That Support Recovery",
    description: "Structure is freedom in recovery. Build morning routines, evening routines, and daily structures that keep you grounded and growing.",
    duration: "4 weeks", lessons: 8,
    modules: ["Why Structure Matters in Recovery", "The Power Morning Routine", "Productive Afternoon Structure", "The Wind-Down Evening Routine", "Weekend Recovery Routines", "Flexibility Within Structure", "When Routines Get Disrupted", "Your Personalized Daily Plan"],
    outcomes: ["Create a recovery-supportive morning routine", "Build structure throughout your entire day", "Handle routine disruptions without crisis", "Adapt routines for different life situations"],
    audience: "Anyone who needs more structure in their recovery"
  },
  {
    id: 96, category: "life-skills", level: "Beginner",
    title: "Time Management for the Recovering Mind",
    description: "Addiction warps our sense of time. Learn to manage time effectively, prioritize what matters, and fill the hours that used to be consumed by addiction.",
    duration: "4 weeks", lessons: 8,
    modules: ["Where Did the Time Go?", "Filling the Void: Productive Leisure", "Prioritization Frameworks", "The 2-Minute Rule", "Beating Procrastination", "Calendar & Planning Systems", "Saying No to Time Wasters", "Your Weekly Planning System"],
    outcomes: ["Implement a time management system", "Fill free time with meaningful activities", "Overcome procrastination", "Plan your week intentionally"],
    audience: "People struggling to manage time in recovery"
  },
  {
    id: 97, category: "life-skills", level: "Intermediate",
    title: "Housing & Independent Living",
    description: "From sober living to independent housing. Navigate the practical challenges of finding, affording, and maintaining a recovery-supportive home.",
    duration: "6 weeks", lessons: 12,
    modules: ["Sober Living Environments", "Transitioning to Independent Living", "Finding Recovery-Friendly Housing", "Roommates & Shared Living", "Creating a Recovery-Safe Home", "Managing a Household"],
    outcomes: ["Navigate sober living options", "Find and secure independent housing", "Create a recovery-supportive home environment", "Manage household responsibilities"],
    audience: "People transitioning to independent living in recovery"
  },
  {
    id: 98, category: "life-skills", level: "Beginner",
    title: "Stress Management Masterclass",
    description: "A comprehensive stress management program. Because unmanaged stress is the number one relapse trigger.",
    duration: "6 weeks", lessons: 12,
    modules: ["Understanding Your Stress Response", "Acute Stress Techniques", "Chronic Stress Management", "Workplace Stress", "Relationship Stress", "Physical Stress Relief", "Mental Stress Relief", "Building a Stress-Resilient Life"],
    outcomes: ["Identify personal stress patterns", "Use acute stress relief techniques", "Manage chronic stress effectively", "Build long-term stress resilience"],
    audience: "Anyone who struggles with stress in recovery"
  },
  {
    id: 99, category: "life-skills", level: "Intermediate",
    title: "Legal Issues in Recovery",
    description: "Navigate legal challenges common in recovery — DUIs, custody battles, probation, and rebuilding your legal standing.",
    duration: "6 weeks", lessons: 12,
    modules: ["Common Legal Issues in Recovery", "DUI & Criminal Charges", "Custody & Family Court", "Probation & Parole", "Record Expungement", "Finding Legal Aid", "Your Legal Rights", "Rebuilding Your Record"],
    outcomes: ["Understand common legal issues in recovery", "Navigate court systems more effectively", "Access legal aid resources", "Work toward record expungement where possible"],
    audience: "People dealing with legal issues related to their addiction"
  },
  {
    id: 100, category: "life-skills", level: "Beginner",
    title: "Creative Expression in Recovery",
    description: "Unleash creativity as a recovery tool. Writing, art, music, and other creative outlets for processing emotions and building a new identity.",
    duration: "6 weeks", lessons: 12,
    modules: ["Creativity & the Recovering Brain", "Journaling for Recovery", "Art as Therapy", "Music & Recovery", "Writing Your Story", "Photography & Mindfulness", "Creative Community", "Making Creativity a Practice"],
    outcomes: ["Use journaling as a daily recovery tool", "Explore art and music as emotional outlets", "Begin writing your recovery story", "Build a creative practice for well-being"],
    audience: "Anyone wanting to explore creativity in recovery"
  },
  {
    id: 101, category: "life-skills", level: "Intermediate",
    title: "Travel & Adventure in Recovery",
    description: "See the world sober. Navigate travel challenges, find sober adventures, and discover that life is infinitely more vivid in recovery.",
    duration: "4 weeks", lessons: 8,
    modules: ["Sober Travel Planning", "Managing Triggers Away from Home", "Finding Meetings Worldwide", "Adventure Sports & Recovery", "Sober Travel Communities", "Budget Travel in Recovery", "Solo Travel Safely", "Travel as Growth"],
    outcomes: ["Plan and execute sober travel", "Manage recovery while traveling", "Find meetings and support anywhere", "Use travel as a recovery-enhancing experience"],
    audience: "People who want to travel confidently in recovery"
  },

  // ===== SPIRITUAL GROWTH (7 courses) =====
  {
    id: 102, category: "spiritual", level: "Beginner",
    title: "Spirituality in Recovery: Finding Your Path",
    description: "Explore spirituality on your own terms — whether religious, secular, or somewhere in between. No dogma, just genuine exploration.",
    duration: "6 weeks", lessons: 12,
    modules: ["What Is Spirituality?", "Spirituality vs Religion", "Your Spiritual History", "Exploring Different Traditions", "The 'Higher Power' Concept", "Secular Spirituality", "Daily Spiritual Practice", "Spirituality as Connection"],
    outcomes: ["Define spirituality on your own terms", "Explore various spiritual traditions", "Navigate 'Higher Power' concepts comfortably", "Build a personal spiritual practice"],
    audience: "Anyone exploring spirituality in their recovery"
  },
  {
    id: 103, category: "spiritual", level: "Intermediate",
    title: "Gratitude Practice: Rewiring Your Brain",
    description: "Transform your default mindset through structured gratitude practice. The science of gratitude and practical techniques for lasting change.",
    duration: "4 weeks", lessons: 12,
    modules: ["The Neuroscience of Gratitude", "Gratitude Journaling Methods", "Gratitude Meditation", "Expressing Gratitude to Others", "Gratitude in Difficult Times", "From Practice to Perspective"],
    outcomes: ["Understand how gratitude rewires the brain", "Maintain a daily gratitude practice", "Express gratitude to others regularly", "Find gratitude even in challenges"],
    audience: "Anyone wanting to build a more positive outlook"
  },
  {
    id: 104, category: "spiritual", level: "Intermediate",
    title: "The 12 Steps as Spiritual Practice",
    description: "A deep spiritual exploration of the 12 steps. For those who want to engage with the steps as a genuine spiritual path, regardless of religious background.",
    duration: "12 weeks", lessons: 24,
    modules: ["Step 1: Surrender", "Step 2: Hope", "Step 3: Trust", "Step 4: Courage", "Step 5: Integrity", "Step 6: Willingness", "Step 7: Humility", "Step 8: Reflection", "Step 9: Amendment", "Step 10: Perseverance", "Step 11: Connection", "Step 12: Service"],
    outcomes: ["Work the 12 steps as a spiritual practice", "Develop a personal relationship with each step", "Apply step principles in daily life", "Deepen your spiritual recovery"],
    audience: "People wanting to engage deeply with the 12 steps spiritually"
  },
  {
    id: 105, category: "spiritual", level: "Beginner",
    title: "Finding Meaning After Addiction",
    description: "Existential exploration for recovery. Viktor Frankl's logotherapy, meaning-making, and the search for purpose that transcends survival.",
    duration: "6 weeks", lessons: 12,
    modules: ["The Search for Meaning", "Viktor Frankl & Logotherapy", "Creating vs Finding Meaning", "Meaning Through Suffering", "Purpose-Driven Recovery", "Your Mission Statement"],
    outcomes: ["Explore meaning-making in recovery", "Apply logotherapy principles", "Create a personal mission statement", "Find purpose that drives your recovery"],
    audience: "People seeking deeper existential meaning in recovery"
  },
  {
    id: 106, category: "spiritual", level: "Advanced",
    title: "Service & Giving Back",
    description: "The transformative power of service. From helping one person to building community organizations — service as the ultimate spiritual practice.",
    duration: "6 weeks", lessons: 12,
    modules: ["Why Service Transforms the Server", "12th Step Work", "Mentoring & Sponsoring", "Community Service", "Building Recovery Organizations", "Service Without Burnout"],
    outcomes: ["Understand service as transformative practice", "Begin 12th step or mentoring work", "Engage in community service", "Serve others without burning out"],
    audience: "People ready to give back through service"
  },
  {
    id: 107, category: "spiritual", level: "Intermediate",
    title: "Nature & Wilderness Spirituality",
    description: "Connect with something greater through the natural world. Wilderness therapy, eco-spirituality, and the healing power of the earth.",
    duration: "6 weeks", lessons: 12,
    modules: ["The Spiritual Power of Nature", "Wilderness Therapy Principles", "Solo Time in Nature", "Earth-Based Spiritual Practices", "Seasons as Metaphor for Recovery", "Eco-Spirituality & Stewardship"],
    outcomes: ["Develop a nature-based spiritual practice", "Use time in nature for spiritual growth", "Connect with seasonal rhythms for recovery", "Practice earth-based contemplation"],
    audience: "People drawn to nature-based spirituality"
  },
  {
    id: 108, category: "spiritual", level: "Advanced",
    title: "Writing Your Recovery Story",
    description: "The capstone of your journey. Write, refine, and learn to share your recovery story as a tool for your own healing and a gift to others.",
    duration: "8 weeks", lessons: 16,
    modules: ["Why Your Story Matters", "Story Structure for Recovery", "Writing the Dark Parts", "Writing the Light", "Editing & Refining", "Finding Your Voice", "Sharing Safely", "Your Story as Service"],
    outcomes: ["Write your complete recovery narrative", "Process your journey through storytelling", "Share your story with appropriate boundaries", "Use your story to help others"],
    audience: "People ready to write and share their recovery story"
  }
];
