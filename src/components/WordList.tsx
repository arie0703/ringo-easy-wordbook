import { useState } from "react";
import type { Word } from "../types";

type Props = {
  words: Word[];
};

export function WordList({ words }: Props) {
  const [query, setQuery] = useState("");
  const [exampleFilter, setExampleFilter] = useState<"all" | "with" | "without">("all");

  const filtered = words.filter((w) => {
    const matchQuery =
      query === "" ||
      w.english.toLowerCase().includes(query.toLowerCase()) ||
      w.japanese.includes(query);
    const matchExample =
      exampleFilter === "all" ||
      (exampleFilter === "with" && w.example !== null) ||
      (exampleFilter === "without" && w.example === null);
    return matchQuery && matchExample;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="英語・日本語で検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={exampleFilter}
          onChange={(e) => setExampleFilter(e.target.value as "all" | "with" | "without")}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        >
          <option value="all">すべて</option>
          <option value="with">例文あり</option>
          <option value="without">例文なし</option>
        </select>
      </div>

      <p className="text-sm text-gray-400">{filtered.length} 件</p>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">English</th>
              <th className="px-4 py-3 text-left">日本語</th>
              <th className="px-4 py-3 text-left">例文</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((w) => (
              <tr key={w.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-indigo-700">{w.english}</td>
                <td className="px-4 py-3 text-gray-700">{w.japanese}</td>
                <td className="px-4 py-3 text-gray-500">
                  {w.example
                    ? `${w.example.before} ___ ${w.example.after}`
                    : <span className="text-gray-300">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
