import { db } from '../db.js';
import * as schema from '../../src/db/schema.js';
import { DEFAULT_QUESTIONS } from '../../src/data/defaultQuestions.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const existing = await db.select().from(schema.questions);
    if (existing.length === 0) {
      const toInsert = DEFAULT_QUESTIONS.map((q) => ({
        ...q,
        options: q.options ?? null
      }));
      await db.insert(schema.questions).values(toInsert);
      return res.status(201).json({ seeded: true, count: toInsert.length });
    }
    return res.status(200).json({ seeded: false, count: existing.length });
  } catch (err) {
    console.error('API /questions/seed error:', err);
    return res.status(500).json({ error: err.message });
  }
}
