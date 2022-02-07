import { useCallback, useContext, useEffect, useRef } from "react";
import { useEventListener } from "usehooks-ts";
import { Tile } from "~/src/Tile";
import { Keyboard } from "~/src/Keyboard";

import classes from "./game.module.scss";
import { State } from "~src/State/state";
import { RowTransition, RootTransition } from "./transitions";

export const Game = () => {
  const state = useContext(State);
  const { gameState, moves, currentRow, currentGuess, showModal, dispatch } =
    state;

  const curRef = useRef<HTMLDivElement>();

  const onWordChange = useCallback(
    (letter?: string) => {
      curRef.current.scrollIntoView(false);
      dispatch({ type: "ChangeWord", payload: letter });
    },
    [gameState, currentRow]
  );
  useEffect(() => {
    if (!curRef) return;
    curRef.current.scrollIntoView();
  }, [curRef]);

  const onKeyDown = useCallback(
    ({ key }) => {
      if (key === "Enter") dispatch({ type: "Submit" });
      if (key === "Delete" || key === "Backspace") onWordChange();
      if (
        key.length === 1 &&
        ((key >= "A" && key <= "Z") || (key >= "a" && key <= "z"))
      )
        onWordChange(key.toUpperCase());
    },
    [onWordChange]
  );
  useEventListener("keydown", onKeyDown);

  return (
    <RootTransition
      onGameEnd={() => {
        if (!showModal) dispatch({ type: "ShowModal" });
      }}
      {...{ gameState }}
    >
      <>
        <div className={`${classes.grid} `}>
          {moves.map((tiles, idx) => (
            <RowTransition key={idx} {...{ idx, currentGuess, gameState }}>
              <div
                ref={idx === currentGuess ? curRef : undefined}
                className={classes.row}
              >
                {[...Array(5).keys()].map((tileIdx) => (
                  <Tile key={tileIdx} type={tiles[tileIdx]?.type}>
                    {tiles[tileIdx]?.letter ??
                      (idx === currentGuess && currentRow[tileIdx])}
                  </Tile>
                ))}
              </div>
            </RowTransition>
          ))}
        </div>
        <Keyboard changeWord={onWordChange} />
      </>
    </RootTransition>
  );
};
