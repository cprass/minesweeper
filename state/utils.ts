import { Game, CellState, CellValue } from "./types.ts";

function countNeighbourMines(
  idx: number,
  x: number,
  y: number,
  width: number,
  height: number,
  mines: Set<number>
): number {
  let n = 0;

  // prev row
  if (y > 0) {
    const prevRowIdx = idx - width;
    // left
    if (x > 0 && mines.has(prevRowIdx - 1)) {
      n++;
    }
    // middle
    if (mines.has(prevRowIdx)) {
      n++;
    }
    // right
    if (x < width - 1 && mines.has(prevRowIdx + 1)) {
      n++;
    }
  }
  // left
  if (x > 0 && mines.has(idx - 1)) {
    n++;
  }
  // right
  if (x < width - 1 && mines.has(idx + 1)) {
    n++;
  }
  // next row
  if (y < height - 1) {
    const nextRowIdx = idx + width;
    // left
    if (x > 0 && mines.has(nextRowIdx - 1)) {
      n++;
    }
    // middle
    if (mines.has(nextRowIdx)) {
      n++;
    }
    // right
    if (x < width - 1 && mines.has(nextRowIdx + 1)) {
      n++;
    }
  }

  return n;
}

export function createGame(width: number, height: number, mines: number): Game {
  const minesList = new Set<number>();
  const nFields = width * height;

  let n = 0;
  while (minesList.size < mines && n <= 9999) {
    const newVal = Math.floor(Math.random() * nFields);
    minesList.add(newVal);
    n++;
  }

  const fields: CellValue[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const isMine = minesList.has(idx) ? true : false;
      fields.push({
        neighbourMines: isMine
          ? 0
          : countNeighbourMines(idx, x, y, width, height, minesList),
        state: CellState.Hidden,
        isMine,
      });
    }
  }

  return {
    fields,
    mines: minesList,
    flags: 0,
  };
}
