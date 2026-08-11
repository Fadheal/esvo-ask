import { db } from './db.js';
import * as schema from '../src/db/schema.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const questions = await db.select().from(schema.questions);
      return res.status(200).json(questions);
    }

    if (req.method === 'POST') {
      const values = req.body;
      const [question] = await db.insert(schema.questions).values(values).returning();
      return res.status(201).json(question);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API /questions error:', err);
    return res.status(500).json({ error: err.message });
  }
}
