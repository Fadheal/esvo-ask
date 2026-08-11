import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_QUESTIONS } from '../data/defaultQuestions';

const AssessmentContext = createContext(null);

const AUTH_KEY = 'esvo_admin_session_auth';
const API_BASE = '/api';

const requestJson = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const errorMessage = typeof data === 'string' ? data : data?.error || `Request failed (${response.status})`;
    throw new Error(errorMessage);
  }

  return data;
};

export const AssessmentProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('submissions'); // 'submissions' | 'questions' | 'analytics'
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

  const refreshQuestions = async () => {
    const data = await requestJson('/questions');
    setQuestions(data);
    return data;
  };

  const refreshSubmissions = async () => {
    const data = await requestJson('/submissions');
    setSubmissions(data);
    return data;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        let questionData = await refreshQuestions();

        if (!Array.isArray(questionData) || questionData.length === 0) {
          await requestJson('/questions/seed', { method: 'POST' });
          questionData = await refreshQuestions();
        }

        await refreshSubmissions();
      } catch (error) {
        console.error('Failed to load assessment data from Neon DB', error);
        setQuestions(DEFAULT_QUESTIONS);
        setSubmissions([]);
      }

      const savedAuth = sessionStorage.getItem(AUTH_KEY);
      if (savedAuth === 'true') {
        setIsAdminAuthenticated(true);
      }
    };

    loadData();
  }, []);

  const adminLogin = (username, password) => {
    if (username === 'esvo' && password === 'nolingjosjis') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return { success: true };
    }
    return { success: false, message: 'Username atau Password salah!' };
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  const addQuestion = async (newQ) => {
    const payload = { ...newQ, id: newQ.id || 'custom_q_' + Date.now() };
    const savedQuestion = await requestJson('/questions', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    setQuestions((prev) => [...prev, savedQuestion]);
    return savedQuestion;
  };

  const updateQuestion = async (id, updatedQ) => {
    const savedQuestion = await requestJson(`/questions?id=${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(updatedQ)
    });
    setQuestions((prev) => prev.map((q) => (q.id === id ? savedQuestion : q)));
    return savedQuestion;
  };

  const deleteQuestion = async (id) => {
    await requestJson(`/questions?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleAddSubmission = async (submissionData) => {
    const newSub = await requestJson('/submissions', {
      method: 'POST',
      body: JSON.stringify(submissionData)
    });
    setSubmissions((prev) => [newSub, ...prev]);
    return newSub;
  };

  const handleDeleteSubmission = async (id) => {
    await requestJson(`/submissions?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
  };

  const handleResetData = async () => {
    await requestJson('/questions/reset', { method: 'POST' });
    const nextQuestions = await refreshQuestions();
    const nextSubmissions = await refreshSubmissions();
    return { questions: nextQuestions, submissions: nextSubmissions };
  };

  return (
    <AssessmentContext.Provider
      value={{
        questions,
        submissions,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        activeAdminTab,
        setActiveAdminTab,
        selectedSubmissionId,
        setSelectedSubmissionId,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        addSubmission: handleAddSubmission,
        deleteSubmission: handleDeleteSubmission,
        resetData: handleResetData
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
