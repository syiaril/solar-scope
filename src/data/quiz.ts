import { QuizQuestion } from '@/types/quiz';

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Planet manakah yang paling dekat dengan Matahari?",
    options: ["Venus", "Mars", "Merkurius", "Bumi"],
    correctAnswer: 2,
    explanation: "Merkurius adalah planet terdekat dari Matahari dengan jarak rata-rata sekitar 57,9 juta km."
  },
  {
    id: 2,
    question: "Apa nama planet terbesar di seluruh Tata Surya kita?",
    options: ["Saturnus", "Yupiter", "Neptunus", "Uranus"],
    correctAnswer: 1,
    explanation: "Yupiter adalah planet terbesar dengan diameter sekitar 142.984 km dan massa lebih dari dua kali lipat gabungan seluruh planet lainnya."
  },
  {
    id: 3,
    question: "Planet mana yang terkenal memiliki sistem cincin paling megah dan luas?",
    options: ["Saturnus", "Yupiter", "Uranus", "Neptunus"],
    correctAnswer: 0,
    explanation: "Saturnus memiliki cincin spektakuler yang terbentuk dari miliaran partikel es, batu, dan debu kosmik."
  },
  {
    id: 4,
    question: "Planet manakah yang sering dijuluki sebagai 'Planet Merah'?",
    options: ["Merkurius", "Venus", "Mars", "Yupiter"],
    correctAnswer: 2,
    explanation: "Mars dijuluki Planet Merah karena permukaannya yang kaya akan debu besi oksida (karat)."
  },
  {
    id: 5,
    question: "Berapa lama waktu yang dibutuhkan Bumi untuk mengelilingi Matahari satu putaran penuh?",
    options: ["24 jam", "365,2 hari", "30 hari", "687 hari"],
    correctAnswer: 1,
    explanation: "Periode revolusi Bumi mengelilingi Matahari adalah sekitar 365,25 hari (1 tahun kalender)."
  },
  {
    id: 6,
    question: "Planet manakah yang memiliki suhu permukaan paling panas di Tata Surya?",
    options: ["Merkurius", "Venus", "Mars", "Matahari"],
    correctAnswer: 1,
    explanation: "Meskipun Merkurius lebih dekat dengan Matahari, Venus adalah planet terpanas (~465°C) karena atmosfer tebal karbon dioksida yang memicu efek rumah kaca ekstrem."
  },
  {
    id: 7,
    question: "Bintik Merah Raksasa (Great Red Spot) merupakan badai abadi raksasa yang berada di planet...",
    options: ["Mars", "Saturnus", "Yupiter", "Neptunus"],
    correctAnswer: 2,
    explanation: "Bintik Merah Raksasa adalah badai antisiklon raksasa di atmosfer Yupiter yang telah teramati lebih dari ratusan tahun."
  },
  {
    id: 8,
    question: "Planet manakah yang memiliki kemiringan sumbu rotasi ekstrem hingga hampir 98 derajat sehingga tampak berputar menyamping?",
    options: ["Uranus", "Neptunus", "Saturnus", "Venus"],
    correctAnswer: 0,
    explanation: "Uranus menggelinding pada orbitnya dengan kemiringan sumbu sekitar 97,8°, diduga akibat tabrakan raksasa pada masa awal pembentukannya."
  },
  {
    id: 9,
    question: "Planet manakah yang tercatat memiliki kecepatan angin tercepat di Tata Surya, mencapai 2.100 km/jam?",
    options: ["Yupiter", "Saturnus", "Uranus", "Neptunus"],
    correctAnswer: 3,
    explanation: "Neptunus memiliki atmosfer dinamis dengan hembusan angin supersonik tercepat di Tata Surya."
  },
  {
    id: 10,
    question: "Planet manakah yang memiliki massa jenis paling rendah sehingga secara teori dapat terapung di atas air?",
    options: ["Mars", "Saturnus", "Uranus", "Merkurius"],
    correctAnswer: 1,
    explanation: "Saturnus memiliki kerapatan rata-rata sekitar 0,687 g/cm³, lebih kecil dari kerapatan air (1 g/cm³)."
  },
  {
    id: 11,
    question: "Gunung berapi tertinggi di Tata Surya, Olympus Mons, terletak di planet mana?",
    options: ["Bumi", "Venus", "Mars", "Merkurius"],
    correctAnswer: 2,
    explanation: "Olympus Mons di Mars adalah gunung perisai raksasa dengan ketinggian sekitar 21,9 km, hampir tiga kali tinggi Gunung Everest."
  },
  {
    id: 12,
    question: "Planet manakah yang berotasi paling lambat dan arah rotasinya berlawanan (retrograde) dibandingkan mayoritas planet lainnya?",
    options: ["Venus", "Merkurius", "Uranus", "Mars"],
    correctAnswer: 0,
    explanation: "Venus berotasi sangat lambat (243 hari Bumi untuk satu putaran) dan berputar searah jarum jam (retrograde), sehingga Matahari terbit dari barat."
  },
  {
    id: 13,
    question: "Planet ke-8 dan terjauh dari Matahari dalam sistem tata surya kita saat ini adalah...",
    options: ["Pluto", "Neptunus", "Uranus", "Saturnus"],
    correctAnswer: 1,
    explanation: "Sejak klasifikasi ulang IAU pada tahun 2006 yang menetapkan Pluto sebagai planet kerdil, Neptunus adalah planet ke-8 dan terjauh dari Matahari."
  },
  {
    id: 14,
    question: "Manakah kelompok planet di bawah ini yang seluruh anggotanya tergolong sebagai planet kebumian (terrestrial)?",
    options: [
      "Merkurius, Venus, Bumi, Mars",
      "Yupiter, Saturnus, Uranus, Neptunus",
      "Bumi, Mars, Yupiter, Saturnus",
      "Merkurius, Bumi, Saturnus, Neptunus"
    ],
    correctAnswer: 0,
    explanation: "Empat planet terdalam (Merkurius, Venus, Bumi, dan Mars) adalah planet berbatu atau terestrial dengan permukaan padat."
  },
  {
    id: 15,
    question: "Apa komposisi utama yang menyusun Matahari kita?",
    options: [
      "Oksigen dan Karbon",
      "Besi dan Nikel",
      "Hidrogen dan Helium",
      "Nitrogen dan Metana"
    ],
    correctAnswer: 2,
    explanation: "Matahari sebagian besar tersusun atas gas Hidrogen (~73%) dan Helium (~25%) yang mengalami reaksi fusi nuklir di intinya."
  }
];
