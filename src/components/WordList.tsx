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
    <div data-component="WordList" className="flex flex-col gap-4">
      <div data-element="search-bar" className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="英語・日本語で検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100 placeholder-gray-500"
        />
        <select
          value={exampleFilter}
          onChange={(e) => setExampleFilter(e.target.value as "all" | "with" | "without")}
          className="px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-gray-100"
        >
          <option value="all">すべて</option>
          <option value="with">例文あり</option>
          <option value="without">例文なし</option>
        </select>
      </div>

      <p className="text-sm text-gray-500">{filtered.length} 件</p>

      <div data-element="word-table" className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">English</th>
              <th className="px-4 py-3 text-left">日本語</th>
              <th className="px-4 py-3 text-left">例文</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filtered.map((w) => (
              <tr key={w.id} className="hover:bg-gray-800">
                <td className="px-4 py-3 font-semibold text-indigo-400">{w.english}</td>
                <td className="px-4 py-3 text-gray-300">{w.japanese}</td>
                <td className="px-4 py-3 text-gray-500">
                  {w.example
                    ? `${w.example.before} ___ ${w.example.after}`
                    : <span className="text-gray-700">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
