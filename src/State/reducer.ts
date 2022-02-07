import { guessList } from "~src/wlist";
import {
  Action,
  GameStates,
  GuessType,
  MoveType,
  PickedTypes,
  StateType,
} from "./types";

export const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case "ChangeWord":
      if (state.gameState !== "Playing") return { ...state };
      if (!action.payload)
        return { ...state, currentRow: state.currentRow.slice(0, -1) };
      if (state.currentRow.length < 5)
        return { ...state, currentRow: `${state.currentRow}${action.payload}` };
      return { ...state };
    case "Submit":
      const newState = submitHandler(state);
      const { savedState, setSavedState, ...StrippedState } = newState;
      const newSaveState = {
        ...savedState,
        [state.wordNo]: { ...StrippedState },
      };
      setSavedState(newSaveState);
      return { ...newState, savedState: newSaveState };
    case "SetState":
      return { ...state, ...action.payload };
    case "ShowModal":
      return { ...state, showModal: true };
    case "HideModal":
      return { ...state, showModal: false };
    case "ClearFail":
      return { ...state, fail: false };
    case "SetFail":
      return { ...state, fail: true };
  }
};

const compareWord = (move: MoveType[], word: string) =>
  move.reduce(
    (acc, { letter }, idx) => acc && letter === [...word][idx],
    true
  ) ?? false;

const submitHandler = (state: StateType): StateType => {
  const { checkedLetters, currentGuess, currentRow, gameState, moves, word } =
    state;
  if (gameState !== "Playing") return;
  if (word === currentRow) {
    //Win
    const newMoves = [...moves];
    newMoves[currentGuess] = [...currentRow].map((letter) => ({
      letter,
      type: "Green",
    }));
    return { ...state, moves: newMoves, gameState: "Won" as GameStates };
  }
  if (currentRow.length !== 5) {
    //not long enough
    return { ...state, fail: true };
  }
  if (guessList.indexOf(currentRow) < 0) {
    //not a word
    return { ...state, fail: true };
  }
  if (moves.findIndex((move) => compareWord(move, word))[0]) {
    //Already guessed
    return { ...state, fail: true };
  }
  const newMoves = [...moves];
  const newMove = setLettersState(word, currentRow);
  const newCheckedList = storeUsedLetters({ ...checkedLetters }, newMove);
  newMoves[currentGuess] = newMove;
  return {
    ...state,
    moves: newMoves,
    currentGuess: (currentGuess + 1) as GuessType,
    currentRow: "",
    checkedLetters: newCheckedList,
    gameState: currentGuess === 5 ? "Lost" : gameState,
  };
};

//Updated the list of discovered letters
const storeUsedLetters = (
  newCheckedList: Record<string, PickedTypes>,
  newMove: MoveType[]
) => {
  return newMove.reduce(
    (acc, { letter, type }) => ({
      ...acc,
      [letter]:
        acc[letter] === "Green" || (acc[letter] === "Yellow" && type === "Grey")
          ? acc[letter]
          : type,
    }),
    newCheckedList
  );
};
//Matches are Green, Wrong Spots are Yellow, Unuseds are Grey.
const setLettersState = (word: string, currentRow: string): MoveType[] => {
  const newMove: MoveType[] = [...currentRow].map((letter) => ({
    letter,
    type: "Grey",
  }));
  const checkedWord = [...word];
  [...word].forEach((letter, idx) => {
    if (letter === currentRow[idx]) {
      newMove[idx] = { type: "Green", letter };
      checkedWord[idx] = "_";
    }
  });
  [...currentRow].forEach((letter, idx) => {
    if (newMove[idx]?.type === "Green") return;
    const idxLet = checkedWord.indexOf(letter);
    if (idxLet > -1) {
      checkedWord[idxLet] = "_";
      newMove[idx] = { type: "Yellow", letter };
    }
  });
  return newMove;
};
