import React, { useEffect } from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import SubmissionsList from './SubmissionsList';
import QuestionManager from './QuestionManager';
import AnalyticsOverview from './AnalyticsOverview';
import { ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const { activeAdminTab, submissions, questions, isAdminAuthenticated } = useAssessment();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAdminAuthenticated, navigate]);

  if (!isAdminAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans">
      
      {/* Red & White Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Admin Top Header Banner */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 sm:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading text-lg font-extrabold tracking-tight text-slate-900">
                Admin Dashboard
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Evaluasi Submisi, Bank Soal & Klasifikasi Karakter Kepribadian
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-semibold">
            <div className="px-3 py-1 bg-red-50 text-red-700 rounded-lg border border-red-200">
              Submisi: <strong>{submissions.length}</strong>
            </div>
            <div className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
              Bank Soal: <strong>{questions.length}</strong>
            </div>
          </div>
        </header>

        {/* Tab Content View */}
        <main className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {activeAdminTab === 'submissions' && <SubmissionsList />}
          {activeAdminTab === 'questions' && <QuestionManager />}
          {activeAdminTab === 'analytics' && <AnalyticsOverview />}
        </main>

      </div>

    </div>
  );
}
