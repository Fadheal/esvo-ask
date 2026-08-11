import React from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { calculatePersonalityScore, PERSONALITY_TRAITS } from '../../utils/personalityEngine';
import { 
  X, 
  User, 
  Calendar, 
  Mail, 
  Award, 
  CheckCircle2, 
  FileText,
  Printer,
  Sparkles
} from 'lucide-react';

export default function SubmissionDetailModal({ submissionId, onClose }) {
  const { submissions, questions } = useAssessment();
  const submission = submissions.find((sub) => sub.id === submissionId);

  if (!submission) return null;

  const result = calculatePersonalityScore(questions, submission.answers || {});
  const { primaryTrait, secondaryTrait, sortedTraits, percentages } = result;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-lg animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header - Clean Red & White Theme */}
        <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-heading text-lg font-extrabold tracking-tight">
                  Laporan Hasil Asesmen Kepribadian
                </h3>
                <span className="bg-white text-red-700 text-[10px] font-bold px-2 py-0.5 rounded">
                  Admin Confidential
                </span>
              </div>
              <p className="text-xs text-red-100 font-medium">
                ID Submisi: {submission.id}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-semibold flex items-center space-x-1 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cetak</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 bg-slate-50">
          
          {/* Candidate Meta Info */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-700 font-bold text-base flex items-center justify-center border border-red-200">
                {submission.candidateName?.charAt(0).toUpperCase() || 'K'}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">{submission.candidateName}</h4>
                <div className="flex items-center space-x-4 text-xs text-slate-500 mt-0.5">
                  <span className="flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{submission.email || 'N/A'}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(submission.submittedAt).toLocaleString('id-ID')}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Archetype Badge */}
            <div className={`px-4 py-2.5 rounded-xl border ${primaryTrait.bgBadge} flex items-center space-x-3`}>
              <span className="text-xl">{primaryTrait.color.split(' ')[0]}</span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Tipe Kepribadian Utama</div>
                <div className="text-sm font-extrabold">{primaryTrait.name}</div>
              </div>
            </div>
          </div>

          {/* Personality Archetype Summary & Color Distribution Matrix */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-red-600" />
              <h4 className="font-heading font-bold text-sm text-slate-900">
                Matriks Karakter & Persentase Warna Kepribadian
              </h4>
            </div>

            {/* Primary & Secondary Trait Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-red-50/60 border border-red-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">Karakter Dominan</span>
                  <span className="text-xs font-extrabold text-red-700">{percentages[primaryTrait.key]}%</span>
                </div>
                <h5 className="font-bold text-slate-900 text-sm mb-1">{primaryTrait.name}</h5>
                <p className="text-xs text-slate-600 mb-3">{primaryTrait.description}</p>
                <ul className="text-xs text-slate-700 space-y-1">
                  {primaryTrait.characteristics.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Karakter Sekunder</span>
                  <span className="text-xs font-extrabold text-slate-700">{percentages[secondaryTrait.key]}%</span>
                </div>
                <h5 className="font-bold text-slate-900 text-sm mb-1">{secondaryTrait.name}</h5>
                <p className="text-xs text-slate-600 mb-3">{secondaryTrait.description}</p>
                <ul className="text-xs text-slate-700 space-y-1">
                  {secondaryTrait.characteristics.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Visual Color Distribution Progress Bars */}
            <div className="space-y-3 pt-1">
              <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Distribusi Skor Warna Kepribadian
              </h5>

              {sortedTraits.map((trait) => (
                <div key={trait.key} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800 flex items-center space-x-2">
                      <span>{trait.color}</span>
                      <span className="text-slate-500 font-normal">({trait.description})</span>
                    </span>
                    <span className="font-bold text-slate-900">{trait.score} Poin ({trait.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="h-full transition-all duration-300 rounded-full"
                      style={{
                        width: `${trait.percentage}%`,
                        backgroundColor: trait.accentColor
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Candidate Answer Log */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <FileText className="w-4 h-4 text-red-600" />
              <h4 className="font-heading font-bold text-sm text-slate-900">
                Detail Jawaban Asesmen ({questions.length} Soal)
              </h4>
            </div>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const answerVal = submission.answers?.[q.id];
                const selectedOpt = q.type === 'multiple_choice'
                  ? q.options?.find((opt) => opt.label === answerVal)
                  : null;

                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-700">
                        Soal #{idx + 1} • {q.category}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        Tipe: {q.type === 'multiple_choice' ? 'Pilihan Ganda' : 'Textarea Refleksi'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-slate-900">{q.text}</p>

                    {/* Choice Response */}
                    {q.type === 'multiple_choice' && (
                      <div className="mt-2 pt-2 border-t border-slate-200">
                        {selectedOpt ? (
                          <div className="flex items-start space-x-2 text-xs font-semibold text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200">
                            <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold mr-1">Opsi {selectedOpt.label}:</span>
                              <span>{selectedOpt.text}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-slate-400 italic">Tidak dijawab</div>
                        )}
                      </div>
                    )}

                    {/* Textarea Response */}
                    {q.type === 'textarea' && (
                      <div className="mt-2 pt-2 border-t border-slate-200">
                        {answerVal ? (
                          <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans">
                            {answerVal}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-400 italic">Tidak dijawab</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-slate-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg transition cursor-pointer"
          >
            Tutup Laporan
          </button>
        </div>

      </div>
    </div>
  );
}
