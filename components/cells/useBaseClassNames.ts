// SPDX-License-Identifier: AGPL-3.0-or-later
import { useComputed } from "@preact/signals";
import { CELL_BASE_SIZE } from "../../config/index.ts";
import { scale } from "../../state/signals.ts";

export const useBaseClassNames = () => {
  const size = useComputed(() => {
    return CELL_BASE_SIZE * scale.value;
  });

  return `flex items-center justify-center h-[${size}px] w-[${size}px] focus:outline-none rounded`;
};
