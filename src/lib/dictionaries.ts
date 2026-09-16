export type Language = 'id' | 'en';

export const dictionaries = {
  en: {
    // Navigation
    'nav.home': 'HOME',
    'nav.projects': 'PROJECTS',
    'nav.about': 'ABOUT',

    // TopBar
    'topbar.contact': 'Contact',

    // Language Toggle
    'lang.en': 'EN',
    'lang.id': 'ID',

    // Contact Modal
    'contact.title': "Let's build something thoughtful together.",
    'contact.sub': 'Have a project in mind, an engineering role to discuss, or just want to connect? Reach out below.',
    'contact.directEmail': 'Direct Email',
    'contact.copyEmail': 'Copy',
    'contact.copied': 'Copied!',
    'contact.whatsapp': 'WhatsApp',
    'contact.chatWhatsapp': 'Chat directly',
    'contact.sendDirect': 'Send a Direct Message',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Project Details / Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully!',
    'contact.close': 'Close',

    // Quick Info Drawer
    'quickInfo.title': 'Quick Info',
    'quickInfo.close': 'Close',
    'quickInfo.downloadResume': 'View Resume / CV',
    'quickInfo.viewShowreel': 'View GitHub Profile',
    'quickInfo.basedIn': 'Based in',
    'quickInfo.degree': 'Degree',
    'quickInfo.primaryStack': 'Primary Stack',
    'quickInfo.secondaryStack': 'Secondary Stack',
    'quickInfo.contact': 'Contact',
    'quickInfo.note': "Looking for a thoughtful developer partner? Let's talk about your project.",

    // Play Reel Section
    'playReel.badge': 'Full-Stack Software Engineer',
    'playReel.headline1': 'Engineering robust',
    'playReel.headlineHighlight': 'end-to-end systems.',
    'playReel.headline2': 'Scalable architectures, seamless user experiences.',
    'playReel.playButton': 'Click to Play Reel',
    'playReel.subtext': 'Specialized in building full-stack web applications, high-performance backend APIs, and intelligent AI-powered solutions.',
    'playReel.modalTitle': 'Full-Stack Engineering & System Reel',
    'playReel.modalDesc': 'Showcasing real-time AI moderation (Athena Shield), Point of Sale automation (Yosma POS), and scalable web architectures engineered by',
    'playReel.viewRepo': 'View Projects Repository',
    'playReel.comingSoon': 'Showreel video coming soon — in the meantime, explore my source code and live deployments.',

    // Recent Projects (Landing Page)
    'projects.featuredHeading': 'Featured Works',
    'projects.viewAll': 'View All Projects',
    'projects.explore': 'Explore full project portfolio & code repositories',
    'projects.liveDemo': 'Live Demo',
    'projects.sourceCode': 'Source Code',
    'projects.viewDetails': 'View Details',
    'projects.techUsed': 'Technologies',
    'projects.year': 'Year',

    // Projects Page
    'allProjects.title': 'Curated Works & Projects',
    'allProjects.subtitle': 'A collection of full-stack web applications, AI models, and software engineering projects.',
    'allProjects.all': 'All',
    'allProjects.filterBy': 'Filter by category',
    'allProjects.searchPlaceholder': 'Search projects, tech, or keywords...',
    'allProjects.showing': 'Showing',
    'allProjects.of': 'of',
    'allProjects.projectsCount': 'projects',
    'allProjects.loadMore': 'Load More Projects',
    'allProjects.resetFilter': 'Reset Filters',
    'allProjects.empty': 'No projects found matching the criteria.',
    'allProjects.viewProject': 'View Project',

    // About Page & Narrative
    'about.eyebrow': 'FULL-STACK DEVELOPER',
    'about.eyebrowHighlight': 'NEXT.JS & LARAVEL',
    'about.headline': 'I build modern & scalable web',
    'about.headlineHighlight': 'applications.',
    'about.subtext': 'Specializing in end-to-end web development across Next.js, React, and Laravel ecosystems, enhanced with seamless AI model integrations.',
    'about.myServices': 'Specialized Services',
    'about.myApproach': 'Engineering Philosophy',
    'about.valuesTitle': 'Values & Mindset',
    'about.services': [
      {
        num: '01',
        title: 'Frontend & Next.js',
        desc: 'Primary specialization in Next.js App Router, React, TypeScript, and Framer Motion for building fast, SEO-optimized, interactive web applications.',
      },
      {
        num: '02',
        title: 'Backend & Laravel',
        desc: 'Developing reliable RESTful APIs, authentication workflows, and structured database management using Next.js Server Routes and Laravel.',
      },
      {
        num: '03',
        title: 'AI & System Integration',
        desc: 'Integrating AI language models (IndoBERTweet NLP), computer vision (MediaPipe / OpenCV), and third-party APIs into full-stack web products.',
      },
    ],
    'about.values': [
      {
        label: 'Approach',
        quote: 'Clean code architecture, modular components, and seamless user experiences driven by modern web engineering.',
      },
      {
        label: 'Values',
        quote: 'Content & logic drive great web products. Modern design and robust code architecture must go hand-in-hand.',
      },
      {
        label: 'Mindset',
        quote: 'Continuous learning, iterating until perfection, and staying ahead with Next.js and AI innovations.',
      },
    ],

    // Footer
    'footer.headline1': "Let's work",
    'footer.headline2': 'together.',
    'footer.emailPrompt': 'Drop me an email',
    'footer.copyright': 'Designed & built with care',
    'footer.backToTop': 'Back to top',

    // Admin CMS
    'admin.dashboard.controlCenter': 'CMS Control Center',
    'admin.dashboard.welcome': 'Welcome back,',
    'admin.dashboard.subtitle': 'Manage your editorial portfolio, project showcases, and personal brand metadata.',
    'admin.dashboard.addProject': 'Add Project',
    'admin.dashboard.liveSite': 'Live Site',
    'admin.dashboard.projects': 'Projects',
    'admin.dashboard.portfolioItems': 'portfolio items',
    'admin.dashboard.manageCrud': 'Manage Projects',
    'admin.dashboard.services': 'Services & Capabilities',
    'admin.dashboard.configuredServices': 'configured services',
    'admin.dashboard.editServices': 'Edit services',
    'admin.dashboard.quickInfo': 'Quick Info Rows',
    'admin.dashboard.metadataEntries': 'metadata entries',
    'admin.dashboard.editDrawer': 'Edit drawer',
    'admin.dashboard.systemDb': 'System & Database',
    'admin.dashboard.ready': 'Ready & Persistent',
    'admin.dashboard.diagnostics': 'System diagnostics',
    'admin.dashboard.recentOverview': 'Recent Projects Overview',
    'admin.dashboard.recentSubtitle': 'Quick access to edit or review recently updated portfolio items.',
    'admin.dashboard.viewAll': 'View all projects',
    'admin.dashboard.noProjects': 'No projects added yet',
    'admin.dashboard.edit': 'Edit',
    'admin.dashboard.tall': 'Tall',

    'admin.works.title': 'Projects Management',
    'admin.works.subtitle': 'Enterprise data table & CRUD operations for portfolio showcase items.',
    'admin.works.items': 'items',
    'admin.works.newProject': 'New Project',
    'admin.works.searchPlaceholder': 'Search projects by title, category, year, or tech stack...',
    'admin.works.thThumbnail': 'Thumbnail',
    'admin.works.thTitle': 'Title & Category',
    'admin.works.thYear': 'Year',
    'admin.works.thTech': 'Tech Stack',
    'admin.works.thActions': 'Actions',
    'admin.works.noProjects': 'No projects found matching the criteria.',

    'admin.hero.title': 'Hero Banner Configuration',
    'admin.hero.subtitle': 'Configure top headline, specialty keywords, and developer portrait image.',
    'admin.hero.save': 'Save Hero Configuration',

    'admin.about.title': 'About & Services Management',
    'admin.about.subtitle': 'Manage core capability statements, services offered, and engineering mindset.',
    'admin.about.save': 'Save About Configuration',

    'admin.quickInfo.title': 'Quick Info Drawer Fields',
    'admin.quickInfo.subtitle': 'Manage key metadata rows shown in the side drawer.',
    'admin.quickInfo.addRow': 'Add Information Row',
    'admin.quickInfo.save': 'Save Quick Info',

    'admin.settings.title': 'Site, Footer & SEO Settings',
    'admin.settings.subtitle': 'Configure global branding, contact channels, showreel links, and search metadata.',
    'admin.settings.save': 'Save All Settings',

    'admin.lock.title': 'Restricted Access',
    'admin.lock.subtitle': 'Enter admin passkey to unlock the CMS dashboard.',
    'admin.lock.placeholder': 'Enter Passkey...',
    'admin.lock.unlock': 'Unlock Dashboard',
    'admin.lock.invalid': 'Invalid passkey. Try again.',
  },

  id: {
    // Navigation
    'nav.home': 'BERANDA',
    'nav.projects': 'PROYEK',
    'nav.about': 'TENTANG',

    // TopBar
    'topbar.contact': 'Kontak',

    // Language Toggle
    'lang.en': 'EN',
    'lang.id': 'ID',

    // Contact Modal
    'contact.title': 'Mari bangun produk digital berkualitas bersama.',
    'contact.sub': 'Punya ide proyek, diskusi kebutuhan engineering, atau sekadar ingin terhubung? Hubungi saya di bawah.',
    'contact.directEmail': 'Email Langsung',
    'contact.copyEmail': 'Salin',
    'contact.copied': 'Tersalin!',
    'contact.whatsapp': 'WhatsApp',
    'contact.chatWhatsapp': 'Chat langsung',
    'contact.sendDirect': 'Kirim Pesan Langsung',
    'contact.name': 'Nama Lengkap',
    'contact.email': 'Alamat Email',
    'contact.message': 'Detail Proyek / Pesan',
    'contact.send': 'Kirim Pesan',
    'contact.sending': 'Mengirim...',
    'contact.success': 'Pesan berhasil dikirim!',
    'contact.close': 'Tutup',

    // Quick Info Drawer
    'quickInfo.title': 'Info Cepat',
    'quickInfo.close': 'Tutup',
    'quickInfo.downloadResume': 'Lihat Resume / CV',
    'quickInfo.viewShowreel': 'Lihat Profil GitHub',
    'quickInfo.basedIn': 'Domisili',
    'quickInfo.degree': 'Pendidikan',
    'quickInfo.primaryStack': 'Stack Utama',
    'quickInfo.secondaryStack': 'Stack Pendukung',
    'quickInfo.contact': 'Kontak',
    'quickInfo.note': 'Mencari partner developer yang berdedikasi? Mari diskusikan proyek Anda.',

    // Play Reel Section
    'playReel.badge': 'Full-Stack Software Engineer',
    'playReel.headline1': 'Membangun arsitektur',
    'playReel.headlineHighlight': 'sistem end-to-end.',
    'playReel.headline2': 'Arsitektur terukur, performa tinggi, dan handal.',
    'playReel.playButton': 'Putar Video Showreel',
    'playReel.subtext': 'Berfokus pada pengembangan sistem web full-stack, integrasi API berkinerja tinggi, serta solusi otomasi cerdas modern.',
    'playReel.modalTitle': 'Showreel Sistem & Rekayasa Full-Stack',
    'playReel.modalDesc': 'Menampilkan arsitektur produksi, otomasi AI real-time (Athena Shield), sistem kasir POS (Yosma POS), dan rekayasa full-stack oleh',
    'playReel.viewRepo': 'Lihat Repository Proyek',
    'playReel.comingSoon': 'Video showreel segera hadir — silakan jelajahi kode sumber dan demonstrasi sistem live di bawah.',

    // Recent Projects (Landing Page)
    'projects.featuredHeading': 'Karya Pilihan',
    'projects.viewAll': 'Lihat Semua Proyek',
    'projects.explore': 'Jelajahi seluruh portofolio proyek & repositori kode',
    'projects.liveDemo': 'Demo Langsung',
    'projects.sourceCode': 'Kode Sumber',
    'projects.viewDetails': 'Lihat Detail',
    'projects.techUsed': 'Teknologi',
    'projects.year': 'Tahun',

    // Projects Page
    'allProjects.title': 'Koleksi Karya & Proyek',
    'allProjects.subtitle': 'Koleksi aplikasi web full-stack, model AI, dan proyek rekayasa perangkat lunak modern.',
    'allProjects.all': 'Semua',
    'allProjects.filterBy': 'Filter berdasarkan kategori',
    'allProjects.searchPlaceholder': 'Cari proyek, teknologi, atau kata kunci...',
    'allProjects.showing': 'Menampilkan',
    'allProjects.of': 'dari',
    'allProjects.projectsCount': 'proyek',
    'allProjects.loadMore': 'Muat Proyek Lainnya',
    'allProjects.resetFilter': 'Reset Filter',
    'allProjects.empty': 'Tidak ada proyek yang sesuai dengan pencarian atau filter.',
    'allProjects.viewProject': 'Lihat Proyek',

    // About Page & Narrative
    'about.eyebrow': 'FULL-STACK DEVELOPER',
    'about.eyebrowHighlight': 'NEXT.JS & LARAVEL',
    'about.headline': 'Membangun aplikasi web modern',
    'about.headlineHighlight': '& terukur.',
    'about.subtext': 'Spesialisasi dalam pengembangan web end-to-end di ekosistem Next.js, React, dan Laravel, diperkaya integrasi model AI yang mulus.',
    'about.myServices': 'Layanan Spesialisasi',
    'about.myApproach': 'Filosofi Engineering',
    'about.valuesTitle': 'Prinsip & Mindset',
    'about.services': [
      {
        num: '01',
        title: 'Frontend & Next.js',
        desc: 'Spesialisasi utama dalam Next.js App Router, React, TypeScript, dan Framer Motion untuk membangun aplikasi web yang cepat, interaktif, dan SEO-friendly.',
      },
      {
        num: '02',
        title: 'Backend & Laravel',
        desc: 'Mengembangkan RESTful API yang andal, alur autentikasi aman, serta manajemen database terstruktur menggunakan Next.js Server Routes dan Laravel.',
      },
      {
        num: '03',
        title: 'Integrasi AI & Sistem',
        desc: 'Mengintegrasikan model pemrosesan bahasa alami (IndoBERTweet NLP), computer vision (MediaPipe / OpenCV), dan API pihak ketiga ke dalam produk web full-stack.',
      },
    ],
    'about.values': [
      {
        label: 'Pendekatan',
        quote: 'Arsitektur kode bersih, komponen modular, dan pengalaman pengguna yang mulus didukung standar modern web engineering.',
      },
      {
        label: 'Prinsip',
        quote: 'Konten dan logika adalah fondasi produk digital hebat. Desain modern dan ketahanan arsitektur kode harus berjalan beriringan.',
      },
      {
        label: 'Mindset',
        quote: 'Terus belajar, menyempurnakan setiap detail, dan selalu terdepan mengikuti inovasi Next.js serta ekosistem AI.',
      },
    ],

    // Footer
    'footer.headline1': 'Mari berkolaborasi',
    'footer.headline2': 'bersama.',
    'footer.emailPrompt': 'Kirim email kepada saya',
    'footer.copyright': 'Dirancang & dibangun dengan dedikasi',
    'footer.backToTop': 'Kembali ke atas',

    // Admin CMS
    'admin.dashboard.controlCenter': 'Pusat Kendali CMS',
    'admin.dashboard.welcome': 'Selamat datang kembali,',
    'admin.dashboard.subtitle': 'Kelola portofolio karya, etalase proyek, dan identitas brand personal Anda.',
    'admin.dashboard.addProject': 'Tambah Proyek',
    'admin.dashboard.liveSite': 'Lihat Web',
    'admin.dashboard.projects': 'Koleksi Proyek',
    'admin.dashboard.portfolioItems': 'karya portofolio',
    'admin.dashboard.manageCrud': 'Kelola Proyek',
    'admin.dashboard.services': 'Layanan & Kemampuan',
    'admin.dashboard.configuredServices': 'layanan terdaftar',
    'admin.dashboard.editServices': 'Edit layanan',
    'admin.dashboard.quickInfo': 'Baris Info Cepat',
    'admin.dashboard.metadataEntries': 'entri metadata',
    'admin.dashboard.editDrawer': 'Edit Tab info',
    'admin.dashboard.systemDb': 'Sistem & Database',
    'admin.dashboard.ready': 'Siap & Tersimpan',
    'admin.dashboard.diagnostics': 'Diagnostik sistem',
    'admin.dashboard.recentOverview': 'Ringkasan Proyek Terbaru',
    'admin.dashboard.recentSubtitle': 'Akses cepat untuk mengedit atau meninjau karya portofolio terbaru.',
    'admin.dashboard.viewAll': 'Lihat semua proyek',
    'admin.dashboard.noProjects': 'Belum ada proyek yang ditambahkan',
    'admin.dashboard.edit': 'Edit',
    'admin.dashboard.tall': 'Tinggi',

    'admin.works.title': 'Manajemen Proyek',
    'admin.works.subtitle': 'Tabel data dan pengelolaan CRUD untuk seluruh portofolio karya.',
    'admin.works.items': 'item',
    'admin.works.newProject': 'Tambah Proyek Baru',
    'admin.works.searchPlaceholder': 'Cari proyek berdasarkan judul, kategori, tahun, atau teknologi...',
    'admin.works.thThumbnail': 'Sampul',
    'admin.works.thTitle': 'Judul & Kategori',
    'admin.works.thYear': 'Tahun',
    'admin.works.thTech': 'Teknologi',
    'admin.works.thActions': 'Aksi',
    'admin.works.noProjects': 'Tidak ada proyek yang sesuai dengan kriteria.',

    'admin.hero.title': 'Konfigurasi Banner Utama (Hero)',
    'admin.hero.subtitle': 'Atur teks judul utama, spesialisasi, dan foto potret developer.',
    'admin.hero.save': 'Simpan Konfigurasi Hero',

    'admin.about.title': 'Manajemen Tentang & Layanan',
    'admin.about.subtitle': 'Kelola narasi kemampuan utama, layanan spesialisasi, dan filosofi engineering.',
    'admin.about.save': 'Simpan Konfigurasi Tentang',

    'admin.quickInfo.title': 'Data Tab Info Cepat',
    'admin.quickInfo.subtitle': 'Kelola baris informasi penting yang tampil pada Tab samping.',
    'admin.quickInfo.addRow': 'Tambah Baris Informasi',
    'admin.quickInfo.save': 'Simpan Info Cepat',

    'admin.settings.title': 'Pengaturan Situs, Footer & SEO',
    'admin.settings.subtitle': 'Atur identitas merek, kontak, tautan sosial, dan metadata pencarian.',
    'admin.settings.save': 'Simpan Seluruh Pengaturan',

    'admin.lock.title': 'Akses Terbatas',
    'admin.lock.subtitle': 'Masukkan PIN keamanan untuk membuka dashboard CMS.',
    'admin.lock.placeholder': 'Masukkan PIN...',
    'admin.lock.unlock': 'Buka Dashboard',
    'admin.lock.invalid': 'PIN salah. Silakan coba lagi.',
  },
} as const;

export type DictionaryKey = keyof typeof dictionaries.en;
