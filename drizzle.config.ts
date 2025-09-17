// Basic Drizzle config scaffold (no execution in this scope)
export default {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
};

