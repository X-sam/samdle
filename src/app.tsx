import { addDays, differenceInHours } from "date-fns";
import classes from "./index.module.scss";
import { MersenneTwister19937, shuffle } from "random-js";
import { wlist as words } from "./wlist";
import { Modal } from "./Modal";
import { Game } from "./Game";
import { State, StateType, useGameState } from "./state";

const Rnader = MersenneTwister19937.seed(19879313);

const wlist = shuffle(Rnader, words);
const StartDay = Date.UTC(2022, 1, 3, 5);
const wordNo = Math.floor(differenceInHours(new Date(), StartDay) / 24);
const countdown = addDays(StartDay, wordNo + 1);
export const App = () => {
  const [state, setState] = useGameState();
  return (
    <State.Provider
      value={{ ...state, setState, word: wlist[wordNo], wordNo } as StateType}
    >
      <div className={classes.root}>
        {state.showModal && <Modal nextDay={countdown} />}
        {<Game />}
      </div>
    </State.Provider>
  );
};
