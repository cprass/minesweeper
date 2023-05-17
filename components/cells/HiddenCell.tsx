import { gameState } from "../../state/signals.ts";
import { GameState } from "../../state/types.ts";
import { BASE_CLASS_NAMES } from "./base.ts";
import usePointerHandlers from "./usePointerHandlers.ts";

interface HiddenCellProps {
  idx: number;
}

export default function HiddenCell({ idx }: HiddenCellProps) {
  const isActiveGame = gameState.value === GameState.Active;

  const activeGameStyles = "hover:bg-gray-500";
  const inactiveGameStyles = "cursor-default";

  const handlers = usePointerHandlers(idx);

  return (
    <button
      aria-label="Hidden cell, click to reveil, right-click to place a flag"
      class={`${BASE_CLASS_NAMES} bg-gray-400 ${
        isActiveGame ? activeGameStyles : inactiveGameStyles
      }`}
      {...handlers}
    />
  );
}
