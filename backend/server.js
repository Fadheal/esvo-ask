import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { questionsHandler, questionByIdHandler, questionsSeedHandler, questionsResetHandler } from './handlers/questions.js';
import { submissionsHandler, submissionByIdHandler } from './handlers/submissions.js';

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/questions', questionsHandler);
app.post('/api/questions', questionsHandler);
app.put('/api/questions/:id', questionByIdHandler);
app.delete('/api/questions/:id', questionByIdHandler);
app.post('/api/questions/seed', questionsSeedHandler);
app.post('/api/questions/reset', questionsResetHandler);

app.get('/api/submissions', submissionsHandler);
app.post('/api/submissions', submissionsHandler);
app.delete('/api/submissions/:id', submissionByIdHandler);

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
