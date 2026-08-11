import React, { useState } from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import QuestionFormModal from './QuestionFormModal';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  HelpCircle, 
  RotateCcw
} from 'lucide-react';

export default function QuestionManager() {
  const { questions, addQuestion, updateQuestion, deleteQuestion, resetData } = useAssessment();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Categories list
  const categories = ['all', ...new Set(questions.map((q) => q.category))];

  // Filtered questions
  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
    return true;
  });

  const handleSave = async (questionData) => {
    try {
      if (editingQuestion) {
        await updateQuestion(editingQuestion.id, questionData);
        setEditingQuestion(null);
      } else {
        await addQuestion(questionData);
        setIsCreating(false);
      }
    } catch (error) {
      console.error('Failed to save question', error);
      window.alert(error.message || 'Gagal menyimpan pertanyaan ke database.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-extrabold text-slate-900 flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
            <span>Manajemen Soal Asesmen Kepribadian</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Kelola {questions.length} pertanyaan asesmen (Pilihan Ganda A-E & Textarea Refleksi)
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              if (window.confirm('Reset daftar soal kembali ke default sampel awal?')) {
                resetData();
              }
            }}
            className="flex items-center space-x-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Soal Baru</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari pertanyaan berdasarkan kata kunci..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">Semua Kategori ({questions.length})</option>
          {categories.filter(c => c !== 'all').map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
            <HelpCircle className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5] mb-2" />
            <p className="text-sm font-medium">Tidak ada soal yang ditemukan.</p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-red-200 transition space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                    {q.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Tipe: {q.type === 'multiple_choice' ? 'Pilihan Ganda A-E' : 'Textarea Refleksi'}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setEditingQuestion(q)}
                    className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title="Edit Soal"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Hapus pertanyaan ini?')) {
                        deleteQuestion(q.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                    title="Hapus Soal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-relaxed">
                {q.text}
              </h4>

              {/* Multiple Choice Preview */}
              {q.type === 'multiple_choice' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                  {q.options?.map((opt) => (
                    <div
                      key={opt.label}
                      className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs flex items-start space-x-2"
                    >
                      <span className="w-5 h-5 rounded bg-red-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                        {opt.label}
                      </span>
                      <span className="text-slate-700 text-[11px] leading-tight line-clamp-2">
                        {opt.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Textarea Preview */}
              {q.type === 'textarea' && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500 italic">
                  [Textarea Field] Placeholder: "{q.placeholder || 'Tuliskan jawaban Anda...'}"
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Question Form Modal */}
      {(isCreating || editingQuestion) && (
        <QuestionFormModal
          question={editingQuestion}
          onSave={handleSave}
          onClose={() => {
            setIsCreating(false);
            setEditingQuestion(null);
          }}
        />
      )}

    </div>
  );
}
