import { defineConfig } from 'drizzle-kit';

// Drizzle Kit uses the Postgres dialect. The same schema runs on embedded
// PGlite (default, zero-config) and on a real PostgreSQL server in Docker.
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'postgres://Tradefast:Tradefast@localhost:5432/Tradefast',
  },
});
