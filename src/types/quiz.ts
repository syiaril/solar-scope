export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index
  explanation: string;
}

export interface QuizState {
  currentQuestion: number;
  selectedAnswer: number | null;
  score: number;
  answers: (number | null)[];
  isFinished: boolean;
  showExplanation: boolean;
}
