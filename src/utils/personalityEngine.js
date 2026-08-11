/**
 * Personality Engine - Scoring & Archetype Classifier
 */

export const PERSONALITY_TRAITS = {
  red: {
    key: 'red',
    name: 'Red (Leader)',
    color: '🔴 Red',
    bgBadge: 'bg-red-50 text-red-700 border-red-200',
    accentColor: '#DC2626',
    description: 'Leader, bold, competitive, result-oriented',
    characteristics: [
      'Orientasi pada hasil akhir dan efisiensi tinggi',
      'Berani mengambil keputusan dan risiko',
      'Tegas, percaya diri, dan independen',
      'Memiliki jiwa kepemimpinan alami saat krisis'
    ]
  },
  blue: {
    key: 'blue',
    name: 'Blue (Analytical)',
    color: '🔵 Blue',
    bgBadge: 'bg-blue-50 text-blue-700 border-blue-200',
    accentColor: '#2563EB',
    description: 'Analytical, meticulous, logical, perfectionist',
    characteristics: [
      'Analitis, teliti, dan mengutamakan akurasi data',
      'Sistematis dan terstruktur dalam bekerja',
      'Standar kualitas tinggi (perfectionist)',
      'Tenang, terencana, dan berpikir objektif'
    ]
  },
  green: {
    key: 'green',
    name: 'Green (Caring)',
    color: '🟢 Green',
    bgBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentColor: '#059669',
    description: 'Caring, stable, supportive, collaborative',
    characteristics: [
      'Empati tinggi, pendengar yang baik, dan penuh kepedulian',
      'Menjaga keharmonisan dan menghindari konflik tidak perlu',
      'Setia, konsisten, dan dapat diandalkan',
      'Kolaboratif dan mengutamakan kebersamaan tim'
    ]
  },
  yellow: {
    key: 'yellow',
    name: 'Yellow (Creative)',
    color: '🟡 Yellow',
    bgBadge: 'bg-amber-50 text-amber-800 border-amber-200',
    accentColor: '#D97706',
    description: 'Creative, communicative, inspiring',
    characteristics: [
      'Kreatif, penuh ide-ide segar dan inovasi',
      'Komunikatif, ramah, dan mudah bergaul',
      'Antusias, penuh semangat, dan menginspirasi',
      'Fleksibel dan terbuka terhadap pengalaman baru'
    ]
  }
};

/**
 * Calculate total scores and percentages for a candidate submission
 * @param {Array} questions List of questions
 * @param {Object} answers Answers map { questionId: selectedOptionLabel or textValue }
 * @returns {Object} Analysis results with scores, percentages, primary trait & sub-trait
 */
export function calculatePersonalityScore(questions, answers) {
  const scores = { red: 0, blue: 0, green: 0, yellow: 0 };
  let answeredMultipleChoiceCount = 0;

  if (!questions || !answers) {
    return {
      scores,
      percentages: { red: 0, blue: 0, green: 0, yellow: 0 },
      primaryTrait: PERSONALITY_TRAITS.red,
      secondaryTrait: PERSONALITY_TRAITS.yellow,
      totalScore: 0
    };
  }

  questions.forEach((q) => {
    if (q.type === 'multiple_choice' && answers[q.id]) {
      const selectedLabel = answers[q.id];
      const selectedOpt = q.options?.find((opt) => opt.label === selectedLabel);

      if (selectedOpt && selectedOpt.scores) {
        answeredMultipleChoiceCount++;
        scores.red += selectedOpt.scores.red || 0;
        scores.blue += selectedOpt.scores.blue || 0;
        scores.green += selectedOpt.scores.green || 0;
        scores.yellow += selectedOpt.scores.yellow || 0;
      }
    }
  });

  const totalScore = scores.red + scores.blue + scores.green + scores.yellow;

  const percentages = {
    red: totalScore > 0 ? Math.round((scores.red / totalScore) * 100) : 25,
    blue: totalScore > 0 ? Math.round((scores.blue / totalScore) * 100) : 25,
    green: totalScore > 0 ? Math.round((scores.green / totalScore) * 100) : 25,
    yellow: totalScore > 0 ? Math.round((scores.yellow / totalScore) * 100) : 25
  };

  // Adjust rounding sum to exactly 100%
  const sumP = percentages.red + percentages.blue + percentages.green + percentages.yellow;
  if (sumP !== 100 && totalScore > 0) {
    const diff = 100 - sumP;
    const highestKey = Object.keys(percentages).reduce((a, b) =>
      percentages[a] > percentages[b] ? a : b
    );
    percentages[highestKey] += diff;
  }

  // Determine sorted traits
  const sortedTraits = Object.keys(scores)
    .map((key) => ({
      key,
      score: scores[key],
      percentage: percentages[key],
      ...PERSONALITY_TRAITS[key]
    }))
    .sort((a, b) => b.score - a.score || b.percentage - a.percentage);

  const primaryTrait = sortedTraits[0] || PERSONALITY_TRAITS.red;
  const secondaryTrait = sortedTraits[1] || PERSONALITY_TRAITS.yellow;

  return {
    scores,
    percentages,
    totalScore,
    answeredMultipleChoiceCount,
    primaryTrait,
    secondaryTrait,
    sortedTraits
  };
}
