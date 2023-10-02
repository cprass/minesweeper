// SPDX-License-Identifier: AGPL-3.0-or-later
import Banner from "../components/Banner.tsx";
import Board from "../components/Board.tsx";
import { scale, width } from "../state/signals.ts";
import { useComputed } from "@preact/signals";
import { CELL_BASE_SIZE, GAP_BASE_SIZE } from "../config/index.ts";
import Controls from "../components/Controls.tsx";

export default function Game() {
  const w = useComputed(() => {
    const cellsWidth = CELL_BASE_SIZE * width.value;
    const gapsInCellsWidth = Math.max(0, GAP_BASE_SIZE * (width.value - 1));
    const wrapperPadingWidth = GAP_BASE_SIZE * 4;
    return scale.value * (cellsWidth + gapsInCellsWidth + wrapperPadingWidth);
  });

  return (
    <div
      class={`w-[${w.value}px] p-[${
        GAP_BASE_SIZE * scale.value
      }px] bg-gray-100`}
    >
      <Controls />
      <Banner />
      <Board />
    </div>
  );
}
