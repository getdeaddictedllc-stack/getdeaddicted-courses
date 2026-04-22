// ===== GETDEADDICTED ACADEMY — INTERNATIONALIZATION =====
// i18n framework with English and Spanish. Extensible to any language.

const I18n = (() => {
  const STORAGE_KEY = 'gda_locale';
  let _locale = 'en';

  const TRANSLATIONS = {
    en: {
      // Nav
      nav_home: 'Home',
      nav_categories: 'Categories',
      nav_courses: 'Courses',
      nav_about: 'About',
      nav_dashboard: 'Dashboard',
      nav_refer: 'Refer & Earn',
      nav_classroom: 'Classroom',
      nav_login: 'Log In',
      nav_upgrade: 'Upgrade',

      // Hero
      hero_title: 'Take Back Your Screen Time',
      hero_sub: '50 fun, kid-friendly courses to build healthy digital habits, beat phone addiction, and discover amazing things beyond the screen.',
      hero_cta: 'Start Learning Free',
      hero_explore: 'Explore Categories',
      hero_trust: '5 courses free \u00b7 No credit card required \u00b7 Cancel anytime',
      hero_stat_courses: 'Courses',
      hero_stat_categories: 'Categories',
      hero_stat_lessons: 'Lessons',
      hero_stat_ages: '5 and Up',

      // Course Browser
      courses_title: 'All Courses',
      courses_search: 'Search courses...',
      courses_all_categories: 'All Categories',
      courses_all_levels: 'All Levels',
      courses_showing: 'Showing',
      courses_courses: 'courses',
      courses_lessons: 'lessons',
      courses_free: 'Free',
      courses_premium: 'Premium',

      // Category
      categories_title: 'Course Categories',
      categories_sub: 'Pick a topic that matters to you',

      // Auth
      auth_login: 'Log In',
      auth_signup: 'Sign Up',
      auth_email: 'Email address',
      auth_pin: 'PIN (4-6 digits)',
      auth_name: 'Your name',
      auth_create_pin: 'Create a PIN (4-6 digits)',
      auth_create_account: 'Create Free Account',
      auth_free_note: '5 free courses included. No credit card needed.',
      auth_welcome_back: 'Welcome back!',
      auth_account_created: 'Account created! 5 free courses are ready for you.',

      // Pricing
      pricing_title: 'Simple, Affordable Pricing',
      pricing_sub: 'Start free, upgrade when you\'re ready',
      pricing_trial: 'All plans include a 7-day free trial. Cancel anytime.',
      pricing_free: 'Free',
      pricing_annual: 'Annual',
      pricing_family: 'Family',
      pricing_month: '/month',
      pricing_year: '/year',
      pricing_forever: 'forever',
      pricing_best_value: 'Best Value \u2014 Save 37%',
      pricing_start_free: 'Start Free',
      pricing_start_trial: 'Start Free Trial',
      pricing_most_popular: 'Most Popular',

      // Presentation
      pres_start: 'Start Presentation',
      pres_close: 'Close',
      pres_print: 'Print Worksheet',
      pres_prev: 'Previous slide',
      pres_next: 'Next slide',
      pres_exit: 'Exit presentation',

      // Paywall
      paywall_title: 'Upgrade to Premium',
      paywall_sub: 'Get access to all 50 digital wellness courses',
      paywall_unlock: 'Unlock',
      paywall_and_more: 'and 44 more premium courses',
      paywall_continue_free: 'Or continue with',
      paywall_free_courses: '5 free courses',

      // Dashboard
      dash_parent: 'Parent Dashboard',
      dash_teacher: 'Teacher Dashboard',
      dash_welcome: 'Welcome back',
      dash_courses_done: 'Courses Done',
      dash_day_streak: 'Day Streak',
      dash_badges: 'Badges',
      dash_minutes: 'Minutes',
      dash_children: 'Your Children',
      dash_add_child: 'Add Your Child',
      dash_badges_title: 'Badges & Achievements',
      dash_progress: 'Course Progress',
      dash_account: 'Account',
      dash_logout: 'Log Out',
      dash_back: 'Back to Courses',

      // Gamification
      xp_level_up: 'LEVEL UP! You\'re now',
      xp_daily_challenge: 'Daily Challenge',

      // Coach
      coach_title: 'Wellness Coach',
      coach_powered: 'AI-powered',
      coach_placeholder: 'Ask me anything about digital wellness...',

      // Referral
      referral_title: 'Give a Month, Get a Month',
      referral_sub: 'Share your code with friends. When they sign up, you both get 1 free month of Premium!',
      referral_friends: 'Friends Referred',
      referral_months: 'Free Months Earned',
      referral_have_code: 'Have a referral code?',
      referral_applied: 'Referral applied! You both get 1 free month of Premium.',

      // Social Proof
      testimonials_title: 'What Families Are Saying',
      testimonials_sub: 'Real results from real families',
      comparison_title: 'Why GetDeaddicted?',
      comparison_sub: 'The only platform built specifically for kids\' screen wellness',
      faq_title: 'Frequently Asked Questions',

      // About
      about_title: 'About GetDeaddicted Academy',
      about_safe: 'Safe for all ages (5+)',
      about_fun: 'Fun, engaging lessons',
      about_voice: 'Voice narration built in',
      about_progress: 'Progress tracking & badges',
      about_dashboard: 'Parent dashboard',
      about_works: 'Works on phone and desktop',

      // Footer
      footer_printables: 'Free Printables',
      footer_privacy: 'Privacy',
      footer_terms: 'Terms',
      footer_contact: 'Contact',
      footer_copyright: '\u00a9 2026 GetDeaddicted LLC. All rights reserved.',
      footer_tagline: 'Your screen time, your rules.',

      // Email
      email_title: 'Get Weekly Digital Wellness Tips',
      email_sub: 'Join families building healthier screen habits',
      email_placeholder: 'Your email address',
      email_subscribe: 'Subscribe',
      email_subscribed: 'Subscribed to weekly updates',

      // Misc
      loading: 'Loading courses...',
      consent_text: 'We use localStorage to save your progress and preferences. No cookies, no tracking, no data sold.',
      consent_accept: 'Got It',
    },

    es: {
      nav_home: 'Inicio',
      nav_categories: 'Categor\u00edas',
      nav_courses: 'Cursos',
      nav_about: 'Acerca de',
      nav_dashboard: 'Panel',
      nav_refer: 'Recomendar',
      nav_classroom: 'Aula',
      nav_login: 'Iniciar Sesi\u00f3n',
      nav_upgrade: 'Mejorar Plan',

      hero_title: 'Recupera Tu Tiempo de Pantalla',
      hero_sub: '50 cursos divertidos para ni\u00f1os y familias. Construye h\u00e1bitos digitales saludables, vence la adicci\u00f3n al tel\u00e9fono y descubre cosas incre\u00edbles m\u00e1s all\u00e1 de la pantalla.',
      hero_cta: 'Empieza Gratis',
      hero_explore: 'Explorar Categor\u00edas',
      hero_trust: '5 cursos gratis \u00b7 Sin tarjeta de cr\u00e9dito \u00b7 Cancela cuando quieras',
      hero_stat_courses: 'Cursos',
      hero_stat_categories: 'Categor\u00edas',
      hero_stat_lessons: 'Lecciones',
      hero_stat_ages: '5 a\u00f1os+',

      courses_title: 'Todos los Cursos',
      courses_search: 'Buscar cursos...',
      courses_all_categories: 'Todas las Categor\u00edas',
      courses_all_levels: 'Todos los Niveles',
      courses_showing: 'Mostrando',
      courses_courses: 'cursos',
      courses_lessons: 'lecciones',
      courses_free: 'Gratis',
      courses_premium: 'Premium',

      categories_title: 'Categor\u00edas de Cursos',
      categories_sub: 'Elige un tema que te importe',

      auth_login: 'Iniciar Sesi\u00f3n',
      auth_signup: 'Registrarse',
      auth_email: 'Correo electr\u00f3nico',
      auth_pin: 'PIN (4-6 d\u00edgitos)',
      auth_name: 'Tu nombre',
      auth_create_pin: 'Crea un PIN (4-6 d\u00edgitos)',
      auth_create_account: 'Crear Cuenta Gratis',
      auth_free_note: '5 cursos gratis incluidos. Sin tarjeta de cr\u00e9dito.',
      auth_welcome_back: '\u00a1Bienvenido de vuelta!',
      auth_account_created: '\u00a1Cuenta creada! 5 cursos gratis est\u00e1n listos para ti.',

      pricing_title: 'Precios Simples y Accesibles',
      pricing_sub: 'Empieza gratis, mejora cuando est\u00e9s listo',
      pricing_trial: 'Todos los planes incluyen 7 d\u00edas de prueba gratis. Cancela cuando quieras.',
      pricing_free: 'Gratis',
      pricing_annual: 'Anual',
      pricing_family: 'Familia',
      pricing_month: '/mes',
      pricing_year: '/a\u00f1o',
      pricing_forever: 'siempre',
      pricing_best_value: 'Mejor Valor \u2014 Ahorra 37%',
      pricing_start_free: 'Empezar Gratis',
      pricing_start_trial: 'Prueba Gratis',
      pricing_most_popular: 'M\u00e1s Popular',

      pres_start: 'Iniciar Presentaci\u00f3n',
      pres_close: 'Cerrar',
      pres_print: 'Imprimir Hoja',
      pres_prev: 'Diapositiva anterior',
      pres_next: 'Siguiente diapositiva',
      pres_exit: 'Salir de presentaci\u00f3n',

      paywall_title: 'Mejora a Premium',
      paywall_sub: 'Accede a los 50 cursos de bienestar digital',
      paywall_unlock: 'Desbloquear',
      paywall_and_more: 'y 44 cursos premium m\u00e1s',
      paywall_continue_free: 'O contin\u00faa con',
      paywall_free_courses: '5 cursos gratis',

      dash_parent: 'Panel de Padres',
      dash_teacher: 'Panel del Maestro',
      dash_welcome: 'Bienvenido de vuelta',
      dash_courses_done: 'Cursos Completados',
      dash_day_streak: 'Racha de D\u00edas',
      dash_badges: 'Insignias',
      dash_minutes: 'Minutos',
      dash_children: 'Tus Hijos',
      dash_add_child: 'Agregar Hijo',
      dash_badges_title: 'Insignias y Logros',
      dash_progress: 'Progreso de Cursos',
      dash_account: 'Cuenta',
      dash_logout: 'Cerrar Sesi\u00f3n',
      dash_back: 'Volver a Cursos',

      xp_level_up: '\u00a1SUBISTE DE NIVEL! Ahora eres',
      xp_daily_challenge: 'Desaf\u00edo Diario',

      coach_title: 'Coach de Bienestar',
      coach_powered: 'Con inteligencia artificial',
      coach_placeholder: 'Preg\u00fantame sobre bienestar digital...',

      referral_title: 'Da un Mes, Recibe un Mes',
      referral_sub: 'Comparte tu c\u00f3digo con amigos. Cuando se registren, ambos reciben 1 mes gratis de Premium.',
      referral_friends: 'Amigos Referidos',
      referral_months: 'Meses Gratis Ganados',
      referral_have_code: '\u00bfTienes un c\u00f3digo de referido?',
      referral_applied: '\u00a1Referido aplicado! Ambos reciben 1 mes gratis de Premium.',

      testimonials_title: 'Lo Que Dicen las Familias',
      testimonials_sub: 'Resultados reales de familias reales',
      comparison_title: '\u00bfPor Qu\u00e9 GetDeaddicted?',
      comparison_sub: 'La \u00fanica plataforma dise\u00f1ada para el bienestar digital de los ni\u00f1os',
      faq_title: 'Preguntas Frecuentes',

      about_title: 'Acerca de GetDeaddicted Academy',
      about_safe: 'Seguro para todas las edades (5+)',
      about_fun: 'Lecciones divertidas',
      about_voice: 'Narraci\u00f3n de voz incluida',
      about_progress: 'Seguimiento y medallas',
      about_dashboard: 'Panel para padres',
      about_works: 'Funciona en tel\u00e9fono y computadora',

      footer_printables: 'Imprimibles Gratis',
      footer_privacy: 'Privacidad',
      footer_terms: 'T\u00e9rminos',
      footer_contact: 'Contacto',
      footer_copyright: '\u00a9 2026 GetDeaddicted LLC. Todos los derechos reservados.',
      footer_tagline: 'Tu tiempo de pantalla, tus reglas.',

      email_title: 'Recibe Tips Semanales de Bienestar Digital',
      email_sub: '\u00danete a familias que construyen h\u00e1bitos m\u00e1s saludables',
      email_placeholder: 'Tu correo electr\u00f3nico',
      email_subscribe: 'Suscribirse',
      email_subscribed: 'Suscrito a actualizaciones semanales',

      loading: 'Cargando cursos...',
      consent_text: 'Usamos localStorage para guardar tu progreso y preferencias. Sin cookies, sin rastreo, sin venta de datos.',
      consent_accept: 'Entendido',
    },

    hi: {
      // Nav
      nav_home: 'मुख्य',
      nav_categories: 'श्रेणियां',
      nav_courses: 'पाठ्यक्रम',
      nav_about: 'हमारे बारे में',
      nav_dashboard: 'डैशबोर्ड',
      nav_refer: 'दोस्तों को भेजें',
      nav_classroom: 'कक्षा',
      nav_login: 'लॉग इन',
      nav_upgrade: 'अपग्रेड करें',

      // Hero
      hero_title: 'अपने स्क्रीन को वापस पाएं',
      hero_sub: 'बच्चों और परिवार के लिए 50 मजेदार पाठ्यक्रम। स्वस्थ डिजिटल आदतें बनाएं, फोन की लत से छुटकारा पाएं, और स्क्रीन के बाहर की दुनिया खोजें।',
      hero_cta: 'मुफ्त में शुरू करें',
      hero_explore: 'श्रेणियां देखें',
      hero_trust: '5 पाठ्यक्रम मुफ्त · क्रेडिट कार्ड की जरूरत नहीं · कभी भी रद्द करें',
      hero_stat_courses: 'पाठ्यक्रम',
      hero_stat_categories: 'श्रेणियां',
      hero_stat_lessons: 'पाठ',
      hero_stat_ages: '5 साल+',

      // Course Browser
      courses_title: 'सभी पाठ्यक्रम',
      courses_search: 'पाठ्यक्रम खोजें...',
      courses_all_categories: 'सभी श्रेणियां',
      courses_all_levels: 'सभी स्तर',
      courses_showing: 'दिखा रहे हैं',
      courses_courses: 'पाठ्यक्रम',
      courses_lessons: 'पाठ',
      courses_free: 'मुफ्त',
      courses_premium: 'प्रीमियम',

      categories_title: 'पाठ्यक्रम श्रेणियां',
      categories_sub: 'एक विषय चुनें जो आपको पसंद हो',

      // Auth
      auth_login: 'लॉग इन',
      auth_signup: 'साइन अप',
      auth_email: 'ईमेल पता',
      auth_pin: 'PIN (4-6 अंक)',
      auth_name: 'आपका नाम',
      auth_create_pin: 'PIN बनाएं (4-6 अंक)',
      auth_create_account: 'मुफ्त खाता बनाएं',
      auth_free_note: '5 पाठ्यक्रम मुफ्त। क्रेडिट कार्ड की जरूरत नहीं।',
      auth_welcome_back: 'वापसी पर स्वागत है!',
      auth_account_created: 'खाता बन गया! 5 मुफ्त पाठ्यक्रम तैयार हैं।',

      // Pricing
      pricing_title: 'आसान, कियायती मूल्य',
      pricing_sub: 'मुफ्त शुरू करें, जब चाहें अपग्रेड करें',
      pricing_trial: 'सभी प्लान पर 7 दिन का मुफ्त ट्रायल। कभी भी रद्द करें।',
      pricing_free: 'मुफ्त',
      pricing_annual: 'वार्षिक',
      pricing_family: 'पारिवारिक',
      pricing_month: '/महीना',
      pricing_year: '/साल',
      pricing_forever: 'हमेशा के लिए',
      pricing_best_value: 'सबसे अच्छा मूल्य — 33% बचत',
      pricing_start_free: 'मुफ्त शुरू करें',
      pricing_start_trial: 'मुफ्त ट्रायल शुरू करें',
      pricing_most_popular: 'सबसे लोकप्रिय',

      // Paywall
      paywall_title: 'प्रीमियम पर अपग्रेड करें',
      paywall_sub: 'सभी 50 डिजिटल स्वास्थ्य पाठ्यक्रमों तक पहुँच पाएं',
      paywall_unlock: 'अनलॉक करें',
      paywall_and_more: 'और 44 प्रीमियम पाठ्यक्रम',
      paywall_continue_free: 'या जारी रखें',
      paywall_free_courses: '5 मुफ्त पाठ्यक्रम',

      // Presentation (critical — shown on every course slide)
      pres_start: 'प्रस्तुति शुरू करें',
      pres_close: 'बंद करें',
      pres_print: 'वर्कशीट प्रिंट करें',
      pres_prev: 'पिछली स्लाइड',
      pres_next: 'अगली स्लाइड',
      pres_exit: 'प्रस्तुति से बाहर निकलें',
      pres_play: 'चलाएं',
      pres_pause: 'रोकें',
      pres_replay: 'फिर से सुनें',

      // Dashboard
      dash_parent: 'पेरेंट डैशबोर्ड',
      dash_teacher: 'शिक्षक डैशबोर्ड',
      dash_welcome: 'वापसी पर स्वागत है',
      dash_courses_done: 'पूरे किए',
      dash_day_streak: 'दिनों की लगातार',
      dash_badges: 'बैज',
      dash_minutes: 'मिनट',
      dash_children: 'आपके बच्चे',
      dash_add_child: 'बच्चा जोड़ें',
      dash_badges_title: 'बैज और उपलब्धियां',
      dash_progress: 'पाठ्यक्रम प्रगति',
      dash_account: 'खाता',
      dash_logout: 'लॉग आउट',
      dash_back: 'पाठ्यक्रमों पर वापस',

      // Gamification
      xp_level_up: 'लेवल अप! अब आप हैं',
      xp_daily_challenge: 'दैनिक चुनौती',

      // Coach
      coach_title: 'स्वास्थ्य कोच',
      coach_powered: 'AI-संचालित',
      coach_placeholder: 'डिजिटल स्वास्थ्य के बारे में कुछ भी पूछें...',

      // Referral
      referral_title: 'एक महीना दें, एक महीना पाएं',
      referral_sub: 'दोस्तों के साथ अपना कोड शेयर करें। जब वे साइन अप करें, आप दोनों को 1 महीना प्रीमियम मुफ्त मिलेगा!',
      referral_friends: 'रेफर किए दोस्त',
      referral_months: 'मुफ्त महीने कमाए',
      referral_have_code: 'क्या आपके पास रेफरल कोड है?',
      referral_applied: 'रेफरल लागू!  आप दोनों को 1 महीना प्रीमियम मुफ्त मिला।',

      // Social proof
      testimonials_title: 'परिवार क्या कह रहे हैं',
      testimonials_sub: 'असली परिवारों के असली नतीजे',
      comparison_title: 'GetDeaddicted क्यों?',
      comparison_sub: 'बच्चों के स्क्रीन स्वास्थ्य के लिए बना एकमात्र प्लेटफॉर्म',
      faq_title: 'अक्सर पूछे जाने वाले प्रश्न',

      // About
      about_title: 'GetDeaddicted Academy के बारे में',
      about_safe: 'सभी उम्र (5+) के लिए सुरक्षित',
      about_fun: 'मजेदार, आकर्षक पाठ',
      about_voice: 'आवाज़ नैरेशन शामिल',
      about_progress: 'प्रगति ट्रैकिंग और बैज',
      about_dashboard: 'पेरेंट डैशबोर्ड',
      about_works: 'फोन और कंप्यूटर पर चलता है',

      // Footer
      footer_printables: 'मुफ्त प्रिंटेबल',
      footer_privacy: 'गोपनीयता',
      footer_terms: 'शर्तें',
      footer_contact: 'संपर्क',
      footer_copyright: '© 2026 GetDeaddicted LLC. सर्वाधिकार सुरक्षित।',
      footer_tagline: 'आपका स्क्रीन टाइम, आपके नियम।',

      // Email
      email_title: 'हर हफ्ते डिजिटल वेलनेस टिप्स पाएं',
      email_sub: 'स्वस्थ स्क्रीन आदतों वाले परिवारों से जुड़ें',
      email_placeholder: 'आपका ईमेल पता',
      email_subscribe: 'सब्सक्राइब करें',
      email_subscribed: 'साप्ताहिक अपडेट्स की सदस्यता ली',

      loading: 'पाठ्यक्रम लोड हो रहे हैं...',
      consent_text: 'हम आपकी प्रगति और प्राथमिकताओं को बचाने के लिए localStorage का उपयोग करते हैं। कोई कुकीज नहीं, कोई ट्रैकिंग नहीं, कोई डेटा बेचा नहीं जाता।',
      consent_accept: 'समझ गया',
    },

    mr: {
      // Nav
      nav_home: 'मुख्यपान',
      nav_categories: 'वर्ग',
      nav_courses: 'अभ्यासक्रम',
      nav_about: 'आम्हांबद्दल',
      nav_dashboard: 'डॅशबोर्ड',
      nav_refer: 'मित्रांना पाठवा',
      nav_classroom: 'वर्ग',
      nav_login: 'लॉग इन',
      nav_upgrade: 'अपग्रेड करा',

      // Hero
      hero_title: 'तुमचा स्क्रीन वेळ परत मिळवा',
      hero_sub: 'मुले आणि कुटुंबासाठी 50 मजेशीर अभ्यासक्रम। निरोगी डिजिटल सवयी तयार करा, फोनच्या व्यसनातून मुक्त होई, आणि स्क्रीनच्या पलिकड़चे जग शोधा.',
      hero_cta: 'फुकट शिका सुरु करा',
      hero_explore: 'वर्ग पहा',
      hero_trust: '5 अभ्यासक्रम फुकट · क्रेडिट कार्ड नको · कधीही रद्द करा',
      hero_stat_courses: 'अभ्यासक्रम',
      hero_stat_categories: 'वर्ग',
      hero_stat_lessons: 'धडे',
      hero_stat_ages: '5 वर्ष+',

      // Course Browser
      courses_title: 'सर्व अभ्यासक्रम',
      courses_search: 'अभ्यासक्रम शोधा...',
      courses_all_categories: 'सर्व वर्ग',
      courses_all_levels: 'सर्व पातळ्या',
      courses_showing: 'दाखवत आहे',
      courses_courses: 'अभ्यासक्रम',
      courses_lessons: 'धडे',
      courses_free: 'फुकट',
      courses_premium: 'प्रीमियम',

      categories_title: 'अभ्यासक्रम वर्ग',
      categories_sub: 'तुम्हाला आवडता तो विषय निवडा',

      // Auth
      auth_login: 'लॉग इन',
      auth_signup: 'नोंदणी करा',
      auth_email: 'ईमेल पत्ता',
      auth_pin: 'PIN (4-6 अंक)',
      auth_name: 'तुमचे नाव',
      auth_create_pin: 'PIN तयार करा (4-6 अंक)',
      auth_create_account: 'फुकट खाते तयार करा',
      auth_free_note: '5 फुकट अभ्यासक्रम. क्रेडिट कार्ड नको.',
      auth_welcome_back: 'परत स्वागत आहे!',
      auth_account_created: 'खाते तयार झाले! 5 फुकट अभ्यासक्रम तयार आहेत.',

      // Pricing
      pricing_title: 'सोपे, परवडणारे दर',
      pricing_sub: 'फुकट सुरु करा, तयार झाल्यावर अपग्रेड करा',
      pricing_trial: 'सर्व प्लॅनवर 7 दिवसांची फुकट चाचणी. कधीही रद्द करा.',
      pricing_free: 'फुकट',
      pricing_annual: 'वार्षिक',
      pricing_family: 'कुटुंब',
      pricing_month: '/महिना',
      pricing_year: '/वर्ष',
      pricing_forever: 'कायमस्वरूपी',
      pricing_best_value: 'सर्वोत्तम मूल्य — 33% बचत',
      pricing_start_free: 'फुकट सुरु करा',
      pricing_start_trial: 'फुकट चाचणी सुरु करा',
      pricing_most_popular: 'सर्वात लोकप्रिय',

      // Paywall
      paywall_title: 'प्रीमियमवर अपग्रेड करा',
      paywall_sub: 'सर्व 50 डिजिटल आरोग्य अभ्यासक्रमांपर्यंत पोहोचा',
      paywall_unlock: 'अनलॉक करा',
      paywall_and_more: 'आणि 44 प्रीमियम अभ्यासक्रम',
      paywall_continue_free: 'किंवा सुरू ठेवा',
      paywall_free_courses: '5 फुकट अभ्यासक्रम',

      // Presentation (critical — shown on every course slide)
      pres_start: 'प्रस्तुती सुरू करा',
      pres_close: 'बंद करा',
      pres_print: 'वर्कशीट प्रिंट करा',
      pres_prev: 'मागील स्लाइड',
      pres_next: 'पुढील स्लाइड',
      pres_exit: 'प्रस्तुतीमधून बाहेर पडा',
      pres_play: 'चालवा',
      pres_pause: 'थांबवा',
      pres_replay: 'पुन्हा ऐका',

      // Dashboard
      dash_parent: 'पालक डॅशबोर्ड',
      dash_teacher: 'शिक्षक डॅशबोर्ड',
      dash_welcome: 'परत स्वागत आहे',
      dash_courses_done: 'पूर्ण केलेले',
      dash_day_streak: 'सलग दिवस',
      dash_badges: 'बॅजेस',
      dash_minutes: 'मिनिटे',
      dash_children: 'तुमची मुले',
      dash_add_child: 'मूल जोडा',
      dash_badges_title: 'बॅजेस आणि कामगिरी',
      dash_progress: 'अभ्यासक्रम प्रगती',
      dash_account: 'खाते',
      dash_logout: 'लॉग आउट',
      dash_back: 'अभ्यासक्रमांकडे परत',

      // Gamification
      xp_level_up: 'लेव्हल अप! आता तुम्ही आहात',
      xp_daily_challenge: 'दैनिक आव्हान',

      // About
      about_title: 'GetDeaddicted Academy बद्दल',
      about_safe: 'सर्व वयांसाठी सुरक्षित (5+)',
      about_fun: 'मजेदार, आकर्षक धडे',
      about_voice: 'आवाज नॅरेशन समाविष्ट',
      about_progress: 'प्रगती ट्रॅकिंग आणि बॅजेस',
      about_dashboard: 'पालक डॅशबोर्ड',
      about_works: 'फोन आणि संगणकावर चालते',

      // Social proof
      testimonials_title: 'कुटुंब काय सांगतात',
      testimonials_sub: 'खऱ्या कुटुंबांकडून खरे परिणाम',
      comparison_title: 'GetDeaddicted का?',
      comparison_sub: 'मुलांच्या स्क्रीन आरोग्यासाठी बनवलेला एकमेव प्लॅटफॉर्म',
      faq_title: 'वारंवार विचारले जाणारे प्रश्न',

      // Coach
      coach_title: 'आरोग्य प्रशिक्षक',
      coach_powered: 'AI-संचालित',
      coach_placeholder: 'डिजिटल आरोग्याबद्दल काहीही विचारा...',

      // Referral
      referral_title: 'एक महिना द्या, एक महिना मिळवा',
      referral_sub: 'मित्रांसोबत तुमचा कोड शेअर करा. जेव्हा ते साइन अप करतात, दोघांना एक महिना प्रीमियम फुकट मिळतो!',

      // Footer
      footer_privacy: 'गोपनीयता',
      footer_terms: 'अटी',
      footer_contact: 'संपर्क',
      footer_copyright: '© 2026 GetDeaddicted LLC. सर्व हक्क राखीव.',
      footer_tagline: 'तुमचा स्क्रीन वेळ, तुमचे नियम.',

      loading: 'अभ्यासक्रम लोड होत आहेत...',
      consent_text: 'आम्ही तुमची प्रगती जतन करण्यासाठी localStorage वापरतो. कुकीज नाहीत, ट्रॅकिंग नाही, डेटा विकला जात नाही.',
      consent_accept: 'समजले',
    }
  };

  function init() {
    _locale = localStorage.getItem(STORAGE_KEY) || _detectLocale();
    _renderLanguageSwitcher();
  }

  function _detectLocale() {
    const lang = (navigator.language || 'en').toLowerCase();
    if (lang.startsWith('hi')) return 'hi';
    if (lang.startsWith('mr')) return 'mr';
    if (lang.startsWith('es')) return 'es';
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('Asia/Kolkata') || tz.startsWith('Asia/Calcutta')) return 'hi';
    return 'en';
  }

  function setLocale(locale) {
    if (!TRANSLATIONS[locale]) return;
    _locale = locale;
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    _renderLanguageSwitcher();
  }

  function getLocale() { return _locale; }

  function t(key, fallback) {
    return TRANSLATIONS[_locale]?.[key] || TRANSLATIONS.en?.[key] || fallback || key;
  }

  function getAvailableLocales() {
    return Object.keys(TRANSLATIONS).map(code => ({
      code,
      name: ({ en: 'English', es: 'Español', hi: 'हिन्दी', mr: 'मराठी' })[code] || code
    }));
  }

  function _renderLanguageSwitcher() {
    const el = document.getElementById('langSwitcher');
    if (!el) return;
    const locales = getAvailableLocales();
    el.innerHTML = locales.map(l =>
      `<button class="lang-btn ${l.code === _locale ? 'active' : ''}" onclick="I18n.setLocale('${l.code}')">${l.name}</button>`
    ).join('');
  }

  function addTranslation(locale, translations) {
    if (!TRANSLATIONS[locale]) TRANSLATIONS[locale] = {};
    Object.assign(TRANSLATIONS[locale], translations);
  }

  return { init, setLocale, getLocale, t, getAvailableLocales, addTranslation };
})();
