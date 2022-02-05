import classes from "./index.module.scss";
import { Modal } from "./Modal";
import { Game } from "./Game";
import { State, useGameState } from "./state";
import { StateType } from "./types";

export const App = () => {
  const [state, setState] = useGameState();
  return (
    <State.Provider value={{ ...state, setState } as StateType}>
      <div className={classes.root}>
        {state.showModal && <Modal />}
        {<Game />}
      </div>
    </State.Provider>
  );
};
