import { createSubmission, deleteSubmission, listSubmissions } from '../submissions.js';

export async function submissionsHandler(req, res) {
  try {
    if (req.method === 'GET') {
      const submissions = await listSubmissions();
      return res.status(200).json(submissions.reverse());
    }

    if (req.method === 'POST') {
      const submission = await createSubmission(req.body);
      return res.status(201).json(submission);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('submissionsHandler error:', err);
    return res.status(500).json({ error: err.message });
  }
}

export async function submissionByIdHandler(req, res) {
  const { id } = req.query;
  try {
    if (req.method === 'DELETE') {
      await deleteSubmission(id);
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('submissionByIdHandler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
