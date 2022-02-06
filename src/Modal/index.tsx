import { useContext } from "react";
import classes from "./modal.module.scss";
import { Countdown } from "~src/Countdown";
import { Share } from "~src/Share";
import { State } from "~src/state";

export const Modal = () => {
  const state = useContext(State);
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <button
          className={classes.close}
          onClick={() => {
            state.setState({ ...state, showModal: false });
          }}
        >
          X
        </button>
        <div className={classes.next}>
          <div>Next Game In:</div>
          <Countdown />
        </div>
        <Share />
      </div>
    </div>
  );
};
