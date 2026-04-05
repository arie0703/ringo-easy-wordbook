import { useState, useEffect } from "react";
import type { QuizQuestion } from "../types";
import { ChoiceButton } from "./ChoiceButton";
import { useSpeech } from "../hooks/useSpeech";

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
  const [tapEnabled, setTapEnabled] = useState(false);

  const { speak } = useSpeech(question.word.english);

  useEffect(() => {
    if (selected !== null) {
      const timer = setTimeout(() => setTapEnabled(true), 400);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  function handleSelect(index: number) {
    if (selected !== null) return;
    const result = onAnswer(index);
    setSelected(index);
    setCorrect(result.correct);
  }

  function handleNext() {
    setSelected(null);
    setCorrect(null);
    setTapEnabled(false);
    onNext();
  }

  return (
    <>
      {selected !== null && tapEnabled && (
        <div
          data-element="tap-overlay"
          className="fixed inset-0 z-10"
          onClick={handleNext}
        />
      )}
      <div data-component="QuizCard" className="flex flex-col gap-6">
        <div data-element="progress" className="text-sm text-gray-400 text-right">
          {questionNumber} / {total}
        </div>

        <div data-element="word-card" className="bg-indigo-950 rounded-2xl p-6 text-center cursor-pointer" onClick={speak}>
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-2">English</p>
          <p data-element="word-english" className="text-3xl font-bold text-indigo-200">{question.word.english}</p>
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
          <div data-element="feedback" className="relative z-20 flex flex-col items-center gap-3">
            <p data-element="feedback-result" className={`text-lg font-bold ${correct ? "text-green-400" : "text-red-400"}`}>
              {correct ? "正解！" : "不正解…"}
            </p>
            <p data-element="tap-hint" className="text-xs text-gray-500 md:hidden">タップして次へ</p>
            <button
              data-element="next-button"
              onClick={handleNext}
              className="relative z-20 hidden md:inline-flex px-8 py-2 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-400 transition-colors"
            >
              次へ
            </button>
          </div>
        )}
      </div>
    </>
  );
}
