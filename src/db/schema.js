import { pgTable, text, jsonb, timestamp, serial } from 'drizzle-orm/pg-core';

export const questions = pgTable('questions', {
  id: text('id').primaryKey(),
  category: text('category').notNull(),
  text: text('text').notNull(),
  type: text('type').notNull(), // 'multiple_choice' | 'textarea'
  options: jsonb('options'),    // Array of { label, text, scores } for multiple_choice
  placeholder: text('placeholder'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const submissions = pgTable('submissions', {
  id: text('id').primaryKey(),
  candidateName: text('candidate_name').notNull(),
  answers: jsonb('answers').notNull(), // { questionId: selectedLabel | textValue }
  submittedAt: timestamp('submitted_at').defaultNow().notNull()
});
