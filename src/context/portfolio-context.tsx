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
  titleLine2: string;
  subtext: string;
  portraitUrl: string;
}

export interface ServiceItem {
  num: string;
  title: string;
  desc: string;
}

export interface ValueItem {
  label: string;
  quote: string;
}

export interface AboutData {
  eyebrow: string;
  eyebrowHighlight: string;
  headline: string;
  headlineHighlight: string;
  subtext: string;
  services?: ServiceItem[];
  values?: ValueItem[];
}

export interface WorkItem {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  isTall: boolean;
  gallery?: string[];
  demoUrl?: string;
  githubUrl?: string;
  description?: string;
  technologies?: string[];
  createdAt?: string; // ISO timestamp — used to sort "most recently added" in Recent Projects
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

interface PortfolioContextType {
  settings: SiteSettings;
  hero: HeroData;
  about: AboutData;
  works: WorkItem[];
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
  updateQuickInfo: (rows: QuickInfoRow[]) => Promise<void>;
}

const defaultServices: ServiceItem[] = [
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
];

const defaultValues: ValueItem[] = [
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
  titleLine2: 'Developer',
  subtext: 'Specializing in Next.js, React, TypeScript & Laravel with AI integrations.',
  portraitUrl: '/images/portrait-hero.png',
};

const defaultAbout: AboutData = {
  eyebrow: 'FULL-STACK DEVELOPER',
  eyebrowHighlight: 'NEXT.JS & LARAVEL',
  headline: 'I build modern & scalable web',
  headlineHighlight: 'applications.',
  subtext: 'Specializing in end-to-end web development across Next.js, React, and Laravel ecosystems, enhanced with seamless AI model integrations.',
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
    category: 'AI Comment Moderation & YouTube API',
    year: '2025',
    image: '/images/work-branding.png',
    isTall: false,
    gallery: ['/images/work-branding.png', '/images/work-laptop.png'],
    demoUrl: 'https://github.com/filamsi',
    githubUrl: 'https://github.com/filamsi',
    description: 'Autonomous cyberbullying and toxicity filtration for YouTube comments powered by fine-tuned IndoBERTweet NLP.',
    technologies: ['Next.js 14', 'Python Flask', 'IndoBERTweet NLP', 'TailwindCSS', 'YouTube API'],
    createdAt: '2025-01-15T08:00:00.000Z',
  },
  {
    id: 2,
    title: 'SignBridge ID',
    category: 'Real-Time AI Sign Language Translator',
    year: '2025',
    image: '/images/work-phone.png',
    isTall: true,
    gallery: ['/images/work-phone.png', '/images/work-tablet.png'],
    demoUrl: 'https://github.com/filamsi',
    githubUrl: 'https://github.com/filamsi',
    description: 'Real-time Indonesian Sign Language (BISINDO) detection and translation using MediaPipe keypoints and LSTM deep learning models.',
    technologies: ['React.js', 'FastAPI', 'MediaPipe', 'LSTM / TensorFlow', 'WebRTC'],
    createdAt: '2025-01-10T10:00:00.000Z',
  },
  {
    id: 3,
    title: 'NextJS POS SaaS',
    category: 'Full-Stack Point of Sale Application',
    year: '2024',
    image: '/images/work-laptop.png',
    isTall: false,
    gallery: ['/images/work-laptop.png'],
    demoUrl: 'https://github.com/filamsi',
    githubUrl: 'https://github.com/filamsi',
    description: 'Modern cashier & inventory management platform for retail businesses with offline sync and receipt generation.',
    technologies: ['Next.js App Router', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'TailwindCSS'],
    createdAt: '2024-11-20T14:30:00.000Z',
  },
  {
    id: 4,
    title: 'SI-PKL Poltek',
    category: 'Academic Internship Portal & Management',
    year: '2024',
    image: '/images/work-tablet.png',
    isTall: true,
    gallery: ['/images/work-tablet.png'],
    demoUrl: 'https://github.com/filamsi',
    githubUrl: 'https://github.com/filamsi',
    description: 'Campus internship administration portal with automated supervisor assessment, company verification, and digital logbooks.',
    technologies: ['Laravel 11', 'MySQL', 'Bootstrap 5', 'Livewire', 'REST API'],
    createdAt: '2024-08-05T09:15:00.000Z',
  },
  {
    id: 5,
    title: 'NeuralVision OCR',
    category: 'Document Digitization & Entity Extraction',
    year: '2024',
    image: '/images/work-fashion.png',
    isTall: false,
    gallery: ['/images/work-fashion.png'],
    demoUrl: 'https://github.com/filamsi',
    githubUrl: 'https://github.com/filamsi',
    description: 'Automated Indonesian ID card (KTP) and invoice parser using computer vision preprocessing and Tesseract OCR engine.',
    technologies: ['Python', 'OpenCV', 'PyTesseract', 'Docker', 'FastAPI'],
    createdAt: '2024-04-12T11:45:00.000Z',
  },
  {
    id: 6,
    title: 'Corporate Profiles',
    category: 'WordPress & Laravel Custom Sites',
    year: '2023',
    image: '/images/work-cap.png',
    isTall: true,
    gallery: ['/images/work-cap.png'],
    demoUrl: 'https://github.com/filamsi',
    githubUrl: 'https://github.com/filamsi',
    description: 'Custom corporate company profiles and personal portfolio sites optimized for speed & SEO.',
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
    await syncToDatabase(updated, hero, about, works, quickInfo, footer);
  };

  const updateHero = async (data: Partial<HeroData>) => {
    const updated = { ...hero, ...data };
    setHero(updated);
    await syncToDatabase(settings, updated, about, works, quickInfo, footer);
  };

  const updateAbout = async (data: Partial<AboutData>) => {
    const updated = { ...about, ...data };
    setAbout(updated);
    await syncToDatabase(settings, hero, updated, works, quickInfo, footer);
  };

  const updateFooter = async (data: Partial<FooterData>) => {
    const updated = { ...footer, ...data };
    setFooter(updated);
    await syncToDatabase(settings, hero, about, works, quickInfo, updated);
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
    await syncToDatabase(settings, hero, about, updated, quickInfo, footer);
  };

  const updateWork = async (id: number, workData: Partial<WorkItem>) => {
    const updated = works.map((w) => (w.id === id ? { ...w, ...workData } : w));
    setWorks(updated);
    await syncToDatabase(settings, hero, about, updated, quickInfo, footer);
  };

  const deleteWork = async (id: number) => {
    const updated = works.filter((w) => w.id !== id);
    setWorks(updated);
    await syncToDatabase(settings, hero, about, updated, quickInfo, footer);
  };

  const updateQuickInfo = async (rows: QuickInfoRow[]) => {
    setQuickInfo(rows);
    await syncToDatabase(settings, hero, about, works, rows, footer);
  };

  return (
    <PortfolioContext.Provider
      value={{
        settings,
        hero,
        about,
        works,
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
