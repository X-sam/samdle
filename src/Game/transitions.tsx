import { ReactElement, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { State } from "~src/State/state";
import { GameStates, GuessType } from "~src/State/types";
import classes from "./game.module.scss";

export const rootWinTransitions = {
  enter: classes.gameWinEnter,
  enterActive: classes.gameWinActive,
};
export const rootLostTransitions = {
  enter: classes.gameLostEnter,
  enterActive: classes.gameLostActive,
};
export const rowWinTransitions = {
  enter: classes.rowWinEnter,
  enterActive: classes.rowWinActive,
};
export const rowLoseTransitions = {
  enter: classes.rowLoseEnter,
  enterActive: classes.rowLoseActive,
};
export const rowFailTransitions = {
  enter: classes.rowEnter,
  enterActive: classes.rowActive,
};
export const RootTransition = ({
  gameState,
  onGameEnd,
  children,
}: {
  gameState: GameStates;
  onGameEnd: () => void;
  children: ReactElement;
}) => (
  <CSSTransition
    in={gameState === "Won" || gameState === "Lost"}
    timeout={3000}
    classNames={gameState === "Won" ? rootWinTransitions : rootLostTransitions}
    onEntered={onGameEnd}
  >
    {children}
  </CSSTransition>
);

export const RowTransition = ({
  idx,
  currentGuess,
  gameState,
  children,
}: {
  idx: number;
  currentGuess: GuessType;
  gameState: GameStates;
  children: ReactElement;
}) => {
  const { fail, dispatch } = useContext(State);
  return (
    <CSSTransition
      in={shoudShowRowTransition(idx, currentGuess, gameState, fail)}
      timeout={gameState === "Playing" ? 100 : 3000}
      onEntered={() => {
        dispatch({ type: "ClearFail" });
      }}
      classNames={
        gameState === "Won"
          ? rowWinTransitions
          : gameState === "Lost"
          ? rowLoseTransitions
          : rowFailTransitions
      }
    >
      {children}
    </CSSTransition>
  );
};

const shoudShowRowTransition = (
  idx: number,
  currentGuess: number,
  gameState: GameStates,
  fail: boolean
) => {
  switch (gameState) {
    case "Lost":
      return idx === currentGuess - 1;
    case "Won":
      return idx === currentGuess;
  }
  if (fail) return idx === currentGuess;
  return false;
};
