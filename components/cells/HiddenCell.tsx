import { game, gameState } from "../../state/signals.ts";
import { GameState } from "../../state/types.ts";
import { useBaseClassNames } from "./useBaseClassNames.ts";
import usePointerHandlers from "./usePointerHandlers.ts";

interface HiddenCellProps {
  idx: number;
  isMine?: boolean;
}

export default function HiddenCell({ idx, isMine }: HiddenCellProps) {
  const isActiveGame = gameState.value === GameState.Active;

  const activeGameStyles = "hover:bg-gray-500";
  const inactiveGameStyles = "cursor-default";

  const handlers = usePointerHandlers(idx);
  const classNames = useBaseClassNames();

  return (
    <button
      aria-label="Hidden cell, click to reveil, right-click to place a flag"
      class={`${classNames} bg-gray-400 ${
        isActiveGame ? activeGameStyles : inactiveGameStyles
      }`}
      {...handlers}
    >
      {game.peek().debug && isMine ? "+" : ""}
    </button>
  );
}
