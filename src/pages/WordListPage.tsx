import { Link } from "react-router-dom";
import { useWords } from "../hooks/useWords";
import { WordList } from "../components/WordList";

export function WordListPage() {
  const words = useWords();

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-200">単語一覧</h1>
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-300">← ホーム</Link>
      </div>
      <WordList words={words} />
    </div>
  );
}
