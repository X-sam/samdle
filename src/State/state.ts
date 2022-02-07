import { createContext, useEffect, useReducer } from "react";
import { addDays, differenceInHours } from "date-fns";
import { MersenneTwister19937, shuffle } from "random-js";
import { wlist as words } from "../wlist";
import { StateType, GameStates, StateContext } from "./types";
import { useLocalStorage } from "usehooks-ts";
import { reducer } from "./reducer";
import { Action } from "./types";

const Rnader = MersenneTwister19937.seed(19879313);

const wlist = shuffle(Rnader, words);
const StartDay = Date.UTC(2022, 1, 3, 5);
const wordNo = Math.floor(differenceInHours(new Date(), StartDay) / 24);
const nextDay = addDays(StartDay, wordNo + 1);

const initialState: StateType = {
  gameState: "Playing" as GameStates,
  moves: [...Array(6).keys()].map(() => []),
  word: wlist[wordNo],
  wordNo: wordNo,
  currentGuess: 0,
  currentRow: "",
  showModal: false,
  nextDay,
  fail: false,
  checkedLetters: {},
};

export const State = createContext<StateContext>({
  dispatch: () => {},
  ...initialState,
});

export const useGameState = (): [StateType, React.Dispatch<Action>] => {
  const [savedState, setSavedState] = useLocalStorage<StateType["savedState"]>(
    "samdle",
    {}
  );
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    savedState,
    setSavedState,
  });
  useEffect(() => {
    if (savedState[wordNo]) {
      const { nextDay, ...loadState } = savedState[wordNo];
      dispatch({
        type: "SetState",
        payload: {
          ...state,
          ...loadState,
        },
      });
    }
  }, []);
  return [state, dispatch];
};
