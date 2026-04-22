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
    }
  };

  function init() {
    _locale = localStorage.getItem(STORAGE_KEY) || _detectLocale();
    _renderLanguageSwitcher();
  }

  function _detectLocale() {
    const lang = (navigator.language || 'en').toLowerCase();
    if (lang.startsWith('es')) return 'es';
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
      name: code === 'en' ? 'English' : code === 'es' ? 'Espa\u00f1ol' : code
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
