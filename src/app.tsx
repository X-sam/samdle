import classes from "./index.module.scss";
import { Modal } from "./Modal";
import { Game } from "./Game";
import { State, useGameState } from "./State/state";

export const App = () => {
  const [state, dispatch] = useGameState();
  return (
    <State.Provider value={{ ...state, dispatch }}>
      <div className={classes.root}>
        <div className={classes.title}>
          {[..."Samdle!"].map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
        {state.showModal && <Modal />}
        {<Game />}
      </div>
    </State.Provider>
  );
};
