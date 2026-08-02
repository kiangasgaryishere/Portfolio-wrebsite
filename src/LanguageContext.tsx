import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fa';

export interface ProjectDataI18n {
  id: string;
  title: string;
  category: string;
  year: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  stats: string;
}

export interface FifaAttributeI18n {
  id: string;
  code: string;
  name: string;
  val: number;
  strength: string;
  weakness: string;
  iconName: string;
  category: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRtl: boolean;
  projects: ProjectDataI18n[];
  fifaAttributes: FifaAttributeI18n[];
  roles: string[];
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    hey_im: "Hey, I'm a",
    menu: 'Menu',
    close: 'Close',
    accent_mode: 'Accent Theme Mode',
    language_btn_fa: 'فارسی',
    language_btn_en: 'EN',

    // Hero Heading & Content
    hero_name: 'KIAN GASGARY',
    years_exp_num: '7+',
    years_exp_label: 'Years Engineering',
    workflow_num: '0 → 1',
    workflow_label: 'Workflow Journey',
    hero_bio:
      'Full-stack engineer defined by first-principles problem solving, empathetic teamwork, and meticulous craftsmanship. Driven to turn complex technical challenges into fluid, high-performance web experiences.',

    // Portrait / About
    about_me: 'ABOUT ME',
    portrait_bio:
      'I build fast, scalable, and user-friendly web applications that bridge creative art direction with robust software engineering architecture.',

    // Scroll
    scroll: 'SCROLL',

    // Menu Drawer
    main_sections: 'Main Sections',
    project_showcase_hover: 'Project Showcase (Hover to Preview)',
    interactive_visuals: '3 Interactive Visuals',
    open_project_showcase: 'Open Project Showcase',
    visit_live_url: 'Visit Live URL',

    // Workflow
    workflow_step1_title: '01. Discovery & Research',
    workflow_step1_desc: 'Understanding the zero state, mapping requirements, and analyzing user needs.',
    workflow_step2_title: '02. Architecture & Planning',
    workflow_step2_desc: 'Choosing the right stack, designing systems, and defining modular boundaries.',
    workflow_step3_title: '03. Development & Iteration',
    workflow_step3_desc: 'Writing clean code, constant testing, and building the core logic.',
    workflow_step4_title: '04. Polish & Delivery',
    workflow_step4_desc: 'Adding animations, tuning performance, and final launch preparations.',

    // Sections
    sec_01_title: 'Workflow',
    sec_1_title: 'Workflow',
    sec_01_sub: 'My journey from zero',
    sec_1_sub: 'My journey from zero',
    sec_02_title: 'Techs & Tools',
    sec_2_title: 'Techs & Tools',
    sec_02_sub: 'React, Node, WebGL, Tailwind',
    sec_2_sub: 'React, Node, WebGL, Tailwind',
    sec_03_title: 'About Me',
    sec_3_title: 'About Me',
    sec_03_sub: 'Editorial Design & Clean Code',
    sec_3_sub: 'Editorial Design & Clean Code',
    sec_04_title: 'Contact',
    sec_4_title: 'Contact',
    sec_04_sub: 'info@brunosimon.com',
    sec_4_sub: 'info@brunosimon.com',

    // Showcase Modal - Featured Projects
    visit_demo: 'Visit Demo',

    // Architecture & Stack
    frontend_stack_title: 'Frontend & Graphics Stack',
    frontend_stack_desc:
      'React 19, TypeScript, Tailwind CSS v4, WebGL, Three.js, Custom GLSL Shaders, Motion animations, and Vite fast runtime.',
    backend_stack_title: 'Backend & Infrastructure',
    backend_stack_desc:
      'Node.js, Express, WebSockets state sync, Serverless Cloud Run containers, Docker, Redis, and high availability hosting.',
    stack_filter_all: 'All Stack & Technologies',
    stack_filter_frontend: 'Frontend & UI',
    stack_filter_graphics: 'Graphics & 3D WebGL',
    stack_filter_backend: 'Backend & Database',
    stack_filter_devops: 'DevOps & Cloud',
    arch_highlights_title: 'Architectural Standards & Engineering Principles',
    arch_h1_title: '100% End-to-End Type Safety',
    arch_h1_desc: 'Strict TypeScript interfaces across API payloads, database models, and UI components eliminating runtime type errors.',
    arch_h2_title: 'Micro-Benchmarked 60FPS WebGL',
    arch_h2_desc: 'Optimized geometry batching, custom GLSL shaders, texture compression, and memory management for silky smooth 3D graphics.',
    arch_h3_title: 'Real-Time Event-Driven Sync',
    arch_h3_desc: 'Low-latency WebSockets, optimistic UI updates, and conflict resolution for multi-user real-time experiences.',
    arch_h4_title: 'Containerized Serverless Cloud',
    arch_h4_desc: 'Automated multi-stage Docker builds and Google Cloud Run auto-scaling with high availability and fast cold starts.',

    // Biography & Philosophy
    available: 'AVAILABLE',
    work_character: 'WORK CHARACTER',
    creative_role: 'Creative Full Stack Engineer & UI/UX Specialist',
    bio_philosophy_text:
      'A problem solver at heart, I bridge product vision, frontend craft, and robust backend engineering. I thrive in collaborative environments where clear communication, empathy, and technical rigor turn ambitious ideas into polished digital realities.',
    team_first: 'Team First & Empathetic',
    first_principles_pill: 'First-Principles Problem Solver',
    arch_rigor_pill: 'Architectural Rigor',
    ownership_pill: 'End-to-End Ownership',
    how_i_work_title: 'How I Work & Team Culture',

    // Pillars
    pillar_1_title: 'Team Synergy & Collaboration',
    pillar_1_desc:
      'An active listener and empathetic peer. I champion transparent communication, pair programming, constructive code reviews, and creating a psychologically safe space where every teammate prospers.',

    pillar_2_title: 'First-Principles Problem Solving',
    pillar_2_desc:
      'I break down complex, ambiguous technical bottlenecks into fundamental components. Instead of patching symptoms, I analyze systemic root causes to build clean, predictable, permanent fixes.',

    pillar_3_title: 'Clean Code & Architectural Rigor',
    pillar_3_desc:
      'Writing self-documenting, type-safe TypeScript code designed for long-term maintainability. I enforce strict modular boundaries, low coupling, and seamless state predictability.',

    pillar_4_title: 'Extreme Ownership & Product Mindset',
    pillar_4_desc:
      'Taking full accountability from napkin design to production stability. I think like a product owner, anticipating edge cases, user friction, and accessibility nuances early.',

    // FIFA Radar
    fifa_radar_title: 'Working Style & FIFA Player Attribute Radar',
    fut_badge: 'FUT 96 OVR • FSD',
    fifa_hint: '* Tap any vertex or stat code to inspect working strengths & growth areas',
    rating: 'RATING',
    core_strength_label: 'CORE WORKING STRENGTH',
    growth_area_label: 'GROWTH AREA & WEAKNESS',

    // Quotes
    quotes_title: 'Engineering & Team Philosophy Quotes',
    quote_1: '“Code is written for human teammates to read first, and compilers to execute second.”',
    quote_1_author: '— Clean Code Ethos',
    quote_2: '“Great software is never a solo achievement; empathetic teamwork compounds engineering impact.”',
    quote_2_author: '— Team Culture',
    quote_3: '“Simplicity and clarity trump clever complexity every single time.”',
    quote_3_author: '— First Principles',

    // Contact
    contact_title: 'Get in Touch & Collaborate',
    contact_desc:
      'Currently open for select high-impact full-stack consulting, creative technology direction, 3D WebGL experiences, and custom web app engineering. Feel free to reach out directly via email or connect on social platforms below.',
    direct_email: 'DIRECT EMAIL:',
    send_email: 'Send Email',
    social_title: 'Social Media & Channels',

    // Toast Messages
    section_selected: 'Section opened: ',
    copied_to_clipboard: 'Copied to clipboard!',
    theme_applied: 'Theme applied: ',
  },
  fa: {
    // Navbar
    hey_im: 'سلام، من یک',
    menu: 'منو',
    close: 'بستن',
    accent_mode: 'حالت رنگ تم',
    language_btn_fa: 'فارسی',
    language_btn_en: 'EN',

    // Hero Heading & Content
    hero_name: 'کیان گاسگری',
    years_exp_num: '+۷',
    years_exp_label: 'سال تجربه مهندسی',
    workflow_num: '۰ → ۱',
    workflow_label: 'سفر و روند کار',
    hero_bio:
      'مهندس فول‌استک مبتنی بر حل مسئله از اصول اولیه، کار تیمی همدلانه و ظرافت فوق‌العاده در ساخت. مشتاق تبدیل چالش‌های فنی پیچیده به تجربه‌های وب روان، پرسرعت و مدرن.',

    // Portrait / About
    about_me: 'درباره من',
    portrait_bio:
      'من وب‌اپلیکیشن‌های سریع، مقیاس‌پذیر و کاربرپسند می‌سازم که مدیریت هنری خلاقانه را با معماری مهندسی نرم‌افزار قدرتمند پیوند می‌دهد.',

    // Scroll
    scroll: 'اسکرول',

    // Menu Drawer
    main_sections: 'بخش‌های اصلی',
    project_showcase_hover: 'ویترین پروژه‌ها (نگه‌داشتن ماوس برای پیش‌نمایش)',
    interactive_visuals: '۳ جلوه تصویری تعاملی',
    open_project_showcase: 'باز کردن ویترین پروژه',
    visit_live_url: 'مشاهده لینک زنده',

    // Workflow
    workflow_step1_title: 'فاز ۱: اکتشاف و تحقیق',
    workflow_step1_desc: 'درک وضعیت اولیه، نقشه‌برداری نیازمندی‌ها و تحلیل نیازهای کاربر.',
    workflow_step2_title: 'فاز ۲: معماری و برنامه‌ریزی',
    workflow_step2_desc: 'انتخاب تکنولوژی مناسب، طراحی سیستم‌ها و تعیین مرزهای ماژولار.',
    workflow_step3_title: 'فاز ۳: توسعه و تکرار',
    workflow_step3_desc: 'نوشتن کد تمیز، آزمایش مداوم و پیاده‌سازی منطق اصلی.',
    workflow_step4_title: 'فاز ۴: پرداخت نهایی و تحویل',
    workflow_step4_desc: 'افزودن انیمیشن‌ها، تنظیم عملکرد و آماده‌سازی برای انتشار نهایی.',

    // Sections
    sec_01_title: 'روند کار',
    sec_1_title: 'روند کار',
    sec_01_sub: 'سفر من از صفر',
    sec_1_sub: 'سفر من از صفر',
    sec_02_title: 'تکنولوژی‌ها و ابزارها',
    sec_2_title: 'تکنولوژی‌ها و ابزارها',
    sec_02_sub: 'ری‌اکت، نود، WebGL، تیل‌ویند',
    sec_2_sub: 'ری‌اکت، نود، WebGL، تیل‌ویند',
    sec_03_title: 'درباره من',
    sec_3_title: 'درباره من',
    sec_03_sub: 'طراحی ساختاریافته و کد تمیز',
    sec_3_sub: 'طراحی ساختاریافته و کد تمیز',
    sec_04_title: 'ارتباط',
    sec_4_title: 'ارتباط',
    sec_04_sub: 'info@brunosimon.com',
    sec_4_sub: 'info@brunosimon.com',

    // Showcase Modal - Featured Projects
    visit_demo: 'مشاهده دمو',

    // Architecture & Stack
    frontend_stack_title: 'تکنولوژی فرانت‌اند و گرافیک',
    frontend_stack_desc:
      'ری‌اکت ۱۹، تایپ‌اسکریپت، تیل‌ویند نسخه ۴، WebGL، Three.js، شیدرهای اختصاصی GLSL، انیمیشن‌های موشن و محیط سریع Vite.',
    backend_stack_title: 'بک‌اند و زیرساخت',
    backend_stack_desc:
      'نود جی‌اس، اکسپرس، همگام‌سازی وب‌سوکت، کانتینرهای بدون سرور Cloud Run، داکر، ردیس و هاستینگ با پایداری بالا.',
    stack_filter_all: 'همه تکنولوژی‌ها',
    stack_filter_frontend: 'فرانت‌اند و UI',
    stack_filter_graphics: 'گرافیک و سه‌بعدی WebGL',
    stack_filter_backend: 'بک‌اند و دیتابیس',
    stack_filter_devops: 'دِوآپس و ابر',
    arch_highlights_title: 'استانداردهای معماری و اصول مهندسی',
    arch_h1_title: 'معماری ۱۰۰٪ تایپ-سیف',
    arch_h1_desc: 'تعریف دقیق تایپ‌اسکریپت در سرتاسر API، مدل‌های دیتابیس و کامپوننت‌های UI جهت حذف خطاهای زمان اجرا.',
    arch_h2_title: 'عملکرد ۶۰ فریم بر ثانیه در WebGL',
    arch_h2_desc: 'بهینه‌سازی دسته‌ای هندسه‌ها، شیدرهای اختصاصی GLSL، فشرده‌سازی بافت‌ها و مدیریت حافظه برای گرافیک سه‌بعدی بسیار روان.',
    arch_h3_title: 'همگام‌سازی رویدادمحور و لحظه‌ای',
    arch_h3_desc: 'وب‌سوکت با تاخیر کم، به‌روزرسانی‌های خوش‌بینانه رابط کاربری و مدیریت تعارض برای همکارهای همزمان چند کاربر.',
    arch_h4_title: 'استقرار کانتینری در فضای ابری',
    arch_h4_desc: 'ساخت چندمرحله‌ای داکر و مقیاس‌پذیری خودکار Cloud Run گوگل با پایداری بالا و اجرای بسیار سریع.',

    // Biography & Philosophy
    available: 'آماده به کار',
    work_character: 'ویژگی‌های کاری',
    creative_role: 'مهندس ارشد فول‌استک خلاق و متخصص UI/UX',
    bio_philosophy_text:
      'یک حل‌کننده مسئله در جوهر خود؛ من چشم‌انداز محصول، هنر فرانت‌اند و مهندسی بک‌اند قدرتمند را پیوند می‌دهم. در محیط‌های تیمی با ارتباط شفاف، همدلی و دقت فنی، ایده‌های جاه‌طلبانه را به واقعیت دیجیتالی تبدیل می‌کنم.',
    team_first: 'اولویت تیم و همدلی',
    first_principles_pill: 'حل مسئله از اصول اولیه',
    arch_rigor_pill: 'دقت در معماری',
    ownership_pill: 'مسئولیت‌پذیری کامل',
    how_i_work_title: 'نحوه کار من و فرهنگ تیمی',

    // Pillars
    pillar_1_title: 'هم‌افزایی و همکاری تیمی',
    pillar_1_desc:
      'شنونده فعال و همکار همدل. من مروج ارتباط شفاف، برنامه‌نویسی دونفره، بازبینی سازنده کد و ایجاد محیطی امن برای رشد هم‌تیمی‌ها هستم.',

    pillar_2_title: 'حل مسئله از اصول اولیه',
    pillar_2_desc:
      'تنگناهای فنی پیچیده را به اجزای بنیادی خرد می‌کنم. به‌جای درمان موقت نشانه‌ها، علل ریشه‌ای سیستماتیک را تحلیل کرده و راهکارهای تمیز و دائمی می‌سازم.',

    pillar_3_title: 'کد تمیز و دقت در معماری',
    pillar_3_desc:
      'نوشتن کد خودتوصیف‌کننده و تایپ‌سایف در تایپ‌اسکریپت برای نگهداری بلندمدت. مرزهای ماژولار شفاف، وابستگی کم و قابلیت پیش‌بینی حالت سیستم را رعایت می‌کنم.',

    pillar_4_title: 'مسئولیت‌پذیری کامل و تفکر محصولی',
    pillar_4_desc:
      'پذیرش مسئولیت کامل از طرح اولیه تا پایداری در محیط واقعی. مانند صاحب محصول فکر کرده و اصطکاک کاربر و نکات دسترسی‌پذیری را زودتر پیش‌بینی می‌کنم.',

    // FIFA Radar
    fifa_radar_title: 'سبک کاری و رادار ویژگی‌های بازیکنی (FIFA)',
    fut_badge: 'امتیاز کل ۹۶ • FSD',
    fifa_hint: '* روی هر نقطه یا کد ویژگی کلیک کنید تا نقاط قوت و زمینه‌های رشد را بررسی کنید',
    rating: 'امتیاز',
    core_strength_label: 'نقطه قوت اصلی کاری',
    growth_area_label: 'زمینه رشد و بهبود',

    // Quotes
    quotes_title: 'نقل‌قول‌های فلسفه مهندسی و تیمی',
    quote_1: '«کد ابتدا برای خوانده شدن توسط همکاران نوشته می‌شود و در درجه دوم برای اجرا توسط کامپایلر.»',
    quote_1_author: '— باور کد تمیز',
    quote_2: '«نرم‌افزار عالی هرگز یک دستاورد فردی نیست؛ کار تیمی همدلانه تاثیر مهندسی را چندبرابر می‌کند.»',
    quote_2_author: '— فرهنگ تیمی',
    quote_3: '«سادگی و وضوح همیشه بر پیچیدگی هوشمندانه ترجیح دارد.»',
    quote_3_author: '— اصول اولیه',

    // Contact
    contact_title: 'ارتباط و شروع همکاری',
    contact_desc:
      'در حال حاضر آماده پذیرش پروژه‌های فول‌استک، مدیریت فناوری خلاقانه، تجربه‌های ۳ بعدی WebGL و مهندسی وب‌اپلیکیشن‌های سفارشی. می‌توانید مستقیماً از طریق ایمیل یا شبکه‌های اجتماعی زیر ارتباط برقرار کنید.',
    direct_email: 'ایمیل مستقیم:',
    send_email: 'ارسال ایمیل',
    social_title: 'شبکه‌های اجتماعی و کانال‌ها',

    // Toast Messages
    section_selected: 'بخش باز شد: ',
    copied_to_clipboard: 'در حافظه کپی شد!',
    theme_applied: 'تم اعمال شد: ',
  },
};

const rolesByLang: Record<Language, string[]> = {
  en: ['fullstack developer', 'UI/UX designer', 'product manager', 'frontend developer'],
  fa: ['توسعه‌دهنده فول‌استک', 'طراح UI/UX', 'مدیر محصول', 'توسعه‌دهنده فرانت‌اند'],
};

const projectsData: Record<Language, ProjectDataI18n[]> = {
  en: [
    {
      id: 'proj-1',
      title: 'Bruno Simon 3D Portfolio',
      category: '3D & WebGL',
      year: '2025',
      subtitle: 'Interactive 3D Driving Game Experience',
      description:
        'Iconic web interactive portfolio with custom physics engine, shaders, and vehicle controls built in WebGL.',
      tech: ['Three.js', 'WebGL', 'Cannon.js', 'React 19'],
      image: '/assets/images/project_3d_driving_1784808927002.jpg',
      link: 'https://bruno-simon.com',
      stats: '60 FPS WebGL',
    },
    {
      id: 'proj-2',
      title: 'Three.js Journey Masterclass',
      category: 'Course & Graphics',
      year: '2024-2025',
      subtitle: 'The Ultimate 3D Web Development Course',
      description:
        'World-renowned masterclass teaching modern WebGL, GLSL shaders, Blender baking, and performance optimization.',
      tech: ['WebGL', 'GLSL Shaders', 'Blender', 'TypeScript'],
      image: '/assets/images/project_threejs_course_1784808938523.jpg',
      link: 'https://threejs-journey.com',
      stats: '50,000+ Students',
    },
    {
      id: 'proj-3',
      title: 'Realtime WebGL Workspace',
      category: 'Full Stack App',
      year: '2025',
      subtitle: 'Collaborative Node Graph & Canvas Engine',
      description:
        'Ultra low-latency collaborative digital workspace with high performance WebGL canvas rendering and WebSocket synchronization.',
      tech: ['Node.js', 'Express', 'WebSockets', 'Tailwind CSS'],
      image: '/assets/images/project_realtime_canvas_1784808950837.jpg',
      link: 'https://github.com/brunosimon',
      stats: '<15ms Latency',
    },
  ],
  fa: [
    {
      id: 'proj-1',
      title: 'پورتفولیو ۳ بعدی برونو سیمون',
      category: '۳ بعدی و WebGL',
      year: '۲۰۲۵',
      subtitle: 'تجربه بازی رانندگی ۳ بعدی تعاملی',
      description:
        'پورتفولیو تعاملی شاخص وب با موتور فیزیک اختصاصی، شیدرها و کنترل خودرو ساخته شده با WebGL.',
      tech: ['Three.js', 'WebGL', 'Cannon.js', 'React 19'],
      image: '/assets/images/project_3d_driving_1784808927002.jpg',
      link: 'https://bruno-simon.com',
      stats: 'نرخ ۶0 فریم WebGL',
    },
    {
      id: 'proj-2',
      title: 'دوره مسترکلاس Three.js Journey',
      category: 'دوره آموزشی و گرافیک',
      year: '۲۰۲۴-۲۰۲۵',
      subtitle: 'جامع‌ترین دوره توسعه وب ۳ بعدی',
      description:
        'مسترکلاس جهانی آموزش WebGL مدرن، شیدرهای GLSL، پخت بلندر و بهینه‌سازی عملکرد.',
      tech: ['WebGL', 'GLSL Shaders', 'Blender', 'TypeScript'],
      image: '/assets/images/project_threejs_course_1784808938523.jpg',
      link: 'https://threejs-journey.com',
      stats: 'بیش از ۵۰,۰۰۰ دانشجو',
    },
    {
      id: 'proj-3',
      title: 'فضای کاری همزمان WebGL',
      category: 'برنامه فول‌استک',
      year: '۲۰۲۵',
      subtitle: 'موتور بوم و گراف نود تعاملی',
      description:
        'فضای کاری دیجیتال با تاخیر بسیار کم، رندر بوم WebGL پرسرعت و همگام‌سازی وب‌سوکت.',
      tech: ['Node.js', 'Express', 'WebSockets', 'Tailwind CSS'],
      image: '/assets/images/project_realtime_canvas_1784808950837.jpg',
      link: 'https://github.com/brunosimon',
      stats: 'تاخیر زیر ۱۵ میلی‌ثانیه',
    },
  ],
};

const fifaAttributesData: Record<Language, FifaAttributeI18n[]> = {
  en: [
    {
      id: 'prb',
      code: 'PRB',
      name: 'Problem Solving',
      val: 98,
      strength:
        'Excels at first-principles breakdown of complex algorithms, root-cause isolation, and mathematical logic simplification.',
      weakness:
        'Tendency to dive straight into deep code profiling before whiteboarding step-by-step consensus with non-technical team members.',
      iconName: 'Lightbulb',
      category: 'Mental & Logic',
    },
    {
      id: 'tea',
      code: 'TEA',
      name: 'Teamwork & Synergy',
      val: 96,
      strength:
        'Empathetic listener, active mentor, proactive communicator, and advocate for psychological safety in PR reviews.',
      weakness:
        'Can over-invest time writing exhaustive documentation and mentoring guides when rapid exploratory prototyping is needed.',
      iconName: 'HeartHandshake',
      category: 'Culture & Synergy',
    },
    {
      id: 'uix',
      code: 'UIX',
      name: 'UI/UX Polish',
      val: 95,
      strength:
        'Crafts fluid Motion animations, tactile micro-interactions, responsive touch geometry, and WCAG AA contrast accessibility.',
      weakness:
        'Susceptible to perfectionism in micro-animation easing curves; relies on time-boxed design constraints to maintain delivery cadence.',
      iconName: 'Sparkles',
      category: 'Craft & Motion',
    },
    {
      id: 'arc',
      code: 'ARC',
      name: 'Architecture',
      val: 94,
      strength:
        'Enforces strict TypeScript boundaries, decoupled modular state, low memory footprint, and scalable component hierarchies.',
      weakness:
        'Strong preference for static typing and strict lint rules can feel overly rigid when rapidly testing hackathon proof-of-concepts.',
      iconName: 'Code2',
      category: 'System & Code',
    },
    {
      id: 'own',
      code: 'OWN',
      name: 'Product Ownership',
      val: 96,
      strength:
        'Takes complete end-to-end accountability from raw product vision to cloud deployment, anticipating user friction early.',
      weakness:
        'Eager to fix all edge-case bugs simultaneously; utilizes product roadmap prioritization to balance scope with deadlines.',
      iconName: 'Target',
      category: 'Leadership & Delivery',
    },
    {
      id: 'ada',
      code: 'ADA',
      name: 'Adaptability',
      val: 97,
      strength:
        'Rapidly absorbs emerging graphics engines, WebGL, serverless infrastructure, and LLM/AI workflows into production.',
      weakness:
        'High enthusiasm for bleeding-edge frameworks requires deliberate evaluation against ecosystem maturity and long-term support.',
      iconName: 'Zap',
      category: 'Velocity & Innovation',
    },
  ],
  fa: [
    {
      id: 'prb',
      code: 'PRB',
      name: 'حل مسئله',
      val: 98,
      strength:
        'در خرد کردن الگوریتم‌های پیچیده از اصول اولیه، ریشه‌یابی و ساده‌سازی منطق ریاضی بسیار تواناست.',
      weakness:
        'تمایل به ورود مستقیم به اشکال‌زدایی کد قبل از ترسیم و هماهنگی گام به گام با اعضای غیرفنی تیم.',
      iconName: 'Lightbulb',
      category: 'تفکر و منطق',
    },
    {
      id: 'tea',
      code: 'TEA',
      name: 'کار تیمی و هم‌افزایی',
      val: 96,
      strength:
        'شنونده همدل، مربی فعال، ارتباط‌دهنده پیشگام و حامی فضای امن در بازبینی کدهای جدید.',
      weakness:
        'ممکن است هنگام نیاز به نمونه‌سازی سریع، زمان زیادی را صرف مستندسازی کامل و راهنماهای آموزشی کند.',
      iconName: 'HeartHandshake',
      category: 'فرهنگ و هم‌افزایی',
    },
    {
      id: 'uix',
      code: 'UIX',
      name: 'ظرافت UI/UX',
      val: 95,
      strength:
        'انیمیشن‌های روان موشن، تعاملات ریز لمسی، هندسه واکنش‌گرا و دسترسی‌پذیری کنتراست عالی می‌سازد.',
      weakness:
        'حساسیت زیاد روی منحنی‌های نرم انیمیشن؛ برای حفظ سرعت تحویل از محدودیت‌های زمانی طراحی استفاده می‌کند.',
      iconName: 'Sparkles',
      category: 'هنر و انیمیشن',
    },
    {
      id: 'arc',
      code: 'ARC',
      name: 'معماری سیستم',
      val: 94,
      strength:
        'مرزهای دقیق تایپ‌اسکریپت، حالت ماژولار مستقل، مصرف حافظه کم و ساختار کامپوننت مقیاس‌پذیر را پیاده می‌کند.',
      weakness:
        'ترجیح قوی برای کدهای تایپ‌شده و قوانین سخت‌گیرانه لینتر هنگام تست سریع پروتوتایپ‌ها قدری سخت‌گیرانه است.',
      iconName: 'Code2',
      category: 'سیستم و کد',
    },
    {
      id: 'own',
      code: 'OWN',
      name: 'صاحب محصول',
      val: 96,
      strength:
        'مسئولیت کامل سرتاسری از ایده‌پردازی تا انتشار ابری را بر عهده گرفته و چالش‌های کاربر را زود تشخیص می‌دهد.',
      weakness:
        'اشتیاق زیاد برای حل همزمان تمام باگ‌های استثنایی؛ از اولویت‌بندی نقشه راه برای حفظ ددلاین استفاده می‌کند.',
      iconName: 'Target',
      category: 'رهبری و تحویل',
    },
    {
      id: 'ada',
      code: 'ADA',
      name: 'انعطاف‌پذیری',
      val: 97,
      strength:
        'موتورهای گرافیکی جدید، WebGL، زیرساخت‌های بدون سرور و ابزارهای هوش مصنوعی را به سرعت جذب می‌کند.',
      weakness:
        'اشتیاق بالا برای فریم‌ورک‌های جدید مستلزم ارزیابی دقیق پایداری و پشتیبانی بلندمدت آنهاست.',
      iconName: 'Zap',
      category: 'سرعت و نوآوری',
    },
  ],
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_lang');
      if (saved === 'fa' || saved === 'en') return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_lang', lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fa' : 'en');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.dir = language === 'fa' ? 'rtl' : 'ltr';
      root.lang = language;
      if (language === 'fa') {
        root.classList.add('lang-fa');
      } else {
        root.classList.remove('lang-fa');
      }
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const isRtl = language === 'fa';
  const projects = projectsData[language];
  const fifaAttributes = fifaAttributesData[language];
  const roles = rolesByLang[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isRtl,
        projects,
        fifaAttributes,
        roles,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
