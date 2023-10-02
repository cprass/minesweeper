// SPDX-License-Identifier: AGPL-3.0-or-later
import Cell from "./Cell.tsx";
import { game, width } from "../state/signals.ts";
import useBoardGapSize from "./useBoardGapSize.ts";

export default function Board() {
  const gapSize = useBoardGapSize();

  return (
    <div
      class={`grid gap-[${gapSize.value}px] grid-cols-${width.value} bg-gray-300 rounded p-[${gapSize.value}px] select-none`}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      style={{ touchAction: "none" }}
    >
      {game.value.fields.map((value, idx) => {
        return <Cell value={value} key={idx} idx={idx} />;
      })}
    </div>
  );
}
