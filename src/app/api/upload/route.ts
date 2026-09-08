import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

async function ensureUploadsDir() {
  try {
    await fs.access(UPLOADS_DIR);
  } catch {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  }
}

async function commitFileToGitHub(filePath: string, buffer: Buffer) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) return;

  try {
    const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
    const fileUrl = `https://api.github.com/repos/${repo}/contents/${relativePath}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'Portfolio-CMS-Upload',
    };

    let sha = '';
    const getRes = await fetch(`${fileUrl}?ref=${branch}`, { headers, cache: 'no-store' });
    if (getRes.ok) {
      const getJson = await getRes.json();
      sha = getJson.sha;
    }

    const contentEncoded = buffer.toString('base64');
    await fetch(fileUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `cms: upload image asset ${path.basename(filePath)}`,
        content: contentEncoded,
        branch,
        ...(sha ? { sha } : {}),
      }),
    });
  } catch (err) {
    console.error('GitHub Auto-Commit Image Upload Error:', err);
  }
}

export async function POST(request: Request) {
  try {
    await ensureUploadsDir();

    const formData = await request.formData();
    const files = formData.getAll('file') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: 'No files provided' }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (!file || typeof file === 'string') continue;

      const bytes = await file.arrayBuffer();
      const inputBuffer = Buffer.from(bytes);

      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const isDoc = file.name.toLowerCase().endsWith('.doc') || file.name.toLowerCase().endsWith('.docx');

      let fileBuffer: Buffer;
      let filename: string;

      if (isPdf || isDoc) {
        fileBuffer = inputBuffer;
        const ext = isPdf ? 'pdf' : file.name.split('.').pop()?.toLowerCase() || 'bin';
        const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
        filename = `${Date.now()}-${rawName.toLowerCase()}.${ext}`;
      } else {
        // Process image using sharp: resize if large, convert to WebP with 82% quality
        fileBuffer = await sharp(inputBuffer)
          .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 82 })
          .toBuffer();

        const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
        filename = `${Date.now()}-${rawName.toLowerCase()}.webp`;
      }

      const filePath = path.join(UPLOADS_DIR, filename);

      await fs.writeFile(filePath, fileBuffer);

      // Trigger GitHub auto-commit for uploaded asset
      await commitFileToGitHub(filePath, fileBuffer);

      const publicUrl = `/uploads/${filename}`;
      uploadedUrls.push(publicUrl);
    }

    return NextResponse.json({
      success: true,
      url: uploadedUrls[0] || '',
      urls: uploadedUrls,
    });
  } catch (error) {
    console.error('API POST /api/upload error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
