import React, { useState } from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, User, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const { adminLogin } = useAssessment();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const result = adminLogin(username, password);

    if (result.success) {
      setErrorMsg('');
      navigate('/admin');
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      
      {/* Top Bar */}
      <div className="max-w-md mx-auto w-full pt-4">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-red-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Client Portal</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="max-w-md mx-auto w-full my-auto">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          
          <div className="flex items-center space-x-3 mb-6 border-b border-slate-100 pb-5">
            <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Admin Portal Login
              </h1>
              <p className="text-xs text-slate-500 font-medium">Esvo Personal Assessment System</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Username <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Masukkan username admin..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="Masukkan password admin..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs font-medium"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-2.5 rounded-xl font-medium">
                ⚠️ {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer text-xs uppercase tracking-wider"
            >
              <span>Masuk Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-4">
        Esvo Admin System © {new Date().getFullYear()} — Confidential Evaluator Portal
      </footer>

    </div>
  );
}
