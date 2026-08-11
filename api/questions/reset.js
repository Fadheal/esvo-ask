import { db } from '../db.js';
import * as schema from '../../src/db/schema.js';
import { DEFAULT_QUESTIONS } from '../../src/data/defaultQuestions.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    await db.delete(schema.questions);

    const toInsert = DEFAULT_QUESTIONS.map((q) => ({
      id: q.id,
      category: q.category,
      text: q.text,
      type: q.type,
      options: q.options ?? null,
      placeholder: q.placeholder ?? null
    }));

    await db.insert(schema.questions).values(toInsert);
    return res.status(200).json({ success: true, count: toInsert.length });
  } catch (err) {
    console.error('API /questions/reset error:', err);
    return res.status(500).json({ error: err.message });
  }
}
