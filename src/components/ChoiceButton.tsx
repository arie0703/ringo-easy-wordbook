type State = "default" | "correct" | "wrong";

type Props = {
  label: string;
  state: State;
  disabled: boolean;
  onClick: () => void;
};

const stateClass: Record<State, string> = {
  default: "bg-gray-800 border-gray-600 text-gray-100 hover:bg-indigo-900/50 hover:border-indigo-500",
  correct: "bg-green-900/50 border-green-500 text-green-300",
  wrong: "bg-red-900/50 border-red-500 text-red-300",
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
