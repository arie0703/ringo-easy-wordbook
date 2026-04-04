type State = "default" | "correct" | "wrong";

type Props = {
  label: string;
  state: State;
  disabled: boolean;
  onClick: () => void;
};

const stateClass: Record<State, string> = {
  default: "bg-white border-gray-300 text-gray-800 hover:bg-indigo-50 hover:border-indigo-400",
  correct: "bg-green-100 border-green-500 text-green-800",
  wrong: "bg-red-100 border-red-400 text-red-700",
};

export function ChoiceButton({ label, state, disabled, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-3 border-2 rounded-xl text-left font-medium transition-colors ${stateClass[state]} disabled:cursor-default`}
    >
      {label}
    </button>
  );
}
