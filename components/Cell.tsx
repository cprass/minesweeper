import { flagField } from "../state/actions.ts";
import { CellState, CellValue, GameState } from "../state/types.ts";
import { gameState } from "../state/signals.ts";
import { ComponentChildren } from "preact";
import { BASE_CLASS_NAMES } from "./cells/base.ts";
import HiddenCell from "./cells/HiddenCell.tsx";

enum TEXT_COLORS {
  "blue-500" = 1,
  "green-500",
  "red-600",
  "purple-700",
  "red-800",
  "yellow-500",
  "gray-900",
}

function IconWrapper({ children }: { children: ComponentChildren }) {
  return (
    <span
      class={`bg-gray-200 rounded w-full h-full flex justify-center items-center`}
    >
      {children}
    </span>
  );
}

interface ClearedCellProps {
  neighbourMines: number;
}

function ClearedCell({ neighbourMines }: ClearedCellProps) {
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

interface FlaggedCellProps {
  idx: number;
  isMine?: boolean;
}

function FlaggedCell({ idx, isMine }: FlaggedCellProps) {
  const isActiveGame = gameState.value === GameState.Active;

  // Show a red indicator if the game is over and the flag is placed on a non-mined field
  const backgroundColor = !isActiveGame && !isMine ? "red-400" : "gray-400";

  const activeGameStyles = "hover:bg-gray-500";
  const inactiveGameStyles = "cursor-default";

  return (
    <button
      aria-label="A flagged cell, right-click to unflag"
      class={`${BASE_CLASS_NAMES} bg-${backgroundColor} ${
        isActiveGame ? activeGameStyles : inactiveGameStyles
      } p-[4px]`}
      onContextMenu={(e) => e.preventDefault()}
      onPointerUp={(e) => {
        e.preventDefault();
        if (e.button === 2) {
          flagField(idx);
        }
      }}
      disabled={!isActiveGame}
    >
      <IconWrapper>
        🚩
      </IconWrapper>
    </button>
  );
}

interface ZonkCellProps {
  highlight?: boolean;
}

function ZonkCell({ highlight }: ZonkCellProps) {
  return (
    <div
      class={`${BASE_CLASS_NAMES} ${
        highlight ? "bg-red-600" : "bg-gray-400"
      } p-[4px] cursor-default`}
      aria-label="A bomb, game over"
    >
      <IconWrapper>
        💣
      </IconWrapper>
    </div>
  );
}

interface Props {
  idx: number;
  value: CellValue;
}

export default function Cell({ idx, value }: Props) {
  const isActiveGame = gameState.value === GameState.Active;

  if (!isActiveGame && value.state === CellState.Hidden && value.isMine) {
    // Game over - show all remaining unflagged bombs
    return <ZonkCell />;
  }

  if (value.state === CellState.Hidden) {
    return <HiddenCell idx={idx} />;
  }

  if (value.state === CellState.Triggered && value.isMine) {
    // Show the revealed bomb with a highlight
    return <ZonkCell highlight />;
  }

  if (value.state === CellState.Triggered) {
    return <ClearedCell neighbourMines={value.neighbourMines} />;
  }

  return <FlaggedCell idx={idx} isMine={value.isMine} />;
}
