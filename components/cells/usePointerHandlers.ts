import { useCallback, useEffect, useMemo, useRef } from "preact/hooks";
import { JSX } from "preact";
import { gameState } from "../../state/signals.ts";
import { GameState } from "../../state/types.ts";
import { flagField, revealField } from "../../state/actions.ts";

export default function usePointerHandlers(
  fieldIdx: number,
) {
  const isActiveGame = gameState.value === GameState.Active;

  const timeoutId = useRef(0);
  const hasPointerDown = useRef(false);

  useEffect(() => () => {
    // cancel the timeout when unmounting the component
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  });

  const onPointerUp = useCallback(
    (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (!hasPointerDown.current) {
        return;
      }
      hasPointerDown.current = false;

      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = 0;
      }

      if (e.button === 2) {
        flagField(fieldIdx);
        return;
      }
      if (e.button === 0) {
        revealField(fieldIdx);
      }
    },
    [fieldIdx],
  );

  const onPointerDown = useCallback(
    (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      hasPointerDown.current = true;
      if (isActiveGame) {
        timeoutId.current = setTimeout(() => {
          flagField(fieldIdx);
        }, 500);
      }
    },
    [fieldIdx],
  );

  const onPointerLeave = useCallback(() => {
    hasPointerDown.current = false;
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = 0;
    }
  }, []);

  return useMemo(() => ({
    onPointerDown,
    onPointerUp,
    onPointerLeave,
  }), [onPointerDown, onPointerUp, onPointerLeave]);
}
