// SPDX-License-Identifier: AGPL-3.0-or-later
import { useComputed } from "@preact/signals";
import { mines, scale } from "../state/signals.ts";
import { ComponentChildren } from "preact";
import { setDifficultyLevel } from "../state/actions.ts";
import useBoardGapSize from "./useBoardGapSize.ts";

interface ButtonProps {
  children: ComponentChildren;
  isActive?: boolean;
  onClick?(): void;
}
function DifficultyButton({ children, isActive, onClick }: ButtonProps) {
  const activeStyle = "bg-gray-300 cursor-default";
  const inactiveStyle = "hover:bg-gray-100";

  return (
    <button
      class={`px-2 mr-1 rounded ${isActive ? activeStyle : inactiveStyle}`}
      onClick={onClick}
      disabled={isActive}
    >
      {children}
    </button>
  );
}

export default function Controls() {
  const difficulty = useComputed(() => {
    if (mines.value <= 10) {
      return 1;
    }
    if (mines.value <= 40) {
      return 2;
    }
    return 3;
  });

  const gapSize = useBoardGapSize();

  return (
    <div
      class={`p-1 bg-gray-400 mb-[${gapSize.value}px] rounded flex flex-row flex-nowrap justify-between`}
    >
      <div class="flex flex-row flex-nowrap items-center">
        <span class="mr-2">Level:</span>
        <DifficultyButton
          isActive={difficulty.value === 1}
          onClick={() => setDifficultyLevel(1)}
        >
          1
        </DifficultyButton>
        <DifficultyButton
          isActive={difficulty.value === 2}
          onClick={() => setDifficultyLevel(2)}
        >
          2
        </DifficultyButton>
        <DifficultyButton
          isActive={difficulty.value === 3}
          onClick={() => setDifficultyLevel(3)}
        >
          3
        </DifficultyButton>
      </div>
      <div class="flex flex-row flex-nowrap items-center">
        <span class="mx-2">Scale</span>
        <input
          type="range"
          width="50px"
          max="1.5"
          min="0.5"
          step="0.1"
          value={scale}
          list="markers"
          class="w-[80px]"
          onChange={(e) => {
            const value = Math.min(
              1.5,
              Math.max(0.5, Number(e.currentTarget.value))
            );
            if (!Number.isNaN(value)) {
              scale.value = value;
            }
          }}
        />
      </div>
    </div>
  );
}
