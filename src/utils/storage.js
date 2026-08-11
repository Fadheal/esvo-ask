import { DEFAULT_QUESTIONS } from '../data/defaultQuestions';

const QUESTIONS_KEY = 'esvo_personality_questions_v1';
const SUBMISSIONS_KEY = 'esvo_personality_submissions_v1';

// Seed sample dummy submissions if none exist
const INITIAL_SUBMISSIONS = [
  {
    id: 'sub_demo_1',
    candidateName: 'Budi Pratama',
    email: 'budi.pratama@example.com',
    submittedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    answers: {
      q1: 'A',
      q2: 'A',
      q3: 'A',
      q4: 'A',
      q5: 'A',
      q6: 'A',
      q7: 'A',
      q8: 'A',
      deep_q1: 'A',
      deep_q2: 'A',
      deep_q3: 'A',
      deep_q4: 'A',
      deep_q5: 'A',
      deep_q6: 'A',
      deep_q7: 'A',
      deep_q8: 'A',
      deep_q9: 'Saya pernah mengalami kegagalan saat lomba karya ilmiah. Namun saya segera melakukan evaluasi ulang dan memimpin tim untuk mencoba lagi.',
      deep_q10: 'Ingin meningkatkan kemampuan kepemimpinan dan manajemen konflik.'
    }
  },
  {
    id: 'sub_demo_2',
    candidateName: 'Siti Rahmawati',
    email: 'siti.rahmawati@example.com',
    submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    answers: {
      q1: 'B',
      q2: 'B',
      q3: 'B',
      q4: 'A',
      q5: 'B',
      q6: 'B',
      q7: 'B',
      q8: 'A',
      deep_q1: 'B',
      deep_q2: 'C',
      deep_q3: 'C',
      deep_q4: 'C',
      deep_q5: 'C',
      deep_q6: 'C',
      deep_q7: 'C',
      deep_q8: 'C',
      deep_q9: 'Mendengarkan dan merangkul teman-teman kelas yang sedang tertekan.',
      deep_q10: 'Mengembangkan rasa empati dan kemampuan kolaborasi tim.'
    }
  }
];

export function getStoredQuestions() {
  try {
    const data = localStorage.getItem(QUESTIONS_KEY);
    if (!data) {
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(DEFAULT_QUESTIONS));
      return DEFAULT_QUESTIONS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading questions from localStorage', e);
    return DEFAULT_QUESTIONS;
  }
}

export function saveStoredQuestions(questions) {
  try {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
  } catch (e) {
    console.error('Error saving questions to localStorage', e);
  }
}

export function getStoredSubmissions() {
  try {
    const data = localStorage.getItem(SUBMISSIONS_KEY);
    if (!data) {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(INITIAL_SUBMISSIONS));
      return INITIAL_SUBMISSIONS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading submissions from localStorage', e);
    return INITIAL_SUBMISSIONS;
  }
}

export function saveSubmission(submission) {
  try {
    const current = getStoredSubmissions();
    const updated = [submission, ...current];
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving submission to localStorage', e);
    return [];
  }
}

export function deleteSubmission(id) {
  try {
    const current = getStoredSubmissions();
    const updated = current.filter((sub) => sub.id !== id);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error deleting submission', e);
    return [];
  }
}

export function resetAllDataToDefault() {
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(DEFAULT_QUESTIONS));
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(INITIAL_SUBMISSIONS));
  return { questions: DEFAULT_QUESTIONS, submissions: INITIAL_SUBMISSIONS };
}
