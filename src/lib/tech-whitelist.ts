/**
 * Tech-Term Whitelist & Smart Developer Translator
 * Ensures developer keywords, frameworks, and architecture terms are NEVER
 * mangled or translated into awkward literal Indonesian or vice-versa.
 */

export const PROTECTED_TECH_TERMS: string[] = [
  'Full-Stack Developer',
  'Full-Stack',
  'Full Stack Developer',
  'Full Stack',
  'Frontend Developer',
  'Frontend',
  'Backend Developer',
  'Backend',
  'Next.js App Router',
  'Next.js Server Routes',
  'Next.js',
  'React.js',
  'React',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'TailwindCSS',
  'Tailwind',
  'Bootstrap',
  'Python',
  'Laravel',
  'PHP',
  'Node.js',
  'Express.js',
  'PostgreSQL',
  'MySQL',
  'SQLite',
  'Supabase',
  'Firebase',
  'Flutter',
  'Dart',
  'IndoBERTweet NLP',
  'IndoBERTweet',
  'IndoBERT',
  'MediaPipe / OpenCV',
  'MediaPipe',
  'OpenCV',
  'TensorFlow',
  'RESTful API',
  'RESTful APIs',
  'REST API',
  'REST APIs',
  'API',
  'APIs',
  'CRUD',
  'UI/UX',
  'State Management',
  'GetX',
  'Framer Motion',
  'Alpine.js',
  'Recharts',
  'Docker',
  'CI/CD',
  'Git',
  'GitHub',
  'Vercel',
  'WebP',
  'SEO-friendly',
  'SEO-optimized',
  'SEO',
  'NLP',
  'AI',
  'Computer Vision',
  'Machine Learning',
  'Deep Learning',
  'Real-Time',
  'Mobile App',
  'Web App',
  'SaaS',
  'Escrow',
  'P2P',
  'KYC',
  'Proof of Work',
  'Debugging',
  'Bug Fixing',
  'Dashboard',
  'Authentication',
  'Auth',
  'JWT',
  'OAuth',
];

// Curated full-sentence mappings to ensure 100% natural, fluent developer portfolio English
const EXACT_SENTENCE_MAPPINGS: Record<string, string> = {
  // Hero
  'Spesialisasi di Next.js, React, TypeScript & Laravel dengan integrasi AI.':
    'Specializing in Next.js, React, TypeScript & Laravel with AI integrations.',
  'FULL-STACK DEVELOPER': 'FULL-STACK DEVELOPER',
  'NEXT.JS & LARAVEL': 'NEXT.JS & LARAVEL',
  'Membangun aplikasi web modern': 'Building modern web applications',
  '& terukur.': '& scalable.',

  // About main subtext
  'Spesialisasi dalam pengembangan web end-to-end di ekosistem Next.js, React, dan Laravel, diperkaya integrasi model AI yang mulus.':
    'Specializing in end-to-end web development across Next.js, React, and Laravel ecosystems, enhanced with seamless AI model integrations.',

  // Services
  'Frontend & Next.js': 'Frontend & Next.js',
  'Backend & Laravel': 'Backend & Laravel',
  'Integrasi AI & Sistem': 'AI & System Integration',
  'Spesialisasi utama dalam Next.js App Router, React, TypeScript, dan Framer Motion untuk membangun aplikasi web yang cepat, interaktif, dan SEO-friendly.':
    'Primary specialization in Next.js App Router, React, TypeScript, and Framer Motion for building fast, interactive, and SEO-friendly web applications.',
  'Mengembangkan RESTful API yang andal, autentikasi aman, dan manajemen database terstruktur menggunakan Next.js Server Routes dan Laravel.':
    'Developing reliable RESTful APIs, secure authentication, and structured database management using Next.js Server Routes and Laravel.',
  'Mengintegrasikan model AI bahasa (IndoBERTweet NLP), computer vision (MediaPipe / OpenCV), dan third-party API ke dalam produk web full-stack.':
    'Integrating AI language models (IndoBERTweet NLP), computer vision (MediaPipe / OpenCV), and third-party APIs into full-stack web products.',

  // Values
  'Pendekatan': 'Approach',
  'Nilai Kerja': 'Work Values',
  'Mindset': 'Mindset',
  'Arsitektur kode bersih (clean code), komponen modular, dan user experience mulus yang digerakkan oleh modern web engineering.':
    'Clean code architecture, modular components, and seamless user experiences driven by modern web engineering.',
  'Konten dan logika bisnis adalah nyawa produk web. Desain modern dan arsitektur kode tangguh harus berjalan beriringan.':
    'Content and business logic are the core of web products. Modern design and robust code architecture must go hand-in-hand.',
  'Belajar berkelanjutan, iterasi hingga presisi, dan terus terdepan dengan inovasi Next.js serta integrasi AI.':
    'Continuous learning, iterating with precision, and staying ahead with Next.js and AI innovations.',

  // Works Titles & Categories
  'Athena Shield': 'Athena Shield',
  'Moderasi Komentar AI & YouTube API': 'AI Comment Moderation & YouTube API',
  'Sistem moderasi komentar YouTube otomatis menggunakan fine-tuned IndoBERTweet untuk deteksi judi online.':
    'Automated YouTube comment moderation system using fine-tuned IndoBERTweet model for online gambling detection.',

  'Yosma POS': 'Yosma POS',
  'Pemantauan Penjualan & Kasir POS (Next.js)': 'Sales Monitoring & POS (Next.js)',
  'Sistem web kasir digital & pemantauan penjualan dengan pengurangan inventaris otomatis dan visualisasi analitik.':
    'Digital cashier & sales monitoring web system with automated inventory deduction and analytics visualization.',

  'UPT Lab Perindustrian': 'UPT Industrial Lab',
  'Digitalisasi Layanan Web & UI/UX': 'Web Digitization & UI/UX',
  'Platform digitalisasi layanan internal untuk registrasi sampel dan manajemen hasil uji lab terpadu.':
    'Internal service digitization platform for sample registration and lab test result management.',

  'Silat Mastery': 'Silat Mastery',
  'Aplikasi Mobile & Deteksi Pose MediaPipe': 'Mobile App & MediaPipe Pose Detection',
  'Aplikasi pelatihan bela diri interaktif dengan estimasi pose waktu nyata menggunakan Google MediaPipe computer vision.':
    'Interactive martial arts training app with real-time pose estimation using Google MediaPipe computer vision.',

  'RecycleHub': 'RecycleHub',
  'Klasifikasi Sampah Plastik AI & OpenCV': 'AI Plastic Classification & OpenCV',
  'Model computer vision cerdas untuk klasifikasi jenis sampah plastik daur ulang secara akurat.':
    'AI model system classifying plastic waste types from user camera inputs.',

  'Freelance Web Solutions': 'Freelance Web Solutions',
  'Kustom Web WordPress & Laravel': 'WordPress & Laravel Custom Sites',
  'Koleksi website profil perusahaan responsif dan berkinerja tinggi yang dioptimalkan untuk kecepatan dan SEO.':
    'Custom corporate company profiles and personal portfolio sites optimized for speed & SEO.',
};

// Curated Indonesian -> English phrase mappings
const PHRASE_MAPPINGS: Array<[RegExp, string]> = [
  // Full compound phrases
  [/\bspesialisasi dalam pengembangan web end-to-end\b/gi, 'specializing in end-to-end web development'],
  [/\bpengembangan web end-to-end\b/gi, 'end-to-end web development'],
  [/\bdi ekosistem\b/gi, 'across the ecosystem of'],
  [/\bekosistem\b/gi, 'ecosystem'],
  [/\bdiperkaya integrasi model ai yang mulus\b/gi, 'enhanced with seamless AI model integrations'],
  [/\bdiperkaya integrasi model\b/gi, 'enhanced with the integration of models'],
  [/\bdiperkaya integrasi\b/gi, 'enhanced with the integration of'],
  [/\byang mulus\b/gi, 'seamless'],
  [/\bmulus\b/gi, 'seamless'],
  [/\bke dalam produk web\b/gi, 'into web products'],
  [/\bke dalam\b/gi, 'into'],
  [/\bspesialisasi utama dalam\b/gi, 'primary specialization in'],
  [/\bspesialisasi utama\b/gi, 'primary specialization'],
  [/\bspesialisasi dalam\b/gi, 'specializing in'],
  [/\bspesialisasi di\b/gi, 'specializing in'],
  [/\bspesialisasi\b/gi, 'specialization'],
  [/\bdengan integrasi ai\b/gi, 'with AI integrations'],
  [/\bmembangun aplikasi web modern\b/gi, 'building modern web applications'],
  [/\baplikasi web modern\b/gi, 'modern web applications'],
  [/\baplikasi web yang cepat, interaktif, dan seo-friendly\b/gi, 'fast, interactive, and SEO-friendly web applications'],
  [/\barsitektur kode bersih\b/gi, 'clean code architecture'],
  [/\bkomponen modular\b/gi, 'modular components'],
  [/\bkonten dan logika bisnis adalah nyawa produk web\b/gi, 'content and business logic are the core of web products'],
  [/\bkonten dan logika bisnis\b/gi, 'content and business logic'],
  [/\badalah nyawa produk web\b/gi, 'are the core of web products'],
  [/\badalah nyawa\b/gi, 'is the core of'],
  [/\bdesain modern dan arsitektur kode tangguh harus berjalan beriringan\b/gi, 'modern design and robust code architecture must go hand-in-hand'],
  [/\barsitektur kode tangguh\b/gi, 'robust code architecture'],
  [/\bkode tangguh\b/gi, 'robust code'],
  [/\bharus berjalan beriringan\b/gi, 'must go hand-in-hand'],
  [/\bberjalan beriringan\b/gi, 'go hand-in-hand'],
  [/\bbelajar berkelanjutan, iterasi hingga presisi\b/gi, 'continuous learning, iterating with precision'],
  [/\bbelajar berkelanjutan\b/gi, 'continuous learning'],
  [/\biterasi hingga presisi\b/gi, 'iterating with precision'],
  [/\bterus terdepan dengan inovasi\b/gi, 'staying ahead with innovations in'],
  [/\bterdepan dengan inovasi\b/gi, 'staying ahead with innovations in'],
  [/\bterdepan\b/gi, 'at the forefront'],
  [/\bnilai kerja\b/gi, 'work values'],
  [/\bpendekatan\b/gi, 'approach'],
  [/\bkeahlian\b/gi, 'capabilities'],
  [/\bfilosofi kerja\b/gi, 'work philosophy'],
  [/\bautentikasi aman\b/gi, 'secure authentication'],
  [/\bmanajemen database terstruktur\b/gi, 'structured database management'],
  [/\bmanajemen database\b/gi, 'database management'],
  [/\bproduk web full-stack\b/gi, 'full-stack web products'],
  [/\bproduk web\b/gi, 'web products'],
  [/\bterukur\b/gi, 'scalable'],
  [/\bandal\b/gi, 'reliable'],
  [/\bhandal\b/gi, 'reliable'],
  [/\binteraktif\b/gi, 'interactive'],
  [/\bberkinerja tinggi\b/gi, 'high-performance'],
  [/\bramah pengguna\b/gi, 'user-friendly'],
  [/\bdigerakkan oleh\b/gi, 'driven by'],
  [/\bsecara real-time\b/gi, 'in real-time'],
  [/\bwaktu nyata\b/gi, 'real-time'],
  [/\botomatis\b/gi, 'automated'],
  [/\bsecara otomatis\b/gi, 'automatically'],
  [/\bterpadu\b/gi, 'integrated'],
  [/\bsecara akurat\b/gi, 'accurately'],
  [/\bakurat\b/gi, 'accurate'],
  [/\bkustom\b/gi, 'custom'],
  [/\bkecepatan\b/gi, 'speed'],

  // Portfolio project domain terms
  [/\bmoderasi komentar otomatis\b/gi, 'automated comment moderation'],
  [/\bmoderasi komentar\b/gi, 'comment moderation'],
  [/\bdeteksi judi online\b/gi, 'online gambling detection'],
  [/\bkasir digital\b/gi, 'digital point of sale & cashier'],
  [/\bpemantauan penjualan\b/gi, 'sales monitoring'],
  [/\bpengurangan inventaris otomatis\b/gi, 'automated inventory deduction'],
  [/\bvisualisasi analitik\b/gi, 'analytics visualization'],
  [/\bdigitalisasi layanan internal\b/gi, 'internal service digitization'],
  [/\bregistrasi sampel\b/gi, 'sample registration'],
  [/\bmanajemen hasil uji lab\b/gi, 'lab test result management'],
  [/\bpembelajaran bela diri interaktif\b/gi, 'interactive martial arts training'],
  [/\bpembelajaran bela diri\b/gi, 'martial arts training'],
  [/\bestimasi pose waktu nyata\b/gi, 'real-time pose estimation'],
  [/\bestimasi pose\b/gi, 'pose estimation'],
  [/\bklasifikasi sampah plastik\b/gi, 'plastic waste classification'],
  [/\bklasifikasi jenis plastik\b/gi, 'plastic type classification'],
  [/\bberbasis geolokasi\b/gi, 'geolocation-based'],
  [/\bsistem absensi digital\b/gi, 'digital attendance system'],
  [/\bmanajemen karyawan\b/gi, 'employee management'],
  [/\bplatform e-commerce kacamata premium\b/gi, 'premium eyewear e-commerce platform'],
  [/\bkacamata premium\b/gi, 'premium eyewear'],
  [/\bprinsip interaksi manusia-komputer\b/gi, 'human-computer interaction principles'],
  [/\bstudi kasus figma\b/gi, 'Figma case study'],
  [/\bprototipe interaktif\b/gi, 'interactive prototype'],
  [/\barsitektur informasi\b/gi, 'information architecture'],
  [/\bpasar mikro-jasa p2p\b/gi, 'P2P micro-gig marketplace'],
  [/\bplatform mobile kolaboratif\b/gi, 'collaborative mobile platform'],
  [/\btransaksi penampung\b/gi, 'escrow transaction'],
  [/\bpenyelesaian sengketa\b/gi, 'dispute resolution'],
  [/\bmesin api restful\b/gi, 'RESTful API engine'],
  [/\bkonsol admin\b/gi, 'admin console'],
  [/\bgame petualangan labirin 3d\b/gi, '3D maze adventure game'],
  [/\bmanajemen keuangan pribadi\b/gi, 'personal finance management'],

  // Grammar, verbs & connectors
  [/\bdibangun menggunakan\b/gi, 'built using'],
  [/\bdibangun dengan\b/gi, 'built with'],
  [/\bdirancang untuk\b/gi, 'designed to'],
  [/\bdilengkapi fitur\b/gi, 'featured with'],
  [/\bmengembangkan\b/gi, 'developing'],
  [/\bmembangun\b/gi, 'building'],
  [/\bmerancang\b/gi, 'designing'],
  [/\bmengintegrasikan\b/gi, 'integrating'],
  [/\bmenampilkan\b/gi, 'showcasing'],
  [/\bmenyediakan\b/gi, 'providing'],
  [/\bmembantu\b/gi, 'helping'],
  [/\bmemfasilitasi\b/gi, 'facilitating'],
  [/\bberbasis\b/gi, 'based'],
  [/\bmenggunakan\b/gi, 'using'],
  [/\bcepat\b/gi, 'fast'],
  [/\bmodern\b/gi, 'modern'],
  [/\bkomprehensif\b/gi, 'comprehensive'],
  [/\bserta\b/gi, 'as well as'],
  [/\bdan\b/gi, 'and'],
  [/\buntuk\b/gi, 'for'],
  [/\bdengan\b/gi, 'with'],
  [/\bdari\b/gi, 'from'],
  [/\bpada\b/gi, 'on'],
  [/\bke\b/gi, 'to'],
  [/\bdi\b/gi, 'in'],
  [/\bsebuah\b/gi, 'a'],
  [/\bsuatu\b/gi, 'a'],
  [/\byang\b/gi, 'that'],
  [/\baplikasi\b/gi, 'application'],
  [/\bsistem\b/gi, 'system'],
  [/\bplatform\b/gi, 'platform'],
  [/\bweb\b/gi, 'web'],
  [/\bponsel\b/gi, 'mobile'],
  [/\blayanan\b/gi, 'services'],
  [/\bbahasa\b/gi, 'language'],
  [/\bmodel\b/gi, 'models'],
  [/\btanggal\b/gi, 'date'],
  [/\btahun\b/gi, 'year'],
  [/\bfitur\b/gi, 'features'],
  [/\bcerdas\b/gi, 'smart'],
  [/\bterbaru\b/gi, 'latest'],
];

/**
 * Translates Indonesian text into natural, fluent English while rigorously preserving
 * all technical keywords, framework names, and acronyms.
 */
export function translateIdToEnWithTechProtection(inputText: string): string {
  if (!inputText || !inputText.trim()) return '';

  const cleanInput = inputText.trim();

  // 1. Direct exact lookup if it matches standard portfolio sentences
  if (EXACT_SENTENCE_MAPPINGS[cleanInput]) {
    return EXACT_SENTENCE_MAPPINGS[cleanInput];
  }

  // 2. Tokenize & protect Whitelist words so they cannot be corrupted
  const tokenMap: Map<string, string> = new Map();
  let protectedText = cleanInput;

  PROTECTED_TECH_TERMS.forEach((term, index) => {
    const placeholder = `__TECH_TERM_${index}__`;
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');
    if (regex.test(protectedText)) {
      tokenMap.set(placeholder, term);
      protectedText = protectedText.replace(regex, placeholder);
    }
  });

  // 3. Apply developer phrase & grammar mappings
  let translated = protectedText;
  for (const [pattern, replacement] of PHRASE_MAPPINGS) {
    translated = translated.replace(pattern, replacement);
  }

  // 4. Restore all protected tech terms exactly as original casing
  tokenMap.forEach((originalTerm, placeholder) => {
    translated = translated.split(placeholder).join(originalTerm);
  });

  // 5. Post-process cleanups (fix any awkward residual words)
  translated = translated
    .replace(/\bthat mulus\b/gi, 'seamless')
    .replace(/\bthat fast\b/gi, 'fast')
    .replace(/\bthat reliable\b/gi, 'reliable')
    .replace(/\bin ekosistem\b/gi, 'across the ecosystem of')
    .replace(/\bekosistem\b/gi, 'ecosystem')
    .replace(/\bautentikasi aman\b/gi, 'secure authentication')
    .replace(/\bmanajemen database terstruktur\b/gi, 'structured database management')
    .replace(/\bto dalam produk web\b/gi, 'into web products')
    .replace(/\bto dalam\b/gi, 'into')
    .replace(/\badalah nyawa\b/gi, 'are the core of')
    .replace(/\bnyawa produk web\b/gi, 'core of web products')
    .replace(/\bterus staying ahead\b/gi, 'staying ahead')
    .replace(/\bdigerakkan oleh\b/gi, 'driven by')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // 6. Capitalize first letter of sentence if needed
  if (translated.length > 0) {
    translated = translated.charAt(0).toUpperCase() + translated.slice(1);
  }

  return translated;
}
