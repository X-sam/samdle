import { addDays, differenceInHours } from "date-fns";
import classes from "./index.module.scss";
import { MersenneTwister19937, shuffle } from "random-js";
import * as words from "./wlist.json";
import { Countdown } from "./Countdown";
import { Game } from "./Game";

const Rnader = MersenneTwister19937.seed(19879313);

const wlist = shuffle(Rnader, words);
const StartDay = Date.UTC(2022, 1, 3, 5);
const word = Math.floor(differenceInHours(new Date(), StartDay) / 24);

const gamestate = {
  round: 0,
  answer: wlist[word],
};
const countdown = addDays(StartDay, word + 1);
export const App = () => {
  const done = false;
  return (
    <div className={classes.tester}>
      {done && <Countdown nextDay={countdown} />}
      {!done && <Game word={wlist[word]} />}
    </div>
  );
};
