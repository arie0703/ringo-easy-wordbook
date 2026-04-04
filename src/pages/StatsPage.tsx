import { Link } from "react-router-dom";
import { useWords } from "../hooks/useWords";
import { useProgress } from "../hooks/useProgress";
import { StatsView } from "../components/StatsView";

export function StatsPage() {
  const words = useWords();
  const { reset } = useProgress();

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-200">学習統計</h1>
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-300">← ホーム</Link>
      </div>
      <StatsView words={words} onReset={reset} />
    </div>
  );
}
