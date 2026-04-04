import { useState } from "react";
import type { QuizQuestion } from "../types";
import { ChoiceButton } from "./ChoiceButton";

type Props = {
  question: QuizQuestion;
  questionNumber: number;
  total: number;
  onNext: () => void;
  onAnswer: (index: number) => { correct: boolean };
};

export function QuizCard({ question, questionNumber, total, onNext, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  function handleSelect(index: number) {
    if (selected !== null) return;
    const result = onAnswer(index);
    setSelected(index);
    setCorrect(result.correct);
  }

  function handleNext() {
    setSelected(null);
    setCorrect(null);
    onNext();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-gray-400 text-right">
        {questionNumber} / {total}
      </div>

      <div className="bg-indigo-50 rounded-2xl p-6 text-center">
        <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-2">English</p>
        <p className="text-3xl font-bold text-indigo-800">{question.word.english}</p>
      </div>

      <div className="flex flex-col gap-3">
        {question.choices.map((choice, i) => (
          <ChoiceButton
            key={i}
            label={choice}
            state={
              selected === null
                ? "default"
                : i === question.correctIndex
                ? "correct"
                : i === selected
                ? "wrong"
                : "default"
            }
            disabled={selected !== null}
            onClick={() => handleSelect(i)}
          />
        ))}
      </div>

      {selected !== null && (
        <div className="flex flex-col items-center gap-3">
          <p className={`text-lg font-bold ${correct ? "text-green-600" : "text-red-500"}`}>
            {correct ? "正解！" : "不正解…"}
          </p>
          <button
            onClick={handleNext}
            className="px-8 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
          >
            次へ
          </button>
        </div>
      )}
    </div>
  );
}
