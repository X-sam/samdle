import { useCallback, useState } from "react";
import { Tile } from "../Tile";
import { Keyboard } from "~/src/Keyboard";
import * as wlist from "~/src/wlist.json";

import classes from "./game.module.scss";
import { getEnvironmentData } from "worker_threads";

interface MoveType {
  letter: string;
  type: "Green" | "Yellow" | "Grey";
}

const compareWord = (move, word) =>
  move.reduce((acc, l, idx) => acc && l === [...word][idx], true) ?? false;
export const Game = ({ word }: { word: string }) => {
  const [gameState, setGameState] = useState<"Playing" | "Lost" | "Won">(
    "Playing"
  );
  const [moves, setMoves] = useState<MoveType[][]>([...Array(6).keys()] as any);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [currentRow, setCurrentRow] = useState("");
  const onSubmit = useCallback(() => {
    if (gameState !== "Playing") return;
    if (word === currentRow) {
      setGameState("Won");
      const newMoves = [...moves];
      newMoves[currentGuess] = [...currentRow].map((letter) => ({
        letter,
        type: "Green",
      }));
      setMoves(newMoves);
      setCurrentRow("");
      setCurrentGuess(currentGuess + 1);
      return;
    } //End Game
    if (currentRow.length !== 5) return; //Animate shake
    if (wlist.indexOf(currentRow) < 0) return; //Animate Shake
    if (moves.find((move) => move.reduce && compareWord(move, currentRow)))
      return; //Animate shake
    const newMoves = [...moves];
    newMoves[currentGuess] = [...currentRow].map((letter) => ({
      letter,
      type: "Grey",
    }));

    const checkedWord = [...word];
    //check greens
    [...word].forEach((letter, idx) => {
      if (letter === currentRow[idx]) {
        newMoves[currentGuess][idx] = { type: "Green", letter };
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
      }
    });

    setMoves(newMoves);
    if (currentGuess === 5) {
      setGameState("Lost");
      return;
    }
    setCurrentGuess(currentGuess + 1);
    setCurrentRow("");
  }, [
    currentRow,
    moves,
    currentGuess,
    setGameState,
    setMoves,
    setCurrentGuess,
    setCurrentRow,
  ]);
  const onWordChange = useCallback(
    (letter?: string) => {
      if (gameState !== "Playing") return;
      if (!letter) return setCurrentRow(currentRow.slice(0, -1));
      if (currentRow.length < 5) setCurrentRow(`${currentRow}${letter}`);
    },
    [gameState, currentRow, setCurrentRow]
  );
  return (
    <div
      onKeyPress={({ key }) => {
        if (((key) => "A" && key <= "Z") || (key >= "a" && key <= "z"))
          onWordChange(key.toUpperCase());
        if (key === "Enter") onSubmit();
        if (key === "Delete") onWordChange();
      }}
    >
      <div className={classes.container}>
        <div className={classes.grid}>
          {moves.map((tiles, idx) => (
            <div className={classes.row}>
              {[...Array(5).keys()].map((tileIdx) => (
                <Tile
                  letter={
                    idx === currentGuess
                      ? currentRow[tileIdx]
                      : tiles[tileIdx]?.letter
                  }
                  type={idx !== currentGuess ? tiles[tileIdx]?.type : undefined}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Keyboard changeWord={onWordChange} submit={onSubmit} />
    </div>
  );
};
