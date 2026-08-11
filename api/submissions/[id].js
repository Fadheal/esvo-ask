import { db } from '../db.js';
import * as schema from '../../src/db/schema.js';

export default async function handler(req, res) {
  const id = req.query?.id || req.params?.id;

  try {
    if (req.method === 'DELETE') {
      await db.delete(schema.submissions).where(schema.submissions.id.eq(id));
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API /submissions/[id] error:', err);
    return res.status(500).json({ error: err.message });
  }
}
