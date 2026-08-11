import 'dotenv/config';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL?.replace('&channel_binding=require', '');

const pool = new Pool({
  connectionString,
  ssl: connectionString ? { rejectUnauthorized: false } : undefined
});

async function migrate() {
  console.log('🔌 Connecting to Neon DB...');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      text TEXT NOT NULL,
      type TEXT NOT NULL,
      options JSONB,
      placeholder TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `);
  console.log('✅ Table "questions" created (or already exists).');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      candidate_name TEXT NOT NULL,
      answers JSONB NOT NULL,
      submitted_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `);
  console.log('✅ Table "submissions" created (or already exists).');

  console.log('\n🎉 Migration complete! Tables are ready in Neon DB.');
}

migrate()
  .catch((err) => {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  })
  .finally(() => {
    pool.end();
  });
