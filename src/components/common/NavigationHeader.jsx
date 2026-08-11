import React from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  HelpCircle, 
  BarChart3, 
  RotateCcw,
  LogOut,
  Award
} from 'lucide-react';

export default function NavigationHeader() {
  const { 
    isAdminAuthenticated,
    adminLogout,
    activeAdminTab, 
    setActiveAdminTab,
    submissions,
    questions,
    resetData 
  } = useAssessment();

  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & App Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-bold text-lg tracking-tight text-slate-900">
                  Esvo<span className="text-red-600">Assess</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Personal Assessment System</p>
            </div>
          </Link>

          {/* Admin Navigation Tabs (Shown when on /admin route and logged in) */}
          {isAdminRoute && isAdminAuthenticated && (
            <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setActiveAdminTab('submissions')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                  activeAdminTab === 'submissions'
                    ? 'bg-red-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Hasil Asesmen ({submissions.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('questions')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                  activeAdminTab === 'questions'
                    ? 'bg-red-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Kelola Soal ({questions.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('analytics')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                  activeAdminTab === 'analytics'
                    ? 'bg-red-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analistik Karakter</span>
              </button>
            </nav>
          )}

          {/* Right Header Actions (Reset & Logout for Admin) */}
          <div className="flex items-center space-x-3">
            {isAdminRoute && isAdminAuthenticated && (
              <>
                <button
                  onClick={() => {
                    if (window.confirm('Reset semua soal dan data ke default sampel?')) {
                      resetData();
                    }
                  }}
                  title="Reset Data ke Default"
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    adminLogout();
                    navigate('/admin/login');
                  }}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

        </div>

        {/* Mobile Admin Navigation Bar */}
        {isAdminRoute && isAdminAuthenticated && (
          <div className="md:hidden flex items-center space-x-1 py-2 border-t border-slate-100 overflow-x-auto">
            <button
              onClick={() => setActiveAdminTab('submissions')}
              className={`flex-1 flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap ${
                activeAdminTab === 'submissions'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Hasil ({submissions.length})</span>
            </button>
            <button
              onClick={() => setActiveAdminTab('questions')}
              className={`flex-1 flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap ${
                activeAdminTab === 'questions'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Soal ({questions.length})</span>
            </button>
            <button
              onClick={() => setActiveAdminTab('analytics')}
              className={`flex-1 flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap ${
                activeAdminTab === 'analytics'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Analistik</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
