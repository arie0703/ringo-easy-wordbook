import type { QuizQuestion } from "../types";

type Result = { question: QuizQuestion; correct: boolean };

type Props = {
  results: Result[];
  mode: "meaning" | "fillin";
};

export function ReviewSection({ results, mode }: Props) {
  const sorted = [...results].sort((a, b) => Number(b.correct) - Number(a.correct) === 0 ? 0 : Number(a.correct) - Number(b.correct));

  return (
    <div data-component="ReviewSection" className="w-full flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">振り返り</h3>
      {sorted.map(({ question, correct }, i) => (
        <div
          key={i}
          data-element="review-item"
          className={`rounded-xl p-4 border ${correct ? "border-gray-700 bg-gray-800/50" : "border-red-800 bg-red-950/40"}`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              {mode === "meaning" ? (
                <>
                  <p data-element="question-text" className="font-bold text-indigo-200">{question.word.english}</p>
                  <p data-element="answer-text" className="text-sm text-gray-400">{question.word.japanese}</p>
                </>
              ) : (
                <>
                  <p data-element="question-text" className="text-sm text-indigo-200 leading-relaxed">
                    {question.word.example?.before}{" "}
                    <span className="font-bold text-indigo-100">{question.word.english}</span>{" "}
                    {question.word.example?.after}
                  </p>
                  <p data-element="answer-text" className="text-sm text-gray-400">{question.word.japanese}</p>
                </>
              )}
            </div>
            <span data-element="result-icon" className={`text-lg flex-shrink-0 ${correct ? "text-green-400" : "text-red-400"}`}>
              {correct ? "✓" : "✗"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
