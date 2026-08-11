import { eq } from 'drizzle-orm';
import { db } from './db.js';
import * as schema from '../src/db/schema.js';

export async function listSubmissions() {
  return await db.select().from(schema.submissions).orderBy(schema.submissions.submittedAt);
}

export async function createSubmission(data) {
  const [submission] = await db.insert(schema.submissions).values({
    id: data.id || `sub_${Date.now()}`,
    candidateName: data.candidateName,
    answers: data.answers,
    submittedAt: data.submittedAt ?? undefined
  }).returning();
  return submission;
}

export async function deleteSubmission(id) {
  await db.delete(schema.submissions).where(eq(schema.submissions.id, id));
}
