export const DEFAULT_QUESTIONS = [
  {
    id: 'q1',
    category: 'Leadership & Influence',
    text: 'Situasi: Saat tim projek kelas mengalami miskomunikasi, Anda memilih untuk...',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Memimpin pertemuan singkat untuk menegaskan tujuan dan tugas masing-masing.',
        scores: { red: 5, blue: 2, green: 1, yellow: 2 }
      },
      {
        label: 'B',
        text: 'Mengusulkan pembagian tugas ulang berdasarkan kekuatan tiap anggota.',
        scores: { red: 2, blue: 3, green: 4, yellow: 2 }
      },
      {
        label: 'C',
        text: 'Menunggu klarifikasi dari guru sebelum bertindak.',
        scores: { red: 0, blue: 4, green: 3, yellow: 0 }
      },
      {
        label: 'D',
        text: 'Menghindari konflik, fokus pada pekerjaan yang bisa diselesaikan.',
        scores: { red: 1, blue: 3, green: 2, yellow: 0 }
      },
      {
        label: 'E',
        text: 'Minta teman lain yang lebih tegas mengambil alih.',
        scores: { red: 0, blue: 1, green: 3, yellow: 3 }
      }
    ]
  },
  {
    id: 'q2',
    category: 'Thinking Style & Decision Making',
    text: 'Situasi: Guru memberikan dua opsi tugas dengan risiko berbeda. Anda memutuskan untuk...',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Melakukan analisis biaya-manfaat cepat, lalu memilih yang paling menguntungkan.',
        scores: { red: 4, blue: 4, green: 1, yellow: 1 }
      },
      {
        label: 'B',
        text: 'Membuat daftar pro/con dan memilih berdasarkan konsensus kelompok.',
        scores: { red: 1, blue: 3, green: 4, yellow: 2 }
      },
      {
        label: 'C',
        text: 'Mengambil opsi yang terasa paling mudah dikerjakan.',
        scores: { red: 1, blue: 1, green: 3, yellow: 2 }
      },
      {
        label: 'D',
        text: 'Menunda keputusan sambil mengumpulkan data tambahan.',
        scores: { red: 0, blue: 5, green: 2, yellow: 0 }
      },
      {
        label: 'E',
        text: 'Mengikuti saran teman terdekat.',
        scores: { red: 0, blue: 1, green: 4, yellow: 3 }
      }
    ]
  },
  {
    id: 'q3',
    category: 'Emotional Intelligence',
    text: 'Situasi: Temanmu tampak sedih karena nilai ujian yang buruk. Kamu...',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Menyampaikannya dengan tegas bahwa semua orang bisa salah, fokus pada solusi.',
        scores: { red: 4, blue: 2, green: 1, yellow: 1 }
      },
      {
        label: 'B',
        text: 'Mendengarkan tanpa menghakimi, menanyakan apa yang bisa membantu.',
        scores: { red: 1, blue: 2, green: 5, yellow: 2 }
      },
      {
        label: 'C',
        text: 'Menghindar agar tidak membuat situasi lebih buruk.',
        scores: { red: 0, blue: 3, green: 1, yellow: 0 }
      },
      {
        label: 'D',
        text: 'Menawarkan bantuan belajar bersama.',
        scores: { red: 2, blue: 2, green: 4, yellow: 2 }
      },
      {
        label: 'E',
        text: 'Mengatakan bahwa nilai bukan segalanya.',
        scores: { red: 0, blue: 1, green: 3, yellow: 4 }
      }
    ]
  },
  {
    id: 'q4',
    category: 'Creativity & Innovation',
    text: 'Situasi: Alat belajar di kelas kurang, kamu...',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Merancang alat pembelajaran alternatif sederhana dari bahan bekas.',
        scores: { red: 3, blue: 2, green: 1, yellow: 5 }
      },
      {
        label: 'B',
        text: 'Mengusulkan ide presentasi kreatif dengan media digital.',
        scores: { red: 2, blue: 2, green: 1, yellow: 5 }
      },
      {
        label: 'C',
        text: 'Mengandalkan materi yang ada tanpa inovasi.',
        scores: { red: 0, blue: 3, green: 2, yellow: 0 }
      },
      {
        label: 'D',
        text: 'Meminta guru menyediakan fasilitas tambahan.',
        scores: { red: 3, blue: 2, green: 2, yellow: 1 }
      },
      {
        label: 'E',
        text: 'Menunda ide sampai ada sponsor.',
        scores: { red: 0, blue: 3, green: 1, yellow: 1 }
      }
    ]
  },
  {
    id: 'q5',
    category: 'Social Interaction',
    text: 'Situasi: Kelompok tugas sering gaduh. Kamu...',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Mengatur pertemuan rutin dan aturan kerja kelompok.',
        scores: { red: 5, blue: 3, green: 1, yellow: 1 }
      },
      {
        label: 'B',
        text: 'Mendorong pembagian peran berdasarkan minat.',
        scores: { red: 2, blue: 2, green: 3, yellow: 4 }
      },
      {
        label: 'C',
        text: 'Biarkan teman lain mengatur, kamu fokus pada pekerjaan.',
        scores: { red: 0, blue: 4, green: 2, yellow: 0 }
      },
      {
        label: 'D',
        text: 'Menghindari diskusi untuk mengurangi konflik.',
        scores: { red: 0, blue: 2, green: 3, yellow: 0 }
      },
      {
        label: 'E',
        text: 'Menyalahkan satu anggota.',
        scores: { red: 2, blue: 0, green: 0, yellow: 0 }
      }
    ]
  },
  {
    id: 'q6',
    category: 'Responsibility & Discipline',
    text: 'Situasi: Kamu terlambat mengumpulkan tugas penting. Reaksi kamu...',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Segera menebus dengan kerja extra dan menjadwalkan ulang.',
        scores: { red: 5, blue: 3, green: 1, yellow: 1 }
      },
      {
        label: 'B',
        text: 'Mengakui kesalahan dan membuat rencana perbaikan.',
        scores: { red: 2, blue: 4, green: 3, yellow: 1 }
      },
      {
        label: 'C',
        text: 'Menunda karena tugas kecil tidak terlalu penting.',
        scores: { red: 0, blue: 1, green: 1, yellow: 1 }
      },
      {
        label: 'D',
        text: 'Menyalahkan situasi luar kendali.',
        scores: { red: 1, blue: 0, green: 0, yellow: 1 }
      },
      {
        label: 'E',
        text: 'Mengabaikan konsekuensi.',
        scores: { red: 0, blue: 0, green: 0, yellow: 0 }
      }
    ]
  },
  {
    id: 'q7',
    category: 'Motivation & Goals',
    text: 'Situasi: Kamu merasa kehilangan tujuan selama semester ini. Kamu...',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Merevisi tujuan kecil yang realistis dan membuat rencana rutin.',
        scores: { red: 4, blue: 4, green: 2, yellow: 1 }
      },
      {
        label: 'B',
        text: 'Mencari inspirasi dari mentor atau contoh sukses.',
        scores: { red: 2, blue: 1, green: 3, yellow: 5 }
      },
      {
        label: 'C',
        text: 'Mencoba melanjutkan seperti biasa tanpa perubahan besar.',
        scores: { red: 1, blue: 2, green: 3, yellow: 0 }
      },
      {
        label: 'D',
        text: 'Menunda evaluasi hingga suasana hati membaik.',
        scores: { red: 0, blue: 2, green: 2, yellow: 1 }
      },
      {
        label: 'E',
        text: 'Fokus pada nilai materi tanpa tujuan pribadi.',
        scores: { red: 2, blue: 2, green: 0, yellow: 0 }
      }
    ]
  },
  {
    id: 'q8',
    category: 'Personal Values & Integrity',
    text: 'Situasi: Teman meminta jawaban tugas milikmu yang belum selesai. Kamu...',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Menolak dengan sopan dan menawarkan bantuan belajar bersama.',
        scores: { red: 3, blue: 3, green: 4, yellow: 2 }
      },
      {
        label: 'B',
        text: 'Menyelesaikan jawabanmu dulu, kemudian lihat bagaimana membantu.',
        scores: { red: 3, blue: 4, green: 2, yellow: 1 }
      },
      {
        label: 'C',
        text: 'Mengarahkan mereka untuk mencari jawaban sendiri.',
        scores: { red: 2, blue: 3, green: 1, yellow: 1 }
      },
      {
        label: 'D',
        text: 'Menyerahkan jawaban tanpa dicek kebenarannya.',
        scores: { red: 0, blue: 0, green: 2, yellow: 2 }
      },
      {
        label: 'E',
        text: 'Mengorbankan integritas demi menjaga persahabatan.',
        scores: { red: 0, blue: 0, green: 3, yellow: 2 }
      }
    ]
  },
  // Deep Personality Questions (10 Questions)
  {
    id: 'deep_q1',
    category: 'Deep Personality',
    text: 'Pertanyaan 1: Saat menghadapi kegagalan besar, apa yang paling kamu rasakan?',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Dorongan untuk mencoba lagi dengan pendekatan berbeda.',
        scores: { red: 5, blue: 3, green: 1, yellow: 3 }
      },
      {
        label: 'B',
        text: 'Kehilangan semangat sementara, lalu bangkit.',
        scores: { red: 2, blue: 2, green: 4, yellow: 2 }
      },
      {
        label: 'C',
        text: 'Perasaan malu, tetapi tetap mencoba.',
        scores: { red: 1, blue: 3, green: 3, yellow: 1 }
      },
      {
        label: 'D',
        text: 'Mudah menyerah, mencari jalan mudah.',
        scores: { red: 0, blue: 1, green: 1, yellow: 1 }
      },
      {
        label: 'E',
        text: 'Marah pada diri sendiri dan orang lain.',
        scores: { red: 3, blue: 0, green: 0, yellow: 0 }
      }
    ]
  },
  {
    id: 'deep_q2',
    category: 'Deep Personality',
    text: 'Pertanyaan 2: Bagaimana cara utama Anda mengatasi tekanan atau resah dalam hidup sehari-hari?',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Mengambil tindakan nyata langsung untuk menyelesaikan akar masalahnya.',
        scores: { red: 5, blue: 2, green: 1, yellow: 1 }
      },
      {
        label: 'B',
        text: 'Membuat perencanaan tertulis dan menganalisis opsi secara terstruktur.',
        scores: { red: 2, blue: 5, green: 1, yellow: 1 }
      },
      {
        label: 'C',
        text: 'Bercerita atau menghabiskan waktu bersama sahabat dan keluarga.',
        scores: { red: 1, blue: 1, green: 5, yellow: 3 }
      },
      {
        label: 'D',
        text: 'Mencari hiburan kreatif, seni, musik, atau jalan-jalan outdoor.',
        scores: { red: 1, blue: 1, green: 2, yellow: 5 }
      },
      {
        label: 'E',
        text: 'Menyendiri dan mengisolasi diri sampai perasaan mereda.',
        scores: { red: 0, blue: 3, green: 2, yellow: 0 }
      }
    ]
  },
  {
    id: 'deep_q3',
    category: 'Deep Personality',
    text: 'Pertanyaan 3: Ketika memasuki lingkungan baru yang asing, respon spontan Anda adalah...',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Segera mengambil inisiatif memperkenalkan diri dan mencairkan suasana.',
        scores: { red: 4, blue: 1, green: 2, yellow: 5 }
      },
      {
        label: 'B',
        text: 'Mengamati situasi dari jauh dan mempelajari dinamika orang-orang sekitar.',
        scores: { red: 1, blue: 5, green: 2, yellow: 1 }
      },
      {
        label: 'C',
        text: 'Mencari satu atau dua orang yang tampak ramah untuk diajak bicara tenang.',
        scores: { red: 1, blue: 2, green: 5, yellow: 2 }
      },
      {
        label: 'D',
        text: 'Menyampaikan ide-ide menarik atau cerita humor agar disukai.',
        scores: { red: 2, blue: 1, green: 2, yellow: 5 }
      },
      {
        label: 'E',
        text: 'Menunggu sampai ada yang mendatangi Anda terlebih dahulu.',
        scores: { red: 0, blue: 2, green: 3, yellow: 0 }
      }
    ]
  },
  {
    id: 'deep_q4',
    category: 'Deep Personality',
    text: 'Pertanyaan 4: Apa yang paling memotivasi Anda dalam mengejar impian masa depan?',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Pencapaian tinggi, pengaruh, dan kemenangan dalam tantangan.',
        scores: { red: 5, blue: 1, green: 1, yellow: 2 }
      },
      {
        label: 'B',
        text: 'Penguasaan keahlian mendalam dan standar kualitas sempurna.',
        scores: { red: 2, blue: 5, green: 1, yellow: 1 }
      },
      {
        label: 'C',
        text: 'Kedamaian hidup, hubungan harmonis, dan kebermanfaatan bagi sesama.',
        scores: { red: 1, blue: 1, green: 5, yellow: 2 }
      },
      {
        label: 'D',
        text: 'Kebebasan mengekspresikan diri dan pengalaman baru yang menyenangkan.',
        scores: { red: 2, blue: 1, green: 2, yellow: 5 }
      },
      {
        label: 'E',
        text: 'Kepuasan finansial instan tanpa banyak risiko.',
        scores: { red: 2, blue: 2, green: 1, yellow: 1 }
      }
    ]
  },
  {
    id: 'deep_q5',
    category: 'Deep Personality',
    text: 'Pertanyaan 5: Bagaimana Anda menyikapi kritik keras dari orang lain terhadap karya/tugas Anda?',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Membela argumen dengan bukti kuat atau menjadikannya pemicu untuk membuktikan mereka salah.',
        scores: { red: 5, blue: 2, green: 0, yellow: 1 }
      },
      {
        label: 'B',
        text: 'Menganalisis kritik tersebut secara obyektif untuk memperbaiki detail yang kurang.',
        scores: { red: 2, blue: 5, green: 1, yellow: 1 }
      },
      {
        label: 'C',
        text: 'Menerima dengan rendah hati dan berterima kasih atas masukan tersebut.',
        scores: { red: 1, blue: 2, green: 5, yellow: 1 }
      },
      {
        label: 'D',
        text: 'Mencoba mengubah sudut pandang kritik menjadi lelucon atau diskusi kreatif.',
        scores: { red: 1, blue: 1, green: 2, yellow: 5 }
      },
      {
        label: 'E',
        text: 'Merasa tersinggung secara pribadi dan mengabaikan sang pengkritik.',
        scores: { red: 2, blue: 1, green: 1, yellow: 0 }
      }
    ]
  },
  {
    id: 'deep_q6',
    category: 'Deep Personality',
    text: 'Pertanyaan 6: Dalam bekerja secara tim, peran mana yang paling alami bagi Anda?',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Pemimpin atau Konseptor Utama yang menentukan arah dan target.',
        scores: { red: 5, blue: 2, green: 1, yellow: 2 }
      },
      {
        label: 'B',
        text: 'Quality Controller / Penguji Data yang memastikan presisi dan tidak ada kesalahan.',
        scores: { red: 1, blue: 5, green: 2, yellow: 0 }
      },
      {
        label: 'C',
        text: 'Fasilitator / Pendamai yang menjaga kenyamanan dan kekompakan seluruh tim.',
        scores: { red: 1, blue: 1, green: 5, yellow: 2 }
      },
      {
        label: 'D',
        text: 'Inspirator / Presenter yang mengomunikasikan ide dengan antusias tinggi.',
        scores: { red: 2, blue: 1, green: 2, yellow: 5 }
      },
      {
        label: 'E',
        text: 'Pelaksana instruksi pasif yang mengerjakan bagian jika diminta.',
        scores: { red: 0, blue: 2, green: 3, yellow: 0 }
      }
    ]
  },
  {
    id: 'deep_q7',
    category: 'Deep Personality',
    text: 'Pertanyaan 7: Apa ketakutan terbesar Anda dalam hubungan interpersonal?',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Kehilangan kendali atau dikendalikan oleh orang lain.',
        scores: { red: 5, blue: 1, green: 1, yellow: 1 }
      },
      {
        label: 'B',
        text: 'Membuat kesalahan fatal atau dianggap tidak kompeten.',
        scores: { red: 1, blue: 5, green: 1, yellow: 1 }
      },
      {
        label: 'C',
        text: 'Terjadinya konflik terbuka atau ditolak oleh kelompok.',
        scores: { red: 0, blue: 1, green: 5, yellow: 2 }
      },
      {
        label: 'D',
        text: 'Diabaikan, merasa bosan, atau kehilangan kebebasan.',
        scores: { red: 1, blue: 0, green: 2, yellow: 5 }
      },
      {
        label: 'E',
        text: 'Dimanfaatkan untuk kepentingan orang lain.',
        scores: { red: 2, blue: 3, green: 2, yellow: 0 }
      }
    ]
  },
  {
    id: 'deep_q8',
    category: 'Deep Personality',
    text: 'Pertanyaan 8: Bagaimana Anda menggambarkan pandangan pribadi Anda terhadap aturan dan prosedur?',
    type: 'multiple_choice',
    options: [
      {
        label: 'A',
        text: 'Aturan berguna jika mempercepat hasil; jika menghambat, perlu disesuaikan.',
        scores: { red: 5, blue: 1, green: 1, yellow: 3 }
      },
      {
        label: 'B',
        text: 'Aturan adalah fondasi ketertiban dan harus dipatuhi secara konsisten.',
        scores: { red: 1, blue: 5, green: 3, yellow: 0 }
      },
      {
        label: 'C',
        text: 'Aturan ada demi keamanan bersama dan menjaga kedamaian sosial.',
        scores: { red: 0, blue: 3, green: 5, yellow: 1 }
      },
      {
        label: 'D',
        text: 'Aturan terlalu kaku dan sering kali membatasi ruang kreativitas.',
        scores: { red: 2, blue: 0, green: 1, yellow: 5 }
      },
      {
        label: 'E',
        text: 'Aturan membingungkan, saya lebih memilih tidak berurusan dengannya.',
        scores: { red: 0, blue: 1, green: 2, yellow: 2 }
      }
    ]
  },
  {
    id: 'deep_q9',
    category: 'Deep Reflection & Open Mindedness',
    text: 'Refleksi Diri: Ceritakan pengalaman paling berkesan saat Anda berhasil mengatasi rintangan tersulit dalam hidup Anda.',
    type: 'textarea',
    placeholder: 'Tuliskan pengalaman, perasaan, dan pembelajaran yang Anda dapatkan...'
  },
  {
    id: 'deep_q10',
    category: 'Personal Development Vision',
    text: 'Visi Diri: Jelaskan kualitas kepribadian atau kebiasaan apa yang paling ingin Anda kembangkan dalam 1 tahun ke depan dan alasannya.',
    type: 'textarea',
    placeholder: 'Uraikan target pengembangan diri dan langkah nyata yang ingin Anda ambil...'
  }
];
