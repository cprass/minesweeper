import { batch, effect, Signal, signal } from "@preact/signals";
import { createGame } from "./utils.ts";
import { CellState, Game, GameState } from "./types.ts";
import { produce } from "immer";

export const width = signal(9);
export const height = signal(9);
export const mines = signal(10);
export const scale = signal(1);
export const generation = signal(1);

export const gameState = signal(GameState.Active);
export const prevState = signal<GameState | null>(null);

// Keep track of prev state
let gameStateLog = gameState.peek();
effect(() => {
  if (gameStateLog !== gameState.value) {
    prevState.value = gameStateLog;
    gameStateLog = gameState.value;
  }
});

export const game: Signal<Game> = signal(
  createGame(width.peek(), height.peek(), mines.peek()),
);

// create new game data on restart
effect(() => {
  if (
    prevState.value != null &&
    prevState.value !== GameState.Active &&
    gameState.value === GameState.Active
  ) {
    batch(() => {
      game.value = createGame(width.peek(), height.peek(), mines.peek());
      generation.value = generation.peek() + 1;
    });
  }
});

// create new game if board setup changes
effect(() => {
  if (gameState.peek() === GameState.Active) {
    batch(() => {
      game.value = createGame(width.value, height.value, mines.value);
      generation.value = generation.peek() + 1;
    });
  }
});

// flag remaining fields if game is won
effect(() => {
  if (gameState.value === GameState.Won) {
    game.value = produce(game.value, (draft) => {
      draft.fields.forEach((field) => {
        if (field.state === CellState.Hidden) {
          field.state = CellState.Flagged;
          draft.flags++;
        }
      });
    });
  }
});
