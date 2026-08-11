import React, { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';

const DEFAULT_OPTIONS_AE = [
  { label: 'A', text: '', scores: { red: 5, blue: 1, green: 1, yellow: 1 } },
  { label: 'B', text: '', scores: { red: 1, blue: 5, green: 1, yellow: 1 } },
  { label: 'C', text: '', scores: { red: 1, blue: 1, green: 5, yellow: 1 } },
  { label: 'D', text: '', scores: { red: 1, blue: 1, green: 1, yellow: 5 } },
  { label: 'E', text: '', scores: { red: 0, blue: 2, green: 2, yellow: 2 } }
];

export default function QuestionFormModal({ question, onSave, onClose }) {
  const [category, setCategory] = useState(question?.category || 'Leadership & Influence');
  const [text, setText] = useState(question?.text || '');
  const [type, setType] = useState(question?.type || 'multiple_choice');
  const [placeholder, setPlaceholder] = useState(question?.placeholder || '');
  const [options, setOptions] = useState(
    question?.options && question.options.length > 0 ? question.options : DEFAULT_OPTIONS_AE
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSave({
      category,
      text,
      type,
      placeholder: type === 'textarea' ? placeholder : undefined,
      options: type === 'multiple_choice' ? options : undefined
    });
  };

  const handleOptionTextChange = (index, value) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, text: value } : opt))
    );
  };

  const handleScoreChange = (index, colorKey, value) => {
    const valNum = parseInt(value, 10) || 0;
    setOptions((prev) =>
      prev.map((opt, i) =>
        i === index
          ? {
              ...opt,
              scores: { ...opt.scores, [colorKey]: valNum }
            }
          : opt
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-lg animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-extrabold tracking-tight">
                {question ? 'Edit Pertanyaan Asesmen' : 'Tambah Pertanyaan Baru'}
              </h3>
              <p className="text-xs text-red-100 font-medium">Konfigurasi Soal Pilihan A-E & Bobot Warna</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 bg-slate-50">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Kategori Soal
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Leadership & Influence"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Tipe Soal
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="multiple_choice">Multiple Choice (Pilihan A, B, C, D, E)</option>
                <option value="textarea">Textarea (Open-ended Refleksi)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Pertanyaan / Situasi <span className="text-red-600">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="Tuliskan naskah pertanyaan atau deskripsi situasi di sini..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Textarea Placeholder option */}
          {type === 'textarea' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Textarea Placeholder
              </label>
              <input
                type="text"
                placeholder="Tuliskan petunjuk jawaban untuk kandidat..."
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          )}

          {/* Multiple Choice Options Builder */}
          {type === 'multiple_choice' && (
            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                  Konfigurasi Pilihan Jawaban A, B, C, D, E & Bobot Skor
                </h4>
                <span className="text-[11px] text-slate-500 font-semibold">🔴 Red | 🔵 Blue | 🟢 Green | 🟡 Yellow</span>
              </div>

              <div className="space-y-3">
                {options.map((opt, idx) => (
                  <div key={opt.label} className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {opt.label}
                      </div>
                      <input
                        type="text"
                        required
                        placeholder={`Teks Opsi ${opt.label}...`}
                        value={opt.text}
                        onChange={(e) => handleOptionTextChange(idx, e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    {/* Skor Weights Matrix */}
                    <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-100 text-[11px]">
                      <div className="flex items-center space-x-1 bg-red-50 p-1.5 rounded-md border border-red-100">
                        <span className="text-red-700 font-bold">🔴 Red:</span>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={opt.scores?.red ?? 0}
                          onChange={(e) => handleScoreChange(idx, 'red', e.target.value)}
                          className="w-full bg-white border border-red-200 text-center rounded py-0.5 text-xs font-bold text-red-700"
                        />
                      </div>
                      <div className="flex items-center space-x-1 bg-blue-50 p-1.5 rounded-md border border-blue-100">
                        <span className="text-blue-700 font-bold">🔵 Blue:</span>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={opt.scores?.blue ?? 0}
                          onChange={(e) => handleScoreChange(idx, 'blue', e.target.value)}
                          className="w-full bg-white border border-blue-200 text-center rounded py-0.5 text-xs font-bold text-blue-700"
                        />
                      </div>
                      <div className="flex items-center space-x-1 bg-emerald-50 p-1.5 rounded-md border border-emerald-100">
                        <span className="text-emerald-700 font-bold">🟢 Green:</span>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={opt.scores?.green ?? 0}
                          onChange={(e) => handleScoreChange(idx, 'green', e.target.value)}
                          className="w-full bg-white border border-emerald-200 text-center rounded py-0.5 text-xs font-bold text-emerald-700"
                        />
                      </div>
                      <div className="flex items-center space-x-1 bg-amber-50 p-1.5 rounded-md border border-amber-100">
                        <span className="text-amber-800 font-bold">🟡 Yel:</span>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={opt.scores?.yellow ?? 0}
                          onChange={(e) => handleScoreChange(idx, 'yellow', e.target.value)}
                          className="w-full bg-white border border-amber-200 text-center rounded py-0.5 text-xs font-bold text-amber-800"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-xl transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Simpan Soal
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
