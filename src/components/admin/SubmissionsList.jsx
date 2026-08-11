import React, { useState } from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { calculatePersonalityScore } from '../../utils/personalityEngine';
import SubmissionDetailModal from './SubmissionDetailModal';
import { 
  Search, 
  Trash2, 
  Eye, 
  FileText, 
  Calendar,
  Filter,
  Download
} from 'lucide-react';

export default function SubmissionsList() {
  const { submissions, questions, deleteSubmission } = useAssessment();
  const [searchTerm, setSearchTerm] = useState('');
  const [colorFilter, setColorFilter] = useState('all');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

  // Filter Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch = 
      sub.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email?.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (colorFilter !== 'all') {
      const res = calculatePersonalityScore(questions, sub.answers || {});
      return res.primaryTrait.key === colorFilter;
    }

    return true;
  });

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `esvo_submissions_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-extrabold text-slate-900 flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
            <span>Hasil Submisi Asesmen Kepribadian</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Menampilkan {filteredSubmissions.length} dari total {submissions.length} kandidat
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportJSON}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Data JSON</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari kandidat berdasarkan nama atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Semua Tipe Karakter</option>
            <option value="red">🔴 Red (Leader)</option>
            <option value="blue">🔵 Blue (Analytical)</option>
            <option value="green">🟢 Green (Caring)</option>
            <option value="yellow">🟡 Yellow (Creative)</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {filteredSubmissions.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <FileText className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5]" />
            <p className="text-sm font-medium">Belum ada data submisi yang sesuai filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Kandidat</th>
                  <th className="px-6 py-4">Waktu Submisi</th>
                  <th className="px-6 py-4">Tipe Kepribadian Dominan</th>
                  <th className="px-6 py-4">Distribusi Karakter</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubmissions.map((sub) => {
                  const result = calculatePersonalityScore(questions, sub.answers || {});
                  const { primaryTrait, percentages } = result;

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-700 font-bold flex items-center justify-center border border-red-200">
                            {sub.candidateName?.charAt(0).toUpperCase() || 'K'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{sub.candidateName}</div>
                            <div className="text-slate-400">{sub.email || 'N/A'}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{new Date(sub.submittedAt).toLocaleDateString('id-ID')}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs font-bold ${primaryTrait.bgBadge}`}>
                          <span>{primaryTrait.color.split(' ')[0]}</span>
                          <span>{primaryTrait.name}</span>
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 text-[11px] font-semibold">
                          <span className="text-red-600">🔴 {percentages.red}%</span>
                          <span className="text-blue-600">🔵 {percentages.blue}%</span>
                          <span className="text-emerald-600">🟢 {percentages.green}%</span>
                          <span className="text-amber-600">🟡 {percentages.yellow}%</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => setSelectedSubmissionId(sub.id)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-xs transition inline-flex items-center space-x-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail Report</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus submisi milik ${sub.candidateName}?`)) {
                              deleteSubmission(sub.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          title="Hapus Submisi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmissionId && (
        <SubmissionDetailModal
          submissionId={selectedSubmissionId}
          onClose={() => setSelectedSubmissionId(null)}
        />
      )}

    </div>
  );
}
