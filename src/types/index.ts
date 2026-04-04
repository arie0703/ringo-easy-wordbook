export type WordExample = {
  before: string;
  after: string;
};

export type Word = {
  id: string;
  english: string;
  japanese: string;
  example: WordExample | null;
};

export type QuizMode = "meaning" | "fillin";

export type QuizQuestion = {
  word: Word;
  choices: string[];      // 日本語4択（meaningモード）または英語4択（fillinモード）
  correctIndex: number;
};

export type AnswerRecord = {
  wordId: string;
  mode: QuizMode;
  correct: boolean;
  answeredAt: number;     // Unix timestamp
};

export type Progress = {
  records: AnswerRecord[];
};
