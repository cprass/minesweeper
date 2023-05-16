import { game, gameState, generation, mines } from "../state/signals.ts";
import {
  batch,
  useComputed,
  useSignal,
  useSignalEffect,
} from "@preact/signals";
import { GameState } from "../state/types.ts";
import { quitGame, restartGame } from "../state/actions.ts";
import { GAP_BASE_SIZE } from "../config/index.ts";

export default function Banner() {
  const flagCounter = useComputed(() => {
    return mines.value - game.value.flags;
  });
  const gameStarted = useSignal<Date | null>(null);
  const gameEnded = useSignal<Date | null>(null);
  const elapsedSeconds = useSignal(0);

  useSignalEffect(() => {
    if (generation.value && gameState.value === GameState.Active) {
      batch(() => {
        elapsedSeconds.value = 0;
        gameStarted.value = new Date();
        gameEnded.value = null;
      });

      const timer = setInterval(() => {
        elapsedSeconds.value++;
      }, 1000);
      return () => {
        clearInterval(timer);
        gameEnded.value = new Date();
      };
    }
  });

  return (
    <div
      class={`py-4 px-8 bg-gray-300 mb-[${GAP_BASE_SIZE}px] rounded flex flex-row flex-nowrap`}
    >
      <div class="flex-grow flex justify-start">
        <div>
          <div class="text-center">🚩</div>
          <div class="font-bold font-mono text-center text-2xl text-red-500">
            {flagCounter.value.toString().padStart(
              3,
              flagCounter.value < 0 ? " " : "0",
            )}
          </div>
        </div>
      </div>
      <div class="flex-grow flex flex-col justify-between">
        <div
          class={`text-center font-bold text-${
            gameState.value === GameState.Lost ? "red" : "green"
          }-500`}
        >
          {gameState.value === GameState.Lost && "~ Game Over ~"}
          {gameState.value === GameState.Won && "~ Winner ~"}
        </div>
        <div class="flex justify-center mt-2">
          <button
            class="rounded py-0 px-4 border-2 border-gray-400 hover:bg-gray-400 text-gray-500 hover:text-white"
            onClick={() => {
              gameState.value === GameState.Active ? quitGame() : restartGame();
            }}
          >
            {gameState.value === GameState.Active ? "Quit" : "Restart"}
          </button>
        </div>
      </div>
      <div class="flex-grow flex justify-end">
        <div>
          <div class="text-center">⏳</div>
          <div class="font-bold font-mono text-center text-2xl text-red-500">
            {elapsedSeconds.value.toString().padStart(3, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}
