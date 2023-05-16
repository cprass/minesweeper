import { CellState, CellValue, GameState } from "../state/types.ts";
import { gameState } from "../state/signals.ts";
import HiddenCell from "./cells/HiddenCell.tsx";
import ZonkCell from "./cells/ZonkCell.tsx";
import ClearedCell from "./cells/ClearedCell.tsx";
import FlaggedCell from "./cells/FlaggedCell.tsx";

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
