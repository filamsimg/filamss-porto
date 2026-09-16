import { NextResponse } from 'next/server';
import { getPortfolioCmsData, savePortfolioCmsData, PortfolioData } from '@/lib/db';

const defaultData = {
  settings: {
    brandName: 'Filamsi Mabda Ghifary',
    contactEmail: 'filamsi.mghifary@gmail.com',
    faviconUrl: '/images/portrait-hero.png',
    showreelUrl: '',
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
  works: [],
  categories: [
    { id: 'web-app', name_id: 'Web App', name_en: 'Web App' },
    { id: 'ai-ml', name_id: 'AI & ML', name_en: 'AI & ML' },
    { id: 'mobile', name_id: 'Mobile App', name_en: 'Mobile App' },
    { id: 'iot', name_id: 'IoT & Sistem', name_en: 'IoT & Systems' },
    { id: 'ui-ux', name_id: 'UI/UX & Web', name_en: 'UI/UX & Web' },
    { id: 'enterprise', name_id: 'Enterprise Web', name_en: 'Enterprise Web' },
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
    const data = await getPortfolioCmsData();
    return NextResponse.json(data || defaultData, {
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
    const body = await request.json();
    const currentData = await getPortfolioCmsData();

    const updatedData: PortfolioData = {
      settings: { ...defaultData.settings, ...(currentData.settings || {}), ...(body.settings || {}) },
      hero: body.hero || currentData.hero || defaultData.hero,
      about: body.about || currentData.about || defaultData.about,
      works: body.works || currentData.works || defaultData.works || [],
      categories: body.categories || currentData.categories || defaultData.categories || [],
      quickInfo: body.quickInfo || currentData.quickInfo || defaultData.quickInfo || [],
      footer: body.footer || currentData.footer || defaultData.footer,
    };

    // Save to Neon DB (and sync locally)
    const saveResult = await savePortfolioCmsData(updatedData);

    // Auto-commit to GitHub if configured
    await commitToGitHub(updatedData);

    return NextResponse.json({ success: true, data: updatedData, source: saveResult.source });
  } catch (error) {
    console.error('API POST /api/cms error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
