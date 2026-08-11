import { eq } from 'drizzle-orm';
import { db } from './db.js';
import * as schema from '../src/db/schema.js';

export async function listQuestions() {
  return await db.select().from(schema.questions);
}

export async function createQuestion(data) {
  const [question] = await db.insert(schema.questions).values({
    id: data.id || `custom_q_${Date.now()}`,
    category: data.category,
    text: data.text,
    type: data.type,
    options: data.options ?? null,
    placeholder: data.placeholder ?? null
  }).returning();
  return question;
}

export async function updateQuestion(id, data) {
  const [question] = await db.update(schema.questions)
    .set({
      category: data.category,
      text: data.text,
      type: data.type,
      options: data.options ?? null,
      placeholder: data.placeholder ?? null
    })
    .where(eq(schema.questions.id, id))
    .returning();
  return question;
}

export async function deleteQuestion(id) {
  await db.delete(schema.questions).where(eq(schema.questions.id, id));
}

export async function seedQuestions(defaultQuestions) {
  const existing = await db.select().from(schema.questions);
  if (existing.length > 0) {
    return { seeded: false, count: existing.length };
  }

  const toInsert = defaultQuestions.map((q) => ({
    id: q.id,
    category: q.category,
    text: q.text,
    type: q.type,
    options: q.options ?? null,
    placeholder: q.placeholder ?? null
  }));

  await db.insert(schema.questions).values(toInsert);
  return { seeded: true, count: toInsert.length };
}

export async function resetQuestions(defaultQuestions) {
  await db.delete(schema.questions);
  const toInsert = defaultQuestions.map((q) => ({
    id: q.id,
    category: q.category,
    text: q.text,
    type: q.type,
    options: q.options ?? null,
    placeholder: q.placeholder ?? null
  }));
  await db.insert(schema.questions).values(toInsert);
  return { success: true, count: toInsert.length };
}
