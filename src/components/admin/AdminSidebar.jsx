import React from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  HelpCircle, 
  BarChart3, 
  RotateCcw,
  LogOut,
  Award,
  ShieldCheck
} from 'lucide-react';

export default function AdminSidebar() {
  const { 
    activeAdminTab, 
    setActiveAdminTab, 
    submissions, 
    questions, 
    resetData, 
    adminLogout 
  } = useAssessment();

  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between shrink-0">
      
      {/* Top Sidebar Content */}
      <div className="p-5 space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center space-x-3 pb-5 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shrink-0 shadow-xs">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-heading font-extrabold text-base tracking-tight text-slate-900">
                Esvo<span className="text-red-600">Assess</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-red-50 text-red-700 border border-red-200 rounded">
                Admin
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Evaluator System</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Menu Utama
          </div>

          <button
            onClick={() => setActiveAdminTab('submissions')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeAdminTab === 'submissions'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <FileText className="w-4 h-4" />
              <span>Hasil Asesmen</span>
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              activeAdminTab === 'submissions' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {submissions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('questions')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeAdminTab === 'questions'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <HelpCircle className="w-4 h-4" />
              <span>Kelola Soal</span>
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              activeAdminTab === 'questions' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {questions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeAdminTab === 'analytics'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analistik Karakter</span>
          </button>
        </div>

      </div>

      {/* Bottom Sidebar Footer */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        <button
          onClick={() => {
            if (window.confirm('Reset semua soal dan data ke default sampel?')) {
              resetData();
            }
          }}
          className="w-full flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
          <span>Reset Default</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition cursor-pointer border border-red-100"
        >
          <LogOut className="w-4 h-4 text-red-600" />
          <span>Logout Admin</span>
        </button>
      </div>

    </aside>
  );
}
