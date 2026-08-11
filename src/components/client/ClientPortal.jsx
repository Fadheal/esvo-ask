import React, { useState } from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  Brain, 
  Send,
  BookOpen,
  Check
} from 'lucide-react';

export default function ClientPortal() {
  const { questions, addSubmission } = useAssessment();

  // State
  const [step, setStep] = useState('onboarding'); // 'onboarding' | 'questions' | 'completed'
  const [candidateName, setCandidateName] = useState('');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentQuestion = questions[currentQIndex];
  const progressPercent = questions.length > 0 ? Math.round(((currentQIndex + 1) / questions.length) * 100) : 0;

  const handleStartTest = (e) => {
    e.preventDefault();
    if (!candidateName.trim()) {
      setErrorMsg('Silakan masukkan nama lengkap Anda terlebih dahulu.');
      return;
    }
    setErrorMsg('');
    setStep('questions');
  };

  const handleSelectOption = (questionId, optionLabel) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionLabel
    }));
  };

  const handleTextareaChange = (questionId, text) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: text
    }));
  };

  const handleNext = () => {
    // Validate current question
    if (currentQuestion && !answers[currentQuestion.id]) {
      setErrorMsg('Silakan jawab pertanyaan ini sebelum melanjutkan.');
      return;
    }
    setErrorMsg('');

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    setErrorMsg('');
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await addSubmission({
        candidateName,
        answers
      });

      setIsSubmitting(false);
      setStep('completed');

      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti failed to run', err);
      }
    } catch (err) {
      console.error('Failed to submit assessment', err);
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Gagal mengirim jawaban ke database.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      
      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto w-full my-auto">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: ONBOARDING */}
          {step === 'onboarding' && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Personal Assessment Questionnaire
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Evaluasi Karakter & Gaya Kepemimpinan</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm mb-8 leading-relaxed">
                <p>
                  Selamat datang di asesmen kepribadian interaktif. Tes ini dirancang untuk memahami gaya kepemimpinan, cara berpikir, kecerdasan emosional, serta nilai-nilai personal Anda.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center space-x-3">
                    <BookOpen className="w-4 h-4 text-red-600" />
                    <span className="text-xs text-slate-700 font-medium">Total Soal: {questions.length} Pertanyaan</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-slate-700 font-medium">Pilihan Ganda A-E & Refleksi</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleStartTest} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Nama Lengkap Kandidat <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap Anda..."
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-medium transition"
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
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer text-sm"
                >
                  <span>Mulai Asesmen Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 2: QUESTIONNAIRE STEP-BY-STEP */}
          {step === 'questions' && currentQuestion && (
            <motion.div
              key={`q_${currentQuestion.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs"
            >
              {/* Question Header & Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-slate-600 font-semibold mb-2">
                  <span className="px-3 py-1 bg-red-50 text-red-700 rounded-md border border-red-100 font-bold">
                    {currentQuestion.category || 'Asesmen Kepribadian'}
                  </span>
                  <span className="text-slate-500">
                    Soal {currentQIndex + 1} dari {questions.length}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                  <motion.div
                    className="bg-red-600 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.25 }}
                  />
                </div>
              </div>

              {/* Question Body */}
              <div className="mb-6">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {currentQuestion.text}
                </h2>
              </div>

              {/* Multiple Choice Options (A - E) */}
              {currentQuestion.type === 'multiple_choice' && (
                <div className="space-y-3 mb-6">
                  {currentQuestion.options?.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleSelectOption(currentQuestion.id, opt.label)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3.5 cursor-pointer ${
                          isSelected
                            ? 'bg-red-50 border-red-500 text-slate-900 ring-2 ring-red-500/20 font-medium'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-red-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.label}
                        </div>
                        <div className="text-xs sm:text-sm pt-1 leading-relaxed">
                          {opt.text}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Textarea Option for Refleksi / Open Questions */}
              {currentQuestion.type === 'textarea' && (
                <div className="mb-6">
                  <textarea
                    rows={5}
                    placeholder={currentQuestion.placeholder || 'Tuliskan jawaban lengkap Anda di sini...'}
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleTextareaChange(currentQuestion.id, e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm leading-relaxed font-sans"
                  />
                  <div className="text-right text-xs text-slate-400 mt-1">
                    {(answers[currentQuestion.id] || '').length} Karakter
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-2.5 rounded-xl font-medium">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQIndex === 0}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                    currentQIndex === 0
                      ? 'opacity-40 cursor-not-allowed text-slate-400'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition cursor-pointer"
                >
                  <span>
                    {currentQIndex === questions.length - 1 ? 'Selesai & Kirim' : 'Selanjutnya'}
                  </span>
                  {currentQIndex === questions.length - 1 ? (
                    <Send className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: COMPLETION THANK YOU SCREEN */}
          {step === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xs text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-200">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
                Terima Kasih, {candidateName}! 🎉
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">
                Jawaban asesmen kepribadian Anda telah berhasil tersimpan. Hasil analisis karakter & tipe kepribadian Anda telah dikirimkan ke pihak Admin.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto mb-8 text-xs text-slate-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama:</span>
                  <span className="font-semibold text-slate-900">{candidateName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Pertanyaan:</span>
                  <span className="font-semibold text-slate-900">{questions.length} Soal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Submisi:</span>
                  <span className="font-bold text-emerald-600">Terverifikasi</span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    setStep('onboarding');
                    setCandidateName('');
                    setCurrentQIndex(0);
                    setAnswers({});
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 transition cursor-pointer"
                >
                  <span>Isi Asesmen Baru</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-4">
        Esvo Personal Assessment System © {new Date().getFullYear()} — Powered by Advanced Personality Classifier
      </footer>
    </div>
  );
}
