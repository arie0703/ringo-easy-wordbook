import { Link } from "react-router-dom";
import { useQuiz } from "../hooks/useQuiz";
import { useWords } from "../hooks/useWords";
import { FillInQuiz } from "../components/FillInQuiz";

export function FillInPage() {
  const allWords = useWords();
  const pool = allWords.filter((w) => w.example !== null);
  const { question, next, answer, finished } = useQuiz("fillin");
  const total = pool.length;
  const questionNumber = total - (question ? pool.indexOf(question.word) : 0);

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 px-4">
        <p className="text-4xl">🎉</p>
        <h2 className="text-2xl font-bold text-gray-700">全問終了！</h2>
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
          >
            もう一度
          </button>
          <Link
            to="/"
            className="px-6 py-2 border border-gray-300 text-gray-600 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            ホームへ
          </Link>
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="max-w-lg mx-auto py-8 px-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-700">穴埋めクイズ</h1>
        <Link to="/" className="text-sm text-gray-400 hover:text-gray-600">← ホーム</Link>
      </div>
      <FillInQuiz
        question={question}
        questionNumber={questionNumber}
        total={total}
        onAnswer={answer}
        onNext={next}
      />
    </div>
  );
}
