import { useState } from "react";
import { addDays, differenceInHours } from "date-fns";
import classes from "./index.module.scss";
import { MersenneTwister19937, shuffle } from "random-js";
import { wlist as words } from "./wlist";
import { Modal } from "./Modal";
import { Game } from "./Game";

const Rnader = MersenneTwister19937.seed(19879313);

const wlist = shuffle(Rnader, words);
const StartDay = Date.UTC(2022, 1, 3, 5);
const word = Math.floor(differenceInHours(new Date(), StartDay) / 24);
const countdown = addDays(StartDay, word + 1);
export type GameStates = "Playing" | "Lost" | "Won";
export const App = () => {
  const [gameState, setGameState] = useState<GameStates>("Playing");
  return (
    <div className={classes.root}>
      {gameState !== "Playing" && <Modal nextDay={countdown} />}
      {<Game word={wlist[word]} {...{ gameState, setGameState }} />}
    </div>
  );
};
