'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SiteSettings {
  brandName: string;
  contactEmail: string;
  faviconUrl: string;
  showreelUrl: string;
  whatsappNumber: string;
  instagramUrl: string;
  resumeUrl: string;
  quickInfoNote?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface HeroData {
  titleLine1: string;
  titleLine1_id?: string;
  titleLine1_en?: string;
  titleLine2: string;
  titleLine2_id?: string;
  titleLine2_en?: string;
  subtext: string;
  subtext_id?: string;
  subtext_en?: string;
  portraitUrl: string;
}

export interface ServiceItem {
  num: string;
  title: string;
  title_id?: string;
  title_en?: string;
  desc: string;
  desc_id?: string;
  desc_en?: string;
}

export interface ValueItem {
  label: string;
  label_id?: string;
  label_en?: string;
  quote: string;
  quote_id?: string;
  quote_en?: string;
}

export interface AboutData {
  eyebrow: string;
  eyebrow_id?: string;
  eyebrow_en?: string;
  eyebrowHighlight: string;
  eyebrowHighlight_id?: string;
  eyebrowHighlight_en?: string;
  headline: string;
  headline_id?: string;
  headline_en?: string;
  headlineHighlight: string;
  headlineHighlight_id?: string;
  headlineHighlight_en?: string;
  subtext: string;
  subtext_id?: string;
  subtext_en?: string;
  services?: ServiceItem[];
  values?: ValueItem[];
}

export interface WorkItem {
  id: number;
  title: string;
  title_id?: string;
  title_en?: string;
  category: string;
  category_id?: string;
  category_en?: string;
  year: string;
  image: string;
  isTall: boolean;
  gallery?: string[];
  demoUrl?: string;
  githubUrl?: string;
  description?: string;
  description_id?: string;
  description_en?: string;
  technologies?: string[];
  createdAt?: string; // ISO timestamp — used to sort "most recently added" in Recent Projects
}

export function getLocalizedWork(work: WorkItem, lang: 'id' | 'en') {
  const isId = lang === 'id';
  return {
    ...work,
    title: isId ? (work.title_id || work.title) : (work.title_en || work.title),
    category: isId ? (work.category_id || work.category) : (work.category_en || work.category),
    description: isId ? (work.description_id || work.description || '') : (work.description_en || work.description || ''),
  };
}

export function getLocalizedHero(hero: HeroData, lang: 'id' | 'en') {
  const isId = lang === 'id';
  return {
    ...hero,
    titleLine1: isId ? (hero.titleLine1_id || hero.titleLine1) : (hero.titleLine1_en || hero.titleLine1),
    titleLine2: isId ? (hero.titleLine2_id || hero.titleLine2) : (hero.titleLine2_en || hero.titleLine2),
    subtext: isId ? (hero.subtext_id || hero.subtext) : (hero.subtext_en || hero.subtext),
  };
}

export function getLocalizedAbout(about: AboutData, lang: 'id' | 'en') {
  const isId = lang === 'id';
  return {
    ...about,
    eyebrow: isId ? (about.eyebrow_id || about.eyebrow) : (about.eyebrow_en || about.eyebrow),
    eyebrowHighlight: isId ? (about.eyebrowHighlight_id || about.eyebrowHighlight) : (about.eyebrowHighlight_en || about.eyebrowHighlight),
    headline: isId ? (about.headline_id || about.headline) : (about.headline_en || about.headline),
    headlineHighlight: isId ? (about.headlineHighlight_id || about.headlineHighlight) : (about.headlineHighlight_en || about.headlineHighlight),
    subtext: isId ? (about.subtext_id || about.subtext) : (about.subtext_en || about.subtext),
    services: (about.services || []).map((s) => ({
      ...s,
      title: isId ? (s.title_id || s.title) : (s.title_en || s.title),
      desc: isId ? (s.desc_id || s.desc) : (s.desc_en || s.desc),
    })),
    values: (about.values || []).map((v) => ({
      ...v,
      label: isId ? (v.label_id || v.label) : (v.label_en || v.label),
      quote: isId ? (v.quote_id || v.quote) : (v.quote_en || v.quote),
    })),
  };
}

export interface QuickInfoRow {
  label: string;
  value: string;
}

export interface FooterData {
  headlineLine1: string;
  headlineLine2: string;
  emailLabel: string;
  copyrightNote: string;
}

export interface CategoryItem {
  id: string; // Slug identifier e.g. 'web-app', 'ai-ml'
  name_id: string; // Indonesian title e.g. 'Web App'
  name_en: string; // English title e.g. 'Web App'
}

export const defaultCategories: CategoryItem[] = [
  { id: 'web-app', name_id: 'Web App', name_en: 'Web App' },
  { id: 'ai-ml', name_id: 'AI & ML', name_en: 'AI & ML' },
  { id: 'mobile', name_id: 'Mobile App', name_en: 'Mobile App' },
  { id: 'iot', name_id: 'IoT & Sistem', name_en: 'IoT & Systems' },
  { id: 'ui-ux', name_id: 'UI/UX & Web', name_en: 'UI/UX & Web' },
  { id: 'enterprise', name_id: 'Enterprise Web', name_en: 'Enterprise Web' },
];

interface PortfolioContextType {
  settings: SiteSettings;
  hero: HeroData;
  about: AboutData;
  works: WorkItem[];
  categories: CategoryItem[];
  quickInfo: QuickInfoRow[];
  footer: FooterData;
  isLoaded: boolean;
  updateSettings: (data: Partial<SiteSettings>) => Promise<void>;
  updateHero: (data: Partial<HeroData>) => Promise<void>;
  updateAbout: (data: Partial<AboutData>) => Promise<void>;
  updateFooter: (data: Partial<FooterData>) => Promise<void>;
  addWork: (work: Omit<WorkItem, 'id'>) => Promise<void>;
  updateWork: (id: number, work: Partial<WorkItem>) => Promise<void>;
  deleteWork: (id: number) => Promise<void>;
  updateCategories: (categories: CategoryItem[]) => Promise<void>;
  addCategory: (category: CategoryItem) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateQuickInfo: (rows: QuickInfoRow[]) => Promise<void>;
}

const defaultServices: ServiceItem[] = [
  {
    num: '01',
    title: 'Frontend & Next.js',
    title_id: 'Frontend & Next.js',
    title_en: 'Frontend & Next.js',
    desc: 'Spesialisasi utama dalam Next.js App Router, React, TypeScript, dan Framer Motion untuk membangun aplikasi web yang cepat, interaktif, dan SEO-friendly.',
    desc_id: 'Spesialisasi utama dalam Next.js App Router, React, TypeScript, dan Framer Motion untuk membangun aplikasi web yang cepat, interaktif, dan SEO-friendly.',
    desc_en: 'Primary specialization in Next.js App Router, React, TypeScript, and Framer Motion for building fast, SEO-optimized, interactive web applications.',
  },
  {
    num: '02',
    title: 'Backend & Laravel',
    title_id: 'Backend & Laravel',
    title_en: 'Backend & Laravel',
    desc: 'Mengembangkan RESTful API yang andal, autentikasi aman, dan manajemen database terstruktur menggunakan Next.js Server Routes dan Laravel.',
    desc_id: 'Mengembangkan RESTful API yang andal, autentikasi aman, dan manajemen database terstruktur menggunakan Next.js Server Routes dan Laravel.',
    desc_en: 'Developing reliable RESTful APIs, authentication workflows, and structured database management using Next.js Server Routes and Laravel.',
  },
  {
    num: '03',
    title: 'Integrasi AI & Sistem',
    title_id: 'Integrasi AI & Sistem',
    title_en: 'AI & System Integration',
    desc: 'Mengintegrasikan model AI bahasa (IndoBERTweet NLP), computer vision (MediaPipe / OpenCV), dan third-party API ke dalam produk web full-stack.',
    desc_id: 'Mengintegrasikan model AI bahasa (IndoBERTweet NLP), computer vision (MediaPipe / OpenCV), dan third-party API ke dalam produk web full-stack.',
    desc_en: 'Integrating AI language models (IndoBERTweet NLP), computer vision (MediaPipe / OpenCV), and third-party APIs into full-stack web products.',
  },
];

const defaultValues: ValueItem[] = [
  {
    label: 'Pendekatan',
    label_id: 'Pendekatan',
    label_en: 'Approach',
    quote: 'Arsitektur kode bersih (clean code), komponen modular, dan user experience mulus yang digerakkan oleh modern web engineering.',
    quote_id: 'Arsitektur kode bersih (clean code), komponen modular, dan user experience mulus yang digerakkan oleh modern web engineering.',
    quote_en: 'Clean code architecture, modular components, and seamless user experiences driven by modern web engineering.',
  },
  {
    label: 'Nilai Kerja',
    label_id: 'Nilai Kerja',
    label_en: 'Values',
    quote: 'Konten dan logika bisnis adalah nyawa produk web. Desain modern dan arsitektur kode tangguh harus berjalan beriringan.',
    quote_id: 'Konten dan logika bisnis adalah nyawa produk web. Desain modern dan arsitektur kode tangguh harus berjalan beriringan.',
    quote_en: 'Content & logic drive great web products. Modern design and robust code architecture must go hand-in-hand.',
  },
  {
    label: 'Mindset',
    label_id: 'Mindset',
    label_en: 'Mindset',
    quote: 'Belajar berkelanjutan, iterasi hingga presisi, dan terus terdepan dengan inovasi Next.js serta integrasi AI.',
    quote_id: 'Belajar berkelanjutan, iterasi hingga presisi, dan terus terdepan dengan inovasi Next.js serta integrasi AI.',
    quote_en: 'Continuous learning, iterating until perfection, and staying ahead with Next.js and AI innovations.',
  },
];

const defaultSettings: SiteSettings = {
  brandName: 'Filamsi Mabda Ghifary',
  contactEmail: 'filamsi.mghifary@gmail.com',
  faviconUrl: '/images/portrait-hero.png',
  showreelUrl: 'https://github.com/filamsi',
  whatsappNumber: '0858-5368-5622',
  instagramUrl: 'https://instagram.com/filamsi',
  resumeUrl: '/uploads/resume.pdf',
  quickInfoNote: "Looking for a thoughtful developer partner? Let's talk about your project.",
  seoTitle: 'Filamsi Mabda Ghifary | Full-Stack Developer (Next.js & Laravel)',
  seoDescription: 'Full-Stack Developer specializing in Next.js, React, TypeScript & Laravel with AI integrations.',
};

const defaultHero: HeroData = {
  titleLine1: 'Full-Stack',
  titleLine1_id: 'Full-Stack',
  titleLine1_en: 'Full-Stack',
  titleLine2: 'Developer',
  titleLine2_id: 'Developer',
  titleLine2_en: 'Developer',
  subtext: 'Spesialisasi di Next.js, React, TypeScript & Laravel dengan integrasi AI.',
  subtext_id: 'Spesialisasi di Next.js, React, TypeScript & Laravel dengan integrasi AI.',
  subtext_en: 'Specializing in Next.js, React, TypeScript & Laravel with AI integrations.',
  portraitUrl: '/images/portrait-hero.png',
};

const defaultAbout: AboutData = {
  eyebrow: 'FULL-STACK DEVELOPER',
  eyebrow_id: 'FULL-STACK DEVELOPER',
  eyebrow_en: 'FULL-STACK DEVELOPER',
  eyebrowHighlight: 'NEXT.JS & LARAVEL',
  eyebrowHighlight_id: 'NEXT.JS & LARAVEL',
  eyebrowHighlight_en: 'NEXT.JS & LARAVEL',
  headline: 'Membangun aplikasi web modern',
  headline_id: 'Membangun aplikasi web modern',
  headline_en: 'I build modern & scalable web',
  headlineHighlight: '& terukur.',
  headlineHighlight_id: '& terukur.',
  headlineHighlight_en: 'applications.',
  subtext: 'Spesialisasi dalam pengembangan web end-to-end di ekosistem Next.js, React, dan Laravel, diperkaya integrasi model AI yang mulus.',
  subtext_id: 'Spesialisasi dalam pengembangan web end-to-end di ekosistem Next.js, React, dan Laravel, diperkaya integrasi model AI yang mulus.',
  subtext_en: 'Specializing in end-to-end web development across Next.js, React, and Laravel ecosystems, enhanced with seamless AI model integrations.',
  services: defaultServices,
  values: defaultValues,
};

const defaultFooter: FooterData = {
  headlineLine1: "Let's work",
  headlineLine2: 'together',
  emailLabel: 'Drop me an email',
  copyrightNote: 'Designed & built with care',
};

const defaultWorks: WorkItem[] = [
  {
    id: 1,
    title: 'Athena Shield',
    title_id: 'Athena Shield',
    title_en: 'Athena Shield',
    category: 'AI Comment Moderation & YouTube API',
    category_id: 'Moderasi Komentar AI & YouTube API',
    category_en: 'AI Comment Moderation & YouTube API',
    year: '2025',
    image: '/images/work-branding.png',
    isTall: false,
    gallery: ['/images/work-branding.png', '/images/work-laptop.png'],
    demoUrl: 'https://github.com/filamsi',
    githubUrl: 'https://github.com/filamsi',
    description: 'Automated YouTube comment moderation system using fine-tuned IndoBERTweet model for online gambling detection.',
    description_id: 'Sistem moderasi komentar YouTube otomatis menggunakan fine-tuned IndoBERTweet untuk deteksi judi online.',
    description_en: 'Automated YouTube comment moderation system using fine-tuned IndoBERTweet model for online gambling detection.',
    technologies: ['Python', 'IndoBERTweet', 'TensorFlow', 'YouTube API v3', 'React'],
    createdAt: '2025-01-15T08:00:00.000Z',
  },
  {
    id: 2,
    title: 'Yosma POS',
    title_id: 'Yosma POS',
    title_en: 'Yosma POS',
    category: 'Sales Monitoring & POS (Next.js)',
    category_id: 'Pemantauan Penjualan & Kasir POS (Next.js)',
    category_en: 'Sales Monitoring & POS (Next.js)',
    year: '2026',
    image: '/images/work-phone.png',
    isTall: true,
    gallery: ['/images/work-phone.png'],
    demoUrl: 'https://github.com/filamsi',
    githubUrl: 'https://github.com/filamsi',
    description: 'Digital cashier & sales monitoring web system with automated inventory deduction and analytics visualization.',
    description_id: 'Sistem web kasir digital & pemantauan penjualan dengan pengurangan inventaris otomatis dan visualisasi analitik.',
    description_en: 'Digital cashier & sales monitoring web system with automated inventory deduction and analytics visualization.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    createdAt: '2025-01-10T10:00:00.000Z',
  },
  {
    id: 3,
    title: 'UPT Lab Perindustrian',
    title_id: 'UPT Lab Perindustrian',
    title_en: 'UPT Industrial Lab',
    category: 'Web Digitization & UI/UX',
    category_id: 'Digitalisasi Layanan Web & UI/UX',
    category_en: 'Web Digitization & UI/UX',
    year: '2025',
    image: '/images/work-laptop.png',
    isTall: false,
    gallery: ['/images/work-laptop.png'],
    demoUrl: 'https://github.com/filamsi',
    githubUrl: 'https://github.com/filamsi',
    description: 'Internal service digitization platform for sample registration and lab test result management.',
    description_id: 'Platform digitalisasi layanan internal untuk registrasi sampel dan manajemen hasil uji lab terpadu.',
    description_en: 'Internal service digitization platform for sample registration and lab test result management.',
    technologies: ['Laravel', 'MySQL', 'Tailwind CSS', 'Alpine.js'],
    createdAt: '2024-11-20T14:30:00.000Z',
  },
  {
    id: 4,
    title: 'Silat Mastery',
    title_id: 'Silat Mastery',
    title_en: 'Silat Mastery',
    category: 'Mobile App & MediaPipe Pose Detection',
    category_id: 'Aplikasi Mobile & Deteksi Pose MediaPipe',
    category_en: 'Mobile App & MediaPipe Pose Detection',
    year: '2025',
    image: '/images/work-tablet.png',
    isTall: true,
    gallery: ['/images/work-tablet.png'],
    demoUrl: 'https://github.com/filamsi',
    githubUrl: 'https://github.com/filamsi',
    description: 'Interactive martial arts training app with real-time pose estimation using Google MediaPipe computer vision.',
    description_id: 'Aplikasi pelatihan bela diri interaktif dengan estimasi pose waktu nyata menggunakan Google MediaPipe computer vision.',
    description_en: 'Interactive martial arts training app with real-time pose estimation using Google MediaPipe computer vision.',
    technologies: ['Flutter', 'GetX', 'MediaPipe', 'Computer Vision'],
    createdAt: '2024-08-05T09:15:00.000Z',
  },
  {
    id: 5,
    title: 'RecycleHub',
    title_id: 'RecycleHub',
    title_en: 'RecycleHub',
    category: 'AI Plastic Classification & OpenCV',
    category_id: 'Klasifikasi Sampah Plastik AI & OpenCV',
    category_en: 'AI Plastic Classification & OpenCV',
    year: '2024',
    image: '/images/work-fashion.png',
    isTall: false,
    gallery: ['/images/work-fashion.png'],
    demoUrl: 'https://github.com/filamsi',
    githubUrl: 'https://github.com/filamsi',
    description: 'AI model system classifying plastic waste types from user camera inputs.',
    description_id: 'Model computer vision cerdas untuk klasifikasi jenis sampah plastik daur ulang secara akurat.',
    description_en: 'AI model system classifying plastic waste types from user camera inputs.',
    technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'OpenCV'],
    createdAt: '2024-04-12T11:45:00.000Z',
  },
  {
    id: 6,
    title: 'Freelance Web Solutions',
    title_id: 'Freelance Web Solutions',
    title_en: 'Freelance Web Solutions',
    category: 'WordPress & Laravel Custom Sites',
    category_id: 'Kustom Web WordPress & Laravel',
    category_en: 'WordPress & Laravel Custom Sites',
    year: '2023',
    image: '/images/work-cap.png',
    isTall: true,
    gallery: ['/images/work-cap.png'],
    demoUrl: 'https://github.com/filamsi',
    githubUrl: 'https://github.com/filamsi',
    description: 'Custom corporate company profiles and personal portfolio sites optimized for speed & SEO.',
    description_id: 'Koleksi website profil perusahaan responsif dan berkinerja tinggi yang dioptimalkan untuk kecepatan dan SEO.',
    description_en: 'Custom corporate company profiles and personal portfolio sites optimized for speed & SEO.',
    technologies: ['Laravel', 'WordPress', 'SEO Optimization', 'PHP'],
    createdAt: '2023-12-01T16:00:00.000Z',
  },
];

const defaultQuickInfo: QuickInfoRow[] = [
  { label: 'Based in', value: 'Tegal, Indonesia' },
  { label: 'Degree', value: 'S.Tr. Teknik Informatika' },
  { label: 'Primary Stack', value: 'Next.js · React · Laravel' },
  { label: 'Secondary Stack', value: 'TypeScript · REST API · Python AI' },
  { label: 'Contact', value: '0858-5368-5622' },
];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'portfolio_cms_data_v1';

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [hero, setHero] = useState<HeroData>(defaultHero);
  const [about, setAbout] = useState<AboutData>(defaultAbout);
  const [works, setWorks] = useState<WorkItem[]>(defaultWorks);
  const [categories, setCategories] = useState<CategoryItem[]>(defaultCategories);
  const [quickInfo, setQuickInfo] = useState<QuickInfoRow[]>(defaultQuickInfo);
  const [footer, setFooter] = useState<FooterData>(defaultFooter);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('/api/cms', { cache: 'no-store' });
        if (res.ok) {
          const dbData = await res.json();
          if (dbData.settings) setSettings((prev) => ({ ...defaultSettings, ...dbData.settings }));
          if (dbData.hero) setHero(dbData.hero);
          if (dbData.about) {
            setAbout((prev) => ({
              ...defaultAbout,
              ...dbData.about,
              services: dbData.about.services || defaultServices,
              values: dbData.about.values || defaultValues,
            }));
          }
          if (dbData.works) setWorks(dbData.works);
          if (dbData.categories && Array.isArray(dbData.categories) && dbData.categories.length > 0) {
            setCategories(dbData.categories);
          }
          if (dbData.quickInfo) setQuickInfo(dbData.quickInfo);
          if (dbData.footer) setFooter((prev) => ({ ...defaultFooter, ...dbData.footer }));
        }
      } catch (err) {
        console.log('Server API CMS loading fallback:', err);
      }

      setIsLoaded(true);
    };

    loadData();
  }, []);

  const syncToDatabase = async (
    newSettings = settings,
    newHero = hero,
    newAbout = about,
    newWorks = works,
    newCategories = categories,
    newInfo = quickInfo,
    newFooter = footer
  ) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          settings: newSettings,
          hero: newHero,
          about: newAbout,
          works: newWorks,
          categories: newCategories,
          quickInfo: newInfo,
          footer: newFooter,
        })
      );
    }

    try {
      await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: newSettings,
          hero: newHero,
          about: newAbout,
          works: newWorks,
          categories: newCategories,
          quickInfo: newInfo,
          footer: newFooter,
        }),
      });
    } catch (err) {
      console.error('Failed to post to /api/cms:', err);
    }
  };

  const updateSettings = async (data: Partial<SiteSettings>) => {
    const updated = { ...settings, ...data };
    setSettings(updated);
    await syncToDatabase(updated, hero, about, works, categories, quickInfo, footer);
  };

  const updateHero = async (data: Partial<HeroData>) => {
    const updated = { ...hero, ...data };
    setHero(updated);
    await syncToDatabase(settings, updated, about, works, categories, quickInfo, footer);
  };

  const updateAbout = async (data: Partial<AboutData>) => {
    const updated = { ...about, ...data };
    setAbout(updated);
    await syncToDatabase(settings, hero, updated, works, categories, quickInfo, footer);
  };

  const updateFooter = async (data: Partial<FooterData>) => {
    const updated = { ...footer, ...data };
    setFooter(updated);
    await syncToDatabase(settings, hero, about, works, categories, quickInfo, updated);
  };

  const addWork = async (work: Omit<WorkItem, 'id'>) => {
    const newId = Date.now();
    const newWork: WorkItem = {
      ...work,
      id: newId,
      createdAt: new Date().toISOString(), // auto-stamp creation time
    };
    const updated = [...works, newWork];
    setWorks(updated);
    await syncToDatabase(settings, hero, about, updated, categories, quickInfo, footer);
  };

  const updateWork = async (id: number, workData: Partial<WorkItem>) => {
    const updated = works.map((w) => (w.id === id ? { ...w, ...workData } : w));
    setWorks(updated);
    await syncToDatabase(settings, hero, about, updated, categories, quickInfo, footer);
  };

  const deleteWork = async (id: number) => {
    const updated = works.filter((w) => w.id !== id);
    setWorks(updated);
    await syncToDatabase(settings, hero, about, updated, categories, quickInfo, footer);
  };

  const updateCategories = async (newCats: CategoryItem[]) => {
    setCategories(newCats);
    await syncToDatabase(settings, hero, about, works, newCats, quickInfo, footer);
  };

  const addCategory = async (category: CategoryItem) => {
    const updated = [...categories.filter((c) => c.id !== category.id), category];
    setCategories(updated);
    await syncToDatabase(settings, hero, about, works, updated, quickInfo, footer);
  };

  const deleteCategory = async (catId: string) => {
    const updated = categories.filter((c) => c.id !== catId);
    setCategories(updated);
    await syncToDatabase(settings, hero, about, works, updated, quickInfo, footer);
  };

  const updateQuickInfo = async (rows: QuickInfoRow[]) => {
    setQuickInfo(rows);
    await syncToDatabase(settings, hero, about, works, categories, rows, footer);
  };

  return (
    <PortfolioContext.Provider
      value={{
        settings,
        hero,
        about,
        works,
        categories,
        quickInfo,
        footer,
        isLoaded,
        updateSettings,
        updateHero,
        updateAbout,
        updateFooter,
        addWork,
        updateWork,
        deleteWork,
        updateCategories,
        addCategory,
        deleteCategory,
        updateQuickInfo,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
