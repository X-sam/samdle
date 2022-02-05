import { createContext, useState } from "react";

export type GameStates = "Playing" | "Lost" | "Won";
export type PickedTypes = "Green" | "Yellow" | "Grey";
export interface MoveType {
  letter: string;
  type: PickedTypes;
}

export interface StateType {
  setState: (_: StateType) => void;
  gameState: GameStates;
  moves: MoveType[][];
  word: string;
  wordNo: number;
  currentGuess: number;
  currentRow: string;
  showModal: boolean;
}

export const State = createContext<StateType>({
  setState: (_: StateType) => {},
  gameState: "Playing" as GameStates,
  moves: [...Array(6).keys()] as any as MoveType[][],
  word: "",
  wordNo: 0,
  currentGuess: 0,
  currentRow: "",
  showModal: false,
});

export const useGameState = (): [
  StateType,
  React.Dispatch<React.SetStateAction<StateType>>
] => {
  const [state, setState] = useState<StateType>({
    gameState: "Playing",
    moves: [...Array(6).keys()] as any as MoveType[][],
    word: "",
    wordNo: 0,
    currentGuess: 0,
    currentRow: "",
    showModal: false,
    setState: (_: StateType) => {},
  });
  return [state, setState];
};
