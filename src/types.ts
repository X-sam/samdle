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
  nextDay: Date;
  currentGuess: number;
  currentRow: string;
  showModal: boolean;
}
