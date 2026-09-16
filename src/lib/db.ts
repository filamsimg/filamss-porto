import { neon } from '@neondatabase/serverless';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'portfolio-db.json');

export interface PortfolioData {
  settings?: any;
  hero?: any;
  about?: any;
  works?: any[];
  categories?: any[];
  quickInfo?: any[];
  footer?: any;
  [key: string]: any;
}

/**
 * Get SQL client if DATABASE_URL is available
 */
function getSqlClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  try {
    return neon(connectionString);
  } catch (err) {
    console.warn('[Neon DB] Could not initialize client:', err);
    return null;
  }
}

/**
 * Read default or local JSON data as fallback
 */
async function readLocalJson(): Promise<PortfolioData> {
  try {
    const content = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.warn('[DB] Failed to read local JSON file, returning empty object:', err);
    return {};
  }
}

/**
 * Write to local JSON file (useful for dev and local fallback)
 */
async function writeLocalJson(data: PortfolioData): Promise<void> {
  try {
    const dir = path.dirname(DB_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    // In serverless environments like Vercel, filesystem might be read-only
    console.warn('[DB] Could not write to local filesystem (expected on Vercel):', err);
  }
}

/**
 * Ensure the table in Neon Postgres exists and is initialized
 */
async function ensureNeonTableInitialized(sql: any, initialFallbackData: PortfolioData): Promise<void> {
  try {
    // 1. Create table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_cms (
        key VARCHAR(50) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Check if 'main' content row exists
    const rows = await sql`SELECT data FROM portfolio_cms WHERE key = 'main' LIMIT 1`;
    if (rows.length === 0 && Object.keys(initialFallbackData).length > 0) {
      console.log('[Neon DB] Initializing portfolio_cms with initial data...');
      await sql`
        INSERT INTO portfolio_cms (key, data, updated_at)
        VALUES ('main', ${JSON.stringify(initialFallbackData)}, NOW())
        ON CONFLICT (key) DO NOTHING;
      `;
    }
  } catch (err) {
    console.error('[Neon DB] Error in ensureNeonTableInitialized:', err);
  }
}

/**
 * Fetch Portfolio CMS Data (Prioritizes Neon DB, fallbacks to local JSON)
 */
export async function getPortfolioCmsData(): Promise<PortfolioData> {
  const sql = getSqlClient();
  const localData = await readLocalJson();

  if (!sql) {
    return localData;
  }

  try {
    await ensureNeonTableInitialized(sql, localData);
    const rows = await sql`SELECT data FROM portfolio_cms WHERE key = 'main' LIMIT 1`;

    if (rows && rows.length > 0 && rows[0].data) {
      const dbData = typeof rows[0].data === 'string' ? JSON.parse(rows[0].data) : rows[0].data;
      return {
        ...localData,
        ...dbData,
      };
    }

    return localData;
  } catch (err) {
    console.error('[Neon DB] Failed to fetch data from Neon, using local fallback:', err);
    return localData;
  }
}

/**
 * Save Portfolio CMS Data (Saves to Neon DB and syncs locally if possible)
 */
export async function savePortfolioCmsData(data: PortfolioData): Promise<{ success: boolean; source: 'neon' | 'local' }> {
  const sql = getSqlClient();
  
  // 1. Save locally (development sync)
  await writeLocalJson(data);

  if (!sql) {
    return { success: true, source: 'local' };
  }

  try {
    await ensureNeonTableInitialized(sql, data);
    await sql`
      INSERT INTO portfolio_cms (key, data, updated_at)
      VALUES ('main', ${JSON.stringify(data)}, NOW())
      ON CONFLICT (key) 
      DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();
    `;
    return { success: true, source: 'neon' };
  } catch (err) {
    console.error('[Neon DB] Failed to save to Neon Postgres:', err);
    return { success: true, source: 'local' };
  }
}
