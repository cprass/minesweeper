import Cell from "./Cell.tsx";
import { game, width } from "../state/signals.ts";
import { GAP_BASE_SIZE } from "../config/index.ts";

export default function Board() {
  return (
    <div
      class={`grid gap-[${GAP_BASE_SIZE}px] grid-cols-${width.value} bg-gray-300 rounded p-[${GAP_BASE_SIZE}px] touch-none select-none`}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {game.value.fields.map((value, idx) => {
        return <Cell value={value} key={idx} idx={idx} />;
      })}
    </div>
  );
}
