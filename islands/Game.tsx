import Banner from "../components/Banner.tsx";
import Board from "../components/Board.tsx";
import { scale, width } from "../state/signals.ts";
import { useComputed } from "@preact/signals";
import { CELL_BASE_SIZE, GAP_BASE_SIZE } from "../config/index.ts";
import Controls from "../components/Controls.tsx";

export default function Game() {
  const w = useComputed(() => {
    return CELL_BASE_SIZE * width.value +
      Math.max(0, GAP_BASE_SIZE * (width.value - 1));
  });

  return (
    <div
      class={`w-[${
        w.value + GAP_BASE_SIZE * 4
      }px] p-[${GAP_BASE_SIZE}px] bg-gray-100 origin-top scale-[${scale.value}] ease-in-out duration-100 transform-gpu`}
    >
      <Controls />
      <Banner />
      <Board />
    </div>
  );
}
