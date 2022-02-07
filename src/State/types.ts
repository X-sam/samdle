export type GameStates = "Playing" | "Lost" | "Won";
export type GuessType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type PickedTypes = "Green" | "Yellow" | "Grey";
export interface MoveType {
  letter: string;
  type: PickedTypes;
}

export type SavedState = Record<number, StateType>;
type UnsavedTypes = "savedState" | "setSavedState";
export interface StateType {
  gameState: GameStates;
  moves: MoveType[][];
  word: string;
  wordNo: number;
  nextDay: Date;
  currentGuess: GuessType;
  currentRow: string;
  showModal: boolean;
  checkedLetters: Record<string, PickedTypes>;
  savedState?: Record<number, Omit<StateType, UnsavedTypes>>;
  setSavedState?: (_: Record<number, Omit<StateType, UnsavedTypes>>) => void;
  fail: boolean;
}

export type Action =
  | { type: "ChangeWord"; payload?: string }
  | { type: "Submit" }
  | { type: "SetState"; payload: Partial<StateType> }
  | { type: "ShowModal" }
  | { type: "HideModal" }
  | { type: "SetFail" }
  | { type: "ClearFail" };

export interface StateContext extends StateType {
  dispatch: React.Dispatch<Action>;
}
