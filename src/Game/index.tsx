import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useEventListener } from "usehooks-ts";
import { Tile } from "~/src/Tile";
import { Keyboard } from "~/src/Keyboard";
import { guessList } from "~/src/wlist";

import classes from "./game.module.scss";
import { State } from "~src/state";
import { PickedTypes } from "~src/types";

const compareWord = (move, word) =>
  move.reduce((acc, l, idx) => acc && l === [...word][idx], true) ?? false;
export const Game = () => {
  const state = useContext(State);
  const { gameState, word, moves, currentRow, currentGuess, setState } = state;
  const setCurrentRow = (row: string) =>
    setState({ ...state, currentRow: row });

  const curRef = useRef<HTMLDivElement>();
  const [fail, setFail] = useState(false);
  const [checkedLetters, setCheckedLetters] = useState<
    Record<string, PickedTypes>
  >({});

  const onSubmit = useCallback(() => {
    if (gameState !== "Playing") return;
    if (word === currentRow) {
      const newMoves = [...moves];
      newMoves[currentGuess] = [...currentRow].map((letter) => ({
        letter,
        type: "Green",
      }));
      setState({
        ...state,
        moves: newMoves,
        currentGuess: currentGuess + 1,
        currentRow: "",
        gameState: "Won",
      });
      return;
    } //End Game
    if (currentRow.length !== 5) {
      setFail(true);
      return;
    } //Animate shake
    if (guessList.indexOf(currentRow) < 0) {
      setFail(true);
      return;
    } //Animate Shake
    if (moves.find((move) => move.reduce && compareWord(move, currentRow)))
      return; //Animate shake
    const newMoves = [...moves];
    const newPicks = { ...checkedLetters };

    newMoves[currentGuess] = [...currentRow].map((letter) => {
      newPicks[letter] === "Green" || newPicks[letter] === "Yellow"
        ? ""
        : (newPicks[letter] = "Grey");
      return {
        letter,
        type: "Grey",
      };
    });
    const checkedWord = [...word];
    //check greens
    [...word].forEach((letter, idx) => {
      if (letter === currentRow[idx]) {
        newMoves[currentGuess][idx] = { type: "Green", letter };
        newPicks[letter] = "Green";
        checkedWord[idx] = "_";
      }
    });
    //check yellows
    [...currentRow].forEach((letter, idx) => {
      if (newMoves[currentGuess][idx]?.type === "Green") return;
      const idxLet = checkedWord.indexOf(letter);
      if (idxLet > -1) {
        checkedWord[idxLet] = "_";
        newMoves[currentGuess][idx] = { type: "Yellow", letter };
        newPicks[letter] === "Green" ? "" : (newPicks[letter] = "Yellow");
      }
    });
    setCheckedLetters(newPicks);
    if (currentGuess === 5) {
      setState({
        ...state,
        moves: newMoves,
        currentGuess: currentGuess + 1,
        currentRow: "",
        gameState: "Lost",
      });
      return;
    }
    setState({
      ...state,
      moves: newMoves,
      currentGuess: currentGuess + 1,
      currentRow: "",
    });
  }, [currentRow, moves, currentGuess, setState]);
  const onWordChange = useCallback(
    (letter?: string) => {
      if (gameState !== "Playing") return;
      curRef.current.scrollIntoView(false);
      if (!letter) return setCurrentRow(currentRow.slice(0, -1));
      if (currentRow.length < 5) setCurrentRow(`${currentRow}${letter}`);
    },
    [gameState, currentRow, setCurrentRow]
  );
  useEffect(() => {
    if (!curRef) return;
    curRef.current.scrollIntoView();
  }, [curRef]);

  const onKeyDown = useCallback(
    ({ key }) => {
      if (key === "Enter") onSubmit();
      if (key === "Delete" || key === "Backspace") onWordChange();
      if (
        key.length === 1 &&
        ((key >= "A" && key <= "Z") || (key >= "a" && key <= "z"))
      )
        onWordChange(key.toUpperCase());
    },
    [onWordChange, onSubmit]
  );
  useEventListener("keydown", onKeyDown);

  return (
    <CSSTransition
      in={gameState === "Won" || gameState === "Lost"}
      timeout={3000}
      classNames={{
        enter:
          gameState === "Won" ? classes.gameWinEnter : classes.gameLostEnter,
        enterActive:
          gameState === "Won" ? classes.gameWinActive : classes.gameLostActive,
      }}
      onEntered={() => {
        setState({ ...state, showModal: true });
      }}
    >
      <>
        <div className={`${classes.grid} `}>
          {moves.map((tiles, idx) => (
            <CSSTransition
              key={idx}
              in={idx < currentGuess || (idx === currentGuess && fail)}
              timeout={gameState === "Playing" ? 100 : 5000}
              onEntered={() => {
                setFail(false);
              }}
              classNames={{
                enter:
                  gameState === "Won" ? classes.rowWinEnter : classes.rowEnter,
                enterActive:
                  gameState === "Won"
                    ? classes.rowWinActive
                    : classes.rowActive,
              }}
            >
              <div
                ref={idx === currentGuess ? curRef : undefined}
                className={classes.row}
              >
                {[...Array(5).keys()].map((tileIdx) => (
                  <Tile
                    letter={
                      idx === currentGuess
                        ? currentRow[tileIdx]
                        : tiles[tileIdx]?.letter
                    }
                    type={
                      idx !== currentGuess ? tiles[tileIdx]?.type : undefined
                    }
                  />
                ))}
              </div>
            </CSSTransition>
          ))}
        </div>
        <Keyboard
          changeWord={onWordChange}
          submit={onSubmit}
          {...{ checkedLetters }}
        />
      </>
    </CSSTransition>
  );
};
