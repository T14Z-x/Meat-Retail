// Drizzle client scaffold (no runtime deps or queries in this scope)
// Intentionally avoids importing drizzle packages to keep compile clean pre-install.
export type DB = unknown;

let cached: { db: DB | null } = { db: null };

export async function getDb(): Promise<DB> {
  if (cached.db) return cached.db;
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not set. Use .env.local');
  }
  // Placeholder: return a noop object. Replace with real drizzle client during integration.
  const db: DB = {};
  cached.db = db;
  return db;
}
