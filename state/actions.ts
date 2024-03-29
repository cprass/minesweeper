// SPDX-License-Identifier: AGPL-3.0-or-later
import produce, { enableMapSet } from "immer";
import { game, gameState, height, mines, width } from "./signals.ts";
import { CellState, GameState } from "./types.ts";
import { batch } from "@preact/signals";
import { createGame } from "./utils.ts";

enableMapSet();

export function flagField(idx: number) {
  game.value = produce(game.value, (draft) => {
    if (gameState.peek() !== GameState.Active) {
      return draft;
    }
    const field = draft.fields[idx];
    if (field?.state === CellState.Hidden) {
      draft.flags++;
      field.state = CellState.Flagged;
    } else if (field?.state === CellState.Flagged) {
      draft.flags--;
      field.state = CellState.Hidden;
    }
  });
}

export function revealField(idx: number) {
  batch(() => {
    game.value = produce(game.value, (draft) => {
      if (gameState.peek() !== GameState.Active) {
        return draft;
      }

      const w = width.peek();
      const h = height.peek();
      function up(currIdx: number) {
        if (currIdx >= w) {
          return currIdx - w;
        }
      }
      function down(currIdx: number) {
        if (currIdx < h * w) {
          return currIdx + w;
        }
      }
      function left(currIdx: number) {
        if (currIdx % w > 0) {
          return currIdx - 1;
        }
      }
      function right(currIdx: number) {
        if (currIdx % w < w - 1) {
          return currIdx + 1;
        }
      }

      function reveilRecursive(currIdx: number) {
        function moveAndCompute(
          ...fns: Array<(idx: number) => number | undefined>
        ) {
          let newIdx: number = currIdx;
          for (const move of fns) {
            const computed = move(newIdx);
            if (computed == null) {
              return;
            }
            newIdx = computed;
          }
          reveilRecursive(newIdx);
        }

        const field = draft.fields[currIdx];
        if (field?.state === CellState.Hidden) {
          field.state = CellState.Triggered;
          if (field.neighbourMines === 0) {
            moveAndCompute(up);
            moveAndCompute(up, left);
            moveAndCompute(up, right);
            moveAndCompute(down);
            moveAndCompute(down, left);
            moveAndCompute(down, right);
            moveAndCompute(left);
            moveAndCompute(right);
          }
        }
      }

      const field = draft.fields[idx];
      if (field?.state === CellState.Flagged) {
        return;
      }
      if (field?.isMine) {
        const isFirst = !draft.flags &&
          !draft.fields.some((field) => field.state === CellState.Triggered);
        if (isFirst) {
          // if this is the first field triggered in the game and it's a mine, recreate the game
          // making sure that this field is not a mine
          draft = createGame(width.peek(), height.peek(), mines.peek(), idx);
        } else {
          // field is mine, so only reveal one field
          gameState.value = GameState.Lost;
          if (field?.state === CellState.Hidden) {
            field.state = CellState.Triggered;
          }
          return draft;
        }
      }
      // otherwise reveil recursively in case of empty fields
      reveilRecursive(idx);

      // checking winning condition
      const fieldsHidden = draft.fields.filter(
        (f) => f.state === CellState.Hidden,
      ).length;
      if (fieldsHidden + draft.flags === draft.mines.size) {
        gameState.value = GameState.Won;
      }
      return draft;
    });
  });
}

export function restartGame() {
  gameState.value = GameState.Active;
}

export function quitGame() {
  gameState.value = GameState.Lost;
}

export function setDifficultyLevel(level: 1 | 2 | 3) {
  batch(() => {
    gameState.value = GameState.Active;
    if (level === 1) {
      // 12.34% mines
      width.value = 9;
      height.value = 9;
      mines.value = 10;
    } else if (level === 2) {
      // 13.28% mines
      width.value = 16;
      height.value = 16;
      mines.value = 34;
    } else if (level === 3) {
      // 13.33% mines
      width.value = 30;
      height.value = 16;
      mines.value = 64;
    }
  });
}
