import React from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { calculatePersonalityScore, PERSONALITY_TRAITS } from '../../utils/personalityEngine';
import { 
  Users, 
  Sparkles,
  PieChart
} from 'lucide-react';

export default function AnalyticsOverview() {
  const { submissions, questions } = useAssessment();

  // Aggregate color statistics across all submissions
  const colorCounts = { red: 0, blue: 0, green: 0, yellow: 0 };
  const totalScoreSum = { red: 0, blue: 0, green: 0, yellow: 0 };

  submissions.forEach((sub) => {
    const res = calculatePersonalityScore(questions, sub.answers || {});
    colorCounts[res.primaryTrait.key]++;
    totalScoreSum.red += res.scores.red;
    totalScoreSum.blue += res.scores.blue;
    totalScoreSum.green += res.scores.green;
    totalScoreSum.yellow += res.scores.yellow;
  });

  const totalSubmissions = submissions.length;

  const colorStats = [
    {
      ...PERSONALITY_TRAITS.red,
      count: colorCounts.red,
      percent: totalSubmissions > 0 ? Math.round((colorCounts.red / totalSubmissions) * 100) : 0,
      totalScore: totalScoreSum.red
    },
    {
      ...PERSONALITY_TRAITS.blue,
      count: colorCounts.blue,
      percent: totalSubmissions > 0 ? Math.round((colorCounts.blue / totalSubmissions) * 100) : 0,
      totalScore: totalScoreSum.blue
    },
    {
      ...PERSONALITY_TRAITS.green,
      count: colorCounts.green,
      percent: totalSubmissions > 0 ? Math.round((colorCounts.green / totalSubmissions) * 100) : 0,
      totalScore: totalScoreSum.green
    },
    {
      ...PERSONALITY_TRAITS.yellow,
      count: colorCounts.yellow,
      percent: totalSubmissions > 0 ? Math.round((colorCounts.yellow / totalSubmissions) * 100) : 0,
      totalScore: totalScoreSum.yellow
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-extrabold text-slate-900 flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
            <span>Analistik Karakter & Kepribadian Kandidat</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Overview ringkasan hasil asesmen seluruh kandidat (Admin confidential view)
          </p>
        </div>

        <div className="bg-red-50 text-red-700 font-bold px-4 py-2 rounded-xl border border-red-200 flex items-center space-x-2 text-xs">
          <Users className="w-4 h-4 text-red-600" />
          <span>Total {totalSubmissions} Responden Asesmen</span>
        </div>
      </div>

      {/* 4 Color Concept Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {colorStats.map((stat) => (
          <div
            key={stat.key}
            className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 transition"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl">{stat.color.split(' ')[0]}</span>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${stat.bgBadge}`}>
                {stat.percent}% Kandidat
              </span>
            </div>

            <div>
              <h3 className="font-heading font-bold text-sm text-slate-900">{stat.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{stat.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Jumlah Dominan:</span>
              <span className="font-bold text-slate-900 text-sm">{stat.count} Orang</span>
            </div>
          </div>
        ))}
      </div>

      {/* Aggregate Distribution Bar Charts */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
          <PieChart className="w-4 h-4 text-red-600" />
          <h3 className="font-heading font-bold text-sm text-slate-900">
            Distribusi Proporsi Warna Kepribadian Kelompok
          </h3>
        </div>

        <div className="space-y-4">
          {colorStats.map((stat) => (
            <div key={stat.key} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-800 flex items-center space-x-2">
                  <span>{stat.color}</span>
                  <span className="text-slate-500 font-normal">({stat.description})</span>
                </span>
                <span className="font-bold text-slate-900">
                  {stat.count} Kandidat ({stat.percent}%)
                </span>
              </div>

              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${Math.max(stat.percent, 2)}%`,
                    backgroundColor: stat.accentColor
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights Card */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-red-600" />
          <h3 className="font-heading font-extrabold text-sm text-slate-900">Insight Evaluator Asesmen</h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          Matriks warna kepribadian ini berguna bagi Admin untuk pemetaan peran tim, alokasi tugas yang sesuai dengan kecenderungan alami kandidat (Pemimpin Red, Analis Blue, Pendukung Green, Kreator Yellow), serta memfasilitasi pengembangan potensi diri secara presisi.
        </p>
      </div>

    </div>
  );
}
