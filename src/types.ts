export type GameStates = "Playing" | "Lost" | "Won";
export type PickedTypes = "Green" | "Yellow" | "Grey";
export interface MoveType {
  letter: string;
  type: PickedTypes;
}

export interface StateContext extends StateType {
  setState: (_: StateType) => void;
}
export interface StateType {
  gameState: GameStates;
  moves: MoveType[][];
  word: string;
  wordNo: number;
  nextDay: Date;
  currentGuess: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  currentRow: string;
  showModal: boolean;
  checkedLetters: Record<string, PickedTypes>;
}
