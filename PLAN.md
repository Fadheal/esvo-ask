# 📋 PLAN.md - Personality Assessment Web Application

Detailed architectural and implementation plan for the **Personality Assessment Questionnaire Web Application**.

---

## 🎯 Project Overview

A dual-interface web application designed for personal assessment:
1. **Admin Page**: Clean UI/UX featuring a **Red & White** color theme. Allows admins to manage assessment questions (Multiple choice A-E and Textarea open-ended questions), review candidate submissions, and analyze personality trait scores.
2. **Client Page**: An interactive, highly animated form assessment questionnaire for candidates.
3. **Personality Classification System (Admin Only)**:
   - 🔴 **Red (Leader)**: Bold, competitive, result-oriented.
   - 🔵 **Blue (Analytical)**: Meticulous, logical, perfectionist.
   - 🟢 **Green (Caring)**: Stable, supportive, collaborative.
   - 🟡 **Yellow (Creative)**: Communicative, inspiring, innovative.
   - *Note: Personality classification results are hidden from the candidate and visible exclusively to the Admin.*

---

## 🏗️ Architecture & Component Hierarchy

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminHeader.jsx          # Red & White themed header & nav switch
│   │   ├── AnalyticsOverview.jsx    # Summary stats & color trait charts
│   │   ├── QuestionManager.jsx      # Add/Edit/Delete A-E & Textarea questions
│   │   ├── QuestionFormModal.jsx    # Modal for creating/editing questions
│   │   ├── SubmissionsList.jsx      # Submissions table with search & filter
│   │   └── SubmissionDetailModal.jsx# Comprehensive report with color radar/bar breakdown
│   │
│   ├── client/
│   │   ├── ClientHeader.jsx         # Candidate header with progress bar
│   │   ├── OnboardingStep.jsx       # Name & details entry with start button
│   │   ├── QuestionCard.jsx         # Interactive choice (A-E) & textarea card
│   │   ├── StepNavigation.jsx       # Prev / Next / Submit buttons
│   │   └── CompletionStep.jsx       # Animated thank-you screen (Confetti)
│   │
│   └── ui/                          # Reusable UI components (Buttons, Modals, Badges)
│
├── context/
│   └── AssessmentContext.jsx        # Data store (Questions, Submissions, Active Mode)
│
├── data/
│   └── defaultQuestions.js          # Complete default dataset with sample questions
│
├── utils/
│   ├── personalityEngine.js         # Scoring algorithm (Red, Blue, Green, Yellow)
│   └── storage.js                   # LocalStorage persistence & export/import
│
├── App.jsx                          # Main application layout & mode router
└── index.css                        # Red & White theme tokens & Tailwind config
```

---

## 🎨 UI/UX Design System

### Admin Interface (Red & White Theme)
- **Primary Color**: `#DC2626` (Red-600)
- **Primary Accent**: `#B91C1C` (Red-700)
- **Background**: `#FFFFFF` (Pure White) & `#F9FAFB` (Subtle off-white)
- **Borders & Dividers**: `#F3F4F6` / `#E5E7EB`
- **Typography**: Inter / Outfit sans-serif font
- **Visual Style**: Clean dashboard layout, crisp card shadows, red pill badges, structured data tables.

### Client Interface (Interactive & Animated UX)
- **Visual Style**: Modern glassmorphism cards, vibrant accents, smooth micro-interactions.
- **Animations**:
  - **Framer Motion**: Smooth slide transitions between question steps.
  - **Option Selection**: Tactile scaling effect and active ring highlight when clicking A, B, C, D, E.
  - **Progress Bar**: Fluid width expansion as candidate advances.
  - **Confetti**: Celebratory particle burst upon final submission.

---

## 📊 Personality Scoring Engine (`personalityEngine.js`)

Each choice (A, B, C, D, E) carries point weights across the 4 primary character colors:

```javascript
// Example Question Scoring Mapping Structure
{
  id: 'q1',
  category: 'Leadership & Influence',
  text: 'Situasi: Saat tim projek kelas mengalami miskomunikasi, Anda memilih untuk...',
  type: 'multiple_choice',
  options: [
    { label: 'A', text: 'Memimpin pertemuan singkat untuk menegaskan tujuan dan tugas masing-masing.', scores: { red: 5, blue: 2, green: 1, yellow: 2 } },
    { label: 'B', text: 'Mengusulkan pembagian tugas ulang berdasarkan kekuatan tiap anggota.', scores: { red: 2, blue: 3, green: 4, yellow: 2 } },
    { label: 'C', text: 'Menunggu klarifikasi dari guru sebelum bertindak.', scores: { red: 0, blue: 4, green: 3, yellow: 0 } },
    { label: 'D', text: 'Menghindari konflik, fokus pada pekerjaan yang bisa diselesaikan.', scores: { red: 1, blue: 3, green: 2, yellow: 0 } },
    { label: 'E', text: 'Minta teman lain yang lebih tegas mengambil alih.', scores: { red: 0, blue: 1, green: 3, yellow: 3 } }
  ]
}
```

### Dominant Personality Determination:
1. Sum all option scores for candidate selections: $S_{red}$, $S_{blue}$, $S_{green}$, $S_{yellow}$.
2. Calculate percentage distribution: $P_{color} = \frac{S_{color}}{\sum S} \times 100\%$.
3. Determine **Primary Personality Type** based on the highest scoring color:
   - 🔴 **Red**: Leader, bold, competitive, result-oriented
   - 🔵 **Blue**: Analytical, meticulous, logical, perfectionist
   - 🟢 **Green**: Caring, stable, supportive, collaborative
   - 🟡 **Yellow**: Creative, communicative, inspiring

---

## 📝 Preloaded Question Categories (Default Dataset)

1. **Leadership & Influence** (Miskomunikasi tim projek)
2. **Thinking Style & Decision Making** (Dua opsi tugas berisiko)
3. **Emotional Intelligence** (Teman sedih karena nilai ujian)
4. **Creativity & Innovation** (Alat belajar di kelas kurang)
5. **Social Interaction** (Kelompok tugas sering gaduh)
6. **Responsibility & Discipline** (Terlambat mengumpulkan tugas)
7. **Motivation & Goals** (Kehilangan tujuan semester)
8. **Personal Values & Integrity** (Teman meminta jawaban tugas)
9. **Deep Personality Questions** (10 detailed reflection questions, e.g. Menghadapi kegagalan besar)
