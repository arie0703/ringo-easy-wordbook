import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "ホーム", emoji: "🏠" },
  { to: "/quiz", label: "4択", emoji: "🧠" },
  { to: "/fillin", label: "穴埋め", emoji: "✏️" },
  { to: "/words", label: "単語", emoji: "📖" },
  { to: "/stats", label: "統計", emoji: "📊" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50 sm:hidden">
      {navItems.map(({ to, label, emoji }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-2 py-1 text-xs ${isActive ? "text-indigo-600 font-semibold" : "text-gray-400"}`
          }
        >
          <span className="text-lg">{emoji}</span>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
