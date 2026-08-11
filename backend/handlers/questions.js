import { createQuestion, deleteQuestion, listQuestions, seedQuestions, resetQuestions, updateQuestion } from '../questions.js';
import { DEFAULT_QUESTIONS } from '../../src/data/defaultQuestions.js';

export async function questionsHandler(req, res) {
  const id = req.params?.id || req.query?.id;

  try {
    if (req.method === 'GET') {
      const questions = await listQuestions();
      return res.status(200).json(questions);
    }

    if (req.method === 'POST') {
      const question = await createQuestion(req.body);
      return res.status(201).json(question);
    }

    if (req.method === 'PUT') {
      if (!id) {
        return res.status(400).json({ error: 'Question id is required' });
      }

      const question = await updateQuestion(id, req.body);
      return res.status(200).json(question);
    }

    if (req.method === 'DELETE') {
      if (!id) {
        return res.status(400).json({ error: 'Question id is required' });
      }

      await deleteQuestion(id);
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('questionsHandler error:', err);
    return res.status(500).json({ error: err.message });
  }
}

export async function questionByIdHandler(req, res) {
  const id = req.params?.id || req.query?.id;
  try {
    if (req.method === 'PUT') {
      const question = await updateQuestion(id, req.body);
      return res.status(200).json(question);
    }

    if (req.method === 'DELETE') {
      await deleteQuestion(id);
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('questionByIdHandler error:', err);
    return res.status(500).json({ error: err.message });
  }
}

export async function questionsSeedHandler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const result = await seedQuestions(DEFAULT_QUESTIONS);
    return res.status(result.seeded ? 201 : 200).json(result);
  } catch (err) {
    console.error('questionsSeedHandler error:', err);
    return res.status(500).json({ error: err.message });
  }
}

export async function questionsResetHandler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const result = await resetQuestions(DEFAULT_QUESTIONS);
    return res.status(200).json(result);
  } catch (err) {
    console.error('questionsResetHandler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
