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

export function FillInQuiz({ question, questionNumber, total, onNext, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const { before, after, translation } = question.word.example!;

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
    <div data-component="FillInQuiz" className="flex flex-col gap-6">
      <div data-element="progress" className="text-sm text-gray-400 text-right">
        {questionNumber} / {total}
      </div>

      <div data-element="example-card" className="bg-indigo-950 rounded-2xl p-6 text-center">
        <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-3">Fill in the blank</p>
        <p data-element="example-sentence" className="text-xl text-indigo-200 leading-relaxed">
          {before}{" "}
          <span data-element="blank" className={`inline-block px-3 py-0.5 rounded-lg font-bold border-2 ${selected !== null ? "bg-indigo-700 border-indigo-400 text-indigo-100" : "bg-gray-900 border-dashed border-indigo-500 text-indigo-500"}`}>
            {selected !== null ? question.word.english : "___"}
          </span>{" "}
          {after}
        </p>
        {selected !== null && (
          <p data-element="translation" className="text-sm text-gray-400 mt-3 italic">{translation}</p>
        )}
      </div>

      <div data-element="choices" className="flex flex-col gap-3">
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
        <div data-element="feedback" className="flex flex-col items-center gap-3">
          <p data-element="feedback-result" className={`text-lg font-bold ${correct ? "text-green-400" : "text-red-400"}`}>
            {correct ? "正解！" : "不正解…"}
          </p>
          <p data-element="word-japanese" className="text-sm text-gray-500">{question.word.japanese}</p>
          <button
            data-element="next-button"
            onClick={handleNext}
            className="px-8 py-2 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-400 transition-colors"
          >
            次へ
          </button>
        </div>
      )}
    </div>
  );
}
