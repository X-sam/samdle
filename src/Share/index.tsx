import { useContext, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useCopyToClipboard } from "usehooks-ts";
import { State } from "~src/State/state";
import { MoveType, PickedTypes } from "~src/state/types";

import classes from "./share.module.scss";
import ShareSVG from "./shareIcon.svg";

const mapTypeToChar = (type: PickedTypes) => {
  switch (type) {
    case "Green":
      return "🟩";
      break;
    case "Grey":
      return "⬛";
      break;
    case "Yellow":
      return "🟨";
      break;
  }
};
const moveToString = (move: MoveType[]) =>
  move.reduce((acc, { type }) => `${acc}${mapTypeToChar(type)}`, "");
const getString = (
  moves: MoveType[][],
  currentGuess: number,
  wordNo: number
) => {
  return `Samdle! #${wordNo}: ${currentGuess > 5 ? "X" : currentGuess + 1}/6
  \n${moves.reduce((acc, move) => `${acc}${moveToString(move)}\n`, "")}`;
};
export const Share = () => {
  const [clicked, setClicked] = useState(false);
  const [rpos, setRpos] = useState(20);
  const { moves, currentGuess, wordNo } = useContext(State);
  const [, copy] = useCopyToClipboard();
  return (
    <button
      className={classes.root}
      onClick={() => {
        if (clicked) return;
        copy(
          getString(
            moves.filter((_, idx) => idx < currentGuess),
            currentGuess,
            wordNo
          )
        );
        setRpos(Math.floor(Math.random() * 60));
        setClicked(true);
      }}
    >
      <ShareSVG></ShareSVG>
      Share Your Results
      <CSSTransition
        in={clicked}
        timeout={750}
        classNames={{ enter: classes.enter, enterActive: classes.active }}
        onEntered={() => {
          setClicked(false);
        }}
      >
        <div style={{ left: `${rpos}%` }} className={classes.popup}>
          {clicked && "Copied!"}
        </div>
      </CSSTransition>
    </button>
  );
};
