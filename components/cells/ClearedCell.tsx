import { BASE_CLASS_NAMES } from "./base.ts";

enum TEXT_COLORS {
  "blue-500" = 1,
  "green-500",
  "red-600",
  "purple-700",
  "red-800",
  "yellow-500",
  "gray-900",
}

interface ClearedCellProps {
  neighbourMines: number;
}

export default function ClearedCell({ neighbourMines }: ClearedCellProps) {
  let colorClass = "black";
  if (neighbourMines > 0 && TEXT_COLORS[neighbourMines]) {
    colorClass = TEXT_COLORS[neighbourMines];
  }

  return (
    <div
      class={`${BASE_CLASS_NAMES} cursor-default font-bold text-xl bg-gray-200 text-${colorClass}`}
      aria-label="Reveiled cell showing the number of neighbouring mines"
    >
      {neighbourMines > 0 ? neighbourMines : ""}
    </div>
  );
}
