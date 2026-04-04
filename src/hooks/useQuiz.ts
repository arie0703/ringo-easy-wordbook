import { useState, useCallback, useMemo } from "react";
import type { QuizMode, QuizQuestion, Word } from "../types";
import { useWords } from "./useWords";
import { useProgress } from "./useProgress";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestion(word: Word, allWords: Word[], mode: QuizMode): QuizQuestion {
  const others = allWords.filter((w) => w.id !== word.id);
  const wrongThree = shuffle(others).slice(0, 3);

  if (mode === "meaning") {
    const correctLabel = word.japanese;
    const wrongLabels = wrongThree.map((w) => w.japanese);
    const choices = shuffle([correctLabel, ...wrongLabels]);
    const correctIndex = choices.indexOf(correctLabel);
    return { word, choices, correctIndex };
  } else {
    const correctLabel = word.english;
    const wrongLabels = wrongThree.map((w) => w.english);
    const choices = shuffle([correctLabel, ...wrongLabels]);
    const correctIndex = choices.indexOf(correctLabel);
    return { word, choices, correctIndex };
  }
}

export function useQuiz(mode: QuizMode) {
  const allWords = useWords();
  const { addRecord } = useProgress();

  const pool = useMemo(() => {
    const target =
      mode === "fillin" ? allWords.filter((w) => w.example !== null) : allWords;
    return shuffle(target);
  }, [allWords, mode]);

  const [index, setIndex] = useState(0);

  const question: QuizQuestion | null =
    index < pool.length ? buildQuestion(pool[index], allWords, mode) : null;

  const finished = index >= pool.length;

  const answer = useCallback(
    (selectedIndex: number): { correct: boolean } => {
      if (!question) return { correct: false };
      const correct = selectedIndex === question.correctIndex;
      addRecord({
        wordId: question.word.id,
        mode,
        correct,
        answeredAt: Date.now(),
      });
      return { correct };
    },
    [question, mode, addRecord]
  );

  const next = useCallback(() => {
    setIndex((i) => i + 1);
  }, []);

  return { question, next, answer, finished };
}
