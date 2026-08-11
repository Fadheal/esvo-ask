import { db } from './db.js';
import * as schema from '../src/db/schema.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const submissions = await db.select().from(schema.submissions).orderBy(schema.submissions.submittedAt);
      return res.status(200).json(submissions);
    }

    if (req.method === 'POST') {
      const values = req.body;
      const [submission] = await db.insert(schema.submissions).values(values).returning();
      return res.status(201).json(submission);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API /submissions error:', err);
    return res.status(500).json({ error: err.message });
  }
}
