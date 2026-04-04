import { Link } from "react-router-dom";

type NavCard = {
  to: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
};

const cards: NavCard[] = [
  {
    to: "/quiz",
    title: "4択クイズ",
    description: "英単語を見て日本語の意味を選ぶ",
    emoji: "🧠",
    color: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200",
  },
  {
    to: "/fillin",
    title: "穴埋めクイズ",
    description: "例文の空欄に入る英単語を選ぶ",
    emoji: "✏️",
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
  },
  {
    to: "/words",
    title: "単語一覧",
    description: "登録済み単語を検索・確認する",
    emoji: "📖",
    color: "bg-teal-50 hover:bg-teal-100 border-teal-200",
  },
  {
    to: "/stats",
    title: "学習統計",
    description: "モード別・単語別の正答率を確認する",
    emoji: "📊",
    color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
  },
];

export function Home() {
  return (
    <div className="flex flex-col items-center gap-8 py-10 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-700 tracking-tight">🍎 ringo</h1>
        <p className="text-gray-500 mt-2">英単語学習アプリ</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className={`flex flex-col gap-2 p-5 rounded-2xl border-2 transition-colors ${card.color}`}
          >
            <span className="text-3xl">{card.emoji}</span>
            <span className="font-bold text-gray-800">{card.title}</span>
            <span className="text-sm text-gray-500">{card.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
