import classes from "./index.module.scss";
import { Modal } from "./Modal";
import { Game } from "./Game";
import { State, useGameState } from "./state";

export const App = () => {
  const [state, setState] = useGameState();
  return (
    <State.Provider value={{ ...state, setState }}>
      <div className={classes.root}>
        {state.showModal && <Modal />}
        {<Game />}
      </div>
    </State.Provider>
  );
};
