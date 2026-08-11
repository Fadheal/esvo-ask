import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../src/db/schema.js';

const connectionString = process.env.DATABASE_URL?.replace('&channel_binding=require', '');
const pool = new Pool({
  connectionString,
  ssl: connectionString ? { rejectUnauthorized: false } : undefined
});

export const db = drizzle(pool, { schema });
