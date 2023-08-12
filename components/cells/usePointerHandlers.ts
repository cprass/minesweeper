import { useCallback, useEffect, useMemo } from "preact/hooks";
import { JSX } from "preact";
import { gameState } from "../../state/signals.ts";
import { GameState } from "../../state/types.ts";
import { flagField, revealField } from "../../state/actions.ts";
import { useSignal } from "@preact/signals";

export default function usePointerHandlers(fieldIdx: number) {
  const isActiveGame = gameState.value === GameState.Active;

  const timeoutId = useSignal<null | number>(null);
  const hasActivePointer = useSignal(false);

  const stopTimer = useCallback(() => {
    const id = timeoutId.peek();
    if (id != null) {
      clearTimeout(id);
      timeoutId.value = null;
    }
  }, []);

  useEffect(
    () => () => {
      // cancel the timeout when unmounting the component
      stopTimer();
    },
    []
  );

  const onPointerUp = useCallback(
    (e: JSX.TargetedPointerEvent<HTMLButtonElement>) => {
      if (!e.isPrimary) {
        return;
      }

      if (!hasActivePointer.peek()) {
        return;
      }
      hasActivePointer.value = false;

      stopTimer();

      if (e.button === 2) {
        flagField(fieldIdx);
        return;
      }
      if (e.button === 0) {
        revealField(fieldIdx);
      }
    },
    [fieldIdx]
  );

  const onPointerDown = useCallback(
    (e: JSX.TargetedPointerEvent<HTMLButtonElement>) => {
      if (!e.isPrimary) {
        return;
      }

      hasActivePointer.value = true;

      if (isActiveGame) {
        timeoutId.value = setTimeout(() => {
          if (hasActivePointer.peek()) {
            hasActivePointer.value = false;
            timeoutId.value = null;
            flagField(fieldIdx);
          }
        }, 500);
      }
    },
    [fieldIdx]
  );

  const onPointerLeave = useCallback(() => {
    hasActivePointer.value = false;
    stopTimer();
  }, [stopTimer]);

  return useMemo(
    () => ({
      onPointerDown,
      onPointerUp,
      onPointerLeave,
    }),
    [onPointerDown, onPointerUp, onPointerLeave]
  );
}
