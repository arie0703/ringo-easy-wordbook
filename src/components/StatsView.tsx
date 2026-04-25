import type { Word, QuizMode } from "../types";
import { useProgress } from "../hooks/useProgress";

type Props = {
  words: Word[];
  onReset: () => void;
};

function rate(correct: number, total: number): string {
  if (total === 0) return "—";
  return `${Math.round((correct / total) * 100)}%`;
}

function ModeStats({ mode, label }: { mode: QuizMode; label: string }) {
  const { getStats } = useProgress();
  const { correct, total } = getStats(undefined, mode);
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 flex justify-between items-center">
      <span className="font-semibold text-gray-200">{label}</span>
      <span className="text-indigo-400 font-bold text-lg">
        {rate(correct, total)}
        <span className="text-gray-500 text-sm font-normal ml-2">{correct}/{total}</span>
      </span>
    </div>
  );
}

export function StatsView({ words, onReset }: Props) {
  const { getStats } = useProgress();

  return (
    <div data-component="StatsView" className="flex flex-col gap-6">
      <section data-element="mode-stats" className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-gray-400 uppercase tracking-wide">モード別正答率</h2>
        <ModeStats mode="meaning" label="4択クイズ" />
        <ModeStats mode="fillin" label="穴埋めクイズ" />
      </section>

      <section data-element="word-stats" className="flex flex-col gap-3">
        <h2 className="text-base font-bold text-gray-400 uppercase tracking-wide">単語別成績</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full text-sm">
            <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">単語</th>
                <th className="px-4 py-3 text-right">正解</th>
                <th className="px-4 py-3 text-right">不正解</th>
                <th className="px-4 py-3 text-right">正答率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {words.filter((w) => getStats(w.id).total > 0).map((w) => {
                const { correct, total } = getStats(w.id);
                const wrong = total - correct;
                return (
                  <tr key={w.id} className="hover:bg-gray-800">
                    <td className="px-4 py-3">
                      <span className="font-semibold text-indigo-400">{w.english}</span>
                      <span className="text-gray-500 text-xs ml-2">{w.japanese}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-green-400">{correct}</td>
                    <td className="px-4 py-3 text-right text-red-400">{wrong}</td>
                    <td className="px-4 py-3 text-right font-semibold text-indigo-400">{rate(correct, total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div data-element="reset-area" className="flex justify-center pt-2">
        <button
          data-element="reset-button"
          onClick={onReset}
          className="px-6 py-2 border border-red-700 text-red-400 rounded-full text-sm hover:bg-red-950 transition-colors"
        >
          進捗をリセット
        </button>
      </div>
    </div>
  );
}
