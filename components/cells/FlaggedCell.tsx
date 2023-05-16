import { gameState } from "../../state/signals.ts";
import { GameState } from "../../state/types.ts";
import IconWrapper from "./IconWrapper.tsx";
import { BASE_CLASS_NAMES } from "./base.ts";
import usePointerHandlers from "./usePointerHandlers.ts";

interface FlaggedCellProps {
  idx: number;
  isMine?: boolean;
}

export default function FlaggedCell({ idx, isMine }: FlaggedCellProps) {
  const isActiveGame = gameState.value === GameState.Active;

  // Show a red indicator if the game is over and the flag is placed on a non-mined field
  const backgroundColor = !isActiveGame && !isMine ? "red-400" : "gray-400";

  const activeGameStyles = "hover:bg-gray-500";
  const inactiveGameStyles = "cursor-default";

  const handlers = usePointerHandlers(idx);

  return (
    <button
      aria-label="A flagged cell, right-click to unflag"
      class={`${BASE_CLASS_NAMES} bg-${backgroundColor} ${
        isActiveGame ? activeGameStyles : inactiveGameStyles
      } p-[4px]`}
      onContextMenu={(e) => e.preventDefault()}
      disabled={!isActiveGame}
      {...handlers}
    >
      <IconWrapper>🚩</IconWrapper>
    </button>
  );
}
