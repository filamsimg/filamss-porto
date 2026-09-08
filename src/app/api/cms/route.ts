import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'portfolio-db.json');

const defaultData = {
  settings: {
    brandName: 'Filamsi Mabda Ghifary',
    contactEmail: 'filamsi.mghifary@gmail.com',
    faviconUrl: '/images/portrait-hero.png',
    showreelUrl: 'https://github.com/filamsi',
    whatsappNumber: '0858-5368-5622',
    instagramUrl: 'https://instagram.com/filamsi',
    resumeUrl: '/uploads/resume.pdf',
    quickInfoNote: "Looking for a thoughtful developer partner? Let's talk about your project.",
    seoTitle: 'Filamsi Mabda Ghifary | Full-Stack Developer',
    seoDescription: 'Full-Stack Developer specializing in Next.js, React, TypeScript & Laravel with AI integrations.',
  },
  hero: {
    titleLine1: 'Full-Stack',
    titleLine2: 'Developer',
    subtext: 'Specializing in Next.js, React, TypeScript & Laravel with AI integrations.',
    portraitUrl: '/images/portrait-hero.png',
  },
  about: {
    eyebrow: 'FULL-STACK DEVELOPER',
    eyebrowHighlight: 'NEXT.JS & LARAVEL',
    headline: 'I build modern & scalable web',
    headlineHighlight: 'applications.',
    subtext: 'Specializing in end-to-end web development across Next.js, React, and Laravel ecosystems, enhanced with seamless AI model integrations.',
    services: [
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
    values: [
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
  },
  works: [
    { id: 1, title: 'Athena Shield', category: 'AI Comment Moderation & YouTube API', year: '2025', image: '/images/work-branding.png', isTall: false },
    { id: 2, title: 'SignBridge ID', category: 'Real-Time AI Sign Language Translator', year: '2025', image: '/images/work-phone.png', isTall: true },
    { id: 3, title: 'NextJS POS SaaS', category: 'Full-Stack Point of Sale Application', year: '2024', image: '/images/work-laptop.png', isTall: false },
    { id: 4, title: 'SI-PKL Poltek', category: 'Academic Internship Portal & Management', year: '2024', image: '/images/work-tablet.png', isTall: true },
    { id: 5, title: 'NeuralVision OCR', category: 'Document Digitization & Entity Extraction', year: '2024', image: '/images/work-fashion.png', isTall: false },
    { id: 6, title: 'Corporate Profiles', category: 'WordPress & Laravel Custom Sites', year: '2023', image: '/images/work-cap.png', isTall: true },
  ],
  quickInfo: [
    { label: 'Based in', value: 'Tegal, Indonesia' },
    { label: 'Degree', value: 'S.Tr. Teknik Informatika' },
    { label: 'Primary Stack', value: 'Next.js · React · Laravel' },
    { label: 'Secondary Stack', value: 'TypeScript · REST API · Python AI' },
    { label: 'Contact', value: '0858-5368-5622' },
  ],
  footer: {
    headlineLine1: "Let's work",
    headlineLine2: 'together',
    emailLabel: 'Drop me an email',
    copyrightNote: 'Designed & built with care',
  },
};

async function ensureDbExists() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const dir = path.dirname(DB_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

async function commitToGitHub(data: any) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // e.g. "username/my-porto-v4"
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) return;

  try {
    const fileUrl = `https://api.github.com/repos/${repo}/contents/src/data/portfolio-db.json`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'Portfolio-CMS',
    };

    // 1. Get current file SHA from GitHub
    let sha = '';
    const getRes = await fetch(`${fileUrl}?ref=${branch}`, { headers, cache: 'no-store' });
    if (getRes.ok) {
      const getJson = await getRes.json();
      sha = getJson.sha;
    }

    // 2. Commit updated JSON to GitHub repository
    const contentEncoded = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
    await fetch(fileUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: 'cms: update portfolio content from admin dashboard',
        content: contentEncoded,
        branch,
        ...(sha ? { sha } : {}),
      }),
    });
  } catch (err) {
    console.error('GitHub Auto-Commit Error:', err);
  }
}

export async function GET() {
  try {
    await ensureDbExists();
    const content = await fs.readFile(DB_PATH, 'utf-8');
    const data = JSON.parse(content);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('API GET /api/cms error:', error);
    return NextResponse.json(defaultData, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    await ensureDbExists();
    const body = await request.json();

    const existingContent = await fs.readFile(DB_PATH, 'utf-8').catch(() => '{}');
    const currentData = JSON.parse(existingContent || '{}');

    const updatedData = {
      settings: { ...defaultData.settings, ...(currentData.settings || {}), ...(body.settings || {}) },
      hero: body.hero || currentData.hero || defaultData.hero,
      about: body.about || currentData.about || defaultData.about,
      works: body.works || currentData.works || defaultData.works,
      quickInfo: body.quickInfo || currentData.quickInfo || defaultData.quickInfo,
      footer: body.footer || currentData.footer || defaultData.footer,
    };

    // Save locally
    try {
      await fs.writeFile(DB_PATH, JSON.stringify(updatedData, null, 2), 'utf-8');
    } catch {}

    // Auto-commit to GitHub if GITHUB_TOKEN & GITHUB_REPO are configured
    await commitToGitHub(updatedData);

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('API POST /api/cms error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
