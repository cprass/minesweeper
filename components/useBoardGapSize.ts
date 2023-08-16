import { useComputed } from "@preact/signals";
import { GAP_BASE_SIZE } from "../config/index.ts";
import { scale } from "../state/signals.ts";

export default function useBoardGapSize() {
  return useComputed(() => {
    return GAP_BASE_SIZE * scale.value;
  });
}
