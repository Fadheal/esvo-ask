import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { eq } from 'drizzle-orm';
import { db } from './src/db/index.js';
import * as schema from './src/db/schema.js';
import { DEFAULT_QUESTIONS } from './src/data/defaultQuestions.js';

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
// QUESTIONS
// ─────────────────────────────────────────────

// GET all questions
app.get('/api/questions', async (req, res) => {
  try {
    const rows = await db.select().from(schema.questions);
    res.json(rows);
  } catch (err) {
    console.error('GET /api/questions error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST create question
app.post('/api/questions', async (req, res) => {
  try {
    const { id, category, text, type, options, placeholder } = req.body;
    const [row] = await db.insert(schema.questions).values({
      id: id || 'custom_q_' + Date.now(),
      category,
      text,
      type,
      options: options ?? null,
      placeholder: placeholder ?? null
    }).returning();
    res.json(row);
  } catch (err) {
    console.error('POST /api/questions error:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update question
app.put('/api/questions/:id', async (req, res) => {
  try {
    const { category, text, type, options, placeholder } = req.body;
    const [row] = await db.update(schema.questions)
      .set({ category, text, type, options: options ?? null, placeholder: placeholder ?? null })
      .where(eq(schema.questions.id, req.params.id))
      .returning();
    res.json(row);
  } catch (err) {
    console.error('PUT /api/questions/:id error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE question
app.delete('/api/questions/:id', async (req, res) => {
  try {
    await db.delete(schema.questions).where(eq(schema.questions.id, req.params.id));
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/questions/:id error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST seed default questions (if table is empty)
app.post('/api/questions/seed', async (req, res) => {
  try {
    const existing = await db.select().from(schema.questions);
    if (existing.length === 0) {
      const toInsert = DEFAULT_QUESTIONS.map(q => ({
        id: q.id,
        category: q.category,
        text: q.text,
        type: q.type,
        options: q.options ?? null,
        placeholder: q.placeholder ?? null
      }));
      await db.insert(schema.questions).values(toInsert);
      res.json({ seeded: true, count: toInsert.length });
    } else {
      res.json({ seeded: false, message: 'Questions already exist', count: existing.length });
    }
  } catch (err) {
    console.error('POST /api/questions/seed error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST reset all questions to defaults
app.post('/api/questions/reset', async (req, res) => {
  try {
    await db.delete(schema.questions);
    const toInsert = DEFAULT_QUESTIONS.map(q => ({
      id: q.id,
      category: q.category,
      text: q.text,
      type: q.type,
      options: q.options ?? null,
      placeholder: q.placeholder ?? null
    }));
    await db.insert(schema.questions).values(toInsert);
    res.json({ success: true, count: toInsert.length });
  } catch (err) {
    console.error('POST /api/questions/reset error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// SUBMISSIONS
// ─────────────────────────────────────────────

// GET all submissions
app.get('/api/submissions', async (req, res) => {
  try {
    const rows = await db.select().from(schema.submissions).orderBy(schema.submissions.submittedAt);
    // Return newest first
    res.json(rows.reverse());
  } catch (err) {
    console.error('GET /api/submissions error:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST create submission
app.post('/api/submissions', async (req, res) => {
  try {
    const { candidateName, answers } = req.body;
    const [row] = await db.insert(schema.submissions).values({
      id: 'sub_' + Date.now(),
      candidateName,
      answers
    }).returning();
    res.json(row);
  } catch (err) {
    console.error('POST /api/submissions error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE submission
app.delete('/api/submissions/:id', async (req, res) => {
  try {
    await db.delete(schema.submissions).where(eq(schema.submissions.id, req.params.id));
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/submissions/:id error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 EsvoAssess API server running at http://localhost:${PORT}`);
  console.log(`   Connected to Neon DB via Drizzle ORM\n`);
});
