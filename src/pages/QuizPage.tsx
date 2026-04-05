import { Link } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import { QuizCard } from "../components/QuizCard";
import { ReviewSection } from "../components/ReviewSection";

export function QuizPage() {
  const { question, next, answer, finished, index, total, results } = useQuiz("meaning");
  const questionNumber = index + 1;

  if (finished) {
    return (
      <div data-component="QuizPage" className="max-w-lg mx-auto py-8 px-4 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <p className="text-4xl">🎉</p>
          <h2 className="text-2xl font-bold text-gray-200">全問終了！</h2>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-400 transition-colors"
            >
              もう一度
            </button>
            <Link
              to="/"
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              ホームへ
            </Link>
          </div>
        </div>
        <ReviewSection results={results} mode="meaning" />
      </div>
    );
  }

  if (!question) return null;

  return (
    <div data-component="QuizPage" className="max-w-lg mx-auto py-8 px-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-200">4択クイズ</h1>
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-300">← ホーム</Link>
      </div>
      <QuizCard
        question={question}
        questionNumber={questionNumber}
        total={total}
        onAnswer={answer}
        onNext={next}
      />
    </div>
  );
}
