import { createContext, useEffect, useState } from "react";
import { addDays, differenceInHours } from "date-fns";
import { MersenneTwister19937, shuffle } from "random-js";
import { wlist as words } from "./wlist";
import { StateType, GameStates, MoveType, StateContext } from "./types";
import { useLocalStorage } from "usehooks-ts";

const Rnader = MersenneTwister19937.seed(19879313);

const wlist = shuffle(Rnader, words);
const StartDay = Date.UTC(2022, 1, 3, 5);
const wordNo = Math.floor(differenceInHours(new Date(), StartDay) / 24);
const nextDay = addDays(StartDay, wordNo + 1);

const initialState: StateType = {
  gameState: "Playing" as GameStates,
  moves: [...Array(6).keys()] as any as MoveType[][],
  word: wlist[wordNo],
  wordNo: wordNo,
  currentGuess: 0,
  currentRow: "",
  showModal: false,
  nextDay,
  checkedLetters: {},
};

export const State = createContext<StateContext>({
  setState: (_: StateType) => {},
  ...initialState,
});

export const useGameState = (): [
  StateType,
  React.Dispatch<React.SetStateAction<StateType>>
] => {
  const [state, setState] = useState<StateType>({ ...initialState });
  const [saveState] = useLocalStorage<Record<number, StateType>>("samdle", {});
  useEffect(() => {
    if (saveState[wordNo]) {
      const { nextDay, ...loadState } = saveState[wordNo];
      setState({ ...state, ...loadState });
    }
  }, []);
  return [state, setState];
};
