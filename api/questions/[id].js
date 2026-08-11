import { eq } from 'drizzle-orm';
import { db } from '../db.js';
import * as schema from '../../src/db/schema.js';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'PUT') {
      const [question] = await db.update(schema.questions)
        .set(req.body)
        .where(eq(schema.questions.id, id))
        .returning();
      return res.status(200).json(question);
    }

    if (req.method === 'DELETE') {
      await db.delete(schema.questions).where(eq(schema.questions.id, id));
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API /questions/[id] error:', err);
    return res.status(500).json({ error: err.message });
  }
}
